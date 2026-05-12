import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";
import ServiceIcon, { type ServiceIconName } from "@/components/ui/ServiceIcon";
import { AnimatedStats, ToolsExpertise } from "../WhiteLabelInteractive";
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
  brandIcon?: "figma" | "wordpress" | "plugin" | "woo";
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
    brandIcon: "figma",
  },
  {
    title: "WordPress Website Design",
    description:
      "Responsive WordPress builds, theme customization, content setup, and maintenance workflows for agency clients.",
    icon: "wordpress",
    brandIcon: "wordpress",
  },
  {
    title: "Landing Page & Conversion Design",
    description:
      "Campaign landing pages optimized for leads, conversions, speed, clarity, and client-specific messaging.",
    icon: "spark",
    brandIcon: "plugin",
  },
  {
    title: "Ecommerce Website Design",
    description:
      "Shopify, WooCommerce, and custom ecommerce experiences designed to improve product discovery and checkout flow.",
    icon: "cart",
    brandIcon: "woo",
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

function BrandServiceIcon({ icon }: { icon: NonNullable<Card["brandIcon"]> }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg className={styles.brandServiceIcon} viewBox="0 0 32 32" aria-hidden="true">
      {icon === "figma" && (
        <>
          <circle cx="13" cy="8" r="4" fill="#f97316" />
          <circle cx="19" cy="8" r="4" fill="#ef4444" />
          <circle cx="13" cy="16" r="4" fill="#a855f7" />
          <circle cx="19" cy="16" r="4" fill="#3b82f6" />
          <circle cx="13" cy="24" r="4" fill="#22c55e" />
        </>
      )}
      {icon === "wordpress" && (
        <>
          <circle {...common} cx="16" cy="16" r="12" />
          <path {...common} d="M8 11h4M20 11h4M10 11l4.2 12M22 11l-4.2 12M14.5 11l3 9" />
          <path {...common} d="M20.5 9.5c1.1 1.3.6 2.6-.9 4.5" />
        </>
      )}
      {icon === "plugin" && (
        <>
          <path {...common} d="M13 5h6v6h5v6h-5v6h-6v-6H8v-6h5V5Z" />
          <circle cx="16" cy="14" r="2" fill="currentColor" />
        </>
      )}
      {icon === "woo" && <path {...common} d="M4 11h24v10H4zM8 15l2 3 2-3 2 3 2-3M21 16h5" />}
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
            <AnimatedStats stats={stats} />
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
                  {card.brandIcon ? (
                    <BrandServiceIcon icon={card.brandIcon} />
                  ) : (
                    <ServiceIcon name={card.icon} />
                  )}
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

          <ToolsExpertise />
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
