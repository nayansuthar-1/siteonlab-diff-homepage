import { NextResponse, type NextRequest } from "next/server";
import { createAuditLead } from "@/lib/audit-leads";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { fullName, email, companyName, websiteUrl, strategy, scores } = body;

  // Basic validation
  if (!fullName?.trim() || !email?.trim() || !companyName?.trim() || !websiteUrl?.trim()) {
    return NextResponse.json(
      { error: "All fields are required: fullName, email, companyName, websiteUrl." },
      { status: 400 },
    );
  }

  // Simple email check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const id = await createAuditLead({
    fullName: fullName.trim(),
    email: email.trim(),
    companyName: companyName.trim(),
    websiteUrl: websiteUrl.trim(),
    strategy: strategy === "desktop" ? "desktop" : "mobile",
    scores: scores ?? {
      performance: null,
      accessibility: null,
      bestPractices: null,
      seo: null,
    },
  });

  return NextResponse.json({ id }, { status: 201 });
}
