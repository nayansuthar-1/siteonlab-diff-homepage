"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./WebsiteAudit.module.css";

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

interface AuditResult {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  strategy: "mobile" | "desktop";
  scores: {
    performance: number | null;
    accessibility: number | null;
    bestPractices: number | null;
    seo: number | null;
  };
  cwv: { assessment: "pass" | "fail" | null; metrics: Metric[] };
  labMetrics: Metric[];
  categories: Category[];
}

type Strategy = "mobile" | "desktop";

interface LeadData {
  fullName: string;
  email: string;
  companyName: string;
}

const WORKFLOW_STEPS = [
  { label: "Loading your page", detail: "Capturing the page and its resources" },
  { label: "Measuring performance", detail: "Running a full lab analysis (this takes a moment)" },
  { label: "Checking accessibility & SEO", detail: "Auditing structure, markup and metadata" },
  { label: "Compiling your report", detail: "Scoring every category" },
];

const RATING_COLOR: Record<Rating, string> = {
  good: "#22c55e",
  "needs-improvement": "#f59e0b",
  poor: "#ef4444",
  info: "#64748b",
};

// PageSpeed-style thresholds: 0-49 poor, 50-89 needs work, 90-100 good.
function scoreRating(score: number | null): Rating {
  if (score === null) return "info";
  if (score >= 90) return "good";
  if (score >= 50) return "needs-improvement";
  return "poor";
}
function scoreColor(score: number | null): string {
  return RATING_COLOR[scoreRating(score)];
}

function ScoreGauge({ score, label }: { score: number | null; label: string }) {
  const size = 118;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = score ?? 0;
  const offset = circumference - (pct / 100) * circumference;
  const color = scoreColor(score);
  return (
    <div className={styles.gauge}>
      <div className={styles.gaugeRing} style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
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
        <span className={styles.gaugeScore} style={{ color }}>
          {score ?? "—"}
        </span>
      </div>
      <span className={styles.gaugeLabel}>{label}</span>
    </div>
  );
}

function MetricPill({ metric }: { metric: Metric }) {
  const color = RATING_COLOR[metric.rating];
  return (
    <div className={styles.metric}>
      <span className={styles.metricSquare} style={{ background: color }} />
      <div className={styles.metricBody}>
        <span className={styles.metricLabel}>{metric.label}</span>
        <span className={styles.metricValue} style={{ color }}>
          {metric.value}
        </span>
      </div>
    </div>
  );
}

function CategorySection({ category }: { category: Category }) {
  const [showPassed, setShowPassed] = useState(false);
  const problems = category.audits.filter(
    (a) => a.rating === "poor" || a.rating === "needs-improvement",
  );
  const rest = category.audits.filter((a) => a.rating === "good" || a.rating === "info");

  const renderAudit = (a: Audit) => (
    <li key={a.id} className={styles.audit}>
      <span className={styles.auditDot} style={{ background: RATING_COLOR[a.rating] }} />
      <div className={styles.auditBody}>
        <div className={styles.auditTop}>
          <span className={styles.auditTitle}>{a.title}</span>
          {a.displayValue && (
            <span className={styles.auditValue} style={{ color: RATING_COLOR[a.rating] }}>
              {a.displayValue}
            </span>
          )}
        </div>
        {a.description && <span className={styles.auditDesc}>{a.description}</span>}
      </div>
    </li>
  );

  return (
    <div className={styles.catCard}>
      <div className={styles.catHeader}>
        <h3 className={styles.catTitle}>{category.title}</h3>
        <span className={styles.catScore} style={{ color: scoreColor(category.score) }}>
          {category.score ?? "—"}
          <span>/100</span>
        </span>
      </div>
      <div className={styles.catBar}>
        <div
          className={styles.catBarFill}
          style={{ width: `${category.score ?? 0}%`, background: scoreColor(category.score) }}
        />
      </div>

      {problems.length > 0 ? (
        <ul className={styles.audits}>{problems.map(renderAudit)}</ul>
      ) : (
        <p className={styles.catClean}>No issues found in this category. Nice work!</p>
      )}

      {rest.length > 0 && (
        <>
          <button className={styles.toggle} onClick={() => setShowPassed((v) => !v)}>
            {showPassed ? "Hide" : "Show"} {rest.length} passed &amp; informational checks
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: showPassed ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {showPassed && <ul className={styles.audits}>{rest.map(renderAudit)}</ul>}
        </>
      )}
    </div>
  );
}

