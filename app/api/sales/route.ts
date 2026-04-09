import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/sales
// Admin: returns all sales with agent name
// Agent: returns only their own sales
export async function GET(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const agentFilter = searchParams.get("agentId");

  if (session.user.role === "ADMIN") {
    const where = agentFilter ? { agentId: agentFilter } : {};
    const sales = await prisma.sale.findMany({
      where,
      include: {
        agent: { select: { id: true, name: true, username: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(sales);
  } else {
    const sales = await prisma.sale.findMany({
      where: { agentId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(sales);
  }
}

// POST /api/sales — agent logs a new sale
export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: {
    customerName?: string;
    customerAddress?: string;
    customerPhone?: string;
    customerEmail?: string;
    services?: string[];
    planNotes?: string;
    spectrumOrderId?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { customerName, customerAddress, customerPhone, customerEmail, services, planNotes, spectrumOrderId } = body;

  if (!customerName?.trim() || !customerAddress?.trim() || !customerPhone?.trim()) {
    return NextResponse.json(
      { error: "customerName, customerAddress, and customerPhone are required" },
      { status: 400 }
    );
  }

  if (!Array.isArray(services) || services.length === 0) {
    return NextResponse.json({ error: "At least one service must be selected" }, { status: 400 });
  }

  const validServices = ["Internet", "TV", "Mobile", "Voice"];
  const sanitizedServices = services.filter((s) => validServices.includes(s));
  if (sanitizedServices.length === 0) {
    return NextResponse.json({ error: "Invalid service selection" }, { status: 400 });
  }

  const sale = await prisma.sale.create({
    data: {
      agentId: session.user.id,
      customerName: customerName.trim(),
      customerAddress: customerAddress.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail?.trim() || null,
      services: JSON.stringify(sanitizedServices),
      planNotes: planNotes?.trim() || null,
      spectrumOrderId: spectrumOrderId?.trim() || null,
    },
    include: {
      agent: { select: { id: true, name: true, username: true } },
    },
  });

  return NextResponse.json(sale, { status: 201 });
}
