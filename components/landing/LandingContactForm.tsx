"use client";

import { useState, FormEvent } from "react";

const SERVICES = ["Internet", "TV", "Mobile", "Voice", "Bundle", "Not sure"];

const INPUT_CLS =
  "w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors text-base";

export default function LandingContactForm() {
  const [result, setResult] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [selectedService, setSelectedService] = useState("");
  const [showNote, setShowNote] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("sending");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "b8355ef5-b3ed-4614-8b7e-9b17653d932c");
    formData.append("subject", "New Spectrum Customer Inquiry — HIWS");
    if (selectedService) formData.set("service_interest", selectedService);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 9000);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data = await response.json();

      if (data.success) {
        setResult("success");
        setSelectedService("");
        setShowNote(false);
        (event.target as HTMLFormElement).reset();
      } else {
        setResult("error");
      }
    } catch {
      setResult("error");
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
          className="inline-flex items-center gap-2 bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-bold px-6 py-3.5 rounded-xl transition-colors text-base"
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

      {/* Quick-tap service chips */}
      <div>
        <p className="text-white/50 text-xs mb-2 font-medium">I&apos;m interested in:</p>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((svc) => (
            <button
              key={svc}
              type="button"
              onClick={() => setSelectedService(svc === selectedService ? "" : svc)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                selectedService === svc
                  ? "bg-spectrum-gold border-spectrum-gold text-spectrum-dark scale-105"
                  : "bg-white/5 border-white/20 text-white/70 hover:border-white/50 hover:text-white"
              }`}
            >
              {svc}
            </button>
          ))}
        </div>
        <input type="hidden" name="service_interest" value={selectedService || "Not specified"} />
      </div>

      <input
        type="text"
        name="name"
        placeholder="Full name"
        required
        autoComplete="name"
        className={INPUT_CLS}
      />

      <input
        type="email"
        name="email"
        placeholder="Email address"
        required
        autoComplete="email"
        inputMode="email"
        className={INPUT_CLS}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        required
        autoComplete="tel"
        inputMode="tel"
        className={INPUT_CLS}
      />

      <input
        type="text"
        name="address"
        placeholder="ZIP code or city"
        required
        autoComplete="postal-code"
        inputMode="numeric"
        className={INPUT_CLS}
      />

      {/* Progressive disclosure for optional note */}
      {showNote ? (
        <textarea
          name="message"
          placeholder="Anything else we should know? (optional)"
          rows={3}
          autoFocus
          className={`${INPUT_CLS} resize-none`}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowNote(true)}
          className="text-white/40 hover:text-white/70 text-sm transition-colors text-left w-full py-1"
        >
          + Add a note (optional)
        </button>
      )}

      {result === "error" && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-center">
          <p className="text-red-300 text-sm mb-2">Something went wrong.</p>
          <a
            href="tel:8885104882"
            className="inline-flex items-center gap-1.5 text-spectrum-gold font-semibold text-sm hover:text-yellow-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call (888) 510-4882 instead
          </a>
        </div>
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
          "Check Availability →"
        )}
      </button>

      <p className="text-white/30 text-xs text-center pt-1">
        Free quote · No commitment · Same-day response
      </p>
    </form>
  );
}
