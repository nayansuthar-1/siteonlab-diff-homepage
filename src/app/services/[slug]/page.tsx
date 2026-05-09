import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/ui/Footer";
import ServiceIcon from "@/components/ui/ServiceIcon";
import ContactSection from "@/components/sections/ContactSection";
import { getServiceBySlug, services } from "@/lib/services";
import styles from "./ServiceDetail.module.css";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

const advertisingCapabilityCards = [
  {
    title: "Creative Campaigns",
    description: "Design campaigns that capture attention and drive engagement.",
    icon: "spark" as const,
    items: [
      "Concept Development",
      "Print & Digital Ad Creatives",
      "Video & Motion Graphics",
      "Copywriting & Messaging",
      "Multi-Channel Campaigns",
    ],
  },
  {
    title: "Media Planning & Buying",
    description: "Reach the right audience at the right time with optimized media spend.",
    icon: "chart" as const,
    items: [
      "TV, Radio & Print Media Buying",
      "Digital Media & Programmatic Ads",
      "Social Media Paid Campaigns",
      "Audience Segmentation & Targeting",
      "ROI Tracking & Optimization",
    ],
  },
  {
    title: "Outdoor & OOH Advertising",
    description: "Boost brand visibility with outdoor campaigns.",
    icon: "megaphone" as const,
    items: [
      "Billboards & Hoardings",
      "Transit & Bus Branding",
      "Event & Exhibition Branding",
      "Street & Retail Advertising",
      "Localized Outdoor Campaigns",
    ],
  },
  {
    title: "Digital Advertising",
    description: "Leverage digital platforms for measurable leads and conversions.",
    icon: "search" as const,
    items: [
      "Google Ads & Search Campaigns",
      "Social Media Advertising",
      "Retargeting & Remarketing",
      "Email Marketing Campaigns",
      "Landing Page Optimization",
    ],
  },
  {
    title: "Branding & Identity Support",
    description: "Strengthen your advertising with cohesive brand messaging.",
    icon: "layout" as const,
    items: [
      "Logo & Visual Identity Support",
      "Brand Guidelines & Style Consistency",
      "Marketing Collateral",
      "Packaging Design",
      "Campaign-Specific Branding",
    ],
  },
  {
    title: "Analytics & Performance Tracking",
    description: "Measure campaign success and optimize ROI.",
    icon: "chart" as const,
    items: [
      "Campaign Performance Reports",
      "KPI Tracking & Analytics",
      "Lead & Conversion Measurement",
      "Budget & ROI Optimization",
      "Continuous Campaign Improvements",
    ],
  },
];

const testimonials = [
  {
    quote:
      "We loved working with Siteon Lab on our website. They designed and developed it beautifully, making it easy to showcase our photography. The site is user-friendly, looks great on all devices, and perfectly represents our brand. Highly recommend their team!",
    service: "WordPress Website",
    name: "Stephanie Coudray",
    business: "Photography Website",
  },
  {
    quote:
      "We are extremely satisfied with Siteon Lab and team for our Hotel. They not only designed and developed a beautiful, user-friendly website but also helped with marketing strategies to reach our audience effectively. Highly professional and results-driven!",
    service: "Website & Marketing Solutions",
    name: "David Rodriguez",
    business: "Hotel Wing Orbit",
  },
  {
    quote:
      "I have an excellent experience working with Siteonlab. They built a clean, professional website for our culinary studio and also managed our social media. The team really understood what we wanted and helped us connect better with our audience online. Highly recommend their services!",
    service: "Website & Social Media",
    name: "Jeet Bhatt",
    business: "The JeMie's culinary studio",
  },
];

const brandingServiceCards = [
  {
    title: "Logo Design & Visual Identity",
    description:
      "Memorable, versatile logo systems aligned with your brand values, audience, usage rules, colours, and typography.",
    items: ["Logo system", "Usage rules", "Colour & typography", "Identity handoff"],
  },
  {
    title: "Brand Strategy & Positioning",
    description:
      "A strategic foundation for your purpose, personality, value proposition, and market position before design begins.",
    items: ["Brand purpose", "Personality", "Value proposition", "Market position"],
  },
  {
    title: "Brand Identity Design",
    description:
      "Complete visual systems across colour, type, imagery, iconography, and design language for every touchpoint.",
    items: ["Colour palette", "Typography system", "Imagery style", "Design language"],
  },
  {
    title: "Brand Guidelines & Style Guide",
    description:
      "A practical brand manual that helps your team, vendors, and partners apply the brand consistently.",
    items: ["Brand manual", "Application rules", "Partner guidance", "Consistency checks"],
  },
  {
    title: "Rebranding Services",
    description:
      "Strategic rebrands that evolve your identity while preserving equity and communicating your next direction clearly.",
    items: ["Brand audit", "Identity evolution", "Equity preservation", "Launch messaging"],
  },
  {
    title: "Packaging & Print Design",
    description:
      "Physical brand touchpoints from packaging to business cards, brochures, and signage that leave a lasting impression.",
    items: ["Packaging", "Brochures", "Business cards", "Signage"],
  },
];

const brandingIndustries = [
  "Manufacturing & Industrial",
  "Real Estate & Construction",
  "Healthcare & Pharmaceuticals",
  "Retail & E-commerce",
  "Professional Services",
  "Food & Beverage",
  "Technology & SaaS",
  "Jewellery & Fashion",
];

const brandingFaqs = [
  {
    question: "How long does the branding process take?",
    answer:
      "Complete brand identity projects typically take 4-8 weeks depending on scope and feedback cycles. Logo-only projects can often be completed in 2-3 weeks.",
  },
  {
    question: "What is the difference between branding and marketing?",
    answer:
      "Branding defines who you are: identity, values, voice, and personality. Marketing communicates that identity to your audience and performs better when the brand is clear.",
  },
  {
    question: "Do you offer branding services outside Ahmedabad?",
    answer:
      "Yes. While we are based in Ahmedabad, branding projects can be delivered across India and internationally through remote collaboration.",
  },
];

const contentWritingCards = [
  {
    title: "Blog & Article Writing",
    description:
      "Build authority and bring organic traffic with keyword-rich, engaging articles.",
    icon: "pen" as const,
    items: [
      "Blog Posts for SEO & Branding",
      "Long-Form Authority Articles",
      "Industry-Specific Thought Leadership",
      "Trend & News-Based Content",
    ],
  },
  {
    title: "Website & Landing Page Copy",
    description:
      "Turn visitors into customers with persuasive, conversion-focused copy.",
    icon: "layout" as const,
    items: [
      "Homepage & Service Pages",
      "Product & Category Descriptions",
      "Landing Pages for Campaigns",
      "Sales Pages & Funnels",
    ],
  },
  {
    title: "Technical & Business Writing",
    description:
      "Simplify complex ideas with clear, professional content.",
    icon: "code" as const,
    items: [
      "Whitepapers & Case Studies",
      "Business Proposals & Reports",
      "eBooks & Guides",
      "User Manuals & Documentation",
    ],
  },
  {
    title: "Marketing & Promotional Content",
    description:
      "Boost engagement with content tailored for digital marketing.",
    icon: "megaphone" as const,
    items: [
      "Email Newsletters & Drip Campaigns",
      "Social Media Captions & Posts",
      "Press Releases",
      "Ad Copy & Promotional Campaigns",
    ],
  },
  {
    title: "Local & SEO Content",
    description:
      "Reach audiences searching for you in their city or industry.",
    icon: "search" as const,
    items: [
      "SEO Keyword Research & Optimization",
      "Location-Specific Content",
      "Meta Titles & Descriptions",
      "Internal Linking & Content Audits",
    ],
  },
  {
    title: "Editing & Content Strategy",
    description:
      "We do not just write. We refine, plan, and improve content for long-term results.",
    icon: "chart" as const,
    items: [
      "Proofreading & Editing Services",
      "Content Audits & Gap Analysis",
      "Topic Research & Content Calendar",
      "Ongoing Content Strategy Support",
    ],
  },
];

