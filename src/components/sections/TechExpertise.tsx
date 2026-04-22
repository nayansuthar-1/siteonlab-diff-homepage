"use client";

import React from "react";

const techExpertiseData = [
  {
    title: "Web Apps",
    desc: "Scalable, high-performance web applications built for growth.",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm3-1.5A1.5 1.5 0 004.5 6v2.25h15V6A1.5 1.5 0 0018 4.5H6z" clipRule="evenodd" />
      </svg>
    ),
    themeId: "orange",
  },
  {
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile experiences that engage users.",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M8.25 1.5A3.75 3.75 0 004.5 5.25v13.5A3.75 3.75 0 008.25 22.5h7.5A3.75 3.75 0 0019.5 18.75V5.25A3.75 3.75 0 0015.75 1.5h-7.5zm4.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
      </svg>
    ),
    themeId: "orange",
  },
  {
    title: "Desktop Apps",
    desc: "Robust desktop software for Windows, macOS, and Linux.",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z" clipRule="evenodd" />
      </svg>
    ),
    themeId: "orange",
  },
  {
    title: "AI and Machine Learning",
    desc: "Add existing AI services to your product or build custom AI solutions.",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
      </svg>
    ),
    themeId: "pink",
  },
  {
    title: "Big Data",
    desc: "Big data strategy, data processing and management, analytics.",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21c-4.97 0-9-1.567-9-3.5 0-1.529 2.508-2.836 6.012-3.327-.478.473-.762 1.135-.762 1.827v.75c0 .414.336.75.75.75h6a.75.75 0 00.75-.75v-.75c0-.692-.284-1.354-.762-1.827C18.492 14.664 21 15.971 21 17.5c0 1.933-4.03 3.5-9 3.5z" />
        <path d="M12 15c-4.97 0-9-1.567-9-3.5 0-1.529 2.508-2.836 6.012-3.327-.478.473-.762 1.135-.762 1.827v.75c0 .414.336.75.75.75h6a.75.75 0 00.75-.75v-.75c0-.692-.284-1.354-.762-1.827C18.492 8.664 21 9.971 21 11.5c0 1.933-4.03 3.5-9 3.5z" />
        <path d="M12 9c-4.97 0-9-1.567-9-3.5 0-1.933 4.03-3.5 9-3.5s9 1.567 9 3.5c0 1.933-4.03 3.5-9 3.5z" />
      </svg>
    ),
    themeId: "pink",
  },
  {
    title: "Cloud-Native",
    desc: "Modern cloud infrastructure for agility and scalability.",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M4.5 13.5A4.5 4.5 0 019 9h.165a6.75 6.75 0 1111.455 4.316A4.5 4.5 0 0113.5 21H9a4.5 4.5 0 01-4.5-4.5z" clipRule="evenodd" />
      </svg>
    ),
    themeId: "pink",
  },
  {
    title: "Blockchain Apps",
    desc: "Decentralized applications and secure blockchain solutions.",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.644 1.59a1.5 1.5 0 01.712 0l9.75 5.25a1.5 1.5 0 01.794 1.325v9.67a1.5 1.5 0 01-.794 1.325l-9.75 5.25a1.5 1.5 0 01-.712 0l-9.75-5.25A1.5 1.5 0 011.5 17.835v-9.67a1.5 1.5 0 01.794-1.325l9.75-5.25z" />
      </svg>
    ),
    themeId: "blue",
  },
  {
    title: "Integration & Migration",
    desc: "Seamless system connectivity and data transition.",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0014.56-4.024.75.75 0 00-.53-.918z" clipRule="evenodd" />
      </svg>
    ),
    themeId: "blue",
  },
  {
    title: "Refinement & Reengineering",
    desc: "Optimizing legacy systems for modern performance.",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.11.09.186.233.197.383c.023.315.023.635 0 .95c-.011.15-.087.293-.197.383l-.84.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.31.214.641.405.986.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.345-.165.676-.356.986-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.11-.09-.187-.233-.197-.383a7.485 7.485 0 000-.95c.01-.15.087-.293.197-.383l.84-.692a1.875 1.875 0 00.432-2.385l-.923-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.986-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
      </svg>
    ),
    themeId: "blue",
  },
];

