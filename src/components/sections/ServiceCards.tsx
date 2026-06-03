"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import styles from "./ServiceCards.module.css";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { services } from "@/lib/services";

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized, 16);
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
}

export default function ServiceCards() {
  return (
    <section className={styles.section} id="services-cards">
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack}>
          {/* Group 1 */}
          <div className={styles.slideGroup}>
            {services.map((service) => (
              <Link
                key={`g1-${service.slug}`}
                href={`/services/${service.slug}`}
                className={styles.card}
                style={
                  {
                    "--wave-color": service.accent,
                    "--wave-rgb": hexToRgb(service.accent),
                  } as CSSProperties
                }
              >
                <span className={styles.blurLayer} aria-hidden="true" />
                
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap}>
                    <ServiceIcon name={service.icon} />
                  </div>
                  <h3 className={styles.title}>{service.title}</h3>
                </div>

                <div className={styles.hoverContent}>
                  <p>{service.description}</p>
                  <span className={styles.learnMore}>Learn More</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Group 2 (Duplicate for infinite loop) */}
          <div className={styles.slideGroup} aria-hidden="true">
            {services.map((service) => (
              <Link
                key={`g2-${service.slug}`}
                href={`/services/${service.slug}`}
                className={styles.card}
                tabIndex={-1}
                style={
                  {
                    "--wave-color": service.accent,
                    "--wave-rgb": hexToRgb(service.accent),
                  } as CSSProperties
                }
              >
                <span className={styles.blurLayer} aria-hidden="true" />
                
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap}>
                    <ServiceIcon name={service.icon} />
                  </div>
                  <h3 className={styles.title}>{service.title}</h3>
                </div>

                <div className={styles.hoverContent}>
                  <p>{service.description}</p>
                  <span className={styles.learnMore}>Learn More</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
