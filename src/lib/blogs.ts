import "server-only";
import { ObjectId, type Collection, type WithId, type Document } from "mongodb";
import { getDb } from "./mongodb";

export interface BlogSection {
  title: string;
  content: string;
  list?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  commentsCount: string | number;
  imageUrl: string;
  accent: string;
  sections: BlogSection[];
}

export type BlogInput = Omit<BlogPost, "id">;

const COLLECTION = "blogs";

async function blogsCollection(): Promise<Collection<Document>> {
  const db = await getDb();
  return db.collection(COLLECTION);
}

function serialize(doc: WithId<Document>): BlogPost {
  return {
    id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    date: doc.date,
    commentsCount: doc.commentsCount,
    imageUrl: doc.imageUrl,
    accent: doc.accent,
    sections: doc.sections ?? [],
  };
}

/** Inserts the starter content the first time the collection is empty. */
async function ensureSeeded(col: Collection<Document>): Promise<void> {
  const count = await col.estimatedDocumentCount();
  if (count > 0) return;
  const now = Date.now();
  await col.insertMany(
    seedBlogs.map((b, i) => ({ ...b, createdAt: new Date(now - i * 1000) }))
  );
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  const col = await blogsCollection();
  await ensureSeeded(col);
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(serialize);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const col = await blogsCollection();
  await ensureSeeded(col);
  const doc = await col.findOne({ slug });
  return doc ? serialize(doc) : null;
}

export async function getBlogById(id: string): Promise<BlogPost | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await blogsCollection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  return doc ? serialize(doc) : null;
}

export async function createBlog(input: BlogInput): Promise<string> {
  const col = await blogsCollection();
  const res = await col.insertOne({ ...input, createdAt: new Date() });
  return res.insertedId.toString();
}

export async function updateBlog(id: string, input: BlogInput): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await blogsCollection();
  const res = await col.updateOne({ _id: new ObjectId(id) }, { $set: { ...input } });
  return res.matchedCount > 0;
}

export async function deleteBlog(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await blogsCollection();
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}

