"use client";

import React, { useState, useEffect } from "react";
import DomainExpertise from "@/components/sections/DomainExpertise";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import styles from "./Services.module.css";
import ServiceIcon from "@/components/ui/ServiceIcon";
import ContactSection from "@/components/sections/ContactSection";
import { services } from "@/lib/services";

/* ─── Tech Stack Data ─── */
const categories = [
  "All",
  "Back-End",
  "Front-End",
  "iOS",
  "Android",
  "Cross-platform",
  "CMS",
  "E-Commerce",
  "Low-code",
  "Web3",
];

const techIcons: Record<string, React.ReactNode> = {
  node: <svg viewBox="0 0 256 289"><path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.795-.53 1.855-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915L129.06 19.175c-1.06-.53-2.385-.53-3.18 0L20.14 80.165c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.635 7.95 25.44-1.325 25.44-10.6V93.15c0-1.59 1.325-3.18 3.18-3.18h13.25c1.59 0 3.18 1.325 3.18 3.18v121.11c0 20.936-11.395 33.126-31.27 33.126-6.095 0-10.865 0-24.38-6.625L11.13 224.165C4.24 220.19 0 212.77 0 204.825V82.55C0 74.6 4.24 67.18 11.13 63.205L116.87 1.988c6.625-3.71 15.635-3.71 22.26 0L244.87 63.47c6.89 3.975 11.13 11.395 11.13 19.345v122.17c0 7.95-4.24 15.37-11.13 19.345L139.13 285.55c-3.445 1.855-7.42 2.915-11.13 2.915" fill="#539E43"/></svg>,
  java: <svg viewBox="0 0 256 346"><path d="M83 267s-14 8 9 11c28 3 42 2 72-3 0 0 8 5 19 9-68 29-153-2-100-17" fill="#5382A1"/><path d="M74 230s-15 11 8 14c29 3 53 3 93-4 0 0 6 5 14 8-82 24-173 2-115-18" fill="#5382A1"/><path d="M144 166c16 19-4 36-4 36s42-22 23-49c-18-25-32-38 43-81 0 0-118 30-62 94" fill="#E76F00"/><path d="M233 295s10 8-11 15c-40 12-168 16-203 0-13-5 11-13 18-14 8-2 12-2 12-2-14-10-89 19-38 27 137 22 250-10 222-26" fill="#5382A1"/><path d="M89 190s-63 15-22 20c17 2 51 2 83-1 26-2 52-7 52-7s-9 4-16 8c-63 17-186 9-151-8 30-14 54-12 54-12" fill="#5382A1"/><path d="M202 253c64-33 34-66 14-61-5 1-7 2-7 2s2-3 5-4c40-14 70 42-13 64 0 0 1-1 1-1" fill="#5382A1"/><path d="M162 0s36 36-34 91c-56 44-13 69 0 98-33-30-57-56-41-81C110 71 176 52 162 0" fill="#E76F00"/><path d="M95 345c62 4 156-2 158-32 0 0-4 11-51 20-53 10-118 9-157 2 0 0 8 7 50 10" fill="#5382A1"/></svg>,
  python: <svg viewBox="0 0 256 255"><path d="M126 2C62 2 66 29 66 29l.1 28h61v8H42S0 60 0 127s37 65 37 65h22V162s-1-37 36-37h62s35 1 35-34V33S198 2 126 2zM92 20a12 12 0 110 24 12 12 0 010-24z" fill="#387EB8"/><path d="M129 253c64 0 60-27 60-27l-.1-28h-61v-8h85s42 5 42-62-37-65-37-65h-22v30s1 37-36 37h-62s-35-1-35 34v58s-6 31 66 31zm34-18a12 12 0 110-24 12 12 0 010 24z" fill="#FFC331"/></svg>,
  php: <svg viewBox="0 0 256 134"><ellipse cx="128" cy="67" rx="128" ry="67" fill="#6181B6"/><path d="M35 95l13-65h30c14 0 22 7 20 20-3 19-17 28-33 28H53l-5 17H35zm23-30h9c10 0 16-5 17-13 1-7-3-10-12-10h-9l-5 23z" fill="#fff"/><path d="M108 37h13l-3 16h12c13 0 18 5 17 18l-4 24h-14l4-22c1-6 0-8-5-8h-10l-6 30h-13l9-58z" fill="#fff"/><path d="M155 95l13-65h30c14 0 22 7 20 20-3 19-17 28-33 28h-12l-5 17h-13zm23-30h9c10 0 16-5 17-13 1-7-3-10-12-10h-9l-5 23z" fill="#fff"/></svg>,
  react: <svg viewBox="0 0 256 228"><circle cx="128" cy="114" r="20" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="8" fill="none"><ellipse cx="128" cy="114" rx="112" ry="44"/><ellipse cx="128" cy="114" rx="112" ry="44" transform="rotate(60 128 114)"/><ellipse cx="128" cy="114" rx="112" ry="44" transform="rotate(120 128 114)"/></g></svg>,
  angular: <svg viewBox="0 0 256 272"><path d="M.1 45.5L125.9.2l129.6 44.3L235.4 218 125.9 271l-107-53.6L.1 45.5z" fill="#E23237"/><path d="M255.5 44.5L125.9.2v271l109.5-53 20.1-173.7z" fill="#B52E31"/><path d="M126 32L56 179h27l14-35h58l14 35h27L126 32zm0 48l21 52H105l21-52z" fill="#fff"/></svg>,
  vue: <svg viewBox="0 0 256 221"><path d="M204 0h52L128 221 0 0h52l76 132L204 0z" fill="#41B883"/><path d="M204 0L128 132 52 0h52l24 42L152 0h52z" fill="#34495E"/></svg>,
  nextjs: <svg viewBox="0 0 256 256"><circle cx="128" cy="128" r="128" fill="#000"/><path d="M213 212L107 76H88v104h15V98l97 125c5-3 9-7 13-11z" fill="url(#a)"/><rect x="163" y="76" width="16" height="104" fill="url(#b)"/><defs><linearGradient id="a" x1="109" y1="117" x2="186" y2="210"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient><linearGradient id="b" x1="171" y1="76" x2="171" y2="164"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs></svg>,
  swift: <svg viewBox="0 0 256 256"><linearGradient id="sw" x1="0" y1="0" x2="256" y2="256"><stop offset="0" stopColor="#F88A36"/><stop offset="1" stopColor="#FD2020"/></linearGradient><rect width="256" height="256" rx="56" fill="url(#sw)"/><path d="M169 35c37 40 30 93 30 93s-5-5-14-10C135 83 80 34 80 34c46 43 65 72 65 72S99 72 40 36c2 3 88 95 88 95S88 169 38 189c33 15 78-9 78-9s43 50 104 40c-30-12-51-37-51-37s56-5 76-77c-14 11-33 21-33 21s18-34 3-92" fill="#fff"/></svg>,
  kotlin: <svg viewBox="0 0 256 256"><defs><linearGradient id="kt1" x1="0" y1="256" x2="256" y2="0"><stop offset="0" stopColor="#E44857"/><stop offset=".47" stopColor="#C711E1"/><stop offset="1" stopColor="#7F52FF"/></linearGradient></defs><path d="M0 256L128 128 256 256H0z" fill="url(#kt1)"/><path d="M0 0h256L128 128 0 256V0z" fill="url(#kt1)"/></svg>,
  flutter: <svg viewBox="0 0 256 317"><path d="M158 0L0 158l49 49L206 49h50L158 0z" fill="#47C5FB"/><path d="M156 207l-49 49 49 50 1 11h50l-51-60 49-50h-49z" fill="#00569E"/><path d="M107 256l49-49 50 50-49 49-50-50z" fill="#00B5F8"/></svg>,
  svelte: <svg viewBox="0 0 256 308"><path d="M239 20C212-5 167-7 136 17L51 74C39 82 30 94 25 108c-4 11-4 23-2 34-7 10-12 22-13 34-2 16 2 33 12 46 27 25 72 27 103 3l85-57c12-8 21-20 26-34 4-11 4-23 2-34 7-10 12-22 13-34 2-16-2-33-12-46z" fill="#FF3E00"/><path d="M107 280c-22-6-39-23-46-44-3-11-3-22 0-32l2-7 5 3c7 5 15 8 24 11l2 1v2c0 6 3 11 7 15 3 2 6 3 10 3 2 0 3 0 5-1l85-57c4-3 7-7 8-12 1-5 0-10-3-14-3-4-8-7-13-8-3 0-5 0-7 1l-33 21c-5 3-11 5-17 6-22-6-39-23-46-44-3-11-3-22 0-32 3-14 12-26 24-33l85-57c5-3 11-5 17-6 22 6 39 23 46 44 3 11 3 22 0 32l-2 7-5-3c-7-5-15-8-24-11l-2-1v-2c0-6-3-11-7-15-3-2-6-3-10-3-2 0-3 0-5 1l-85 57c-4 3-7 7-8 12-1 5 0 10 3 14 3 4 8 7 13 8 2 0 5 0 7-1l33-21c5-3 11-5 17-6z" fill="#fff"/></svg>,
  wordpress: <svg viewBox="0 0 256 255"><circle cx="128" cy="128" r="128" fill="#21759B"/><path d="M19 128c0 42 24 78 60 96L27 87c-5 13-8 27-8 41zm181-5c0-13-5-22-9-29-5-9-10-16-10-25s4-17 10-17h1c-16-14-37-23-60-23-31 0-58 16-74 40h6c9 0 23-1 23-1-5 0-5 7-1 7 0 0-5 1-10 1l31 93 19-56-13-37c-5 0-9-1-9-1-5 0-4-7 0-7 0 0 15 1 23 1s24-1 24-1c-5 0-5 7 0 7 0 0-5 1-10 1l31 91 8-29c5-13 7-23 7-31zm-72 15l-26 75c8 2 16 3 24 3 10 0 20-2 29-5l-1-1-26-72zm73-48c0 14-3 30-10 50l-41 118c39-23 66-65 66-113 0-21-5-40-15-55z" fill="#fff"/></svg>,
  shopify: <svg viewBox="0 0 256 292"><path d="M224 57s-2-1-26-4c-20-2-20-2-20-2s-14-14-16-16c-2-1-4-1-5-1l-8 282 89-19S224 58 224 57z" fill="#95BF47"/><path d="M149 34l-7 2s-4-12-10-19c-8-10-18-15-28-15v0l-4-1c-1 0-2 0-2 0C92-5 85 3 79 14c-8 14-14 34-16 43l-29 9s-9 3-9 12L2 275l142 26 7-267c-1 0-2 0-2 0zm-22 7l-25 8c5-18 14-27 22-31 3 6 4 15 3 23zm-14-28c1 0 3 0 4 2 -10 5-21 17-26 41l-20 6c6-19 19-49 42-49zm4 100l-9 26s-8-4-18-4c-14 0-15 9-15 11 0 12 32 17 32 45 0 22-14 36-34 36-23 0-35-14-35-14l6-20s12 11 23 11c7 0 10-5 10-10 0-16-26-17-26-42 0-22 15-43 46-43 12 0 18 3 20 4z" fill="#5E8E3E"/></svg>,
  figma: <svg viewBox="0 0 256 384"><path d="M64 384c35 0 64-29 64-64v-64H64c-35 0-64 29-64 64s29 64 64 64z" fill="#0ACF83"/><path d="M0 192c0-35 29-64 64-64h64v128H64c-35 0-64-29-64-64z" fill="#A259FF"/><path d="M0 64C0 29 29 0 64 0h64v128H64C29 128 0 99 0 64z" fill="#F24E1E"/><path d="M128 0h64c35 0 64 29 64 64s-29 64-64 64h-64V0z" fill="#FF7262"/><path d="M256 192c0 35-29 64-64 64s-64-29-64-64 29-64 64-64 64 29 64 64z" fill="#1ABCFE"/></svg>,
  firebase: <svg viewBox="0 0 256 351"><path d="M0 282L2 280 97 89 58 17c-4-8-15-7-18 1L0 282z" fill="#FFC24A"/><path d="M1 282L1 281 97 89 0 282z" fill="#FFA712"/><path d="M128 117L97 89 0 282l128-165z" fill="#F4BD62"/><path d="M128 117l56 53L155 47c-4-7-14-7-17 0L128 117z" fill="#FFA50E"/><path d="M0 282l128-165 56 53-55 134-1 1-120 41-8-64z" fill="#F6820C"/><path d="M190 80l35 196-97 56-128-44 62-6 66-117L190 80z" fill="#FDE068"/><path d="M225 276L190 80l-62 85 97 111z" fill="#FCCA3F"/><path d="M0 282L155 58l35 22L128 282H0z" fill="#EEAB37"/></svg>,
  ethereum: <svg viewBox="0 0 256 417"><path d="M127 0L125 8v275l2 2 118-70L127 0z" fill="#343434"/><path d="M127 0L10 215l118 70V0z" fill="#8C8C8C"/><path d="M127 310l-1 2v96l1 3 118-167L127 310z" fill="#3C3C3B"/><path d="M127 411V310L10 244l117 167z" fill="#8C8C8C"/><path d="M127 285l118-70-118-53v123z" fill="#141414"/><path d="M10 215l118 70V162L10 215z" fill="#393939"/></svg>,
  csharp: <svg viewBox="0 0 256 288"><path d="M255 82c0-11-6-21-16-27L144 3c-10-5-22-5-32 0L16 55C6 61 0 71 0 82v109c0 11 6 21 16 27l96 52c10 5 22 5 32 0l96-52c10-6 16-16 16-27V82z" fill="#68217A"/><path d="M128 0L0 74v148l128 66 128-66V74L128 0zm-8 232c-42 0-76-34-76-76 0-43 34-77 76-77 27 0 51 14 64 36l-33 19c-7-13-19-21-33-21-24 0-42 19-42 43s18 42 42 42c14 0 26-8 33-21l33 19c-13 22-37 36-64 36z" fill="#fff" fillOpacity=".3"/><path d="M195 152v-14h-14v14h-14v14h14v14h14v-14h14v-14h-14zm38 0v-14h-14v14h-14v14h14v14h14v-14h14v-14h-14z" fill="#fff"/></svg>,
  reactnative: <svg viewBox="0 0 256 228"><circle cx="128" cy="114" r="20" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="8" fill="none"><ellipse cx="128" cy="114" rx="112" ry="44"/><ellipse cx="128" cy="114" rx="112" ry="44" transform="rotate(60 128 114)"/><ellipse cx="128" cy="114" rx="112" ry="44" transform="rotate(120 128 114)"/></g></svg>,
  kotlinmp: <svg viewBox="0 0 256 256"><defs><linearGradient id="kmp" x1="0" y1="256" x2="256" y2="0"><stop offset="0" stopColor="#E44857"/><stop offset=".47" stopColor="#C711E1"/><stop offset="1" stopColor="#7F52FF"/></linearGradient></defs><path d="M0 256L128 128 256 256H0z" fill="url(#kmp)"/><path d="M0 0h256L128 128 0 256V0z" fill="url(#kmp)"/></svg>,
  woo: <svg viewBox="0 0 256 153"><path d="M23 0h177c13 0 23 10 23 22v83c0 12-10 22-23 22h-68l14 26-42-26H23C10 127 0 117 0 105V22C0 10 10 0 23 0z" fill="#7F54B3"/><path d="M14 18c2-3 5-4 9-4 6 0 10 3 11 10l9 65 28-52c3-5 6-7 10-7 6 0 9 4 10 12 2 14 5 25 9 36 3-27 8-47 14-59 2-4 5-6 9-6 3 0 6 1 8 4s3 5 3 8c0 2-1 5-2 8-5 10-9 26-13 48-1 5-2 9-3 11-1 3-3 5-5 7-3 2-5 3-8 3-3 0-6-1-9-4L86 62l-17 32c-6 12-11 18-16 18-3 0-6-2-8-6-5-11-11-33-16-66 0-3 0-5 1-7-6 5-10-5-16-15z" fill="#fff"/></svg>,
  bubble: <svg viewBox="0 0 256 256"><circle cx="128" cy="128" r="128" fill="#0D0D0D"/><circle cx="128" cy="128" r="64" fill="none" stroke="#fff" strokeWidth="14"/><circle cx="128" cy="128" r="12" fill="#fff"/></svg>,
  framer: <svg viewBox="0 0 256 384"><path d="M0 0h256v128H128L0 0z" fill="#05F"/><path d="M0 128h128l128 128H0V128z" fill="#05F"/><path d="M0 256h128v128L0 256z" fill="#05F"/></svg>,
  webflow: <svg viewBox="0 0 256 154"><path d="M256 0v154H142s5-60 50-85C105 97 77 154 77 154L42 85S73 0 0 0h256z" fill="#4353FF"/></svg>,
};

