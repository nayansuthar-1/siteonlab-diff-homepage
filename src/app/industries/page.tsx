import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import IndustryIcon from "@/components/ui/IndustryIcon";
import { industries } from "@/lib/industries";
import styles from "./Industries.module.css";

export const metadata: Metadata = {
  title: "Industries | SiteOnLab",
  description:
    "Explore SiteOnLab industry expertise across travel, ecommerce, healthcare, law firms, and jewellery.",
};

export default function IndustriesPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroAtmosphere} />

        <div className={styles.heroShell}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Industry intelligence</span>
            <h1 className={styles.heading}>Digital products shaped for your market.</h1>
            <p className={styles.subheading}>
              We combine domain knowledge, product strategy, and conversion-focused engineering
              for industries where trust, speed, and clarity matter.
            </p>
            <Link href="/contact" className={styles.primaryCta}>
              Book consultation
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.robotFrame}>
              <Image
                src="/erasebg-transformed.png"
                alt=""
                fill
                priority
                className={styles.robotHand}
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>

            <div className={styles.orbit}>
              {industries.map((industry, index) => (
                <div
                  key={industry.slug}
                  className={`${styles.orbitCard} ${styles[`orbitCard${index + 1}`]}`}
                  style={{ "--industry-accent": industry.accent } as CSSProperties}
                >
                  <IndustryIcon name={industry.icon} />
                  <span>{industry.navTitle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.selectorSection}>
        <div className={styles.selectorIntro}>
          <span className={styles.eyebrow}>Domain stack</span>
          <h2>Five focused industries, one execution standard.</h2>
          <p>
            The old industry list is now narrowed into the verticals you asked for.
            Each page has tailored systems, workflows, and business outcomes.
          </p>
        </div>

        <div className={styles.industryGrid}>
          {industries.map((industry, index) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className={styles.industryCard}
              style={{ "--industry-accent": industry.accent } as CSSProperties}
            >
              <div className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</div>
              <div className={styles.cardIcon}>
                <IndustryIcon name={industry.icon} />
              </div>
              <span className={styles.cardLabel}>{industry.label}</span>
              <h3>{industry.title}</h3>
              <p>{industry.description}</p>
              <div className={styles.cardMetrics}>
                {industry.metrics.slice(0, 2).map((metric) => (
                  <span key={metric}>{metric}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.operatingSection}>
        <div className={styles.operatingHeader}>
          <span className={styles.eyebrow}>How we think</span>
          <h2>Industry-aware design, not one-size-fits-all templates.</h2>
        </div>

        <div className={styles.operatingGrid}>
          <div className={styles.operatingPanel}>
            <span>01</span>
            <h3>Domain patterns</h3>
            <p>We map the buying journey, operational workflow, data model, and compliance pressure before choosing features.</p>
          </div>
          <div className={styles.operatingPanel}>
            <span>02</span>
            <h3>Product surface</h3>
            <p>We design the storefront, portal, dashboard, or booking flow around what users actually need to decide faster.</p>
          </div>
          <div className={styles.operatingPanel}>
            <span>03</span>
            <h3>Growth systems</h3>
            <p>We connect analytics, CRM, automation, and content structures so the product keeps learning after launch.</p>
          </div>
        </div>
      </section>

      <Footer showSchedule={false} />
    </main>
  );
}
