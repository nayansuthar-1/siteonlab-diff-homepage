"use client";

// Cache bust 16:55
import { useState, useEffect, useCallback } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import ServiceIcon from "@/components/ui/ServiceIcon";
import IndustryIcon from "@/components/ui/IndustryIcon";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";
import { locations } from "@/lib/locations";
import { whiteLabelServices } from "@/lib/white-label-services";

const navLinks = [
  { label: "Expertise", href: "/expertise", hasDropdown: true },
  { label: "Locations", href: "/locations", hasDropdown: true },
  { label: "Resources", href: "/resources", hasDropdown: true },
  { label: "Company", href: "/company" },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

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
      setMobileExpanded(null);
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

  const getMobileDropdownItems = (label: string) => {
    if (label === "Expertise") {
      return [
        ...services.map((service) => ({
          title: service.navTitle,
          href: `/services/${service.slug}`,
          accent: service.accent,
        })),
        ...whiteLabelServices.map((service) => ({
          title: `White Label ${service.navTitle}`,
          href: `/white-label-services/${service.slug}`,
          accent: service.accent,
        })),
        ...industries.map((industry) => ({
          title: industry.navTitle,
          href: `/industries/${industry.slug}`,
          accent: industry.accent,
        })),
      ];
    }

    if (label === "Locations") {
      return locations.map((location) => ({
        title: location.name,
        href: `/locations/${location.slug}`,
        accent: location.accent,
      }));
    }

    if (label === "Resources") {
      return [
        { title: "Blogs", href: "/blogs", accent: "#f59e0b" },
        { title: "Case Studies", href: "/case-studies", accent: "#f59e0b" },
      ];
    }

    return [];
  };

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
          <Link href="/contact" className={styles.ctaButton}>
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
            {/* Expertise Dropdown */}
            <div className={styles.dropdownContent} style={{ display: activeDropdown === "Expertise" ? "block" : "none" }}>
              <div className={styles.megaMenuTop}>
                {/* Left side: Schedule a call */}
                <div className={styles.megaMenuLeft}>
                  <span className={styles.scheduleLabel}>Schedule a call</span>
                  <h2 className={styles.scheduleHeading}>
                    Tell us about your project idea and let us guide you
                  </h2>
                  <Link href="/contact" className={styles.bookButton} onClick={() => setActiveDropdown(null)}>
                    <span>Book a meeting</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                <div className={styles.expertiseMegaContainer}>
                  <div className={styles.expertiseColumnGroup} style={{ flex: 2 }}>
                    <h3 className={styles.expertiseColumnTitle} style={{ textAlign: 'center' }}>Services</h3>
                    <div className={styles.expertiseLinksGrid} style={{ gridTemplateColumns: 'max-content max-content', justifyContent: 'center', gap: '12px 60px' }}>
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className={styles.expertiseTextLink}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {service.navTitle}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className={styles.expertiseColumnGroup} style={{ flex: 1 }}>
                    <h3 className={styles.expertiseColumnTitle} style={{ textAlign: 'center' }}>White Label Services</h3>
                    <div className={styles.expertiseLinksGrid} style={{ gridTemplateColumns: 'max-content', justifyContent: 'center' }}>
                      {whiteLabelServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/white-label-services/${service.slug}`}
                          className={styles.expertiseTextLink}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {service.navTitle}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className={styles.expertiseColumnGroup} style={{ flex: 1 }}>
                    <h3 className={styles.expertiseColumnTitle} style={{ textAlign: 'center' }}>Industries</h3>
                    <div className={styles.expertiseLinksGrid} style={{ gridTemplateColumns: 'max-content', justifyContent: 'center' }}>
                      {industries.map((industry) => (
                        <Link
                          key={industry.slug}
                          href={`/industries/${industry.slug}`}
                          className={styles.expertiseTextLink}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {industry.navTitle}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Locations Dropdown */}
            <div className={styles.dropdownContent} style={{ display: activeDropdown === "Locations" ? "block" : "none" }}>
              <div className={styles.megaMenuTop}>
                {/* Left side: Schedule a call */}
                <div className={styles.megaMenuLeft}>
                  <span className={styles.scheduleLabel}>Visit our offices</span>
                  <h2 className={styles.scheduleHeading}>
                    Find us in your city and let&apos;s build something great together
                  </h2>
                  <Link href="/contact" className={styles.bookButton} onClick={() => setActiveDropdown(null)}>
                    <span>Contact local office</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                {/* Right side: Location Cards */}
                <div className={`${styles.megaMenuRight} ${styles.servicesMegaGrid}`}>
                  {locations.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/locations/${location.slug}`}
                      className={styles.serviceCard}
                      style={{ "--service-accent": location.accent } as CSSProperties}
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className={styles.serviceIconWrapper}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <span className={styles.serviceTitle}>{location.name}</span>
                      <div className={styles.cardGlow}></div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Resources Dropdown */}
            <div className={styles.dropdownContent} style={{ display: activeDropdown === "Resources" ? "block" : "none" }}>
              <div className={styles.megaMenuTop}>
                <div className={styles.megaMenuLeft}>
                  <span className={styles.scheduleLabel}>Our Resources</span>
                  <h2 className={styles.scheduleHeading}>
                    Insights, news and deep dives into our latest work
                  </h2>
                  <Link href="/blogs" className={styles.bookButton} onClick={() => setActiveDropdown(null)}>
                    <span>View all blogs</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                <div className={`${styles.megaMenuRight} ${styles.servicesMegaGrid}`}>
                  <Link
                    href="/blogs"
                    className={styles.serviceCard}
                    style={{ "--service-accent": "#f59e0b" } as CSSProperties}
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className={styles.serviceIconWrapper}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </div>
                    <span className={styles.serviceTitle}>Blogs</span>
                    <div className={styles.cardGlow}></div>
                  </Link>
                  <Link
                    href="/case-studies"
                    className={styles.serviceCard}
                    style={{ "--service-accent": "#f59e0b" } as CSSProperties}
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className={styles.serviceIconWrapper}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <span className={styles.serviceTitle}>Case Studies</span>
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
              {[...navLinks, { label: "Contact us", href: "/contact" }].map((link) => (
                <li key={link.label} className={styles.mobileNavItem}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        type="button"
                        className={`${styles.mobileNavLink} ${styles.mobileNavButton} ${mobileExpanded === link.label ? styles.mobileNavLinkOpen : ""}`}
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        aria-expanded={mobileExpanded === link.label}
                        aria-controls={`mobile-${link.label.replace(/\s+/g, "-").toLowerCase()}`}
                      >
                        <span>{link.label}</span>
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
                      </button>

                      <div
                        id={`mobile-${link.label.replace(/\s+/g, "-").toLowerCase()}`}
                        className={`${styles.mobileSubmenu} ${mobileExpanded === link.label ? styles.mobileSubmenuOpen : ""}`}
                      >
                        {getMobileDropdownItems(link.label).map((item) => (
                          <Link
                            href={item.href}
                            className={styles.mobileSubmenuLink}
                            style={{ "--mobile-accent": item.accent } as CSSProperties}
                            onClick={() => setMobileOpen(false)}
                            key={item.href}
                          >
                            <span className={styles.mobileSubmenuDot} />
                            <span>{item.title}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={styles.mobileNavLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{link.label}</span>
                    </Link>
                  )}
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
              <Link href="/contact" className={styles.bookButton} onClick={() => setMobileOpen(false)}>
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
