import type { IndustryIconName } from "@/components/ui/IndustryIcon";

export type Industry = {
  slug: string;
  title: string;
  navTitle: string;
  label: string;
  description: string;
  accent: string;
  icon: IndustryIconName;
  heroLine: string;
  focusTitle: string;
  focusIntro: string;
  expertise: string[];
  capabilities: string[];
  workflows: string[];
  outcomes: string[];
  metrics: string[];
};

export const industries: Industry[] = [
  {
    slug: "travel-hospitality",
    title: "Travel & Hospitality",
    navTitle: "Travel",
    label: "Guest journeys",
    description:
      "Custom booking, hospitality, and travel platforms that reduce operations, improve guest experiences, and make every touchpoint easier to manage.",
    accent: "#00ffc8",
    icon: "travel",
    heroLine:
      "Improve travel and hospitality management with seamless booking platforms, smooth customer journeys, and automation for routine tasks.",
    focusTitle: "Digital journeys for bookings, stays, and guest loyalty",
    focusIntro:
      "Adapted from the existing Travel & HoReCa content, this industry track focuses on booking flows, traveler apps, POS systems, dynamic pricing, and third-party vendor integrations.",
    expertise: [
      "Booking platforms",
      "Sustainable tourism solutions",
      "Mobile apps for travelers",
      "Point of Sale (POS) systems",
      "Guest experience portals",
      "Operations dashboards",
    ],
    capabilities: [
      "Integrations with third-party vendors",
      "Group bookings management",
      "Dynamic pricing and real-time availability",
      "Automated payment processing",
      "Customer journey automation",
    ],
    workflows: ["Discover", "Book", "Arrive", "Delight"],
    outcomes: ["Higher direct bookings", "Smoother guest operations", "More repeat stays"],
    metrics: ["Booking conversion", "Guest response time", "Occupancy visibility"],
  },
  {
    slug: "ecommerce-retail",
    title: "Ecommerce & Retail",
    navTitle: "Ecommerce",
    label: "Commerce systems",
    description:
      "Scalable stores, marketplaces, product catalogs, and retail workflows built for conversion, inventory clarity, and customer retention.",
    accent: "#ff4f9a",
    icon: "retail",
    heroLine:
      "Roll out a custom ecommerce platform, global marketplace, or mobile shopping app with recommendations, smart systems, and CRM integration.",
    focusTitle: "Retail experiences built around product discovery and checkout",
    focusIntro:
      "Using the existing ecommerce content as the base, we shape stores, marketplaces, mobile shopping apps, and inventory systems around real buying behavior.",
    expertise: [
      "Ecommerce platforms",
      "Online stores",
      "Mobile shopping applications",
      "Multi-vendor marketplaces",
      "Inventory and order management",
      "Retail CRM workflows",
    ],
    capabilities: [
      "Smart product search",
      "Payment integrations",
      "Promo engines",
      "AI recommendation engines",
      "Order and fulfillment automation",
    ],
    workflows: ["Browse", "Compare", "Checkout", "Retain"],
    outcomes: ["Faster checkout", "Cleaner inventory control", "Stronger repeat purchases"],
    metrics: ["Cart conversion", "Average order value", "Stock accuracy"],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    navTitle: "Healthcare",
    label: "Care platforms",
    description:
      "Secure healthcare software for patient journeys, clinical operations, telemedicine, billing, compliance, and connected care.",
    accent: "#22c55e",
    icon: "healthcare",
    heroLine:
      "Build healthcare systems that protect sensitive data while making appointments, records, billing, and patient communication easier.",
    focusTitle: "Healthcare products with security and care continuity at the center",
    focusIntro:
      "The existing healthcare section already covers HMS, EHR, telemedicine, billing, interoperability, and compliance; the new UI presents that expertise with clearer outcomes.",
    expertise: [
      "Hospital management systems (HMS)",
      "Electronic health records (EHR)",
      "Telemedicine and remote care",
      "Pharmacy and laboratory software",
      "Medical billing and insurance",
      "Patient portals and mobile apps",
    ],
    capabilities: [
      "Secure data encryption",
      "Real-time appointment scheduling",
      "Automated medical billing",
      "Interoperability (HL7/FHIR)",
      "AI-powered diagnostics support",
      "HIPAA/GDPR compliance",
    ],
    workflows: ["Intake", "Diagnose", "Coordinate", "Follow up"],
    outcomes: ["Safer patient data", "Faster appointments", "Better care coordination"],
    metrics: ["Appointment utilization", "Claim cycle time", "Patient portal usage"],
  },
  {
    slug: "law-firms",
    title: "Law Firms",
    navTitle: "Law Firms",
    label: "Legal operations",
    description:
      "Legal websites, client portals, document workflows, case management tools, and secure intake systems for modern law practices.",
    accent: "#8b5cf6",
    icon: "law",
    heroLine:
      "Turn legal operations into organized digital workflows, from client intake and document automation to case status and billing visibility.",
    focusTitle: "Legal systems designed for trust, clarity, and controlled access",
    focusIntro:
      "Law firms need credibility on the front end and discipline behind the scenes. We build secure client-facing and internal systems that reduce admin load and improve responsiveness.",
    expertise: [
      "Law firm websites",
      "Client intake systems",
      "Case management portals",
      "Document automation",
      "Appointment and consultation flows",
      "Secure client communication",
    ],
    capabilities: [
      "Matter tracking dashboards",
      "Role-based document access",
      "Digital signature workflows",
      "Billing and retainer visibility",
      "CRM and calendar integrations",
    ],
    workflows: ["Intake", "Review", "Manage", "Resolve"],
    outcomes: ["Better client trust", "Reduced admin work", "Clearer case visibility"],
    metrics: ["Lead-to-consult rate", "Document turnaround", "Client response time"],
  },
  {
    slug: "jewellery",
    title: "Jewellery",
    navTitle: "Jewellery",
    label: "Luxury commerce",
    description:
      "Premium jewellery websites, catalogs, ecommerce experiences, inventory systems, appointment flows, and product storytelling for high-trust buyers.",
    accent: "#f5c542",
    icon: "jewellery",
    heroLine:
      "Create a premium digital jewellery experience where product detail, trust signals, catalog structure, and buying confidence shine.",
    focusTitle: "Jewellery commerce built for detail, trust, and desire",
    focusIntro:
      "Jewellery buyers need confidence before conversion. We combine premium visual design, product data, inventory clarity, certificates, appointment flows, and retail integrations.",
    expertise: [
      "Jewellery ecommerce websites",
      "Product catalogs and collections",
      "Inventory and SKU management",
      "Certificate and authenticity flows",
      "Custom design request forms",
      "Appointment booking for showrooms",
    ],
    capabilities: [
      "High-detail product pages",
      "Wishlist and inquiry workflows",
      "Secure checkout integrations",
      "Gold, diamond, and variant data structures",
      "CRM and showroom follow-up automation",
    ],
    workflows: ["Discover", "Inspect", "Inquire", "Purchase"],
    outcomes: ["Premium brand trust", "Higher qualified inquiries", "Cleaner product operations"],
    metrics: ["Product inquiry rate", "Appointment bookings", "Catalog completion"],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
