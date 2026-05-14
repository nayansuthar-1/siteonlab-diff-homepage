export interface Resource {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  commentsCount: string | number;
  imageUrl: string;
  accent: string;
}

export const resources: Resource[] = [
  {
    id: "1",
    slug: "digital-marketing-strategy-small-business",
    title: "Digital Marketing Strategy For Small Business",
    category: "Case Study",
    date: "September 29, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
    accent: "#3b82f6",
  },
  {
    id: "2",
    slug: "ecommerce-revenue-optimization",
    title: "E-commerce Revenue Optimization: A 300% Growth Story",
    category: "Case Study",
    date: "September 25, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    accent: "#10b981",
  },
  {
    id: "3",
    slug: "local-seo-domination",
    title: "Local SEO Domination: Ranking #1 in Competitive Markets",
    category: "Case Study",
    date: "September 20, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1432882335132-01ad7a827264?q=80&w=800&auto=format&fit=crop",
    accent: "#f59e0b",
  },
  {
    id: "4",
    slug: "b2b-lead-generation-framework",
    title: "B2B Lead Generation: Creating a Sustainable Sales Pipeline",
    category: "Strategy",
    date: "September 15, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    accent: "#8b5cf6",
  },
  {
    id: "5",
    slug: "brand-identity-revamp",
    title: "Brand Identity Revamp: Modernizing a Legacy Tech Brand",
    category: "Case Study",
    date: "September 10, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    accent: "#ec4899",
  },
  {
    id: "6",
    slug: "social-media-viral-campaign",
    title: "The Anatomy of a Viral Social Media Campaign",
    category: "Strategy",
    date: "September 5, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
    accent: "#06b6d4",
  }
];

export function getResourceBySlug(slug: string) {
  return resources.find((res) => res.slug === slug);
}
