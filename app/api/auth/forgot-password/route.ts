import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Always return success to prevent user enumeration
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user || !user.active) {
    return NextResponse.json({ ok: true });
  }

  // Invalidate any existing unused tokens for this user
  await prisma.passwordResetToken.updateMany({
    where: { userId: user.id, used: false },
    data: { used: true },
  });

  // Generate a secure random token
  const rawToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.passwordResetToken.create({
    data: {
      token: rawToken,
      userId: user.id,
      expiresAt,
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://hiws.io";
  const resetUrl = `${baseUrl}/agent/reset-password?token=${rawToken}`;

  await sendPasswordResetEmail(user.email!, user.name, resetUrl);

  return NextResponse.json({ ok: true });
}
