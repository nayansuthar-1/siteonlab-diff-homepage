import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/lib/blogs";
import { getAllCaseStudies } from "@/lib/case-studies";
import { logout } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";
import styles from "@/components/admin/Admin.module.css";

export const metadata: Metadata = {
  title: "Admin Dashboard | SiteonLab",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [blogs, caseStudies] = await Promise.all([
    getAllBlogs().catch(() => []),
    getAllCaseStudies().catch(() => []),
  ]);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>Content Admin</h1>
            <p className={styles.subtle}>Manage your blogs and case studies.</p>
          </div>
          <form action={logout}>
            <button type="submit" className={`${styles.btn} ${styles.btnGhost}`}>Log out</button>
          </form>
        </div>

        {/* Blogs */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Blogs ({blogs.length})</h2>
            <Link href="/admin/blogs/new" className={`${styles.btn} ${styles.btnPrimary}`}>
              + New Blog
            </Link>
          </div>

          {blogs.length === 0 ? (
            <div className={styles.empty}>No blogs yet. Create your first one.</div>
          ) : (
            <div className={styles.list}>
              {blogs.map((blog) => (
                <div key={blog.id} className={styles.item}>
                  <div className={styles.thumb}>
                    {blog.imageUrl && (
                      <Image src={blog.imageUrl} alt="" fill sizes="64px" style={{ objectFit: "cover" }} />
                    )}
                  </div>
                  <div className={styles.itemMain}>
                    <div className={styles.itemTitle}>{blog.title}</div>
                    <div className={styles.itemMeta}>{blog.category} · {blog.date} · /{blog.slug}</div>
                  </div>
                  <div className={styles.itemActions}>
                    <Link href={`/blogs/${blog.slug}`} className={`${styles.btn} ${styles.btnGhost}`} target="_blank">View</Link>
                    <Link href={`/admin/blogs/${blog.id}/edit`} className={`${styles.btn} ${styles.btnGhost}`}>Edit</Link>
                    <DeleteButton endpoint={`/api/admin/blogs/${blog.id}`} label={`blog "${blog.title}"`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Case studies */}
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Case Studies ({caseStudies.length})</h2>
            <Link href="/admin/case-studies/new" className={`${styles.btn} ${styles.btnPrimary}`}>
              + New Case Study
            </Link>
          </div>

          {caseStudies.length === 0 ? (
            <div className={styles.empty}>No case studies yet. Create your first one.</div>
          ) : (
            <div className={styles.list}>
              {caseStudies.map((cs) => (
                <div key={cs.id} className={styles.item}>
                  <div className={styles.thumb}>
                    {cs.imageUrl && (
                      <Image src={cs.imageUrl} alt="" fill sizes="64px" style={{ objectFit: "cover" }} />
                    )}
                  </div>
                  <div className={styles.itemMain}>
                    <div className={styles.itemTitle}>{cs.title}</div>
                    <div className={styles.itemMeta}>{cs.category} · {cs.client} · /{cs.slug}</div>
                  </div>
                  <div className={styles.itemActions}>
                    <Link href={`/case-studies/${cs.slug}`} className={`${styles.btn} ${styles.btnGhost}`} target="_blank">View</Link>
                    <Link href={`/admin/case-studies/${cs.id}/edit`} className={`${styles.btn} ${styles.btnGhost}`}>Edit</Link>
                    <DeleteButton endpoint={`/api/admin/case-studies/${cs.id}`} label={`case study "${cs.title}"`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
