"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MAX_AGE_SECONDS, SESSION_COOKIE, createSession } from "@/lib/auth";

export async function login(formData: FormData): Promise<void> {
  const password = formData.get("password");
  const fromValue = formData.get("from");

  const passwordStr = typeof password === "string" ? password : "";
  const from = typeof fromValue === "string" && fromValue.length > 0 ? fromValue : "";

  const expected = process.env.EDIT_PASSWORD;

  if (expected && passwordStr === expected) {
    const store = await cookies();
    store.set(SESSION_COOKIE, await createSession(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: MAX_AGE_SECONDS,
    });
    redirect(from || "/");
  }

  const errorPath = `/login?error=invalid${from ? `&from=${encodeURIComponent(from)}` : ""}`;
  redirect(errorPath);
}
