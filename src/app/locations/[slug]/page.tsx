import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";
import ServiceIcon, { type ServiceIconName } from "@/components/ui/ServiceIcon";
import { getLocationBySlug, locations } from "@/lib/locations";
import styles from "../LocationPage.module.css";

type LocationPageProps = {
  params: Promise<{ slug: string }>;
};

const serviceCards: Array<{
  title: string;
  description: string;
  icon: ServiceIconName;
  href: string;
  items: string[];
}> = [
  {
    title: "SEO Services",
    description: "Rank higher for local and national searches with technical SEO, keyword strategy, and content that compounds.",
    icon: "search",
    href: "/services/seo-service",
    items: ["Keyword research and planning", "On-page and technical SEO", "Local SEO optimization", "Link building and outreach"],
  },
  {
    title: "PPC Advertising",
    description: "Launch targeted paid campaigns that turn high-intent traffic into measurable leads, sales, and pipeline.",
    icon: "megaphone",
    href: "/services/ppc-management",
    items: ["Google Ads campaigns", "Meta ads", "Remarketing funnels", "Conversion tracking"],
  },
  {
    title: "Social Media Marketing",
    description: "Build demand with creative social strategy, content calendars, paid social, and community-led storytelling.",
    icon: "share",
    href: "/services/social-media-marketing",
    items: ["Social strategy", "Creative content and visuals", "Influencer campaigns", "Paid social campaigns"],
  },
  {
    title: "Local SEO",
    description: "Connect with nearby customers through city-specific landing pages, map visibility, and reputation growth.",
    icon: "layout",
    href: "/services/seo-service",
    items: ["Google Business Profile", "Location campaigns", "Review growth", "Local landing pages"],
  },
  {
    title: "Content Marketing",
    description: "Educate buyers and build authority with useful content shaped around search intent and conversion goals.",
    icon: "pen",
    href: "/services/content-writing",
    items: ["Blog writing", "Case studies", "Landing page copy", "Content calendars"],
  },
  {
    title: "Analytics & Reporting",
    description: "See what is working with transparent reporting, clean tracking, and insight-led optimization loops.",
    icon: "chart",
    href: "/contact",
    items: ["Monthly reports", "ROI tracking", "Competitor analysis", "Customer journey insights"],
  },
];

const whyCards: Array<{
  title: string;
  detail: string;
  metric: string;
  caption: string;
  icon: ServiceIconName;
}> = [
  {
    title: "Proven Track Record",
    detail: "Campaigns planned around commercial outcomes, not vanity metrics.",
    metric: "7-14 Days",
    caption: "Average campaign launch time",
    icon: "chart",
  },
  {
    title: "Experienced Team",
    detail: "Specialists across SEO, paid media, content, analytics, and web.",
    metric: "100+",
    caption: "Projects successfully delivered",
    icon: "spark",
  },
  {
    title: "Tailored Strategy",
    detail: "Every roadmap is built around your market, margins, audience, and funnel.",
    metric: "95%",
    caption: "Client retention rate",
    icon: "layout",
  },
  {
    title: "Transparent Process",
    detail: "Clear reporting, direct communication, and no hidden campaign guesswork.",
    metric: "50+",
    caption: "Trusted clients",
    icon: "search",
  },
  {
    title: "Client-First Approach",
    detail: "We optimize for long-term growth and strong working relationships.",
    metric: "24/7",
    caption: "Support and assistance",
    icon: "share",
  },
  {
    title: "Client Success & Trust",
    detail: "Projects are supported by practical strategy and performance review cycles.",
    metric: "5X ROI",
    caption: "Average return on ad spend",
    icon: "megaphone",
  },
];

const processSteps = [
  {
    title: "Audit & Research",
    description: "We analyze your website, competitors, search demand, audience behavior, and city-level opportunities.",
  },
  {
    title: "Strategy Development",
    description: "We create a focused marketing plan with channels, messaging, budgets, and conversion priorities.",
  },
  {
    title: "Campaign Execution",
    description: "From SEO to paid ads and content, we launch campaigns with disciplined tracking and creative testing.",
  },
  {
    title: "Tracking & Reporting",
    description: "You get clear reports, insights, and next-step recommendations based on real performance data.",
  },
];

