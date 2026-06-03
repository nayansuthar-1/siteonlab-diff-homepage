import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { createCaseStudy, getCaseStudyBySlug } from "@/lib/case-studies";
import { parseCaseStudyInput } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = parseCaseStudyInput(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const existing = await getCaseStudyBySlug(parsed.data.slug);
  if (existing) {
    return NextResponse.json({ error: "A case study with this slug already exists." }, { status: 409 });
  }

  const id = await createCaseStudy(parsed.data);
  return NextResponse.json({ id, slug: parsed.data.slug }, { status: 201 });
}
