import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LandingContactForm from "@/components/landing/LandingContactForm";
import StickyCallBar from "@/components/landing/StickyCallBar";

export const metadata: Metadata = {
  title: "Get Spectrum Internet, TV & Mobile | HIWS",
  description:
    "Fast Spectrum Internet, TV, Mobile, and Voice service in your area. No contracts. Local support. Get a free quote today from HIWS.",
};

const services = [
  {
    icon: "📡",
    name: "Internet",
    tagline: "Up to 1 Gbps",
    desc: "Blazing-fast, no-contract broadband with no data caps and a free modem included.",
    color: "bg-blue-500/10 border-blue-500/20",
    badge: "bg-spectrum-blue text-white",
  },
  {
    icon: "📺",
    name: "TV",
    tagline: "200+ Channels",
    desc: "Hundreds of HD channels including local, sports, news, and entertainment — no annual contract.",
    color: "bg-purple-500/10 border-purple-500/20",
    badge: "bg-spectrum-purple text-white",
  },
  {
    icon: "📱",
    name: "Mobile",
    tagline: "5G Nationwide",
    desc: "Spectrum Mobile on the largest 5G network. Unlimited data or pay by the gig — save when you bundle.",
    color: "bg-yellow-500/10 border-yellow-500/20",
    badge: "bg-spectrum-gold text-spectrum-dark",
  },
  {
    icon: "📞",
    name: "Voice",
    tagline: "Unlimited Calling",
    desc: "Crystal-clear home phone with unlimited local and long-distance calling in the US.",
    color: "bg-green-500/10 border-green-500/20",
    badge: "bg-green-600 text-white",
  },
];

const reasons = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "No Contracts",
    desc: "Month-to-month service. Cancel anytime without early termination fees.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Local Support",
    desc: "Real people, local to your area — not a call center overseas.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Bundle & Save",
    desc: "Stack Internet, TV, Mobile, and Voice for the best price on every service.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Fast Setup",
    desc: "Quick installation with same-week appointments available in most areas.",
  },
];

export default function GetStartedPage() {
  return (
    <div id="top" className="min-h-screen bg-spectrum-dark">
      <StickyCallBar />

      {/* ── Minimal header ── */}
      <header className="bg-spectrum-dark/90 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-white font-bold text-base tracking-tight">
              HIWS
              <span className="text-spectrum-gold font-normal text-xs ml-1 hidden sm:inline">
                Home Internet &amp; Wireless
              </span>
            </span>
          </Link>
          <a
            href="tel:8885104882"
            className="flex items-center gap-1.5 bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-bold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (888) 510-4882
          </a>
        </div>
      </header>

      {/* ── Hero + Form ── */}
      <section className="bg-gradient-to-br from-spectrum-dark via-[#002a5c] to-spectrum-blue px-4 pt-10 pb-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

            {/* Left: copy */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-5 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Spectrum Service Available In Your Area
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                Fast Internet, TV &amp; Mobile —{" "}
                <span className="text-spectrum-gold">No Contracts</span>
              </h1>

              <p className="text-white/70 text-base sm:text-lg mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Get the best Spectrum deal for your home. Fill out the form and a local HIWS
                advisor will build you a personalized quote — usually within the same day.
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                {["Free Quote", "No Commitment", "Same-Day Response", "Local Experts"].map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 text-white/70 text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                  >
                    <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hero image — visible on mobile above form, hidden on lg (shown below) */}
              <div className="relative w-full max-w-sm mx-auto lg:hidden rounded-2xl overflow-hidden mb-8 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                  alt="Family enjoying fast internet at home"
                  width={600}
                  height={380}
                  className="object-cover w-full h-52"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-spectrum-dark/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-sm">Trusted by thousands of homes</p>
                  <p className="text-white/60 text-xs">Spectrum Authorized Retailer</p>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="w-full lg:w-[420px] flex-shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
                <p className="text-spectrum-gold font-semibold text-xs uppercase tracking-wider mb-1">
                  Get Your Free Quote
                </p>
                <h2 className="text-white font-bold text-xl mb-5">
                  Check service in your area
                </h2>
                <LandingContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-spectrum-blue font-semibold text-xs uppercase tracking-wider mb-2">
              What We Offer
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              All Spectrum Services, One Local Team
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              Bundle and save on Internet, TV, Mobile, and Voice — all with no annual contract.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((svc) => (
              <div
                key={svc.name}
                className={`rounded-2xl border p-5 flex gap-4 items-start ${svc.color}`}
              >
                <div className="text-3xl flex-shrink-0" aria-hidden="true">{svc.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">Spectrum {svc.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${svc.badge}`}>
                      {svc.tagline}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo banner ── */}
      <section className="relative h-52 sm:h-64 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80"
          alt="Modern home with fast internet connection"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-spectrum-dark/70 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-2">Available Now</p>
          <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-4">
            Is Spectrum in Your Neighborhood?
          </h3>
          <a
            href="#top"
            className="bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Check My Address →
          </a>
        </div>
      </section>

      {/* ── Why HIWS ── */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-spectrum-blue font-semibold text-xs uppercase tracking-wider mb-2">
              Why Choose Us
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              The HIWS Difference
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              We&apos;re not just a sales team — we&apos;re your local Spectrum experts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r) => (
              <div key={r.title} className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4">
                <div className="text-spectrum-blue flex-shrink-0 mt-0.5">{r.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{r.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof ── */}
      <section className="py-14 px-4 bg-spectrum-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-spectrum-gold font-semibold text-xs uppercase tracking-wider mb-2">
              Happy Customers
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              What People Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                quote: "Switching to Spectrum through HIWS was the easiest thing I've done. Same-day response, great price, and the internet is blazing fast.",
                name: "Maria T.",
                location: "Miami, FL",
              },
              {
                quote: "I was paying way too much with my old provider. The HIWS team found me a bundle that cut my bill almost in half. Couldn't be happier.",
                name: "James R.",
                location: "Houston, TX",
              },
              {
                quote: "Super helpful, super fast. I filled out the form in the morning and had a plan set up by the afternoon. Highly recommend.",
                name: "Angela M.",
                location: "Charlotte, NC",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-spectrum-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-white/40 text-xs">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 px-4 bg-gradient-to-br from-spectrum-blue to-spectrum-dark text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Get Connected?
          </h2>
          <p className="text-white/60 text-sm mb-6">
            Scroll up and fill out the form, or give us a call — we&apos;re available Mon–Sat 9am–8pm
            and Sunday 2–6:30pm.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#top"
              className="bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-extrabold px-8 py-4 rounded-xl text-base transition-colors"
            >
              Get My Free Quote
            </a>
            <a
              href="tel:8885104882"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-base transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (888) 510-4882
            </a>
          </div>
        </div>
      </section>

      {/* ── Minimal footer ── */}
      <footer className="bg-gray-900 px-4 py-6 pb-24 lg:pb-6 text-center">
        <p className="text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} HIWS — Home Internet and Wireless Solutions. All rights reserved.
          <br />
          Spectrum® is a trademark of Charter Communications. HIWS is an authorized reseller.
        </p>
        <div className="flex justify-center gap-4 mt-3 text-xs text-gray-600">
          <Link href="/" className="hover:text-gray-400 transition-colors">Home</Link>
          <Link href="/become-a-partner" className="hover:text-gray-400 transition-colors">Become a Partner</Link>
          <a href="mailto:Info@HIWS.io" className="hover:text-gray-400 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
