"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import styles from "./Admin.module.css";

interface Blog {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  imageUrl: string;
}

interface AuditLead {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  websiteUrl: string;
  strategy: string;
  scores: {
    performance: number | null;
    accessibility: number | null;
    bestPractices: number | null;
    seo: number | null;
  };
  createdAt: string;
}

type Tab = "blogs" | "case-studies" | "audit-leads";

interface Props {
  blogs: Blog[];
  caseStudies: CaseStudy[];
  auditLeads: AuditLead[];
}

function scoreColor(score: number | null): string {
  if (score === null) return "#64748b";
  if (score >= 90) return "#22c55e";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

function ScoreBadge({ score, label }: { score: number | null; label: string }) {
  return (
    <span
      className={styles.scoreBadge}
      style={{ borderColor: scoreColor(score), color: scoreColor(score) }}
      title={label}
    >
      {score ?? "—"}
    </span>
  );
}

export default function AdminTabs({ blogs, caseStudies, auditLeads }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("blogs");

  const tabs: { id: Tab; label: string; count: number; icon: React.ReactNode }[] = [
    {
      id: "blogs",
      label: "Blogs",
      count: blogs.length,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      id: "case-studies",
      label: "Case Studies",
      count: caseStudies.length,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      ),
    },
    {
      id: "audit-leads",
      label: "Audit Leads",
      count: auditLeads.length,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Tab bar */}
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <span className={styles.tabCount}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "blogs" && (
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
      )}

      {activeTab === "case-studies" && (
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
      )}

      {activeTab === "audit-leads" && (
        <section className={styles.sectionBlock}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Audit Leads ({auditLeads.length})</h2>
          </div>

          {auditLeads.length === 0 ? (
            <div className={styles.empty}>No audit leads yet. They will appear here when users run website audits.</div>
          ) : (
            <div className={styles.list}>
              {auditLeads.map((lead) => (
                <div key={lead.id} className={styles.item}>
                  <div className={styles.leadIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className={styles.itemMain}>
                    <div className={styles.itemTitle}>{lead.fullName}</div>
                    <div className={styles.itemMeta}>
                      {lead.email} · {lead.companyName} · {lead.websiteUrl}
                    </div>
                    <div className={styles.itemMeta}>
                      {new Date(lead.createdAt).toLocaleDateString()} · {lead.strategy}
                    </div>
                  </div>
                  <div className={styles.leadScores}>
                    <ScoreBadge score={lead.scores.performance} label="Performance" />
                    <ScoreBadge score={lead.scores.accessibility} label="Accessibility" />
                    <ScoreBadge score={lead.scores.bestPractices} label="Best Practices" />
                    <ScoreBadge score={lead.scores.seo} label="SEO" />
                  </div>
                  <div className={styles.itemActions}>
                    <a
                      href={lead.websiteUrl.startsWith("http") ? lead.websiteUrl : `https://${lead.websiteUrl}`}
                      className={`${styles.btn} ${styles.btnGhost}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                    </a>
                    <DeleteButton endpoint={`/api/admin/audit-leads/${lead.id}`} label={`lead "${lead.fullName}"`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
