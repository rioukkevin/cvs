export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { commitCv } from "@/lib/github";
import type { CvData } from "@/lib/cv";

const REQUIRED_KEYS = [
  "identity",
  "profile",
  "keywords",
  "education",
  "awards",
  "experience",
  "skills",
  "interests",
] as const;

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(SESSION_COOKIE)?.value;

  if (!(await verifySession(sessionValue))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid shape", missing: [...REQUIRED_KEYS] },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "invalid shape", missing: [...REQUIRED_KEYS] },
      { status: 400 }
    );
  }

  const record = body as Record<string, unknown>;
  const missing = REQUIRED_KEYS.filter((key) => !(key in record));
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "invalid shape", missing },
      { status: 400 }
    );
  }

  const cvData = record as unknown as CvData;

  if (process.env.EDIT_DRY_RUN === "true") {
    console.log("[api/edit] DRY RUN — payload not pushed to GitHub:");
    console.log(JSON.stringify(cvData, null, 2));
    return NextResponse.json({ ok: true, commitSha: "dry-run" });
  }

  try {
    const { commitSha } = await commitCv(cvData);
    return NextResponse.json({ ok: true, commitSha });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    console.error("[api/edit] commit failed:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
