"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./WebsiteAudit.module.css";

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

interface AuditResult {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  statusCode: number;
  scores: {
    overall: number;
    seo: number;
    performance: number;
    security: number;
    bestPractices: number;
    accessibility: number | null;
  };
  coreWebVitals: CoreWebVital[];
  categories: Category[];
  notes: { pageSpeed: string | null };
}

const WORKFLOW_STEPS = [
  { label: "Fetching your page", detail: "Loading HTML & response headers" },
  { label: "Running PageSpeed Insights", detail: "Google Lighthouse analysis (this can take a moment)" },
  { label: "Auditing security & privacy", detail: "Inspecting TLS and security headers" },
  { label: "Compiling your report", detail: "Scoring every category" },
];

function scoreColor(score: number | null): string {
  if (score === null) return "#64748b";
  if (score >= 90) return "#22c55e";
  if (score >= 75) return "#84cc16";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

function CategoryIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "zap":
      return (
        <svg {...common}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    default:
      return null;
  }
}

function ScoreRing({ score, size = 132 }: { score: number | null; size?: number }) {
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = score === null ? 0 : score;
  const offset = circumference - (pct / 100) * circumference;
  const color = scoreColor(score);
  return (
    <div className={styles.ring} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className={styles.ringLabel}>
        <span className={styles.ringScore} style={{ color }}>
          {score === null ? "—" : score}
        </span>
        <span className={styles.ringMax}>/ 100</span>
      </div>
    </div>
  );
}

const STATUS_META: Record<CheckStatus, { color: string; symbol: string; label: string }> = {
  pass: { color: "#22c55e", symbol: "✓", label: "Pass" },
  warn: { color: "#f59e0b", symbol: "!", label: "Warning" },
  fail: { color: "#ef4444", symbol: "✕", label: "Fail" },
  info: { color: "#64748b", symbol: "i", label: "Info" },
};