// ---------------------------------------------------------------------------
// Starter content (seeded into MongoDB on first run, then managed via /admin)
// ---------------------------------------------------------------------------
export const seedBlogs: BlogInput[] = [
  {
    slug: "top-10-link-building-tools-2025",
    title: "Top 10 Link Building Tools to Boost Your SEO in 2025",
    excerpt: "Discover the most powerful link building tools that are dominating the SEO landscape in 2025.",
    category: "SEO",
    date: "October 10, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
    accent: "#3b82f6",
    sections: [
      {
        title: "Introduction",
        content: "Link building remains a cornerstone of SEO in 2025. While the strategies have evolved to favor quality over quantity, the tools required to identify opportunities, perform outreach, and track progress have become more sophisticated. Here are the top 10 tools you need in your arsenal.",
      },
      {
        title: "1. Ahrefs: The Industry Gold Standard",
        content: "Ahrefs continues to lead with its massive backlink index. Its Site Explorer tool allows you to peek into your competitors' backlink profiles with unparalleled precision.",
        list: ["Backlink Analysis", "Content Explorer", "Broken Link Checker"],
      },
      {
        title: "2. Semrush: Comprehensive Digital Marketing",
        content: "Semrush offers a robust Link Building Tool that manages the entire workflow—from finding prospects to tracking your outreach success.",
        list: ["Link Building Tool", "Backlink Audit", "Competitive Intelligence"],
      },
      {
        title: "3. Pitchbox: Scalable Outreach",
        content: "For agencies and large enterprises, Pitchbox is the go-to for automating the outreach process without losing the personal touch.",
      },
      {
        title: "Conclusion",
        content: "The right tools can make or break your link building campaign. Choose the one that fits your scale and strategy to stay ahead in 2025.",
      },
    ],
  },
  {
    slug: "content-gap-analysis-seo",
    title: "Content Gap Analysis for SEO: How to Outrank Your Competitors",
    excerpt: "Learn how to identify and bridge the gaps in your content strategy to surpass your competition.",
    category: "SEO",
    date: "October 10, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    accent: "#10b981",
    sections: [
      {
        title: "What is Content Gap Analysis?",
        content: "Content gap analysis is the process of finding 'missing' content on your website that your competitors are ranking for. It identifies the keywords and topics that your audience is searching for, but you haven't covered yet.",
      },
      {
        title: "How to Perform a Content Gap Analysis",
        content: "To outrank your competitors, you need a systematic approach to identifying these opportunities.",
        list: [
          "Identify your top 3-5 direct competitors",
          "Use SEO tools to find keywords they rank for but you don't",
          "Analyze the 'intent' behind those keywords",
          "Create superior content that answers the user's query better than the competition",
        ],
      },
      {
        title: "Bridging the Gap",
        content: "Once you've identified the gaps, prioritize them based on search volume, competition, and business relevance. Focus on topics that have high conversion potential first.",
      },
    ],
  },
  {
    slug: "future-of-seo-2025-predictions",
    title: "The Future of SEO: Trends and Predictions for 2025 and Beyond",
    excerpt: "Stay ahead of the curve with our expert predictions for the future of search engine optimization.",
    category: "SEO",
    date: "October 1, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    accent: "#8b5cf6",
    sections: [
      {
        title: "AI and Search Generative Experience (SGE)",
        content: "By 2025, AI-driven search results will be the norm. Google's SGE will provide direct answers to complex queries, requiring SEOs to optimize for 'Answer Engine Optimization' alongside traditional ranking factors.",
      },
      {
        title: "The Rise of E-E-A-T",
        content: "Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) will become even more critical. Content must demonstrate real-world experience to rank in a sea of AI-generated noise.",
        list: [
          "Author profiles with verified credentials",
          "Case studies and first-hand accounts",
          "Consistent brand messaging across platforms",
        ],
      },
      {
        title: "Voice and Visual Search",
        content: "As smart devices become more integrated into our lives, optimizing for natural language and visual queries will be essential for reaching customers.",
      },
    ],
  },
  {
    slug: "what-is-topical-authority",
    title: "What is Topical Authority?",
    excerpt: "Understand why being an expert in a specific niche is more important than ranking for individual keywords.",
    category: "SEO",
    date: "September 30, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop",
    accent: "#f59e0b",
    sections: [
      {
        title: "Defining Topical Authority",
        content: "Topical authority is a measure of a website's credibility and expertise on a specific subject. Instead of focusing on single keywords, search engines now look for websites that cover a topic comprehensively.",
      },
      {
        title: "How to Build Topical Authority",
        content: "Building authority takes time and a strategic content approach.",
        list: [
          "Create Pillar Pages for broad topics",
          "Develop Cluster Content that links back to the pillar",
          "Ensure internal linking is logical and helpful",
          "Update content regularly to remain the go-to source",
        ],
      },
      {
        title: "Why It Matters",
        content: "Websites with high topical authority rank faster for new keywords in their niche and are more resilient to algorithm updates.",
      },
    ],
  },
  {
    slug: "seo-vs-ppc-which-strategy",
    title: "SEO vs PPC: Which Strategy is Right for Your Business?",
    excerpt: "Deciding between organic growth and paid advertising? We break down the pros and cons of each.",
    category: "Marketing",
    date: "September 30, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop",
    accent: "#ec4899",
    sections: [
      {
        title: "The Case for SEO",
        content: "SEO is a long-term investment. While it takes time to see results, the traffic is 'free' and tends to have higher trust levels from users.",
      },
      {
        title: "The Case for PPC",
        content: "PPC offers instant visibility. It's perfect for product launches, seasonal promotions, or businesses that need leads immediately.",
      },
      {
        title: "Comparative Summary",
        content: "Most successful businesses use a combination of both. SEO builds the foundation, while PPC drives targeted results for specific campaigns.",
        list: [
          "SEO: Sustainable, high trust, slow start",
          "PPC: Instant, highly targeted, cost per click",
        ],
      },
    ],
  },
  {
    slug: "answer-engine-optimization-ai",
    title: "Answer Engine Optimization: How AI is Transforming Search in 2025",
    excerpt: "AI is changing how users find information. Learn how to optimize your content for the new era of Answer Engines.",
    category: "AI & Search",
    date: "September 30, 2025",
    commentsCount: "No Comments",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    accent: "#06b6d4",
    sections: [
      {
        title: "From Search Engine to Answer Engine",
        content: "Search engines are evolving from providing a list of links to providing direct answers. This shift, driven by Large Language Models (LLMs), is known as Answer Engine Optimization (AEO).",
      },
      {
        title: "Strategies for AEO",
        content: "To stay visible in an AI-driven search world, your content must be easily digestible by machines.",
        list: [
          "Use Structured Data (Schema.org)",
          "Write in a clear, conversational tone",
          "Provide direct answers to 'Who, What, Where, When, Why' questions",
          "Focus on long-tail, conversational queries",
        ],
      },
      {
        title: "The Future is Conversational",
        content: "AEO is not about ranking #1; it's about being the 'chosen' answer provided by AI agents and voice assistants.",
      },
    ],
  },
];
