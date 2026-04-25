"use client";

import { useState, useEffect, useCallback } from "react";
import WaveScene from "@/three/WaveScene";
import Link from "next/link";

/* ── rotating words + their gradient colours ── */
const WORDS = [
  {
    text: "web 3.0 project",
    gradient: "linear-gradient(90deg, #f97316, #fb923c, #fdba74)",
  },
  {
    text: "next big thing",
    gradient: "linear-gradient(90deg, #818cf8, #a78bfa, #c084fc)",
  },
  {
    text: "AI-powered solution",
    gradient: "linear-gradient(90deg, #38bdf8, #60a5fa, #818cf8)",
  },
  {
    text: "mobile app",
    gradient: "linear-gradient(90deg, #34d399, #4ade80, #a3e635)",
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
        setTimeout(() => {}, PAUSE_AFTER_DELETE);
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
      <div className="relative z-10 h-full flex items-start pt-[16vh] px-8 md:px-20">
        <div className="max-w-3xl">
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
            <span className="block md:inline">Build your </span>
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
            <br className="hidden md:block" />
            <span className="block md:hidden">with flawless</span>
            <span className="block md:hidden">technology, design,</span>
            <span className="block md:hidden">and execution</span>
            
            <span className="hidden md:inline">with flawless technology,</span>
            <br className="hidden md:block" />
            <span className="hidden md:inline">design, and execution</span>
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
            Award-winning Software Engineering &amp; Consulting Company.
          </p>

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

      {/* cursor blink + gradient text styles */}
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
