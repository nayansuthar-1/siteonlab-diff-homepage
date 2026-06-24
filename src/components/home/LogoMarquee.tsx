"use client";

import type { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

// Inline reproduction of the BREAKPOINT brand logo (sun + wave emblem above a
// letter-spaced wordmark). Rendered inline so it inherits the site font.
function BreakpointLogo() {
  return (
    <svg
      viewBox="0 0 280 96"
      role="img"
      aria-label="Breakpoint"
      className="h-12 w-auto"
    >
      {/* Sun */}
      <circle cx="140" cy="30" r="22" fill="#ecd6a3" />
      {/* Horizon line gently waving across the mark */}
      <path
        d="M14 40 C 60 26 96 26 124 38 C 138 44 150 44 164 38 C 192 26 224 28 266 40"
        fill="none"
        stroke="#7d5a3a"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Breaking wave with a teal underside, tucked by the sun */}
      <path
        d="M128 41 q 10 -16 24 -6 q 9 7 2 15 q -7 7 -17 3 q -10 -4 -9 -12 z"
        fill="#9fb8b5"
      />
      <path
        d="M128 41 q 10 -16 24 -6 q 9 7 2 15"
        fill="none"
        stroke="#7d5a3a"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Wordmark */}
      <text
        x="140"
        y="86"
        textAnchor="middle"
        fill="#ecd6a3"
        fontFamily="inherit"
        fontSize="26"
        fontWeight="500"
        letterSpacing="7"
      >
        BREAKPOINT
      </text>
    </svg>
  );
}

type MarqueeLogo = { name: string; logo?: ReactNode; img?: { src: string; scale: number } };

export default function LogoMarquee() {
  const logos: MarqueeLogo[] = [
    { name: 'Breakpoint', logo: <BreakpointLogo /> },
    { name: 'SR Industries', img: { src: '/new/Group 11.png', scale: 1 } },
    { name: 'Client 2', img: { src: '/new/Group 12.png', scale: 0.65 } },
    { name: 'Client 3', img: { src: '/new/Group 13.png', scale: 1 } },
    { name: 'Client 4', img: { src: '/new/Mask group.png', scale: 1 } },
    { name: 'Client 5', img: { src: '/new/Mask group-1.png', scale: 1 } },
    { name: 'Client 6', img: { src: '/new/Mask group-2.png', scale: 1.5 } },
  ];

  // Duplicate items twice to ensure endless cycle coverage
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-10 md:py-14 select-none relative">
      {/* Visual fading edge gradients for premium marquee overlay depth */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#07090e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#07090e] to-transparent z-10 pointer-events-none" />

      <div className="flex w-full">
        <motion.div
          className="flex gap-16 items-center flex-nowrap"
          animate={{ x: [0, "-33.333%"] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
        >
          {duplicatedLogos.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="flex items-center justify-center shrink-0 opacity-50 hover:opacity-90 transition-opacity duration-300 pointer-events-none"
            >
              {logo.img ? (
                <div className="relative h-10 w-36">
                  <Image
                    src={logo.img.src}
                    alt={logo.name}
                    fill
                    sizes="160px"
                    style={{ objectFit: 'contain', transform: `scale(${logo.img.scale})` }}
                  />
                </div>
              ) : (
                logo.logo
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
