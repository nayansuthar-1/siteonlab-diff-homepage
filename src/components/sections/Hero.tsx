"use client";
import { useState, useEffect, useCallback } from "react";
import WaveScene from "@/three/WaveScene";
import Link from "next/link";

const WORDS = [
  {
    text: "Digital Marketing",
    gradient: "linear-gradient(90deg, #f97316, #fb923c, #fdba74)",
  },
  {
    text: "Web Development",
    gradient: "linear-gradient(90deg, #06b6d4, #22d3ee, #67e8f9)",
  },
  {
    text: "SEO",
    gradient: "linear-gradient(90deg, #22c55e, #4ade80, #86efac)",
  },
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const full = WORDS[wordIdx].text;

    if (!isDeleting) {
      /* typing forward */
      const next = full.slice(0, displayed.length + 1);
      setDisplayed(next);

      if (next === full) {
        /* finished typing → pause, then start deleting */
        setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
        return;
      }
    } else {
      /* deleting */
      const next = full.slice(0, displayed.length - 1);
      setDisplayed(next);

      if (next === "") {
        setIsDeleting(false);
        setWordIdx((prev) => (prev + 1) % WORDS.length);
        /* small pause before next word */
        setTimeout(() => { }, PAUSE_AFTER_DELETE);
        return;
      }
    }
  }, [displayed, isDeleting, wordIdx]);

  useEffect(() => {
    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  const currentGradient = WORDS[wordIdx].gradient;
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* Shader background — full width */}
      <div className="absolute inset-0">
        <WaveScene />
      </div>

      {/* Content LEFT */}
      <div className="relative z-10 h-full flex items-start pt-[16vh] px-8 md:px-20 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          <h1
            style={{
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              fontSize: "clamp(1.9rem, 3.8vw, 3rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              color: "#fff",
              letterSpacing: "-0.025em",
            }}
          >
            <span className="block md:inline">AI Powered </span>
            <span className="block md:inline">
              <span
                className="hero-gradient-text"
                style={{ "--hero-gradient": currentGradient } as React.CSSProperties}
              >
                {displayed}
              </span>
              <span
                className="hero-cursor"
                style={{ "--hero-gradient": currentGradient } as React.CSSProperties}
              />
            </span>
            <span className="block">Agency in Ahmedabad</span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "clamp(1rem, 1.6vw, 1.125rem)",
              marginTop: "1.75rem",
              fontWeight: 400,
              letterSpacing: "0.01em",
              lineHeight: 1.5,
            }}
          >
            We are a leading digital marketing agency in Ahmedabad, helping businesses grow online with tailored SEO, PPC, social media, and web development solutions. Our focus is on measurable results, brand growth, and ROI-driven campaigns.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-8 mt-8 text-white/90 text-sm md:text-base font-medium">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>100+ Projects Done</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Trusted by 50+ Businesses</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>20+ Expert Team</span>
            </div>
          </div>

          <div style={{ marginTop: "2.25rem" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "15px 40px",
                border: "1.5px solid rgba(255,255,255,0.3)",
                borderRadius: "100px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 500,
                textDecoration: "none",
                transition:
                  "background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.15s ease",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget;
                t.style.background = "#fff";
                t.style.color = "#000";
                t.style.borderColor = "#fff";
                t.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget;
                t.style.background = "transparent";
                t.style.color = "#fff";
                t.style.borderColor = "rgba(255,255,255,0.3)";
                t.style.transform = "translateY(0)";
              }}
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hero-gradient-text {
          background-image: var(--hero-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background-image: var(--hero-gradient);
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: cursorBlink 0.7s steps(1) infinite;
        }
        @keyframes cursorBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
