import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

interface FooterProps {
  showSchedule?: boolean;
}

const Footer = ({ showSchedule = true }: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section: Schedule a Call */}
        {showSchedule && (
          <div className={styles.scheduleSection}>
            <span className={styles.scheduleLabel}>Schedule a call</span>
            <h2 className={styles.scheduleHeading}>
              Tell us about your project idea and let us guide you
            </h2>
            <Link href="/contact" className={styles.bookButton}>
              <span>Book a meeting</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        )}

        {/* Divider */}
        <div className={styles.divider} />

        {/* Footer Grid */}
        <div className={styles.footerGrid}>
          {/* Column 1: Logo & Info */}
          <div className={styles.footerColumn}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/siteonlab-logo.png"
                alt="SiteOnLab"
                width={2438}
                height={813}
                className={styles.footerLogo}
              />
            </Link>
            <p className={styles.footerDesc}>
              Siteonlab is a full-service digital marketing agency helping businesses grow with SEO, PPC, website development, and performance marketing.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" className={`${styles.socialIcon} ${styles.socialIconFacebook}`} aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className={`${styles.socialIcon} ${styles.socialIconInstagram}`} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
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

          {/* Column 2: Our Services */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Our Services</h3>
            <ul className={styles.columnList}>
              <li><Link href="/services/branding">Branding</Link></li>
              <li><Link href="/services/seo">SEO Services</Link></li>
              <li><Link href="/services/ppc">PPC Management</Link></li>
              <li><Link href="/services/social-media">Social Media Marketing</Link></li>
              <li><Link href="/services/advertising">Advertising Services</Link></li>
              <li><Link href="/services/website-design">Website Design</Link></li>
              <li><Link href="/services/website-development">Website Development</Link></li>
              <li><Link href="/services/wordpress">WordPress Development</Link></li>
              <li><Link href="/services/shopify">Shopify Development</Link></li>
              <li><Link href="/services/ecommerce">eCommerce Development</Link></li>
              <li><Link href="/services/content-writing">Content Writing</Link></li>
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Industries</h3>
            <ul className={styles.columnList}>
              <li><Link href="/industries/healthcare">Healthcare</Link></li>
              <li><Link href="/industries/travel-hospitality">Travel & Hospitality</Link></li>
              <li><Link href="/industries/law-firms">Law Firms</Link></li>
              <li><Link href="/industries/ecommerce-retail">E-commerce & Retail</Link></li>
              <li><Link href="/industries/jewellery">Jewellery</Link></li>
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Locations</h3>
            <ul className={styles.columnList}>
              <li><Link href="/locations/mumbai">Mumbai</Link></li>
              <li><Link href="/locations/delhi">Delhi</Link></li>
              <li><Link href="/locations/bangalore">Bangalore</Link></li>
              <li><Link href="/locations/hyderabad">Hyderabad</Link></li>
              <li><Link href="/locations/chennai">Chennai</Link></li>
              <li><Link href="/locations/kolkata">Kolkata</Link></li>
              <li><Link href="/locations/pune">Pune</Link></li>
              <li><Link href="/locations/jaipur">Jaipur</Link></li>
            </ul>
          </div>

          {/* Column 5: Quick Links */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.columnList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact us</Link></li>
              <li><Link href="/blogs">Blogs</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
            </ul>
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
