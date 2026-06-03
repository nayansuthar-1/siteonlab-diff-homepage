"use client";

import styles from "./Admin.module.css";

export interface EditorSection {
  title: string;
  content: string;
  list: string[];
}

interface Props {
  sections: EditorSection[];
  onChange: (sections: EditorSection[]) => void;
}

export function emptySection(): EditorSection {
  return { title: "", content: "", list: [] };
}

export default function SectionsEditor({ sections, onChange }: Props) {
  function update(index: number, patch: Partial<EditorSection>) {
    onChange(sections.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }
  function remove(index: number) {
    onChange(sections.filter((_, i) => i !== index));
  }
  function add() {
    onChange([...sections, emptySection()]);
  }

  return (
    <div className={styles.field}>
      <label className={styles.label}>Content Sections</label>
      <p className={styles.hint}>
        Each section&apos;s heading appears in the Table of Contents on the article page.
      </p>

      <div className={styles.cardGroup}>
        {sections.map((section, i) => (
          <div key={i} className={styles.subCard}>
            <div className={styles.subCardHead}>
              <span className={styles.subCardLabel}>Section {i + 1}</span>
              {sections.length > 1 && (
                <button type="button" className={styles.removeBtn} onClick={() => remove(i)}>
                  Remove
                </button>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Heading</label>
              <input
                className={styles.input}
                value={section.title}
                onChange={(e) => update(i, { title: e.target.value })}
                placeholder="e.g. Introduction"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Body</label>
              <textarea
                className={styles.textarea}
                value={section.content}
                onChange={(e) => update(i, { content: e.target.value })}
                placeholder="Write the section content…"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Bullet points (optional)</label>
              <p className={styles.hint}>One item per line. Leave empty for none.</p>
              <textarea
                className={styles.textarea}
                value={section.list.join("\n")}
                onChange={(e) =>
                  update(i, { list: e.target.value.split("\n").map((l) => l.trimStart()) })
                }
                placeholder={"First point\nSecond point"}
              />
            </div>
          </div>
        ))}
      </div>

      <button type="button" className={styles.addBtn} onClick={add} style={{ marginTop: 14 }}>
        + Add section
      </button>
    </div>
  );
}
