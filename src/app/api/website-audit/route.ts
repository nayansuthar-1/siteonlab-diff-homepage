import { NextResponse, type NextRequest } from "next/server";

// The audit runs a full Lighthouse analysis via Google's API, which is slow,
// so it must run per-request with a generous time budget.
export const dynamic = "force-dynamic";
export const maxDuration = 90;

type Rating = "good" | "needs-improvement" | "poor" | "info";

interface Audit {
  id: string;
  title: string;
  description: string;
  displayValue: string | null;
  rating: Rating;
  weight: number;
}

interface Category {
  id: string;
  title: string;
  score: number | null;
  audits: Audit[];
}

interface Metric {
  id: string;
  label: string;
  value: string;
  rating: Rating;
}

// --- helpers ---------------------------------------------------------------

function normalizeUrl(raw: string): string | null {
  let value = raw.trim();
  if (!value) return null;
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`;
  try {
    const u = new URL(value);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.toString();
  } catch {
    return null;
  }
}

function cleanText(md?: string): string {
  if (!md) return "";
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // markdown links -> text
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/\s+/g, " ")
    .trim();
}

function ratingFromScore(score: number | null, mode: string): Rating {
  if (mode === "informative" || mode === "manual" || score === null) return "info";
  if (score >= 0.9) return "good";
  if (score >= 0.5) return "needs-improvement";
  return "poor";
}

const RATING_ORDER: Record<Rating, number> = {
  poor: 0,
  "needs-improvement": 1,
  info: 2,
  good: 3,
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Field-data (CrUX) category -> our rating
const FIELD_RATING: Record<string, Rating> = {
  FAST: "good",
  AVERAGE: "needs-improvement",
  SLOW: "poor",
};

// --- PageSpeed Insights (Lighthouse) ---------------------------------------

interface LighthouseResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lighthouseResult?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadingExperience?: any;
}

async function fetchPageSpeed(
  url: string,
  strategy: "mobile" | "desktop",
): Promise<{ ok: true; data: LighthouseResponse } | { ok: false; status: number }> {
  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", url);
  api.searchParams.set("strategy", strategy);
  ["performance", "accessibility", "best-practices", "seo"].forEach((c) =>
    api.searchParams.append("category", c),
  );
  if (process.env.PAGESPEED_API_KEY) {
    api.searchParams.set("key", process.env.PAGESPEED_API_KEY);
  }

  // Retry transient failures (429 / 5xx) with a short backoff.
  const delays = [0, 2500, 5000];
  let lastStatus = 0;
  for (const delay of delays) {
    if (delay) await sleep(delay);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 60000);
    try {
      const res = await fetch(api.toString(), {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = (await res.json()) as LighthouseResponse;
        return { ok: true, data };
      }
      lastStatus = res.status;
      // Only retry rate-limit / server errors.
      if (res.status !== 429 && res.status < 500) break;
    } catch {
      lastStatus = 504;
    } finally {
      clearTimeout(id);
    }
  }
  return { ok: false, status: lastStatus };
}

// --- route -----------------------------------------------------------------

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");
  const strategyParam = req.nextUrl.searchParams.get("strategy");
  const strategy: "mobile" | "desktop" = strategyParam === "desktop" ? "desktop" : "mobile";

  if (!raw) {
    return NextResponse.json({ error: "Please enter a website URL." }, { status: 400 });
  }
  const url = normalizeUrl(raw);
  if (!url) {
    return NextResponse.json({ error: "Please enter a valid website URL." }, { status: 400 });
  }

  const result = await fetchPageSpeed(url, strategy);

  if (!result.ok) {
    const status = result.status;
    if (status === 429) {
      return NextResponse.json(
        {
          error:
            "We're handling a lot of audits right now. Please wait a moment and try again.",
        },
        { status: 429 },
      );
    }
    if (status === 400 || status === 404) {
      return NextResponse.json(
        {
          error:
            "We couldn't analyze this site. Make sure the URL is public and reachable, then try again.",
        },
        { status: 422 },
      );
    }
    return NextResponse.json(
      { error: "The analysis couldn't be completed right now. Please try again shortly." },
      { status: 502 },
    );
  }

  const lhr = result.data.lighthouseResult;
  if (!lhr || !lhr.categories) {
    return NextResponse.json(
      { error: "The analysis returned no data. Please try again shortly." },
      { status: 502 },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audits: Record<string, any> = lhr.audits ?? {};

  // --- category scores (pure Lighthouse) ---------------------------------
  const catScore = (id: string): number | null =>
    lhr.categories[id]?.score != null ? Math.round(lhr.categories[id].score * 100) : null;

  const scores = {
    performance: catScore("performance"),
    accessibility: catScore("accessibility"),
    bestPractices: catScore("best-practices"),
    seo: catScore("seo"),
  };

  // --- lab metrics (the 6 PSI shows under Performance) --------------------
  const metricDefs: [string, string][] = [
    ["first-contentful-paint", "First Contentful Paint"],
    ["largest-contentful-paint", "Largest Contentful Paint"],
    ["total-blocking-time", "Total Blocking Time"],
    ["cumulative-layout-shift", "Cumulative Layout Shift"],
    ["speed-index", "Speed Index"],
    ["interactive", "Time to Interactive"],
  ];
  const labMetrics: Metric[] = metricDefs
    .filter(([id]) => audits[id])
    .map(([id, label]) => {
      const a = audits[id];
      return {
        id,
        label,
        value: a.displayValue || "—",
        rating: ratingFromScore(a.score, a.scoreDisplayMode),
      };
    });

  // --- field data (Core Web Vitals assessment from CrUX) -----------------
  const le = result.data.loadingExperience;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fieldMetricsRaw: Record<string, any> = le?.metrics ?? {};
  const fieldDefs: { id: string; key: string; label: string; format: (p: number) => string }[] = [
    {
      id: "lcp",
      key: "LARGEST_CONTENTFUL_PAINT_MS",
      label: "Largest Contentful Paint",
      format: (p) => `${(p / 1000).toFixed(1)} s`,
    },
    {
      id: "inp",
      key: "INTERACTION_TO_NEXT_PAINT",
      label: "Interaction to Next Paint",
      format: (p) => `${p} ms`,
    },
    {
      id: "cls",
      key: "CUMULATIVE_LAYOUT_SHIFT_SCORE",
      label: "Cumulative Layout Shift",
      format: (p) => (p / 100).toFixed(2),
    },
    {
      id: "fcp",
      key: "FIRST_CONTENTFUL_PAINT_MS",
      label: "First Contentful Paint",
      format: (p) => `${(p / 1000).toFixed(1)} s`,
    },
    {
      id: "ttfb",
      key: "EXPERIMENTAL_TIME_TO_FIRST_BYTE",
      label: "Time to First Byte",
      format: (p) => `${(p / 1000).toFixed(1)} s`,
    },
  ];

  const fieldMetrics: Metric[] = fieldDefs
    .filter((d) => fieldMetricsRaw[d.key])
    .map((d) => {
      const m = fieldMetricsRaw[d.key];
      return {
        id: d.id,
        label: d.label,
        value: d.format(m.percentile),
        rating: FIELD_RATING[m.category] ?? "info",
      };
    });

  let cwvAssessment: "pass" | "fail" | null = null;
  const coreKeys = [
    "LARGEST_CONTENTFUL_PAINT_MS",
    "CUMULATIVE_LAYOUT_SHIFT_SCORE",
    "INTERACTION_TO_NEXT_PAINT",
  ];
  const presentCore = coreKeys.filter((k) => fieldMetricsRaw[k]);
  if (presentCore.length) {
    cwvAssessment = presentCore.every((k) => fieldMetricsRaw[k].category === "FAST")
      ? "pass"
      : "fail";
  }

  // --- per-category audit details (diagnostics) --------------------------
  const metricIds = new Set(metricDefs.map(([id]) => id));

  function buildCategory(id: string, title: string): Category | null {
    const cat = lhr.categories[id];
    if (!cat) return null;
    const list: Audit[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const ref of cat.auditRefs as any[]) {
      const a = audits[ref.id];
      if (!a) continue;
      const mode = a.scoreDisplayMode;
      if (mode === "notApplicable" || mode === "manual" || mode === "error") continue;
      if (ref.group === "hidden") continue;
      // Metrics are shown in their own section, not in the diagnostics list.
      if (id === "performance" && (ref.group === "metrics" || metricIds.has(ref.id))) continue;
      list.push({
        id: ref.id,
        title: a.title,
        description: cleanText(a.description),
        displayValue: a.displayValue || null,
        rating: ratingFromScore(a.score, mode),
        weight: ref.weight ?? 0,
      });
    }
    list.sort((x, y) => RATING_ORDER[x.rating] - RATING_ORDER[y.rating] || y.weight - x.weight);
    return { id, title, score: catScore(id), audits: list };
  }

  const categories = [
    buildCategory("performance", "Performance"),
    buildCategory("accessibility", "Accessibility"),
    buildCategory("best-practices", "Best Practices"),
    buildCategory("seo", "SEO"),
  ].filter((c): c is Category => c !== null);

  return NextResponse.json({
    url,
    finalUrl: lhr.finalDisplayedUrl || lhr.finalUrl || url,
    fetchedAt: lhr.fetchTime || new Date().toISOString(),
    strategy,
    scores,
    cwv: {
      assessment: cwvAssessment,
      metrics: fieldMetrics,
    },
    labMetrics,
    categories,
  });
}
