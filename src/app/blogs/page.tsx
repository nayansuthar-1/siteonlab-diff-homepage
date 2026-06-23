import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./Blogs.module.css";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";
import { getAllBlogs } from "@/lib/blogs";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Blogs | SiteonLab",
  description: "Insights, news, and deep dives into our latest work and industry trends.",
};

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <main>
      <section className={styles.blogsPage}>
        <div className={styles.bgPattern} />
        <div className={styles.glow} />

        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Siteonlab Blogs</h1>
            <p className={styles.subtitle}>
              Insights, strategies, and deep dives to help you stay ahead in the digital landscape.
            </p>
          </div>

          <div className={styles.grid}>
            {blogs.map((blog) => (
              <Link 
                href={`/blogs/${blog.slug}`} 
                key={blog.id} 
                className={styles.card}
                style={{ "--accent": blog.accent } as CSSProperties}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.image}
                  />
                  <span className={styles.categoryBadge}>{blog.category}</span>
                  
                  <div className={styles.avatarWrapper}>
                    <Image
                      src="/siteonlab-logo.png"
                      alt="SiteOnLab"
                      width={2438}
                      height={813}
                      className={styles.avatarLogo}
                    />
                  </div>
                </div>

                <div className={styles.content}>
                  <h2 className={styles.cardTitle}>{blog.title}</h2>
                  <p className={styles.cardExcerpt}>{blog.excerpt}</p>
                  <span className={styles.readMore}>Read More »</span>
                </div>

                <div className={styles.footer}>
                  <span>{blog.date}</span>
                  <span className={styles.footerDot} />
                  <span>{blog.commentsCount}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Second Section - Contact Form */}
      <ContactSection />
      <Footer showSchedule={false} />
    </main>
  );
}
