import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { updateCaseStudy, deleteCaseStudy, getCaseStudyBySlug } from "@/lib/case-studies";
import { parseCaseStudyInput } from "@/lib/validation";

export async function PUT(req: NextRequest, ctx: RouteContext<"/api/admin/case-studies/[id]">) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  const parsed = parseCaseStudyInput(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const existing = await getCaseStudyBySlug(parsed.data.slug);
  if (existing && existing.id !== id) {
    return NextResponse.json({ error: "A case study with this slug already exists." }, { status: 409 });
  }

  const ok = await updateCaseStudy(id, parsed.data);
  if (!ok) return NextResponse.json({ error: "Case study not found." }, { status: 404 });

  return NextResponse.json({ id, slug: parsed.data.slug });
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/admin/case-studies/[id]">) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const ok = await deleteCaseStudy(id);
  if (!ok) return NextResponse.json({ error: "Case study not found." }, { status: 404 });

  return NextResponse.json({ ok: true });
}
