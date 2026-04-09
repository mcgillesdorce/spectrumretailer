"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // Always show success to prevent user enumeration
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Header card */}
      <div className="bg-spectrum-blue rounded-t-2xl px-8 py-6 text-center shadow-xl">
        <h1 className="text-white text-2xl font-bold tracking-wide">SPECTRUM</h1>
        <p className="text-spectrum-gold text-xs font-bold tracking-[3px] mt-1">AUTHORIZED RESELLER</p>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-b-2xl px-8 py-8 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Forgot Password</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter the email address on your account and we&apos;ll send a reset link.
        </p>

        {status === "sent" ? (
          <div className="text-center py-4">
            <div className="text-green-600 font-semibold mb-2">Check your inbox</div>
            <p className="text-sm text-gray-500 mb-6">
              If that email is on an active account, a reset link is on its way.
              The link expires in 1 hour.
            </p>
            <Link href="/agent/login" className="text-spectrum-blue text-sm font-medium hover:underline">
              ← Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === "error" && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                Something went wrong. Please try again.
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-sm"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-spectrum-blue text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send Reset Link"}
            </button>

            <div className="text-center">
              <Link href="/agent/login" className="text-spectrum-blue text-sm hover:underline">
                ← Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
