"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import { slugify } from "@/lib/slug";
import ImageUpload from "./ImageUpload";
import SectionsEditor, { type EditorSection, emptySection } from "./SectionsEditor";
import styles from "./Admin.module.css";

interface Props {
  initial?: CaseStudy;
}

interface MetricRow {
  label: string;
  value: string;
}

export default function CaseStudyEditor({ initial }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [client, setClient] = useState(initial?.client ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [accent, setAccent] = useState(initial?.accent ?? "#0d9488");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [challenge, setChallenge] = useState(initial?.challenge ?? "");
  const [solution, setSolution] = useState(initial?.solution ?? "");
  const [metrics, setMetrics] = useState<MetricRow[]>(
    initial?.metrics?.length ? initial.metrics.map((m) => ({ ...m })) : [{ label: "", value: "" }]
  );
  const [sections, setSections] = useState<EditorSection[]>(
    initial?.sections?.length
      ? initial.sections.map((s) => ({ title: s.title, content: s.content, list: s.list ?? [] }))
      : [emptySection()]
  );

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const effectiveSlug = slugTouched ? slug : slugify(title);

  function updateMetric(i: number, patch: Partial<MetricRow>) {
    setMetrics((m) => m.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      title,
      slug: effectiveSlug,
      client,
      category,
      description,
      accent,
      imageUrl,
      challenge,
      solution,
      metrics: metrics.filter((m) => m.label.trim() || m.value.trim()),
      sections: sections.map((s) => ({
        title: s.title,
        content: s.content,
        list: s.list.filter((l) => l.trim()),
      })),
    };

    const url = isEdit ? `/api/admin/case-studies/${initial!.id}` : "/api/admin/case-studies";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.editorContainer}>
        <div className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>{isEdit ? "Edit Case Study" : "New Case Study"}</h1>
            <p className={styles.subtle}>
              {isEdit ? `Editing “${initial!.title}”` : "Create a new case study."}
            </p>
          </div>
          <Link href="/admin" className={`${styles.btn} ${styles.btnGhost}`}>← Back</Link>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Title *</label>
            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Revolutionizing Digital Banking…"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Slug</label>
            <input
              className={styles.input}
              value={effectiveSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              placeholder="auto-generated-from-title"
            />
            <span className={styles.hint}>URL: /case-studies/{effectiveSlug || "…"}</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Cover image *</label>
            <ImageUpload value={imageUrl} onChange={setImageUrl} />
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Client</label>
              <input
                className={styles.input}
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="FinBank Global"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Category</label>
              <input
                className={styles.input}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Fintech"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Short description</label>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Shown on the case studies listing card."
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Accent color</label>
            <div className={styles.colorRow}>
              <input
                type="color"
                className={styles.colorSwatch}
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
              />
              <input className={styles.input} value={accent} onChange={(e) => setAccent(e.target.value)} />
            </div>
          </div>

          {/* Metrics */}
          <div className={styles.field}>
            <label className={styles.label}>Key metrics</label>
            <p className={styles.hint}>Highlight stats shown on the case study card (e.g. +45% · User Retention).</p>
            <div className={styles.cardGroup}>
              {metrics.map((m, i) => (
                <div key={i} className={styles.subCard}>
                  <div className={styles.subCardHead}>
                    <span className={styles.subCardLabel}>Metric {i + 1}</span>
                    {metrics.length > 1 && (
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => setMetrics((rows) => rows.filter((_, idx) => idx !== i))}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Value</label>
                      <input
                        className={styles.input}
                        value={m.value}
                        onChange={(e) => updateMetric(i, { value: e.target.value })}
                        placeholder="+45%"
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Label</label>
                      <input
                        className={styles.input}
                        value={m.label}
                        onChange={(e) => updateMetric(i, { label: e.target.value })}
                        placeholder="User Retention"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className={styles.addBtn}
              style={{ marginTop: 14 }}
              onClick={() => setMetrics((rows) => [...rows, { label: "", value: "" }])}
            >
              + Add metric
            </button>
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Challenge (summary)</label>
              <textarea
                className={styles.textarea}
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="The one-line challenge."
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Solution (summary)</label>
              <textarea
                className={styles.textarea}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="The one-line solution."
              />
            </div>
          </div>

          <SectionsEditor sections={sections} onChange={setSections} />

          {error && <div className={styles.formError}>{error}</div>}

          <div className={styles.formFooter}>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save changes" : "Publish case study"}
            </button>
            <Link href="/admin" className={`${styles.btn} ${styles.btnGhost}`}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
