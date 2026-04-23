"use client";

import React, { useState } from "react";

const categoryData = [
  {
    id: "00",
    title: "Packaged Solutions",
    theme: {
      gradient: "from-[#0d9488] via-[#0d9488] to-transparent group-hover:from-[#0d9488] group-hover:via-[#0d9488]",
      bg: "bg-[#0d9488]",
      sectionBg: "bg-gradient-to-br from-[#0d9488] to-[#14b8a6]",
      shadow: "shadow-[0_0_20px_rgba(13,148,136,0.6)] group-hover:shadow-[0_0_20px_rgba(13,148,136,0.6)]",
    },
    cards: [
      {
        id: "c1",
        price: "$4,950 only",
        cardTheme: {
          bg: "bg-[#0d9488]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(13,148,136,0.35)] hover:border-[#0d9488]/30",
          iconBg: "bg-[#0d9488]/10 border-[#0d9488]/40 shadow-[0_0_15px_rgba(13,148,136,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#0d9488]/10 md:group-hover:border-[#0d9488]/40 md:group-hover:shadow-[0_0_15px_rgba(13,148,136,0.4)]",
          iconColor: "text-[#0d9488] [filter:drop-shadow(0_0_8px_rgba(13,148,136,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#0d9488] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(13,148,136,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.49 4.49 0 00-1.757 4.306 4.438 4.438 0 002.95 2.812c5.688 2.37 13.931-1.393 15.512-4.996C20.672 13.722 13 8.356 12.015 8.163z" />
          </svg>
        ),
        title: "Product Concept,\nQuick Start.",
        desc: "Get a visual design concept, validated scope and product roadmap in just 2 weeks",
      },
      {
        id: "c2",
        price: "$7,950 only",
        cardTheme: {
          bg: "bg-[#0ea5e9]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.35)] hover:border-[#0ea5e9]/30",
          iconBg: "bg-[#0ea5e9]/10 border-[#0ea5e9]/40 shadow-[0_0_15px_rgba(14,165,233,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#0ea5e9]/10 md:group-hover:border-[#0ea5e9]/40 md:group-hover:shadow-[0_0_15px_rgba(14,165,233,0.4)]",
          iconColor: "text-[#0ea5e9] [filter:drop-shadow(0_0_8px_rgba(14,165,233,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#0ea5e9] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(14,165,233,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        ),
        title: "Agentic AI Training\n& Integration",
        desc: "Integrate pre-configured AI Agents into your product or work operations",
      }
    ]
  },
  {
    id: "01",
    title: "Ideation & Concept Creation",
    theme: {
      gradient: "from-[#ec4899] via-[#ec4899] to-transparent group-hover:from-[#ec4899] group-hover:via-[#ec4899]",
      bg: "bg-[#ec4899]",
      sectionBg: "bg-gradient-to-br from-[#3b82f6] to-[#fb7185]",
      shadow: "shadow-[0_0_20px_rgba(236,72,153,0.6)] group-hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]",
    },
    cards: [
      {
        id: "c3",
        price: "Tailored quote",
        cardTheme: {
          bg: "bg-[#ec4899]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.35)] hover:border-[#ec4899]/30",
          iconBg: "bg-[#ec4899]/10 border-[#ec4899]/40 shadow-[0_0_15px_rgba(236,72,153,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#ec4899]/10 md:group-hover:border-[#ec4899]/40 md:group-hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]",
          iconColor: "text-[#ec4899] [filter:drop-shadow(0_0_8px_rgba(236,72,153,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#ec4899] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(236,72,153,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.496 1.508 1.333 1.508 2.316V18" />
          </svg>
        ),
        title: "UX/UI Design &\nPrototyping",
        desc: "Transform ideas into interactive, high-fidelity prototypes ready for real user testing and investor pitches.",
      },
      {
        id: "c4",
        price: "Discovery phase",
        cardTheme: {
          bg: "bg-[#8b5cf6]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.35)] hover:border-[#8b5cf6]/30",
          iconBg: "bg-[#8b5cf6]/10 border-[#8b5cf6]/40 shadow-[0_0_15px_rgba(139,92,246,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#8b5cf6]/10 md:group-hover:border-[#8b5cf6]/40 md:group-hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]",
          iconColor: "text-[#8b5cf6] [filter:drop-shadow(0_0_8px_rgba(139,92,246,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#8b5cf6] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(139,92,246,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        ),
        title: "Technical Discovery\n& Architecture",
        desc: "Laying down a solid, scalable technological foundation and system architecture for your product.",
      }
    ]
  },
  {
    id: "02",
    title: "Product Development",
    theme: {
      gradient: "from-[#f97316] via-[#f97316] to-transparent group-hover:from-[#f97316] group-hover:via-[#f97316]",
      bg: "bg-[#f97316]",
      sectionBg: "bg-gradient-to-br from-[#8b5cf6] to-[#ec4899]",
      shadow: "shadow-[0_0_20px_rgba(249,115,22,0.6)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]",
    },
    cards: [
      {
        id: "c5",
        price: "Time & Material",
        cardTheme: {
          bg: "bg-[#f97316]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.35)] hover:border-[#f97316]/30",
          iconBg: "bg-[#f97316]/10 border-[#f97316]/40 shadow-[0_0_15px_rgba(249,115,22,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#f97316]/10 md:group-hover:border-[#f97316]/40 md:group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]",
          iconColor: "text-[#f97316] [filter:drop-shadow(0_0_8px_rgba(249,115,22,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#f97316] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(249,115,22,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        ),
        title: "Full-Stack\nEngineering",
        desc: "End-to-end continuous delivery of high-performing, scalable, and secure software applications.",
      },
      {
        id: "c6",
        price: "Dedicated Team",
        cardTheme: {
          bg: "bg-[#0ea5e9]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.35)] hover:border-[#0ea5e9]/30",
          iconBg: "bg-[#0ea5e9]/10 border-[#0ea5e9]/40 shadow-[0_0_15px_rgba(14,165,233,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#0ea5e9]/10 md:group-hover:border-[#0ea5e9]/40 md:group-hover:shadow-[0_0_15px_rgba(14,165,233,0.4)]",
          iconColor: "text-[#0ea5e9] [filter:drop-shadow(0_0_8px_rgba(14,165,233,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#0ea5e9] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(14,165,233,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        ),
        title: "Agile Development\nSquads",
        desc: "Hire pre-vetted domain experts instantly mapping to your technical requirements.",
      }
    ]
  },
  {
    id: "03",
    title: "Scale & Grow",
    theme: {
      gradient: "from-[#5eead4] via-[#5eead4] to-transparent group-hover:from-[#5eead4] group-hover:via-[#5eead4]",
      bg: "bg-[#5eead4]",
      sectionBg: "bg-gradient-to-br from-[#5eead4] to-[#14b8a6]",
      shadow: "shadow-[0_0_20px_rgba(94,234,212,0.6)] group-hover:shadow-[0_0_20px_rgba(94,234,212,0.6)]",
    },
    cards: [
      {
        id: "c7",
        price: "Retainer",
        cardTheme: {
          bg: "bg-[#0d9488]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(13,148,136,0.35)] hover:border-[#0d9488]/30",
          iconBg: "bg-[#0d9488]/10 border-[#0d9488]/40 shadow-[0_0_15px_rgba(13,148,136,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#0d9488]/10 md:group-hover:border-[#0d9488]/40 md:group-hover:shadow-[0_0_15px_rgba(13,148,136,0.4)]",
          iconColor: "text-[#0d9488] [filter:drop-shadow(0_0_8px_rgba(13,148,136,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#0d9488] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(13,148,136,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        ),
        title: "Growth &\nOptimization",
        desc: "Constant iterative improvements optimizing conversion rates, performance, and scaling server infrastructure.",
      },
      {
        id: "c8",
        price: "Managed Services",
        cardTheme: {
          bg: "bg-[#0ea5e9]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.35)] hover:border-[#0ea5e9]/30",
          iconBg: "bg-[#0ea5e9]/10 border-[#0ea5e9]/40 shadow-[0_0_15px_rgba(14,165,233,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#0ea5e9]/10 md:group-hover:border-[#0ea5e9]/40 md:group-hover:shadow-[0_0_15px_rgba(14,165,233,0.4)]",
          iconColor: "text-[#0ea5e9] [filter:drop-shadow(0_0_8px_rgba(14,165,233,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#0ea5e9] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(14,165,233,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        ),
        title: "DevSecOps &\nMaintenance",
        desc: "24/7 security monitoring, SLA-backed continuous maintenance and infrastructure management.",
      }
    ]
  }
];

export default function WhatWeDo() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Derive the active list of cards to display based on the state
  const activeCards = categoryData[activeIdx].cards;

  return (
    <section className="relative w-full py-24 bg-black overflow-hidden" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
      
      {/* Global Background Glow Dynamic */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none opacity-[0.15] transition-colors duration-1000 ${categoryData[activeIdx].theme.sectionBg}`} />

      <div className="relative z-10 w-full max-w-[1450px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header */}
        <div className="text-center mb-20 md:mb-24">
          <h2 className="text-[2rem] md:text-[2.5rem] text-white font-medium mb-3 tracking-tight">What We Do</h2>
          <p className="text-[0.95rem] text-[#8e95a3] tracking-wide font-normal">Strong expertise. Flexible capacity. Predictable delivery.</p>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-stretch">
          
          {/* Desktop Left Column - Categories */}
          <div className="hidden lg:flex w-[35%] flex-col">
            {categoryData.map((cat, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div 
                  key={cat.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`flex-1 relative flex flex-col justify-center py-6 lg:py-0 cursor-pointer border-t transition-colors duration-300 group ${isActive ? 'border-[rgba(255,255,255,0)]' : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0)]'}`}
                >
                  {/* Local Backing Blur that matches category theme exactly */}
                  <div className={`absolute top-0 left-0 w-full h-[40px] -translate-y-1/2 blur-[30px] rounded-full pointer-events-none transition-opacity duration-300 ${cat.theme.bg} ${isActive ? 'opacity-35' : 'opacity-0 group-hover:opacity-30'}`}></div>

                  {/* Dynamic Color Filled Highlight Bar */}
                  <div className={`absolute top-[-1px] left-0 h-[1px] transition-all duration-300 ${cat.theme.bg} ${cat.theme.shadow} ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                  
                  <div className={`relative z-10 text-[11px] font-medium tracking-[0.2em] mb-2 transition-colors duration-300 ${isActive ? 'text-[#485564]' : 'text-[#303943] group-hover:text-[#485564]'}`}>
                    {cat.id}
                  </div>
                  <div className={`relative z-10 text-[1.3rem] font-normal tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#303943] group-hover:text-white'}`}>
                    {cat.title}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Category Selector */}
          <div className="flex flex-col lg:hidden w-full relative pt-8 pb-4">
            {/* Top Glow Line */}
            <div className="absolute top-0 left-[-1.5rem] right-[-1.5rem] md:left-[-3rem] md:right-[-3rem] h-[1px] bg-[rgba(255,255,255,0.06)]">
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[60%] transition-all duration-500 ${categoryData[activeIdx].theme.bg} ${categoryData[activeIdx].theme.shadow}`} />
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40px] -translate-y-1/2 blur-[30px] rounded-full pointer-events-none transition-all duration-500 opacity-40 ${categoryData[activeIdx].theme.bg}`} />
            </div>

            <div className="relative w-full h-[60px] overflow-hidden mb-6">
              {categoryData.map((cat, idx) => {
                const isActive = activeIdx === idx;
                const offset = idx - activeIdx;
                return (
                  <div 
                    key={cat.id}
                    onClick={() => setActiveIdx(idx)}
                    className="absolute top-0 w-[85%] transition-all duration-500 ease-in-out cursor-pointer"
                    style={{ left: `${offset * 85}%`, opacity: isActive ? 1 : 0.4 }}
                  >
                    <div className={`text-[11px] font-medium tracking-[0.2em] mb-2 ${isActive ? 'text-[#485564]' : 'text-[#303943]'}`}>
                      {cat.id}
                    </div>
                    <div className={`text-[1.3rem] font-normal tracking-wide whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#303943]'}`}>
                      {cat.title}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-5">
              <button 
                onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
                className={`transition-colors ${activeIdx === 0 ? 'text-[#303943] cursor-not-allowed' : 'text-[#8e95a3] hover:text-white'}`}
                disabled={activeIdx === 0}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                {categoryData.map((_, idx) => (
                  <button key={idx} onClick={() => setActiveIdx(idx)} className="p-1 flex items-center justify-center">
                    <div className={`rounded-full transition-all duration-300 ${activeIdx === idx ? 'w-[6px] h-[6px] bg-white' : 'w-[6px] h-[6px] border border-[#8e95a3] bg-transparent'}`} />
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setActiveIdx(Math.min(categoryData.length - 1, activeIdx + 1))}
                className={`transition-colors ${activeIdx === categoryData.length - 1 ? 'text-[#303943] cursor-not-allowed' : 'text-[#8e95a3] hover:text-white'}`}
                disabled={activeIdx === categoryData.length - 1}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column - Cards Display */}
          <div className="w-full lg:w-[65%] xl:flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-6 transition-all duration-500 opacity-100 animate-in fade-in zoom-in-95" key={activeIdx}>
              
              {activeCards.map((card) => {
                const cardTheme = card.cardTheme;
                return (
                <div key={card.id} className={`relative w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-[1rem] p-6 md:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 group overflow-hidden ${cardTheme.outerGlow}`}>
                  
                  {/* Dynamic Inner Glow (Cornered Sided, Bottom Center Origin) */}
                  <div className={`absolute -bottom-[80px] left-1/2 -translate-x-1/2 w-[130%] sm:w-[120%] h-[200px] blur-[80px] rounded-[100%] pointer-events-none transition-opacity duration-700 opacity-[0.85] md:opacity-0 md:group-hover:opacity-[0.85] z-0 ${cardTheme.bg}`} />

                  {/* Absolute Price Badge */}
                  <div className="hidden md:block absolute top-6 right-6 md:top-8 md:right-8 border border-[rgba(255,255,255,0.25)] rounded-full px-3 py-1 transition-colors duration-300 group-hover:border-[rgba(255,255,255,0.5)] z-10">
                    <span className="text-white text-[11px] tracking-wide">{card.price}</span>
                  </div>
                  
                  {/* Icon Wrapper */}
                  <div className={`relative z-10 w-12 h-12 border border-[rgba(255,255,255,0.12)] rounded-xl flex items-center justify-center bg-[#181818] mb-4 md:mb-5 transition-all duration-300 ${cardTheme.iconBg}`}>
                    <div className={`transition-all duration-300 text-[#8e95a3] flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 ${cardTheme.iconColor}`}>
                      {card.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="relative z-10 text-white text-[1.15rem] md:text-[1.5rem] leading-[1.3] font-normal md:font-medium mb-1 whitespace-pre-line">
                    {card.title}
                  </h3>
                  
                  {/* Description & Link row */}
                  <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mt-3 md:mt-2">
                    <p className="hidden md:block text-[#8e95a3] text-[0.85rem] leading-[1.6] max-w-[340px]">
                      {card.desc}
                    </p>
                    <a href="#" className="flex items-center gap-1.5 text-white hover:text-[#f59e0b] transition-colors group-hover:text-[#f59e0b] font-semibold text-[0.9rem] whitespace-nowrap pb-1">
                      Learn more 
                      <svg className="w-4 h-4 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
                );
              })}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
