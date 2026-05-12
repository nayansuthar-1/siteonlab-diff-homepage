import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { whiteLabelServices } from "@/lib/white-label-services";
import styles from "./WhiteLabel.module.css";

export const metadata: Metadata = {
  title: "White Label Services | SiteOnLab",
  description:
    "White label website design, Shopify development, and WordPress development services for agencies.",
};

export default function WhiteLabelServicesPage() {
  return (
    <main className={`${styles.main} ${styles.overviewHero}`}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.overviewIntro}>
            <span className={styles.eyebrow}>White label services</span>
            <h1 className={styles.title}>Behind-the-scenes delivery for agencies that want to scale</h1>
            <p className={styles.subtitle}>
              Add SiteOnLab as your silent web design, Shopify, and WordPress delivery team while your agency keeps the client relationship and brand credit.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/contact" className={styles.primaryCta}>
                Become a partner
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.overviewGrid}>
            {whiteLabelServices.map((service) => (
              <Link
                href={`/white-label-services/${service.slug}`}
                className={styles.overviewCard}
                key={service.slug}
                style={{ "--wl-accent": service.accent } as CSSProperties}
              >
                <div className={styles.overviewCardTop}>
                  <div className={styles.iconBox}>
                    <ServiceIcon name={service.icon} />
                  </div>
                  <span className={styles.overviewArrow} aria-hidden="true">-&gt;</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.heroDescription}</p>
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
