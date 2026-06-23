"use client";

import { motion } from 'motion/react';
import { Search, PenTool, Code, CheckSquare, Rocket } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      id: 'step-1',
      number: '01',
      title: 'Discovery & Plan',
      description: 'We audit your existing platform, research competitor positions, and set direct performance KPIs.',
      icon: <Search className="w-5 h-5 text-orange-500" />,
      color: 'from-orange-500/20 to-transparent'
    },
    {
      id: 'step-2',
      number: '02',
      title: 'UX/UI Prototyping',
      description: 'Designing bespoke high-fidelity wireframes and responsive mockups tailored for high conversions.',
      icon: <PenTool className="w-5 h-5 text-red-500" />,
      color: 'from-red-500/20 to-transparent'
    },
    {
      id: 'step-3',
      number: '03',
      title: 'Robust Engineering',
      description: 'Writing semantic, high-performance clean code using modern frameworks and responsive architectures.',
      icon: <Code className="w-5 h-5 text-pink-500" />,
      color: 'from-pink-500/20 to-transparent'
    },
    {
      id: 'step-4',
      number: '04',
      title: 'Testing & QA',
      description: 'Performing cross-browser optimization, speed rendering analytics, and metadata SEO validation.',
      icon: <CheckSquare className="w-5 h-5 text-amber-500" />,
      color: 'from-amber-500/20 to-transparent'
    },
    {
      id: 'step-5',
      number: '05',
      title: 'Launch & Optimize',
      description: 'Deploying with real-time performance logging, search console integrations, and marketing analytics.',
      icon: <Rocket className="w-5 h-5 text-emerald-500" />,
      color: 'from-emerald-500/20 to-transparent'
    }
  ];

  return (
    <section id="process" className="relative py-16 bg-[#090b11] border-y border-gray-950 overflow-hidden select-none">
      {/* Dynamic light glows */}
      <div className="absolute right-[-200px] top-[10%] w-[600px] h-[400px] bg-gradient-to-tr from-orange-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-[-200px] bottom-[10%] w-[600px] h-[400px] bg-gradient-to-tr from-red-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header Block matching template design */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-gray-400 font-semibold tracking-[0.2em] text-[11px] uppercase block mb-3 font-display opacity-90">
            OUR STRATEGY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold font-display text-white tracking-tight leading-tight mb-4">
            How We Bring Brands to Life
          </h2>
          <p className="text-gray-400 text-sm sm:text-[15px] font-light leading-relaxed max-w-2xl">
            A meticulous, results-driven process focused on visual elegance, rigorous engineering, and scalable web growth.
          </p>
        </div>

        {/* Custom progress timeline list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(249, 115, 22, 0.15)' }}
              className="relative p-6 bg-[#0c0e16]/45 backdrop-blur-sm rounded-2xl border border-white/[0.04] transition-all duration-300 flex flex-col gap-5 text-left h-full"
            >
              {/* Outer Glow Background Fill on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-b ${step.color} opacity-[0.02] rounded-2xl pointer-events-none transition-opacity`} />

              {/* Header inside item */}
              <div className="flex items-center justify-between w-full">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="font-mono text-xs font-semibold text-gray-500 tracking-wider">
                  {step.number}
                </span>
              </div>

              {/* Content info */}
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="text-white text-base font-semibold tracking-tight font-display">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