const contentWritingStats = [
  {
    label: "SEO-Driven Approach",
    detail: "Every piece is optimized for search engines and readers alike.",
    metric: "7-14 Days",
    caption: "Average campaign launch time",
  },
  {
    label: "Industry-Specific Expertise",
    detail: "From tech to real estate, our writers bring domain awareness.",
    metric: "100+",
    caption: "Projects successfully delivered",
  },
  {
    label: "Fast Turnaround",
    detail: "High-quality content without long waits.",
    metric: "95%",
    caption: "Client retention rate",
  },
  {
    label: "Scalable Solutions",
    detail: "Need 5 blogs or 500? We scale without compromising quality.",
    metric: "50+",
    caption: "Trusted clients",
  },
  {
    label: "Long-Term Partnerships",
    detail: "Ongoing content support for brands that publish consistently.",
    metric: "24/7",
    caption: "Support & assistance",
  },
  {
    label: "Proven Track Record",
    detail: "Content built to support measurable growth.",
    metric: "5X ROI",
    caption: "Average return on ad spend",
  },
];

const contentWritingProcess = [
  {
    title: "Discovery & Research",
    description: "Understanding your goals, audience, and competition.",
  },
  {
    title: "Strategy & Planning",
    description: "Building a keyword-driven content roadmap.",
  },
  {
    title: "Content Creation",
    description: "Expert writers craft original, high-quality copy.",
  },
  {
    title: "Delivery & Reporting",
    description: "On-time delivery with insights for future growth.",
  },
];

const ecommerceServiceCards = [
  {
    title: "Custom Ecommerce Development",
    description: "Tailored solutions to match your brand and business goals.",
    icon: "cart" as const,
    items: [
      "Unique store design & custom layouts",
      "SEO-friendly, mobile-responsive development",
      "Multi-language",
      "Multi-currency support",
      "Custom features & integrations",
    ],
  },
  {
    title: "Shopify Development",
    description: "Build scalable, conversion-ready Shopify stores.",
    icon: "bag" as const,
    items: [
      "Theme customization & app integration",
      "Secure payment gateways",
      "Advanced product catalog setup",
      "Conversion-optimized product pages",
      "Custom Checkout & Cart Design",
    ],
  },
  {
    title: "WooCommerce Development",
    description: "Flexible, cost-effective ecommerce solutions on WordPress.",
    icon: "wordpress" as const,
    items: [
      "WooCommerce store setup & customization",
      "Custom plugins & functionality",
      "Seamless checkout optimization",
      "Scalable solutions for SMBs",
    ],
  },
  {
    title: "Ecommerce Migration Services",
    description: "Seamlessly migrate your existing store without data loss.",
    icon: "share" as const,
    items: [
      "Magento, PrestaShop, OpenCart to Shopify/WooCommerce",
      "Product & customer data migration",
      "SEO migration & URL redirects",
      "Minimal downtime guaranteed",
    ],
  },
  {
    title: "Ecommerce Website Redesign",
    description: "Upgrade outdated stores for modern performance.",
    icon: "layout" as const,
    items: [
      "Full UX/UI audit & revamp",
      "Improved speed & mobile optimization",
      "CRO-driven redesign",
      "SEO compliance & schema integration",
    ],
  },
  {
    title: "Ecommerce Maintenance & Support",
    description: "Keep your store secure, fast, and growing.",
    icon: "code" as const,
    items: [
      "Regular backups & updates",
      "Security monitoring",
      "Performance tuning",
      "Analytics & reporting",
    ],
  },
];

const ecommerceStats = [
  {
    label: "Platform Expertise",
    detail: "Certified Shopify and WooCommerce developers.",
    metric: "7-14 Days",
    caption: "Average campaign launch time",
  },
  {
    label: "Conversion-First Design",
    detail: "We design ecommerce websites with CRO in mind.",
    metric: "100+",
    caption: "Projects successfully delivered",
  },
  {
    label: "Scalable & Secure Solutions",
    detail: "Built to grow with your business.",
    metric: "95%",
    caption: "Client retention rate",
  },
  {
    label: "End-to-End Development",
    detail: "From design to deployment and ongoing support.",
    metric: "50+",
    caption: "Trusted clients",
  },
  {
    label: "Transparent Communication",
    detail: "Clear timelines, updates, and no hidden costs.",
    metric: "24/7",
    caption: "Support & assistance",
  },
  {
    label: "Proven Track Record",
    detail: "100+ ecommerce stores launched successfully.",
    metric: "5X ROI",
    caption: "Average return on ad spend",
  },
];

const ecommerceProcess = [
  {
    title: "Discovery & Planning",
    description: "Understand your business, products, and goals.",
  },
  {
    title: "Design & Wireframing",
    description: "Create user-centric layouts and prototypes.",
  },
  {
    title: "Development & Integration",
    description: "Build responsive, SEO-friendly stores with custom features.",
  },
  {
    title: "Launch & Delivery",
    description: "Go live with a fully optimized ecommerce store.",
  },
];

const ppcServiceCards = [
  {
    title: "Google Ads Management",
    description: "Maximize your visibility on Google Search and Display networks.",
    icon: "search" as const,
    items: [
      "Search & Display Ads",
      "Keyword Research & Bidding Strategies",
      "Ad Copywriting & A/B Testing",
      "Conversion Tracking & Analytics",
    ],
  },
  {
    title: "Meta & Social Media Ads",
    description: "Run targeted campaigns on Facebook, Instagram, and LinkedIn.",
    icon: "share" as const,
    items: [
      "Social Media Campaign Strategy",
      "Audience Targeting & Segmentation",
      "Creative & Visual Ads",
      "Retargeting & Lead Generation",
    ],
  },
  {
    title: "E-commerce PPC",
    description: "Drive sales for your online store with high-converting ad campaigns.",
    icon: "cart" as const,
    items: [
      "Google Shopping Ads",
      "Dynamic Retargeting Campaigns",
      "Product Feed Optimization",
      "Landing Page Optimization",
    ],
  },
  {
    title: "Local PPC Campaigns",
    description: "Attract customers near your business location in Ahmedabad.",
    icon: "megaphone" as const,
    items: [
      "Geo-targeted Ads",
      "Google Business Profile Integration",
      "Call & Visit Tracking",
      "Local Keyword Optimization",
    ],
  },
  {
    title: "Remarketing & Retargeting",
    description: "Reconnect with visitors who did not convert the first time.",
    icon: "spark" as const,
    items: [
      "Display & Social Retargeting",
      "Dynamic Product Ads",
      "Email Retargeting Campaigns",
      "Conversion Optimization",
    ],
  },
  {
    title: "PPC Analytics & Reporting",
    description: "Measure campaign performance and continuously improve ROI.",
    icon: "chart" as const,
    items: [
      "Traffic, Clicks & Conversion Reports",
      "Campaign Performance Analysis",
      "Competitor Benchmarking",
      "Optimization Recommendations",
    ],
  },
];

