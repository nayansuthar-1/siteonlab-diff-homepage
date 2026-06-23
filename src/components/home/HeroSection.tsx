"use client";

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import LogoMarquee from './LogoMarquee';
import PremiumMotionBg from './PremiumMotionBg';

export default function HeroSection() {
  const badges = [
    'UPFRONT PRICING',
    '10+ YEARS OF EXPERIENCE',
    'FREE STRATEGY BRIEF',
  ];

  return (
    <section className="relative pt-28 pb-0 md:pt-36 md:pb-0 flex flex-col items-center select-none overflow-hidden bg-[#07090e]">
      {/* Premium Motion Graphics Background (Hybrid Video, Canvas & CSS spots) */}
      <PremiumMotionBg />

      <div className="w-full max-w-5xl px-6 md:px-12 flex flex-col items-center justify-center text-center relative z-10">
        {/* Dynamic Display Typography Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold font-display text-white tracking-tight leading-[1.08]"
        >
          Transform Your Brand. <br />
          Elevate Your Success.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-gray-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mt-6 font-sans"
        >
          Your brand is more than a logo. It&apos;s your story, your promise, and your unique identity. Let us help you tell it right.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#contact-form"
            className="px-8 py-3.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold rounded-full text-xs transition-all duration-300 cursor-pointer text-center font-display uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-600/15 hover:shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99] w-full sm:w-auto"
          >
            Get a Free Quote <ArrowRight className="w-4 h-4 stroke-[1.5]" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12 mb-12 md:mb-16 text-xs text-gray-400 uppercase tracking-widest font-display"
        >
          {badges.map((text, idx) => (
            <span key={idx} className="flex items-center gap-1.5 font-medium text-[10px] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="w-full relative z-10 pb-6">
        <LogoMarquee />
      </div>
    </section>
  );
}
