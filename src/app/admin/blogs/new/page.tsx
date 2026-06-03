import type { Metadata } from "next";
import BlogEditor from "@/components/admin/BlogEditor";

export const metadata: Metadata = {
  title: "New Blog | Admin",
  robots: { index: false, follow: false },
};

export default function NewBlogPage() {
  return <BlogEditor />;
}
