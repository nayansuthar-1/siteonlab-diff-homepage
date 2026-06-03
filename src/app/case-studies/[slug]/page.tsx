import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import ContactSection from "@/components/sections/ContactSection";
import TableOfContents, { type TocItem } from "@/components/blog/TableOfContents";
import ScheduleInterviewForm from "@/components/blog/ScheduleInterviewForm";
import styles from "@/components/blog/ArticleLayout.module.css";
import type { CSSProperties } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) return { title: "Case Study Not Found | SiteonLab" };

  return {
    title: `${study.title} | Case Study | SiteonLab`,
    description: study.description,
    openGraph: {
      title: study.title,
      description: study.description,
      images: study.imageUrl ? [study.imageUrl] : [],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) notFound();

  const tocItems: TocItem[] = study.sections.map((s, i) => ({
    id: `section-${i}`,
    title: s.title || `Section ${i + 1}`,
  }));

  return (
    <main>
      <section
        className={styles.page}
        style={{ "--accent": study.accent, "--accent-glow": `${study.accent}22` } as CSSProperties}
      >
        <div className={styles.bgPattern} />
        <div className={styles.glow} />

        <div className={styles.shell}>
          <Link href="/case-studies" className={styles.backLink}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8333 10H4.16667M4.16667 10L10 15.8333M4.16667 10L10 4.16667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Case Studies
          </Link>

          <header className={styles.heroHeader}>
            <span className={styles.category}>{study.category}</span>
            <h1 className={styles.title}>{study.title}</h1>
            <div className={styles.meta}>
              {study.client && <span>{study.client}</span>}
            </div>
          </header>

          <div className={styles.heroImage}>
            <Image src={study.imageUrl} alt={study.title} fill priority sizes="(max-width: 1320px) 100vw, 1320px" />
          </div>

          <div className={styles.grid}>
            <aside className={styles.tocCol}>
              <div className={styles.sticky}>
                <TableOfContents items={tocItems} />
              </div>
            </aside>

            <article className={styles.article}>
              {study.metrics.length > 0 && (
                <div className={styles.metrics}>
                  {study.metrics.map((metric, i) => (
                    <div key={i} className={styles.metric}>
                      <span className={styles.metricValue}>{metric.value}</span>
                      <span className={styles.metricLabel}>{metric.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {(study.challenge || study.solution) && (
                <div className={styles.calloutRow}>
                  {study.challenge && (
                    <div className={styles.callout}>
                      <div className={styles.calloutLabel}>Challenge</div>
                      <p className={styles.calloutText}>{study.challenge}</p>
                    </div>
                  )}
                  {study.solution && (
                    <div className={styles.callout}>
                      <div className={styles.calloutLabel}>Solution</div>
                      <p className={styles.calloutText}>{study.solution}</p>
                    </div>
                  )}
                </div>
              )}

              {study.sections.map((section, index) => (
                <div key={index} id={`section-${index}`} className={styles.section}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  {section.content && <p className={styles.paragraph}>{section.content}</p>}
                  {section.list && section.list.length > 0 && (
                    <ul className={styles.list}>
                      {section.list.map((item, i) => (
                        <li key={i} className={styles.listItem}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </article>

            <aside className={styles.formCol}>
              <div className={styles.sticky}>
                <ScheduleInterviewForm />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
