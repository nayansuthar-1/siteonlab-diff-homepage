import "server-only";
import { ObjectId, type Collection, type WithId, type Document } from "mongodb";
import { getDb } from "./mongodb";

export interface CaseStudySection {
  title: string;
  content: string;
  list?: string[];
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  imageUrl: string;
  accent: string;
  metrics: CaseStudyMetric[];
  challenge: string;
  solution: string;
  sections: CaseStudySection[];
}

export type CaseStudyInput = Omit<CaseStudy, "id">;

const COLLECTION = "case_studies";

async function caseStudiesCollection(): Promise<Collection<Document>> {
  const db = await getDb();
  return db.collection(COLLECTION);
}

function serialize(doc: WithId<Document>): CaseStudy {
  return {
    id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    client: doc.client,
    category: doc.category,
    description: doc.description,
    imageUrl: doc.imageUrl,
    accent: doc.accent,
    metrics: doc.metrics ?? [],
    challenge: doc.challenge ?? "",
    solution: doc.solution ?? "",
    sections: doc.sections ?? [],
  };
}

async function ensureSeeded(col: Collection<Document>): Promise<void> {
  const count = await col.estimatedDocumentCount();
  if (count > 0) return;
  const now = Date.now();
  await col.insertMany(
    seedCaseStudies.map((c, i) => ({ ...c, createdAt: new Date(now - i * 1000) }))
  );
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const col = await caseStudiesCollection();
  await ensureSeeded(col);
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(serialize);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const col = await caseStudiesCollection();
  await ensureSeeded(col);
  const doc = await col.findOne({ slug });
  return doc ? serialize(doc) : null;
}

export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await caseStudiesCollection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  return doc ? serialize(doc) : null;
}

export async function createCaseStudy(input: CaseStudyInput): Promise<string> {
  const col = await caseStudiesCollection();
  const res = await col.insertOne({ ...input, createdAt: new Date() });
  return res.insertedId.toString();
}

export async function updateCaseStudy(id: string, input: CaseStudyInput): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await caseStudiesCollection();
  const res = await col.updateOne({ _id: new ObjectId(id) }, { $set: { ...input } });
  return res.matchedCount > 0;
}

export async function deleteCaseStudy(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await caseStudiesCollection();
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}

// ---------------------------------------------------------------------------
// Starter content (seeded into MongoDB on first run, then managed via /admin)
// ---------------------------------------------------------------------------
export const seedCaseStudies: CaseStudyInput[] = [
  {
    slug: "fintech-app-redesign",
    title: "Revolutionizing Digital Banking Experience",
    client: "FinBank Global",
    category: "Fintech",
    description: "A complete overhaul of a legacy banking platform, focusing on user experience and security.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    accent: "#0d9488",
    metrics: [
      { label: "User Retention", value: "+45%" },
      { label: "Transaction Speed", value: "2.4s" },
      { label: "CSAT Score", value: "4.9/5" },
    ],
    challenge: "The existing app was cluttered, slow, and had a high churn rate among younger users.",
    solution: "We implemented a minimalist design system, optimized API responses, and introduced biometric authentication.",
    sections: [
      {
        title: "The Challenge",
        content: "FinBank Global faced a significant decline in mobile app engagement. Younger demographics found the interface unintuitive, while older users struggled with performance issues. The core challenge was to modernize the app without alienating the existing user base.",
      },
      {
        title: "Our Approach",
        content: "We began with an intensive 2-week discovery phase, interviewing stakeholders and analyzing user behavior data. Our strategy focused on three pillars:",
        list: [
          "Information Architecture: Simplifying the navigation to 3 core actions.",
          "Performance Engineering: Reducing app launch time by 60%.",
          "Visual Identity: Transitioning from a clinical corporate look to a vibrant, trust-centric design.",
        ],
      },
      {
        title: "Implementation",
        content: "Using React Native, we built a cross-platform solution that shared 90% of the codebase, ensuring feature parity between iOS and Android. We integrated advanced security features like FaceID and TouchID while maintaining a friction-less experience.",
      },
      {
        title: "The Outcome",
        content: "Within three months of launch, FinBank saw a 45% increase in user retention. The app's rating on the App Store jumped from 3.2 to 4.8 stars.",
      },
    ],
  },
  {
    slug: "ecommerce-ai-integration",
    title: "AI-Powered Personalization for E-commerce",
    client: "StyleHub",
    category: "E-commerce",
    description: "Integrating agentic AI to provide personalized shopping recommendations and automated support.",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    accent: "#8b5cf6",
    metrics: [
      { label: "Conversion Rate", value: "+30%" },
      { label: "Average Order Value", value: "+22%" },
      { label: "Support Tickets", value: "-60%" },
    ],
    challenge: "StyleHub struggled with low engagement on product pages and high support costs.",
    solution: "We deployed a custom recommendation engine and a GPT-powered shopping assistant.",
    sections: [
      {
        title: "The Problem",
        content: "With over 50,000 SKUs, StyleHub users were overwhelmed. The bounce rate on the homepage was nearly 70% because users couldn't find what they wanted quickly. Support agents were bogged down by simple order status queries.",
      },
      {
        title: "AI Transformation",
        content: "We implemented a two-pronged AI strategy using agentic workflows:",
        list: [
          "Personalized Discovery: A neural network that analyzes real-time browsing behavior to serve relevant product 'lookbooks'.",
          "Automated Support Agent: An AI agent capable of handling returns, tracking, and sizing advice without human intervention.",
        ],
      },
      {
        title: "Technical Execution",
        content: "We utilized a vector database (Pinecone) to power semantic search and recommendation, ensuring results were served in under 100ms. The support agent was built using LangChain and integrated directly into the Shopify checkout flow.",
      },
      {
        title: "Results",
        content: "The average order value increased by 22% as users were successfully upsold through personalized recommendations. Support overhead dropped by 60% in the first quarter.",
      },
    ],
  },
  {
    slug: "healthcare-telemedicine-platform",
    title: "Scalable Telemedicine Solution",
    client: "HealthConnect",
    category: "Healthcare",
    description: "Building a HIPAA-compliant platform for remote consultations and patient management.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    accent: "#ec4899",
    metrics: [
      { label: "Monthly Consultations", value: "50k+" },
      { label: "Patient Wait Time", value: "<5min" },
      { label: "Provider Efficiency", value: "+40%" },
    ],
    challenge: "The client needed a highly secure platform that could handle a massive surge in users.",
    solution: "We built a microservices architecture on AWS with end-to-end encryption and real-time video scaling.",
    sections: [
      {
        title: "Context",
        content: "HealthConnect needed to scale from a local clinic tool to a nationwide telemedicine provider. Security was paramount, as the platform handled sensitive patient data protected by HIPAA and GDPR.",
      },
      {
        title: "Architecture & Security",
        content: "We designed a zero-trust architecture to ensure data integrity:",
        list: [
          "End-to-End Encryption: All video streams and messages are encrypted client-side.",
          "Scalable Video: WebRTC integration with automated scaling via AWS Elemental.",
          "Patient Portal: A secure dashboard for managing records, prescriptions, and appointments.",
        ],
      },
      {
        title: "The Build",
        content: "The platform was built using a Next.js frontend and a Go-based backend for high concurrency. We automated the compliance auditing process by logging all access attempts in an immutable database.",
      },
      {
        title: "Impact",
        content: "HealthConnect successfully onboarded 200+ clinics in 6 months, facilitating over 50,000 consultations monthly with zero security incidents.",
      },
    ],
  },
];
