import "server-only";
import { ObjectId, type Collection, type WithId, type Document } from "mongodb";
import { getDb } from "./mongodb";

export interface GrowthLead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  service: string;
  referral: string;
  createdAt: string;
}

export type GrowthLeadInput = Omit<GrowthLead, "id" | "createdAt">;

const COLLECTION = "growth_leads";

async function growthLeadsCollection(): Promise<Collection<Document>> {
  const db = await getDb();
  return db.collection(COLLECTION);
}

function serialize(doc: WithId<Document>): GrowthLead {
  return {
    id: doc._id.toString(),
    firstName: doc.firstName ?? "",
    lastName: doc.lastName ?? "",
    email: doc.email,
    website: doc.website,
    service: doc.service,
    referral: doc.referral ?? "",
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : new Date().toISOString(),
  };
}

export async function getAllGrowthLeads(): Promise<GrowthLead[]> {
  const col = await growthLeadsCollection();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(serialize);
}

export async function createGrowthLead(input: GrowthLeadInput): Promise<string> {
  const col = await growthLeadsCollection();
  const res = await col.insertOne({ ...input, createdAt: new Date() });
  return res.insertedId.toString();
}

export async function deleteGrowthLead(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await growthLeadsCollection();
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}
