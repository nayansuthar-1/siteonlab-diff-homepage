"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export interface LoginState {
  error?: string;
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const expectedEmail = process.env.ADMIN_EMAIL || "admin@siteonlab";
  const expectedPassword = process.env.ADMIN_PASSWORD || "siteonlabadmin";

  if (email !== expectedEmail || password !== expectedPassword) {
    return { error: "Invalid email or password." };
  }

  await createSession(email);
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
