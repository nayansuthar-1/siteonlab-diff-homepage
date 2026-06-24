import { NextResponse, type NextRequest } from "next/server";
import { createGrowthLead } from "@/lib/growth-leads";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, email, website, service, referral } = body;

  // Required fields (mirrors the form: email, website and service are required)
  if (!email?.trim() || !website?.trim() || !service?.trim()) {
    return NextResponse.json(
      { error: "Email, website and service are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const id = await createGrowthLead({
    firstName: firstName?.trim() ?? "",
    lastName: lastName?.trim() ?? "",
    email: email.trim(),
    website: website.trim(),
    service: service.trim(),
    referral: referral?.trim() ?? "",
  });

  return NextResponse.json({ id }, { status: 201 });
}
