"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./portfolio.module.css";

/* ─── Particle config (deterministic) ─── */
const PARTICLES = [
  { id: 0, left: "12%", duration: "10s", delay: "0s", size: "3px" },
  { id: 1, left: "28%", duration: "14s", delay: "2s", size: "2px" },
  { id: 2, left: "45%", duration: "11s", delay: "4s", size: "4px" },
  { id: 3, left: "58%", duration: "16s", delay: "1s", size: "2px" },
  { id: 4, left: "72%", duration: "12s", delay: "3s", size: "3px" },
  { id: 5, left: "85%", duration: "13s", delay: "5s", size: "2px" },
  { id: 6, left: "35%", duration: "18s", delay: "0.5s", size: "3px" },
  { id: 7, left: "65%", duration: "9s", delay: "3.5s", size: "4px" },
  { id: 8, left: "20%", duration: "15s", delay: "6s", size: "2px" },
  { id: 9, left: "78%", duration: "11s", delay: "1.5s", size: "3px" },
];

/* ─── Hero text split into words ─── */
const HERO_WORDS = ["Our", "solutions", "have", "helped", "global", "customers."];

/* ─── Placeholder brand slots ─── */
const BRAND_SLOTS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  label: `Brand ${i + 1}`,
}));

export default function PortfolioPage() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Cursor-following glow */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!glowRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.left = `${x}px`;
      glowRef.current.style.top = `${y}px`;
    },
    []
  );

  if (!mounted) return null;

  return (
    <main>
      {/* ═══ Hero Section ═══ */}
      <section
        ref={heroRef}
        className={styles.hero}
        onMouseMove={handleMouseMove}
      >
        {/* Smoke + glow background */}
        <div className={styles.glowContainer}>
          <div className={styles.glow} />
          <div className={styles.glowSecond} />
          <div className={styles.glowThird} />
        </div>

        {/* Subtle grid */}
        <div className={styles.gridOverlay} />

        {/* Horizontal light line */}
        <div className={styles.lightLine} />

        {/* Cursor glow */}
        <div ref={glowRef} className={styles.cursorGlow} />

        {/* Decorative rings */}
        <div className={styles.heroRing} />
        <div className={styles.heroRingInner} />

        {/* Floating particles */}
        <div className={styles.particles}>
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className={styles.particle}
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>
            {HERO_WORDS.map((word, i) => (
              <span
                key={`w-${i}`}
                className={styles.word}
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className={styles.heroSub}>
            From ambitious startups to established enterprises, we craft digital
            experiences that drive real growth and leave a lasting impact across
            industries worldwide.
          </p>
        </div>

      </section>

      {/* ═══ Brands Slider ═══ */}
      <section className={styles.brandsSection}>
        <div className={styles.brandsInner}>
          {/* Left 30% — label */}
          <div className={styles.brandsLeft}>
            <h2 className={styles.brandsTitle}>
              Trusted by
              <span>Leading Brands</span>
            </h2>
          </div>

          {/* Right 70% — infinite marquee */}
          <div className={styles.brandsRight}>
            <div className={styles.marqueeTrack}>
              {[0, 1].map((groupIdx) => (
                <div
                  key={`brand-group-${groupIdx}`}
                  className={styles.marqueeGroup}
                  aria-hidden={groupIdx === 1}
                >
                  {BRAND_SLOTS.map((slot) => (
                    <div
                      key={`slot-${groupIdx}-${slot.id}`}
                      className={styles.brandSlot}
                    >
                      {slot.label}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
