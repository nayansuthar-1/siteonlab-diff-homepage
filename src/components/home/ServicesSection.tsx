"use client";

import { motion } from 'motion/react';

export default function ServicesSection() {
  const row1 = [
    { id: '1', name: 'Brand Strategy Development' },
    { id: '2', name: 'Logo Design and Visual Identity' },
    { id: '3', name: 'Brand Messaging and Positioning' },
  ];

  const row2 = [
    { id: '4', name: 'Market Research and Analysis' },
    { id: '5', name: 'Website Design and Development', isHighlighted: true },
    { id: '6', name: 'Website Design and Development' },
    { id: '7', name: 'Social Media Branding' },
  ];

  const row3 = [
    { id: '8', name: 'Packaging Design' },
    { id: '9', name: 'Print and Digital Marketing Materials' },
    { id: '10', name: 'Brand Audit and Refresh' }
  ];

  const renderBadge = (svc: { id: string, name: string, isHighlighted?: boolean }, idx: number) => {
    if (svc.isHighlighted) {
      return (
        <motion.div
          key={`${svc.id}-${idx}`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="flex-shrink-0 px-5 py-3 rounded-2xl text-white font-medium text-[13px] tracking-wide bg-gradient-to-r from-red-600/35 via-orange-600/40 to-red-600/35 border border-orange-500/30 shadow-lg shadow-orange-950/20 backdrop-blur-md cursor-pointer text-center whitespace-nowrap"
        >
          {svc.name}
        </motion.div>
      );
    }

    return (
      <motion.div
        key={`${svc.id}-${idx}`}
        whileHover={{ scale: 1.04, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
        whileTap={{ scale: 0.98 }}
        className="flex-shrink-0 px-5 py-3 rounded-2xl text-gray-300 font-medium text-[13px] tracking-wide bg-[#0c0e16]/65 border border-white/[0.04] backdrop-blur-sm transition-all duration-200 cursor-pointer text-center whitespace-nowrap"
      >
        {svc.name}
      </motion.div>
    );
  };

  return (
    <section className="relative py-16 bg-[#07090e] border-y border-gray-950 select-none overflow-hidden">
      {/* Background ambient red/orange diagonal nebulous fire stream crossing through center */}
      <div className="absolute inset-x-[-10%] top-[40%] h-[180px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent rotate-[-15deg] blur-[100px] pointer-events-none z-0" />
      <div className="absolute inset-x-[-10%] top-[41%] h-[12px] bg-gradient-to-r from-transparent via-brand-orange/30 to-brand-red/10 rotate-[-15deg] blur-[24px] pointer-events-none z-0" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center relative z-10">

        {/* Overheading indicator */}
        <span className="text-gray-400 font-semibold tracking-[0.2em] text-[11px] uppercase block mb-3 font-display opacity-90">
          SERVICES
        </span>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold font-display text-white tracking-tight leading-tight mb-4">
          Our Branding Services
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-[15px] font-light leading-relaxed max-w-2xl mb-10">
          Comprehensive solutions to create, enhance, and maintain your brand&rsquo;s identity.
        </p>

        {/* Styles for continuous infinite marquee scrolling with hover/active interactive pause */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes mobile-marquee-rtl {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes mobile-marquee-ltr {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          .animate-marquee-rtl {
            animation: mobile-marquee-rtl 28s linear infinite;
          }
          .animate-marquee-ltr {
            animation: mobile-marquee-ltr 28s linear infinite;
          }
          .animate-marquee-rtl:hover,
          .animate-marquee-rtl:active,
          .animate-marquee-ltr:hover,
          .animate-marquee-ltr:active {
            animation-play-state: paused;
          }
        `}} />

        {/* Desktop & Tablet */}
        <div className="hidden md:flex flex-col gap-4 items-center w-full max-w-5xl">
          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {row1.map((svc, idx) => renderBadge(svc, idx))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {row2.map((svc, idx) => renderBadge(svc, idx))}
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {row3.map((svc, idx) => renderBadge(svc, idx))}
          </div>
        </div>

        {/* Mobile: 3 Separate alternating infinite auto-scrolling rows */}
        <div className="flex md:hidden flex-col gap-5 w-screen max-w-full overflow-hidden relative px-4">
          {/* Subtle fade scrims on the edges for premium blending */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#07090e] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#07090e] to-transparent z-20 pointer-events-none" />

          {/* Row 1: Right to Left */}
          <div className="w-full overflow-hidden py-1">
            <div className="flex gap-4 w-max animate-marquee-rtl">
              {[...row1, ...row1, ...row1, ...row1].map((svc, idx) => (
                <div key={`m-r1-${svc.id}-${idx}`}>
                  {renderBadge(svc, idx)}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Left to Right */}
          <div className="w-full overflow-hidden py-1">
            <div className="flex gap-4 w-max animate-marquee-ltr">
              {[...row2, ...row2, ...row2, ...row2].map((svc, idx) => (
                <div key={`m-r2-${svc.id}-${idx}`}>
                  {renderBadge(svc, idx)}
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Right to Left */}
          <div className="w-full overflow-hidden py-1">
            <div className="flex gap-4 w-max animate-marquee-rtl">
              {[...row3, ...row3, ...row3, ...row3].map((svc, idx) => (
                <div key={`m-r3-${svc.id}-${idx}`}>
                  {renderBadge(svc, idx)}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
