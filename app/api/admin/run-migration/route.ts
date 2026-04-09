import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createClient } from "@libsql/client";

// GET /api/admin/run-migration — one-time migration runner (admin only)
export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) {
    return NextResponse.json({ error: "DB env vars not configured" }, { status: 500 });
  }

  const client = createClient({ url, authToken });

  const statements = [
    `ALTER TABLE "User" ADD COLUMN "email" TEXT`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`,
    `CREATE TABLE IF NOT EXISTS "PasswordResetToken" ("id" TEXT NOT NULL PRIMARY KEY, "token" TEXT NOT NULL, "userId" TEXT NOT NULL, "expiresAt" DATETIME NOT NULL, "used" BOOLEAN NOT NULL DEFAULT false, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "PasswordResetToken_token_key" ON "PasswordResetToken"("token")`,
  ];

  const results: { sql: string; ok: boolean; error?: string }[] = [];

  for (const sql of statements) {
    try {
      await client.execute(sql);
      results.push({ sql: sql.substring(0, 60) + "…", ok: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("duplicate column") || msg.includes("already exists")) {
        results.push({ sql: sql.substring(0, 60) + "…", ok: true, error: "already exists (ok)" });
      } else {
        results.push({ sql: sql.substring(0, 60) + "…", ok: false, error: msg });
      }
    }
  }

  return NextResponse.json({ migration: "complete", results });
}
