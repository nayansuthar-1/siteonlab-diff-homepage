import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { deleteGrowthLead } from "@/lib/growth-leads";

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/admin/growth-leads/[id]">) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const ok = await deleteGrowthLead(id);
  if (!ok) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

  return NextResponse.json({ ok: true });
}