const ppcStats = [
  {
    label: "Certified & Experienced Team",
    detail: "Google Ads certified specialists with years of hands-on experience.",
    metric: "7-14 Days",
    caption: "Average project timeline",
  },
  {
    label: "Data-Driven Strategies",
    detail: "Every campaign is backed by research, analytics, and proven tactics.",
    metric: "$2M+",
    caption: "Liability coverage",
  },
  {
    label: "Customized Campaigns",
    detail: "Tailored PPC strategies to match your business goals and audience.",
    metric: "1000+",
    caption: "Projects completed",
  },
  {
    label: "Transparent Reporting",
    detail: "Regular reports to track performance and ensure ROI.",
    metric: "300%",
    caption: "Average visibility increase",
  },
  {
    label: "Full-Service PPC Solutions",
    detail: "From ad creation to analytics, we manage everything in-house.",
    metric: "5-Year",
    caption: "Warranty included",
  },
  {
    label: "Long-Term Partnerships",
    detail: "Ongoing campaign management for brands that want durable growth.",
    metric: "24/7",
    caption: "Support available",
  },
];

const ppcProcess = [
  {
    title: "Consultation & Goal Setting",
    description: "Understand your business objectives and target audience.",
  },
  {
    title: "Campaign Strategy",
    description: "Craft customized PPC strategies for Google, social, and ecommerce ads.",
  },
  {
    title: "Implementation",
    description: "Set up campaigns, ads, and tracking with precision.",
  },
  {
    title: "Reporting",
    description: "Provide transparent monthly reports with actionable insights.",
  },
];

const seoServiceCards = [
  {
    title: "On-Page SEO",
    description: "Optimize your website content and structure to rank higher and engage visitors.",
    icon: "search" as const,
    items: [
      "Keyword Research & Strategy",
      "Meta Titles & Description Optimization",
      "Heading & Content Optimization",
      "Internal Linking",
      "URL & Schema Optimization",
    ],
  },
  {
    title: "Technical SEO",
    description: "Fix behind-the-scenes issues that affect rankings and user experience.",
    icon: "code" as const,
    items: [
      "Site Speed Optimization",
      "Mobile-Friendly & Responsive Design",
      "Crawl & Indexing Management",
      "XML Sitemap & Robots.txt",
      "Core Web Vitals Optimization",
    ],
  },
  {
    title: "Off-Page SEO & Link Building",
    description: "Boost your site authority and credibility with high-quality backlinks.",
    icon: "share" as const,
    items: [
      "Guest Posting & Outreach",
      "Google Business Profile Optimization",
      "Social Bookmarking",
      "Content Promotion",
      "Competitor Backlink Analysis",
    ],
  },
  {
    title: "Local SEO",
    description: "Get discovered by customers searching for services near you.",
    icon: "megaphone" as const,
    items: [
      "Google Business Profile Optimization",
      "Local Keyword Research",
      "Location Pages & Schema",
      "Map Listings",
      "Reputation Management",
    ],
  },
  {
    title: "Content Marketing",
    description: "Drive organic traffic and engagement through high-quality content.",
    icon: "pen" as const,
    items: [
      "Blog Writing & Optimization",
      "Landing Page Content for Conversions",
      "Infographics & Visual Content",
      "Keyword-Focused Guides & Articles",
      "Content Gap Analysis",
    ],
  },
  {
    title: "SEO Analytics & Reporting",
    description: "Measure performance and continuously improve results with data-driven insights.",
    icon: "chart" as const,
    items: [
      "Monthly SEO Reports",
      "Traffic & Ranking Analysis",
      "Conversion Tracking & KPI Reports",
      "Competitor Analysis & Benchmarking",
      "Recommendations for Ongoing Growth",
    ],
  },
];

const seoStats = [
  {
    label: "Transparent & Result-Oriented",
    detail: "Clear strategies, actionable reports, and measurable results.",
    metric: "7-14 Days",
    caption: "Average project timeline",
  },
  {
    label: "Experienced SEO Professionals",
    detail: "Our team has worked with startups, SMEs, and large enterprises.",
    metric: "$2M+",
    caption: "Liability coverage",
  },
  {
    label: "Customized SEO Strategies",
    detail: "Every business is unique, so we tailor strategies to your goals and market.",
    metric: "1000+",
    caption: "Projects completed",
  },
  {
    label: "Fast & Reliable Execution",
    detail: "SEO best practices implemented efficiently without compromising quality.",
    metric: "300%",
    caption: "Average visibility increase",
  },
  {
    label: "Long-Term Partnership",
    detail: "Sustainable growth with ongoing SEO support.",
    metric: "5-Year",
    caption: "Warranty included",
  },
  {
    label: "Full-Service SEO Agency",
    detail: "Technical audits, content strategy, and link building covered in-house.",
    metric: "24/7",
    caption: "Support available",
  },
];

const seoProcess = [
  {
    title: "Audit & Analysis",
    description: "We analyze your website, competitors, and market opportunities.",
  },
  {
    title: "Strategy & Planning",
    description: "We craft a data-driven SEO strategy tailored to your business objectives.",
  },
  {
    title: "Implementation",
    description: "We optimize your website, content, and technical SEO elements.",
  },
  {
    title: "Monitoring & Reporting",
    description: "We track results, provide reports, and continuously refine strategy.",
  },
];

const shopifyServiceCards = [
  {
    title: "Custom Shopify Development",
    description: "Build online stores tailored to your unique business needs.",
    icon: "code" as const,
    items: [
      "Custom Shopify theme design & development",
      "App integration & plugin customization",
      "Mobile-first responsive design",
      "Scalable store architecture",
      "Performance & speed optimization",
    ],
  },
  {
    title: "Shopify Store Setup & Migration",
    description: "Launch or migrate your store smoothly and securely.",
    icon: "share" as const,
    items: [
      "Shopify store setup from scratch",
      "Migration from WooCommerce, Magento, or other platforms",
      "Data migration & inventory setup",
      "Payment gateway integration",
      "SEO-friendly store setup",
    ],
  },
  {
    title: "Shopify E-commerce Solutions",
    description: "High-converting online stores to maximize sales.",
    icon: "cart" as const,
    items: [
      "Product catalog & inventory management",
      "Custom checkout & cart optimization",
      "Multi-language & multi-currency support",
      "Secure payment processing",
    ],
  },
  {
    title: "Shopify Maintenance & Support",
    description: "Keep your store secure, updated, and performing well.",
    icon: "bag" as const,
    items: [
      "Regular updates & backups",
      "Performance & security monitoring",
      "Bug fixes & technical support",
      "App updates & compatibility checks",
    ],
  },
  {
    title: "Shopify Store Redesign",
    description: "Modernize your store for better UX and higher conversions.",
    icon: "layout" as const,
    items: [
      "UX/UI audit & redesign",
      "Visual refresh & branding updates",
      "Speed & mobile optimization",
      "SEO & marketing integration",
    ],
  },
];

