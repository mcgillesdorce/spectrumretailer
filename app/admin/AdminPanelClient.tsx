"use client";

import { useEffect, useState, FormEvent } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

// --- Types ------------------------------------------------------------------

interface Agent {
  id: string;
  username: string;
  name: string;
  role: string;
  active: boolean;
  createdAt: string;
}

interface Sale {
  id: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string | null;
  services: string;
  planNotes: string | null;
  spectrumOrderId: string | null;
  status: string;
  createdAt: string;
  agent: { id: string; name: string; username: string };
}

// --- Helpers -----------------------------------------------------------------

const STATUS_STYLES: Record<string, string> = {
  SUBMITTED: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-600",
};

function parseServices(raw: string): string[] {
  try { return JSON.parse(raw); } catch { return [raw]; }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// --- Main Component -----------------------------------------------------------

export default function AdminPanelClient({
  adminName,
  adminId,
}: {
  adminName: string;
  adminId: string;
}) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "agents" | "sales">("dashboard");

  // Agent state
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentsLoading, setAgentsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"AGENT" | "ADMIN">("AGENT");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Sales state
  const [sales, setSales] = useState<Sale[]>([]);
  const [salesLoading, setSalesLoading] = useState(true);
  const [agentFilter, setAgentFilter] = useState<string>("all");

  // Dashboard month state
  const now = new Date();
  const [dashMonth, setDashMonth] = useState(now.getMonth());
  const [dashYear, setDashYear] = useState(now.getFullYear());

  // -- Fetch helpers --

  async function fetchAgents() {
    setAgentsLoading(true);
    const res = await fetch("/api/agents");
    if (res.ok) setAgents(await res.json());
    setAgentsLoading(false);
  }

  async function fetchSales(forAgent?: string) {
    setSalesLoading(true);
    const url = forAgent && forAgent !== "all"
      ? `/api/sales?agentId=${forAgent}`
      : "/api/sales";
    const res = await fetch(url);
    if (res.ok) setSales(await res.json());
    setSalesLoading(false);
  }

  useEffect(() => { fetchAgents(); fetchSales(); }, []);

  // -- Agent handlers --

  async function handleAddAgent(e: FormEvent) {
    e.preventDefault();
    setFormError(""); setFormSuccess(""); setSubmitting(true);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error ?? "Failed to create agent");
      } else {
        setFormSuccess(`Agent "${data.name}" created successfully.`);
        setUsername(""); setName(""); setPassword(""); setRole("AGENT");
        fetchAgents();
      }
    } catch (err) {
      setFormError("Network error — please try again.");
    }
    setSubmitting(false);
  }

  async function handleToggleActive(agent: Agent) {
    const action = agent.active ? "deactivate" : "reactivate";
    if (!confirm(`Are you sure you want to ${action} agent "${agent.name}"?`)) return;
    if (agent.active) {
      await fetch(`/api/agents/${agent.id}`, { method: "DELETE" });
    } else {
      await fetch(`/api/agents/${agent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: true }),
      });
    }
    fetchAgents();
  }

  async function handleDeleteUser(agent: Agent) {
    if (!confirm(`PERMANENTLY DELETE "${agent.name}" (@${agent.username}) and all their sales? This cannot be undone.`)) return;
    const res = await fetch(`/api/agents/${agent.id}?permanent=true`, { method: "DELETE" });
    if (res.ok) {
      fetchAgents();
      fetchSales(agentFilter === "all" ? undefined : agentFilter);
    }
  }

  async function handleResetPassword(agent: Agent) {
    const newPassword = prompt(`Enter new password for "${agent.name}" (min 8 characters):`);
    if (!newPassword) return;
    if (newPassword.length < 8) { alert("Password must be at least 8 characters."); return; }
    const res = await fetch(`/api/agents/${agent.id}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    });
    if (res.ok) {
      alert(`Password for "${agent.name}" has been reset.`);
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Failed to reset password.");
    }
  }

  // -- Sales handlers --

  async function handleStatusChange(saleId: string, status: string) {
    await fetch(`/api/sales/${saleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchSales(agentFilter === "all" ? undefined : agentFilter);
  }

  async function handleDeleteSale(saleId: string, customerName: string) {
    if (!confirm(`Delete sale record for "${customerName}"? This cannot be undone.`)) return;
    await fetch(`/api/sales/${saleId}`, { method: "DELETE" });
    fetchSales(agentFilter === "all" ? undefined : agentFilter);
  }

  function handleFilterChange(val: string) {
    setAgentFilter(val);
    fetchSales(val === "all" ? undefined : val);
  }

  // -- Stats --

  const totalSales = sales.length;
  const confirmedSales = sales.filter((s) => s.status === "CONFIRMED").length;
  const pendingSales = sales.filter((s) => s.status === "SUBMITTED").length;

  // -- Monthly dashboard stats --

  const monthLabel = new Date(dashYear, dashMonth).toLocaleString("en-US", { month: "long", year: "numeric" });

  const monthlySales = sales.filter((s) => {
    const d = new Date(s.createdAt);
    return d.getMonth() === dashMonth && d.getFullYear() === dashYear;
  });

  const monthlyByAgent = agents.map((agent) => {
    const agentSales = monthlySales.filter((s) => s.agent?.id === agent.id);
    return {
      ...agent,
      submitted: agentSales.filter((s) => s.status === "SUBMITTED").length,
      confirmed: agentSales.filter((s) => s.status === "CONFIRMED").length,
      cancelled: agentSales.filter((s) => s.status === "CANCELLED").length,
      total: agentSales.length,
    };
  }).sort((a, b) => b.total - a.total);

  const maxMonthlySales = Math.max(1, ...monthlyByAgent.map((a) => a.total));

  function prevMonth() {
    if (dashMonth === 0) { setDashMonth(11); setDashYear(dashYear - 1); }
    else setDashMonth(dashMonth - 1);
  }
  function nextMonth() {
    if (dashMonth === 11) { setDashMonth(0); setDashYear(dashYear + 1); }
    else setDashMonth(dashMonth + 1);
  }

  // -- Render ----------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <nav className="bg-spectrum-dark shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="https://www.hiws.io/agent/dashboard" className="flex items-center gap-2">
            <div className="bg-spectrum-blue rounded-lg w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10"/></svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              HIWS <span className="font-normal text-white/70">Admin</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-white/80 text-sm hidden sm:block">
              <span className="text-white font-medium">{adminName}</span> · Administrator
            </span>
            <Link
              href="/agent/dashboard"
              className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              My Dashboard
            </Link>
            <button
              type="button"
              className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
              onClick={() => signOut({ redirectTo: "https://www.hiws.io/agent/login" })}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Panel</h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-200 rounded-xl p-1 mb-8 w-full sm:w-auto sm:inline-flex">
          {(
            [
              { key: "dashboard", label: "Dashboard" },
              { key: "sales", label: `Sales Tracking (${totalSales})` },
              { key: "agents", label: `Agent Management (${agents.length})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* -- Dashboard Tab -- */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Month navigation */}
            <div className="flex items-center justify-between">
              <button onClick={prevMonth} className="text-sm text-spectrum-blue hover:underline">&larr; Previous</button>
              <h2 className="text-lg font-bold text-gray-900">{monthLabel}</h2>
              <button onClick={nextMonth} className="text-sm text-spectrum-blue hover:underline">Next &rarr;</button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard label="Total This Month" value={monthlySales.length} color="blue" />
              <StatCard label="Confirmed" value={monthlySales.filter((s) => s.status === "CONFIRMED").length} color="green" />
              <StatCard label="Pending" value={monthlySales.filter((s) => s.status === "SUBMITTED").length} color="yellow" />
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Monthly Leaderboard</h2>
              </div>
              {monthlyByAgent.length === 0 ? (
                <div className="px-6 py-10 text-center text-gray-400">No agents yet.</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {monthlyByAgent.map((agent, idx) => (
                    <div key={agent.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? "bg-spectrum-gold text-spectrum-dark" : idx === 1 ? "bg-gray-200 text-gray-700" : idx === 2 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-500"}`}>
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{agent.name}</span>
                          <span className="text-xs text-gray-400">@{agent.username}</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${agent.role === "ADMIN" ? "bg-purple-100 text-spectrum-purple" : "bg-blue-50 text-spectrum-blue"}`}>{agent.role}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                          <span>{agent.submitted} submitted</span>
                          <span className="text-green-600">{agent.confirmed} confirmed</span>
                          <span className="text-red-500">{agent.cancelled} cancelled</span>
                          <span className="font-semibold text-gray-900">{agent.total} total</span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-spectrum-blue to-spectrum-purple transition-all" style={{ width: `${(agent.total / maxMonthlySales) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* -- Sales Tab -- */}
        {activeTab === "sales" && (
          <div className="space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard label="Total Sales" value={totalSales} color="blue" />
              <StatCard label="Confirmed" value={confirmedSales} color="green" />
              <StatCard label="Pending" value={pendingSales} color="yellow" />
            </div>

            {/* Filter */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900 flex-1">All Sales</h2>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-500 whitespace-nowrap">Filter by agent:</label>
                  <select
                    value={agentFilter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-spectrum-blue"
                  >
                    <option value="all">All Agents</option>
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} (@{a.username})
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => fetchSales(agentFilter === "all" ? undefined : agentFilter)}
                    className="text-sm text-spectrum-blue hover:underline whitespace-nowrap"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {salesLoading ? (
                <div className="px-6 py-10 text-center text-gray-400">Loading sales…</div>
              ) : sales.length === 0 ? (
                <div className="px-6 py-10 text-center text-gray-400">
                  No sales recorded yet.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {sales.map((sale) => (
                    <AdminSaleRow
                      key={sale.id}
                      sale={sale}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteSale}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* -- Agents Tab -- */}
        {activeTab === "agents" && (
          <div className="space-y-6">
            {/* Add agent */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Add New Agent</h2>

              {formError && (
                <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="bg-green-50 border border-green-300 text-green-700 rounded-lg px-4 py-3 text-sm mb-4">
                  {formSuccess}
                </div>
              )}

              <form onSubmit={handleAddAgent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="janesmith" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Password</label>
                  <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select value={role} onChange={(e) => setRole(e.target.value as "AGENT" | "ADMIN")} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-gray-900 bg-white">
                    <option value="AGENT">Agent</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button type="submit" disabled={submitting} className="bg-spectrum-blue hover:bg-spectrum-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? "Creating…" : "Add Agent"}
                  </button>
                </div>
              </form>
            </div>

            {/* Agent list */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">All Agents <span className="text-sm font-normal text-gray-400">({agents.length})</span></h2>
              </div>

              {agentsLoading ? (
                <div className="px-6 py-10 text-center text-gray-400">Loading agents…</div>
              ) : agents.length === 0 ? (
                <div className="px-6 py-10 text-center text-gray-400">No agents yet.</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {agents.map((agent) => {
                    const agentSalesCount = sales.filter((s) => s.agent?.id === agent.id).length;
                    return (
                      <div key={agent.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-spectrum-blue flex items-center justify-center text-white font-bold text-sm">
                            {agent.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{agent.name}</p>
                            <p className="text-sm text-gray-500">
                              @{agent.username} · <span className={agent.role === "ADMIN" ? "text-spectrum-purple" : "text-gray-400"}>{agent.role}</span>
                              {" · "}<span className="text-gray-400">{agentSalesCount} sale{agentSalesCount !== 1 ? "s" : ""}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${agent.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                            {agent.active ? "Active" : "Inactive"}
                          </span>
                          <button
                            onClick={() => {
                              setActiveTab("sales");
                              handleFilterChange(agent.id);
                            }}
                            className="text-sm text-spectrum-blue hover:underline"
                          >
                            View Sales
                          </button>
                          {agent.id !== adminId && (
                            <>
                              <button
                                onClick={() => handleToggleActive(agent)}
                                className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${agent.active ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}`}
                              >
                                {agent.active ? "Deactivate" : "Reactivate"}
                              </button>
                              <button
                                onClick={() => handleResetPassword(agent)}
                                className="text-sm font-medium text-spectrum-purple hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                Reset PW
                              </button>
                              <button
                                onClick={() => handleDeleteUser(agent)}
                                className="text-sm font-medium text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        HIWS · Admin Panel
      </footer>
    </div>
  );
}

// --- Sub-components -----------------------------------------------------------

function StatCard({ label, value, color }: { label: string; value: number; color: "blue" | "green" | "yellow" }) {
  const colorMap = {
    blue: "bg-blue-50 border-blue-100 text-spectrum-blue",
    green: "bg-green-50 border-green-100 text-green-700",
    yellow: "bg-yellow-50 border-yellow-100 text-yellow-700",
  };
  return (
    <div className={`rounded-xl border p-5 ${colorMap[color]}`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm font-medium mt-1 opacity-80">{label}</p>
    </div>
  );
}

function AdminSaleRow({
  sale,
  onStatusChange,
  onDelete,
}: {
  sale: Sale;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string, name: string) => void;
}) {
  const services = parseServices(sale.services);

  return (
    <div className="px-6 py-4 hover:bg-gray-50">
      <div className="flex flex-col lg:flex-row lg:items-start gap-3">
        {/* Customer info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-semibold text-gray-900">{sale.customerName}</p>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[sale.status] ?? "bg-gray-100 text-gray-600"}`}>
              {sale.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">{sale.customerAddress}</p>
          <p className="text-sm text-gray-500">
            {sale.customerPhone}
            {sale.customerEmail ? ` · ${sale.customerEmail}` : ""}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {services.map((s) => (
              <span key={s} className="bg-blue-50 text-spectrum-blue text-xs font-medium px-2 py-0.5 rounded-full border border-blue-100">{s}</span>
            ))}
          </div>
          {(sale.planNotes || sale.spectrumOrderId) && (
            <p className="text-xs text-gray-400 mt-1.5">
              {sale.spectrumOrderId && <span>Order ID: {sale.spectrumOrderId} · </span>}
              {sale.planNotes && <span>{sale.planNotes}</span>}
            </p>
          )}
        </div>

        {/* Agent + actions */}
        <div className="flex flex-col items-start lg:items-end gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-spectrum-blue flex items-center justify-center text-white text-xs font-bold">
              {sale.agent.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-gray-600">{sale.agent.name}</span>
          </div>
          <p className="text-xs text-gray-400">{formatDate(sale.createdAt)}</p>

          {/* Status changer */}
          <div className="flex items-center gap-2">
            <select
              value={sale.status}
              onChange={(e) => onStatusChange(sale.id, e.target.value)}
              className="text-xs border border-gray-300 rounded-lg px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-spectrum-blue"
            >
              <option value="SUBMITTED">SUBMITTED</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <button
              onClick={() => onDelete(sale.id, sale.customerName)}
              className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
