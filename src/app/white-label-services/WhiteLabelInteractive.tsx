"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./WhiteLabel.module.css";

type Stat = {
  metric: string;
  label: string;
  icon: "team" | "code" | "star" | "globe";
};

const toolGroups = [
  {
    name: "Themes & Frameworks",
    tools: [
      { title: "Astra", logo: "astra", color: "#7c3aed" },
      { title: "Avada", logo: "avada", color: "#54b879" },
      { title: "GeneratePress", logo: "generatepress", color: "#94a3b8" },
      { title: "Kadence WP", logo: "kadence", color: "#0073e6" },
      { title: "OceanWP", logo: "oceanwp", color: "#0891b2" },
      { title: "Bricks", logo: "bricks", color: "#f97316" },
    ],
  },
  {
    name: "Page Builders",
    tools: [
      { title: "Elementor", logo: "elementor", color: "#a10050" },
      { title: "Gutenberg", logo: "gutenberg", color: "#2563eb" },
      { title: "Divi", logo: "divi", color: "#8b5cf6" },
      { title: "Beaver Builder", logo: "beaver", color: "#d97706" },
      { title: "Webflow", logo: "webflow", color: "#38bdf8" },
      { title: "Figma", logo: "figma", color: "#a855f7" },
    ],
  },
  {
    name: "Plugins & Extensions",
    tools: [
      { title: "WooCommerce", logo: "woo", color: "#8b5cf6" },
      { title: "ACF", logo: "acf", color: "#22c55e" },
      { title: "Rank Math", logo: "rankmath", color: "#ef4444" },
      { title: "WP Rocket", logo: "rocket", color: "#f97316" },
      { title: "Yoast SEO", logo: "yoast", color: "#a855f7" },
      { title: "WPForms", logo: "forms", color: "#f59e0b" },
    ],
  },
  {
    name: "Hosting Solutions",
    tools: [
      { title: "Cloudways", logo: "cloudways", color: "#0ea5e9" },
      { title: "Kinsta", logo: "kinsta", color: "#22c55e" },
      { title: "WP Engine", logo: "wpengine", color: "#64748b" },
      { title: "SiteGround", logo: "siteground", color: "#10b981" },
      { title: "DigitalOcean", logo: "digitalocean", color: "#0284c7" },
      { title: "Hostinger", logo: "hostinger", color: "#8b5cf6" },
    ],
  },
];

function splitMetric(metric: string) {
  const match = metric.match(/^([^0-9]*)([\d,]+)(.*)$/);

  if (!match) {
    return { prefix: "", value: 0, suffix: metric, fallback: metric };
  }

  return {
    prefix: match[1],
    value: Number(match[2].replace(/,/g, "")),
    suffix: match[3],
    fallback: metric,
  };
}

