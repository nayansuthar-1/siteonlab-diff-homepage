import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { createBlog, getBlogBySlug } from "@/lib/blogs";
import { parseBlogInput } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = parseBlogInput(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const existing = await getBlogBySlug(parsed.data.slug);
  if (existing) {
    return NextResponse.json({ error: "A blog with this slug already exists." }, { status: 409 });
  }

  const id = await createBlog(parsed.data);
  return NextResponse.json({ id, slug: parsed.data.slug }, { status: 201 });
}
