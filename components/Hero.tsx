import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-spectrum-dark via-spectrum-blue to-spectrum-purple py-20 sm:py-28 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6 border border-white/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Authorized Spectrum Reseller
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Fast, Reliable{" "}
          <span className="text-spectrum-gold">Internet, TV</span>{" "}
          &amp; Mobile For Your Home
        </h1>

        <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
          As an authorized Spectrum reseller, we help you find the right plan for your home or
          business — with local, personalized support every step of the way.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#services"
            className="bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            View Services
          </a>
          <a
            href="#contact"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
