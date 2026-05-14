import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./CaseStudies.module.css";
import ContactSection from "@/components/sections/ContactSection";
import { caseStudies } from "@/lib/case-studies";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Case Studies | SiteonLab",
  description: "Explore our success stories and see how we help businesses grow through technology and design.",
};

export default function CaseStudiesPage() {
  return (
    <main>
      <section className={styles.caseStudiesPage}>
        <div className={styles.bgPattern} />
        <div className={styles.glow} />

        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Case Studies</h1>
            <p className={styles.subtitle}>
              Real-world examples of how we've helped our clients achieve their business goals.
            </p>
          </div>

          <div className={styles.grid}>
            {caseStudies.map((study) => (
              <Link 
                href={`/case-studies/${study.slug}`} 
                key={study.id} 
                className={styles.card}
                style={{ "--accent": study.accent } as CSSProperties}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={study.imageUrl}
                    alt={study.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={styles.image}
                  />
                </div>

                <div className={styles.content}>
                  <span className={styles.category}>{study.category}</span>
                  <h2 className={styles.cardTitle}>{study.title}</h2>
                  <p className={styles.client}>{study.client}</p>
                  <p className={styles.description}>{study.description}</p>
                  
                  <div className={styles.metrics}>
                    {study.metrics.map((metric, i) => (
                      <div key={i} className={styles.metric}>
                        <span className={styles.metricValue}>{metric.value}</span>
                        <span className={styles.metricLabel}>{metric.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.viewLink}>
                      View Case Study
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
