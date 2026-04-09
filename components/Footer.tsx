import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-4 pt-10 pb-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-white font-bold text-lg mb-2 tracking-tight">
              SPECTRUM{" "}
              <span className="text-spectrum-gold font-normal">Reseller</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              An authorized Spectrum reseller providing Internet, TV, Mobile, and Voice services
              with local support.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Internet
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  TV
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Mobile
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Voice
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#service-area" className="hover:text-white transition-colors">
                  Service Area
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link href="/agent/login" className="hover:text-white transition-colors">
                  Agent Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Spectrum Authorized Reseller. All rights reserved.</p>
          <p>
            Spectrum® is a trademark of Charter Communications. This is an authorized reseller
            site.
          </p>
        </div>
      </div>
    </footer>
  );
}
