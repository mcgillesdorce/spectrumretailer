/**
 * prisma/seed.ts
 *
 * Creates the initial admin account.
 * Run once: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
 * Or add a "prisma.seed" script in package.json and run: npx prisma db seed
 *
 * Credentials are read from environment variables:
 *   ADMIN_USERNAME  (default: admin)
 *   ADMIN_PASSWORD  (default: ChangeMe123!)
 *   ADMIN_NAME      (default: Admin)
 */

import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL ?? "file:./dev.db";
const adapter = new PrismaLibSql({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const name = process.env.ADMIN_NAME ?? "Admin";

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    console.log(`Admin account "${username}" already exists. Skipping seed.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { username, hashedPassword, name, role: "ADMIN" },
  });

  console.log(`\n✅ Admin account created:`);
  console.log(`   Username: ${username}`);
  console.log(`   Password: ${password}`);
  console.log(`\n⚠️  Change this password immediately after first login!\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
