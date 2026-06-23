"use client";

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { BlogPost } from './types';

export default function BlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const blogs: BlogPost[] = [
    {
      id: 'blog-1',
      title: 'The Anatomy of a $100k Rebrand: Strategy First, Aesthetics Second',
      excerpt: 'How we restructured a legacy enterprise brand from the ground up, aligning internal culture and market positioning before touching a single vector line.',
      category: 'Brand Strategy',
      date: 'Jun 08, 2026',
      readTime: '6 min read',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Alex Martinez',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      },
    },
    {
      id: 'blog-2',
      title: 'Unlocking Infinite Scale With Programmatic Search Pipelines',
      excerpt: 'Discover the technical SEO architecture behind capturing hundreds of high-intent search variations programmatically without compromising copy quality.',
      category: 'SEO Strategy',
      date: 'May 28, 2026',
      readTime: '8 min read',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Raymond Chon',
        avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&q=80',
      },
    },
    {
      id: 'blog-3',
      title: 'Conversion-Driven UI: Making Every Millisecond Count',
      excerpt: 'An deep exploration of modern frontend micro-interactions, layout physics, and Core Web Vitals optimizations designed to maximize checkout rates.',
      category: 'Engineering',
      date: 'May 15, 2026',
      readTime: '5 min read',
      imageUrl: 'https://images.unsplash.com/photo-1541462608141-2f68c48a4039?auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Sara Davis',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      },
    },
    {
      id: 'blog-4',
      title: 'The Shift Towards Immersive Luxury Digital Architectures',
      excerpt: 'Why high-end brands are abandoning typical template interfaces in favor of highly desaturated, editorial typography, and spatial layouts.',
      category: 'Design Philosophy',
      date: 'May 02, 2026',
      readTime: '7 min read',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Elena Rostova',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      },
    },
    {
      id: 'blog-5',
      title: 'PPC Beyond the Bid: Ad Copy Psychology for B2B Audiences',
      excerpt: 'How we crafted desaturated, hyper-literal copywriting structures to weed out unqualified tire-kickers and increase average target deal value.',
      category: 'Performance PPC',
      date: 'Apr 20, 2026',
      readTime: '9 min read',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'David Thorne',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      },
    },
    {
      id: 'blog-6',
      title: 'From Concept to Custom Code: The Speed Advantage of Modern CSS',
      excerpt: 'Why custom lightweight build pipelines out-convert standard design drag-and-drop systems by up to 250% on key conversion metrics.',
      category: 'Web Perf',
      date: 'Apr 09, 2026',
      readTime: '10 min read',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Nikhil Mehta',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      },
    },
  ];

  const updateScrollState = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;

      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);

      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < maxScroll - 2);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollState);
      // Run once at start
      updateScrollState();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollState);
      }
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 300;
      const gap = 24; // gap-6 is 24px
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);

      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="blog" className="relative py-24 bg-[#07090e] border-t border-white/[0.02] select-none overflow-hidden">
      {/* Background Soft Glow to fit the atmospheric feel */}
      <div className="absolute left-[30%] top-[-20%] w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute right-[5%] bottom-[-20%] w-[500px] h-[500px] bg-orange-500/[0.03] rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header Block matching the standards of other sections */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl text-left">
            <span className="text-gray-400 font-semibold tracking-[0.2em] text-[11px] uppercase block mb-3 font-display opacity-90">
              EXPLORE OUR MINDSHARE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold font-display text-white tracking-tight leading-tight mb-4">
              Latest Insights & <br />
              Industry Craftsmanship
            </h2>
            <p className="text-gray-400 text-sm sm:text-[15px] font-light leading-relaxed">
              We frequently write about product metrics, visual alignment, search strategy, and design systems for enterprise teams looking to build lasting organic engines.
            </p>
          </div>

          {/* Navigation Slider Buttons */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? 'border-white/[0.08] hover:border-orange-500/40 bg-white/[0.01] hover:bg-white/[0.03] text-white cursor-pointer hover:scale-[1.05]'
                  : 'border-white/[0.03] bg-transparent text-gray-700 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5 stroke-[1.8]" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? 'border-white/[0.08] hover:border-orange-500/40 bg-white/[0.01] hover:bg-white/[0.03] text-white cursor-pointer hover:scale-[1.05]'
                  : 'border-white/[0.03] bg-transparent text-gray-700 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* Custom Hide Scrollbar styles applied directly */}
        <style dangerouslySetInnerHTML={{ __html: `
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />

        {/* Carousel Container Slider Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory pt-2 pb-6 w-full cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {blogs.map((item) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start group"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="h-full bg-[#13151b]/80 border border-white/[0.04] rounded-3xl overflow-hidden flex flex-col justify-between hover:border-orange-500/20 hover:shadow-[0_20px_50px_rgba(249,115,22,0.04)] duration-300 transition-all">

                {/* Image & Category Overlay */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13151b] via-[#13151b]/20 to-transparent" />

                  {/* Floating Desaturated Luxury Category Badge */}
                  <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-black/60 border border-white/[0.06] backdrop-blur-md text-[9px] tracking-[0.2em] font-medium font-display text-gray-300 uppercase">
                    {item.category}
                  </span>
                </div>

                {/* Card Inner Content */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between text-left gap-6">
                  <div className="flex flex-col gap-3">
                    {/* Read Info Row */}
                    <div className="flex items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest font-semibold font-display">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 stroke-[1.8]" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 stroke-[1.8]" />
                        {item.readTime}
                      </span>
                    </div>

                    {/* Blog Title */}
                    <h3 className="text-lg md:text-xl font-bold font-display text-white tracking-tight leading-snug group-hover:text-orange-400 transition-colors duration-300">
                      {item.title}
                    </h3>

                    {/* Blog Excerpt */}
                    <p className="text-gray-400 text-[13px] leading-relaxed font-light mt-1">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Divider line and Action Info */}
                  <div className="border-t border-white/[0.04] pt-6 mt-2 flex items-center justify-between gap-4">
                    {/* Author metadata with correct custom avatar dimensions */}
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.author.avatarUrl}
                        alt={item.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-zinc-800"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs font-semibold text-gray-300 font-display">
                        {item.author.name}
                      </span>
                    </div>

                    {/* Aesthetic read arrow button containing subtle motion */}
                    <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/[0.06] group-hover:border-orange-500/40 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-orange-500/10 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Tracker Slider Bar (Custom elegant indicator) */}
        <div className="w-full max-w-xs mx-auto mt-6 h-[2px] bg-white/[0.03] rounded-full overflow-hidden relative">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full transition-all duration-200"
            style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
          />
        </div>

      </div>
    </section>
  );
}
