"use client";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import styles from "./ServiceCards.module.css";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { services } from "@/lib/services";

export default function ServiceCards() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeCardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frameId = 0;
    const mobileQuery = window.matchMedia("(max-width: 1024px)");

    const updateActiveCard = () => {
      frameId = 0;

      const cards = sectionRef.current?.querySelectorAll<HTMLElement>(`.${styles.card}`);
      if (!cards?.length) return;

      if (!mobileQuery.matches) {
        activeCardRef.current?.classList.remove(styles.active);
        activeCardRef.current = null;
        return;
      }

      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const viewportTop = window.visualViewport?.offsetTop ?? 0;
      const viewportBottom = viewportTop + viewportHeight;
      const viewportCenter = viewportTop + viewportHeight / 2;

      const closestCard = Array.from(cards).reduce<{
        card: HTMLElement | null;
        distance: number;
      }>((closest, card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - cardCenter);
        const isVisible = rect.bottom > viewportTop && rect.top < viewportBottom;

        if (isVisible && distance < closest.distance) {
          return { card, distance };
        }

        return closest;
      }, { card: null, distance: Infinity }).card;

      if (closestCard === activeCardRef.current) return;

      activeCardRef.current?.classList.remove(styles.active);
      closestCard?.classList.add(styles.active);
      activeCardRef.current = closestCard;
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveCard);
    };

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("orientationchange", scheduleUpdate);
    window.visualViewport?.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.visualViewport?.addEventListener("resize", scheduleUpdate);
    mobileQuery.addEventListener("change", scheduleUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      window.visualViewport?.removeEventListener("scroll", scheduleUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleUpdate);
      mobileQuery.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="services-cards">
      <div className={styles.grid}>
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className={styles.card}
            style={{ "--wave-color": service.accent } as CSSProperties}
          >
            <div className={styles.iconWrap}>
              <ServiceIcon name={service.icon} />
            </div>
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
          </Link>
        ))}
      </div>
    </section>
  );
}
