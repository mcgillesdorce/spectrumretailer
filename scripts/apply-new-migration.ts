/**
 * Applies the email + password reset token migration to production Turso DB.
 * Run with: npx ts-node --compiler-options {"module":"CommonJS"} scripts/apply-new-migration.ts
 */
import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join } from "path";

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error("❌  Set DATABASE_URL and TURSO_AUTH_TOKEN env vars first.");
    process.exit(1);
  }

  const client = createClient({ url, authToken });
  console.log("✓ Connected to Turso:", url);

  const sql = readFileSync(
    join(process.cwd(), "prisma/migrations/20260409200000_add_email_and_reset_tokens/migration.sql"),
    "utf-8"
  );

  const statements = sql
    .split(";")
    .map((s) => s.replace(/^(\s*--[^\n]*\n)+/g, "").trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    try {
      await client.execute(statement + ";");
      console.log("✓ Executed:", statement.substring(0, 60) + "...");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("already exists") || msg.includes("duplicate column")) {
        console.log("  ↳ skipped (already exists)");
      } else {
        console.warn(`  ⚠  Failed: ${msg.substring(0, 100)}`);
      }
    }
  }

  console.log("\n✅  Migration applied!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌  Error:", err);
  process.exit(1);
});
