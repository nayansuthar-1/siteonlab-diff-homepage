"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";
import { locations } from "@/lib/locations";
import { whiteLabelServices } from "@/lib/white-label-services";

type DropdownKey = "expertise" | "locations" | "resources" | "tools";

const navItems: { label: string; key?: DropdownKey; href?: string }[] = [
  { label: "Expertise", key: "expertise" },
  { label: "Locations", key: "locations" },
  { label: "Resources", key: "resources" },
  { label: "Tools", key: "tools" },
  { label: "Company", href: "/company" },
];

const resourceLinks = [
  { title: "Blogs", href: "/blogs" },
  { title: "Case Studies", href: "/case-studies" },
  { title: "Portfolio", href: "/portfolio" },
];

const toolLinks = [{ title: "Website Audit", href: "/tools/website-audit" }];

export default function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<DropdownKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) setMobileExpanded(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const getMobileItems = (key: DropdownKey) => {
    if (key === "expertise") {
      return [
        ...services.map((s) => ({ title: s.navTitle, href: `/services/${s.slug}` })),
        ...whiteLabelServices.map((s) => ({
          title: `White Label ${s.navTitle}`,
          href: `/white-label-services/${s.slug}`,
        })),
        ...industries.map((i) => ({ title: i.navTitle, href: `/industries/${i.slug}` })),
      ];
    }
    if (key === "locations") {
      return locations.map((l) => ({ title: l.name, href: `/locations/${l.slug}` }));
    }
    if (key === "resources") return resourceLinks;
    return toolLinks;
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled || active
            ? "bg-[#07090e]/90 backdrop-blur-md border-b border-white/[0.06] shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
        onMouseLeave={() => setActive(null)}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 h-21 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="SiteOnLab home"
            onClick={() => setActive(null)}
          >
            <Image
              src="/siteon_lab-removebg-preview (1).png"
              alt="SiteOnLab"
              width={866}
              height={288}
              priority
              className="h-14 w-auto md:h-16"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-semibold tracking-[0.12em] text-gray-400 uppercase font-display">
            {navItems.map((item) =>
              item.key ? (
                <button
                  key={item.label}
                  type="button"
                  onMouseEnter={() => setActive(item.key!)}
                  onClick={() => setActive(active === item.key ? null : item.key!)}
                  className={`flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
                    active === item.key ? "text-white" : "hover:text-white"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      active === item.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  onMouseEnter={() => setActive(null)}
                  className="normal-case hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              onMouseEnter={() => setActive(null)}
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-[13px] font-semibold tracking-[0.12em] text-white uppercase font-display shadow-lg shadow-orange-900/20 hover:shadow-orange-700/30 hover:brightness-110 active:scale-[0.98] duration-300 transition-all"
            >
              Contact us
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl border border-white/[0.05] bg-[#0c101a] text-gray-400 hover:text-white hover:border-gray-800 active:scale-95 transition-all outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Dropdown Panel */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="hidden md:block absolute top-full inset-x-0 bg-[#0b0e15]/97 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/50"
            >
              <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-9">
                {active === "expertise" && (
                  <div className="grid grid-cols-3 gap-10">
                    <DropdownColumn title="Services" indexHref="/services" onNavigate={() => setActive(null)}>
                      {services.map((s) => (
                        <DropdownLink key={s.slug} href={`/services/${s.slug}`} onNavigate={() => setActive(null)}>
                          {s.navTitle}
                        </DropdownLink>
                      ))}
                    </DropdownColumn>
                    <DropdownColumn title="White Label" indexHref="/white-label-services" onNavigate={() => setActive(null)}>
                      {whiteLabelServices.map((s) => (
                        <DropdownLink key={s.slug} href={`/white-label-services/${s.slug}`} onNavigate={() => setActive(null)}>
                          {s.navTitle}
                        </DropdownLink>
                      ))}
                    </DropdownColumn>
                    <DropdownColumn title="Industries" indexHref="/industries" onNavigate={() => setActive(null)}>
                      {industries.map((i) => (
                        <DropdownLink key={i.slug} href={`/industries/${i.slug}`} onNavigate={() => setActive(null)}>
                          {i.navTitle}
                        </DropdownLink>
                      ))}
                    </DropdownColumn>
                  </div>
                )}

                {active === "locations" && (
                  <DropdownColumn title="Our Locations" indexHref="/locations" onNavigate={() => setActive(null)}>
                    <div className="grid grid-cols-3 gap-x-10 gap-y-3">
                      {locations.map((l) => (
                        <DropdownLink key={l.slug} href={`/locations/${l.slug}`} onNavigate={() => setActive(null)}>
                          {l.name}
                        </DropdownLink>
                      ))}
                    </div>
                  </DropdownColumn>
                )}

                {active === "resources" && (
                  <DropdownColumn title="Resources" onNavigate={() => setActive(null)}>
                    <div className="grid grid-cols-3 gap-6">
                      {resourceLinks.map((r) => (
                        <DropdownCard key={r.href} href={r.href} title={r.title} onNavigate={() => setActive(null)} />
                      ))}
                    </div>
                  </DropdownColumn>
                )}

                {active === "tools" && (
                  <DropdownColumn title="Free Tools" onNavigate={() => setActive(null)}>
                    <div className="grid grid-cols-3 gap-6">
                      {toolLinks.map((t) => (
                        <DropdownCard key={t.href} href={t.href} title={t.title} onNavigate={() => setActive(null)} />
                      ))}
                    </div>
                  </DropdownColumn>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-21 z-40 bg-[#07090e]/98 backdrop-blur-md overflow-y-auto"
          >
            <nav className="flex flex-col px-6 py-6">
              {navItems.map((item) =>
                item.key ? (
                  <div key={item.label} className="border-b border-white/[0.05]">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key!)}
                      className="w-full flex items-center justify-between py-4 text-sm font-semibold tracking-[0.12em] font-display uppercase text-gray-300"
                      aria-expanded={mobileExpanded === item.key}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileExpanded === item.key ? "rotate-180 text-orange-400" : "text-gray-500"
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileExpanded === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-4 pl-1">
                            {getMobileItems(item.key).map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={closeMobile}
                                className="flex items-center gap-2 py-2 text-[13px] font-medium text-gray-400 hover:text-white transition-colors"
                              >
                                <span className="w-1 h-1 rounded-full bg-orange-500/70" />
                                {sub.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={closeMobile}
                    className="py-4 text-sm font-semibold tracking-[0.12em] font-display normal-case text-gray-300 border-b border-white/[0.05]"
                  >
                    {item.label}
                  </Link>
                )
              )}

              <Link
                href="/contact"
                onClick={closeMobile}
                className="mt-7 w-full block text-center py-3.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold rounded-full text-xs uppercase tracking-[0.12em] font-display"
              >
                Contact us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DropdownColumn({
  title,
  indexHref,
  onNavigate,
  children,
}: {
  title: string;
  indexHref?: string;
  onNavigate?: () => void;
  children: React.ReactNode;
}) {
  const heading = (
    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-gray-500 font-display font-semibold mb-5">
      {title}
      {indexHref && <ArrowUpRight className="w-3 h-3 opacity-60" />}
    </span>
  );

  return (
    <div className="flex flex-col">
      {indexHref ? (
        <Link href={indexHref} onClick={onNavigate} className="hover:text-orange-400 transition-colors">
          {heading}
        </Link>
      ) : (
        heading
      )}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function DropdownLink({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="text-[13px] text-gray-400 hover:text-white transition-colors duration-200 font-medium"
    >
      {children}
    </Link>
  );
}

function DropdownCard({
  href,
  title,
  onNavigate,
}: {
  href: string;
  title: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group flex items-center justify-between px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-orange-500/30 hover:bg-white/[0.04] transition-all duration-200"
    >
      <span className="text-sm font-semibold text-white font-display">{title}</span>
      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-orange-400 transition-colors" />
    </Link>
  );
}
