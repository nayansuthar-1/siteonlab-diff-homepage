"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import styles from "./ServiceCards.module.css";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { services } from "@/lib/services";

export default function ServiceCards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    // Only on touch / non-hover devices
    if (window.matchMedia("(hover: hover)").matches) return;
    e.preventDefault();
    setPaused(true);
  }, []);

  useEffect(() => {
    if (!paused) return;
    const resume = (e: MouseEvent) => {
      if (trackRef.current && !trackRef.current.contains(e.target as Node)) {
        setPaused(false);
      }
    };
    document.addEventListener("click", resume);
    return () => document.removeEventListener("click", resume);
  }, [paused]);

  return (
    <section className={styles.section} id="services-cards">
      <div className={styles.sliderContainer}>
        <div
          ref={trackRef}
          className={`${styles.sliderTrack} ${paused ? styles.sliderTrackPaused : ""}`}
        >
          {/* Group 1 */}
          <div className={styles.slideGroup}>
            {services.map((service) => (
              <Link
                key={`g1-${service.slug}`}
                href={`/services/${service.slug}`}
                className={styles.card}
                onClick={handleCardClick}
              >
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
                onClick={handleCardClick}
                tabIndex={-1}
              >
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