const shopifyStats = [
  {
    label: "Proven Expertise",
    detail: "Shopify stores built for startups, SMEs, and growing enterprises.",
    metric: "7-14 Days",
    caption: "Average campaign launch time",
  },
  {
    label: "Conversion at the Core",
    detail: "Design, UX, and CRO principles blended to turn visitors into buyers.",
    metric: "100+",
    caption: "Projects successfully delivered",
  },
  {
    label: "Full Transparency",
    detail: "Clear timelines, regular updates, and honest communication.",
    metric: "95%",
    caption: "Client retention rate",
  },
  {
    label: "End-to-End Web Solutions",
    detail: "Design, development, CMS integration, and maintenance.",
    metric: "50+",
    caption: "Trusted clients",
  },
  {
    label: "Transparent Communication",
    detail: "Clear project updates and no hidden costs.",
    metric: "24/7",
    caption: "Support & assistance",
  },
  {
    label: "Proven Track Record",
    detail: "100+ websites delivered successfully.",
    metric: "5X ROI",
    caption: "Average return on ad spend",
  },
];

const shopifyProcess = [
  {
    title: "Consultation & Requirement Analysis",
    description: "Understand business goals, target audience, and functionality requirements.",
  },
  {
    title: "Design & Wireframing",
    description: "Create prototypes, mockups, and UI concepts.",
  },
  {
    title: "Development & Integration",
    description: "Build responsive, SEO-friendly stores with custom features.",
  },
  {
    title: "Launch & Delivery",
    description: "Go live with complete documentation and assets.",
  },
];

const socialMediaServiceCards = [
  {
    title: "Social Media Strategy",
    description: "Plan campaigns that deliver engagement and conversions.",
    icon: "spark" as const,
    items: [
      "Audience Research",
      "Strategy Planning",
      "Content Calendar",
      "Campaign Roadmap",
      "Competitor Analysis",
    ],
  },
  {
    title: "Content Creation & Design",
    description: "Create eye-catching visuals and engaging content tailored for each platform.",
    icon: "layout" as const,
    items: [
      "Graphics, Carousels, and Infographics",
      "Short-form Videos & Reels",
      "Copywriting for Posts & Ads",
      "Branded Templates & Consistent Style",
      "Interactive Content & Polls",
    ],
  },
  {
    title: "Paid Social Media Advertising",
    description: "Boost reach and generate leads with paid campaigns.",
    icon: "megaphone" as const,
    items: [
      "Facebook & Instagram Ads",
      "LinkedIn Ads & Sponsored Content",
      "YouTube Ads & Video Promotions",
      "Remarketing Campaigns",
      "Conversion Tracking",
    ],
  },
  {
    title: "Community Management",
    description: "Build relationships and maintain a loyal audience.",
    icon: "share" as const,
    items: [
      "Comment & Message Management",
      "Reputation Monitoring & Response",
      "Engagement Strategy & Contests",
      "Brand Voice Development",
      "Reporting on Community Metrics",
    ],
  },
  {
    title: "Analytics & Reporting",
    description: "Track performance, measure impact, and optimize campaigns.",
    icon: "chart" as const,
    items: [
      "Monthly Engagement & Growth Reports",
      "Campaign Performance Analysis",
      "Conversion & Lead Tracking",
      "Audience Insights & Recommendations",
      "Continuous Optimization",
    ],
  },
  {
    title: "Influencer & Partnership",
    description: "Amplify brand reach with trusted voices.",
    icon: "bag" as const,
    items: [
      "Influencer Research & Outreach",
      "Collaboration & Campaign Execution",
      "Sponsored Posts & Giveaways",
      "Micro & Macro Influencer Campaigns",
      "Performance Measurement & ROI Tracking",
    ],
  },
];

const socialMediaStats = [
  {
    label: "Expert & Experienced Team",
    detail: "Social media specialists with experience across industries and platforms.",
    metric: "7-14 Days",
    caption: "Average project timeline",
  },
  {
    label: "Data-Driven Campaigns",
    detail: "Every post and ad is backed by insights and analytics.",
    metric: "$2M+",
    caption: "Liability coverage",
  },
  {
    label: "Customized Strategies",
    detail: "Tailored solutions for your business goals and target audience.",
    metric: "1000+",
    caption: "Projects completed",
  },
  {
    label: "Transparent Reporting",
    detail: "Detailed performance reports and actionable insights.",
    metric: "300%",
    caption: "Average visibility increase",
  },
  {
    label: "End-to-End Social Media Services",
    detail: "Strategy, content creation, ads, and analytics managed in-house.",
    metric: "5-Year",
    caption: "Warranty included",
  },
  {
    label: "Long-Term Growth Focus",
    detail: "Sustainable engagement and ROI for every client.",
    metric: "24/7",
    caption: "Support available",
  },
];

const socialMediaProcess = [
  {
    title: "Consultation & Goal Setting",
    description: "Understand business objectives, audience, and KPIs.",
  },
  {
    title: "Strategy & Planning",
    description: "Craft a platform-specific content and advertising strategy.",
  },
  {
    title: "Content Creation",
    description: "Design posts, ads, and videos, then schedule campaigns.",
  },
  {
    title: "Reporting & Optimization",
    description: "Provide transparent monthly reports and refine campaigns for ROI.",
  },
];

const websiteDesignServiceCards = [
  {
    title: "Custom Website Design",
    description: "Design websites that are unique, visually appealing, and aligned with your brand.",
    icon: "spark" as const,
    items: [
      "Responsive & Mobile-Friendly Design",
      "Custom UI/UX Design",
      "Branding Integration & Visual Identity",
      "Interactive Elements & Animations",
      "Landing Page Design",
    ],
  },
  {
    title: "E-commerce Website Design",
    description: "Build online stores that convert visitors into customers.",
    icon: "cart" as const,
    items: [
      "Shopify & WooCommerce Store Design",
      "Product Catalog & Inventory Management",
      "Secure Payment Integration",
      "Conversion-Optimized Product Pages",
      "Custom Checkout & Cart Design",
    ],
  },
  {
    title: "Corporate Website Design",
    description: "Professional websites for businesses, startups, and enterprises.",
    icon: "layout" as const,
    items: [
      "Company & Portfolio Websites",
      "Service & Product Showcase Pages",
      "Team & About Us Pages",
      "Contact & Lead Capture Forms",
      "Multi-Language Support",
    ],
  },
  {
    title: "Landing Pages",
    description: "Design high-converting landing pages for campaigns.",
    icon: "megaphone" as const,
    items: [
      "Lead Generation Landing Pages",
      "Product Launch Microsites",
      "Campaign-Specific Pages",
      "A/B Testing & Conversion Optimization",
      "Integration with Marketing Tools",
    ],
  },
  {
    title: "Website Redesign",
    description: "Update outdated websites with modern, responsive designs.",
    icon: "pen" as const,
    items: [
      "UX/UI Audit & Analysis",
      "Visual Refresh & Branding Updates",
      "Performance & Speed Optimization",
      "SEO & Mobile Responsiveness",
      "Conversion-Focused Redesign",
    ],
  },
  {
    title: "Website Maintenance",
    description: "Keep your website secure, fast, and updated.",
    icon: "code" as const,
    items: [
      "Regular Updates & Backups",
      "Performance & Security Monitoring",
      "Content Updates & Optimization",
      "Bug Fixes & Technical Support",
      "Analytics & Reporting",
    ],
  },
];

