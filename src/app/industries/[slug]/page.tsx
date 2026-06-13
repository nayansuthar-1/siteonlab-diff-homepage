import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/ui/Footer";
import IndustryIcon from "@/components/ui/IndustryIcon";
import { getIndustryBySlug, industries } from "@/lib/industries";
import styles from "./IndustryDetail.module.css";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return {
      title: "Industry not found | SiteOnLab",
    };
  }

  return {
    title: `${industry.title} Industry Solutions | SiteOnLab`,
    description: industry.description,
  };
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) notFound();

  const relatedIndustries = industries
    .filter((item) => item.slug !== industry.slug)
    .slice(0, 3);

  return (
    <main
      className={styles.main}
      style={{ "--industry-accent": industry.accent } as CSSProperties}
    >
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <Link href="/industries">Industries</Link>
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span>{industry.title}</span>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.iconBadge}>
                <IndustryIcon name={industry.icon} />
              </div>
              <span className={styles.kicker}>{industry.label}</span>
              <h1>{industry.title}</h1>
              <p>{industry.heroLine}</p>
              <Link href="/contact" className={styles.primaryCta}>
                Plan an industry build
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>

            <div className={styles.signalPanel}>
              <span>Industry signal</span>
              <h2>{industry.focusTitle}</h2>
              <p>{industry.focusIntro}</p>
              <div className={styles.metricGrid}>
                {industry.metrics.map((metric) => (
                  <div key={metric}>{metric}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.capabilitySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Built around your operations</span>
            <h2>Expertise and capabilities tuned for {industry.title.toLowerCase()}.</h2>
          </div>

          <div className={styles.capabilityGrid}>
            <div className={styles.listPanel}>
              <h3>Key expertise</h3>
              <ul>
                {industry.expertise.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.listPanel}>
              <h3>Capabilities we deliver</h3>
              <ul>
                {industry.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.workflowSection}>
        <div className={styles.container}>
          <div className={styles.workflowHeader}>
            <span className={styles.kicker}>Workflow model</span>
            <h2>{industry.workflowTitle}</h2>
            <p>{industry.workflowIntro}</p>
          </div>

          <div className={styles.processGrid}>
            {industry.workflows.map((step, index) => (
              <div className={styles.processStep} key={step.title}>
                <div className={styles.processNumber}>{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.outcomeSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Business outcomes</span>
            <h2>What this delivers for your {industry.title.toLowerCase()} business.</h2>
          </div>

          <div className={styles.outcomeGrid}>
            {industry.outcomes.map((outcome) => (
              <div className={styles.outcomeCard} key={outcome.title}>
                <span />
                <h3>{outcome.title}</h3>
                <p>{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.relatedSection}>
        <div className={styles.container}>
          <div className={styles.relatedHeader}>
            <div>
              <span className={styles.kicker}>More domains</span>
              <h2>Explore related industries</h2>
            </div>
            <Link href="/industries" className={styles.textLink}>
              View all industries
            </Link>
          </div>

          <div className={styles.relatedGrid}>
            {relatedIndustries.map((item) => (
              <Link
                key={item.slug}
                href={`/industries/${item.slug}`}
                className={styles.relatedCard}
                style={{ "--industry-accent": item.accent } as CSSProperties}
              >
                <IndustryIcon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer showSchedule={false} />
    </main>
  );
}
