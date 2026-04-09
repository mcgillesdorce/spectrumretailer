const services = [
  {
    icon: "📡",
    name: "Internet",
    tagline: "Up to 1 Gbps speeds",
    description:
      "Spectrum Internet delivers fast, reliable, no-contract broadband with no data caps. Stream, work from home, and game — all at the same time.",
    highlights: ["Up to 1 Gbps download", "No data caps", "Free modem included", "24/7 support"],
    color: "blue",
  },
  {
    icon: "📺",
    name: "TV",
    tagline: "200+ channels included",
    description:
      "Enjoy hundreds of channels in crystal-clear HD, including local channels, sports, news, and entertainment — with no contracts.",
    highlights: ["200+ HD channels", "Free HD programming", "On Demand library", "Spectrum TV App"],
    color: "purple",
  },
  {
    icon: "📱",
    name: "Mobile",
    tagline: "Unlimited lines available",
    description:
      "Spectrum Mobile runs on the largest 5G network in the US. Get unlimited data or pay by the gig — and save when you bundle with Internet.",
    highlights: [
      "Unlimited data plans",
      "4G LTE & 5G nationwide",
      "No contract required",
      "Bundle discounts",
    ],
    color: "gold",
  },
  {
    icon: "📞",
    name: "Voice",
    tagline: "Unlimited calling",
    description:
      "Spectrum Voice gives you crystal-clear home phone service with unlimited local and long-distance calling in the US and more.",
    highlights: [
      "Unlimited US calling",
      "Voicemail included",
      "Keep your number",
      "911 service",
    ],
    color: "green",
  },
];

const colorMap: Record<string, { bg: string; border: string; badge: string }> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    badge: "bg-spectrum-blue text-white",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-100",
    badge: "bg-spectrum-purple text-white",
  },
  gold: {
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    badge: "bg-spectrum-gold text-spectrum-dark",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-100",
    badge: "bg-green-600 text-white",
  },
};

export default function ServicesGrid() {
  return (
    <section id="services" className="py-16 sm:py-20 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-spectrum-blue font-semibold text-sm uppercase tracking-wider mb-2">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Spectrum Services
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            All Spectrum services are available with no annual contract. Bundle and save even more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => {
            const c = colorMap[svc.color];
            return (
              <div
                key={svc.name}
                className={`rounded-2xl border p-6 flex flex-col ${c.bg} ${c.border}`}
              >
                <div className="text-4xl mb-3" aria-hidden="true">
                  {svc.icon}
                </div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Spectrum {svc.name}</h3>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start mb-4 ${c.badge}`}>
                  {svc.tagline}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">
                  {svc.description}
                </p>
                <ul className="space-y-1.5">
                  {svc.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {h}
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
