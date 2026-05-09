"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2012, suffix: "", label: "Founded" },
  { value: 120, suffix: "+", label: "IT Professionals" },
  { value: 250, suffix: "+", label: "Projects delivered" },
];

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function AnimatedNumber({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let animationFrame = 0;
    const duration = 1500;
    const start = performance.now();

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [active, value]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || isActive) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [isActive]);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 bg-black overflow-hidden">
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-20">
        
        {/* Strictly contained horizontal glow behind text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[100%] max-w-4xl h-[60px] md:h-[90px] bg-[#543b75] opacity-80 blur-[60px] md:blur-[80px] rounded-[50%]"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
          
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <span
                className="text-[2rem] md:text-[2.5rem] text-white leading-none tracking-tight tabular-nums"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontWeight: 300 }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} active={isActive} />
              </span>
              <span
                className="text-[0.8rem] md:text-[0.9rem] text-[#aba8b2] tracking-wide"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontWeight: 500 }}
              >
                {stat.label}
              </span>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