export default function WebsiteAudit() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stepTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (stepTimer.current) clearInterval(stepTimer.current);
    };
  }, []);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  async function runAudit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setActiveStep(0);

    // Advance the workflow steps for feedback while the request runs.
    if (stepTimer.current) clearInterval(stepTimer.current);
    stepTimer.current = setInterval(() => {
      setActiveStep((s) => (s < WORKFLOW_STEPS.length - 1 ? s + 1 : s));
    }, 4000);

    try {
      const res = await fetch(`/api/website-audit?url=${encodeURIComponent(url.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong while auditing this site.");
      } else {
        setActiveStep(WORKFLOW_STEPS.length - 1);
        setResult(data as AuditResult);
      }
    } catch {
      setError("We couldn't complete the audit. Please check the URL and try again.");
    } finally {
      if (stepTimer.current) clearInterval(stepTimer.current);
      setLoading(false);
    }
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.glow} />
        <div className={styles.container}>
          <Link href="/tools" className={styles.breadcrumb}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All tools
          </Link>
          <span className={styles.eyebrow}>Free Website Audit</span>
          <h1 className={styles.title}>
            Is your website <span className={styles.highlight}>healthy?</span>
          </h1>
          <p className={styles.subtitle}>
            Enter a URL for an instant report on technical SEO, performance, Core Web Vitals,
            security, and best practices. Powered by Google PageSpeed Insights and live header
            analysis.
          </p>

          <form className={styles.form} onSubmit={runAudit}>
            <div className={styles.inputWrap}>
              <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yourwebsite.com"
                className={styles.input}
                disabled={loading}
                aria-label="Website URL"
              />
            </div>
            <button type="submit" className={styles.submit} disabled={loading || !url.trim()}>
              {loading ? "Analyzing…" : "Run Audit"}
              {!loading && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </form>
          <p className={styles.hint}>Free · No sign-up · Results in seconds</p>
        </div>
      </section>

      <div ref={resultsRef} />

      {loading && (
        <section className={styles.workflow}>
          <div className={styles.container}>
            <div className={styles.workflowCard}>
              <div className={styles.spinner} />
              <h2 className={styles.workflowTitle}>Auditing {url}</h2>
              <ol className={styles.steps}>
                {WORKFLOW_STEPS.map((step, i) => {
                  const state = i < activeStep ? "done" : i === activeStep ? "active" : "pending";
                  return (
                    <li key={step.label} className={`${styles.step} ${styles[state]}`}>
                      <span className={styles.stepDot}>
                        {state === "done" ? "✓" : i + 1}
                      </span>
                      <div className={styles.stepText}>
                        <span className={styles.stepLabel}>{step.label}</span>
                        <span className={styles.stepDetail}>{step.detail}</span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>
      )}

      {error && !loading && (
        <section className={styles.errorSection}>
          <div className={styles.container}>
            <div className={styles.errorCard}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        </section>
      )}

      {result && !loading && (
        <section className={styles.results}>
          <div className={styles.container}>
            {/* Overview */}
            <div className={styles.overview}>
              <div className={styles.overviewMain}>
                <ScoreRing score={result.scores.overall} />
                <div>
                  <span className={styles.overviewLabel}>Overall health score</span>
                  <h2 className={styles.overviewUrl}>{result.finalUrl}</h2>
                  <p className={styles.overviewMeta}>
                    Audited {new Date(result.fetchedAt).toLocaleString()} · HTTP {result.statusCode}
                  </p>
                  <button
                    className={styles.rerun}
                    onClick={() => {
                      setResult(null);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Run another audit
                  </button>
                </div>
              </div>

              <div className={styles.scorePills}>
                {[
                  { label: "SEO", v: result.scores.seo },
                  { label: "Performance", v: result.scores.performance },
                  { label: "Security", v: result.scores.security },
                  { label: "Best Practices", v: result.scores.bestPractices },
                  ...(result.scores.accessibility !== null
                    ? [{ label: "Accessibility", v: result.scores.accessibility }]
                    : []),
                ].map((p) => (
                  <div key={p.label} className={styles.pill}>
                    <span className={styles.pillScore} style={{ color: scoreColor(p.v) }}>
                      {p.v}
                    </span>
                    <span className={styles.pillLabel}>{p.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {result.notes.pageSpeed && (
              <p className={styles.notice}>
                Note: {result.notes.pageSpeed} Some performance metrics may be estimated from a
                direct fetch.
              </p>
            )}

            {/* Core Web Vitals */}
            <div className={styles.cwvSection}>
              <h3 className={styles.sectionHeading}>Core Web Vitals</h3>
              <div className={styles.cwvGrid}>
                {result.coreWebVitals.map((v) => {
                  const ratingColor =
                    v.rating === "good"
                      ? "#22c55e"
                      : v.rating === "needs-improvement"
                        ? "#f59e0b"
                        : v.rating === "poor"
                          ? "#ef4444"
                          : "#64748b";
                  return (
                    <div key={v.id} className={styles.cwvCard}>
                      <div className={styles.cwvTop}>
                        <span className={styles.cwvName}>{v.label}</span>
                        <span className={styles.cwvBadge} style={{ color: ratingColor, borderColor: ratingColor }}>
                          {v.rating === "needs-improvement" ? "needs work" : v.rating}
                        </span>
                      </div>
                      <span className={styles.cwvValue} style={{ color: ratingColor }}>
                        {v.value}
                      </span>
                      <span className={styles.cwvDesc}>{v.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category breakdowns */}
            <div className={styles.categories}>
              {result.categories.map((cat) => (
                <div key={cat.id} className={styles.catCard}>
                  <div className={styles.catHeader}>
                    <div className={styles.catHeaderLeft}>
                      <span className={styles.catIcon} style={{ color: scoreColor(cat.score) }}>
                        <CategoryIcon name={cat.icon} />
                      </span>
                      <div>
                        <h3 className={styles.catTitle}>{cat.title}</h3>
                        <span className={styles.catSummary}>{cat.summary}</span>
                      </div>
                    </div>
                    <div className={styles.catScore} style={{ color: scoreColor(cat.score) }}>
                      {cat.score ?? "—"}
                      <span>/100</span>
                    </div>
                  </div>
                  <div className={styles.catBar}>
                    <div
                      className={styles.catBarFill}
                      style={{
                        width: `${cat.score ?? 0}%`,
                        background: scoreColor(cat.score),
                      }}
                    />
                  </div>
                  <ul className={styles.checks}>
                    {cat.checks.map((check, i) => {
                      const meta = STATUS_META[check.status];
                      return (
                        <li key={i} className={styles.check}>
                          <span
                            className={styles.checkBadge}
                            style={{ color: meta.color, borderColor: meta.color }}
                            title={meta.label}
                          >
                            {meta.symbol}
                          </span>
                          <div className={styles.checkBody}>
                            <div className={styles.checkTop}>
                              <span className={styles.checkLabel}>{check.label}</span>
                              {check.value && (
                                <span className={styles.checkValue} style={{ color: meta.color }}>
                                  {check.value}
                                </span>
                              )}
                            </div>
                            <span className={styles.checkDesc}>{check.description}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={styles.cta}>
              <h3>Want us to fix these issues for you?</h3>
              <p>
                Our team turns audit findings into real growth — faster pages, higher rankings, and
                a more secure site.
              </p>
              <Link href="/contact" className={styles.ctaBtn}>
                Talk to an expert
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
