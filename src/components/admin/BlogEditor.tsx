"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogs";
import { slugify } from "@/lib/slug";
import ImageUpload from "./ImageUpload";
import SectionsEditor, { type EditorSection, emptySection } from "./SectionsEditor";
import styles from "./Admin.module.css";

interface Props {
  initial?: BlogPost;
}

export default function BlogEditor({ initial }: Props) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [category, setCategory] = useState(initial?.category ?? "SEO");
  const [date, setDate] = useState(initial?.date ?? "");
  const [commentsCount, setCommentsCount] = useState(String(initial?.commentsCount ?? "No Comments"));
  const [accent, setAccent] = useState(initial?.accent ?? "#3b82f6");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [sections, setSections] = useState<EditorSection[]>(
    initial?.sections?.length
      ? initial.sections.map((s) => ({ title: s.title, content: s.content, list: s.list ?? [] }))
      : [emptySection()]
  );

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const effectiveSlug = slugTouched ? slug : slugify(title);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      title,
      slug: effectiveSlug,
      excerpt,
      category,
      date,
      commentsCount,
      accent,
      imageUrl,
      sections: sections.map((s) => ({
        title: s.title,
        content: s.content,
        list: s.list.filter((l) => l.trim()),
      })),
    };

    const url = isEdit ? `/api/admin/blogs/${initial!.id}` : "/api/admin/blogs";
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
            <h1 className={styles.pageTitle}>{isEdit ? "Edit Blog" : "New Blog"}</h1>
            <p className={styles.subtle}>{isEdit ? `Editing “${initial!.title}”` : "Create a new blog post."}</p>
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
              placeholder="Top 10 Link Building Tools…"
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
            <span className={styles.hint}>URL: /blogs/{effectiveSlug || "…"}</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Cover image *</label>
            <ImageUpload value={imageUrl} onChange={setImageUrl} />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Excerpt</label>
            <textarea
              className={styles.textarea}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary shown on the blogs listing."
            />
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Category</label>
              <input
                className={styles.input}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="SEO"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Date</label>
              <input
                className={styles.input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="October 10, 2025"
              />
              <span className={styles.hint}>Leave blank to use today.</span>
            </div>
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Comments label</label>
              <input
                className={styles.input}
                value={commentsCount}
                onChange={(e) => setCommentsCount(e.target.value)}
                placeholder="No Comments"
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
                <input
                  className={styles.input}
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                />
              </div>
            </div>
          </div>

          <SectionsEditor sections={sections} onChange={setSections} />

          {error && <div className={styles.formError}>{error}</div>}

          <div className={styles.formFooter}>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save changes" : "Publish blog"}
            </button>
            <Link href="/admin" className={`${styles.btn} ${styles.btnGhost}`}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
