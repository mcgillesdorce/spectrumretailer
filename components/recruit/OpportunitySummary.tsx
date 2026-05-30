const benefits = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "gold",
    title: "Competitive Commissions",
    description:
      "Earn commissions on every Internet, TV, Mobile, and Voice activation you close. The more you sell, the more you earn — with no cap on your income.",
    points: ["Per-activation commissions", "Residual income potential", "Bonus incentives available", "Monthly performance rewards"],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "blue",
    title: "Full Training & Support",
    description:
      "We equip you with everything you need to succeed — from product knowledge and sales techniques to back-office tools and order support.",
    points: ["Comprehensive onboarding", "Ongoing sales coaching", "Dedicated account manager", "Marketing materials provided"],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "purple",
    title: "Sell a Trusted Brand",
    description:
      "Spectrum is one of the largest and most recognized telecom brands in the US. You're not just selling service — you're selling trust.",
    points: ["30M+ existing customers", "Nationwide recognition", "Industry-leading product lineup", "No-contract offerings customers love"],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "green",
    title: "Build Your Own Team",
    description:
      "Scale beyond yourself. Recruit and manage a team of agents under your umbrella and earn overrides on their production as your operation grows.",
    points: ["Team override commissions", "Sub-agent recruitment support", "Scalable business model", "Leadership development paths"],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    color: "orange",
    title: "Flexible & Low Overhead",
    description:
      "There's no franchise fee, no inventory to carry, and no office required. You can operate independently or from an existing storefront.",
    points: ["No startup costs", "Work independently or in-store", "No inventory required", "Flexible hours and territory"],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "teal",
    title: "Defined Service Territory",
    description:
      "Work within a defined geographic area where Spectrum services are available. HIWS helps match your territory to where you can succeed fastest.",
    points: ["Territory guidance provided", "High-demand service areas", "Multi-state opportunities", "Urban & suburban markets"],
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  gold:   { bg: "bg-yellow-50",  border: "border-yellow-100", icon: "text-spectrum-gold",   badge: "bg-yellow-100 text-yellow-800" },
  blue:   { bg: "bg-blue-50",    border: "border-blue-100",   icon: "text-spectrum-blue",   badge: "bg-blue-100 text-blue-800" },
  purple: { bg: "bg-purple-50",  border: "border-purple-100", icon: "text-spectrum-purple", badge: "bg-purple-100 text-purple-800" },
  green:  { bg: "bg-green-50",   border: "border-green-100",  icon: "text-green-600",       badge: "bg-green-100 text-green-800" },
  orange: { bg: "bg-orange-50",  border: "border-orange-100", icon: "text-orange-600",      badge: "bg-orange-100 text-orange-800" },
  teal:   { bg: "bg-teal-50",    border: "border-teal-100",   icon: "text-teal-600",        badge: "bg-teal-100 text-teal-800" },
};

export default function OpportunitySummary() {
  return (
    <section className="py-16 sm:py-20 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-spectrum-blue font-semibold text-sm uppercase tracking-wider mb-2">
            Why Partner With Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            The Retailer Opportunity
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            HIWS Authorized Retailers get everything they need to build a sustainable, scalable
            business around one of America&apos;s most recognized telecom brands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const c = colorMap[b.color];
            return (
              <div
                key={b.title}
                className={`rounded-2xl border p-6 flex flex-col ${c.bg} ${c.border}`}
              >
                <div className={`mb-4 ${c.icon}`}>{b.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{b.description}</p>
                <ul className="space-y-1.5">
                  {b.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
