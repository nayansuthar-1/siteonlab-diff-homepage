import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";
import ServiceIcon, { type ServiceIconName } from "@/components/ui/ServiceIcon";
import {
  getWhiteLabelServiceBySlug,
  whiteLabelServices,
} from "@/lib/white-label-services";
import styles from "../WhiteLabel.module.css";

type WhiteLabelPageProps = {
  params: Promise<{ slug: string }>;
};

type Card = {
  title: string;
  description: string;
  icon: ServiceIconName;
};

const whyCards: Card[] = [
  {
    title: "Seamless White Label Collaboration",
    description:
      "Your agency maintains full credit while our team handles strategy, design, development, QA, and launch support behind the scenes.",
    icon: "spark",
  },
  {
    title: "Skilled & Dedicated Specialists",
    description:
      "Work with experienced designers and developers who understand agency deadlines, client revisions, and quality expectations.",
    icon: "code",
  },
  {
    title: "Proven Track Record Across Industries",
    description:
      "We have delivered websites and commerce experiences for SaaS, education, healthcare, B2B, ecommerce, and service brands.",
    icon: "chart",
  },
  {
    title: "Flexible & Scalable Packages",
    description:
      "Use us for one-off tasks, full builds, or continuous delivery support as your agency pipeline grows.",
    icon: "layout",
  },
  {
    title: "SEO & Conversion Focused Delivery",
    description:
      "Every build is shaped around performance, usability, technical hygiene, search visibility, and clean conversion paths.",
    icon: "search",
  },
  {
    title: "Ongoing Support & Maintenance",
    description:
      "We provide updates, troubleshooting, optimization, and enhancement support under your agency's brand.",
    icon: "megaphone",
  },
];

const serviceCards: Card[] = [
  {
    title: "Custom Website Design",
    description:
      "Create visually polished, brand-aligned websites that match client goals and deliver a professional online presence.",
    icon: "layout",
  },
  {
    title: "WordPress Website Design",
    description:
      "Responsive WordPress builds, theme customization, content setup, and maintenance workflows for agency clients.",
    icon: "wordpress",
  },
  {
    title: "Landing Page & Conversion Design",
    description:
      "Campaign landing pages optimized for leads, conversions, speed, clarity, and client-specific messaging.",
    icon: "spark",
  },
  {
    title: "Ecommerce Website Design",
    description:
      "Shopify, WooCommerce, and custom ecommerce experiences designed to improve product discovery and checkout flow.",
    icon: "cart",
  },
];

const packages = [
  {
    price: "$20/hr",
    label: "Pay as you go",
    title: "Hourly Delivery",
    bestFor:
      "Small fixes, one-off tasks, landing page updates, QA support, and maintenance work without monthly commitments.",
    color: "#65a30d",
    icon: "spark" as const,
  },
  {
    price: "$1,999/month",
    label: "Unlimited support",
    title: "Dedicated Team Support",
    bestFor:
      "Agencies that need ongoing design and development capacity for multiple clients under one reliable workflow.",
    color: "#1677c8",
    icon: "code" as const,
  },
  {
    price: "Custom Quote",
    label: "Engagement model",
    title: "Fixed Project Based",
    bestFor:
      "Large websites, Shopify stores, WordPress systems, migrations, ecommerce builds, and custom development scopes.",
    color: "#d97706",
    icon: "layout" as const,
  },
];

const toolCards = [
  { title: "Astra", logo: "astra", color: "#7c3aed" },
  { title: "Avada", logo: "avada", color: "#54b879" },
  { title: "GeneratePress", logo: "generatepress", color: "#94a3b8" },
  { title: "Kadence WP", logo: "kadence", color: "#0073e6" },
  { title: "OceanWP", logo: "oceanwp", color: "#0891b2" },
  { title: "Elementor", logo: "elementor", color: "#a10050" },
];

const workSteps = [
  {
    title: "Share Your Requirements",
    description:
      "Tell us about your client's goals, timeline, pages, references, technical needs, and delivery expectations.",
    icon: "pen" as const,
  },
  {
    title: "We Develop & Test",
    description:
      "Our team handles design, development, integrations, QA, speed checks, responsive testing, and launch preparation.",
    icon: "code" as const,
  },
  {
    title: "You Deliver to Your Clients",
    description:
      "Once the work is complete, you present it under your brand while we remain invisible behind the scenes.",
    icon: "megaphone" as const,
  },
  {
    title: "Ongoing Support & Maintenance",
    description:
      "We stay available for updates, enhancements, troubleshooting, optimization, and long-term support.",
    icon: "chart" as const,
  },
];

