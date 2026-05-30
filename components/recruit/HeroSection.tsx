export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-spectrum-dark via-spectrum-blue to-spectrum-purple py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6 border border-white/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Now Accepting Retailer Applications
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Become a{" "}
          <span className="text-spectrum-gold">Spectrum Authorized</span>{" "}
          Retailer
        </h1>

        <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-4 leading-relaxed">
          Partner with HIWS and build a profitable business selling Spectrum Internet, TV, Mobile,
          and Voice — backed by full training, real support, and competitive commissions.
        </p>

        <p className="text-white/50 text-sm max-w-xl mx-auto mb-10">
          Whether you&apos;re an independent agent or an established business, we have a path for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#apply"
            className="bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            Apply Now
          </a>
          <a
            href="#guide"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Learn More
          </a>
        </div>

        {/* Quick stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { value: "30M+", label: "Spectrum Customers Nationwide" },
            { value: "$0", label: "Startup Cost to Partner" },
            { value: "24/7", label: "Dedicated Retailer Support" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-xl py-5 px-4"
            >
              <p className="text-3xl font-extrabold text-spectrum-gold mb-1">{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
