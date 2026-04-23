"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./DomainExpertise.module.css";

const domainData = [
  {
    number: "01",
    title: "Finance",
    desc: "Build a secure and reliable fintech app to transform financial operations and enhance customer engagement.",
    image: "/finance.png",
    theme: "purple",
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="finTop" x1="16" y1="4" x2="16" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="finBot" x1="16" y1="17" x2="16" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
        <path d="M6 15C6 15 6 4 16 4C26 4 26 15 26 15H6Z" fill="url(#finTop)" />
        <path d="M6 17C6 17 6 28 16 28C26 28 26 17 26 17H6Z" fill="url(#finBot)" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Education",
    desc: "Develop self-learning apps and platforms for corporate training and improve the learning experience for both teachers and students.",
    image: "/education.png",
    theme: "red",
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="eduGradient" x1="16" y1="6" x2="16" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
        </defs>
        <path d="M10 6C10 6 8 6 8 8V24C8 26 10 26 10 26H24V6H10Z" fill="url(#eduGradient)" />
        <path d="M22 6H24V26H22V6Z" fill="#DC2626" />
        <path d="M12 6H14V26H12V6Z" fill="rgba(255,255,255,0.1)" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Healthcare",
    desc: "Create healthcare solutions to enhance diagnostic accuracy, improve patient care, and optimize operational costs.",
    image: "/healthcare.png",
    theme: "teal",
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <defs>
          <radialGradient id="healthGlow" cx="16" cy="16" r="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="70%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </radialGradient>
        </defs>
        <path d="M16 4V28M10 6.5L22 25.5M4 12L28 20M4 20L28 12M10 25.5L22 6.5" 
          stroke="url(#healthGlow)" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="4" fill="#93C5FD" opacity="0.8" />
      </svg>
    ),
  },
];

export default function DomainExpertise() {
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth > 1024) return;

    const handleScroll = () => {
      const cards = document.querySelectorAll(`.${styles.card}`);
      const viewportCenter = window.innerHeight / 2;

      let minDistance = Infinity;
      let closestCard: Element | null = null;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });

      cards.forEach((card) => {
        if (card === closestCard) {
          card.classList.add(styles.active);
        } else {
          card.classList.remove(styles.active);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.heading}>Domain expertise</h2>
          <p className={styles.subheading}>
            Siteon Lab blends cutting-edge technologies, expert engineering
            skills, and domain-specific knowledge to build top-notch solutions
            in fintech, edtech, and medtech.
          </p>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {domainData.map((item, idx) => (
            <div
              key={idx}
              className={`${styles.card} ${styles[item.theme]}`}
            >
              {/* Inner shell with border-radius & overflow hidden */}
              <div className={styles.cardInner}>
                {/* Colored glow overlay */}
                <div className={styles.glowOverlay} />

                <div className={styles.cardContent}>
                  <span className={styles.number}>{item.number}</span>

                  <div className={styles.titleRow}>
                    <span className={styles.icon}>{item.icon}</span>
                    <h3 className={styles.title}>{item.title}</h3>
                  </div>

                  <p className={styles.desc}>{item.desc}</p>

                  <a href="#" className={styles.learnMore}>
                    Learn more
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Image outside cardInner so it can overflow 8px */}
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className={styles.cardImage}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Secondary Domains List */}
        <div className={styles.secondaryGrid}>
          {secondaryDomains.map((item, idx) => (
            <div key={idx} className={styles.secondaryItem}>
              <div className={styles.topLine} />
              <span className={styles.secNumber}>{item.number}</span>
              <h4 className={styles.secTitle}>{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const secondaryDomains = [
  { number: "04", title: "E-commerce" },
  { number: "05", title: "Retail" },
  { number: "06", title: "Prof. Services" },
  { number: "07", title: "Logistics" },
  { number: "08", title: "Manufacturing" },
];
