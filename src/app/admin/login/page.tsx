import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import styles from "@/components/admin/Admin.module.css";

export const metadata: Metadata = {
  title: "Admin Login | SiteonLab",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Admin Login</h1>
        <p className={styles.loginSub}>Sign in to manage blogs and case studies.</p>
        <LoginForm />
      </div>
    </div>
  );
}