const testimonials = [
  {
    quote:
      "We loved working with SiteOnLab on our website. They designed and developed it beautifully, making it easy to showcase our photography. The site is user-friendly, looks great on all devices, and perfectly represents our brand.",
    service: "WordPress Website",
    name: "Stephanie Coudray",
    business: "Photography Website",
  },
  {
    quote:
      "We are extremely satisfied with SiteOnLab and team for our hotel. They designed a beautiful website and helped with marketing strategies to reach our audience effectively. Highly professional and results-driven.",
    service: "Website & Marketing Solutions",
    name: "David Rodriguez",
    business: "Hotel Wing Orbit",
  },
  {
    quote:
      "I had an excellent experience working with SiteOnLab. They built a clean, professional website for our culinary studio and also managed our social media. The team understood what we wanted and helped us connect better online.",
    service: "Website & Social Media",
    name: "Jeet Bhatt",
    business: "The JeMie's culinary studio",
  },
];

function Stars() {
  return (
    <span className={styles.stars} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location not found | SiteOnLab",
    };
  }

  return {
    title: `Digital Marketing Agency in ${location.name} | SiteOnLab`,
    description: `SiteOnLab provides SEO, PPC, social media, content, and local digital marketing services in ${location.name}.`,
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) notFound();

  return (
    <main
      className={styles.main}
      style={{ "--location-accent": location.accent } as CSSProperties}
    >
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.breadcrumb}>
                <Link href="/" className={styles.crumbLink}>Home</Link>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.crumbArrow}>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
                <Link href="/locations" className={styles.crumbLink}>Locations</Link>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.crumbArrow}>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
                <span className={styles.crumbCurrent}>{location.name}</span>
              </div>
              <span className={styles.eyebrow}>Digital marketing agency in {location.name}</span>
              <h1 className={styles.title}>Growth marketing for brands in {location.name}</h1>
              <p className={styles.subtitle}>
                SiteOnLab builds {location.heroLine}. We combine SEO, PPC, social, content, and analytics into one focused system for {location.marketNote}.
              </p>
              <div className={styles.ctaRow}>
                <Link href="/contact" className={styles.primaryCta}>
                  Discuss your project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <a href="#services" className={styles.secondaryCta}>
                  Explore services
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className={styles.heroVisual} aria-label={`Digital marketing presence in ${location.name}`}>
              <Image
                src="/india.jpg"
                alt={`India map visual for SiteOnLab ${location.name} digital marketing services`}
                fill
                className={styles.heroImage}
                sizes="(max-width: 1060px) 100vw, 520px"
                priority
              />
              <div className={styles.visualOverlay} />
              <div className={styles.mapPanel}>
                <div className={styles.metricStrip}>
                  <span><strong>{location.name}</strong>{location.region}</span>
                  <span><strong>360</strong>Search, paid, social</span>
                  <span><strong>ROI</strong>Tracked from day one</span>
                </div>
                <div className={styles.pinCluster}>
                  <span className={styles.pin} />
                </div>
                <div className={styles.serviceChips}>
                  {location.industries.map((industry) => (
                    <span className={styles.serviceChip} key={industry}>{industry}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="services">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Full-service growth</span>
            <h2>Our Digital Marketing Services in {location.name}</h2>
            <p>
              We are more than a digital marketing company in {location.name}. We are your growth partner, building campaigns that improve visibility, engagement, and conversions.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {serviceCards.map((card) => (
              <article className={styles.serviceCard} key={card.title}>
                <div className={styles.iconBox}>
                  <ServiceIcon name={card.icon} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={card.href} className={styles.textLink}>
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionGlow}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Why SiteOnLab</span>
            <h2>Why Choose Our Digital Marketing Agency in {location.name}?</h2>
            <p>We combine strategy, creativity, and technology to deliver measurable results with a transparent operating rhythm.</p>
          </div>

          <div className={styles.whyGrid}>
            {whyCards.map((card) => (
              <article className={styles.whyCard} key={card.title}>
                <div className={styles.iconBox}>
                  <ServiceIcon name={card.icon} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.detail}</p>
                <strong>{card.metric}</strong>
                <span>{card.caption}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Operating system</span>
            <h2>Our Marketing Process</h2>
            <p>As a trusted digital marketing firm in {location.name}, we follow a structured process built for speed, clarity, and compounding improvements.</p>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((step, index) => (
              <article className={styles.processCard} key={step.title}>
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionGlow}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Client proof</span>
            <h2>What Our Clients Say</h2>
            <p>See how SiteOnLab helps brands shine with powerful digital solutions.</p>
            <div className={styles.reviewSummary} aria-label="5.0 rating from 200 plus reviews">
              <Stars />
              <strong>5.0</strong>
              <b>200+ Reviews</b>
            </div>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <article className={styles.testimonialCard} key={testimonial.name}>
                <div className={styles.quoteBadge} aria-hidden="true">&quot;</div>
                <Stars />
                <p>{testimonial.quote}</p>
                <h3>{testimonial.service}</h3>
                <div className={styles.testimonialDivider} />
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.business}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer showSchedule={false} />
    </main>
  );
}
