import type { IndustryIconName } from "@/components/ui/IndustryIcon";

export type ProcessStep = {
  title: string;
  description: string;
};

export type Outcome = {
  title: string;
  description: string;
};

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
  workflowTitle: string;
  workflowIntro: string;
  workflows: ProcessStep[];
  outcomes: Outcome[];
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
    workflowTitle: "Our travel & hospitality process",
    workflowIntro:
      "A clear, step-by-step approach designed to attract more travelers, increase direct bookings, and build lasting guest loyalty.",
    workflows: [
      {
        title: "Discover",
        description:
          "Capture traveler intent early through search, content, and campaigns tuned to your destinations and packages.",
      },
      {
        title: "Book",
        description:
          "Real-time availability and frictionless booking flows turn interest into confirmed, direct reservations.",
      },
      {
        title: "Arrive",
        description:
          "Smooth check-in, guest apps, and operations tooling make every arrival effortless for staff and guests.",
      },
      {
        title: "Delight",
        description:
          "Loyalty, follow-ups, and post-stay touchpoints turn a single trip into repeat stays and referrals.",
      },
    ],
    outcomes: [
      {
        title: "Higher direct bookings",
        description:
          "Reduce dependence on third-party channels and keep more revenue on every reservation.",
      },
      {
        title: "Smoother guest operations",
        description:
          "Automate routine tasks so your team spends time on guests instead of admin work.",
      },
      {
        title: "More repeat stays",
        description:
          "Personalized follow-ups and loyalty programs keep past guests coming back.",
      },
    ],
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
    workflowTitle: "Our ecommerce & retail process",
    workflowIntro:
      "A conversion-focused path that guides shoppers from first click to loyal, repeat customer.",
    workflows: [
      {
        title: "Browse",
        description:
          "Fast, intuitive storefronts and smart search help shoppers find the right product instantly.",
      },
      {
        title: "Compare",
        description:
          "Rich product pages, reviews, and recommendations build confidence before checkout.",
      },
      {
        title: "Checkout",
        description:
          "Streamlined, secure payment flows remove friction and recover abandoned carts.",
      },
      {
        title: "Retain",
        description:
          "Automated post-purchase journeys and loyalty programs drive repeat orders.",
      },
    ],
    outcomes: [
      {
        title: "Faster checkout",
        description:
          "Fewer steps and trusted payments lift completion rates across every device.",
      },
      {
        title: "Cleaner inventory control",
        description:
          "Real-time stock and order data keep operations accurate and predictable.",
      },
      {
        title: "Stronger repeat purchases",
        description:
          "Personalized retention flows increase average customer lifetime value.",
      },
    ],
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
    workflowTitle: "Our healthcare delivery process",
    workflowIntro:
      "A secure, patient-first journey that connects every stage of care without compromising compliance.",
    workflows: [
      {
        title: "Intake",
        description:
          "Digital registration and scheduling get patients into care quickly and accurately.",
      },
      {
        title: "Diagnose",
        description:
          "Connected records and decision support give clinicians the full picture, fast.",
      },
      {
        title: "Coordinate",
        description:
          "Shared workflows align providers, pharmacies, and labs around each patient.",
      },
      {
        title: "Follow up",
        description:
          "Automated reminders and patient portals keep people engaged after every visit.",
      },
    ],
    outcomes: [
      {
        title: "Safer patient data",
        description:
          "Encryption and HIPAA/GDPR compliance protect sensitive records by default.",
      },
      {
        title: "Faster appointments",
        description:
          "Real-time scheduling reduces wait times and lowers no-show rates.",
      },
      {
        title: "Better care coordination",
        description:
          "Interoperable systems keep every provider working from the same record.",
      },
    ],
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
    workflowTitle: "Our legal operations process",
    workflowIntro:
      "An organized, secure workflow that builds client trust while reducing administrative load.",
    workflows: [
      {
        title: "Intake",
        description:
          "Structured digital intake captures qualified leads and routes them instantly.",
      },
      {
        title: "Review",
        description:
          "Document automation and matter tracking keep every case organized from day one.",
      },
      {
        title: "Manage",
        description:
          "Role-based portals give clients and staff secure, controlled access to case progress.",
      },
      {
        title: "Resolve",
        description:
          "Billing visibility and clear communication close matters with confidence.",
      },
    ],
    outcomes: [
      {
        title: "Better client trust",
        description:
          "Professional, secure systems signal credibility from the first interaction.",
      },
      {
        title: "Reduced admin work",
        description:
          "Automation handles routine tasks so your team focuses on casework.",
      },
      {
        title: "Clearer case visibility",
        description:
          "Live dashboards keep clients informed and reduce status inquiries.",
      },
    ],
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
    workflowTitle: "Our jewellery commerce process",
    workflowIntro:
      "A premium buying journey crafted to turn careful browsers into confident, high-value buyers.",
    workflows: [
      {
        title: "Discover",
        description:
          "Editorial collections and rich storytelling draw buyers into your brand world.",
      },
      {
        title: "Inspect",
        description:
          "High-detail product pages, certificates, and variant data build buying confidence.",
      },
      {
        title: "Inquire",
        description:
          "Wishlist, inquiry, and appointment flows connect serious buyers to your team.",
      },
      {
        title: "Purchase",
        description:
          "Secure checkout and showroom follow-ups close sales online and in person.",
      },
    ],
    outcomes: [
      {
        title: "Premium brand trust",
        description:
          "Refined design and authenticity signals reassure high-value buyers.",
      },
      {
        title: "Higher qualified inquiries",
        description:
          "Clear inquiry paths surface buyers who are ready to purchase.",
      },
      {
        title: "Cleaner product operations",
        description:
          "Structured SKU and inventory data keep catalogs accurate and complete.",
      },
    ],
    metrics: ["Product inquiry rate", "Appointment bookings", "Catalog completion"],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