function formatValue(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function StatIcon({ type }: { type: Stat["icon"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg className={styles.statIcon} viewBox="0 0 24 24" aria-hidden="true">
      {type === "team" && (
        <>
          <circle cx="8" cy="9" r="3" fill="currentColor" opacity="0.9" />
          <circle cx="16" cy="9" r="3" fill="currentColor" opacity="0.9" />
          <path d="M3.5 20a5 5 0 0 1 9 0" fill="currentColor" opacity="0.9" />
          <path d="M11.5 20a5 5 0 0 1 9 0" fill="currentColor" opacity="0.9" />
          <path {...common} d="M12 2.5l.8 1.7 1.9.2-1.4 1.3.4 1.9L12 6.7l-1.7.9.4-1.9-1.4-1.3 1.9-.2.8-1.7Z" />
        </>
      )}
      {type === "code" && (
        <>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2.2" fill="currentColor" opacity="0.9" />
          <path d="M9 10l-2 2 2 2M15 10l2 2-2 2M13 9l-2 6" stroke="#050505" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {type === "star" && (
        <path fill="currentColor" d="M12 2.8l2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9L12 2.8Z" />
      )}
      {type === "globe" && (
        <>
          <circle {...common} cx="12" cy="12" r="9" />
          <path {...common} d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
          <path {...common} d="M5.6 6.2A9 9 0 0 0 18.4 6.2M5.6 17.8a9 9 0 0 1 12.8 0" />
        </>
      )}
    </svg>
  );
}

function ToolLogo({ logo }: { logo: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg className={styles.toolLogo} viewBox="0 0 32 32" aria-hidden="true">
      {logo === "astra" && <path {...common} d="M7 24 16 6l9 18M11 19h10M16 6v18" />}
      {logo === "avada" && (
        <>
          <path {...common} d="M16 5 27 25H5L16 5Z" />
          <path {...common} d="M16 12 21 22H11l5-10Z" />
          <circle cx="25" cy="10" r="2" fill="currentColor" />
          <circle cx="25" cy="17" r="2" fill="currentColor" opacity="0.65" />
        </>
      )}
      {logo === "generatepress" && (
        <>
          <circle {...common} cx="16" cy="16" r="11" />
          <path {...common} d="M21 13a6 6 0 1 0 1 6M16 16h10M21 16l3 3" />
        </>
      )}
      {logo === "kadence" && <path {...common} d="M8 6v20M24 7 12 16l12 9M14 16h10M7 10h5M7 16h5M7 22h5" />}
      {logo === "oceanwp" && (
        <>
          <path {...common} d="M5 18c3.4-5 7.4-5 11.8 0 3 3.4 6 3.4 10.2 0M5 23c3.4-4 7.4-4 11.8 0 3 3 6 3 10.2 0" />
          <circle cx="22" cy="9" r="3" fill="currentColor" opacity="0.22" />
        </>
      )}
      {logo === "bricks" && (
        <>
          <rect {...common} x="5" y="7" width="10" height="7" rx="1" />
          <rect {...common} x="17" y="7" width="10" height="7" rx="1" />
          <rect {...common} x="11" y="17" width="10" height="7" rx="1" />
        </>
      )}
      {logo === "elementor" && (
        <>
          <circle cx="16" cy="16" r="12" fill="currentColor" opacity="0.16" />
          <rect {...common} x="10" y="9" width="12" height="14" rx="2" />
          <path {...common} d="M14 13v6M18 13h2M18 16h2M18 19h2" />
        </>
      )}
      {logo === "gutenberg" && <path {...common} d="M8 6h16v20H8zM12 10h8M12 14h8M12 18h5" />}
      {logo === "divi" && <path {...common} d="M16 4 27 16 16 28 5 16 16 4ZM16 10v12M10 16h12" />}
      {logo === "beaver" && <path {...common} d="M7 11c2-4 7-5 10-2 4-1 8 2 8 7 0 6-5 10-11 10S4 22 4 16c0-2 .9-3.8 3-5ZM10 17h12M12 21h8" />}
      {logo === "webflow" && <path fill="currentColor" d="M3 11h5l2.4 8L13 11h4l-5 14H8.4L6 17.2 3.7 25H0l3-14Zm15 0h4l1 8 3-8h4l-5.4 14h-3.7l-.8-6.5-2.3 6.5H14l4-14Z" />}
      {logo === "figma" && (
        <>
          <circle cx="13" cy="8" r="4" fill="#f97316" />
          <circle cx="19" cy="8" r="4" fill="#ef4444" />
          <circle cx="13" cy="16" r="4" fill="#a855f7" />
          <circle cx="19" cy="16" r="4" fill="#3b82f6" />
          <circle cx="13" cy="24" r="4" fill="#22c55e" />
        </>
      )}
      {logo === "woo" && <path {...common} d="M5 11h22v10H5zM8 15l2 3 2-3 2 3 2-3M20 16h5" />}
      {logo === "acf" && <path {...common} d="M7 24 16 6l9 18M11 19h10M23 8l4 4-4 4" />}
      {logo === "rankmath" && <path {...common} d="M5 24V8l7 5 7-8 8 19M9 21l5-5 4 3 5-8" />}
      {logo === "rocket" && <path {...common} d="M18 4c5 1 8 4 9 9l-7 7-6-6 4-10ZM12 16l-4 1-3 7 7-3 1-4M18 4l-5 2" />}
      {logo === "yoast" && <path {...common} d="M6 16l5 5L26 7M10 7h8v8h-8z" />}
      {logo === "forms" && <path {...common} d="M8 5h16v22H8zM12 11h8M12 16h8M12 21h5" />}
      {logo === "cloudways" && <path {...common} d="M10 22h13a5 5 0 0 0 .5-10 7 7 0 0 0-13.2-2.4A6 6 0 0 0 10 22Z" />}
      {logo === "kinsta" && <path {...common} d="M8 6v20M24 7 12 16l12 9M15 16l10 10" />}
      {logo === "wpengine" && <path {...common} d="M5 8h22v16H5zM9 12h4v8H9zM16 12h7M16 16h7M16 20h4" />}
      {logo === "siteground" && <path {...common} d="M16 5c6 3 9 7 9 12a9 9 0 0 1-18 0c0-5 3-9 9-12ZM9 16h14" />}
      {logo === "digitalocean" && <path {...common} d="M16 5a11 11 0 1 1-11 11h6a5 5 0 1 0 5-5V5Z" />}
      {logo === "hostinger" && <path {...common} d="M9 5v8l14 5v9M23 5v8L9 18v9" />}
    </svg>
  );
}

export function AnimatedStats({ stats }: { stats: Stat[] }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered) return;

    let frame = 0;
    let start: number | undefined;
    const duration = 1400;

    const animate = (time: number) => {
      start ??= time;
      const elapsed = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(eased);

      if (elapsed < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hasEntered]);

  return (
    <div className={styles.statsGrid} ref={rootRef}>
      {stats.map((stat) => {
        const parsed = splitMetric(stat.metric);
        const current = parsed.value ? Math.round(parsed.value * progress) : 0;

        return (
          <article className={styles.statCard} key={stat.label}>
            <StatIcon type={stat.icon} />
            <div>
              <strong>
                {parsed.value ? `${parsed.prefix}${formatValue(current)}${parsed.suffix}` : parsed.fallback}
              </strong>
              <span>{stat.label}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ToolsExpertise() {
  const [activeGroup, setActiveGroup] = useState(toolGroups[0].name);
  const activeTools = useMemo(
    () => toolGroups.find((group) => group.name === activeGroup)?.tools ?? toolGroups[0].tools,
    [activeGroup]
  );

  return (
    <>
      <div className={styles.toolsTabs} role="tablist" aria-label="White label tool categories">
        {toolGroups.map((group) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeGroup === group.name}
            className={activeGroup === group.name ? styles.activeToolTab : ""}
            onClick={() => setActiveGroup(group.name)}
            key={group.name}
          >
            {group.name}
          </button>
        ))}
      </div>

      <div className={styles.toolsGrid}>
        {activeTools.map((tool) => (
          <article
            className={styles.toolCard}
            key={tool.title}
            style={{ "--tool-color": tool.color } as CSSProperties}
          >
            <span className={styles.toolMark}>
              <ToolLogo logo={tool.logo} />
            </span>
            <h3>{tool.title}</h3>
          </article>
        ))}
      </div>
    </>
  );
}
