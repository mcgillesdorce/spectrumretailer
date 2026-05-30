const required = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Age & Legal Status",
    description: "Must be 18 years or older and legally authorized to work in the United States.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Background Check",
    description: "A basic background screening is required as part of the Spectrum retailer authorization process.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Sales Commitment",
    description: "A genuine commitment to learning Spectrum's products and maintaining a consistent sales effort within your territory.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Complete Onboarding",
    description: "Must complete the HIWS onboarding program, including Spectrum product training and compliance certification.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Spectrum Service Area",
    description: "You must operate in a geographic area where Spectrum services are available. We'll confirm coverage before onboarding.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: "Basic Technology",
    description: "Access to a smartphone and basic computer literacy for submitting orders and tracking commissions through our portal.",
  },
];

const suitable = [
  "Independent sales agents",
  "Existing telecom or retail businesses",
  "Door-to-door or in-home sales professionals",
  "Community organizations & local marketers",
  "Entrepreneurs seeking a low-cost business",
  "Multi-level marketing professionals",
  "Real estate or property management companies",
  "Small businesses seeking additional revenue",
];

export default function RequirementsSection() {
  return (
    <section id="guide" className="py-16 sm:py-20 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-spectrum-purple font-semibold text-sm uppercase tracking-wider mb-2">
            What You Need
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Retailer Requirements
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Our requirements are straightforward. If you're motivated and operate in a Spectrum
            service area, you likely already qualify.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {required.map((req) => (
            <div
              key={req.title}
              className="bg-white rounded-2xl border border-gray-200 p-6 flex gap-4"
            >
              <div className="text-spectrum-blue flex-shrink-0 mt-0.5">{req.icon}</div>
              <div>
                <h3 className="text-gray-900 font-bold text-sm mb-1">{req.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{req.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Who is it for */}
        <div className="bg-spectrum-dark rounded-2xl p-8 sm:p-10">
          <div className="max-w-3xl mx-auto">
            <p className="text-spectrum-gold font-semibold text-sm uppercase tracking-wider mb-2 text-center">
              Who Applies?
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-8">
              This Opportunity Is Perfect For…
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suitable.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-spectrum-gold flex-shrink-0" />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-xs text-center mt-8">
              Don&apos;t see yourself listed? Apply anyway — we evaluate each applicant individually.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
