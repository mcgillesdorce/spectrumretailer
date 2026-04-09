/**
 * One-time script to set up the production Turso database.
 * Run with: npx ts-node --compiler-options {"module":"CommonJS"} scripts/setup-production-db.ts
 */
import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error("❌  Set DATABASE_URL and TURSO_AUTH_TOKEN env vars first.");
    process.exit(1);
  }

  const client = createClient({ url, authToken });
  console.log("✓ Connected to Turso:", url);

  // ── Apply migrations ─────────────────────────────────────────────────────
  const migrationDirs = [
    "prisma/migrations/20260409153034_init/migration.sql",
    "prisma/migrations/20260409155454_add_sales/migration.sql",
  ];

  for (const filePath of migrationDirs) {
    const sql = readFileSync(join(process.cwd(), filePath), "utf-8");
    // Split on semicolons and run each statement individually
    const statements = sql
      .split(";")
      .map((s) => {
        // Strip leading SQL comments before checking for content
        return s.replace(/^(\s*--[^\n]*\n)+/g, "").trim();
      })
      .filter((s) => s.length > 0);

    for (const statement of statements) {
      try {
        await client.execute(statement + ";");
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        // Ignore "already exists" errors so re-runs are safe
        if (!msg.includes("already exists") && !msg.includes("duplicate")) {
          console.warn(`  ⚠  Statement skipped: ${msg.substring(0, 80)}`);
        }
      }
    }
    console.log(`✓ Applied: ${filePath}`);
  }

  // ── Create _prisma_migrations tracking table (needed by migrate deploy) ──
  await client.execute(`
    CREATE TABLE IF NOT EXISTS _prisma_migrations (
      id TEXT PRIMARY KEY,
      checksum TEXT NOT NULL,
      finished_at DATETIME,
      migration_name TEXT NOT NULL,
      logs TEXT,
      rolled_back_at DATETIME,
      started_at DATETIME NOT NULL DEFAULT current_timestamp,
      applied_steps_count INTEGER NOT NULL DEFAULT 0
    );
  `);

  // ── Seed admin account ───────────────────────────────────────────────────
  const existing = await client.execute(
    "SELECT id FROM User WHERE username = 'admin' LIMIT 1"
  );

  if (existing.rows.length > 0) {
    console.log("✓ Admin account already exists — skipping seed.");
  } else {
    const hashedPassword = await bcrypt.hash("ChangeMe123!", 12);
    const id = `admin_${Date.now()}`;
    await client.execute({
      sql: `INSERT INTO User (id, username, hashedPassword, name, role, active, createdAt)
            VALUES (?, 'admin', ?, 'Administrator', 'ADMIN', 1, datetime('now'))`,
      args: [id, hashedPassword],
    });
    console.log("✓ Admin account seeded (username: admin / password: ChangeMe123!)");
  }

  console.log("\n✅  Production database ready!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌  Error:", err);
  process.exit(1);
});
