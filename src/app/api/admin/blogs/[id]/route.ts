import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { updateBlog, deleteBlog, getBlogBySlug } from "@/lib/blogs";
import { parseBlogInput } from "@/lib/validation";

export async function PUT(req: NextRequest, ctx: RouteContext<"/api/admin/blogs/[id]">) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  const parsed = parseBlogInput(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // Guard against slug collisions with a different document.
  const existing = await getBlogBySlug(parsed.data.slug);
  if (existing && existing.id !== id) {
    return NextResponse.json({ error: "A blog with this slug already exists." }, { status: 409 });
  }

  const ok = await updateBlog(id, parsed.data);
  if (!ok) return NextResponse.json({ error: "Blog not found." }, { status: 404 });

  return NextResponse.json({ id, slug: parsed.data.slug });
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/admin/blogs/[id]">) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const ok = await deleteBlog(id);
  if (!ok) return NextResponse.json({ error: "Blog not found." }, { status: 404 });

  return NextResponse.json({ ok: true });
}
