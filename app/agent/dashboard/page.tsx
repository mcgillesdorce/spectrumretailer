import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AgentDashboardPage() {
  const session = await auth();
  if (!session) redirect("/agent/login");

  const sales = await prisma.sale.findMany({
    where: { agentId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const serialized = sales.map((s) => ({ ...s, createdAt: s.createdAt.toISOString() }));

  return (
    <DashboardClient
      agentName={session.user.name}
      agentId={session.user.id}
      isAdmin={session.user.role === "ADMIN"}
      initialSales={serialized}
    />
  );
}
