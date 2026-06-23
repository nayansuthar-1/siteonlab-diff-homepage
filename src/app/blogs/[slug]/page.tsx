import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";
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
  const blog = await getBlogBySlug(slug);

  if (!blog) return { title: "Blog Not Found | SiteonLab" };

  return {
    title: `${blog.title} | SiteonLab Blogs`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.imageUrl ? [blog.imageUrl] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const tocItems: TocItem[] = blog.sections.map((s, i) => ({
    id: `section-${i}`,
    title: s.title || `Section ${i + 1}`,
  }));

  return (
    <main>
      <section
        className={styles.page}
        style={{ "--accent": blog.accent, "--accent-glow": `${blog.accent}22` } as CSSProperties}
      >
        <div className={styles.bgPattern} />
        <div className={styles.glow} />

        <div className={styles.shell}>
          <Link href="/blogs" className={styles.backLink}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8333 10H4.16667M4.16667 10L10 15.8333M4.16667 10L10 4.16667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blogs
          </Link>

          {/* Header + image first */}
          <header className={styles.heroHeader}>
            <span className={styles.category}>{blog.category}</span>
            <h1 className={styles.title}>{blog.title}</h1>
            <div className={styles.meta}>
              <span>{blog.date}</span>
              <span className={styles.metaDot} />
              <span>{blog.commentsCount}</span>
            </div>
          </header>

          <div className={styles.heroImage}>
            <Image src={blog.imageUrl} alt={blog.title} fill priority sizes="(max-width: 1320px) 100vw, 1320px" />
          </div>

          {/* TOC | article | form */}
          <div className={styles.grid}>
            <aside className={styles.tocCol}>
              <div className={styles.sticky}>
                <TableOfContents items={tocItems} />
              </div>
            </aside>

            <article className={styles.article}>
              {blog.sections.map((section, index) => (
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
      <Footer showSchedule={false} />
    </main>
  );
}
