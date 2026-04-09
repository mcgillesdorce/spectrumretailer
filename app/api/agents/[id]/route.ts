import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE /api/agents/[id] — deactivate or permanently delete an agent (admin only)
// Use ?permanent=true to permanently delete
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  // Prevent admin from deleting themselves
  if (id === session.user.id) {
    return NextResponse.json({ error: "You cannot remove your own account" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id }, select: { id: true } });
  if (!user) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const url = new URL(request.url);
  const permanent = url.searchParams.get("permanent") === "true";

  if (permanent) {
    // Delete sales first, then the user
    await prisma.sale.deleteMany({ where: { agentId: id } });
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true, deleted: true });
  }

  await prisma.user.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ success: true });
}

// PATCH /api/agents/[id] — reactivate or update an agent (admin only)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  let body: { active?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id }, select: { id: true } });
  if (!user) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { active: body.active },
    select: { id: true, username: true, name: true, role: true, active: true, createdAt: true },
  });

  return NextResponse.json(updated);
}
