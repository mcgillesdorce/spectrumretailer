import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PATCH /api/sales/[id] — update status (admin) or planNotes/spectrumOrderId (own agent)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const sale = await prisma.sale.findUnique({ where: { id } });
  if (!sale) return NextResponse.json({ error: "Sale not found" }, { status: 404 });

  // Agents can only edit their own sales; admins can edit any
  if (session.user.role !== "ADMIN" && sale.agentId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { status?: string; planNotes?: string; spectrumOrderId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validStatuses = ["SUBMITTED", "CONFIRMED", "CANCELLED"];
  const data: { status?: string; planNotes?: string; spectrumOrderId?: string } = {};

  if (body.status !== undefined) {
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Only admins can change status" }, { status: 403 });
    }
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    data.status = body.status;
  }

  if (body.planNotes !== undefined) data.planNotes = body.planNotes;
  if (body.spectrumOrderId !== undefined) data.spectrumOrderId = body.spectrumOrderId;

  const updated = await prisma.sale.update({
    where: { id },
    data,
    include: { agent: { select: { id: true, name: true, username: true } } },
  });

  return NextResponse.json(updated);
}

// DELETE /api/sales/[id] — admin only
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const sale = await prisma.sale.findUnique({ where: { id } });
  if (!sale) return NextResponse.json({ error: "Sale not found" }, { status: 404 });

  await prisma.sale.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
