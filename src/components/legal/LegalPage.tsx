import React from "react";
import Footer from "@/components/ui/Footer";
import styles from "./LegalPage.module.css";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}

const LegalPage = ({ eyebrow, title, lastUpdated, intro, sections }: LegalPageProps) => {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.intro}>{intro}</div>

        {sections.map((section, index) => (
          <section key={index} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.heading}</h2>
            {section.body}
          </section>
        ))}
      </div>

      <Footer showSchedule={false} />
    </main>
  );
};

export default LegalPage;
