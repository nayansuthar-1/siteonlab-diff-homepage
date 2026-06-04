"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Footer from "@/components/ui/Footer";
import styles from "./Company.module.css";

export default function CompanyPage() {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.glowContainer}>
          <div className={styles.glow}></div>
          <div className={styles.glowSecond}></div>
          <div className={styles.glowThird}></div>
          
          {/* Cursor Follow Smoke */}
          <div 
            ref={cursorRef}
            className={styles.cursorGlow}
          ></div>
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heading}>
            <span className={styles.highlight}>Fuelled by Excellence.</span> Trusted by Leaders.
          </h1>
          <p className={styles.subheading}>
            We shape a smarter future and empower ambitious companies to lead their markets 
            through cutting-edge digital technologies.
          </p>
        </div>

        {/* Stats Section */}
        <div className={styles.statsContainer}>
          <div className={styles.heroStatsRow}>
            <div className={styles.statItem}>
              <div className={styles.statTop}>
                <div className={styles.statIconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span className={styles.statNumber}>30+</span>
              </div>
              <span className={styles.statLabel}>IT Professionals</span>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statTop}>
                <div className={styles.statIconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <span className={styles.statNumber}>5+</span>
              </div>
              <span className={styles.statLabel}>Years on the Market</span>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statTop}>
                <div className={styles.statIconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <polyline points="16 11 18 13 22 9"></polyline>
                  </svg>
                </div>
                <span className={styles.statNumber}>100+</span>
              </div>
              <span className={styles.statLabel}>Projects Delivered</span>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statTop}>
                <div className={styles.statIconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <span className={styles.statNumber}>50+</span>
              </div>
              <span className={styles.statLabel}>Trusted Clients</span>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statTop}>
                <div className={styles.statIconWrapper}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <span className={styles.statNumber}>5.0</span>
              </div>
              <span className={styles.statLabel}>Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Executives Section */}
      <section className={styles.executivesSection}>
        <div className={styles.executivesHeader}>
          <h2 className={styles.executivesTitle}>Executives</h2>
          <p className={styles.executivesSubtitle}>
            Our company’s leaders have decades of combined 
            experience developing software projects.
          </p>
        </div>

        <div className={styles.executivesGrid}>
          {executives.map((exec, index) => (
            <div key={index} className={styles.executiveCard}>
              <div className={styles.cardContent}>
                <div className={styles.imageWrapper}>
                  <div className={styles.execImage} style={{ background: `linear-gradient(135deg, #111, #222)` }}></div>
                </div>
                
                <div className={styles.hoverInfo}>
                  <div className={styles.linkedinIconLarge}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <h3 className={styles.execName}>{exec.name}</h3>
                  <p className={styles.execTitle}>{exec.title}</p>
                  <p className={styles.execBio}>{exec.bio}</p>
                </div>

                <div className={styles.defaultInfo}>
                  <h3 className={styles.execName}>{exec.name}</h3>
                  <p className={styles.execTitle}>{exec.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* History Section */}
      <section className={styles.historySection}>
        <div className={styles.historyHeader}>
          <h2 className={styles.historyTitle}>Our history</h2>
          <p className={styles.historySubtitle}>
            Web & Mobile App Development has been a core competence of the company since 2012
          </p>
        </div>

        <div className={styles.historyContent}>
          {/* Left: Polaroid Stack */}
          <div className={styles.polaroidStack}>
            <div className={`${styles.polaroid} ${styles.polaroid1}`}>
              <div className={styles.polaroidImage} style={{ background: `linear-gradient(45deg, #222, #333)` }}></div>
            </div>
            <div className={`${styles.polaroid} ${styles.polaroid2}`}>
              <div className={styles.polaroidImage} style={{ background: `linear-gradient(45deg, #111, #222)` }}></div>
            </div>
            <div className={`${styles.polaroid} ${styles.polaroid3}`}>
              <div className={styles.polaroidImage} style={{ background: `linear-gradient(45deg, #333, #444)` }}></div>
            </div>
          </div>

          {/* Right: Milestone Info */}
          <div className={styles.milestoneInfo}>
            <div className={styles.milestoneYear}>2026</div>
            <h3 className={styles.milestoneHeading}>
              SiteonLab today: <br />
              <span className={styles.orangeText}>Global reach, strong roots.</span>
            </h3>
            <div className={styles.milestoneDescription}>
              <p>
                Today, SiteonLab unites global delivery with strong Indian roots — helping clients worldwide build impactful, future-ready digital products.
              </p>
              <p>
                Our journey is powered by people — talented, curious, and brave enough to shape the future together.
              </p>
            </div>


          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className={styles.principlesSection}>
        {/* Atmospheric Glows - Richer Density */}
        <div className={styles.bgGlow} style={{ top: '-10%', left: '10%', width: '600px', height: '600px', opacity: 0.12 }}></div>
        <div className={styles.bgGlow} style={{ top: '20%', right: '5%', width: '700px', height: '700px', opacity: 0.08 }}></div>
        <div className={styles.bgGlow} style={{ top: '50%', left: '40%', width: '500px', height: '500px', opacity: 0.1 }}></div>
        <div className={styles.bgGlow} style={{ bottom: '10%', left: '-5%', width: '650px', height: '650px', opacity: 0.15 }}></div>
        <div className={styles.bgGlow} style={{ bottom: '20%', right: '15%', width: '550px', height: '550px', opacity: 0.09 }}></div>
        <div className={styles.bgGlow} style={{ top: '35%', left: '15%', width: '450px', height: '450px', opacity: 0.07 }}></div>

        <div className={styles.principlesHeader}>
          <h2 className={styles.principlesTitle}>Our Principles</h2>
          <p className={styles.principlesSubtitle}>
            We are building a company where people love to work. <br />
            Discover our key principles - they are at the core of SiteonLab culture.
          </p>
        </div>

        <div className={styles.principlesGrid}>
          {principles.slice(0, 6).map((principle, index) => (
            <div key={index} className={styles.principleCard}>
              <div className={styles.principleIcon}>
                <div className={styles.iconGlow}></div>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.iconSvg}>
                  {index === 0 && ( // Diving Deep - Microscope
                    <path d="M6 18h8M10 22h4M7 18V7a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v11M10 11h4M12 11V7" />
                  )}
                  {index === 1 && ( // Flawless Execution - Diamond
                    <path d="M6 3h12l4 6-10 12L2 9zM12 3v18M2 9h20M7 3l5 6M17 3l-5 6" />
                  )}
                  {index === 2 && ( // Embracing Innovations - Lightbulb
                    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
                  )}
                  {index === 3 && ( // True Caring - Heart
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  )}
                  {index === 4 && ( // Being Agile - Agile Arrow
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24M21 3v9h-9" />
                  )}
                  {index === 5 && ( // Constant Improvement - Growth
                    <path d="M22 12A10 10 0 1 1 12 2M12 2v10l5 5M16 2l3 3-3 3" />
                  )}
                </svg>
              </div>
              <div className={styles.principleText}>
                <h3 className={styles.principleName}>{principle.title}</h3>
                <p className={styles.principleDesc}>{principle.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.centeredPrinciple}>
          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <div className={styles.iconGlow}></div>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.iconSvg}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className={styles.principleText}>
              <h3 className={styles.principleName}>{principles[6].title}</h3>
              <p className={styles.principleDesc}>{principles[6].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.contactContainer}>
          {/* Left Side: Stats & Logo */}
          <div className={styles.contactInfo}>
            <div className={styles.contactHeader}>
              <h2 className={styles.contactTitle}>Get in touch</h2>
              <p className={styles.contactSubtitle}>
                Let's create something your users will love. <br />
                Fill out the form - we'll get back to you as soon as possible.
              </p>
            </div>

            <div className={styles.logoVisual}>
              <Image 
                src="/siteonlab-logo.png" 
                alt="SiteOnLab logo" 
                width={2438} 
                height={813}
                className={styles.contactLogo}
                priority
              />
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>30+</span>
                <span className={styles.statLabel}>In-house <br /> IT-professionals</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Projects <br /> Delivered</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Years <br /> on a market</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className={styles.contactFormWrapper}>
            <form className={styles.contactForm}>
              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Full Name<span>*</span></label>
                <input type="text" placeholder="Full Name" className={styles.formInput} />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Company<span>*</span></label>
                <input type="text" placeholder="Company" className={styles.formInput} />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>E-mail<span>*</span></label>
                <input type="email" placeholder="alex.walker@domain.com" className={styles.formInput} />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Phone</label>
                <div className={styles.phoneInput}>
                  <div className={styles.countrySelector}>
                    <img src="https://flagcdn.com/w20/in.png" alt="India" width="20" />
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </div>
                  <input type="tel" placeholder="+91" className={styles.formInput} />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Tell us about your project</label>
                <textarea placeholder="Description" className={styles.formTextarea}></textarea>
              </div>

              <div className={styles.attachFile}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
                <span>Attach files</span>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>Submit</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer showSchedule={false} />
    </main>
  );
}

const principles = [
  { 
    title: "Diving Deep.", 
    desc: "We embrace challenges, knowing research leads to solutions. We focus on actionable concepts that deliver value and prioritize client success." 
  },
  { 
    title: "Flawless Execution.", 
    desc: "We ship with discipline: clear ownership, tested deliverables, and predictable timelines. Quality is non-negotiable at every stage." 
  },
  { 
    title: "Embracing the Innovations.", 
    desc: "We stay curious and hands-on with new tools and methods, turning emerging ideas into practical advantages for our clients." 
  },
  { 
    title: "True Caring.", 
    desc: "We collaborate with clients to adapt and improve our products, using our expertise and feedback to cut costs and boost results." 
  },
  { 
    title: "Being Agile.", 
    desc: "We plan realistically, communicate early, and deliver on time. When priorities shift, we respond fast without sacrificing quality." 
  },
  { 
    title: "Constant Improvement.", 
    desc: "We learn from every release, measure outcomes, and refine our craft—one iteration at a time." 
  },
  { 
    title: "Contribution & Teamwork.", 
    desc: "We foster strong relationships with clients and partners through honesty and respect, ensuring transparency and trust with direct access to our team." 
  }
];

const executives = [
  { 
    name: "Oleks Mykolaienko", 
    title: "Founding partner & CEO",
    bio: "Oleks brings over 15 years of experience in strategic leadership and software architecture, driving innovation across the enterprise."
  },
  { 
    name: "Serge Nekipelov", 
    title: "Founding partner & President",
    bio: "Serge has been working with globally-recognized brands for more than 20 years. He is a process-oriented digital marketing expert and UX perfectionist."
  },
  { 
    name: "Henrik Åsén", 
    title: "Partner & CIO",
    bio: "Henrik specializes in complex infrastructure and information security, ensuring our technical foundations are world-class."
  },
  { 
    name: "Christian Schaffner", 
    title: "Partner & CCO",
    bio: "Christian leads our client relations with a focus on long-term value creation and transparent communication strategies."
  },
  { 
    name: "Vitalii Aizen", 
    title: "Partner & CBDO",
    bio: "Vitalii is responsible for global business expansion and identifying high-impact partnership opportunities in emerging markets."
  },
  { 
    name: "Filipp Danylchenko", 
    title: "Head of PMO",
    bio: "Filipp ensures operational excellence across all projects, implementing agile methodologies that guarantee on-time delivery."
  },
  { 
    name: "Oleksandra Klymyk", 
    title: "HR Business Partner",
    bio: "Oleksandra focuses on building a high-performance culture and attracting top-tier talent to our growing engineering teams."
  },
  { 
    name: "Jens Wernborg", 
    title: "AI Strategist/Head of Asia",
    bio: "Jens bridges the gap between advanced AI research and practical business applications across the Asian markets."
  },
];
