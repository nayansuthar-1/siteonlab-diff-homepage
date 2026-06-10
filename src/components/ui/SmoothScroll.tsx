"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/**
 * Site-wide smooth scrolling (momentum / eased), the same feel as dhero.studio.
 * Wraps the whole app so every page gets the weighted glide instead of the
 * browser's instant scroll. Touch devices keep native scrolling.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        // expo-out easing — the classic Awwwards / dhero glide
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      {children}
    </ReactLenis>
  );
}
