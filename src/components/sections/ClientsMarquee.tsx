"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ClientsMarquee.module.css";

const clientBrands = [
  { src: '/brands/galerie.svg', alt: 'Galerie', padding: '32px', scale: 1 },
  { src: '/brands/stephanie.svg', alt: 'Stephanie', padding: '32px', scale: 1 },
  { src: '/brands/wing-orbit.png', alt: 'Wing Orbit', padding: '12px', scale: 1 },
  { src: '/brands/Bhawna_foundation_logo.png', alt: 'Bhawna Foundation', padding: '0px', scale: 1.5 },
  { src: '/brands/jemie.png', alt: 'Jemie', padding: '0px', scale: 1.5 },
  { src: '/brands/sr-indus.jpeg', alt: 'SR Indus', padding: '32px', scale: 1 }
];

export default function ClientsMarquee() {
  const [currentIndex, setCurrentIndex] = useState(12);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 2);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= 18) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - 6);
    } else if (currentIndex <= 6) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + 6);
    }
  };

  const offset = `calc(var(--center-offset) - ${currentIndex} * (var(--item-width) + var(--gap)))`;

  return (
    <section className={styles.clientsSection}>
      <div className={styles.container}>
        <h2>Our Work Speaks Through Our Clients.</h2>
      </div>
      <div className={styles.marqueeWrapper}>
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrev} aria-label="Previous logo">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className={styles.marquee}>
          <div 
            className={`${styles.marqueeTrack} ${!isTransitioning ? styles.noTransition : ''}`}
            style={{ transform: `translateX(${offset})` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {[0, 1, 2, 3, 4].map((groupIndex) => (
              <div key={`group-${groupIndex}`} className={styles.marqueeGroup}>
                {clientBrands.map((brand, i) => (
                  <div key={`item-${groupIndex}-${i}`} className={styles.marqueeItem}>
                    {brand ? (
                      <Image 
                        src={brand.src} 
                        alt={brand.alt} 
                        fill 
                        style={{ objectFit: 'contain', padding: brand.padding, transform: `scale(${brand.scale || 1})` }} 
                        sizes="(max-width: 720px) 50vw, 25vw"
                      />
                    ) : (
                      <div className={styles.placeholderImage}>Placeholder {i + 1}</div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleNext} aria-label="Next logo">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
