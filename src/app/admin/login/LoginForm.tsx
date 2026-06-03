"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";
import styles from "@/components/admin/Admin.module.css";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className={styles.input}
          placeholder="admin@siteonlab"
          autoComplete="username"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
      </div>

      {state?.error && <div className={styles.formError}>{state.error}</div>}

      <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={pending}>
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