const websiteDesignStats = [
  {
    label: "Creative & Modern Designs",
    detail: "Visually appealing websites that align with your brand identity.",
    metric: "7-14 Days",
    caption: "Average campaign launch time",
  },
  {
    label: "User Experience Focused",
    detail: "Intuitive navigation and seamless UX for higher engagement.",
    metric: "100+",
    caption: "Projects successfully delivered",
  },
  {
    label: "Responsive & SEO-Friendly",
    detail: "Mobile-friendly designs optimized for search engines.",
    metric: "95%",
    caption: "Client retention rate",
  },
  {
    label: "Transparent & Timely Delivery",
    detail: "Clear timelines and updates for every project.",
    metric: "50+",
    caption: "Trusted clients",
  },
  {
    label: "End-to-End Solutions",
    detail: "Design, development, CMS, and maintenance under one roof.",
    metric: "24/7",
    caption: "Support & assistance",
  },
  {
    label: "Long-Term Partnership",
    detail: "Ongoing website updates, growth, and optimization.",
    metric: "5X ROI",
    caption: "Average return on ad spend",
  },
];

const websiteDesignProcess = [
  {
    title: "Consultation & Requirement Gathering",
    description: "Understand your business, goals, and target audience.",
  },
  {
    title: "Design & Concept Development",
    description: "Create mockups, wireframes, and UI concepts.",
  },
  {
    title: "Development & Integration",
    description: "Code your website with responsive, SEO-friendly standards.",
  },
  {
    title: "Launch & Delivery",
    description: "Deploy the website live with all assets and documentation.",
  },
];

const websiteDevelopmentServiceCards = [
  {
    title: "Custom Website Development",
    description: "Tailored websites designed for your unique business needs.",
    icon: "code" as const,
    items: [
      "Custom web design & development",
      "CMS integration (WordPress, Drupal, Joomla)",
      "Responsive & mobile-friendly layouts",
      "Scalable architecture for growth",
      "Speed & performance optimization",
    ],
  },
  {
    title: "E-commerce Website Development",
    description: "Build online stores that convert visitors into customers.",
    icon: "cart" as const,
    items: [
      "Shopify & WooCommerce development",
      "Product catalog & inventory management",
      "Secure payment gateway integration",
      "Conversion-focused product pages",
      "Custom checkout & cart functionality",
    ],
  },
  {
    title: "Corporate Website Development",
    description: "Professional websites for businesses and enterprises.",
    icon: "layout" as const,
    items: [
      "Company & portfolio websites",
      "Service & product showcase pages",
      "Contact & lead capture forms",
      "Multi-language support",
    ],
  },
  {
    title: "Landing Pages",
    description: "High-converting landing pages for campaigns.",
    icon: "megaphone" as const,
    items: [
      "Lead generation landing pages",
      "Product launch microsites",
      "Campaign-specific pages",
      "A/B testing & conversion optimization",
    ],
  },
  {
    title: "Website Redesign",
    description: "Upgrade outdated websites for modern performance.",
    icon: "pen" as const,
    items: [
      "UX/UI audit & redesign",
      "Visual refresh & branding updates",
      "Mobile & speed optimization",
      "SEO-friendly development",
    ],
  },
  {
    title: "Website Maintenance",
    description: "Keep your website secure, fast, and updated.",
    icon: "wordpress" as const,
    items: [
      "Regular updates & backups",
      "Security & performance monitoring",
      "Content updates & optimization",
      "Bug fixes & technical support",
    ],
  },
];

const websiteDevelopmentStats = [
  {
    label: "Custom & Scalable Solutions",
    detail: "Websites tailored to your business goals and growth.",
    metric: "7-14 Days",
    caption: "Average campaign launch time",
  },
  {
    label: "Responsive & SEO-Friendly",
    detail: "Mobile-first designs optimized for search engines.",
    metric: "100+",
    caption: "Projects successfully delivered",
  },
  {
    label: "Experienced Development Team",
    detail: "Certified developers with years of experience.",
    metric: "95%",
    caption: "Client retention rate",
  },
  {
    label: "End-to-End Web Solutions",
    detail: "Design, development, CMS integration, and maintenance.",
    metric: "50+",
    caption: "Trusted clients",
  },
  {
    label: "Transparent Communication",
    detail: "Clear project updates and no hidden costs.",
    metric: "24/7",
    caption: "Support & assistance",
  },
  {
    label: "Proven Track Record",
    detail: "100+ websites delivered successfully.",
    metric: "5X ROI",
    caption: "Average return on ad spend",
  },
];

const websiteDevelopmentProcess = [
  {
    title: "Consultation & Requirement Analysis",
    description: "Understand business goals, target audience, and functionality requirements.",
  },
  {
    title: "Design & Wireframing",
    description: "Create prototypes, mockups, and UI concepts.",
  },
  {
    title: "Development & Integration",
    description: "Build responsive, SEO-friendly stores with custom features.",
  },
  {
    title: "Launch & Delivery",
    description: "Go live with complete documentation and assets.",
  },
];

const wordpressServiceCards = [
  {
    title: "Custom WordPress Development",
    description: "Build websites that are unique, fully functional, and scalable.",
    icon: "wordpress" as const,
    items: [
      "Custom theme design & development",
      "Plugin development & customization",
      "Responsive & mobile-friendly layouts",
      "Multi-language & multi-site support",
      "Performance & speed optimization",
    ],
  },
  {
    title: "WordPress Website Design",
    description: "Create visually appealing, user-friendly websites that reflect your brand.",
    icon: "layout" as const,
    items: [
      "UX/UI-focused design",
      "Landing page & microsite design",
      "Branding & visual identity integration",
      "Interactive elements & animations",
      "Conversion-oriented layouts",
    ],
  },
  {
    title: "WooCommerce & E-commerce WordPress",
    description: "Transform your WordPress site into a high-converting online store.",
    icon: "cart" as const,
    items: [
      "WooCommerce store setup & customization",
      "Payment gateway & inventory management",
      "Product catalog & checkout optimization",
      "Custom features & plugin integration",
    ],
  },
  {
    title: "WordPress Website Maintenance",
    description: "Ensure your website remains secure, fast, and updated.",
    icon: "code" as const,
    items: [
      "Regular updates & backups",
      "Security & performance monitoring",
      "Bug fixes & technical support",
      "Analytics & reporting",
    ],
  },
  {
    title: "WordPress Website Redesign",
    description: "Upgrade outdated websites with modern designs and improved UX.",
    icon: "pen" as const,
    items: [
      "UX/UI audit & analysis",
      "Visual refresh & brand updates",
      "Speed & mobile optimization",
      "SEO-friendly redesign",
    ],
  },
];

const wordpressStats = [
  {
    label: "Custom & Scalable Solutions",
    detail: "Websites tailored for your business goals and growth.",
    metric: "7-14 Days",
    caption: "Average campaign launch time",
  },
  {
    label: "SEO & Mobile-Friendly Designs",
    detail: "Optimized for search engines and all devices.",
    metric: "100+",
    caption: "Projects successfully delivered",
  },
  {
    label: "Experienced WordPress Experts",
    detail: "Certified developers with years of experience.",
    metric: "95%",
    caption: "Client retention rate",
  },
  {
    label: "End-to-End Services",
    detail: "Design, development, plugin integration, and maintenance.",
    metric: "50+",
    caption: "Trusted clients",
  },
  {
    label: "Transparent Communication & Timelines",
    detail: "Clear project updates and no hidden costs.",
    metric: "24/7",
    caption: "Support & assistance",
  },
  {
    label: "Proven Track Record",
    detail: "100+ WordPress websites delivered successfully.",
    metric: "5X ROI",
    caption: "Average return on ad spend",
  },
];

