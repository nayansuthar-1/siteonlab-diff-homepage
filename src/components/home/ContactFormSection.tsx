"use client";

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronDown, ArrowRight } from 'lucide-react';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'Advertising Services',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Advertising Services',
    'Branding Service',
    'Content Writing',
    'E-Commerce Development',
    'PPC Management',
    'SEO Service',
    'Shopify Development',
    'Social Media Marketing',
    'Website Design',
    'Website Development',
    'WordPress Development'
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;

    setIsSubmitting(true);

    // Simulate safe API submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact-form" className="relative py-20 bg-[#07090e] border-y border-white/[0.02] overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute right-[-200px] bottom-[10%] w-[600px] h-[400px] bg-gradient-to-tr from-orange-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-[-200px] top-[10%] w-[600px] h-[400px] bg-gradient-to-tr from-red-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Context / Intro COPY */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center h-full">
            <span className="text-orange-500 font-semibold tracking-[0.2em] text-[11px] uppercase block mb-3 font-display">
              LET&apos;S COLLABORATE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-tight mb-6">
              Ready to Accelerate Growth?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-md">
              Our specialists develop custom roadmap plans tailored for brand scale. Fill out the form as shown to lock in a dedicated strategy consultation in under <strong>48 hours</strong> — completely obligation free.
            </p>

            {/* Quick value props matching left side of referential mockups */}
            <div className="flex flex-col gap-5 border-t border-white/[0.04] pt-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 text-xs">✓</div>
                <span className="text-white text-sm font-medium tracking-wide">Data-driven performance campaigns</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 text-xs">✓</div>
                <span className="text-white text-sm font-medium tracking-wide">Bespoke UI design & brand asset creation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Precise High-Fidelity Form Card matching current website dark theme */}
          <div className="lg:col-span-7 w-full max-w-xl mx-auto">
            <motion.div
              layout
              className="relative bg-[#0c0f17] rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(249,115,22,0.12)] border border-white/[0.06] text-white"
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="consultation-form-card"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5"
                  >
                    {/* Header fields inside form card */}
                    <div className="text-center mb-2">
                      <h4 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                        Get Your FREE Quote
                      </h4>
                      <p className="text-xs text-gray-400 font-sans mt-1">
                        Start your project today – no obligation
                      </p>
                    </div>

                    {/* Name Inputs - Side-by-side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider font-display">First Name</label>
                        <input
                          type="text"
                          required
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 placeholder-gray-500 transition-all font-sans"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider font-display">Last Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 placeholder-gray-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider font-display">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 placeholder-gray-500 transition-all font-sans"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider font-display">Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 placeholder-gray-500 transition-all font-sans"
                      />
                    </div>

                    {/* Select Service Dropdown */}
                    <div className="flex flex-col gap-1.5 text-left relative">
                      <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider font-display">Select Service</label>
                      <div className="relative">
                        <select
                          value={formData.service}
                          onChange={e => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-[#0c0f17] text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 appearance-none transition-all font-sans cursor-pointer pr-10"
                        >
                          {services.map(svc => (
                            <option key={svc} value={svc} className="text-white bg-[#0a0d14] font-sans">
                              {svc}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Project Details Textarea */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider font-display">Project Details</label>
                      <textarea
                        placeholder="Tell us about your project, timeline, budget range, and any specific requirements..."
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none font-sans placeholder-gray-500"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-3 py-4 px-8 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold rounded-full text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 font-sans shadow-lg shadow-orange-600/15 hover:shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Get a Free Quote <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                        </>
                      )}
                    </button>

                    {/* Footer bottom check lines */}
                    <div className="text-gray-500 text-[10px] font-semibold tracking-wider mt-2 text-center uppercase font-display flex justify-center items-center gap-1.5">
                      <span>✓ 24–48 hour response</span>
                      <span className="text-gray-700">•</span>
                      <span>✓ No spam, ever</span>
                      <span className="text-gray-700">•</span>
                      <span>✓ Local experts</span>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-form-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10 gap-6 text-white"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 animate-bounce">
                      <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                        Thank You, {formData.firstName}!
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                        Your strategic brief has been received. Our agency experts will review your request and get back to you at <strong className="text-orange-400">{formData.email}</strong> within 24 hours.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ firstName: '', lastName: '', email: '', phone: '', service: 'Advertising Services', message: '' });
                      }}
                      className="px-5 py-2.5 rounded-xl border border-white/[0.11] bg-white/[0.01] hover:border-orange-500 text-xs text-gray-400 hover:text-white font-semibold uppercase tracking-wider duration-300 transition-all cursor-pointer font-sans"
                    >
                      SUBMIT ANOTHER BRIEF
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
