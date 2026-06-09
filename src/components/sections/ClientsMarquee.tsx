"use client";

import React from "react";
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
  return (
    <section className={styles.clientsSection}>
      <div className={styles.container}>
        <h2>Our Work Speaks Through Our Clients.</h2>
      </div>
      <div className={styles.marqueeWrapper}>
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {[0, 1].map((groupIndex) => (
              <div key={`group-${groupIndex}`} className={styles.marqueeGroup} aria-hidden={groupIndex === 1}>
                {clientBrands.map((brand, i) => (
                  <div key={`item-${groupIndex}-${i}`} className={styles.marqueeItem}>
                    <Image
                      src={brand.src}
                      alt={brand.alt}
                      fill
                      style={{ objectFit: 'contain', padding: brand.padding, transform: `scale(${brand.scale || 1})` }}
                      sizes="(max-width: 720px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
