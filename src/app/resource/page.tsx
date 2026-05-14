import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./Resource.module.css";
import ContactSection from "@/components/sections/ContactSection";
import { resources } from "@/lib/resources";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Case Studies & Resources | SiteonLab",
  description: "Explore our success stories and digital marketing strategies that drive results.",
};

export default function ResourcePage() {
  return (
    <main style={{ backgroundColor: "#fff" }}>
      <section className={styles.resourcePage}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Case Studies</h1>
          </header>

          <div className={styles.grid}>
            {resources.map((resource) => (
              <Link
                key={resource.id}
                href={`/resource/${resource.slug}`}
                className={styles.card}
                style={{ "--accent": resource.accent } as CSSProperties}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={resource.imageUrl}
                    alt={resource.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.image}
                  />
                  
                  <div className={styles.avatarWrapper}>
                    <Image
                      src="/siteon_lab-removebg-preview (1).png"
                      alt="SiteonLab"
                      width={40}
                      height={40}
                      style={{ objectFit: "contain", padding: "4px" }}
                    />
                  </div>
                </div>

                <div className={styles.content}>
                  <h2 className={styles.cardTitle}>{resource.title}</h2>
                  <span className={styles.readMore}>READ MORE »</span>
                </div>

                <div className={styles.footer}>
                  <span>{resource.date}</span>
                  <span className={styles.footerDot} />
                  <span>{resource.commentsCount}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Transition to dark section */}
      <div style={{ backgroundColor: "#000" }}>
        <ContactSection />
      </div>
    </main>
  );
}
