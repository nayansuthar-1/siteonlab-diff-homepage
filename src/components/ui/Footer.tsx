import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section: Schedule a Call */}
        <div className={styles.scheduleSection}>
          <span className={styles.scheduleLabel}>Schedule a call</span>
          <h2 className={styles.scheduleHeading}>
            Tell us about your project idea and let us guide you
          </h2>
          <a href="#contact" className={styles.bookButton}>
            <span>Book a meeting</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom Section: Logo, Socials, Copyright, Address */}
        <div className={styles.footerTop}>
          <div className={styles.left}>
            <a href="/" className={styles.logo}>
              <Image
                src="/siteon_lab-removebg-preview (1).png"
                alt="siteonlab"
                width={140}
                height={32}
              />
            </a>
          </div>
          <div className={styles.right}>
            <div className={styles.socialIcons}>
              <a href="#" className={`${styles.socialIcon} ${styles.socialIconX}`} aria-label="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="#" className={`${styles.socialIcon} ${styles.socialIconInstagram}`} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className={`${styles.socialIcon} ${styles.socialIconFacebook}`} aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className={`${styles.socialIcon} ${styles.socialIconLinkedIn}`} aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.left}>
            <p className={styles.copyright}>
              © 2026 Siteon Lab. All Rights reserved
            </p>
          </div>

          <div className={styles.right}>
            <p className={styles.address}>
              F1, Bhagawati Complex, Vejalpur, Ahmedabad, Gujarat 380051
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
