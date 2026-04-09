/**
 * Reset admin password directly in Turso.
 * Run: npx ts-node --compiler-options {"module":"CommonJS"} scripts/reset-admin-password.ts
 */
import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error("❌  Set DATABASE_URL and TURSO_AUTH_TOKEN env vars first.");
    process.exit(1);
  }

  const newPassword = process.env.NEW_PASSWORD ?? "ChangeMe123!";
  const client = createClient({ url, authToken });

  const hash = await bcrypt.hash(newPassword, 12);

  const result = await client.execute({
    sql: `UPDATE User SET hashedPassword = ?, active = 1 WHERE username = 'admin'`,
    args: [hash],
  });

  console.log(`✓ Updated ${result.rowsAffected} row(s)`);

  const verify = await client.execute("SELECT id, username, active FROM User WHERE username = 'admin'");
  console.log("✓ Admin row:", verify.rows[0]);

  // Verify the hash works
  const check = await bcrypt.compare(newPassword, hash);
  console.log(`✓ Hash verify: ${check}`);

  process.exit(0);
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
