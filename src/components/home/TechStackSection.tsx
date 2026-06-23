"use client";

import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Cpu, Layout, Server, Database, Sparkles } from 'lucide-react';

interface TechItem {
  name: string;
  level: string;
  description: string;
}

interface TechCategory {
  id: string;
  name: string;
  icon: ReactNode;
  items: TechItem[];
}

export default function TechStackSection() {
  const categories: TechCategory[] = [
    {
      id: 'frontend',
      name: 'Frontend Systems',
      icon: <Layout className="w-4 h-4" />,
      items: [
        { name: 'React.js', level: 'Core', description: 'Interactive web state frameworks.' },
        { name: 'Next.js', level: 'Production', description: 'Server-side pre-rendered performant pages.' },
        { name: 'Tailwind CSS', level: 'Utility', description: 'Rapid, responsive visual structures.' },
        { name: 'TypeScript', level: 'Safety', description: 'Robust, scale-ready typing structure.' }
      ]
    },
    {
      id: 'backend',
      name: 'Core Backend',
      icon: <Server className="w-4 h-4" />,
      items: [
        { name: 'Node.js & Express', level: 'Runtime', description: 'High-throughput event loop routing engines.' },
        { name: 'PHP / Laravel', level: 'Scale', description: 'Structured, reliable enterprise web APIs.' },
        { name: 'REST & GraphQL', level: 'Standard', description: 'Extensible schema data endpoints.' },
        { name: 'Python', level: 'ML Engine', description: 'AI agent reasoning logic interfaces.' }
      ]
    },
    {
      id: 'cms-commerce',
      name: 'CMS & Commerce',
      icon: <Cpu className="w-4 h-4" />,
      items: [
        { name: 'WordPress', level: 'Flexible', description: 'Semantic themes, custom Gutenberg blocks.' },
        { name: 'Shopify Space', level: 'Commerce', description: 'Dynamic Shopify Liquid setup and headless Shopify Storefront API.' },
        { name: 'Webflow', level: 'Marketing', description: 'Premium visual layouts with fully custom integrations.' },
        { name: 'WooCommerce', level: 'Transactional', description: 'Native secure electronic payment setups.' }
      ]
    },
    {
      id: 'infrastructure',
      name: 'Database & Cloud',
      icon: <Database className="w-4 h-4" />,
      items: [
        { name: 'PostgreSQL', level: 'Relational', description: 'Consistent relational ACID state.' },
        { name: 'MongoDB', level: 'Document', description: 'Flexible NoSQL document stores.' },
        { name: 'Cloudflare', level: 'Edge CDN', description: 'Global CDN, rate-limiting, edge cache.' },
        { name: 'Supabase / Firebase', level: 'Cloud', description: 'Durable persistent storage and JWT auth systems.' }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState<string>('frontend');

  const selectedCategory = categories.find(cat => cat.id === activeTab) || categories[0];

  return (
    <section id="tech-stack" className="relative py-16 bg-[#07090e] border-y border-gray-950 overflow-hidden select-none">
      {/* Background neon elements */}
      <div className="absolute right-[-100px] bottom-[15%] w-[500px] h-[350px] bg-red-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute left-[-150px] top-[15%] w-[450px] h-[350px] bg-orange-600/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header Block */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-gray-400 font-semibold tracking-[0.2em] text-[11px] uppercase block mb-3 font-display opacity-90">
            TECHNOLOGIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold font-display text-white tracking-tight leading-tight mb-4">
            Our Modern Tech Stack
          </h2>
          <p className="text-gray-400 text-sm sm:text-[15px] font-light leading-relaxed max-w-2xl">
            We employ modern, high-performance tech setups to ensure your online platform is incredibly fast, responsive, and secure.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-nowrap md:flex-wrap items-center gap-2 mb-10 w-full border-b border-white/[0.04] pb-4 md:pb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex-shrink-0 flex items-center gap-3 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border border-white/[0.04] cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-white text-black border-white shadow-xl shadow-white/5'
                  : 'bg-[#0c0e16]/40 text-gray-400 hover:border-gray-800 hover:text-white'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Stack Items Animating Panel */}
        <div className="min-h-[220px]">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {selectedCategory.items.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.12)' }}
                className="p-6 bg-[#0c0e16]/40 backdrop-blur-sm rounded-2xl border border-white/[0.03] transition-colors duration-200 flex flex-col items-start gap-3 text-left"
              >
                {/* Tech Info */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-white text-base font-bold font-display tracking-tight">
                    {tech.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-orange-500 font-semibold px-2 py-0.5 rounded bg-orange-950/20 border border-orange-500/10">
                    {tech.level}
                  </span>
                </div>

                {/* Desc */}
                <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed font-light mt-1">
                  {tech.description}
                </p>

                {/* Decorative Bullet indicator */}
                <div className="flex items-center gap-1.5 mt-auto pt-4 text-[10px] text-gray-500 font-mono">
                  <Sparkles className="w-3 h-3 text-[#ff6a00] shrink-0" />
                  <span>PRODUCTION READY</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
