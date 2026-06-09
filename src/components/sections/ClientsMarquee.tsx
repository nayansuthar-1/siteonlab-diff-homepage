"use client";

import React from "react";
import Image from "next/image";
import styles from "./ClientsMarquee.module.css";

const clientBrands = [
  { src: '/new/Group 11.png', alt: 'Client 1', scale: 1 },
  { src: '/new/Group 12.png', alt: 'Client 2', scale: 0.65 },
  { src: '/new/Group 13.png', alt: 'Client 3', scale: 1 },
  { src: '/new/Mask group.png', alt: 'Client 4', scale: 1 },
  { src: '/new/Mask group-1.png', alt: 'Client 5', scale: 1 },
  { src: '/new/Mask group-2.png', alt: 'Client 6', scale: 1.5 },
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
                      style={{ objectFit: 'contain', padding: '12px', transform: `scale(${brand.scale})` }}
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
