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
        {/* Top Section: Bring your brand to life CTA */}
        {showSchedule && (
          <div className={styles.ctaSection}>
            <div className={styles.ctaVisual}>
              <Image
                src="/contact.svg"
                alt=""
                width={420}
                height={460}
                className={styles.ctaImage}
                aria-hidden="true"
              />
            </div>

            <div className={styles.ctaContent}>
              <h2 className={styles.ctaHeading}>
                Bring the magic of
                <br />
                your brand to life.
              </h2>

              <div className={styles.ctaMeta}>
                <span className={styles.ctaAvatar}>
                  <Image
                    src="/Siteon_logo-removebg-preview.png"
                    alt="SiteOnLab"
                    width={52}
                    height={52}
                  />
                </span>
                <p className={styles.ctaText}>
                  Work with a full-service digital agency trusted by founders and
                  growing brands. Schedule a one-on-one with our team and let&rsquo;s
                  map out your next move.
                </p>
              </div>

              <Link href="/contact" className={styles.ctaButton}>
                Start a project
              </Link>
            </div>
          </div>
        )}

        {/* Footer Card */}
        <div className={styles.card}>
          {/* Decorative brand mark */}
          <span className={styles.cardMark} aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="49" fill="#0c0c0e" />
              <path d="M40 33 24 50l16 17" stroke="#1c1c1f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M60 33 76 50 60 67" stroke="#1c1c1f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M55 28 45 72" stroke="#1c1c1f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          {/* Big headline */}
          <h2 className={styles.bigLine}>
            Be online happy with SiteOnLab.
          </h2>

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
              <li><Link href="/services/branding-services">Branding</Link></li>
              <li><Link href="/services/seo-service">SEO Services</Link></li>
              <li><Link href="/services/ppc-management">PPC Management</Link></li>
              <li><Link href="/services/social-media-marketing">Social Media Marketing</Link></li>
              <li><Link href="/services/advertising-services">Advertising Services</Link></li>
              <li><Link href="/services/website-design">Website Design</Link></li>
              <li><Link href="/services/website-development">Website Development</Link></li>
              <li><Link href="/services/wordpress-development">WordPress Development</Link></li>
              <li><Link href="/services/shopify-development">Shopify Development</Link></li>
              <li><Link href="/services/ecommerce-development">eCommerce Development</Link></li>
              <li><Link href="/services">Content Writing</Link></li>
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
              <li><Link href="/company">Company</Link></li>
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
      </div>
    </footer>
  );
};

export default Footer;
