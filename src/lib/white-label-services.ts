import type { ServiceIconName } from "@/components/ui/ServiceIcon";

export type WhiteLabelService = {
  slug: string;
  title: string;
  navTitle: string;
  shortName: string;
  accent: string;
  icon: ServiceIconName;
  platform: string;
  heroTitle: string;
  heroDescription: string;
  proofMetric: string;
  deliveryLabel: string;
  serviceHeading: string;
  serviceIntro: string;
  packageHeading: string;
  toolsHeading: string;
  faqSubject: string;
};

export const whiteLabelServices: WhiteLabelService[] = [
  {
    slug: "white-label-website-design",
    title: "White Label Website Design",
    navTitle: "Website Design",
    shortName: "Web Design",
    accent: "#10b981",
    icon: "layout",
    platform: "custom website design",
    heroTitle: "White label website design your agency can sell with confidence",
    heroDescription:
      "SiteOnLab works quietly behind your agency to design conversion-focused websites, landing pages, and client-ready digital experiences under your brand.",
    proofMetric: "1,000+",
    deliveryLabel: "Sites delivered",
    serviceHeading: "White Label Web Design Services",
    serviceIntro:
      "From custom UI systems to landing pages and ecommerce layouts, our design team helps your agency deliver polished websites without increasing internal headcount.",
    packageHeading: "Flexible White Label Website Design Packages",
    toolsHeading: "Our White Label Web Design Tools & Expertise",
    faqSubject: "white label web design",
  },
  {
    slug: "white-label-shopify-development",
    title: "White Label Shopify Development",
    navTitle: "Shopify Development",
    shortName: "Shopify",
    accent: "#22c55e",
    icon: "bag",
    platform: "Shopify development",
    heroTitle: "White label Shopify development for stores your clients will love",
    heroDescription:
      "Expand your ecommerce delivery with SiteOnLab as your behind-the-scenes Shopify team for storefront builds, theme customization, app setup, and conversion improvements.",
    proofMetric: "750+",
    deliveryLabel: "Stores supported",
    serviceHeading: "White Label Shopify Development Services",
    serviceIntro:
      "We help agencies ship reliable Shopify storefronts, product experiences, app integrations, and performance improvements while your brand owns the client relationship.",
    packageHeading: "Flexible White Label Shopify Development Packages",
    toolsHeading: "Our White Label Shopify Tools & Expertise",
    faqSubject: "white label Shopify development",
  },
  {
    slug: "white-label-wordpress-development",
    title: "White Label WordPress Development",
    navTitle: "WordPress Development",
    shortName: "WordPress",
    accent: "#3b82f6",
    icon: "wordpress",
    platform: "WordPress development",
    heroTitle: "White label WordPress development that stays invisible and reliable",
    heroDescription:
      "Let SiteOnLab handle WordPress websites, WooCommerce builds, theme customization, plugin setup, and post-launch support while your agency keeps full credit.",
    proofMetric: "1,000+",
    deliveryLabel: "WP sites delivered",
    serviceHeading: "White Label WordPress Development Services",
    serviceIntro:
      "Our WordPress team supports agencies with responsive builds, custom themes, WooCommerce, speed optimization, plugin workflows, and ongoing maintenance.",
    packageHeading: "Flexible White Label WordPress Development Packages",
    toolsHeading: "Our White Label WordPress Tools & Expertise",
    faqSubject: "white label WordPress development",
  },
];

export function getWhiteLabelServiceBySlug(slug: string) {
  return whiteLabelServices.find((service) => service.slug === slug);
}