const techStack = [
  { name: "Node.js", category: ["All", "Back-End"] },
  { name: "Java", category: ["All", "Back-End"] },
  { name: "Python", category: ["All", "Back-End"] },
  { name: "PHP", category: ["All", "Back-End"] },
  { name: "C#", category: ["All", "Back-End"] },
  { name: "React", category: ["All", "Front-End"] },
  { name: "Angular", category: ["All", "Front-End"] },
  { name: "Vue.js", category: ["All", "Front-End"] },
  { name: "Next.js", category: ["All", "Front-End"] },
  { name: "Swift", category: ["All", "iOS"] },
  { name: "Kotlin", category: ["All", "Android"] },
  { name: "React Native", category: ["All", "Cross-platform"] },
  { name: "Flutter", category: ["All", "Cross-platform"] },
  { name: "Kotlin MP", category: ["All", "Cross-platform"] },
  { name: "Svelte", category: ["All", "Front-End"] },
  { name: "WordPress", category: ["All", "CMS"] },
  { name: "WooCommerce", category: ["All", "E-Commerce"] },
  { name: "Shopify", category: ["All", "E-Commerce"] },
  { name: "Bubble", category: ["All", "Low-code"] },
  { name: "Framer", category: ["All", "Low-code"] },
  { name: "Webflow", category: ["All", "Low-code"] },
  { name: "Figma", category: ["All", "Front-End"] },
  { name: "Ethereum", category: ["All", "Web3"] },
  { name: "Firebase", category: ["All", "Back-End"] },
];

