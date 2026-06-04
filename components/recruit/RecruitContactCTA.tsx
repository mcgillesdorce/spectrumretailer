export default function RecruitContactCTA() {
  return (
    <section className="py-16 sm:py-20 bg-spectrum-dark px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-spectrum-gold font-semibold text-sm uppercase tracking-wider mb-2">
            Let&apos;s Talk
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Questions? We&apos;re Here for You
          </h2>
          <p className="text-white/60 mt-3 max-w-xl mx-auto">
            Not ready to apply yet? That&apos;s okay. Reach out directly and we&apos;ll answer any questions
            you have about the retailer opportunity with no pressure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
            <div className="text-spectrum-gold mb-3 flex justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Call Us</h3>
            <p className="text-white/80 text-sm font-medium">(888) 510-4882</p>
            <p className="text-white/40 text-xs mt-0.5">Mon – Sat 9am–8pm · Sun 2pm–6:30pm</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
            <div className="text-spectrum-gold mb-3 flex justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Email Us</h3>
            <p className="text-white/80 text-sm font-medium">Info@HIWS.io</p>
            <p className="text-white/40 text-xs mt-0.5">We reply within 24 hours</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
            <div className="text-spectrum-gold mb-3 flex justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Hours of Operation</h3>
            <p className="text-white/80 text-sm font-medium">Mon – Sat: 9:00 AM – 8:00 PM</p>
            <p className="text-white/40 text-xs mt-0.5">Sun: 2:00 PM – 6:30 PM</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-white/80 text-sm mb-2">Ready to take the next step?</p>
          <p className="text-white font-semibold text-lg mb-6">
            Apply now and a member of our team will reach out within 1 business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-bold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Apply Now
            </a>
            <a
              href="tel:8885104882"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (888) 510-4882
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
