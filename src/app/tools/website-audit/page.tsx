import type { Metadata } from "next";
import Footer from "@/components/ui/Footer";
import WebsiteAudit from "./WebsiteAudit";

export const metadata: Metadata = {
  title: "Free Website Audit — Technical SEO, Speed & Security | SiteOnLab",
  description:
    "Run a free, instant website audit. Check technical SEO & indexing, site performance & speed, Core Web Vitals, security & privacy, and best practices — powered by Google PageSpeed Insights.",
};

export default function WebsiteAuditPage() {
  return (
    <main style={{ backgroundColor: "#000" }}>
      <WebsiteAudit />
      <Footer />
    </main>
  );
}
