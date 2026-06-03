import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyById } from "@/lib/case-studies";
import CaseStudyEditor from "@/components/admin/CaseStudyEditor";

export const metadata: Metadata = {
  title: "Edit Case Study | Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditCaseStudyPage({ params }: Props) {
  const { id } = await params;
  const caseStudy = await getCaseStudyById(id);
  if (!caseStudy) notFound();
  return <CaseStudyEditor initial={caseStudy} />;
}
