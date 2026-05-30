"use client";

import { useState, FormEvent } from "react";

export default function ApplicationForm() {
  const [result, setResult] = useState<"idle" | "sending" | "success" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("sending");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "9583fa9a-c238-42b8-bff2-08b15d952f26");
    formData.append("subject", "New Spectrum Retailer Application — HIWS");

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
    }
  };

  return (
    <section id="apply" className="py-16 sm:py-20 bg-spectrum-dark px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-spectrum-gold font-semibold text-sm uppercase tracking-wider mb-2">
            Ready to Get Started?
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Apply to Become a Retailer
          </h2>
          <p className="text-white/60 mt-3 max-w-lg mx-auto">
            Fill out the form below and a member of our team will reach out within 1 business day
            to discuss next steps and answer your questions.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          {result === "success" ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Application Received!</h3>
              <p className="text-white/60 text-sm max-w-sm mx-auto">
                Thanks for your interest. A member of the HIWS team will be in touch within 1 business day.
              </p>
              <button
                onClick={() => setResult("idle")}
                className="mt-6 text-spectrum-gold hover:text-yellow-300 text-sm underline transition-colors"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-1.5" htmlFor="name">
                  Full Name <span className="text-spectrum-gold">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors"
                />
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-1.5" htmlFor="business_name">
                  Business Name <span className="text-white/40 font-normal">(optional)</span>
                </label>
                <input
                  id="business_name"
                  type="text"
                  name="business_name"
                  placeholder="Acme Communications LLC"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-1.5" htmlFor="email">
                  Email Address <span className="text-spectrum-gold">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-1.5" htmlFor="phone">
                  Phone Number <span className="text-white/40 font-normal">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="(555) 000-0000"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors"
                />
              </div>

              {/* State / Location */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-1.5" htmlFor="location">
                  State / City Where You Plan to Operate <span className="text-spectrum-gold">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  required
                  placeholder="e.g. Florida, New York, Texas"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-1.5" htmlFor="experience">
                  Sales / Telecom Experience <span className="text-white/40 font-normal">(optional)</span>
                </label>
                <select
                  id="experience"
                  name="experience"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors appearance-none"
                >
                  <option value="" className="bg-spectrum-dark">Select one…</option>
                  <option value="None" className="bg-spectrum-dark">No prior experience</option>
                  <option value="Sales < 1 year" className="bg-spectrum-dark">Sales — less than 1 year</option>
                  <option value="Sales 1-3 years" className="bg-spectrum-dark">Sales — 1–3 years</option>
                  <option value="Sales 3+ years" className="bg-spectrum-dark">Sales — 3+ years</option>
                  <option value="Telecom" className="bg-spectrum-dark">Telecom / ISP industry</option>
                  <option value="Business owner" className="bg-spectrum-dark">Existing business owner</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-1.5" htmlFor="message">
                  Tell Us About Yourself / Questions <span className="text-spectrum-gold">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us a bit about your background, why you're interested, and any questions you have…"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-spectrum-gold focus:border-transparent transition-colors resize-none"
                />
              </div>

              {result === "error" && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl px-4 py-3 text-sm">
                  Something went wrong. Please try again or email us at{" "}
                  <a href="mailto:hiwsinternet@gmail.com" className="underline">
                    hiwsinternet@gmail.com
                  </a>
                  .
                </div>
              )}

              <button
                type="submit"
                disabled={result === "sending"}
                className="w-full bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-bold py-4 px-6 rounded-xl text-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {result === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>

              <p className="text-white/30 text-xs text-center">
                We respect your privacy. Your information will only be used to contact you about this opportunity.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