/* ─── Pricing Data ─── */
const pricingModels = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M7 15h0M2 9.5h20" />
      </svg>
    ),
    iconBg: "#f59e0b",
    title: "Fixed-Price",
    desc: "Fixed price model is perfect for small projects with clear requirements. We agree on the project scope, timeline, and budget upfront.",
    cta: "Book a consultation",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    iconBg: "#8b5cf6",
    title: "Time & Material",
    desc: "Pay only for actual hours worked. Ideal for evolving projects where scope changes are expected. Full transparency with regular progress reports.",
    cta: "Book a consultation",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    iconBg: "#ec4899",
    title: "Managed output service",
    desc: "A dedicated team works as an extension of your business. We manage delivery end-to-end with guaranteed output and SLA-backed performance.",
    cta: "Book a consultation",
  },
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedPricing, setExpandedPricing] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredTech = techStack.filter((t) =>
    t.category.includes(activeFilter)
  );

  return (
    <main className={styles.main}>
      {/* Hero: Project-specific needs */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroLeft}>
            <span className={styles.heroEyebrow}>SiteOnLab service stack</span>
            <h1 className={styles.heroTitle}>Your project-specific<br/>needs covered</h1>
            <p className={styles.heroSubtitle}>Do you have a project to deliver but struggle with tech challenges? We offer the following solutions</p>
            <Link href="/contact" className={styles.heroBtn}>
              Discuss your project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className={styles.heroRight}>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={styles.heroCard}
                style={{ "--service-accent": service.accent } as React.CSSProperties}
              >
                <div className={styles.heroCardIcon}>
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className={styles.heroCardTitle}>{service.title}</h3>
                <p className={styles.heroCardDesc}>{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.heroGlow} />
      </section>

      {/* Experience & Skills Section */}
      <section className={styles.techSection}>
        <div className={styles.techContainer}>
          <div className={styles.techHeader}>
            <h2 className={styles.techTitle}>Experience and skills you need</h2>
            <p className={styles.techSubtitle}>
              From mainstream Technology Stack to the new and trendy things – we
              cover the full range.
            </p>
          </div>

          {/* Category Filters */}
          <div className={styles.filterRow}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${
                  activeFilter === cat ? styles.filterBtnActive : ""
                }`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tech Grid */}
          <div className={styles.techGrid}>
            {filteredTech.map((tech) => {
              const mappedKey = tech.name === "C#" ? "csharp" : tech.name === "React Native" ? "reactnative" : tech.name === "Kotlin MP" ? "kotlinmp" : tech.name === "WooCommerce" ? "woo" : tech.name === "Next.js" ? "nextjs" : tech.name === "Node.js" ? "node" : tech.name === "Vue.js" ? "vue" : tech.name.toLowerCase();
              return (
                <div key={tech.name} className={styles.techItem}>
                  <div className={styles.techIconBox}>
                    {techIcons[mappedKey] || <span className={styles.techIconFallback}>{tech.name.charAt(0)}</span>}
                  </div>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Domain Expertise — reused from homepage with different title */}
      <DomainExpertise
        title="We've designed awesome products for various sectors"
        subtitle="We've teamed up with a variety of companies across different fields to craft solutions that are user-friendly and have a modern appeal"
      />

      {/* Pricing Models Section */}
      <section className={styles.pricingSection}>
        <div className={styles.pricingContainer}>
          <div className={styles.pricingLeft}>
            <h2 className={styles.pricingTitle}>Pricing models</h2>
            <p className={styles.pricingSubtitle}>
              We offer three types of contracts based on your project
              requirements
            </p>
          </div>

          <div className={styles.pricingRight}>
            {pricingModels.map((model, idx) => {
              const isExpanded = expandedPricing === idx;
              return (
                <div
                  key={idx}
                  className={`${styles.pricingItem} ${
                    isExpanded ? styles.pricingItemOpen : ""
                  }`}
                >
                  <button
                    className={styles.pricingHeader}
                    onClick={() =>
                      setExpandedPricing(isExpanded ? -1 : idx)
                    }
                  >
                    <div className={styles.pricingHeaderLeft}>
                      <div
                        className={styles.pricingIcon}
                        style={{
                          borderColor: `${model.iconBg}44`,
                          color: model.iconBg,
                        }}
                      >
                        {model.icon}
                      </div>
                      <h3 className={styles.pricingName}>{model.title}</h3>
                    </div>
                    <div
                      className={`${styles.pricingToggle} ${
                        isExpanded ? styles.pricingToggleOpen : ""
                      }`}
                    >
                      {isExpanded ? "−" : "+"}
                    </div>
                  </button>

                  <div
                    className={`${styles.pricingBody} ${
                      isExpanded ? styles.pricingBodyOpen : ""
                    }`}
                  >
                    <p className={styles.pricingDesc}>{model.desc}</p>
                    <a href="#contact" className={styles.pricingCta}>
                      <span>{model.cta}</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                      </svg>
                    </a>
                  </div>

                  <div className={styles.pricingDivider} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactSection hideLocation={true} />
      <Footer showSchedule={false} />
    </main>
  );
}
