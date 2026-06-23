"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Footer from "@/components/ui/Footer";
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

/* ─── Portfolio projects ─── */
const PROJECTS = [
  { image: "/portfolio/1.png", url: "https://expogalerie-s.com/",         name: "Expo Galerie-S" },
  { image: "/portfolio/2.png", url: "https://hotelwingorbit.in/",         name: "Hotel Wing Orbit" },
  { image: "/portfolio/3.png", url: "https://www.stephaniecoudray.com/",  name: "Stephanie Coudray" },
  { image: "/portfolio/4.png", url: "https://bhawnafoundation.com/",      name: "Bhawna Foundation" },
  { image: "/portfolio/5.png", url: "https://skinfoodorganicsusa.com/",   name: "Skinfood Organics" },
  { image: "/portfolio/6.png", url: "https://slaxorajewels.com/",         name: "Slaxora Jewels" },
  { image: "/portfolio/7.png", url: "https://flamingo-piccolo-4nsz.squarespace.com/", name: "Flamingo Piccolo" },
];

/* ─── Client brand logos (same as homepage) ─── */
const clientBrands = [
  { src: '/new/Group 11.png', alt: 'Client 1', scale: 1 },
  { src: '/new/Group 12.png', alt: 'Client 2', scale: 0.65 },
  { src: '/new/Group 13.png', alt: 'Client 3', scale: 1 },
  { src: '/new/Mask group.png', alt: 'Client 4', scale: 1 },
  { src: '/new/Mask group-1.png', alt: 'Client 5', scale: 1 },
  { src: '/new/Mask group-2.png', alt: 'Client 6', scale: 1.5 },
];

export default function PortfolioPage() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Intersection observer for staggered card reveal */
  useEffect(() => {
    if (!mounted) return;
    const cards = document.querySelectorAll(`.${styles.projectCard}`);
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            setVisibleCards((prev) => new Set(prev).add(idx));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [mounted]);

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
                  {clientBrands.map((brand, i) => (
                    <div
                      key={`logo-${groupIdx}-${i}`}
                      className={styles.brandSlot}
                    >
                      <Image
                        src={brand.src}
                        alt={brand.alt}
                        fill
                        style={{ objectFit: 'contain', padding: '12px', transform: `scale(${brand.scale})` }}
                        sizes="(max-width: 720px) 40vw, 180px"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Portfolio Grid ═══ */}
      <section className={styles.portfolioSection}>
        <div className={styles.portfolioInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Featured <span>Projects</span>
            </h2>
            <p className={styles.sectionSub}>
              A curated selection of websites we&apos;ve designed and developed for clients across the globe.
            </p>
          </div>

          <div ref={gridRef} className={styles.projectsGrid}>
            {PROJECTS.map((project, i) => (
              <a
                key={`project-${i}`}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.projectCard} ${visibleCards.has(i) ? styles.projectCardVisible : ""}`}
                data-idx={i}
                style={{ transitionDelay: `${(i % 3) * 0.12}s` }}
              >
                <div className={styles.projectImageWrap}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className={styles.projectOverlay}>
                    <span className={styles.overlayIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </span>
                    <span className={styles.overlayText}>Visit Site</span>
                  </div>
                </div>

                {/* Card footer */}
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <span className={styles.projectUrl}>
                    {project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
