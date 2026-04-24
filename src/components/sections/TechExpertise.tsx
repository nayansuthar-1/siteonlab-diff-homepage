"use client";
import React, { useEffect } from "react";

const techExpertiseData = [
  {
    title: "Web Apps",
    desc: "Scalable, high-performance web applications built for growth.",
    themeId: "orange",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Mobile Apps",
    desc: "Intuitive iOS and Android apps that users love to use.",
    themeId: "pink",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </svg>
    ),
  },
  {
    title: "AI & ML",
    desc: "Smart solutions using machine learning and neural networks.",
    themeId: "blue",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.41c-.32.17-.69.17-1 0l-7.97-4.41c-.32-.17-.53-.5-.53-.88V7.5c0-.38.21-.71.53-.88l7.97-4.41c.32-.17.69-.17 1 0l7.97 4.41c.32.17.53.5.53.88v9z" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    desc: "Beautiful, functional designs that put users first.",
    themeId: "pink",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
  },
  {
    title: "Cloud Services",
    desc: "Reliable, scalable infrastructure for your digital products.",
    themeId: "blue",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    ),
  },
  {
    title: "Custom Software",
    desc: "Tailored solutions built to solve your unique challenges.",
    themeId: "orange",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
      </svg>
    ),
  },
  {
    title: "DevOps",
    desc: "Modern automation and monitoring for seamless delivery.",
    themeId: "blue",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
  },
  {
    title: "Ecommerce",
    desc: "Scalable online stores built with modern technologies.",
    themeId: "orange",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    title: "Cybersecurity",
    desc: "Robust protection for your data and digital assets.",
    themeId: "pink",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 15.41L7.59 13 9 11.59l2 2 4.59-4.59L17 10.41 11 16.41z" />
      </svg>
    ),
  },
];

const themes: any = {
  orange: {
    smokeGradient: "radial-gradient(ellipse at center, rgba(194,65,12,0.5) 0%, rgba(194,65,12,0.15) 60%, transparent 100%)",
    iconBg: "group-hover:bg-[#431407] group-[.is-active]:bg-[#431407]",
    iconText: "group-hover:text-[#f97316] group-[.is-active]:text-[#f97316]",
  },
  pink: {
    smokeGradient: "radial-gradient(ellipse at center, rgba(190,24,93,0.5) 0%, rgba(190,24,93,0.15) 60%, transparent 100%)",
    iconBg: "group-hover:bg-[#4d0a2d] group-[.is-active]:bg-[#4d0a2d]",
    iconText: "group-hover:text-[#ec4899] group-[.is-active]:text-[#ec4899]",
  },
  blue: {
    smokeGradient: "radial-gradient(ellipse at center, rgba(3,105,161,0.5) 0%, rgba(3,105,161,0.15) 60%, transparent 100%)",
    iconBg: "group-hover:bg-[#163a59] group-[.is-active]:bg-[#163a59]",
    iconText: "group-hover:text-[#38bdf8] group-[.is-active]:text-[#38bdf8]",
  }
};

interface TechExpertiseProps {
  title?: string;
  subtitle?: string;
}

export default function TechExpertise({
  title = "Tech Expertise",
  subtitle = "From artificial intelligence to cloud computing, we excel in modern technology and provide the expertise that growth-focused businesses require.",
}: TechExpertiseProps) {
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth > 1024) return;

    const handleScroll = () => {
      const cards = document.querySelectorAll(".tech-expertise-card");
      const viewportCenter = window.innerHeight / 2;
      
      let minDistance = Infinity;
      let closestCard: Element | null = null;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - cardCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });

      cards.forEach((card) => {
        if (card === closestCard) {
          card.classList.add("is-active");
        } else {
          card.classList.remove("is-active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full py-20 bg-black overflow-hidden" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
      <div className="relative z-10 w-full max-w-[1450px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[2rem] md:text-[2.5rem] text-white font-medium mb-3 tracking-tight">
            {title}
          </h2>
          <p className="text-[0.95rem] text-[#8e95a3] tracking-wide font-normal max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Grid Container */}
        <div className="relative w-full">
          
          {/* Grid Lines Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="hidden lg:block h-full">
              <div className="absolute top-0 left-[33.333%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              <div className="absolute top-0 left-[66.666%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              <div className="absolute top-[33.333%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="absolute top-[66.666%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            <div className="hidden md:block lg:hidden h-full">
              <div className="absolute top-0 left-[50%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ top: `${(i / 5) * 100}%` }}></div>
              ))}
            </div>
            <div className="md:hidden h-full">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ top: `${(i / 9) * 100}%` }}></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {techExpertiseData.map((item: any, idx) => {
              const theme = themes[item.themeId] || themes.pink;
              
              return (
                <div 
                  key={idx} 
                  className="relative p-10 flex flex-col transition-all duration-500 cursor-pointer group overflow-hidden tech-expertise-card"
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 group-[.is-active]:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: theme.smokeGradient }}
                  />

                  <div className="relative h-[135px] w-full z-10">
                    <div className={`absolute top-0 left-0 flex items-center justify-center rounded-full bg-[#111111] transition-all duration-500 
                      w-[64px] h-[64px] group-hover:w-[42px] group-hover:h-[42px] group-[.is-active]:w-[42px] group-[.is-active]:h-[42px] ${theme.iconBg}`}>
                      <div className={`text-white transition-colors duration-500 ${theme.iconText} 
                        [&>svg]:transition-all [&>svg]:duration-500 [&>svg]:w-[28px] [&>svg]:h-[28px] group-hover:[&>svg]:w-[18px] group-hover:[&>svg]:h-[18px] group-[.is-active]:[&>svg]:w-[18px] group-[.is-active]:[&>svg]:h-[18px]`}>
                        {item.icon}
                      </div>
                    </div>
                    
                    <div className="absolute transition-all duration-500 flex items-center gap-2
                      top-[84px] left-0 group-hover:top-[9px] group-hover:left-[56px] group-[.is-active]:top-[9px] group-[.is-active]:left-[56px]">
                      <h3 className="text-white text-[1.05rem] font-bold tracking-tight">
                        {item.title}
                      </h3>
                      <svg className="w-[18px] h-[18px] text-[#f59e0b] opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-[.is-active]:opacity-100 group-[.is-active]:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    <div className="absolute top-[110px] left-0 w-full opacity-0 translate-y-4 transition-all duration-500 group-hover:top-[60px] group-hover:opacity-100 group-hover:translate-y-0 group-[.is-active]:top-[60px] group-[.is-active]:opacity-100 group-[.is-active]:translate-y-0 pointer-events-none">
                      <p className="text-[#a1a1aa] text-[0.95rem] leading-[1.6] max-w-[280px]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
