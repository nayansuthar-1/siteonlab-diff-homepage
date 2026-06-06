import { NextResponse, type NextRequest } from "next/server";

// The audit hits external services (PageSpeed Insights + the target site),
// so it must run per-request and can take a while.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type CheckStatus = "pass" | "warn" | "fail" | "info";

interface Check {
  label: string;
  status: CheckStatus;
  value?: string;
  description: string;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  score: number | null;
  summary: string;
  checks: Check[];
}

interface CoreWebVital {
  id: string;
  label: string;
  value: string;
  rating: "good" | "needs-improvement" | "poor" | "unknown";
  description: string;
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

async function fetchWithTimeout(url: string, opts: RequestInit & { timeout?: number } = {}) {
  const { timeout = 15000, ...rest } = opts;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, {
      ...rest,
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SiteOnLabAudit/1.0; +https://siteonlab.com/tools/website-audit)",
        ...(rest.headers || {}),
      },
    });
  } finally {
    clearTimeout(id);
  }
}

function scoreToStatus(score: number, good = 90, warn = 50): CheckStatus {
  if (score >= good) return "pass";
  if (score >= warn) return "warn";
  return "fail";
}

function extractTag(html: string, regex: RegExp): string | null {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

function countMatches(html: string, regex: RegExp): number {
  const m = html.match(regex);
  return m ? m.length : 0;
}

// --- PageSpeed Insights ----------------------------------------------------

interface PsiResult {
  scores: {
    performance: number | null;
    seo: number | null;
    accessibility: number | null;
    bestPractices: number | null;
  };
  audits: Record<string, { score: number | null; displayValue?: string; title?: string; numericValue?: number }>;
  field: Record<string, { percentile: number; category: string }>;
  error?: string;
}

async function runPageSpeed(url: string): Promise<PsiResult> {
  const empty: PsiResult = {
    scores: { performance: null, seo: null, accessibility: null, bestPractices: null },
    audits: {},
    field: {},
  };

  try {
    const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    api.searchParams.set("url", url);
    api.searchParams.set("strategy", "mobile");
    ["performance", "seo", "accessibility", "best-practices"].forEach((c) =>
      api.searchParams.append("category", c),
    );
    if (process.env.PAGESPEED_API_KEY) {
      api.searchParams.set("key", process.env.PAGESPEED_API_KEY);
    }

    const res = await fetchWithTimeout(api.toString(), { timeout: 55000 });
    if (!res.ok) {
      return { ...empty, error: `PageSpeed Insights returned ${res.status}` };
    }
    const data = await res.json();
    const lh = data.lighthouseResult;
    const cats = lh?.categories ?? {};
    const audits = lh?.audits ?? {};

    const fieldMetrics: PsiResult["field"] = {};
    const metrics = data.loadingExperience?.metrics ?? {};
    for (const [key, val] of Object.entries(metrics)) {
      const v = val as { percentile: number; category: string };
      fieldMetrics[key] = { percentile: v.percentile, category: v.category };
    }

    return {
      scores: {
        performance: cats.performance ? Math.round(cats.performance.score * 100) : null,
        seo: cats.seo ? Math.round(cats.seo.score * 100) : null,
        accessibility: cats.accessibility ? Math.round(cats.accessibility.score * 100) : null,
        bestPractices: cats["best-practices"] ? Math.round(cats["best-practices"].score * 100) : null,
      },
      audits,
      field: fieldMetrics,
    };
  } catch (err) {
    return { ...empty, error: err instanceof Error ? err.message : "PageSpeed request failed" };
  }
}

// --- route -----------------------------------------------------------------

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");
  if (!raw) {
    return NextResponse.json({ error: "Missing 'url' query parameter." }, { status: 400 });
  }

  const url = normalizeUrl(raw);
  if (!url) {
    return NextResponse.json({ error: "Please enter a valid website URL." }, { status: 400 });
  }

  const origin = new URL(url).origin;

  // Run the page fetch, robots/sitemap probes, and PageSpeed in parallel.
  const start = Date.now();
  const [pageRes, psi, robotsRes, sitemapRes] = await Promise.allSettled([
    fetchWithTimeout(url, { timeout: 20000 }),
    runPageSpeed(url),
    fetchWithTimeout(`${origin}/robots.txt`, { timeout: 10000 }),
    fetchWithTimeout(`${origin}/sitemap.xml`, { timeout: 10000 }),
  ]);

  // --- gather page data ----------------------------------------------------
  let html = "";
  let status = 0;
  let finalUrl = url;
  let headers: Headers | null = null;
  let responseTime = 0;
  let fetchError: string | null = null;

  if (pageRes.status === "fulfilled") {
    const res = pageRes.value;
    status = res.status;
    finalUrl = res.url || url;
    headers = res.headers;
    responseTime = Date.now() - start;
    try {
      html = await res.text();
    } catch {
      html = "";
    }
  } else {
    fetchError =
      pageRes.reason instanceof Error ? pageRes.reason.message : "Could not reach the website.";
  }

  if (fetchError && status === 0) {
    return NextResponse.json(
      { error: `We couldn't load this site. ${fetchError}` },
      { status: 502 },
    );
  }

  const psiData: PsiResult =
    psi.status === "fulfilled"
      ? psi.value
      : {
          scores: { performance: null, seo: null, accessibility: null, bestPractices: null },
          audits: {},
          field: {},
          error: "PageSpeed analysis unavailable.",
        };

  const isHttps = finalUrl.startsWith("https://");
  const headersObj: Record<string, string> = {};
  if (headers) headers.forEach((v, k) => (headersObj[k.toLowerCase()] = v));

  // --- 1. Technical SEO & Indexing ----------------------------------------
  const title = extractTag(html, /<title[^>]*>([^<]*)<\/title>/i);
  const metaDescription = extractTag(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
  );
  const viewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const canonical = extractTag(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const langAttr = extractTag(html, /<html[^>]+lang=["']([^"']*)["']/i);
  const h1Count = countMatches(html, /<h1[\s>]/gi);
  const ogTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
  const ogImage = /<meta[^>]+property=["']og:image["']/i.test(html);
  const robotsMeta = extractTag(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
  const noindex = robotsMeta ? /noindex/i.test(robotsMeta) : false;
  const favicon = /<link[^>]+rel=["'][^"']*icon[^"']*["']/i.test(html);
  const imgTags = countMatches(html, /<img[\s>]/gi);
  const imgWithAlt = countMatches(html, /<img[^>]+alt=["'][^"']*["'][^>]*>/gi);

  const robotsTxtOk = robotsRes.status === "fulfilled" && robotsRes.value.ok;
  let sitemapOk = sitemapRes.status === "fulfilled" && sitemapRes.value.ok;
  // robots.txt may reference a sitemap even when /sitemap.xml is absent
  if (!sitemapOk && robotsTxtOk) {
    try {
      const txt = await robotsRes.value.clone().text();
      if (/sitemap:/i.test(txt)) sitemapOk = true;
    } catch {
      /* ignore */
    }
  }

  const seoChecks: Check[] = [
    {
      label: "Page title",
      status: title ? (title.length >= 10 && title.length <= 65 ? "pass" : "warn") : "fail",
      value: title ? `${title.length} chars` : "Missing",
      description: title
        ? `"${title.slice(0, 70)}"`
        : "Add a descriptive <title> tag — it's a primary ranking and click-through factor.",
    },
    {
      label: "Meta description",
      status: metaDescription
        ? metaDescription.length >= 50 && metaDescription.length <= 160
          ? "pass"
          : "warn"
        : "fail",
      value: metaDescription ? `${metaDescription.length} chars` : "Missing",
      description: metaDescription
        ? metaDescription.slice(0, 140)
        : "Add a 50–160 character meta description to improve search snippets.",
    },
    {
      label: "Indexability",
      status: noindex ? "fail" : "pass",
      value: noindex ? "noindex" : "Indexable",
      description: noindex
        ? "This page has a 'noindex' directive — search engines will not list it."
        : "No robots 'noindex' directive found — search engines can index this page.",
    },
    {
      label: "Canonical tag",
      status: canonical ? "pass" : "warn",
      value: canonical ? "Present" : "Missing",
      description: canonical
        ? `Canonical points to ${canonical.slice(0, 80)}`
        : "Add a canonical link to avoid duplicate-content issues.",
    },
    {
      label: "robots.txt",
      status: robotsTxtOk ? "pass" : "warn",
      value: robotsTxtOk ? "Found" : "Not found",
      description: robotsTxtOk
        ? "A robots.txt file is available to guide crawlers."
        : "No robots.txt found — add one to control crawler access.",
    },
    {
      label: "XML sitemap",
      status: sitemapOk ? "pass" : "warn",
      value: sitemapOk ? "Found" : "Not found",
      description: sitemapOk
        ? "A sitemap helps search engines discover all your pages."
        : "No sitemap.xml detected — add one to improve crawl coverage.",
    },
    {
      label: "H1 heading",
      status: h1Count === 1 ? "pass" : h1Count === 0 ? "fail" : "warn",
      value: `${h1Count} found`,
      description:
        h1Count === 1
          ? "Exactly one H1 — ideal structure."
          : h1Count === 0
            ? "No H1 heading found — add one primary heading."
            : "Multiple H1 tags found — use a single H1 per page.",
    },
    {
      label: "Language attribute",
      status: langAttr ? "pass" : "warn",
      value: langAttr || "Missing",
      description: langAttr
        ? `Declared as "${langAttr}".`
        : "Add a lang attribute to <html> for accessibility and SEO.",
    },
    {
      label: "Open Graph tags",
      status: ogTitle && ogImage ? "pass" : "warn",
      value: ogTitle && ogImage ? "Complete" : "Incomplete",
      description:
        ogTitle && ogImage
          ? "og:title and og:image present — link previews will render well."
          : "Add og:title and og:image for rich social media previews.",
    },
    {
      label: "Image alt text",
      status: imgTags === 0 ? "info" : imgWithAlt / imgTags >= 0.9 ? "pass" : "warn",
      value: imgTags === 0 ? "No images" : `${imgWithAlt}/${imgTags} with alt`,
      description:
        imgTags === 0
          ? "No <img> tags detected on the page."
          : "Descriptive alt text improves accessibility and image SEO.",
    },
  ];

  // --- 2. Site Performance & Speed ----------------------------------------
  const a = psiData.audits;
  const perfChecks: Check[] = [];
  const labMetrics: [string, string][] = [
    ["first-contentful-paint", "First Contentful Paint"],
    ["largest-contentful-paint", "Largest Contentful Paint"],
    ["total-blocking-time", "Total Blocking Time"],
    ["cumulative-layout-shift", "Cumulative Layout Shift"],
    ["speed-index", "Speed Index"],
    ["interactive", "Time to Interactive"],
  ];
  for (const [key, label] of labMetrics) {
    const audit = a[key];
    if (audit && typeof audit.score === "number") {
      perfChecks.push({
        label,
        status: scoreToStatus(audit.score * 100),
        value: audit.displayValue || "—",
        description: audit.title || label,
      });
    }
  }
  perfChecks.push({
    label: "Server response time",
    status: responseTime < 600 ? "pass" : responseTime < 1500 ? "warn" : "fail",
    value: `${responseTime} ms`,
    description: "Time taken for the server to return the initial HTML document.",
  });
  const textCompression = a["uses-text-compression"];
  if (textCompression) {
    perfChecks.push({
      label: "Text compression",
      status: textCompression.score === 1 ? "pass" : "warn",
      value: textCompression.score === 1 ? "Enabled" : "Could improve",
      description: "Gzip/Brotli compression reduces the size of text resources.",
    });
  }
  const imgFormats = a["modern-image-formats"];
  if (imgFormats) {
    perfChecks.push({
      label: "Modern image formats",
      status: imgFormats.score === 1 ? "pass" : "warn",
      value: imgFormats.score === 1 ? "Optimized" : "Could improve",
      description: "WebP/AVIF formats deliver smaller images than JPEG/PNG.",
    });
  }

  // --- Core Web Vitals (field data preferred, lab fallback) ---------------
  const cwvDefs: { id: string; field: string; lab: string; label: string; desc: string }[] = [
    {
      id: "lcp",
      field: "LARGEST_CONTENTFUL_PAINT_MS",
      lab: "largest-contentful-paint",
      label: "Largest Contentful Paint",
      desc: "How quickly the main content loads. Good < 2.5s.",
    },
    {
      id: "inp",
      field: "INTERACTION_TO_NEXT_PAINT",
      lab: "total-blocking-time",
      label: "Interaction to Next Paint",
      desc: "Responsiveness to user input. Good < 200ms.",
    },
    {
      id: "cls",
      field: "CUMULATIVE_LAYOUT_SHIFT_SCORE",
      lab: "cumulative-layout-shift",
      label: "Cumulative Layout Shift",
      desc: "Visual stability of the page. Good < 0.1.",
    },
    {
      id: "fcp",
      field: "FIRST_CONTENTFUL_PAINT_MS",
      lab: "first-contentful-paint",
      label: "First Contentful Paint",
      desc: "When the first content appears. Good < 1.8s.",
    },
  ];
  const ratingMap: Record<string, CoreWebVital["rating"]> = {
    FAST: "good",
    AVERAGE: "needs-improvement",
    SLOW: "poor",
  };
  const coreWebVitals: CoreWebVital[] = cwvDefs.map((d) => {
    const f = psiData.field[d.field];
    if (f) {
      let value: string;
      if (d.id === "cls") value = (f.percentile / 100).toFixed(2);
      else value = `${(f.percentile / 1000).toFixed(2)} s`;
      if (d.id === "inp") value = `${f.percentile} ms`;
      return {
        id: d.id,
        label: d.label,
        value,
        rating: ratingMap[f.category] || "unknown",
        description: d.desc,
      };
    }
    const lab = a[d.lab];
    if (lab && typeof lab.score === "number") {
      const r: CoreWebVital["rating"] =
        lab.score >= 0.9 ? "good" : lab.score >= 0.5 ? "needs-improvement" : "poor";
      return {
        id: d.id,
        label: d.label,
        value: lab.displayValue || "—",
        rating: r,
        description: `${d.desc} (lab data)`,
      };
    }
    return { id: d.id, label: d.label, value: "N/A", rating: "unknown", description: d.desc };
  });

  // --- 3. Security & Privacy ----------------------------------------------
  const secHeader = (name: string) => headersObj[name.toLowerCase()];
  const securityChecks: Check[] = [
    {
      label: "HTTPS encryption",
      status: isHttps ? "pass" : "fail",
      value: isHttps ? "Enabled" : "Not secure",
      description: isHttps
        ? "Traffic is encrypted over TLS."
        : "Site is served over HTTP — migrate to HTTPS immediately.",
    },
    {
      label: "HSTS",
      status: secHeader("strict-transport-security") ? "pass" : "warn",
      value: secHeader("strict-transport-security") ? "Enabled" : "Missing",
      description:
        "Strict-Transport-Security forces browsers to always connect over HTTPS.",
    },
    {
      label: "Content Security Policy",
      status: secHeader("content-security-policy") ? "pass" : "warn",
      value: secHeader("content-security-policy") ? "Set" : "Missing",
      description: "A CSP header mitigates cross-site scripting (XSS) and injection attacks.",
    },
    {
      label: "X-Frame-Options",
      status:
        secHeader("x-frame-options") || secHeader("content-security-policy")?.includes("frame-ancestors")
          ? "pass"
          : "warn",
      value: secHeader("x-frame-options") || "Missing",
      description: "Protects against clickjacking by controlling framing of your site.",
    },
    {
      label: "X-Content-Type-Options",
      status: secHeader("x-content-type-options") ? "pass" : "warn",
      value: secHeader("x-content-type-options") || "Missing",
      description: "Prevents MIME-type sniffing that can lead to drive-by attacks.",
    },
    {
      label: "Referrer-Policy",
      status: secHeader("referrer-policy") ? "pass" : "warn",
      value: secHeader("referrer-policy") || "Missing",
      description: "Controls how much referrer information is shared for user privacy.",
    },
    {
      label: "Permissions-Policy",
      status: secHeader("permissions-policy") ? "pass" : "info",
      value: secHeader("permissions-policy") ? "Set" : "Not set",
      description: "Restricts access to powerful browser features (camera, geolocation, etc.).",
    },
    {
      label: "Server version disclosure",
      status: secHeader("x-powered-by") || /\d/.test(secHeader("server") || "") ? "warn" : "pass",
      value: secHeader("x-powered-by") || secHeader("server") || "Hidden",
      description: secHeader("x-powered-by")
        ? "Server/framework version is exposed — consider hiding it to reduce attack surface."
        : "No revealing server/framework version headers detected.",
    },
  ];

  // --- 4. Best Practices (from Lighthouse) --------------------------------
  const bpChecks: Check[] = [];
  const bpAudits: [string, string][] = [
    ["is-on-https", "Uses HTTPS"],
    ["errors-in-console", "No console errors"],
    ["image-aspect-ratio", "Correct image aspect ratios"],
    ["doctype", "Valid HTML doctype"],
    ["charset", "Charset declared"],
    ["deprecations", "No deprecated APIs"],
  ];
  for (const [key, label] of bpAudits) {
    const audit = a[key];
    if (audit && typeof audit.score === "number") {
      bpChecks.push({
        label,
        status: audit.score === 1 ? "pass" : "warn",
        value: audit.score === 1 ? "Pass" : "Review",
        description: audit.title || label,
      });
    }
  }
  if (viewport) {
    bpChecks.push({
      label: "Mobile viewport",
      status: "pass",
      value: "Configured",
      description: "A responsive viewport meta tag is present for mobile devices.",
    });
  } else {
    bpChecks.push({
      label: "Mobile viewport",
      status: "fail",
      value: "Missing",
      description: "Add a <meta name='viewport'> tag for proper mobile rendering.",
    });
  }
  if (favicon) {
    bpChecks.push({
      label: "Favicon",
      status: "pass",
      value: "Present",
      description: "A favicon improves brand recognition in tabs and bookmarks.",
    });
  }

  // --- compute category scores --------------------------------------------
  const checkScore = (checks: Check[]): number => {
    const scored = checks.filter((c) => c.status !== "info");
    if (!scored.length) return 0;
    const sum = scored.reduce(
      (acc, c) => acc + (c.status === "pass" ? 1 : c.status === "warn" ? 0.5 : 0),
      0,
    );
    return Math.round((sum / scored.length) * 100);
  };

  const seoScore = psiData.scores.seo ?? checkScore(seoChecks);
  const perfScore = psiData.scores.performance ?? checkScore(perfChecks);
  const securityScore = checkScore(securityChecks);
  const bpScore = psiData.scores.bestPractices ?? checkScore(bpChecks);
  const accessibilityScore = psiData.scores.accessibility;

  const summaryFor = (score: number) =>
    score >= 90
      ? "Excellent — keep it up."
      : score >= 75
        ? "Good, with room to improve."
        : score >= 50
          ? "Needs attention."
          : "Critical issues found.";

  const categories: Category[] = [
    {
      id: "seo",
      title: "Technical SEO & Indexing",
      icon: "search",
      score: seoScore,
      summary: summaryFor(seoScore),
      checks: seoChecks,
    },
    {
      id: "performance",
      title: "Site Performance & Speed",
      icon: "zap",
      score: perfScore,
      summary: summaryFor(perfScore),
      checks: perfChecks,
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: "shield",
      score: securityScore,
      summary: summaryFor(securityScore),
      checks: securityChecks,
    },
    {
      id: "best-practices",
      title: "Best Practices",
      icon: "check",
      score: bpScore,
      summary: summaryFor(bpScore),
      checks: bpChecks,
    },
  ];

  const scoreList = [seoScore, perfScore, securityScore, bpScore];
  if (typeof accessibilityScore === "number") scoreList.push(accessibilityScore);
  const overall = Math.round(scoreList.reduce((a2, b) => a2 + b, 0) / scoreList.length);

  return NextResponse.json({
    url,
    finalUrl,
    fetchedAt: new Date().toISOString(),
    statusCode: status,
    scores: {
      overall,
      seo: seoScore,
      performance: perfScore,
      security: securityScore,
      bestPractices: bpScore,
      accessibility: accessibilityScore,
    },
    coreWebVitals,
    categories,
    notes: {
      pageSpeed: psiData.error ?? null,
    },
  });
}
