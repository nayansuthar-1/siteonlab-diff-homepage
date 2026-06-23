"use client";

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function PortfolioGrid() {
  const column1 = [
    {
      id: 'p1',
      title: 'Brand Identity Design Book',
      category: 'Brand Systems',
      imageUrl: 'https://images.unsplash.com/photo-1542744095-291853b99527?auto=format&fit=crop&w=1200&q=90',
    },
    {
      id: 'p2',
      title: 'Digital Workspace Ecosystem',
      category: 'UI/UX Design',
      imageUrl: 'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?auto=format&fit=crop&w=1200&q=90',
    },
  ];

  const column2 = {
    id: 'p3',
    title: 'Aesthetic Guidelines Tablet Display',
    category: 'Brand Systems',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=90',
  };

  const column3 = [
    {
      id: 'p4',
      title: 'Interactive Design Sketching',
      category: 'Identity System',
      imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=90',
    },
    {
      id: 'p5',
      title: 'Creative Print Graphics Book',
      category: 'Editorial Systems',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=90',
    },
  ];

  const column4 = {
    id: 'p6',
    title: 'Color Spectrum Palette Board',
    category: 'Visual Identity',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=90',
  };

  const renderCard = (asset: { id: string, title: string, category: string, imageUrl: string }, isTall = false) => (
    <motion.div
      key={asset.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.7 }}
      className={`group relative rounded-[32px] overflow-hidden border border-gray-950 bg-gray-950 flex flex-col justify-end cursor-pointer ${
        isTall
          ? 'h-[360px] sm:h-full w-full'
          : 'h-[240px] sm:h-[170px] md:h-[220px] lg:h-[270px] xl:h-[310px] w-full'
      }`}
    >
      <div className="absolute inset-0 w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset.imageUrl}
          alt={asset.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] duration-700 transition-transform ease-out"
          referrerPolicy="no-referrer"
          draggable="false"
        />
        {/* Visual shade gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-95 duration-300 transition-opacity" />
      </div>

      {/* Float-up metadata panel */}
      <div className="relative p-6 md:p-8 z-10 flex flex-col translate-y-3 group-hover:translate-y-0 duration-300 transition-transform text-left">
        <span className="text-orange-500 text-[10px] font-bold tracking-[0.16em] uppercase mb-1.5 font-display">
          {asset.category}
        </span>
        <span className="text-white text-base md:text-[19px] font-bold leading-tight font-display tracking-tight">
          {asset.title}
        </span>

        <div className="flex items-center gap-1.5 text-xs text-orange-400 font-medium mt-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span>Explore project</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-orange-400 stroke-[2.5]" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative py-16 bg-[#07090e] select-none overflow-hidden">
      {/* Header aligned elegantly inside page margins */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <span className="text-gray-400 font-semibold tracking-[0.2em] text-[11px] uppercase block mb-3 font-display opacity-90">
              PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold font-display text-white tracking-tight leading-tight">
              Our Latest Showcase
            </h2>
          </div>
          <div className="flex flex-col gap-6 items-start lg:pt-4">
            <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed max-w-lg text-left">
              Explore our diverse portfolio of successful branding projects. See how we&apos;ve helped businesses transform their identities and scale their success.
            </p>
          </div>
        </div>
      </div>

      {/* Full Width Grid Layout */}
      <div className="w-full px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch w-full max-w-[1920px] mx-auto">

          {/* Column 1: Two stacked horizontal items */}
          <div className="flex flex-col gap-4 justify-between h-full">
            {column1.map(item => renderCard(item, false))}
          </div>

          {/* Column 2: Single vertical item spanning full height */}
          <div className="h-full flex">
            {renderCard(column2, true)}
          </div>

          {/* Column 3: Two stacked horizontal items */}
          <div className="flex flex-col gap-4 justify-between h-full">
            {column3.map(item => renderCard(item, false))}
          </div>

          {/* Column 4: Single vertical item spanning full height */}
          <div className="h-full flex">
            {renderCard(column4, true)}
          </div>

        </div>
      </div>
    </section>
  );
}
