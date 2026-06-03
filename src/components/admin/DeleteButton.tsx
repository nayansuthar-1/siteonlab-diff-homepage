"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Admin.module.css";

interface Props {
  endpoint: string;
  label?: string;
}

export default function DeleteButton({ endpoint, label = "this item" }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete ${label}? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to delete.");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={busy}
      className={`${styles.btn} ${styles.btnDanger}`}
    >
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
