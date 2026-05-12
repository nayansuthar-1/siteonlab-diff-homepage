import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";
import { locations } from "@/lib/locations";
import styles from "./LocationPage.module.css";

export const metadata: Metadata = {
  title: "Digital Marketing Locations | SiteOnLab",
  description: "Explore SiteOnLab digital marketing services across Bangalore, Chennai, Delhi, Hyderabad, Jaipur, Kolkata, Mumbai, and Pune.",
};

export default function LocationsPage() {
  return (
    <main className={`${styles.main} ${styles.overviewHero}`}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.overviewIntro}>
            <span className={styles.eyebrow}>SiteOnLab locations</span>
            <h1 className={styles.title}>Digital marketing built for India&apos;s growth cities</h1>
            <p className={styles.subtitle}>
              Choose your city to explore SEO, PPC, social media, content, analytics, and local growth systems tailored for your market.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/contact" className={styles.primaryCta}>
                Start a project
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.overviewSection}>
        <div className={styles.container}>
          <div className={styles.locationGrid}>
            {locations.map((location) => (
              <Link
                href={`/locations/${location.slug}`}
                className={styles.locationCard}
                key={location.slug}
                style={{ "--location-accent": location.accent } as CSSProperties}
              >
                <div className={styles.locationCardTop}>
                  <span className={styles.locationBadge}>{location.region}</span>
                  <span className={styles.locationArrow} aria-hidden="true">-&gt;</span>
                </div>
                <h3>{location.name}</h3>
                <p>{location.heroLine} for {location.marketNote}.</p>
                <div className={styles.industryGrid}>
                  {location.industries.map((industry) => (
                    <span className={styles.industryChip} key={industry}>{industry}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer showSchedule={false} />
    </main>
  );
}
