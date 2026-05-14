import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, caseStudies } from "@/lib/case-studies";
import ContactSection from "@/components/sections/ContactSection";
import styles from "./CaseStudyDetail.module.css";
import type { CSSProperties } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  
  if (!study) return { title: "Case Study Not Found | SiteonLab" };
  
  return {
    title: `${study.title} | Case Study | SiteonLab`,
    description: study.description,
    openGraph: {
      title: study.title,
      description: study.description,
      images: [study.imageUrl],
    },
  };
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <main>
      <section 
        className={styles.caseStudyDetail}
        style={{ "--accent": study.accent, "--accent-glow": `${study.accent}14` } as CSSProperties}
      >
        <div className={styles.bgPattern} />
        <div className={styles.glow} />

        <div className={styles.container}>
          <Link href="/case-studies" className={styles.backLink}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8333 10H4.16667M4.16667 10L10 15.8333M4.16667 10L10 4.16667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Case Studies
          </Link>

          <header className={styles.header}>
            <span className={styles.category}>{study.category}</span>
            <h1 className={styles.title}>{study.title}</h1>
            <p className={styles.client}>{study.client}</p>
          </header>

          <div className={styles.heroImage}>
            <Image
              src={study.imageUrl}
              alt={study.title}
              fill
              priority
              className={styles.image}
            />
          </div>

          <div className={styles.metricsGrid}>
            {study.metrics.map((metric, i) => (
              <div key={i} className={styles.metricCard}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>

          <article className={styles.contentBody}>
            {study.sections.map((section, index) => (
              <div key={index} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <p className={styles.paragraph}>{section.content}</p>
                {section.list && (
                  <ul className={styles.list}>
                    {section.list.map((item, i) => (
                      <li key={i} className={styles.listItem}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