const faqs = [
  {
    question: "Will my clients know SiteOnLab is involved?",
    answer:
      "No. We work as your silent delivery partner. Communication, files, and deliverables can stay fully under your agency's brand.",
  },
  {
    question: "Can I hire your team on an ongoing basis?",
    answer:
      "Yes. You can use hourly support, monthly dedicated capacity, or fixed project pricing depending on your agency pipeline.",
  },
  {
    question: "Do you sign NDAs or partnership agreements?",
    answer:
      "Yes. We can sign NDAs and white label partnership terms so confidentiality, ownership, and delivery expectations are clear.",
  },
  {
    question: "Can you work with our preferred themes, plugins, and hosting providers?",
    answer:
      "Yes. We can adapt to your preferred stack, client hosting, page builders, Shopify apps, WordPress plugins, and internal workflows.",
  },
  {
    question: "What if we need urgent changes or post-launch support?",
    answer:
      "We offer support for urgent fixes, maintenance, enhancements, speed improvements, security updates, and post-launch QA.",
  },
  {
    question: "Where are you located and what are your working hours?",
    answer:
      "SiteOnLab is based in India and supports agency partners with flexible overlap for planning, delivery updates, and project reviews.",
  },
];

function StatIcon({ type }: { type: "team" | "code" | "star" | "globe" }) {
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
          <circle {...common} cx="8" cy="8" r="3" />
          <circle {...common} cx="16" cy="8" r="3" />
          <path {...common} d="M4 20v-2a4 4 0 0 1 4-4h1" />
          <path {...common} d="M15 14h1a4 4 0 0 1 4 4v2" />
          <path {...common} d="M12 4l1 2 2 .2-1.5 1.4.4 2.1L12 8.7l-1.9 1 .4-2.1L9 6.2 11 6l1-2Z" />
        </>
      )}
      {type === "code" && (
        <>
          <rect {...common} x="4" y="5" width="16" height="14" rx="2" />
          <path {...common} d="M9 10l-2 2 2 2" />
          <path {...common} d="M15 10l2 2-2 2" />
          <path {...common} d="M13 9l-2 6" />
        </>
      )}
      {type === "star" && (
        <path {...common} d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
      )}
      {type === "globe" && (
        <>
          <circle {...common} cx="12" cy="12" r="9" />
          <path {...common} d="M3 12h18" />
          <path {...common} d="M12 3a14 14 0 0 1 0 18" />
          <path {...common} d="M12 3a14 14 0 0 0 0 18" />
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
      {logo === "astra" && (
        <>
          <circle cx="16" cy="16" r="13" fill="currentColor" opacity="0.16" />
          <path {...common} d="M8 23 16 7l8 16" />
          <path {...common} d="M12.2 18.2h7.6" />
          <path {...common} d="M16 7v16" />
        </>
      )}
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
          <path {...common} d="M21 13a6 6 0 1 0 1 6" />
          <path {...common} d="M16 16h10" />
          <path {...common} d="M21 16l3 3" />
        </>
      )}
      {logo === "kadence" && (
        <>
          <path {...common} d="M8 6v20" />
          <path {...common} d="M24 7 12 16l12 9" />
          <path {...common} d="M14 16h10" />
          <path {...common} d="M7 10h5M7 16h5M7 22h5" />
        </>
      )}
      {logo === "oceanwp" && (
        <>
          <path {...common} d="M5 18c3.4-5 7.4-5 11.8 0 3 3.4 6 3.4 10.2 0" />
          <path {...common} d="M5 23c3.4-4 7.4-4 11.8 0 3 3 6 3 10.2 0" />
          <circle cx="22" cy="9" r="3" fill="currentColor" opacity="0.22" />
        </>
      )}
      {logo === "elementor" && (
        <>
          <circle cx="16" cy="16" r="12" fill="currentColor" opacity="0.16" />
          <rect {...common} x="10" y="9" width="12" height="14" rx="2" />
          <path {...common} d="M14 13v6" />
          <path {...common} d="M18 13h2M18 16h2M18 19h2" />
        </>
      )}
    </svg>
  );
}

export function generateStaticParams() {
  return whiteLabelServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: WhiteLabelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getWhiteLabelServiceBySlug(slug);

  if (!service) {
    return {
      title: "White label service not found | SiteOnLab",
    };
  }

  return {
    title: `${service.title} | SiteOnLab`,
    description: `${service.title} for agencies that need reliable, confidential, behind-the-scenes ${service.platform} delivery.`,
  };
}

