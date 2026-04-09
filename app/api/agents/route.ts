import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET /api/agents — list all agents (admin only)
export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const agents = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
      active: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(agents);
}

// POST /api/agents — create a new agent (admin only)
export async function POST(request: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { username?: string; name?: string; password?: string; role?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { username, name, password, role, email } = body;

  if (!username || !name || !password) {
    return NextResponse.json(
      { error: "username, name, and password are required" },
      { status: 400 }
    );
  }

  const usernameRegex = /^[a-zA-Z0-9._-]{3,50}$/;
  if (!usernameRegex.test(username)) {
    return NextResponse.json(
      { error: "Username must be 3–50 alphanumeric characters" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return NextResponse.json({ error: "Username already exists" }, { status: 409 });
  }

  const normalizedEmail = email ? email.trim().toLowerCase() : undefined;
  if (normalizedEmail) {
    const emailTaken = await prisma.user.findFirst({ where: { email: normalizedEmail } });
    if (emailTaken) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      username,
      name,
      hashedPassword,
      email: normalizedEmail ?? null,
      role: role === "ADMIN" ? "ADMIN" : "AGENT",
    },
    select: { id: true, username: true, name: true, email: true, role: true, active: true, createdAt: true },
  });

  return NextResponse.json(user, { status: 201 });
}
