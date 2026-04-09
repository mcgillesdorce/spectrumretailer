import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Temporary debug endpoint - REMOVE AFTER FIXING LOGIN
// Visit: /api/debug-auth?username=admin&password=ChangeMe123!
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const password = searchParams.get("password");

  if (!username || !password) {
    return NextResponse.json({ error: "Pass ?username=&password=" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, name: true, hashedPassword: true, active: true },
    });
    if (!user) return NextResponse.json({ step: "findUnique", result: "user not found" });

    const passwordValid = await bcrypt.compare(password, user.hashedPassword);

    return NextResponse.json({
      step: "complete",
      found: true,
      active: user.active,
      activeType: typeof user.active,
      passwordValid,
      hashPreview: user.hashedPassword.substring(0, 10) + "...",
    });
  } catch (err) {
    return NextResponse.json({
      step: "error",
      message: err instanceof Error ? err.message : String(err),
    });
  }
}
