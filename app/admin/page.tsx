import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminPanelClient from "./AdminPanelClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/agent/login");
  if (session.user.role !== "ADMIN") redirect("/agent/dashboard");

  return <AdminPanelClient adminName={session.user.name} adminId={session.user.id} />;
}
