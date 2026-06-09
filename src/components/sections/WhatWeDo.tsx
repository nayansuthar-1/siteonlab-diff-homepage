"use client";

import React, { useState } from "react";

const categoryData = [
  {
    id: "00",
    title: "Performance",
    theme: {
      gradient: "from-[#0d9488] via-[#0d9488] to-transparent group-hover:from-[#0d9488] group-hover:via-[#0d9488]",
      bg: "bg-[#0d9488]",
      sectionBg: "bg-gradient-to-br from-[#0d9488] to-[#14b8a6]",
      shadow: "shadow-[0_0_20px_rgba(13,148,136,0.6)] group-hover:shadow-[0_0_20px_rgba(13,148,136,0.6)]",
    },
    cards: [
      {
        id: "c1",
        price: "7–14 Days",
        cardTheme: {
          bg: "bg-[#0d9488]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(13,148,136,0.35)] hover:border-[#0d9488]/30",
          iconBg: "bg-[#0d9488]/10 border-[#0d9488]/40 shadow-[0_0_15px_rgba(13,148,136,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#0d9488]/10 md:group-hover:border-[#0d9488]/40 md:group-hover:shadow-[0_0_15px_rgba(13,148,136,0.4)]",
          iconColor: "text-[#0d9488] [filter:drop-shadow(0_0_8px_rgba(13,148,136,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#0d9488] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(13,148,136,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
          </svg>
        ),
        title: "Result-Oriented\nStrategies",
        desc: "We focus on campaigns that drive measurable results and ROI, with an average campaign launch time of just 7–14 days.",
      },
      {
        id: "c2",
        price: "50+",
        cardTheme: {
          bg: "bg-[#0ea5e9]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.35)] hover:border-[#0ea5e9]/30",
          iconBg: "bg-[#0ea5e9]/10 border-[#0ea5e9]/40 shadow-[0_0_15px_rgba(14,165,233,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#0ea5e9]/10 md:group-hover:border-[#0ea5e9]/40 md:group-hover:shadow-[0_0_15px_rgba(14,165,233,0.4)]",
          iconColor: "text-[#0ea5e9] [filter:drop-shadow(0_0_8px_rgba(14,165,233,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#0ea5e9] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(14,165,233,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
          </svg>
        ),
        title: "Transparent\nReporting",
        desc: "Regular updates, analytics, and actionable insights — trusted by 50+ clients who always know where they stand.",
      }
    ]
  },
  {
    id: "01",
    title: "Expertise",
    theme: {
      gradient: "from-[#ec4899] via-[#ec4899] to-transparent group-hover:from-[#ec4899] group-hover:via-[#ec4899]",
      bg: "bg-[#ec4899]",
      sectionBg: "bg-gradient-to-br from-[#3b82f6] to-[#fb7185]",
      shadow: "shadow-[0_0_20px_rgba(236,72,153,0.6)] group-hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]",
    },
    cards: [
      {
        id: "c3",
        price: "100+",
        cardTheme: {
          bg: "bg-[#ec4899]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.35)] hover:border-[#ec4899]/30",
          iconBg: "bg-[#ec4899]/10 border-[#ec4899]/40 shadow-[0_0_15px_rgba(236,72,153,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#ec4899]/10 md:group-hover:border-[#ec4899]/40 md:group-hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]",
          iconColor: "text-[#ec4899] [filter:drop-shadow(0_0_8px_rgba(236,72,153,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#ec4899] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(236,72,153,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        ),
        title: "Experienced\nTeam",
        desc: "Certified experts in SEO, PPC, Web Design, Website Development, and Social Media — with 100+ projects successfully delivered.",
      },
      {
        id: "c4",
        price: "24/7",
        cardTheme: {
          bg: "bg-[#8b5cf6]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.35)] hover:border-[#8b5cf6]/30",
          iconBg: "bg-[#8b5cf6]/10 border-[#8b5cf6]/40 shadow-[0_0_15px_rgba(139,92,246,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#8b5cf6]/10 md:group-hover:border-[#8b5cf6]/40 md:group-hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]",
          iconColor: "text-[#8b5cf6] [filter:drop-shadow(0_0_8px_rgba(139,92,246,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#8b5cf6] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(139,92,246,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
        ),
        title: "Full-Service\nAgency",
        desc: "SEO, PPC, Web Design, Development, and Social Media under one roof, with 24/7 support and assistance.",
      }
    ]
  },
  {
    id: "02",
    title: "Partnership",
    theme: {
      gradient: "from-[#f97316] via-[#f97316] to-transparent group-hover:from-[#f97316] group-hover:via-[#f97316]",
      bg: "bg-[#f97316]",
      sectionBg: "bg-gradient-to-br from-[#8b5cf6] to-[#ec4899]",
      shadow: "shadow-[0_0_20px_rgba(249,115,22,0.6)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]",
    },
    cards: [
      {
        id: "c5",
        price: "95%",
        cardTheme: {
          bg: "bg-[#f97316]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.35)] hover:border-[#f97316]/30",
          iconBg: "bg-[#f97316]/10 border-[#f97316]/40 shadow-[0_0_15px_rgba(249,115,22,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#f97316]/10 md:group-hover:border-[#f97316]/40 md:group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]",
          iconColor: "text-[#f97316] [filter:drop-shadow(0_0_8px_rgba(249,115,22,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#f97316] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(249,115,22,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        title: "Customized\nSolutions",
        desc: "Tailored strategies for startups, SMBs, and enterprises, backed by a 95% client retention rate.",
      },
      {
        id: "c6",
        price: "5X ROI",
        cardTheme: {
          bg: "bg-[#0ea5e9]",
          outerGlow: "hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.35)] hover:border-[#0ea5e9]/30",
          iconBg: "bg-[#0ea5e9]/10 border-[#0ea5e9]/40 shadow-[0_0_15px_rgba(14,165,233,0.4)] md:bg-[#181818] md:border-[rgba(255,255,255,0.12)] md:shadow-none md:group-hover:bg-[#0ea5e9]/10 md:group-hover:border-[#0ea5e9]/40 md:group-hover:shadow-[0_0_15px_rgba(14,165,233,0.4)]",
          iconColor: "text-[#0ea5e9] [filter:drop-shadow(0_0_8px_rgba(14,165,233,0.6))] md:text-[#8e95a3] md:[filter:none] md:group-hover:text-[#0ea5e9] md:group-[&:hover]:[filter:drop-shadow(0_0_8px_rgba(14,165,233,0.6))]",
        },
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.496 1.508 1.333 1.508 2.316V18" />
          </svg>
        ),
        title: "Client Success\n& Trust",
        desc: "Trusted by 50+ businesses, delivering an average 5X return on ad spend that keeps clients growing with us.",
      }
    ]
  }
];

export default function WhatWeDo() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Derive the active list of cards to display based on the state
  const activeCards = categoryData[activeIdx].cards;

  return (
    <section className="relative w-full py-16 bg-black overflow-hidden" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
      
      {/* Global Background Glow Dynamic */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none opacity-[0.15] transition-colors duration-1000 ${categoryData[activeIdx].theme.sectionBg}`} />

      {/* Edge fades — smooth the glow into the surrounding black */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-[5]" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-[5]" />

      <div className="relative z-10 w-full max-w-[1450px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[2rem] md:text-[2.5rem] text-white font-medium mb-3 tracking-tight">Why Choose SiteOnLab</h2>
          <p className="text-[0.95rem] text-[#8e95a3] tracking-wide font-normal">We go beyond rankings – we focus on driving traffic, leads, and business growth.</p>
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
          <div className="w-full lg:w-[65%] xl:flex-1 flex flex-col gap-5">
            <div className="flex flex-col gap-5 transition-all duration-500 opacity-100 animate-in fade-in zoom-in-95" key={activeIdx}>
              
              {activeCards.map((card) => {
                const cardTheme = card.cardTheme;
                return (
                <div key={card.id} className={`relative w-full bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-[1rem] p-5 md:p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 group overflow-hidden ${cardTheme.outerGlow}`}>
                  
                  {/* Dynamic Inner Glow (Cornered Sided, Bottom Center Origin) */}
                  <div className={`absolute -bottom-[80px] left-1/2 -translate-x-1/2 w-[130%] sm:w-[120%] h-[200px] blur-[80px] rounded-[100%] pointer-events-none transition-opacity duration-700 opacity-[0.85] md:opacity-0 md:group-hover:opacity-[0.85] z-0 ${cardTheme.bg}`} />

                  {/* Absolute Price Badge */}
                  <div className="hidden md:block absolute top-5 right-5 md:top-6 md:right-6 border border-[rgba(255,255,255,0.25)] rounded-full px-3 py-1 transition-colors duration-300 group-hover:border-[rgba(255,255,255,0.5)] z-10">
                    <span className="text-white text-[11px] tracking-wide">{card.price}</span>
                  </div>
                  
                  {/* Icon + Title row */}
                  <div className="relative z-10 flex items-center gap-4 mb-1">
                    {/* Icon Wrapper */}
                    <div className={`shrink-0 w-12 h-12 border border-[rgba(255,255,255,0.12)] rounded-xl flex items-center justify-center bg-[#181818] transition-all duration-300 ${cardTheme.iconBg}`}>
                      <div className={`transition-all duration-300 text-[#8e95a3] flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 ${cardTheme.iconColor}`}>
                        {card.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-white text-[1.15rem] md:text-[1.5rem] leading-[1.3] font-normal md:font-medium whitespace-pre-line">
                      {card.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <div className="relative z-10 mt-3 md:mt-2">
                    <p className="hidden md:block text-[#8e95a3] text-[0.85rem] leading-[1.6] max-w-[340px]">
                      {card.desc}
                    </p>
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