export default async function WhiteLabelDetailPage({ params }: WhiteLabelPageProps) {
  const { slug } = await params;
  const service = getWhiteLabelServiceBySlug(slug);

  if (!service) notFound();

  const stats = [
    { metric: "18+", label: "Years of experience", icon: "team" as const },
    { metric: "150+", label: "Skilled developers", icon: "code" as const },
    { metric: "2,500+", label: "Client reviews", icon: "star" as const },
    { metric: service.proofMetric, label: service.deliveryLabel, icon: "globe" as const },
  ];

  return (
    <main
      className={styles.main}
      style={{ "--wl-accent": service.accent } as CSSProperties}
    >
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroInner}>
            <div>
              <span className={styles.eyebrow}>{service.title}</span>
              <h1 className={styles.title}>{service.heroTitle}</h1>
              <p className={styles.subtitle}>{service.heroDescription}</p>
              <div className={styles.ctaRow}>
                <Link href="/contact" className={styles.primaryCta}>
                  Become a white label partner
                  <span aria-hidden="true">-&gt;</span>
                </Link>
                <a href="#packages" className={styles.secondaryCta}>
                  View packages
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </div>
            </div>

            <div className={styles.heroVisual} aria-label={`${service.title} delivery dashboard`}>
              <div className={styles.visualChrome}>
                <div className={styles.browserBar}>
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.handoffPanel}>
                  <div className={styles.handoffCard}>
                    <strong>Agency branded delivery</strong>
                    <p>{service.shortName} work moves from brief to QA while your client sees only your agency.</p>
                    <span className={styles.progressLine} />
                  </div>
                </div>
                <div className={styles.timelinePanel}>
                  <span><strong>Brief</strong>Scope and assets</span>
                  <span><strong>Build</strong>Design and QA</span>
                  <span><strong>Ship</strong>Your brand wins</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.statsWrap}>
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <article className={styles.statCard} key={stat.label}>
                  <StatIcon type={stat.icon} />
                  <div>
                    <strong>{stat.metric}</strong>
                    <span>{stat.label}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.firstSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Why SiteOnLab</span>
            <h2>Why Choose SiteOnLab for {service.title}?</h2>
            <p>
              We give agencies dependable delivery capacity, a discreet process, and premium execution across strategy, design, development, and support.
            </p>
          </div>

          <div className={styles.whyGrid}>
            {whyCards.map((card) => (
              <article className={styles.glassCard} key={card.title}>
                <div className={styles.iconBox}>
                  <ServiceIcon name={card.icon} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.glowSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>White label delivery</span>
            <h2>{service.serviceHeading}</h2>
            <p>{service.serviceIntro}</p>
          </div>

          <div className={styles.cardGrid}>
            {serviceCards.map((card) => (
              <article className={styles.serviceCard} key={card.title}>
                <div className={styles.iconBox}>
                  <ServiceIcon name={card.icon} />
                </div>
                <div className={styles.serviceRail} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>

          <Link href="/contact" className={styles.pillCta}>
            Let&apos;s partner to deliver beautiful websites
          </Link>
        </div>
      </section>

      <section className={styles.glowSection} id="packages">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Packages</span>
            <h2>{service.packageHeading}</h2>
            <p>
              Transparent, scalable options with no hidden fees, tailored to your agency&apos;s clients, delivery rhythm, and project pipeline.
            </p>
          </div>

          <div className={styles.packageGrid}>
            {packages.map((item) => (
              <article
                className={styles.packageCard}
                key={item.title}
                style={{ "--package-color": item.color } as CSSProperties}
              >
                <div className={styles.packageRibbon}>{item.price}</div>
                <div className={styles.packageIcon}>
                  <ServiceIcon name={item.icon} />
                </div>
                <strong>{item.label}</strong>
                <h3>{item.title}</h3>
                <div className={styles.packageDivider} />
                <strong>Best for</strong>
                <p>{item.bestFor}</p>
              </article>
            ))}
          </div>

          <div className={styles.packageNote}>
            No retainers, just reliable white-label expertise.
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Tools & expertise</span>
            <h2>{service.toolsHeading}</h2>
            <p>We work with major platforms, frameworks, themes, builders, plugins, apps, and hosting stacks to deliver professional websites that perform.</p>
          </div>

          <div className={styles.toolsTabs}>
            <span>Themes & Frameworks</span>
            <span>Page Builders</span>
            <span>Plugins & Extensions</span>
            <span>Hosting Solutions</span>
          </div>

          <div className={styles.toolsGrid}>
            {toolCards.map((tool) => (
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
        </div>
      </section>

      <section className={styles.glowSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Partnership workflow</span>
            <h2>How Our White Label Partnership Works</h2>
            <p>Simple handoffs, clear checkpoints, and confidential delivery keep your client experience smooth from brief to launch.</p>
          </div>

          <div className={styles.workGrid}>
            {workSteps.map((step, index) => (
              <article className={styles.workCard} key={step.title}>
                <span className={styles.workNumber}>
                  <ServiceIcon name={step.icon} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <b>{String(index + 1).padStart(2, "0")}</b>
              </article>
            ))}
          </div>

          <div className={styles.confidentialNote}>
            We value confidentiality and honor every partnership agreement, keeping every project fully under your brand name.
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <p>Answers to common questions agencies ask before starting a {service.faqSubject} partnership with SiteOnLab.</p>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details className={styles.faqItem} key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer showSchedule={false} />
    </main>
  );
}
