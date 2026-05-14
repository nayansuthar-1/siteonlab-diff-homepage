import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, blogs } from "@/lib/blogs";
import ContactSection from "@/components/sections/ContactSection";
import styles from "./BlogDetail.module.css";
import type { CSSProperties } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  
  if (!blog) return { title: "Blog Not Found | SiteonLab" };
  
  return {
    title: `${blog.title} | SiteonLab Blogs`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.imageUrl],
    },
  };
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main>
      <section 
        className={styles.blogDetail}
        style={{ "--accent": blog.accent, "--accent-glow": `${blog.accent}14` } as CSSProperties}
      >
        <div className={styles.bgPattern} />
        <div className={styles.glow} />

        <div className={styles.container}>
          <Link href="/blogs" className={styles.backLink}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8333 10H4.16667M4.16667 10L10 15.8333M4.16667 10L10 4.16667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Blogs
          </Link>

          <header className={styles.header}>
            <span className={styles.category}>{blog.category}</span>
            <h1 className={styles.title}>{blog.title}</h1>
            <div className={styles.meta}>
              <span>{blog.date}</span>
              <span className={styles.metaDot} />
              <span>{blog.commentsCount}</span>
            </div>
          </header>

          <div className={styles.heroImage}>
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              priority
              className={styles.image}
            />
          </div>

          <article className={styles.article}>
            {blog.sections.map((section, index) => (
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
