"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Expertise.module.css";
import Footer from "@/components/ui/Footer";

export default function ExpertisePage() {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.glowContainer}>
          <div className={styles.glow}></div>
          <div className={styles.glowSecond}></div>
          <div className={styles.glowThird}></div>
          <div ref={cursorRef} className={styles.cursorGlow}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.leftContent}>
            <h1 className={styles.heading}>
              Web & Mobile App<br />Development Services
            </h1>
            <p className={styles.subheading}>
              Digitize your business processes or launch new products for web and mobile platforms - we take care of the entire cycle of software development.
            </p>
            <Link href="/contact" className={styles.ctaBtn}>
              Get in touch
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className={styles.rightContent}>
            <div className={styles.imageWrapper}>
              <Image
                src="/hero_devices-Photoroom.png"
                alt="Web and Mobile App Devices"
                fill
                priority
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
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

      {/* What We Provide Section */}
      <section className={styles.provideSection}>
        <div className={styles.provideLeft}>
          <h2 className={styles.provideTitle}>What we provide</h2>
          <p className={styles.provideSubtitle}>
            We simplify your application development journey, making it cost-efficient, predictable, and secure.
          </p>
          <a href="#consultation" className={styles.ctaBtn}>
            Book consultation
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className={styles.provideRight}>
          <div className={styles.featureCard}>
            <div className={`${styles.featureIconBox} ${styles.blue}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.26l5.35-5.35" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Full-cycle development</h3>
            <p className={styles.featureDesc}>
              From business analysis to ongoing software support and maintenance - we cover the entire cycle of software development.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIconBox} ${styles.pink}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Cost-effective and fast</h3>
            <p className={styles.featureDesc}>
              With our extensive knowledge of top frameworks and toolsets, we leverage deep technical expertise to accelerate your software&apos;s time to market.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIconBox} ${styles.yellow}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Skilled team</h3>
            <p className={styles.featureDesc}>
              Software developers, UI/UX designers, QA specialists, product managers, DevOps engineers - you&apos;ll work with a team of experts taking care.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIconBox} ${styles.purple}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Your IP is 100% yours</h3>
            <p className={styles.featureDesc}>
              We safeguard your ideas, ensuring that your IP remains exclusively yours. Your trust is invaluable, and we prioritize the security.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={`${styles.serviceCard} ${styles.blueCard}`}>
          <div className={styles.serviceCardContent}>
            <div className={styles.serviceIcon}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 18H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2zM4 6v10h16V6H4z" opacity="0.3" />
                <path d="M20 18H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z" />
                <rect x="17" y="9" width="6" height="12" rx="1.5" stroke="#0a0a0a" strokeWidth="2" />
                <circle cx="20" cy="18.5" r="0.8" fill="#0a0a0a" />
              </svg>
            </div>
            <h2 className={styles.serviceCardTitle}>
              Develop a product from scratch for any platform
            </h2>
            <p className={styles.serviceCardDesc}>
              Develop new web or mobile applications using our extensive expertise - we cover design, development, testing DevOps, and project management so you don&apos;t have to.
            </p>
            <a href="#consultation" className={styles.serviceCardBtn}>
              Book a free consultation
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        <div className={`${styles.serviceCard} ${styles.pinkCard}`}>
          <div className={styles.serviceCardContent}>
            <div className={styles.serviceIcon}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="11" height="9" rx="2" />
                <path d="M10 11l-2.5 2.5V11H10z" />
                <circle cx="6" cy="16.5" r="2.5" />
                <circle cx="12" cy="16.5" r="2.5" />
                <circle cx="18" cy="16.5" r="2.5" />
                <path d="M2.5 21.5c0-2 1.5-3 3.5-3s3.5 1 3.5 3h-7zM8.5 21.5c0-2 1.5-3 3.5-3s3.5 1 3.5 3h-7zM14.5 21.5c0-2 1.5-3 3.5-3s3.5 1 3.5 3h-7z" />
              </svg>
            </div>
            <h2 className={styles.serviceCardTitle}>
              Get a dedicated team for ongoing development
            </h2>
            <p className={styles.serviceCardDesc}>
              If your product is released and you seek a dedicated partner to support and evolve it, Tallium can provide you with a ready-to-go team of experts.
            </p>
            <a href="#learn-more" className={styles.serviceCardBtn}>
              Learn more
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className={styles.supportSection}>
        <div className={styles.supportHeader}>
          <h2 className={styles.supportTitle}>
            Support your product with the team<br />that built it
          </h2>
          <p className={styles.supportSubtitle}>
            A majority, 88%, of our clients opt for our software support and maintenance services.
            The reason is simple: our support team makes it easy to evolve your solution, improving
            the experience for everyone involved – you, your internal team, and your customers.
          </p>
        </div>

        <div className={styles.supportGrid}>
          <div className={`${styles.supportCard} ${styles.supportCardTeal}`}>
            <span className={styles.supportCardNum}>01</span>
            <h3 className={styles.supportCardTitle}>Long-time value</h3>
            <p className={styles.supportCardDesc}>
              Our development team ensures your codebase remains up-to-date to secure constant growth of your product, while you can concentrate on your business.
            </p>
          </div>

          <div className={`${styles.supportCard} ${styles.supportCardCyan}`}>
            <span className={styles.supportCardNum}>02</span>
            <h3 className={styles.supportCardTitle}>Same-roof support</h3>
            <p className={styles.supportCardDesc}>
              Your product will be supported by the same people who developed it, saving you from developer switching costs and long onboarding times.
            </p>
          </div>

          <div className={`${styles.supportCard} ${styles.supportCardPurple}`}>
            <span className={styles.supportCardNum}>03</span>
            <h3 className={styles.supportCardTitle}>Minimized risks</h3>
            <p className={styles.supportCardDesc}>
              With our team monitoring your product, we foresee potential issues and eliminate them before they impact your users or harm your business.
            </p>
          </div>

          <div className={`${styles.supportCard} ${styles.supportCardGreen}`}>
            <span className={styles.supportCardNum}>04</span>
            <h3 className={styles.supportCardTitle}>Scalable team</h3>
            <p className={styles.supportCardDesc}>
              We are adaptable. You can easily scale our team on demand to meet the growing needs or ramp down to save costs on resources you don&apos;t require.
            </p>
          </div>
        </div>
      </section>

      {/* Adding Footer for consistency */}
      <Footer showSchedule={false} />
    </main>
  );
}
