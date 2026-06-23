"use client";

import { Testimonial } from './types';
import { Dna, Terminal, Target, Compass, Utensils, Globe, Layers } from 'lucide-react';

export default function Testimonials() {
  const column1: Testimonial[] = [
    {
      id: 'testimonial-1',
      quote: 'We were struggling to connect with our audience. Now, our brand speaks directly to them, and our engagement has skyrocketed. The comprehensive approach taken by the branding team ensured that every aspect of our brand was aligned with our core values. Their strategic insights and innovative ideas helped us create a brand that truly resonates with our customers.',
      name: 'Alex Martinez',
      role: 'Owner of Fresh Bites Café',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      brandName: 'Biosynthesis',
    },
    {
      id: 'testimonial-2',
      quote: 'The branding process was seamless and the results are beyond our expectations. Our new brand has significantly increased our foot traffic. The creative team really understood our vision and brought it to life in a way that we couldn’t have imagined. The attention to detail and commitment to our project made all the difference.',
      name: 'Emily Rogers',
      role: 'COO of FitNation',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      brandName: 'Acme Corp',
    },
    {
      id: 'testimonial-3',
      quote: 'SiteOnLab delivered a high-end digital identity that completely transformed our patient experience. Their absolute precision with technical SEO and website optimization instantly established our practice as local market authorities.',
      name: 'Dr. Raymond Chon',
      role: 'Founder, Apex Health Partners',
      avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&q=80',
      brandName: 'Biosynthesis',
    },
    {
      id: 'testimonial-4',
      quote: 'The Shopify development and custom design was executed flawlessly. Our conversion rate increased by 42% in the first month. They streamlined high-fidelity checkouts and made shopping a beautiful aesthetic experience.',
      name: 'Sarah Jenkins',
      role: 'Director, Lux & Carat Jewelers',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      brandName: 'Layers',
    },
    {
      id: 'testimonial-5',
      quote: 'As a competitive law firm, our search presence is everything. The programmatic SEO roadmap built by SiteOnLab doubled our incoming consultation calls and gave us unparalleled organic reach across the country.',
      name: 'Nikhil Mehta',
      role: 'Senior Partner, Mehta Associates',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      brandName: 'GlobalBank',
    },
    {
      id: 'testimonial-6',
      quote: 'They helped us scale our B2B SaaS lead pipelines with highly precise PPC management and copy assets. Outstanding ROI, complete transparency, and data-backed optimizations every single week.',
      name: 'David Thorne',
      role: 'VP Growth, Zenith System Corp',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      brandName: 'Command+R',
    },
  ];

  const column2: Testimonial[] = [
    {
      id: 'testimonial-7',
      quote: 'Our rebranding has completely revitalized our business. We’re now recognized as a leader in our industry. Their strategic research uncovered customer insights we never knew existed.',
      name: 'Jessica Lee',
      role: 'CEO of Innovate Tech',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      brandName: 'Command+R',
    },
    {
      id: 'testimonial-8',
      quote: 'The team took our vision and turned it into a powerful brand that speaks to our core values. They translated complex organic standards into a beautiful visual narrative that consumers trust immediately.',
      name: 'Mark Thompson',
      role: 'Founder of Green Earth Products',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      brandName: 'Epicurious',
    },
    {
      id: 'testimonial-9',
      quote: 'Working with this team was a game-changer. Our brand now truly reflects who we are. The collaborative spirit, professional timing, and absolute respect for our inputs was present throughout.',
      name: 'Sara Davis',
      role: 'Marketing Director at Urban Life',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      brandName: 'GlobalBank',
    },
    {
      id: 'testimonial-10',
      quote: 'Bespoke design combined with cutting edge web performance. They rebuilt our corporate landing page from scratch, lowering PageSpeed loading times under 1s and boosting conversion rates.',
      name: 'Daniel Thorne',
      role: 'CEO, Apex Systems',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      brandName: 'Command+R',
    },
    {
      id: 'testimonial-11',
      quote: 'A complete transformation of our booking experience. We launched our luxury tour products using their tailored digital assets and saw an immediate 150% boost in recurring client inquiries!',
      name: 'Aria Patel',
      role: 'Co-founder, Wanderlust Escapes',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      brandName: 'Acme Corp',
    },
    {
      id: 'testimonial-12',
      quote: 'Their creative execution is unmatched in this space. They didn\'t just design a website; they designed a holistic system that unifies our brand name, collateral, and marketing campaigns.',
      name: 'Elena Rostova',
      role: 'Lead Designer, Opal & Co.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      brandName: 'Layers',
    },
  ];

  const column3: Testimonial[] = [
    {
      id: 'testimonial-13',
      quote: 'From concept to execution, the branding journey was outstanding. Our new brand identity has set us apart from competitors. The team worked closely with us to understand our industry and target audience, ensuring that our brand not only looks great but also effectively communicates our unique value proposition. Their expertise and dedication have been instrumental in our success.',
      name: 'Michael Brooks',
      role: 'CEO of TechWave',
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
      brandName: 'FocalPoint',
    },
    {
      id: 'testimonial-14',
      quote: 'The team’s creativity and strategic approach have taken our brand to new heights. We’re more visible and relatable than ever before. They provided us with a thorough brand audit and helped us refine our messaging to better connect with our audience. The new visual identity they developed has been a hit with our customers, and we’ve seen a significant increase in brand loyalty and sales since the rebrand.',
      name: 'Linda Scott',
      role: 'Head of Product at EcoWear',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      brandName: 'Layers',
    },
    {
      id: 'testimonial-15',
      quote: 'The content program SiteOnLab authored was remarkably optimized and authoritative. It positioned our medical practices as local experts, leading to strong local search ranking growths across key medical services.',
      name: 'Sanjay Kumar',
      role: 'MD, Medicare Group',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      brandName: 'Biosynthesis',
    },
    {
      id: 'testimonial-16',
      quote: 'Outstanding ROI on our Performance Max and social search campaigns. They reduced our average cost-per-acquisition by 35% within months while delivering pristine, luxury advertising assets.',
      name: 'Marcus Thorne',
      role: 'Director, Epicurean Brands',
      avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80',
      brandName: 'Epicurious',
    },
    {
      id: 'testimonial-17',
      quote: 'An agency of extreme professionalism and transparency. Their regular reporting dashboards, data-driven design adjustments, and clear client portal updates left absolutely zero guesswork.',
      name: 'William Vance',
      role: 'VP Brand, Premier Trust Group',
      avatarUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=150&q=80',
      brandName: 'GlobalBank',
    },
    {
      id: 'testimonial-18',
      quote: 'We partner with them for all our performance marketing efforts. They have a rare capability to combine premium lifestyle design with strict programmatic performance benchmarks.',
      name: 'Clara Zhang',
      role: 'Founder, Luxe Apparel',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
      brandName: 'FocalPoint',
    },
  ];

  const getBrandLogo = (brandName: string) => {
    switch (brandName) {
      case 'Biosynthesis':
        return <Dna className="w-4 h-4 text-white shrink-0 stroke-[2.2]" />;
      case 'Command+R':
        return <Terminal className="w-4 h-4 text-white shrink-0 stroke-[2.2]" />;
      case 'FocalPoint':
        return <Target className="w-4 h-4 text-white shrink-0 stroke-[2.2]" />;
      case 'Acme Corp':
        return <Compass className="w-4 h-4 text-white shrink-0 stroke-[2.2]" />;
      case 'Epicurious':
        return <Utensils className="w-4 h-4 text-white shrink-0 stroke-[2.2]" />;
      case 'GlobalBank':
        return <Globe className="w-4 h-4 text-white shrink-0 stroke-[2.2]" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-white shrink-0 stroke-[2.2]" />;
      default:
        return null;
    }
  };

  const renderCard = (item: Testimonial, customKey?: string) => (
    <div
      key={customKey || item.id}
      className="p-6 md:p-8 bg-[#13151b]/80 hover:bg-[#161a22] rounded-[22px] border border-white/[0.04] hover:border-orange-500/25 transition-all duration-300 flex flex-col gap-6 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(249,115,22,0.06)] cursor-default"
    >
      <p className="text-gray-300 text-[13px] md:text-sm leading-relaxed font-light text-left">
        {item.quote}
      </p>

      <div className="flex items-center justify-between gap-4 mt-auto">
        {/* User profile with small rounded avatars and clean desaturated labels */}
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.avatarUrl}
            alt={item.name}
            className="w-8 h-8 rounded-full object-cover border border-zinc-800"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col text-left">
            <span className="text-white text-xs font-semibold tracking-tight font-display">
              {item.name}
            </span>
            <span className="text-gray-500 text-[10px] leading-tight font-light truncate max-w-[130px] sm:max-w-[160px]">
              {item.role}
            </span>
          </div>
        </div>

        {/* Brand visual logo display (icon + name in white sans) */}
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          {getBrandLogo(item.brandName)}
          <span className="text-white font-semibold text-xs tracking-tight font-display">
            {item.brandName}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-24 bg-[#07090e] border-y border-gray-950 overflow-hidden select-none">

      {/* Subtle blur highlights left and right to anchor focus */}
      <div className="absolute left-[-150px] top-[15%] w-[450px] h-[450px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-[-150px] bottom-[15%] w-[450px] h-[450px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Local hardware-accelerated scroll animations style block */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollUpTestimonials {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDownTestimonials {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .scrolling-column-up {
          animation: scrollUpTestimonials 55s linear infinite;
        }
        .scrolling-column-down {
          animation: scrollDownTestimonials 55s linear infinite;
        }
        /* Dual container layout fades */
        .scrolling-mask-box {
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }
      `}} />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">

        {/* Header Block matching the services standard header styling */}
        <div className="max-w-2xl text-left mb-16">
          <span className="text-gray-400 font-semibold tracking-[0.2em] text-[11px] uppercase block mb-3 font-display opacity-90">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold font-display text-white tracking-tight leading-tight mb-4">
            Trusted by Leaders <br />
            Scaling Around the Globe
          </h2>
          <p className="text-gray-400 text-sm sm:text-[15px] font-light leading-relaxed max-w-2xl">
            Don&apos;t just take our word for it. Hear from the visionaries, founders, and clinical directors who have transformed their brand authority and organic pipeline performance with SiteOnLab.
          </p>
        </div>

        {/* Scrolling Masonry Layout: 3 columns on LG, 2 on MD, 1 on Mobile */}
        <div className="relative h-[680px] overflow-hidden scrolling-mask-box">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full items-start">

            {/* Column 1 (Scroll Up) */}
            <div className="overflow-hidden h-full relative flex flex-col justify-start">
              <div className="flex flex-col gap-6 scrolling-column-up hover:[animation-play-state:paused]">
                {column1.map((item) => renderCard(item))}
                {column1.map((item) => renderCard(item, `${item.id}-dup`))}
              </div>
            </div>

            {/* Column 2 (Scroll Down) - Hidden on Mobile, active on MD and above */}
            <div className="hidden md:flex overflow-hidden h-full relative flex-col justify-start">
              <div className="flex flex-col gap-6 scrolling-column-down hover:[animation-play-state:paused]">
                {column2.map((item) => renderCard(item))}
                {column2.map((item) => renderCard(item, `${item.id}-dup`))}
              </div>
            </div>

            {/* Column 3 (Scroll Up) - Hidden on Mobile/Tablet, active on LG and above */}
            <div className="hidden lg:flex overflow-hidden h-full relative flex-col justify-start">
              <div className="flex flex-col gap-6 scrolling-column-up hover:[animation-play-state:paused]">
                {column3.map((item) => renderCard(item))}
                {column3.map((item) => renderCard(item, `${item.id}-dup`))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
