import React from "react";
import styles from "./DomainExpertise.module.css";

const domainData = [
  {
    number: "01",
    title: "Web Development",
    desc: "Build fast, scalable, and secure websites and web apps — engineered for performance, conversions, and effortless growth.",
    theme: "purple",
    tags: ["Next.js", "React", "Web Apps", "E-commerce", "Performance"],
    icon: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        stroke="#fff"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 10 4 16l7 6" />
        <path d="M21 10l7 6-7 6" />
        <path d="M18 6 14 26" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "SEO Service",
    desc: "Boost your search rankings and organic traffic with data-driven, technical, and on-page SEO built to keep you visible.",
    theme: "red",
    tags: ["Technical SEO", "On-Page", "Keyword Research", "Local SEO", "Analytics"],
    icon: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        stroke="#fff"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="13" cy="13" r="8.5" />
        <path d="M19.5 19.5 27 27" />
        <path d="M9 15.5l2.5-3.5 2.2 2.4 3.3-4.4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "UI/UX Design",
    desc: "Craft intuitive, engaging interfaces backed by research — turning every interaction into a seamless, delightful experience.",
    theme: "teal",
    tags: ["UI Design", "UX Research", "Prototyping", "Wireframing", "Design Systems"],
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 3 L19 13 L29 16 L19 19 L16 29 L13 19 L3 16 L13 13 Z"
          fill="#fff"
        />
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
