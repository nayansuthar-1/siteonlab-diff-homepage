"use client";

import { motion } from 'motion/react';
import { ValueItem } from './types';

export default function ValuesSection() {
  const values: ValueItem[] = [
    {
      id: 'recognition',
      title: 'Increased Brand Recognition',
      description: 'Stand out in a crowded market with a memorable brand.',
      bulletColor: 'bg-red-500 shadow-red-500/50',
    },
    {
      id: 'loyalty',
      title: 'Enhanced Customer Loyalty',
      description: 'Build trust and loyalty with a brand that resonates with you.',
      bulletColor: 'bg-cyan-400 shadow-cyan-400/50',
    },
    {
      id: 'advantage',
      title: 'Competitive Advantage',
      description: 'Gain a strategic edge with consistent brand message.',
      bulletColor: 'bg-amber-400 shadow-amber-400/50',
    },
    {
      id: 'growth',
      title: 'Business Growth',
      description: 'Drive sales and growth with a brand that attracts customers.',
      bulletColor: 'bg-emerald-400 shadow-emerald-400/50',
    },
  ];

  return (
    <section className="relative py-16 bg-[#090b11] border-y border-gray-900 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-12">
          {values.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex items-start gap-4"
            >
              {/* Colored Bullet Dot with Pulse Shadow */}
              <div className="pt-2 flex-shrink-0">
                <div className={`w-2.5 h-2.5 rounded-full ${item.bulletColor} shadow-[0_0_10px_2px_currentColor] animate-pulse`} />
              </div>

              {/* Text Layout */}
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-lg font-medium tracking-tight font-display">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
