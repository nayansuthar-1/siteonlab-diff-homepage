"use client";

import styles from "./ServiceCards.module.css";

const services = [
  {
    title: "AI, Data & Digital\nTransformation.",
    description:
      "Unlock the innovation with AI/ML and Data-driven intelligent solutions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "Software Development,\nWinning Apps.",
    description:
      "Build secure, scalable products end-to-end. From the blueprint to winning the competition",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Product Concept,\nDesign & Easy Start.",
    description:
      "Turn your idea into validated, tangible product concepts within weeks, not months",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l-7-7 1.41-1.41L12 16.17l5.59-5.58L19 12z" />
        <circle cx="12" cy="5" r="3" />
        <path d="M5 21h14" />
      </svg>
    ),
  },
  {
    title: "Expert IT Teams,\nOn-Demand.",
    description:
      "Hire the required talents to ramp up your team and close the skills gap",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function ServiceCards() {
  return (
    <section className={styles.section} id="services-cards">
      <div className={styles.grid}>
        {services.map((service, i) => (
          <a key={i} href="#" className={styles.card}>
            <div className={styles.iconWrap}>{service.icon}</div>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{service.title}</h3>
              <span className={styles.arrow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <p className={styles.description}>{service.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
