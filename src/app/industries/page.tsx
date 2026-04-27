"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Industries.module.css";
import Footer from "@/components/ui/Footer";

export default function IndustriesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.glowContainer}>
          <div className={styles.orangeGlow}></div>
          <div className={styles.orangeGlowSecondary}></div>
          <div className={styles.orangeGlowThird}></div>
          <div className={styles.orangeGlowBase}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.leftContent}>
            <h1 className={styles.heading}>
              Domain Expertise
            </h1>
            <p className={styles.subheading}>
              Discover our industry-specific expertise across 8 key domains, including finance, healthcare, education, e-commerce, travel, manufacturing, and more.
            </p>
          </div>

          <div className={styles.rightContent}>
            <div className={styles.imageContainer}>
              <div className={styles.robotHandWrapper}>
                <Image
                  src="/erasebg-transformed.png"
                  alt="Robot Hand"
                  fill
                  priority
                  className={styles.robotHand}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className={styles.iconsContainer}>
                {/* Finance - Briefcase */}
                <div className={`${styles.floatingCard} ${styles.iconFinance}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 5c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H9V5z" />
                  </svg>
                </div>

                {/* Security - Shield */}
                <div className={`${styles.floatingCard} ${styles.iconSecurity}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                </div>

                {/* Education - Graduation Cap */}
                <div className={`${styles.floatingCard} ${styles.iconEducation}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                  </svg>
                </div>

                {/* Logistics - Arrows */}
                <div className={`${styles.floatingCard} ${styles.iconLogistics}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                    <path d="M12 8l-4 4h3v4h2v-4h3z" />
                  </svg>
                </div>

                {/* E-commerce - Shopping Cart */}
                <div className={`${styles.floatingCard} ${styles.iconEcommerce}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </div>

                {/* Real Estate - House */}
                <div className={`${styles.floatingCard} ${styles.iconRealEstate}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>

                {/* Travel - Flag */}
                <div className={`${styles.floatingCard} ${styles.iconTravel}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
                  </svg>
                </div>

                {/* Retail - Price Tag */}
                <div className={`${styles.floatingCard} ${styles.iconRetail}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 8.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <span>Scroll to discover more</span>
          <div className={styles.scrollIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.gridTextContent}>
          <h2 className={styles.gridHeading}>
            We&apos;ve built for your industry
          </h2>
          <p className={styles.gridDescription}>
            From finance to manufacturing, your industry is not new to us. 
            We&apos;ve solved the kinds of challenges you&apos;re dealing with, 
            so you can count on us to build your next product with the right tech, 
            on budget, and on time.
          </p>
          <a href="#consultation" className={styles.ctaButton}>
            Book consultation
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div className={styles.industryGrid}>
          <div className={`${styles.industryCard} ${styles.iconFinance}`}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 5c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H9V5z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Finance</h3>
          </div>

          <div className={`${styles.industryCard} ${styles.iconHealthcare}`}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Healthcare</h3>
          </div>

          <div className={`${styles.industryCard} ${styles.iconEducation}`}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Education</h3>
          </div>

          <div className={`${styles.industryCard} ${styles.iconEcommerce}`}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>E-commerce & retail</h3>
          </div>

          <div className={`${styles.industryCard} ${styles.iconLogistics}`}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                <path d="M12 8l-4 4h3v4h2v-4h3z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Transportation & delivery</h3>
          </div>

          <div className={`${styles.industryCard} ${styles.iconRealEstate}`}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Real estate & property management</h3>
          </div>

          <div className={`${styles.industryCard} ${styles.iconTravel}`}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Travel & HoReCa</h3>
          </div>

          <div className={`${styles.industryCard} ${styles.iconRetail}`}>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 8.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Manufacturing</h3>
          </div>
        </div>
      </section>

      <Footer showSchedule={false} />
    </main>
  );
}