export default function WebsiteAudit() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<Strategy>("mobile");
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stepTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const lastAudited = useRef<string>("");

  // Lead form state
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({ fullName: "", email: "", companyName: "" });
  const [leadError, setLeadError] = useState<string | null>(null);
  const [pendingUrl, setPendingUrl] = useState("");

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

  async function audit(targetUrl: string, strat: Strategy, lead: LeadData) {
    if (!targetUrl.trim() || loading) return;
    lastAudited.current = targetUrl.trim();
    setLoading(true);
    setError(null);
    setResult(null);
    setActiveStep(0);

    if (stepTimer.current) clearInterval(stepTimer.current);
    stepTimer.current = setInterval(() => {
      setActiveStep((s) => (s < WORKFLOW_STEPS.length - 1 ? s + 1 : s));
    }, 5000);

    try {
      const res = await fetch(
        `/api/website-audit?url=${encodeURIComponent(targetUrl.trim())}&strategy=${strat}`,
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong while auditing this site.");
      } else {
        setActiveStep(WORKFLOW_STEPS.length - 1);
        const auditResult = data as AuditResult;
        setResult(auditResult);

        // Save lead + audit scores to DB (fire-and-forget)
        fetch("/api/admin/audit-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: lead.fullName,
            email: lead.email,
            companyName: lead.companyName,
            websiteUrl: targetUrl.trim(),
            strategy: strat,
            scores: auditResult.scores,
          }),
        }).catch(() => {
          // Silently ignore — the audit still succeeded
        });
      }
    } catch {
      setError("We couldn't complete the audit. Please check the URL and try again.");
    } finally {
      if (stepTimer.current) clearInterval(stepTimer.current);
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setPendingUrl(url.trim());
    setLeadError(null);
    setShowLeadForm(true);
  }

  function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { fullName, email, companyName } = leadData;

    if (!fullName.trim() || !email.trim() || !companyName.trim()) {
      setLeadError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setLeadError("Please enter a valid email address.");
      return;
    }

    setShowLeadForm(false);
    setLeadError(null);
    audit(pendingUrl, strategy, leadData);
  }

  function handleLeadClose() {
    setShowLeadForm(false);
    setLeadError(null);
  }

  function switchStrategy(strat: Strategy) {
    if (strat === strategy || loading) return;
    setStrategy(strat);
    if (lastAudited.current) audit(lastAudited.current, strat, leadData);
  }

  return (
    <>
      {/* ---------- HERO (unchanged design) ---------- */}
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
            Enter a URL for an instant report on performance, accessibility, SEO, and best
            practices — with Core Web Vitals and a prioritized list of what to fix.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
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

        </div>
      </section>

      {/* ---------- LEAD CAPTURE MODAL ---------- */}
      {showLeadForm && (
        <div className={styles.modalBackdrop} onClick={handleLeadClose}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleLeadClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className={styles.modalHeader}>
              <div className={styles.modalIconWrap}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h2 className={styles.modalTitle}>Get Your Audit Report</h2>
              <p className={styles.modalSub}>
                Enter your details below to receive your free website audit report.
              </p>
            </div>

            <form className={styles.modalForm} onSubmit={handleLeadSubmit}>
              {leadError && <div className={styles.modalError}>{leadError}</div>}

              <div className={styles.modalField}>
                <label className={styles.modalLabel} htmlFor="lead-name">Full Name</label>
                <input
                  id="lead-name"
                  type="text"
                  className={styles.modalInput}
                  placeholder="John Doe"
                  value={leadData.fullName}
                  onChange={(e) => setLeadData((d) => ({ ...d, fullName: e.target.value }))}
                  autoFocus
                />
              </div>

              <div className={styles.modalField}>
                <label className={styles.modalLabel} htmlFor="lead-email">Email Address</label>
                <input
                  id="lead-email"
                  type="email"
                  className={styles.modalInput}
                  placeholder="john@company.com"
                  value={leadData.email}
                  onChange={(e) => setLeadData((d) => ({ ...d, email: e.target.value }))}
                />
              </div>

              <div className={styles.modalField}>
                <label className={styles.modalLabel} htmlFor="lead-company">Company Name</label>
                <input
                  id="lead-company"
                  type="text"
                  className={styles.modalInput}
                  placeholder="Acme Inc."
                  value={leadData.companyName}
                  onChange={(e) => setLeadData((d) => ({ ...d, companyName: e.target.value }))}
                />
              </div>

              <div className={styles.modalField}>
                <label className={styles.modalLabel} htmlFor="lead-url">Website URL</label>
                <input
                  id="lead-url"
                  type="text"
                  className={styles.modalInput}
                  value={pendingUrl}
                  readOnly
                  style={{ opacity: 0.6, cursor: "default" }}
                />
              </div>

              <button type="submit" className={styles.modalSubmit}>
                Start Audit
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <div ref={resultsRef} />

      {/* ---------- LOADING ---------- */}
      {loading && (
        <section className={styles.workflow}>
          <div className={styles.container}>
            <div className={styles.workflowCard}>
              <div className={styles.spinner} />
              <h2 className={styles.workflowTitle}>Auditing {lastAudited.current}</h2>
              <ol className={styles.steps}>
                {WORKFLOW_STEPS.map((step, i) => {
                  const state = i < activeStep ? "done" : i === activeStep ? "active" : "pending";
                  return (
                    <li key={step.label} className={`${styles.step} ${styles[state]}`}>
                      <span className={styles.stepDot}>{state === "done" ? "✓" : i + 1}</span>
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

      {/* ---------- ERROR ---------- */}
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
              {lastAudited.current && (
                <button className={styles.rerun} onClick={() => audit(lastAudited.current, strategy, leadData)}>
                  Try again
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------- RESULTS ---------- */}
      {result && !loading && (
        <section className={styles.results}>
          <div className={styles.container}>
            {/* report bar */}
            <div className={styles.reportBar}>
              <div>
                <span className={styles.reportLabel}>Report for</span>
                <h2 className={styles.reportUrl}>{result.finalUrl}</h2>
                <span className={styles.reportMeta}>
                  Analyzed {new Date(result.fetchedAt).toLocaleString()}
                </span>
              </div>
              <div className={styles.strategyTabs}>
                <button
                  className={`${styles.strategyTab} ${strategy === "mobile" ? styles.strategyActive : ""}`}
                  onClick={() => switchStrategy("mobile")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                  Mobile
                </button>
                <button
                  className={`${styles.strategyTab} ${strategy === "desktop" ? styles.strategyActive : ""}`}
                  onClick={() => switchStrategy("desktop")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  Desktop
                </button>
              </div>
            </div>

            {/* Core Web Vitals assessment */}
            <div className={styles.cwvSection}>
              <div className={styles.cwvHeader}>
                <h3 className={styles.sectionHeading}>Core Web Vitals Assessment</h3>
                {result.cwv.assessment && (
                  <span
                    className={styles.cwvVerdict}
                    style={{
                      color: result.cwv.assessment === "pass" ? "#22c55e" : "#ef4444",
                      borderColor: result.cwv.assessment === "pass" ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {result.cwv.assessment === "pass" ? "Passed" : "Failed"}
                  </span>
                )}
              </div>
              {result.cwv.metrics.length > 0 ? (
                <div className={styles.metricsGrid}>
                  {result.cwv.metrics.map((m) => (
                    <MetricPill key={m.id} metric={m} />
                  ))}
                </div>
              ) : (
                <p className={styles.noField}>
                  Not enough real-world usage data is available for this site yet. The lab results
                  below still provide a full picture of its health.
                </p>
              )}
            </div>

            {/* Category gauges */}
            <div className={styles.gauges}>
              <ScoreGauge score={result.scores.performance} label="Performance" />
              <ScoreGauge score={result.scores.accessibility} label="Accessibility" />
              <ScoreGauge score={result.scores.bestPractices} label="Best Practices" />
              <ScoreGauge score={result.scores.seo} label="SEO" />
            </div>

            <div className={styles.legend}>
              <span><i style={{ background: "#ef4444" }} /> 0–49</span>
              <span><i style={{ background: "#f59e0b" }} /> 50–89</span>
              <span><i style={{ background: "#22c55e" }} /> 90–100</span>
            </div>

            {/* Lab metrics */}
            {result.labMetrics.length > 0 && (
              <div className={styles.cwvSection}>
                <h3 className={styles.sectionHeading}>Metrics</h3>
                <div className={styles.metricsGrid}>
                  {result.labMetrics.map((m) => (
                    <MetricPill key={m.id} metric={m} />
                  ))}
                </div>
              </div>
            )}

            {/* Per-category diagnostics */}
            <div className={styles.categories}>
              {result.categories.map((cat) => (
                <CategorySection key={cat.id} category={cat} />
              ))}
            </div>

            {/* CTA */}
            <div className={styles.cta}>
              <h3>Want us to fix these issues for you?</h3>
              <p>
                Our team turns audit findings into real growth — faster pages, higher rankings, and
                a more accessible, secure site.
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
