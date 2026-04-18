"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Case studies", href: "#case-studies" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Expertise", href: "#expertise", hasDropdown: true },
  { label: "Industries", href: "#industries", hasDropdown: true },
  { label: "Company", href: "#company" },
  { label: "Careers", href: "#careers" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      id="site-header"
    >
      <div className={styles.inner}>
        {/* Logo */}
        <a href="/" className={styles.logo} aria-label="siteonlab home">
          <Image
            src="/logo.svg"
            alt="siteonlab"
            width={140}
            height={32}
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.label} className={styles.navItem}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
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
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <a href="#contact" className={styles.ctaButton}>
          Contact us
        </a>

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

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ""}`}
        id="mobile-menu"
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.label} className={styles.mobileNavItem}>
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
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
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className={styles.mobileCta}
            onClick={() => setMobileOpen(false)}
          >
            Contact us
          </a>
        </nav>
      </div>
    </header>
  );
}
