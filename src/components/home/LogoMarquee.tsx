"use client";

import { motion } from 'motion/react';
import { Dna, Terminal, Target, Compass, Utensils, Globe, Layers, Eye } from 'lucide-react';

export default function LogoMarquee() {
  const logos = [
    { name: 'Biosynthesis', icon: <Dna className="w-4.5 h-4.5" /> },
    { name: 'Command+R', icon: <Terminal className="w-4.5 h-4.5" /> },
    { name: 'FocalPoint', icon: <Target className="w-4.5 h-4.5" /> },
    { name: 'Acme Corp', icon: <Compass className="w-4.5 h-4.5" /> },
    { name: 'Epicurious', icon: <Utensils className="w-4.5 h-4.5" /> },
    { name: 'GlobalBank', icon: <Globe className="w-4.5 h-4.5" /> },
    { name: 'Layers Space', icon: <Layers className="w-4.5 h-4.5" /> },
    { name: 'Optic Core', icon: <Eye className="w-4.5 h-4.5" /> },
  ];

  // Duplicate items twice to ensure endless cycle coverage
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-10 md:py-14 select-none relative">
      {/* Visual fading edge gradients for premium marquee overlay depth */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#07090e] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#07090e] to-transparent z-10 pointer-events-none" />

      <div className="flex w-full">
        <motion.div
          className="flex gap-16 items-center flex-nowrap"
          animate={{ x: [0, "-33.333%"] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
        >
          {duplicatedLogos.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="flex items-center gap-2.5 shrink-0 opacity-40 hover:opacity-85 transition-opacity duration-300 pointer-events-none"
            >
              <div className="text-gray-400">
                {logo.icon}
              </div>
              <span className="text-gray-200 font-semibold text-[11px] sm:text-xs tracking-[0.18em] font-display uppercase">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
