"use client";

import { useState, FormEvent } from "react";

export default function LandingContactForm() {
  const [result, setResult] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("sending");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "b8355ef5-b3ed-4614-8b7e-9b17653d932c");
    formData.append("subject", "New Spectrum Customer Inquiry — HIWS");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("success");
      (event.target as HTMLFormElement).reset();
    } else {
      setResult("error");
      setErrorMsg("Something went wrong. Please call (888) 510-4882.");
    }
  };

  if (result === "success") {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">You&apos;re All Set!</h3>
        <p className="text-white/70 text-sm max-w-xs mx-auto mb-6">
          Thanks! We&apos;ll reach out shortly about Spectrum service in your area.
        </p>
        <a
          href="tel:8885104882"
          className="inline-flex items-center gap-2 bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-bold px-6 py-3 rounded-xl transition-colors text-base"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Us Now
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input type="checkbox" name="botcheck" style={{ display: "none" }} />

      <input
        type="text"
        name="name"
        placeholder="Full name"
        required
        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors text-base"
      />

      <input
        type="email"
        name="email"
        placeholder="Email address"
        required
        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors text-base"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        required
        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors text-base"
      />

      <input
        type="text"
        name="address"
        placeholder="Service address (street, city, ZIP)"
        required
        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors text-base"
      />

      <select
        name="service_interest"
        required
        defaultValue=""
        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors text-base appearance-none"
      >
        <option value="" disabled className="bg-spectrum-dark">I&apos;m interested in…</option>
        <option value="Internet" className="bg-spectrum-dark">Internet</option>
        <option value="TV" className="bg-spectrum-dark">TV</option>
        <option value="Mobile" className="bg-spectrum-dark">Mobile</option>
        <option value="Voice" className="bg-spectrum-dark">Voice</option>
        <option value="Bundle" className="bg-spectrum-dark">Bundle (multiple services)</option>
        <option value="Not sure" className="bg-spectrum-dark">Not sure / need help choosing</option>
      </select>

      <textarea
        name="message"
        placeholder="Anything else we should know? (optional)"
        rows={3}
        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors text-base resize-none"
      />

      {result === "error" && (
        <p className="text-red-300 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={result === "sending"}
        className="w-full bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-extrabold py-4 px-6 rounded-xl text-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
      >
        {result === "sending" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Sending…
          </span>
        ) : (
          "Get My Free Quote →"
        )}
      </button>

      <p className="text-white/30 text-xs text-center pt-1">
        No spam. No commitment. We&apos;ll contact you within 1 business day.
      </p>
    </form>
  );
}
