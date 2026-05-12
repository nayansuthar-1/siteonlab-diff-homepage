export type Location = {
  name: string;
  slug: string;
  accent: string;
  region: string;
  marketNote: string;
  heroLine: string;
  industries: string[];
};

export const locations: Location[] = [
  {
    name: "Bangalore",
    slug: "bangalore",
    accent: "#f59e0b",
    region: "Karnataka",
    marketNote: "startup, SaaS, education, and service brands competing in a fast-moving tech market",
    heroLine: "performance marketing for ambitious Bangalore companies",
    industries: ["SaaS", "Education", "Healthcare", "Real Estate"],
  },
  {
    name: "Chennai",
    slug: "chennai",
    accent: "#06b6d4",
    region: "Tamil Nadu",
    marketNote: "manufacturing, healthcare, finance, and retail businesses building stronger digital demand",
    heroLine: "digital campaigns built for Chennai's growth-minded brands",
    industries: ["Manufacturing", "Healthcare", "Finance", "Retail"],
  },
  {
    name: "Delhi",
    slug: "delhi",
    accent: "#ef4444",
    region: "NCR",
    marketNote: "high-volume B2B, retail, real estate, and professional service brands across the capital region",
    heroLine: "visibility, leads, and authority for Delhi businesses",
    industries: ["Real Estate", "Professional Services", "Retail", "Events"],
  },
  {
    name: "Hyderabad",
    slug: "hyderabad",
    accent: "#8b5cf6",
    region: "Telangana",
    marketNote: "technology, healthcare, education, and real estate companies scaling across competitive search markets",
    heroLine: "conversion-first digital marketing for Hyderabad brands",
    industries: ["Technology", "Healthcare", "Education", "Real Estate"],
  },
  {
    name: "Jaipur",
    slug: "jaipur",
    accent: "#f97316",
    region: "Rajasthan",
    marketNote: "tourism, jewellery, fashion, local retail, and emerging D2C brands ready for sharper digital presence",
    heroLine: "premium marketing for Jaipur brands with wider ambitions",
    industries: ["Tourism", "Jewellery", "Fashion", "D2C"],
  },
  {
    name: "Kolkata",
    slug: "kolkata",
    accent: "#10b981",
    region: "West Bengal",
    marketNote: "education, healthcare, retail, and culture-led businesses turning local reputation into measurable demand",
    heroLine: "search, social, and content growth for Kolkata businesses",
    industries: ["Education", "Healthcare", "Retail", "Hospitality"],
  },
  {
    name: "Mumbai",
    slug: "mumbai",
    accent: "#eab308",
    region: "Maharashtra",
    marketNote: "finance, media, real estate, hospitality, and premium consumer brands competing for attention",
    heroLine: "high-intent digital marketing for Mumbai's most competitive markets",
    industries: ["Finance", "Media", "Real Estate", "Hospitality"],
  },
  {
    name: "Pune",
    slug: "pune",
    accent: "#ec4899",
    region: "Maharashtra",
    marketNote: "IT, education, manufacturing, real estate, and lifestyle brands looking for consistent qualified leads",
    heroLine: "smart growth systems for Pune companies",
    industries: ["IT Services", "Education", "Manufacturing", "Lifestyle"],
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
