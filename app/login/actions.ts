"use server";

import { redirect } from "next/navigation";
import { zohoPortalLogin } from "@/lib/zoho";
import { createSession } from "@/lib/session";

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Enter your email and password." };

  const result = await zohoPortalLogin(email, password);
  if (!result.ok) return { error: result.message };

  await createSession(result.user);
  redirect("/dashboard");
}
