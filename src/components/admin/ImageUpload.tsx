"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./Admin.module.css";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed.");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Upload failed. Check your connection.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={styles.uploadBox}>
      <div className={styles.uploadPreview}>
        {value ? (
          <Image src={value} alt="Cover preview" fill sizes="140px" style={{ objectFit: "cover" }} />
        ) : (
          <span>No image</span>
        )}
      </div>

      <div className={styles.uploadControls}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </button>
        {value && <span className={styles.uploadUrl}>{value}</span>}
        {error && <span className={styles.formError}>{error}</span>}
      </div>
    </div>
  );
}
