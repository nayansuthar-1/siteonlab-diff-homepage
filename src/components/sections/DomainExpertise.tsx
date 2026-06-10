import React from "react";
import styles from "./DomainExpertise.module.css";

const domainData = [
  {
    number: "01",
    title: "Finance",
    desc: "Build a secure and reliable fintech app to transform financial operations and enhance customer engagement.",
    theme: "purple",
    tags: ["Payments", "Banking", "Trading", "Wallets", "Compliance"],
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
    theme: "red",
    tags: ["E-Learning", "LMS", "Corporate Training", "Assessments", "EdTech"],
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
    theme: "teal",
    tags: ["Telemedicine", "Diagnostics", "Patient Care", "EHR", "MedTech"],
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

interface DomainExpertiseProps {
  title?: string;
  subtitle?: string;
}

export default function DomainExpertise({
  title = "Domain expertise",
  subtitle = "Siteon Lab blends cutting-edge technologies, expert engineering skills, and domain-specific knowledge to build top-notch solutions in fintech, edtech, and medtech.",
}: DomainExpertiseProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>Domain expertise</span>
          <h2 className={styles.heading}>{title}</h2>
          <p className={styles.subheading}>{subtitle}</p>
        </div>

        {/* Stacking cards */}
        <ul
          className={styles.cards}
          style={{ ["--cards-count" as string]: domainData.length }}
        >
          {domainData.map((item, idx) => (
            <li
              key={item.title}
              className={styles.cardOuter}
              style={{ ["--index" as string]: idx + 1 }}
            >
              <article className={`${styles.card} ${styles[item.theme]}`}>
                <div className={styles.glow} />

                {/* Gradient orb top-right */}
                <div className={styles.orb}>
                  <span className={styles.orbIcon}>{item.icon}</span>
                </div>

                {/* Content bottom-left */}
                <div className={styles.content}>
                  <span className={styles.number}>{item.number}</span>
                  <h3 className={styles.title}>{item.title}</h3>

                  <div className={styles.tags}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className={styles.desc}>{item.desc}</p>

                  <a href="#" className={styles.cta}>
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
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
