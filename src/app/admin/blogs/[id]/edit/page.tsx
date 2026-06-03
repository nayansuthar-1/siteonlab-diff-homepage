import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogById } from "@/lib/blogs";
import BlogEditor from "@/components/admin/BlogEditor";

export const metadata: Metadata = {
  title: "Edit Blog | Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) notFound();
  return <BlogEditor initial={blog} />;
}
