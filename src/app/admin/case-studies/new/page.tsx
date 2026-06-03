import type { Metadata } from "next";
import CaseStudyEditor from "@/components/admin/CaseStudyEditor";

export const metadata: Metadata = {
  title: "New Case Study | Admin",
  robots: { index: false, follow: false },
};

export default function NewCaseStudyPage() {
  return <CaseStudyEditor />;
}
