"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) setErrorMsg("Missing or invalid reset link.");
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      setStatus("success");
      setTimeout(() => router.push("/agent/login"), 2500);
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error ?? "Something went wrong. The link may have expired.");
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
        <h2 className="text-xl font-bold text-gray-900 mb-1">Set New Password</h2>
        <p className="text-sm text-gray-500 mb-6">Choose a strong password for your account.</p>

        {status === "success" ? (
          <div className="text-center py-4">
            <div className="text-green-600 font-semibold mb-2">Password updated!</div>
            <p className="text-sm text-gray-500">Redirecting you to login…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                {errorMsg}
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-sm"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-spectrum-blue text-sm"
                placeholder="Repeat your new password"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !token}
              className="w-full bg-spectrum-blue text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Saving…" : "Save New Password"}
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
