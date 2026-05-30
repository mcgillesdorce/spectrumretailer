const commissions = [
  {
    service: "Internet",
    icon: "📡",
    color: "blue",
    perActivation: "Competitive",
    notes: "Base rate per new residential or business activation. Rates vary by plan tier.",
    badge: "Most Common",
  },
  {
    service: "TV",
    icon: "📺",
    color: "purple",
    perActivation: "Bundled Bonus",
    notes: "Earn additional commission when bundled with Internet. Standalone TV activations also eligible.",
    badge: "Bundle Boost",
  },
  {
    service: "Mobile",
    icon: "📱",
    color: "gold",
    perActivation: "Per Line",
    notes: "Commission paid per mobile line activated. Multi-line households multiply your earnings.",
    badge: "Per Line",
  },
  {
    service: "Voice",
    icon: "📞",
    color: "green",
    perActivation: "Add-On",
    notes: "Typically added to existing service packages. Commissions stack with Internet and TV.",
    badge: "Stack & Earn",
  },
];

const colorMap: Record<string, { bg: string; border: string; badge: string }> = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   badge: "bg-spectrum-blue text-white" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-spectrum-purple text-white" },
  gold:   { bg: "bg-yellow-50", border: "border-yellow-200", badge: "bg-spectrum-gold text-spectrum-dark" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  badge: "bg-green-600 text-white" },
};

const steps = [
  {
    step: "01",
    title: "Submit Your Application",
    description: "Fill out the form above. Our team reviews every submission and responds within 1 business day.",
  },
  {
    step: "02",
    title: "Intro Call with HIWS",
    description: "We'll schedule a quick call to learn about your goals, confirm your service area, and explain the program in detail.",
  },
  {
    step: "03",
    title: "Onboarding & Training",
    description: "Complete Spectrum product training and HIWS compliance certification — typically done within a week.",
  },
  {
    step: "04",
    title: "Get Authorized & Start Selling",
    description: "Receive your retailer credentials, access to our agent portal, and marketing support. You're ready to go.",
  },
  {
    step: "05",
    title: "Submit Orders & Get Paid",
    description: "Submit customer orders through our portal. Commissions are tracked and paid on a regular schedule.",
  },
];

export default function CommissionGuide() {
  return (
    <section className="py-16 sm:py-20 bg-white px-4">
      <div className="max-w-6xl mx-auto">

        {/* Commission breakdown */}
        <div className="text-center mb-12">
          <p className="text-spectrum-blue font-semibold text-sm uppercase tracking-wider mb-2">
            What You Earn
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Commission Structure
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Earn commissions on every Spectrum service you activate. Rates are reviewed individually
            during your intro call — below is a breakdown of how earnings work by product.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {commissions.map((c) => {
            const col = colorMap[c.color];
            return (
              <div key={c.service} className={`rounded-2xl border p-6 flex flex-col ${col.bg} ${col.border}`}>
                <div className="text-4xl mb-3" aria-hidden="true">{c.icon}</div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">Spectrum {c.service}</h3>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start mb-4 ${col.badge}`}>
                  {c.badge}
                </span>
                <p className="text-2xl font-extrabold text-gray-900 mb-2">{c.perActivation}</p>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{c.notes}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center mb-16">
          <p className="text-spectrum-blue font-semibold text-sm mb-1">Commission Transparency</p>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Exact commission rates are disclosed during your personalized intro call, as they vary
            by plan, market, and volume tiers. We believe in full transparency — no hidden fees,
            no chargebacks on legitimate sales, no surprises.
          </p>
        </div>

        {/* Onboarding process */}
        <div className="text-center mb-12">
          <p className="text-spectrum-gold font-semibold text-sm uppercase tracking-wider mb-2">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            From Application to First Sale
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            The process is straightforward. Most new retailers are actively selling within 1–2 weeks
            of submitting their application.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-[28px] top-4 bottom-4 w-0.5 bg-gray-200" />

          <div className="space-y-6">
            {steps.map((s, i) => (
              <div key={s.step} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-spectrum-dark text-white flex items-center justify-center font-extrabold text-sm z-10">
                  {s.step}
                </div>
                <div className={`flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-5 ${i === steps.length - 1 ? "" : ""}`}>
                  <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