export default function TechExpertise() {
  const themes: Record<string, any> = {
    orange: {
      smoke: "hover:bg-[radial-gradient(ellipse_at_center,_rgba(194,65,12,0.5)_0%,_rgba(194,65,12,0.15)_60%,_transparent_100%)]",
      iconBg: "group-hover:bg-[#4a2311]",
      iconText: "group-hover:text-[#f97316]",
    },
    pink: {
      smoke: "hover:bg-[radial-gradient(ellipse_at_center,_rgba(190,24,93,0.5)_0%,_rgba(190,24,93,0.15)_60%,_transparent_100%)]",
      iconBg: "group-hover:bg-[#4A2033]",
      iconText: "group-hover:text-[#E57399]",
    },
    blue: {
      smoke: "hover:bg-[radial-gradient(ellipse_at_center,_rgba(3,105,161,0.5)_0%,_rgba(3,105,161,0.15)_60%,_transparent_100%)]",
      iconBg: "group-hover:bg-[#163a59]",
      iconText: "group-hover:text-[#38bdf8]",
    }
  };

  return (
    <section className="relative w-full py-20 bg-black overflow-hidden" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
      <div className="relative z-10 w-full max-w-[1450px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[2rem] md:text-[2.5rem] text-white font-medium mb-3 tracking-tight">
            Tech Expertise
          </h2>
          <p className="text-[0.95rem] text-[#8e95a3] tracking-wide font-normal max-w-2xl mx-auto leading-relaxed">
            From artificial intelligence to cloud computing, we excel in modern technology and provide the expertise that growth-focused businesses require.
          </p>
        </div>

        {/* Grid Container */}
        <div className="relative w-full">
          
          {/* Fading Grid Lines - Desktop (3x3 grid) */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block z-20">
            {/* Vertical Lines */}
            <div className="absolute top-0 left-[33.333%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="absolute top-0 left-[66.666%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            {/* Horizontal Lines */}
            <div className="absolute top-[33.333%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute top-[66.666%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Fading Grid Lines - Tablet (2x5 grid) */}
          <div className="absolute inset-0 pointer-events-none hidden md:block lg:hidden z-20">
            {/* Vertical Line */}
            <div className="absolute top-0 left-[50%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            {/* Horizontal Lines */}
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ top: `${(i / 5) * 100}%` }}></div>
            ))}
          </div>

          {/* Fading Grid Lines - Mobile (1x9 grid) */}
          <div className="absolute inset-0 pointer-events-none md:hidden z-20">
            {/* Horizontal Lines */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ top: `${(i / 9) * 100}%` }}></div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {techExpertiseData.map((item: any, idx) => {
              const theme = themes[item.themeId] || themes.pink;
              
              return (
                <div 
                  key={idx} 
                  className={`
                    relative p-10 flex flex-col transition-all duration-500 cursor-pointer group overflow-hidden
                    
                    /* Hover Effects - Using a soft radial gradient from center for a smoke-like effect */
                    ${theme.smoke}
                  `}
                >
                {/* Animated Layout */}
                <div className="relative h-[135px] w-full">
                  
                  {/* Icon Circle */}
                  <div className={`absolute top-0 left-0 flex items-center justify-center rounded-full bg-[#111111] transition-all duration-500 
                    w-[64px] h-[64px] group-hover:w-[42px] group-hover:h-[42px] ${theme.iconBg}`}>
                    <div className={`text-white transition-colors duration-500 ${theme.iconText} 
                      [&>svg]:transition-all [&>svg]:duration-500 [&>svg]:w-[28px] [&>svg]:h-[28px] group-hover:[&>svg]:w-[18px] group-hover:[&>svg]:h-[18px]`}>
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Title Row */}
                  <div className="absolute transition-all duration-500 flex items-center gap-2
                    top-[84px] left-0 group-hover:top-[9px] group-hover:left-[56px]">
                    <h3 className="text-white text-[1.05rem] font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <svg className="w-[18px] h-[18px] text-[#f59e0b] opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Description - revealed on hover */}
                  <div className="absolute top-[110px] left-0 w-full opacity-0 translate-y-4 transition-all duration-500 group-hover:top-[60px] group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none">
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
