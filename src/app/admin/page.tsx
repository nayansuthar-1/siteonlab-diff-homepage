import type { Metadata } from "next";
import { getAllBlogs } from "@/lib/blogs";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllAuditLeads } from "@/lib/audit-leads";
import { getAllGrowthLeads } from "@/lib/growth-leads";
import { logout } from "./actions";
import AdminTabs from "@/components/admin/AdminTabs";
import styles from "@/components/admin/Admin.module.css";

export const metadata: Metadata = {
  title: "Admin Dashboard | SiteonLab",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [blogs, caseStudies, auditLeads, growthLeads] = await Promise.all([
    getAllBlogs().catch(() => []),
    getAllCaseStudies().catch(() => []),
    getAllAuditLeads().catch(() => []),
    getAllGrowthLeads().catch(() => []),
  ]);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>Content Admin</h1>
            <p className={styles.subtle}>Manage your blogs, case studies, and leads.</p>
          </div>
          <form action={logout}>
            <button type="submit" className={`${styles.btn} ${styles.btnGhost}`}>Log out</button>
          </form>
        </div>

        <AdminTabs blogs={blogs} caseStudies={caseStudies} auditLeads={auditLeads} growthLeads={growthLeads} />
      </div>
    </div>
  );
}
