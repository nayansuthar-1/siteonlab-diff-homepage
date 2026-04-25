"use client";

import React, { useState, useEffect, useCallback } from "react";
import Footer from "@/components/ui/Footer";
import styles from "./Careers.module.css";

const rotatingWords = ["code", "design", "grow", "be"];

export default function CareersPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState<"visible" | "exiting" | "entering">("visible");
  const [mounted, setMounted] = useState(false);
  const timeoutRef1 = React.useRef<NodeJS.Timeout | null>(null);
  const timeoutRef2 = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef1.current) clearTimeout(timeoutRef1.current);
      if (timeoutRef2.current) clearTimeout(timeoutRef2.current);
    };
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedJobIndex, setExpandedJobIndex] = useState<number | null>(null);

  // Reset expansion when category changes to prevent layout issues
  useEffect(() => {
    setExpandedJobIndex(null);
  }, [activeCategory]);

  const categories = ["All", "Back-End", "Project Management", "Sales"];

  const openings = [
    {
      id: 1,
      title: "Head of Engineering",
      category: "Back-End",
      details: "Ahmedabad, India, Remote",
      isHot: true,
      description: "We are looking for a visionary Head of Engineering to lead our technical teams and drive technical excellence across our platforms.",
      requirements: [
        "10+ years of experience in software engineering",
        "Proven leadership in managing engineering teams",
        "Deep expertise in modern web architectures",
        "Strong product-centric mindset"
      ]
    },
    {
      id: 2,
      title: "Full-Stack Engineer (Node.js / React.js)",
      category: "Back-End",
      details: "Ahmedabad, India, Remote",
      isHot: false,
      description: "Join our core team to build scalable full-stack applications using the latest JavaScript frameworks.",
      requirements: [
        "Strong proficiency in Node.js and React",
        "Experience with PostgreSQL and Redis",
        "Knowledge of cloud infrastructure (AWS/Azure)",
        "Passionate about writing clean, maintainable code"
      ]
    },
    {
      id: 3,
      title: "Strong Middle Project manager",
      category: "Project Management",
      details: "Ahmedabad, India, Remote",
      isHot: false,
      description: "Coordinate cross-functional teams and ensure the successful delivery of complex technical projects.",
      requirements: [
        "3+ years in IT Project Management",
        "Familiarity with Agile/Scrum methodologies",
        "Excellent communication and stakeholder management",
        "Strong problem-solving skills"
      ]
    },
    {
      id: 4,
      title: "Partner Success Manager",
      category: "Sales",
      details: "Ahmedabad, India, Remote",
      isHot: true,
      description: "Build and maintain strong relationships with our key partners and drive business growth.",
      requirements: [
        "Experience in B2B sales or account management",
        "Strategic thinker with strong analytical skills",
        "Ability to present complex solutions to clients",
        "Track record of hitting growth targets"
      ]
    },
  ];

  const filteredOpenings = activeCategory === "All" 
    ? openings 
    : openings.filter(job => job.category === activeCategory);

  const cycleWord = useCallback(() => {
    setAnimState("exiting");
    timeoutRef1.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
      setAnimState("entering");
      timeoutRef2.current = setTimeout(() => {
        setAnimState("visible");
      }, 400);
    }, 400);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(cycleWord, 2800);
    return () => clearInterval(interval);
  }, [mounted, cycleWord]);

  if (!mounted) return null;

  const wordClass =
    animState === "exiting"
      ? styles.wordExit
      : animState === "entering"
      ? styles.wordEnter
      : styles.wordVisible;

  return (
    <main className={styles.main}>
      {/* ═══ Hero Section ═══ */}
      <section className={styles.heroSection}>
        {/* Background Image */}
        <div className={styles.heroBg}>
          <img
            src="/careers.jpg"
            alt="SiteonLab team"
            className={styles.heroBgImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        {/* Content */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Together at SiteonLab</h1>

          <div className={styles.heroSubtitleRow}>
            <span className={styles.heroSubtitleStatic}>A great place to</span>
            <span className={styles.wordWrapper}>
              <span className={`${styles.rotatingWord} ${wordClass}`}>
                {rotatingWords[currentIndex]}
              </span>
            </span>
          </div>
        </div>

        <a href="#openings" className={styles.heroBtn}>
          <span>Check Openings</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M12 19l-7-7M12 19l7-7" />
          </svg>
        </a>
      </section>

      {/* ═══ Why Join Us Section ═══ */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesContainer}>
          <h2 className={styles.valuesTitle}>Why join SiteonLab?</h2>
          <p className={styles.valuesSubtitle}>
            We believe in building a culture where talent thrives, ideas matter, and everyone grows together.
          </p>

          <div className={styles.valuesGrid}>
            {/* Card 1 — Innovation */}
            <div className={styles.valueCardContainer}>
              <div className={styles.valueCard} data-accent="#a855f7">
                <div className={styles.valueCardInner}>
                  <div className={styles.valueIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className={styles.valueCardTitle}>Innovation First</h3>
                  <p className={styles.valueCardDesc}>
                    Work on cutting-edge projects with modern tech stacks. We encourage experimentation and creative problem-solving.
                  </p>
                </div>
                <div className={styles.valueAccent} style={{ backgroundColor: "#a855f7" }} />
                <div className={styles.valueFill} style={{ backgroundColor: "#a855f7" }} />
              </div>
              <div className={styles.valueGlow} style={{ boxShadow: "0 0 40px rgba(168, 85, 247, 0.4)" }} />
            </div>

            {/* Card 2 — Growth */}
            <div className={styles.valueCardContainer}>
              <div className={styles.valueCard} data-accent="#10b981">
                <div className={styles.valueCardInner}>
                  <div className={styles.valueIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      <path d="M3 3v18h18" />
                      <path d="M7 17l4-8 4 4 5-9" />
                    </svg>
                  </div>
                  <h3 className={styles.valueCardTitle}>Grow Together</h3>
                  <p className={styles.valueCardDesc}>
                    Clear career paths, mentorship programs, and continuous learning opportunities to level up your skills.
                  </p>
                </div>
                <div className={styles.valueAccent} style={{ backgroundColor: "#10b981" }} />
                <div className={styles.valueFill} style={{ backgroundColor: "#10b981" }} />
              </div>
              <div className={styles.valueGlow} style={{ boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)" }} />
            </div>

            {/* Card 3 — Flexibility */}
            <div className={styles.valueCardContainer}>
              <div className={styles.valueCard} data-accent="#3b82f6">
                <div className={styles.valueCardInner}>
                  <div className={styles.valueIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h3 className={styles.valueCardTitle}>Work-Life Balance</h3>
                  <p className={styles.valueCardDesc}>
                    Flexible hours, remote-friendly culture, and a team that respects your time and well-being.
                  </p>
                </div>
                <div className={styles.valueAccent} style={{ backgroundColor: "#3b82f6" }} />
                <div className={styles.valueFill} style={{ backgroundColor: "#3b82f6" }} />
              </div>
              <div className={styles.valueGlow} style={{ boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)" }} />
            </div>

            {/* Card 4 — Impact */}
            <div className={styles.valueCardContainer}>
              <div className={styles.valueCard} data-accent="#f59e0b">
                <div className={styles.valueCardInner}>
                  <div className={styles.valueIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </div>
                  <h3 className={styles.valueCardTitle}>Global Impact</h3>
                  <p className={styles.valueCardDesc}>
                    Build products used by businesses worldwide. Your work reaches real users across multiple industries.
                  </p>
                </div>
                <div className={styles.valueAccent} style={{ backgroundColor: "#f59e0b" }} />
                <div className={styles.valueFill} style={{ backgroundColor: "#f59e0b" }} />
              </div>
              <div className={styles.valueGlow} style={{ boxShadow: "0 0 40px rgba(245, 158, 11, 0.4)" }} />
            </div>

            {/* Card 5 — Team */}
            <div className={styles.valueCardContainer}>
              <div className={styles.valueCard} data-accent="#ec4899">
                <div className={styles.valueCardInner}>
                  <div className={styles.valueIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87" />
                      <path d="M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  </div>
                  <h3 className={styles.valueCardTitle}>Amazing People</h3>
                  <p className={styles.valueCardDesc}>
                    Join a team of passionate designers, engineers, and creators who love what they do every single day.
                  </p>
                </div>
                <div className={styles.valueAccent} style={{ backgroundColor: "#ec4899" }} />
                <div className={styles.valueFill} style={{ backgroundColor: "#ec4899" }} />
              </div>
              <div className={styles.valueGlow} style={{ boxShadow: "0 0 40px rgba(236, 72, 153, 0.4)" }} />
            </div>

            {/* Card 6 — Perks */}
            <div className={styles.valueCardContainer}>
              <div className={styles.valueCard} data-accent="#06b6d4">
                <div className={styles.valueCardInner}>
                  <div className={styles.valueIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <h3 className={styles.valueCardTitle}>Great Perks</h3>
                  <p className={styles.valueCardDesc}>
                    Competitive pay, health benefits, team retreats, and all the tools you need to do your best work.
                  </p>
                </div>
                <div className={styles.valueAccent} style={{ backgroundColor: "#06b6d4" }} />
                <div className={styles.valueFill} style={{ backgroundColor: "#06b6d4" }} />
              </div>
              <div className={styles.valueGlow} style={{ boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Current Openings Section ═══ */}
      <section id="openings" className={styles.openingsSection}>
        <div className={styles.openingsContainer}>
          <h2 className={styles.openingsTitle}>Current Openings</h2>

          {/* Filter Tabs */}
          <div className={styles.filterTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterTab} ${
                  activeCategory === cat ? styles.filterTabActive : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Job List */}
          <div className={styles.jobList}>
            {filteredOpenings.map((job) => (
              <div 
                key={job.id} 
                className={`${styles.jobRow} ${expandedJobIndex === job.id ? styles.jobRowExpanded : ""}`}
                onClick={() => setExpandedJobIndex(expandedJobIndex === job.id ? null : job.id)}
              >
                <div className={styles.jobRowHeader}>
                  <div className={styles.jobInfo}>
                    {job.isHot && <span className={styles.hotIcon}>🔥</span>}
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                  </div>
                  
                  <div className={styles.jobMeta}>
                    <span className={styles.jobDetails}>{job.details}</span>
                    <div className={`${styles.plusIcon} ${expandedJobIndex === job.id ? styles.plusIconActive : ""}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <div className={`${styles.jobContent} ${expandedJobIndex === job.id ? styles.jobContentVisible : ""}`}>
                  <div className={styles.jobContentInner}>
                    <div className={styles.jobDescription}>
                      <p>{job.description}</p>
                    </div>
                    
                    <div className={styles.jobRequirements}>
                      <h4>Requirements:</h4>
                      <ul>
                        {job.requirements.map((req, ridx) => (
                          <li key={ridx}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <button className={styles.applyBtn}>
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredOpenings.length === 0 && (
              <div className={styles.noJobs}>
                No openings found for this category. Check back later!
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer showSchedule={false} />
    </main>
  );
}
