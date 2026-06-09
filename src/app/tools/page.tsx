import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import styles from "./Tools.module.css";

export const metadata: Metadata = {
  title: "Free Tools — SiteOnLab",
  description:
    "Free tools to measure and improve your website. Run an instant audit of your SEO, performance, security and more.",
};

const tools = [
  {
    title: "Website Audit",
    href: "/tools/website-audit",
    accent: "#22d3ee",
    description:
      "Get an instant, in-depth report on performance, accessibility, SEO, and best practices — complete with Core Web Vitals and a prioritized list of what to fix.",
    tags: ["Performance", "Accessibility", "SEO", "Core Web Vitals"],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
];

export default function ToolsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.glow} />
        <div className={styles.container}>
          <span className={styles.eyebrow}>Free Tools</span>
          <h1 className={styles.title}>
            Tools to measure and grow <span className={styles.highlight}>your website</span>
          </h1>
          <p className={styles.subtitle}>
            Actionable insights, no sign-up required. Pick a tool below and get a full report in
            seconds.
          </p>

          <div className={styles.grid}>
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={styles.card}
                style={{ ["--accent" as string]: tool.accent }}
              >
                <div className={styles.cardIcon}>{tool.icon}</div>
                <h2 className={styles.cardTitle}>{tool.title}</h2>
                <p className={styles.cardDesc}>{tool.description}</p>
                <div className={styles.tags}>
                  {tool.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className={styles.cardLink}>
                  Open tool
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <div className={styles.cardGlow} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
