export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-spectrum-dark px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-spectrum-gold font-semibold text-sm uppercase tracking-wider mb-2">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            We&apos;re Here to Help
          </h2>
          <p className="text-white/60 mt-3 max-w-xl mx-auto">
            Have questions about plans, availability, or pricing? Contact us and we'll help you
            find the right Spectrum service for your home or business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <ContactCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            title="Call Us"
            line1="(888) 510-4882"
            line2="Mon – Sat 9am–8pm · Sun 2pm–6:30pm"
          />
          <ContactCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Email Us"
            line1="orinalenelus31@gmail.com"
            line2="We reply within 24 hours"
          />
          <ContactCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            }
            title="Live Chat"
            line1="Chat with an agent"
            line2="Available during business hours"
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-white/80 text-sm mb-2">Ready to get started?</p>
          <p className="text-white font-semibold text-lg mb-6">
            Call us and we&apos;ll set you up with the best Spectrum plan for your needs.
          </p>
          <a
            href="tel:8885104882"
            className="inline-flex items-center gap-2 bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call (888) 510-4882
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  title,
  line1,
  line2,
}: {
  icon: React.ReactNode;
  title: string;
  line1: string;
  line2: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
      <div className="text-spectrum-gold mb-3 flex justify-center">{icon}</div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-white/80 text-sm font-medium">{line1}</p>
      <p className="text-white/40 text-xs mt-0.5">{line2}</p>
    </div>
  );
}
