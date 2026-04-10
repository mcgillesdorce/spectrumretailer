"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

const SPECTRUM_ORDER_URL =
  "https://retail.spectrum.com/address/agent-retail/localization?affiliate=426538&salesID=RT23058";

const SERVICE_OPTIONS = ["Internet", "TV", "Mobile", "Voice"] as const;

interface Sale {
  id: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string | null;
  services: string; // JSON-encoded array
  planNotes: string | null;
  spectrumOrderId: string | null;
  status: string;
  createdAt: string;
  agent?: { id: string; name: string; username: string };
}

const STATUS_STYLES: Record<string, string> = {
  SUBMITTED: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-600",
};

function parseServices(raw: string): string[] {
  try {
    return JSON.parse(raw);
  } catch {
    return [raw];
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardClient({
  agentName,
  agentId,
  isAdmin,
  initialSales,
}: {
  agentName: string;
  agentId: string;
  isAdmin: boolean;
  initialSales: Sale[];
}) {
  const [activeTab, setActiveTab] = useState<"portal" | "log" | "history">("portal");
  const [sales, setSales] = useState<Sale[]>(initialSales);

  // Log sale form
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [planNotes, setPlanNotes] = useState("");
  const [spectrumOrderId, setSpectrumOrderId] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function toggleService(svc: string) {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  }

  async function fetchSales() {
    const res = await fetch("/api/sales");
    if (res.ok) setSales(await res.json());
  }

  async function handleLogSale(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setSubmitting(true);

    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        customerAddress,
        customerPhone,
        customerEmail: customerEmail || undefined,
        services: selectedServices,
        planNotes: planNotes || undefined,
        spectrumOrderId: spectrumOrderId || undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setFormError(data.error ?? "Failed to log sale");
    } else {
      setFormSuccess(`Sale for ${data.customerName} logged successfully!`);
      setCustomerName("");
      setCustomerAddress("");
      setCustomerPhone("");
      setCustomerEmail("");
      setSelectedServices([]);
      setPlanNotes("");
      setSpectrumOrderId("");
      fetchSales();
      setTimeout(() => {
        setFormSuccess("");
        setActiveTab("history");
      }, 1800);
    }
    setSubmitting(false);
  }

  async function handleStatusChange(saleId: string, status: string) {
    await fetch(`/api/sales/${saleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchSales();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <nav className="bg-spectrum-dark shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="https://www.hiws.io/agent/dashboard" className="text-white font-bold text-lg tracking-tight">
                HIWS <span className="font-normal text-white/70">Portal</span>
              </Link>
              <div className="hidden sm:flex items-center gap-1">
                <button onClick={() => setActiveTab("portal")}
                  className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${activeTab === "portal" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
                  Order Portal
                </button>
                <button onClick={() => setActiveTab("log")}
                  className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${activeTab === "log" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
                  Log Sale
                </button>
                <button onClick={() => setActiveTab("history")}
                  className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${activeTab === "history" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
                  My Sales
                </button>
                {isAdmin && (
                  <Link href="/admin"
                    className="text-sm text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
                    Admin Panel
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/80 text-sm hidden sm:block">
                <span className="text-white font-medium">{agentName}</span>
              </span>
              <button type="button"
                className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
                onClick={async () => {
                  await fetch("/api/auth/signout", { method: "POST" });
                  window.location.href = "/";
                }}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Agent welcome strip */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-11 h-11 rounded-full bg-spectrum-blue flex items-center justify-center text-white font-bold text-lg">
            {agentName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{agentName}</h1>
            <p className="text-sm text-gray-500">
              {isAdmin ? "Administrator" : "Sales Agent"} · HIWS
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-200 rounded-xl p-1 mb-6 w-full sm:w-auto sm:inline-flex">
          {(
            [
              { key: "portal", label: "Order Portal" },
              { key: "log", label: "Log a Sale" },
              { key: "history", label: `My Sales (${sales.length})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Order Portal */}
        {activeTab === "portal" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Click below to open the Spectrum order portal in a new tab. Your affiliate ID and
              sales ID are automatically included. After placing an order, come back and log the
              sale in the <strong>Log a Sale</strong> tab.
            </p>
            <a
              href={SPECTRUM_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-spectrum-blue hover:bg-spectrum-dark text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Spectrum Order Portal
            </a>
            <p className="text-xs text-gray-400 mt-3">
              Opens in a new tab · Affiliate ID: 426538 · Sales ID: RT23058
            </p>

            {/* Quick service reference */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-gray-100">
              {[
                { icon: "📡", label: "Internet" },
                { icon: "📺", label: "TV" },
                { icon: "📱", label: "Mobile" },
                { icon: "📞", label: "Voice" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="text-sm font-medium text-gray-700">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Log a Sale */}
        {activeTab === "log" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Log a Sale</h2>
            <p className="text-sm text-gray-500 mb-6">
              Record the customer information and services sold. This will be visible to your
              admin.
            </p>

            {formError && (
              <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg px-4 py-3 text-sm mb-5">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="bg-green-50 border border-green-300 text-green-700 rounded-lg px-4 py-3 text-sm mb-5">
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleLogSale} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="123 Main St, City, ST 12345"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Email
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services Sold <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {SERVICE_OPTIONS.map((svc) => (
                    <label
                      key={svc}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors select-none ${
                        selectedServices.includes(svc)
                          ? "bg-spectrum-blue border-spectrum-blue text-white"
                          : "border-gray-300 text-gray-700 hover:border-spectrum-blue"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedServices.includes(svc)}
                        onChange={() => toggleService(svc)}
                      />
                      {svc}
                    </label>
                  ))}
                </div>
                {selectedServices.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">Select at least one service</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Spectrum Order ID
                  </label>
                  <input
                    type="text"
                    value={spectrumOrderId}
                    onChange={(e) => setSpectrumOrderId(e.target.value)}
                    placeholder="e.g. ORD-12345678"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plan / Notes
                  </label>
                  <input
                    type="text"
                    value={planNotes}
                    onChange={(e) => setPlanNotes(e.target.value)}
                    placeholder="e.g. 500 Mbps + TV Select"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-gray-900"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={submitting || selectedServices.length === 0}
                  className="bg-spectrum-blue hover:bg-spectrum-dark text-white font-semibold px-8 py-3 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Saving…" : "Log Sale"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab: My Sales History */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                My Sales{" "}
                <span className="text-sm font-normal text-gray-400">({sales.length})</span>
              </h2>
              <button
                onClick={fetchSales}
                className="text-sm text-spectrum-blue hover:underline"
              >
                Refresh
              </button>
            </div>

            {sales.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-gray-500 mb-3">No sales logged yet.</p>
                <button
                  onClick={() => setActiveTab("log")}
                  className="text-sm text-spectrum-blue hover:underline"
                >
                  Log your first sale →
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {sales.map((sale) => (
                  <SaleRow key={sale.id} sale={sale} onStatusChange={handleStatusChange} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        Spectrum Authorized Reseller Portal · For authorized agents only
      </footer>
    </div>
  );
}

function SaleRow({ sale, onStatusChange }: { sale: Sale; onStatusChange: (id: string, status: string) => void }) {
  const services = parseServices(sale.services);
  return (
    <div className="px-6 py-4 hover:bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="font-semibold text-gray-900">{sale.customerName}</p>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[sale.status] ?? "bg-gray-100 text-gray-600"}`}
            >
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
              <span
                key={s}
                className="bg-blue-50 text-spectrum-blue text-xs font-medium px-2 py-0.5 rounded-full border border-blue-100"
              >
                {s}
              </span>
            ))}
          </div>
          {(sale.planNotes || sale.spectrumOrderId) && (
            <p className="text-xs text-gray-400 mt-1.5">
              {sale.spectrumOrderId && <span>Order: {sale.spectrumOrderId} · </span>}
              {sale.planNotes && <span>{sale.planNotes}</span>}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <p className="text-xs text-gray-400 whitespace-nowrap">
            {formatDate(sale.createdAt)}
          </p>
          {sale.status === "SUBMITTED" && (
            <div className="flex gap-1">
              <button
                onClick={() => onStatusChange(sale.id, "CONFIRMED")}
                className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => onStatusChange(sale.id, "CANCELLED")}
                className="text-xs bg-red-100 text-red-700 hover:bg-red-200 px-2 py-1 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
