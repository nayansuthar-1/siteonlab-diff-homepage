"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import styles from "./Industries.module.css";
import Footer from "@/components/ui/Footer";

export default function IndustriesPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const sections = ['finance', 'healthcare', 'education', 'ecommerce', 'logistics', 'realestate', 'travel', 'manufacturing'];

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { 
      threshold: 0,
      rootMargin: '-45% 0px -45% 0px'
    });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mounted]);

  const [offsets, setOffsets] = useState<Record<string, number>>({});

  useEffect(() => {
    if (mounted) {
      const newOffsets: Record<string, number> = {};
      sections.forEach((id, index) => {
        const icon = iconRefs.current[index];
        if (icon) {
          newOffsets[id] = icon.offsetTop;
        }
      });
      setOffsets(newOffsets);
    }
  }, [mounted]);

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

      <div className={styles.industriesDetailContainer}>
        <aside className={`${styles.sidebarWrapper} ${styles[activeSection + 'Section']}`}>
          <div className={styles.verticalSidebar}>
            <div 
              className={styles.activeIndicator}
              style={{ transform: `translate3d(0, ${offsets[activeSection] || 20}px, 0)` }}
            ></div>
            {/* Finance */}
            <div
              className={`${styles.sidebarIcon} ${activeSection === 'finance' ? styles.sidebarIconActive : ''}`}
              ref={(el) => { iconRefs.current[0] = el; }}
              onClick={() => document.getElementById('finance')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 5c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H9V5z" />
              </svg>
            </div>
            {/* Healthcare */}
            <div
              className={`${styles.sidebarIcon} ${activeSection === 'healthcare' ? styles.sidebarIconActive : ''}`}
              ref={(el) => { iconRefs.current[1] = el; }}
              onClick={() => document.getElementById('healthcare')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            {/* Education */}
            <div
              className={`${styles.sidebarIcon} ${activeSection === 'education' ? styles.sidebarIconActive : ''}`}
              ref={(el) => { iconRefs.current[2] = el; }}
              onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
            </div>
            {/* E-commerce */}
            <div
              className={`${styles.sidebarIcon} ${activeSection === 'ecommerce' ? styles.sidebarIconActive : ''}`}
              ref={(el) => { iconRefs.current[3] = el; }}
              onClick={() => document.getElementById('ecommerce')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
            {/* Logistics */}
            <div
              className={`${styles.sidebarIcon} ${activeSection === 'logistics' ? styles.sidebarIconActive : ''}`}
              ref={(el) => { iconRefs.current[4] = el; }}
              onClick={() => document.getElementById('logistics')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                <path d="M12 8l-4 4h3v4h2v-4h3z" />
              </svg>
            </div>
            {/* Real Estate */}
            <div
              className={`${styles.sidebarIcon} ${activeSection === 'realestate' ? styles.sidebarIconActive : ''}`}
              ref={(el) => { iconRefs.current[5] = el; }}
              onClick={() => document.getElementById('realestate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            {/* Travel */}
            <div
              className={`${styles.sidebarIcon} ${activeSection === 'travel' ? styles.sidebarIconActive : ''}`}
              ref={(el) => { iconRefs.current[6] = el; }}
              onClick={() => document.getElementById('travel')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
              </svg>
            </div>
            {/* Manufacturing */}
            <div
              className={`${styles.sidebarIcon} ${activeSection === 'manufacturing' ? styles.sidebarIconActive : ''}`}
              ref={(el) => { iconRefs.current[7] = el; }}
              onClick={() => document.getElementById('manufacturing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 8.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
              </svg>
            </div>
          </div>
        </aside>

        <div className={styles.contentWrapper}>
          <section id="finance" className={`${styles.detailsSection} ${styles.financeSection} ${styles.firstSection}`}>
            {/* Left Feature Card */}
            <div className={styles.featureCard} onMouseMove={handleMouseMove}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 5c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H9V5z" />
                </svg>
              </div>
              <h2 className={styles.featureTitle}>Financial services</h2>
              <p className={styles.featureDescription}>
                Kick off an Agile transformation, build a mobile banking app, or launch the perfect fintech development.
                Everything you need to create a top-tier finance product is under one roof.
              </p>
            </div>

            {/* Right Details Card */}
            <div className={styles.detailsContainer}>
              {/* Key Expertise */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  Key Expertise
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Banking</div>
                  <div className={styles.detailsItem}>Wealth management</div>
                  <div className={styles.detailsItem}>Insurance</div>
                  <div className={styles.detailsItem}>Security and compliance</div>
                  <div className={styles.detailsItem}>Blockchain and cryptocurrency</div>
                  <div className={styles.detailsItem}>Risk management & fraud prevention</div>
                </div>
              </div>

              {/* Capabilities We Deliver */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Capabilities We Deliver
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Peer-to-peer payments</div>
                  <div className={styles.detailsItem}>Budgeting tools</div>
                  <div className={styles.detailsItem}>Investment insights</div>
                  <div className={styles.detailsItem}>Fraud detection</div>
                  <div className={styles.detailsItem}>Biometric authentication</div>
                  <div className={styles.detailsItem}>KYC/AML</div>
                </div>
              </div>
            </div>
          </section>

          <section id="healthcare" className={`${styles.detailsSection} ${styles.healthcareSection}`}>
            {/* Left Feature Card */}
            <div className={`${styles.featureCard} ${styles.featureCardGreen}`} onMouseMove={handleMouseMove}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
              <h2 className={styles.featureTitle}>Healthcare</h2>
              <p className={styles.featureDescription}>
                Digitalize medical services for providers and patients. Build a custom healthcare system
                that manages schedules, data, and billing efficiently while keeping sensitive data secure.
              </p>
            </div>

            {/* Right Details Card */}
            <div className={styles.detailsContainer}>
              {/* Key Expertise */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  Key Expertise
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Hospital management systems (HMS)</div>
                  <div className={styles.detailsItem}>Electronic health records (EHR)</div>
                  <div className={styles.detailsItem}>Telemedicine and remote care</div>
                  <div className={styles.detailsItem}>Pharmacy and laboratory software</div>
                  <div className={styles.detailsItem}>Medical billing and insurance</div>
                  <div className={styles.detailsItem}>Patient portals and mobile apps</div>
                </div>
              </div>

              {/* Capabilities We Deliver */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Capabilities We Deliver
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Secure data encryption</div>
                  <div className={styles.detailsItem}>Real-time appointment scheduling</div>
                  <div className={styles.detailsItem}>Automated medical billing</div>
                  <div className={styles.detailsItem}>Interoperability (HL7/FHIR)</div>
                  <div className={styles.detailsItem}>AI-powered diagnostics support</div>
                  <div className={styles.detailsItem}>HIPAA/GDPR compliance</div>
                </div>
              </div>
            </div>
          </section>

          <section id="education" className={`${styles.detailsSection} ${styles.educationSection}`}>
            {/* Left Feature Card */}
            <div className={`${styles.featureCard} ${styles.featureCardOrange}`} onMouseMove={handleMouseMove}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                </svg>
              </div>
              <h2 className={styles.featureTitle}>Education</h2>
              <p className={styles.featureDescription}>
                Create an advanced learning solution to digitalize the academic experience, enhance self-learning, or improve corporate training.
                We can help bring your vision to life from scratch or by customizing an existing edtech product.
              </p>
            </div>

            {/* Right Details Card */}
            <div className={styles.detailsContainer}>
              {/* Key Expertise */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  Key Expertise
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Workflow automation</div>
                  <div className={styles.detailsItem}>Corporate training solutions</div>
                  <div className={styles.detailsItem}>Self-learning applications</div>
                  <div className={styles.detailsItem}>AI recommendation systems</div>
                  <div className={styles.detailsItem}>Learning management systems (LMS)</div>
                  <div className={styles.detailsItem}>Customizable e-learning portals</div>
                </div>
              </div>

              {/* Capabilities We Deliver */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Capabilities We Deliver
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Gamification features</div>
                  <div className={styles.detailsItem}>Live streaming</div>
                  <div className={styles.detailsItem}>AR/VR technologies</div>
                  <div className={styles.detailsItem}>Real-time messaging</div>
                  <div className={styles.detailsItem}>AI-powered chatbots</div>
                </div>
              </div>
            </div>
          </section>

          <section id="ecommerce" className={`${styles.detailsSection} ${styles.ecommerceSection}`}>
            {/* Left Feature Card */}
            <div className={`${styles.featureCard} ${styles.featureCardPink}`} onMouseMove={handleMouseMove}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
              <h2 className={styles.featureTitle}>E-commerce & retail</h2>
              <p className={styles.featureDescription}>
                Roll out a custom Shopify E-commerce platform, global marketplace, or mobile shopping app with AI-powered recommendations,
                smart systems, and CRM integration.
              </p>
            </div>

            {/* Right Details Card */}
            <div className={styles.detailsContainer}>
              {/* Key Expertise */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  Key Expertise
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>E-commerce platforms</div>
                  <div className={styles.detailsItem}>Online stores</div>
                  <div className={styles.detailsItem}>Mobile shopping applications</div>
                  <div className={styles.detailsItem}>Multi-vendor marketplaces</div>
                  <div className={styles.detailsItem}>Inventory and order management</div>
                </div>
              </div>

              {/* Capabilities We Deliver */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Capabilities We Deliver
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Smart product search</div>
                  <div className={styles.detailsItem}>Payment integrations</div>
                  <div className={styles.detailsItem}>Promo engines</div>
                  <div className={styles.detailsItem}>AI recommendation engines</div>
                </div>
              </div>
            </div>
          </section>

          <section id="logistics" className={`${styles.detailsSection} ${styles.logisticsSection}`}>
            {/* Left Feature Card */}
            <div className={`${styles.featureCard} ${styles.featureCardOrange}`} onMouseMove={handleMouseMove}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                  <path d="M12 8l-4 4h3v4h2v-4h3z" />
                </svg>
              </div>
              <h2 className={styles.featureTitle}>Transportation & delivery</h2>
              <p className={styles.featureDescription}>
                Deploy a smart product that streamlines logistics, reduces costs, and ensures real-time service.
                From food deliveries to automotive dealerships, parcel tracking, and courier apps, we help you develop a high-performing solution.
              </p>
            </div>

            {/* Right Details Card */}
            <div className={styles.detailsContainer}>
              {/* Key Expertise */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  Key Expertise
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Last-mile delivery solutioning</div>
                  <div className={styles.detailsItem}>Automotive dealership management</div>
                  <div className={styles.detailsItem}>Custom food delivery platforms</div>
                  <div className={styles.detailsItem}>Courier apps</div>
                  <div className={styles.detailsItem}>Logistics automation</div>
                  <div className={styles.detailsItem}>Real-time tracking & route optimization</div>
                </div>
              </div>

              {/* Capabilities We Deliver */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Capabilities We Deliver
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>AI-powered dispatch systems</div>
                  <div className={styles.detailsItem}>GPS tracking & geofencing</div>
                  <div className={styles.detailsItem}>Customer support tools</div>
                  <div className={styles.detailsItem}>Performance analytics</div>
                  <div className={styles.detailsItem}>Delivery scheduling</div>
                </div>
              </div>
            </div>
          </section>

          <section id="realestate" className={`${styles.detailsSection} ${styles.realestateSection}`}>
            {/* Left Feature Card */}
            <div className={`${styles.featureCard} ${styles.featureCardPurple}`} onMouseMove={handleMouseMove}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <h2 className={styles.featureTitle}>Real estate & property management</h2>
              <p className={styles.featureDescription}>
                Build a property management system that automates admin tasks and improves resident experience.
                Tenant management, smart access, parking systems — we can implement this and more to help you create processes that enable better client satisfaction.
              </p>
            </div>

            {/* Right Details Card */}
            <div className={styles.detailsContainer}>
              {/* Key Expertise */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  Key Expertise
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Custom property management systems</div>
                  <div className={styles.detailsItem}>Residential & commercial building solutions</div>
                  <div className={styles.detailsItem}>Tenant and lease management tools</div>
                  <div className={styles.detailsItem}>Facility and maintenance platforms</div>
                  <div className={styles.detailsItem}>Rent payment systems</div>
                </div>
              </div>

              {/* Capabilities We Deliver */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Capabilities We Deliver
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Intelligent search filters & recommendations</div>
                  <div className={styles.detailsItem}>Integration with IoT for smart home automation</div>
                  <div className={styles.detailsItem}>Service booking</div>
                  <div className={styles.detailsItem}>Payment gateway integration</div>
                </div>
              </div>
            </div>
          </section>

          <section id="travel" className={`${styles.detailsSection} ${styles.travelSection}`}>
            {/* Left Feature Card */}
            <div className={`${styles.featureCard} ${styles.featureCardCyan}`} onMouseMove={handleMouseMove}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
                </svg>
              </div>
              <h2 className={styles.featureTitle}>Travel & HoReCa</h2>
              <p className={styles.featureDescription}>
                Improve travel & hospitality management with custom solutions. From seamless booking platforms to smooth customer journeys,
                we help you elevate guest experiences, reduce operations, and automate routine tasks.
              </p>
            </div>

            {/* Right Details Card */}
            <div className={styles.detailsContainer}>
              {/* Key Expertise */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  Key Expertise
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Booking platforms</div>
                  <div className={styles.detailsItem}>Sustainable tourism solutions</div>
                  <div className={styles.detailsItem}>Mobile apps for travelers</div>
                  <div className={styles.detailsItem}>Point of Sale (POS) systems</div>
                </div>
              </div>

              {/* Capabilities We Deliver */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Capabilities We Deliver
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Integrations with third-party vendors</div>
                  <div className={styles.detailsItem}>Group bookings management</div>
                  <div className={styles.detailsItem}>Dynamic pricing & real-time availability</div>
                  <div className={styles.detailsItem}>Automated payment processing</div>
                </div>
              </div>
            </div>
          </section>

          <section id="manufacturing" className={`${styles.detailsSection} ${styles.manufacturingSection} ${styles.lastSection}`}>
            {/* Left Feature Card */}
            <div className={`${styles.featureCard} ${styles.featureCardGreen}`} onMouseMove={handleMouseMove}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 8.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
                </svg>
              </div>
              <h2 className={styles.featureTitle}>Manufacturing</h2>
              <p className={styles.featureDescription}>
                Move manufacturing operations to the digital realm with a custom-made solution.
                Whether you need process automation or seamless production management, we can help you transform traditional workflows into scalable systems.
              </p>
            </div>

            {/* Right Details Card */}
            <div className={styles.detailsContainer}>
              {/* Key Expertise */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  Key Expertise
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>IoT for manufacturing</div>
                  <div className={styles.detailsItem}>Quality control systems</div>
                  <div className={styles.detailsItem}>Predictive maintenance</div>
                  <div className={styles.detailsItem}>Industrial automation</div>
                </div>
              </div>

              {/* Capabilities We Deliver */}
              <div className={styles.detailsColumn}>
                <div className={styles.columnHeader}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Capabilities We Deliver
                </div>
                <div className={styles.detailsList}>
                  <div className={styles.detailsItem}>Real-time machine monitoring</div>
                  <div className={styles.detailsItem}>Automated production workflows</div>
                  <div className={styles.detailsItem}>Environmental condition tracking</div>
                  <div className={styles.detailsItem}>Integrations with ERP and MES systems</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer showSchedule={false} />
    </main>
  );
}
