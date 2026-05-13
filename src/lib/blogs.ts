export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  commentsCount: string | number;
  imageUrl: string;
  accent: string;
}

export const blogs: BlogPost[] = [
  {
    id: "1",
    slug: "top-10-link-building-tools-2025",
    title: "Top 10 Link Building Tools to Boost Your SEO in 2025",
    category: "SEO",
    date: "October 10, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
    accent: "#3b82f6",
  },
  {
    id: "2",
    slug: "content-gap-analysis-seo",
    title: "Content Gap Analysis for SEO: How to Outrank Your Competitors",
    category: "SEO",
    date: "October 10, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    accent: "#10b981",
  },
  {
    id: "3",
    slug: "future-of-seo-2025-predictions",
    title: "The Future of SEO: Trends and Predictions for 2025 and Beyond",
    category: "SEO",
    date: "October 1, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    accent: "#8b5cf6",
  },
  {
    id: "4",
    slug: "what-is-topical-authority",
    title: "What is Topical Authority?",
    category: "SEO",
    date: "September 30, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop",
    accent: "#f59e0b",
  },
  {
    id: "5",
    slug: "seo-vs-ppc-which-strategy",
    title: "SEO vs PPC: Which Strategy is Right for Your Business?",
    category: "Marketing",
    date: "September 30, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop",
    accent: "#ec4899",
  },
  {
    id: "6",
    slug: "answer-engine-optimization-ai",
    title: "Answer Engine Optimization: How AI is Transforming Search in 2025",
    category: "AI & Search",
    date: "September 30, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    accent: "#06b6d4",
  }
];
