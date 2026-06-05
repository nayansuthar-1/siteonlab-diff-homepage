"use client";

import { useEffect, useState } from "react";
import styles from "./LocationPage.module.css";

export default function HeroSmoke() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const heroElement = document.getElementById("locations-hero");
      if (!heroElement) return;
      
      const rect = heroElement.getBoundingClientRect();
      
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
        setIsHovering(true);

        const titleElement = heroElement.querySelector('h1');
        if (titleElement) {
          const titleRect = titleElement.getBoundingClientRect();
          const titleX = e.clientX - titleRect.left;
          const titleY = e.clientY - titleRect.top;
          (titleElement as HTMLElement).style.setProperty('--title-mouse-x', `${titleX}px`);
          (titleElement as HTMLElement).style.setProperty('--title-mouse-y', `${titleY}px`);
        }
      } else {
        setIsHovering(false);
        const titleElement = heroElement.querySelector('h1');
        if (titleElement) {
          (titleElement as HTMLElement).style.setProperty('--title-mouse-x', `-1000px`);
          (titleElement as HTMLElement).style.setProperty('--title-mouse-y', `-1000px`);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={styles.smokeEffect}
      style={{
        opacity: isHovering ? 1 : 0,
        background: `radial-gradient(circle 180px at ${mousePosition.x}% ${mousePosition.y}%, color-mix(in srgb, var(--location-accent) 35%, rgba(255, 255, 255, 0.1)), transparent 100%)`
      }}
      aria-hidden="true"
    />
  );
}
