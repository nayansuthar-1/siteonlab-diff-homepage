"use client";

// Cache bust 16:55
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Case studies", href: "#case-studies" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Expertise", href: "/expertise", hasDropdown: true },
  { label: "Industries", href: "#industries", hasDropdown: true },
  { label: "Company", href: "/company" },
  { label: "Careers", href: "/careers" },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#site-header')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${mobileOpen ? styles.headerTransparent : ""} ${activeDropdown ? styles.headerWithDropdown : ""}`}
        id="site-header"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="siteonlab home">
            <Image
              src="/siteon_lab-removebg-preview (1).png"
              alt="siteonlab"
              width={200}
              height={45}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.label} className={styles.navItem}>
                  <Link 
                    href={link.href} 
                    className={`${styles.navLink} ${activeDropdown === link.label ? styles.active : ""}`}
                    onClick={(e) => {
                      if (link.hasDropdown) {
                        e.preventDefault();
                        setActiveDropdown(activeDropdown === link.label ? null : link.label);
                      }
                    }}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <svg
                        className={styles.chevron}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <Link href="#contact" className={styles.ctaButton}>
            Contact us
          </Link>

          {/* Mobile Hamburger */}
          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            id="mobile-menu-toggle"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>

        {/* Desktop Mega Menu - Always in DOM for stability */}
        <div className={`${styles.megaMenu} ${activeDropdown ? styles.megaMenuOpen : ""}`}>
          <div className={styles.megaMenuInner}>
            {/* Services Dropdown */}
            <div className={styles.dropdownContent} style={{ display: activeDropdown === "Services" ? "block" : "none" }}>
              <div className={styles.megaMenuTop}>
                {/* Left side: Schedule a call */}
                <div className={styles.megaMenuLeft}>
                  <span className={styles.scheduleLabel}>Schedule a call</span>
                  <h2 className={styles.scheduleHeading}>
                    Tell us about your project idea and let us guide you
                  </h2>
                  <Link href="#contact" className={styles.bookButton} onClick={() => setActiveDropdown(null)}>
                    <span>Book a meeting</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                {/* Right side: Service Cards */}
                <div className={styles.megaMenuRight}>
                  <Link href="/services" className={`${styles.serviceCard} ${styles.serviceCard1}`} onClick={() => setActiveDropdown(null)}>
                    <div className={styles.serviceIconWrapper}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                         <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                         <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                         <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className={styles.serviceTitle}>Full-cycle<br/>Development</span>
                    <div className={styles.cardGlow}></div>
                  </Link>
                  <Link href="/services" className={`${styles.serviceCard} ${styles.serviceCard2}`} onClick={() => setActiveDropdown(null)}>
                    <div className={styles.serviceIconWrapper}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className={styles.serviceTitle}>Software Team<br/>Augmentation</span>
                    <div className={styles.cardGlow}></div>
                  </Link>
                  <Link href="/services" className={`${styles.serviceCard} ${styles.serviceCard3}`} onClick={() => setActiveDropdown(null)}>
                    <div className={styles.serviceIconWrapper}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 3V1M12 23V21M3 12H1M23 12H21M5.636 5.636L4.222 4.222M19.778 19.778L18.364 18.364M5.636 18.364L4.222 19.778M19.778 5.636L18.364 4.222" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className={styles.serviceTitle}>Digital Transformation<br/>Consulting</span>
                    <div className={styles.cardGlow}></div>
                  </Link>
                  <Link href="/services" className={`${styles.serviceCard} ${styles.serviceCard4}`} onClick={() => setActiveDropdown(null)}>
                    <div className={styles.serviceIconWrapper}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 19L21 21L19 12L20.5 10.5C21.3284 9.67157 21.3284 8.32843 20.5 7.5L16.5 3.5C15.6716 2.67157 14.3284 2.67157 13.5 3.5L12 5L3 14L5 23L12 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className={styles.serviceTitle}>Product Concept<br/>& Design</span>
                    <div className={styles.cardGlow}></div>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Expertise Dropdown */}
            <div className={styles.dropdownContent} style={{ display: activeDropdown === "Expertise" ? "block" : "none" }}>
              <div className={styles.megaMenuTop}>
                {/* Left side: Schedule a call */}
                <div className={styles.megaMenuLeft}>
                  <span className={styles.scheduleLabel}>Schedule a call</span>
                  <h2 className={styles.scheduleHeading}>
                    Tell us about your project idea and let us guide you
                  </h2>
                  <Link href="#contact" className={styles.bookButton} onClick={() => setActiveDropdown(null)}>
                    <span>Book a meeting</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                {/* Right side: Expertise Grid */}
                <div className={styles.megaMenuRight}>
                  <div className={styles.expertiseGrid}>
                    <Link href="/expertise" className={styles.expertiseItem} onClick={() => setActiveDropdown(null)}>
                      <div className={styles.expertiseIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </div>
                      <span className={styles.expertiseLabel}>AI and Machine Learning</span>
                    </Link>
                    <Link href="/expertise" className={styles.expertiseItem} onClick={() => setActiveDropdown(null)}>
                      <div className={styles.expertiseIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </div>
                      <span className={styles.expertiseLabel}>Web & Mobile Apps</span>
                    </Link>
                    <Link href="/expertise" className={styles.expertiseItem} onClick={() => setActiveDropdown(null)}>
                      <div className={styles.expertiseIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                          <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                      </div>
                      <span className={styles.expertiseLabel}>Web 3.0 & Blockchain</span>
                    </Link>
                    <Link href="/expertise" className={styles.expertiseItem} onClick={() => setActiveDropdown(null)}>
                      <div className={styles.expertiseIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <ellipse cx="12" cy="5" rx="9" ry="3" />
                          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                        </svg>
                      </div>
                      <span className={styles.expertiseLabel}>Big Data & Data Science</span>
                    </Link>
                    <Link href="/expertise" className={styles.expertiseItem} onClick={() => setActiveDropdown(null)}>
                      <div className={styles.expertiseIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <span className={styles.expertiseLabel}>DevOps & Security</span>
                    </Link>
                    <Link href="/expertise" className={styles.expertiseItem} onClick={() => setActiveDropdown(null)}>
                      <div className={styles.expertiseIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <span className={styles.expertiseLabel}>QA & Test Automation</span>
                    </Link>
                    <Link href="/expertise" className={styles.expertiseItem} onClick={() => setActiveDropdown(null)}>
                      <div className={styles.expertiseIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="23 4 23 10 17 10" />
                          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                      </div>
                      <span className={styles.expertiseLabel}>Refinement & Reengineering</span>
                    </Link>
                    <Link href="/expertise" className={styles.expertiseItem} onClick={() => setActiveDropdown(null)}>
                      <div className={styles.expertiseIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                      </div>
                      <span className={styles.expertiseLabel}>Support & Maintenance</span>
                    </Link>
                    <Link href="/expertise" className={styles.expertiseItem} onClick={() => setActiveDropdown(null)}>
                      <div className={styles.expertiseIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.4-1.9-4.3-4.3-4.5-.4-3.1-3-5.5-6.2-5.5-2.2 0-4.1 1.2-5.1 3-2.3.3-4.1 2.3-4.1 4.6C2.3 17 4.3 19 6.8 19h10.7z" />
                        </svg>
                      </div>
                      <span className={styles.expertiseLabel}>Cloud-native Services</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Industries Dropdown */}
            <div className={styles.dropdownContent} style={{ display: activeDropdown === "Industries" ? "block" : "none" }}>
              <div className={styles.megaMenuTop}>
                {/* Left side: Schedule a call */}
                <div className={styles.megaMenuLeft}>
                  <span className={styles.scheduleLabel}>Schedule a call</span>
                  <h2 className={styles.scheduleHeading}>
                    Tell us about your project idea and let us guide you
                  </h2>
                  <a href="#contact" className={styles.bookButton} onClick={() => setActiveDropdown(null)}>
                    <span>Book a meeting</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

                {/* Right side: Industry Cards */}
                <div className={styles.megaMenuRight}>
                  <Link href="#industry-finance" className={`${styles.serviceCard} ${styles.industryCard1}`} onClick={() => setActiveDropdown(null)}>
                    <div className={styles.serviceIconWrapper}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className={styles.serviceTitle}>Financial Services</span>
                    <div className={styles.cardGlow}></div>
                  </Link>
                  <Link href="#industry-healthcare" className={`${styles.serviceCard} ${styles.industryCard2}`} onClick={() => setActiveDropdown(null)}>
                    <div className={styles.serviceIconWrapper}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className={styles.serviceTitle}>Healthcare</span>
                    <div className={styles.cardGlow}></div>
                  </Link>
                  <Link href="#industry-education" className={`${styles.serviceCard} ${styles.industryCard3}`} onClick={() => setActiveDropdown(null)}>
                    <div className={styles.serviceIconWrapper}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                      </svg>
                    </div>
                    <span className={styles.serviceTitle}>Education</span>
                    <div className={styles.cardGlow}></div>
                  </Link>
                  <Link href="#industry-all" className={`${styles.serviceCard} ${styles.industryCard4}`} onClick={() => setActiveDropdown(null)}>
                    <div className={styles.serviceIconWrapper}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
                        <path d="M7 2v20M17 2v20M2 7h20M2 17h20"/>
                      </svg>
                    </div>
                    <span className={styles.serviceTitle}>All Industries</span>
                    <div className={styles.cardGlow}></div>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className={styles.megaMenuBottom}>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon} aria-label="X (Twitter)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                <a href="#" className={styles.socialIcon} aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className={styles.socialIcon} aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
              <p className={styles.copyright}>
                © 2026 Siteon Lab. All Rights reserved
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ""}`}
        id="mobile-menu"
      >
        <div className={styles.mobileMenuContent}>
          {/* Navigation Links */}
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            <ul className={styles.mobileNavList}>
              {[...navLinks, { label: "Contact us", href: "#contact" }].map((link) => (
                <li key={link.label} className={styles.mobileNavItem}>
                  <Link
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <svg
                        className={styles.mobileChevron}
                        width="12"
                        height="8"
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Footer Content */}
          <div className={styles.mobileFooter}>
            <div className={styles.scheduleSection}>
              <span className={styles.scheduleLabel}>Schedule a call</span>
              <h2 className={styles.scheduleHeading}>
                Tell us about your project idea and let us guide you
              </h2>
              <Link href="#contact" className={styles.bookButton} onClick={() => setMobileOpen(false)}>
                <span>Book a meeting</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className={styles.bottomBar}>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon} aria-label="X (Twitter)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                <a href="#" className={styles.socialIcon} aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className={styles.socialIcon} aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
              <p className={styles.copyright}>
                © 2026 Siteon Lab. All Rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
