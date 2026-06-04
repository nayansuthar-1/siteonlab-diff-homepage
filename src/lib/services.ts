import type { ServiceIconName } from "@/components/ui/ServiceIcon";

export type Service = {
  slug: string;
  title: string;
  navTitle: string;
  description: string;
  accent: string;
  icon: ServiceIconName;
  promise: string;
  focusTitle: string;
  focusIntro: string;
  focusBullets: string[];
  deliverables: string[];
  process: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "advertising-services",
    title: "Advertising Services",
    navTitle: "Advertising",
    description:
      "Campaign strategy, creative direction, and conversion-focused advertising that puts your offer in front of the right audience.",
    accent: "#f59e0b",
    icon: "megaphone",
    promise: "Media plans and creative testing built around measurable growth.",
    focusTitle: "Campaigns that connect spend to business outcomes",
    focusIntro:
      "We structure advertising around audience clarity, offer quality, creative testing, and reporting that makes every next move easier to decide.",
    focusBullets: [
      "Audience and competitor research before budget allocation.",
      "Ad messaging, creative angles, and landing-page alignment.",
      "Weekly optimization loops across creatives, placements, and bids.",
    ],
    deliverables: [
      "Campaign strategy",
      "Ad creatives and copy",
      "Audience setup",
      "Performance reports",
    ],
    process: ["Audit", "Plan", "Launch", "Optimize"],
    outcomes: ["Lower wasted spend", "Clearer attribution", "Better qualified leads"],
  },
  {
    slug: "branding-services",
    title: "Branding Services",
    navTitle: "Branding",
    description:
      "Brand identity, positioning, and messaging systems that make your business easier to recognize, trust, and remember.",
    accent: "#8b5cf6",
    icon: "spark",
    promise: "A practical brand system your team can use across every touchpoint.",
    focusTitle: "A brand foundation for sharper marketing",
    focusIntro:
      "We connect strategy and visuals so your business has a recognizable voice, consistent look, and stronger customer recall.",
    focusBullets: [
      "Positioning, audience, and tone-of-voice definition.",
      "Logo, color, typography, and visual direction systems.",
      "Brand guidelines that keep campaigns and websites consistent.",
    ],
    deliverables: [
      "Brand strategy",
      "Visual identity",
      "Messaging framework",
      "Brand guidelines",
    ],
    process: ["Discover", "Position", "Design", "Document"],
    outcomes: ["Sharper recall", "Consistent communication", "Higher trust"],
  },

  {
    slug: "ecommerce-development",
    title: "Ecommerce Development",
    navTitle: "Ecommerce",
    description:
      "Custom online stores, checkout flows, product architecture, and integrations built to make buying simple and scalable.",
    accent: "#10b981",
    icon: "cart",
    promise: "Reliable ecommerce experiences designed for conversion and operations.",
    focusTitle: "Stores built for selling, managing, and scaling",
    focusIntro:
      "We combine storefront UX, secure payments, product management, and integrations so your ecommerce platform supports daily growth.",
    focusBullets: [
      "Product catalogs, filters, carts, checkout, and account flows.",
      "Payment, shipping, inventory, CRM, and analytics integrations.",
      "Performance-minded implementation for mobile shoppers.",
    ],
    deliverables: [
      "Storefront development",
      "Checkout setup",
      "Product architecture",
      "Third-party integrations",
    ],
    process: ["Map", "Build", "Integrate", "Launch"],
    outcomes: ["Smoother checkout", "Higher sales readiness", "Easier operations"],
  },
  {
    slug: "ppc-management",
    title: "PPC Management",
    navTitle: "PPC",
    description:
      "Search and paid media management with keyword structure, landing-page alignment, and budget control at the center.",
    accent: "#0ea5e9",
    icon: "chart",
    promise: "Paid acquisition managed with focus, testing, and accountability.",
    focusTitle: "Paid clicks managed for profitable intent",
    focusIntro:
      "We manage PPC by tightening keyword intent, improving ad relevance, and using conversion data to push spend toward what works.",
    focusBullets: [
      "Keyword research, negative keyword lists, and campaign structure.",
      "Search ad copy, extensions, landing-page recommendations.",
      "Bid, budget, and conversion tracking optimization.",
    ],
    deliverables: [
      "Campaign setup",
      "Keyword planning",
      "Conversion tracking",
      "Optimization reports",
    ],
    process: ["Audit", "Structure", "Launch", "Scale"],
    outcomes: ["Better lead quality", "Lower cost per action", "Cleaner reporting"],
  },
  {
    slug: "seo-service",
    title: "SEO Service",
    navTitle: "SEO",
    description:
      "Technical SEO, on-page optimization, content planning, and authority building to grow sustainable organic traffic.",
    accent: "#22c55e",
    icon: "search",
    promise: "Search visibility improved through technical clarity and useful content.",
    focusTitle: "SEO built on intent, structure, and consistency",
    focusIntro:
      "We improve how search engines understand your site and how users experience your content, from technical foundations to page-level optimization.",
    focusBullets: [
      "Technical audits for crawlability, indexing, speed, and structure.",
      "Keyword mapping and page optimization by search intent.",
      "Content plans that support long-term topical authority.",
    ],
    deliverables: [
      "SEO audit",
      "Keyword strategy",
      "On-page optimization",
      "Content roadmap",
    ],
    process: ["Audit", "Prioritize", "Optimize", "Measure"],
    outcomes: ["More organic traffic", "Better page rankings", "Improved site health"],
  },
  {
    slug: "shopify-development",
    title: "Shopify Development",
    navTitle: "Shopify",
    description:
      "Shopify store builds, theme customization, app integrations, and conversion improvements for brands ready to sell online.",
    accent: "#95bf47",
    icon: "bag",
    promise: "Shopify stores that are clean to manage and compelling to buy from.",
    focusTitle: "Shopify experiences tailored to your products",
    focusIntro:
      "We adapt Shopify around your catalog, buyer journey, and operations instead of forcing your business into a generic theme.",
    focusBullets: [
      "Custom sections, theme edits, and product page improvements.",
      "Apps, payments, shipping, analytics, and marketing integrations.",
      "Store speed, mobile UX, and conversion-focused refinements.",
    ],
    deliverables: [
      "Shopify setup",
      "Theme customization",
      "App integration",
      "Conversion improvements",
    ],
    process: ["Plan", "Customize", "Connect", "Launch"],
    outcomes: ["Faster store launches", "Easier management", "Better shopping UX"],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    navTitle: "Social Media",
    description:
      "Social strategy, content calendars, creative direction, and growth campaigns that keep your brand active and relevant.",
    accent: "#06b6d4",
    icon: "share",
    promise: "Social content planned around attention, trust, and business goals.",
    focusTitle: "Social presence with a clear operating rhythm",
    focusIntro:
      "We build social media systems that turn scattered posting into consistent publishing, campaign themes, and measurable audience engagement.",
    focusBullets: [
      "Platform strategy based on audience and content format.",
      "Content calendars with campaign themes and creative concepts.",
      "Performance reviews for reach, engagement, leads, and learning.",
    ],
    deliverables: [
      "Social strategy",
      "Content calendar",
      "Creative direction",
      "Monthly reports",
    ],
    process: ["Position", "Plan", "Publish", "Learn"],
    outcomes: ["Consistent presence", "Better engagement", "More brand trust"],
  },
  {
    slug: "website-design",
    title: "Website Design",
    navTitle: "Website Design",
    description:
      "Modern website interfaces, UX flows, and responsive design systems created to make your business look credible and easy to use.",
    accent: "#f97316",
    icon: "layout",
    promise: "Designs that balance brand impact with practical user journeys.",
    focusTitle: "Website design that guides visitors to action",
    focusIntro:
      "We design pages around user intent, hierarchy, visual clarity, and conversion paths so the site looks strong and works hard.",
    focusBullets: [
      "UX structure for home, service, landing, and conversion pages.",
      "Responsive UI design with reusable components and style systems.",
      "Visual hierarchy that makes offers, proof, and CTAs easy to scan.",
    ],
    deliverables: [
      "Wireframes",
      "UI design",
      "Responsive layouts",
      "Design system",
    ],
    process: ["Map", "Wireframe", "Design", "Handoff"],
    outcomes: ["Clearer journeys", "Stronger visual trust", "Mobile-ready layouts"],
  },
  {
    slug: "website-development",
    title: "Website Development",
    navTitle: "Web Development",
    description:
      "Fast, secure, responsive websites developed with clean front-end implementation, CMS readiness, and conversion tracking.",
    accent: "#6366f1",
    icon: "code",
    promise: "Production-ready websites that feel fast and stay maintainable.",
    focusTitle: "Website builds with performance and usability at the core",
    focusIntro:
      "We translate approved designs into responsive, accessible, SEO-aware websites that are simple for teams to maintain after launch.",
    focusBullets: [
      "Front-end development with responsive and accessible components.",
      "CMS, forms, analytics, and third-party tool integrations.",
      "Performance checks, QA, and launch support.",
    ],
    deliverables: [
      "Responsive development",
      "CMS integration",
      "Form and analytics setup",
      "Launch QA",
    ],
    process: ["Scope", "Develop", "Test", "Deploy"],
    outcomes: ["Faster pages", "Cleaner maintenance", "Reliable launch"],
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    navTitle: "WordPress",
    description:
      "Custom WordPress websites, theme development, plugin setup, WooCommerce support, and performance-focused maintenance.",
    accent: "#21759b",
    icon: "wordpress",
    promise: "WordPress websites that are flexible, editable, and properly structured.",
    focusTitle: "WordPress built beyond generic templates",
    focusIntro:
      "We shape WordPress around your content model, editing needs, plugins, and growth plans so your team can manage the site with confidence.",
    focusBullets: [
      "Custom themes, page templates, and editable content blocks.",
      "Plugin selection, configuration, and WooCommerce support.",
      "Speed, security, backup, and maintenance improvements.",
    ],
    deliverables: [
      "Custom theme work",
      "Plugin setup",
      "WooCommerce support",
      "Maintenance improvements",
    ],
    process: ["Audit", "Build", "Configure", "Support"],
    outcomes: ["Easier editing", "Better performance", "More stable publishing"],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    navTitle: "Custom Software",
    description:
      "Tailored software, web applications, and system integrations engineered around your exact workflows, data, and business logic.",
    accent: "#3b82f6",
    icon: "code",
    promise: "Purpose-built software that fits your process instead of forcing you into a template.",
    focusTitle: "Software shaped around how your business actually works",
    focusIntro:
      "We design and build custom software by mapping your workflows, data, and integrations first, then engineering clean, scalable systems that are easy to maintain and extend.",
    focusBullets: [
      "Requirement discovery, workflow mapping, and system architecture.",
      "Custom web apps, internal tools, and process automation.",
      "Secure APIs, database design, and third-party integrations.",
    ],
    deliverables: [
      "Solution architecture",
      "Custom application build",
      "API and integrations",
      "Testing and deployment",
    ],
    process: ["Discover", "Architect", "Build", "Deploy"],
    outcomes: ["Streamlined operations", "Less manual work", "Scalable systems"],
  },
  {
    slug: "saas-development",
    title: "SaaS Software Development",
    navTitle: "SaaS Development",
    description:
      "End-to-end SaaS product development with multi-tenant architecture, subscriptions, dashboards, and cloud infrastructure built to scale.",
    accent: "#7c3aed",
    icon: "spark",
    promise: "A production-ready SaaS platform engineered for growth, reliability, and recurring revenue.",
    focusTitle: "SaaS products built to launch, scale, and retain",
    focusIntro:
      "We build SaaS platforms from MVP to scale, combining multi-tenant architecture, subscription billing, secure cloud infrastructure, and analytics that support long-term product growth.",
    focusBullets: [
      "Product strategy, MVP scoping, and multi-tenant architecture.",
      "Subscription billing, user roles, and onboarding flows.",
      "Cloud infrastructure, DevOps, and analytics dashboards.",
    ],
    deliverables: [
      "SaaS product build",
      "Subscription and billing",
      "Cloud and DevOps setup",
      "Analytics dashboards",
    ],
    process: ["Define", "Architect", "Build", "Scale"],
    outcomes: ["Faster time to market", "Reliable scaling", "Recurring revenue ready"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    navTitle: "Mobile Apps",
    description:
      "Native and cross-platform mobile apps with intuitive UX, secure backends, and smooth performance across iOS and Android.",
    accent: "#14b8a6",
    icon: "layout",
    promise: "Mobile apps that feel fast, look polished, and are built to grow with your users.",
    focusTitle: "Mobile experiences your users will keep coming back to",
    focusIntro:
      "We design and develop mobile apps around real user journeys, building native or cross-platform solutions with reliable backends, clean UX, and store-ready performance.",
    focusBullets: [
      "UX flows, wireframes, and platform-specific UI design.",
      "Native iOS, Android, and cross-platform development.",
      "Secure APIs, backend services, and app store deployment.",
    ],
    deliverables: [
      "App UX/UI design",
      "iOS and Android build",
      "Backend and API",
      "App store launch",
    ],
    process: ["Plan", "Design", "Develop", "Launch"],
    outcomes: ["Higher engagement", "Smooth performance", "Faster app launches"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
