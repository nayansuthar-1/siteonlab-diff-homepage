import "server-only";
import { ObjectId, type Collection, type WithId, type Document } from "mongodb";
import { getDb } from "./mongodb";

export interface AuditScores {
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
}

export interface AuditLead {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  websiteUrl: string;
  strategy: "mobile" | "desktop";
  scores: AuditScores;
  createdAt: string;
}

export type AuditLeadInput = Omit<AuditLead, "id" | "createdAt">;

const COLLECTION = "audit_leads";

async function auditLeadsCollection(): Promise<Collection<Document>> {
  const db = await getDb();
  return db.collection(COLLECTION);
}

function serialize(doc: WithId<Document>): AuditLead {
  return {
    id: doc._id.toString(),
    fullName: doc.fullName,
    email: doc.email,
    companyName: doc.companyName,
    websiteUrl: doc.websiteUrl,
    strategy: doc.strategy ?? "mobile",
    scores: doc.scores ?? {
      performance: null,
      accessibility: null,
      bestPractices: null,
      seo: null,
    },
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : new Date().toISOString(),
  };
}

export async function getAllAuditLeads(): Promise<AuditLead[]> {
  const col = await auditLeadsCollection();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(serialize);
}

export async function createAuditLead(input: AuditLeadInput): Promise<string> {
  const col = await auditLeadsCollection();
  const res = await col.insertOne({ ...input, createdAt: new Date() });
  return res.insertedId.toString();
}

export async function deleteAuditLead(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await auditLeadsCollection();
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}