const wordpressProcess = [
  {
    title: "Consultation & Requirement Analysis",
    description: "Understand your business, goals, and target audience.",
  },
  {
    title: "Design & Wireframing",
    description: "Create prototypes and UI concepts tailored to your brand.",
  },
  {
    title: "Development & Integration",
    description: "Build responsive, secure, and SEO-friendly websites.",
  },
  {
    title: "Launch & Delivery",
    description: "Go live with full assets, documentation, and support.",
  },
];

const hiddenDeliverySlugs = new Set([
  "advertising-services",
  "branding-services",
  "content-writing",
  "ecommerce-development",
  "ppc-management",
  "seo-service",
  "shopify-development",
  "social-media-marketing",
  "website-design",
  "website-development",
  "wordpress-development",
]);

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service not found | SiteOnLab",
    };
  }

  return {
    title: `${service.title} | SiteOnLab`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const relatedServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <main
      className={styles.main}
      style={{ "--service-accent": service.accent } as CSSProperties}
    >
      <section className={styles.hero}>
        <div className={styles.container}>
          <Link href="/services" className={styles.backLink}>
            <span aria-hidden="true">&lt;</span>
            Services
          </Link>

          <div className={styles.heroGrid}>
            <div>
              <div className={styles.iconBadge}>
                <ServiceIcon name={service.icon} />
              </div>
              <h1 className={styles.title}>{service.title}</h1>
              <p className={styles.subtitle}>{service.description}</p>
              <Link href="/contact" className={styles.primaryCta}>
                Discuss your project
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>

            <div className={styles.promisePanel}>
              <span className={styles.panelLabel}>What you get</span>
              <p>{service.promise}</p>
              <div className={styles.quickList}>
                {service.deliverables.slice(0, 4).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className={styles.signalDeck} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.focusSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Service focus</span>
            <h2>{service.focusTitle}</h2>
            <p>{service.focusIntro}</p>
          </div>

          <div className={styles.focusGrid}>
            {service.focusBullets.map((item, index) => (
              <div className={styles.focusCard} key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {service.slug === "advertising-services" ? (
        <section className={styles.advertisingSection}>
          <div className={styles.container}>
            <div className={styles.advertisingHeader}>
              <h2>Our Advertising Services</h2>
              <p>
                We provide full-service advertising solutions to help brands reach,
                engage, and convert their target audience.
              </p>
            </div>

            <div className={styles.advertisingGrid}>
              {advertisingCapabilityCards.map((card) => (
                <article className={styles.advertisingCard} key={card.title}>
                  <div className={styles.advertisingIcon}>
                    <ServiceIcon name={card.icon} />
                  </div>
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={styles.advertisingLink}>
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : service.slug === "branding-services" ? (
        <section className={styles.brandingSection}>
          <div className={styles.container}>
            <div className={styles.brandingIntroGrid}>
              <div>
                <span className={styles.kicker}>Branding agency in Ahmedabad</span>
                <h2>What does a branding agency actually build?</h2>
              </div>
              <p>
                A branding agency builds the foundation for how your business is perceived.
                At SiteOnLab, we craft identities that are visually distinctive,
                strategically positioned, and designed to attract ideal customers,
                build trust, and support long-term growth.
              </p>
            </div>

            <div className={styles.brandingHeader}>
              <span className={styles.kicker}>Our branding services</span>
              <h2>Brand systems designed for Ahmedabad businesses with bigger ambitions.</h2>
            </div>

            <div className={styles.brandingCardsGrid}>
              {brandingServiceCards.map((card, index) => (
                <article className={styles.brandingCard} key={card.title}>
                  <span className={styles.brandingCardNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <div className={styles.brandingTags}>
                    {card.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.brandingProofGrid}>
              <div className={styles.brandingProofPanel}>
                <span className={styles.kicker}>Why choose SiteOnLab</span>
                <h2>Strategic thinking, creative excellence, and local market fluency.</h2>
                <p>
                  We have worked with 200+ businesses across Gujarat and beyond,
                  combining collaborative process, transparent communication, and
                  globally competitive brand execution.
                </p>
              </div>

              <div className={styles.brandingIndustriesPanel}>
                <h3>Industries we brand</h3>
                <div className={styles.brandingIndustryList}>
                  {brandingIndustries.map((industry) => (
                    <span key={industry}>{industry}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.brandingFaqSection}>
              <div className={styles.brandingFaqHeader}>
                <span className={styles.kicker}>Branding FAQs</span>
                <h2>Quick answers before we shape the brief.</h2>
              </div>
              <div className={styles.brandingFaqGrid}>
                {brandingFaqs.map((faq) => (
                  <article className={styles.brandingFaqCard} key={faq.question}>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : service.slug === "content-writing" ? (
        <section className={styles.contentWritingSection}>
          <div className={styles.container}>
            <div className={styles.contentWritingHeader}>
              <span className={styles.kicker}>Content writing services</span>
              <h2>Content that ranks, explains, and converts.</h2>
              <p>
                From SEO blogs to landing pages and technical content, we shape words
                around audience intent, business goals, and measurable growth.
              </p>
            </div>

            <div className={styles.contentWritingGrid}>
              {contentWritingCards.map((card) => (
                <article className={styles.contentWritingCard} key={card.title}>
                  <div className={styles.contentWritingIcon}>
                    <ServiceIcon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={styles.contentWritingLink}>
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.contentWritingStatsSection}>
              <div className={styles.contentWritingStatsHeader}>
                <span className={styles.kicker}>Why choose us</span>
                <h2>Why choose our content writing company?</h2>
                <p>
                  We combine creativity, SEO expertise, and business insight to deliver
                  content that performs.
                </p>
              </div>

              <div className={styles.contentWritingStatsGrid}>
                {contentWritingStats.map((stat) => (
                  <article className={styles.contentWritingStatCard} key={stat.label}>
                    <h3>{stat.label}</h3>
                    <p>{stat.detail}</p>
                    <strong>{stat.metric}</strong>
                    <span>{stat.caption}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.contentWritingProcessSection}>
              <div className={styles.contentWritingStatsHeader}>
                <span className={styles.kicker}>Our process</span>
                <h2>Our trusted content writing process</h2>
                <p>
                  We follow a proven, transparent process to ensure every project
                  delivers ROI.
                </p>
              </div>

              <div className={styles.contentWritingProcessGrid}>
                {contentWritingProcess.map((step, index) => (
                  <article className={styles.contentWritingProcessCard} key={step.title}>
                    <span>{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : service.slug === "ecommerce-development" ? (
        <section className={styles.ecommerceSection}>
          <div className={styles.container}>
            <div className={styles.ecommerceHeader}>
              <span className={styles.kicker}>Ecommerce development services</span>
              <h2>Our Ecommerce Development Services</h2>
              <p>
                We deliver end-to-end ecommerce website development services that
                combine design, usability, and performance.
              </p>
            </div>

            <div className={styles.ecommerceGrid}>
              {ecommerceServiceCards.map((card) => (
                <article className={styles.ecommerceCard} key={card.title}>
                  <div className={styles.ecommerceIcon}>
                    <ServiceIcon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={styles.ecommerceLink}>
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.ecommerceStatsSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Why choose us</span>
                <h2>Why choose our ecommerce development agency?</h2>
                <p>
                  We combine creativity, usability, and strategy to deliver stores
                  that perform.
                </p>
              </div>

              <div className={styles.ecommerceStatsGrid}>
                {ecommerceStats.map((stat) => (
                  <article className={styles.ecommerceStatCard} key={stat.label}>
                    <h3>{stat.label}</h3>
                    <p>{stat.detail}</p>
                    <strong>{stat.metric}</strong>
                    <span>{stat.caption}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.ecommerceProcessSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Our process</span>
                <h2>Our trusted ecommerce development process</h2>
                <p>
                  As a leading ecommerce development team in Ahmedabad, we follow
                  a systematic approach to maximize ROI.
                </p>
              </div>

              <div className={styles.ecommerceProcessGrid}>
                {ecommerceProcess.map((step, index) => (
                  <article className={styles.ecommerceProcessCard} key={step.title}>
                    <span>{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : service.slug === "ppc-management" ? (
        <section className={styles.ecommerceSection}>
          <div className={styles.container}>
            <div className={styles.ecommerceHeader}>
              <span className={styles.kicker}>PPC services in Ahmedabad</span>
              <h2>Our PPC Services in Ahmedabad</h2>
              <p>
                We provide full-service PPC advertising solutions to help you reach
                your audience and achieve measurable results.
              </p>
            </div>

            <div className={styles.ecommerceGrid}>
              {ppcServiceCards.map((card) => (
                <article className={styles.ecommerceCard} key={card.title}>
                  <div className={styles.ecommerceIcon}>
                    <ServiceIcon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={styles.ecommerceLink}>
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.ecommerceStatsSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Why choose us</span>
                <h2>Why choose our PPC company in Ahmedabad?</h2>
                <p>
                  We focus on delivering measurable results and maximizing ROI for
                  every client.
                </p>
              </div>

              <div className={styles.ecommerceStatsGrid}>
                {ppcStats.map((stat) => (
                  <article className={styles.ecommerceStatCard} key={stat.label}>
                    <h3>{stat.label}</h3>
                    <p>{stat.detail}</p>
                    <strong>{stat.metric}</strong>
                    <span>{stat.caption}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.ecommerceProcessSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Our process</span>
                <h2>Our trusted PPC process</h2>
                <p>
                  We make the process simple, strategic, and results-driven so you
                  can stay focused on growth while campaigns improve.
                </p>
              </div>

              <div className={styles.ecommerceProcessGrid}>
                {ppcProcess.map((step, index) => (
                  <article className={styles.ecommerceProcessCard} key={step.title}>
                    <span>{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : service.slug === "seo-service" ? (
        <section className={styles.ecommerceSection}>
          <div className={styles.container}>
            <div className={styles.ecommerceHeader}>
              <span className={styles.kicker}>SEO services in Ahmedabad</span>
              <h2>Our SEO Services in Ahmedabad</h2>
              <p>
                As a leading SEO agency in Ahmedabad, we provide comprehensive
                solutions to increase your website traffic, improve rankings, and
                drive business growth.
              </p>
            </div>

            <div className={styles.ecommerceGrid}>
              {seoServiceCards.map((card) => (
                <article className={styles.ecommerceCard} key={card.title}>
                  <div className={styles.ecommerceIcon}>
                    <ServiceIcon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={styles.ecommerceLink}>
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.ecommerceStatsSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Why choose us</span>
                <h2>Why choose our SEO company in Ahmedabad?</h2>
                <p>
                  We go beyond rankings. We focus on driving traffic, leads, and
                  business growth.
                </p>
              </div>

              <div className={styles.ecommerceStatsGrid}>
                {seoStats.map((stat) => (
                  <article className={styles.ecommerceStatCard} key={stat.label}>
                    <h3>{stat.label}</h3>
                    <p>{stat.detail}</p>
                    <strong>{stat.metric}</strong>
                    <span>{stat.caption}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.ecommerceProcessSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Our process</span>
                <h2>Our trusted SEO process</h2>
                <p>
                  As a leading SEO agency in Ahmedabad, we follow a systematic
                  approach to maximize ROI.
                </p>
              </div>

              <div className={styles.ecommerceProcessGrid}>
                {seoProcess.map((step, index) => (
                  <article className={styles.ecommerceProcessCard} key={step.title}>
                    <span>{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : service.slug === "shopify-development" ? (
        <section className={styles.ecommerceSection}>
          <div className={styles.container}>
            <div className={styles.ecommerceHeader}>
              <span className={styles.kicker}>Shopify development services</span>
              <h2>Our Shopify Development Services</h2>
              <p>
                We provide end-to-end Shopify development solutions to help your
                business sell online effectively.
              </p>
            </div>

            <div className={styles.ecommerceGrid}>
              {shopifyServiceCards.map((card) => (
                <article className={styles.ecommerceCard} key={card.title}>
                  <div className={styles.ecommerceIcon}>
                    <ServiceIcon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={styles.ecommerceLink}>
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.ecommerceStatsSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Why choose us</span>
                <h2>Why choose our Shopify development company?</h2>
                <p>
                  Working with us means partnering with a team that understands
                  both technology and business.
                </p>
              </div>

              <div className={styles.ecommerceStatsGrid}>
                {shopifyStats.map((stat) => (
                  <article className={styles.ecommerceStatCard} key={stat.label}>
                    <h3>{stat.label}</h3>
                    <p>{stat.detail}</p>
                    <strong>{stat.metric}</strong>
                    <span>{stat.caption}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.ecommerceProcessSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Our process</span>
                <h2>Our Shopify development process</h2>
                <p>
                  As a leading Shopify development team in Ahmedabad, we follow a
                  systematic approach to maximize ROI.
                </p>
              </div>

              <div className={styles.ecommerceProcessGrid}>
                {shopifyProcess.map((step, index) => (
                  <article className={styles.ecommerceProcessCard} key={step.title}>
                    <span>{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : service.slug === "social-media-marketing" ? (
        <section className={styles.ecommerceSection}>
          <div className={styles.container}>
            <div className={styles.ecommerceHeader}>
              <span className={styles.kicker}>Social media marketing services</span>
              <h2>Our Social Media Marketing Services in Ahmedabad</h2>
              <p>
                We provide full-service social media marketing to help your brand
                reach the right audience and achieve measurable growth.
              </p>
            </div>

            <div className={styles.ecommerceGrid}>
              {socialMediaServiceCards.map((card) => (
                <article className={styles.ecommerceCard} key={card.title}>
                  <div className={styles.ecommerceIcon}>
                    <ServiceIcon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={styles.ecommerceLink}>
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.ecommerceStatsSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Why choose us</span>
                <h2>Why choose our social media marketing agency in Ahmedabad?</h2>
                <p>
                  We combine creativity, strategy, and analytics to deliver
                  measurable results for every client.
                </p>
              </div>

              <div className={styles.ecommerceStatsGrid}>
                {socialMediaStats.map((stat) => (
                  <article className={styles.ecommerceStatCard} key={stat.label}>
                    <h3>{stat.label}</h3>
                    <p>{stat.detail}</p>
                    <strong>{stat.metric}</strong>
                    <span>{stat.caption}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.ecommerceProcessSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Our process</span>
                <h2>Our trusted social media process</h2>
                <p>
                  We follow a clear, measurable workflow to plan, publish, report,
                  and optimize your social media presence.
                </p>
              </div>

              <div className={styles.ecommerceProcessGrid}>
                {socialMediaProcess.map((step, index) => (
                  <article className={styles.ecommerceProcessCard} key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : service.slug === "website-design" ? (
        <section className={styles.ecommerceSection}>
          <div className={styles.container}>
            <div className={styles.ecommerceHeader}>
              <span className={styles.kicker}>Website design services</span>
              <h2>Our Website Design Services in Ahmedabad</h2>
              <p>
                We provide end-to-end website design solutions that combine
                aesthetics, functionality, and performance.
              </p>
            </div>

            <div className={styles.ecommerceGrid}>
              {websiteDesignServiceCards.map((card) => (
                <article className={styles.ecommerceCard} key={card.title}>
                  <div className={styles.ecommerceIcon}>
                    <ServiceIcon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={styles.ecommerceLink}>
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.ecommerceStatsSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Why choose us</span>
                <h2>Why choose our website design company in Ahmedabad?</h2>
                <p>
                  We combine creativity, usability, and strategy to deliver websites
                  that perform.
                </p>
              </div>

              <div className={styles.ecommerceStatsGrid}>
                {websiteDesignStats.map((stat) => (
                  <article className={styles.ecommerceStatCard} key={stat.label}>
                    <h3>{stat.label}</h3>
                    <p>{stat.detail}</p>
                    <strong>{stat.metric}</strong>
                    <span>{stat.caption}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.ecommerceProcessSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Our process</span>
                <h2>Our trusted website design process</h2>
                <p>
                  We follow a systematic approach to shape a clear, responsive, and
                  conversion-ready website experience.
                </p>
              </div>

              <div className={styles.ecommerceProcessGrid}>
                {websiteDesignProcess.map((step, index) => (
                  <article className={styles.ecommerceProcessCard} key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : service.slug === "website-development" ? (
        <section className={styles.ecommerceSection}>
          <div className={styles.container}>
            <div className={styles.ecommerceHeader}>
              <span className={styles.kicker}>Website development services</span>
              <h2>Our Website Development Services in Ahmedabad</h2>
              <p>
                We provide end-to-end website development services to deliver
                functional, high-quality websites.
              </p>
            </div>

            <div className={styles.ecommerceGrid}>
              {websiteDevelopmentServiceCards.map((card) => (
                <article className={styles.ecommerceCard} key={card.title}>
                  <div className={styles.ecommerceIcon}>
                    <ServiceIcon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={styles.ecommerceLink}>
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.ecommerceStatsSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Why choose us</span>
                <h2>Why choose our website development company in Ahmedabad?</h2>
                <p>
                  We combine creativity, technology, and strategy to build websites
                  that perform and convert.
                </p>
              </div>

              <div className={styles.ecommerceStatsGrid}>
                {websiteDevelopmentStats.map((stat) => (
                  <article className={styles.ecommerceStatCard} key={stat.label}>
                    <h3>{stat.label}</h3>
                    <p>{stat.detail}</p>
                    <strong>{stat.metric}</strong>
                    <span>{stat.caption}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.ecommerceProcessSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Our process</span>
                <h2>Our website development process</h2>
                <p>
                  We follow a systematic approach to shape responsive, scalable,
                  and conversion-ready websites.
                </p>
              </div>

              <div className={styles.ecommerceProcessGrid}>
                {websiteDevelopmentProcess.map((step, index) => (
                  <article className={styles.ecommerceProcessCard} key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : service.slug === "wordpress-development" ? (
        <section className={styles.ecommerceSection}>
          <div className={styles.container}>
            <div className={styles.ecommerceHeader}>
              <span className={styles.kicker}>WordPress development services</span>
              <h2>Our WordPress Development Services in Ahmedabad</h2>
              <p>
                As one of the leading WordPress development companies in Ahmedabad,
                we offer end-to-end services designed to help businesses build
                powerful websites that perform.
              </p>
            </div>

            <div className={styles.ecommerceGrid}>
              {wordpressServiceCards.map((card) => (
                <article className={styles.ecommerceCard} key={card.title}>
                  <div className={styles.ecommerceIcon}>
                    <ServiceIcon name={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className={styles.ecommerceLink}>
                    Learn More
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.ecommerceStatsSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Why choose us</span>
                <h2>Why choose our WordPress development company in Ahmedabad?</h2>
                <p>
                  We combine creativity, usability, and strategy to deliver websites
                  that perform.
                </p>
              </div>

              <div className={styles.ecommerceStatsGrid}>
                {wordpressStats.map((stat) => (
                  <article className={styles.ecommerceStatCard} key={stat.label}>
                    <h3>{stat.label}</h3>
                    <p>{stat.detail}</p>
                    <strong>{stat.metric}</strong>
                    <span>{stat.caption}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.ecommerceProcessSection}>
              <div className={styles.ecommerceStatsHeader}>
                <span className={styles.kicker}>Our process</span>
                <h2>Our WordPress development process</h2>
                <p>
                  As a trusted WordPress website development company in Ahmedabad,
                  we follow a structured approach to ensure quality and results.
                </p>
              </div>

              <div className={styles.ecommerceProcessGrid}>
                {wordpressProcess.map((step, index) => (
                  <article className={styles.ecommerceProcessCard} key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : !hiddenDeliverySlugs.has(service.slug) ? (
        <section className={styles.deliverySection}>
          <div className={styles.container}>
            <div className={styles.deliveryGrid}>
              <div>
                <span className={styles.kicker}>Delivery</span>
                <h2>Same disciplined workflow, shaped for {service.navTitle.toLowerCase()}.</h2>
              </div>

              <div className={styles.deliveryColumns}>
                <div className={styles.listPanel}>
                  <h3>Deliverables</h3>
                  <ul>
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.listPanel}>
                  <h3>Process</h3>
                  <ol>
                    {service.process.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {!hiddenDeliverySlugs.has(service.slug) && (
        <section className={styles.outcomesSection}>
          <div className={styles.container}>
            <div className={styles.outcomesGrid}>
              {service.outcomes.map((outcome) => (
                <div className={styles.outcomeCard} key={outcome}>
                  <span />
                  <h3>{outcome}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.relatedSection}>
        <div className={styles.container}>
          <div className={styles.relatedHeader}>
            <div>
              <span className={styles.kicker}>Explore more</span>
              <h2>Related services</h2>
            </div>
            <Link href="/services" className={styles.textLink}>
              View all services
            </Link>
          </div>

          <div className={styles.relatedGrid}>
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className={styles.relatedCard}
                style={{ "--service-accent": item.accent } as CSSProperties}
              >
                <ServiceIcon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.testimonialsHeader}>
            <h2>What Our Clients Say</h2>
            <p>
              Don&apos;t just take our word for it. Hear from business owners who
              have transformed their visibility with our professional digital
              solutions.
            </p>
            <div className={styles.reviewSummary} aria-label="5.0 rating from 200 plus reviews">
              <span aria-hidden="true">★★★★★</span>
              <strong>5.0</strong>
              <b>200+ Reviews</b>
            </div>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <article className={styles.testimonialCard} key={testimonial.name}>
                <div className={styles.quoteBadge} aria-hidden="true">
                  &quot;
                </div>
                <div className={styles.testimonialStars} aria-hidden="true">
                  ★★★★★
                </div>
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
