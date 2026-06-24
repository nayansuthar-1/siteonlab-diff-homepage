"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { whiteLabelServices } from "@/lib/white-label-services";

const serviceOptions = [
  ...services.map((s) => s.navTitle),
  ...whiteLabelServices.map((s) => `White Label ${s.navTitle}`),
];

export default function BookGrowthCall() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    service: "",
    referral: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.website || !formData.service) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/growth-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-[#07090e] px-4 sm:px-6 md:px-12 py-16 md:py-24">
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-[28px] md:rounded-[36px] bg-[#2b34f0]">
        {/* Lighter lower band, like the reference */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#4b56ff]/40 pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 p-7 sm:p-10 md:p-12 lg:p-14">
          {/* Left column: heading + intro */}
          <div className="flex flex-col">
            <h2 className="text-white font-extrabold font-display tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl">
              Book A Growth Call
            </h2>

            <div className="mt-auto pt-10 md:pt-14">
              <div className="flex items-center gap-4">
                <span className="shrink-0 w-14 h-14 rounded-full bg-white/15 ring-1 ring-white/25 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/siteon_lab-removebg-preview (1).png"
                    alt="SiteOnLab"
                    width={120}
                    height={40}
                    className="w-9 h-auto"
                  />
                </span>
                <h3 className="text-white font-bold font-display text-xl sm:text-2xl tracking-tight">
                  Hi, we&apos;re the SiteOnLab team.
                </h3>
              </div>
              <p className="mt-5 max-w-md text-white/85 text-sm sm:text-base leading-relaxed font-light">
                Ready to grow your digital agency with a world-class white label
                team? Schedule a call today. We&apos;ll talk through your needs and
                create a plan that fits your budget, then show you next steps on
                how to move forward.
              </p>
            </div>
          </div>

          {/* Right column: white form card */}
          <div className="w-full">
            <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.25)] p-6 sm:p-8 max-h-none lg:max-h-[560px] lg:overflow-y-auto">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="growth-call-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5 text-[#0c1024]"
                  >
                    {/* First / Last name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#0c1024]">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#0c1024] placeholder-gray-400 focus:outline-none focus:border-[#2b34f0] focus:ring-2 focus:ring-[#2b34f0]/15 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#0c1024]">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#0c1024] placeholder-gray-400 focus:outline-none focus:border-[#2b34f0] focus:ring-2 focus:ring-[#2b34f0]/15 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#0c1024]">
                        Email Address <span className="text-[#2b34f0]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="Your work email (e.g., you@youragency.com)"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-sm text-[#0c1024] placeholder-gray-400 focus:outline-none focus:border-[#2b34f0] focus:ring-2 focus:ring-[#2b34f0]/15 transition-all"
                        />
                      </div>
                    </div>

                    {/* Website */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#0c1024]">
                        Website <span className="text-[#2b34f0]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="youragencywebsite.com"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#0c1024] placeholder-gray-400 focus:outline-none focus:border-[#2b34f0] focus:ring-2 focus:ring-[#2b34f0]/15 transition-all"
                      />
                    </div>

                    {/* Service */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#0c1024]">
                        What core service are you interested in?{" "}
                        <span className="text-[#2b34f0]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({ ...formData, service: e.target.value })
                          }
                          className={`w-full px-4 py-3 rounded-lg border border-gray-300 text-sm appearance-none bg-white focus:outline-none focus:border-[#2b34f0] focus:ring-2 focus:ring-[#2b34f0]/15 transition-all cursor-pointer pr-10 ${
                            formData.service ? "text-[#0c1024]" : "text-gray-400"
                          }`}
                        >
                          <option value="" disabled>
                            Pick one for now, you can add more later
                          </option>
                          {serviceOptions.map((svc) => (
                            <option key={svc} value={svc} className="text-[#0c1024]">
                              {svc}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Referral */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#0c1024]">
                        How did you hear about us?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Referral, Google, social media, a colleague…"
                        value={formData.referral}
                        onChange={(e) =>
                          setFormData({ ...formData, referral: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm text-[#0c1024] placeholder-gray-400 focus:outline-none focus:border-[#2b34f0] focus:ring-2 focus:ring-[#2b34f0]/15 transition-all resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600 font-medium -mt-1">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-1 w-full py-3.5 px-6 rounded-full bg-[#2b34f0] hover:bg-[#222bd6] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Book My Growth Call <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="growth-call-success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-5 text-[#0c1024]"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-bold font-display tracking-tight">
                        You&apos;re all set{formData.firstName ? `, ${formData.firstName}` : ""}!
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                        We&apos;ve received your request and will reach out at{" "}
                        <strong className="text-[#2b34f0]">{formData.email}</strong>{" "}
                        within 24 hours to schedule your growth call.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setError("");
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          website: "",
                          service: "",
                          referral: "",
                        });
                      }}
                      className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-600 hover:border-[#2b34f0] hover:text-[#2b34f0] transition-all"
                    >
                      Submit another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
