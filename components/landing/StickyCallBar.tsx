"use client";

import { useEffect, useState } from "react";

export default function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-3 bg-spectrum-dark/95 backdrop-blur-sm border-t border-white/10 flex gap-2 transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#top"
        className="flex-1 bg-spectrum-gold hover:bg-yellow-400 text-spectrum-dark font-extrabold py-3.5 rounded-xl text-center text-sm transition-colors"
      >
        Get My Free Quote
      </a>
      <a
        href="tel:8885104882"
        className="flex-shrink-0 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-4 py-3.5 rounded-xl text-sm transition-colors flex items-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call
      </a>
    </div>
  );
}
