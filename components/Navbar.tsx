"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-spectrum-dark sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-spectrum-blue rounded-lg w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              SPECTRUM
              <span className="text-spectrum-gold font-normal text-sm ml-1">Reseller</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-white/70 hover:text-white text-sm transition-colors">
              Services
            </a>
            <a href="#service-area" className="text-white/70 hover:text-white text-sm transition-colors">
              Service Area
            </a>
            <a href="#contact" className="text-white/70 hover:text-white text-sm transition-colors">
              Contact
            </a>
            <Link
              href="/agent/login"
              className="bg-spectrum-blue hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Agent Login
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/70 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-2 pt-4 flex flex-col gap-3">
            <a href="#services" className="text-white/70 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>
              Services
            </a>
            <a href="#service-area" className="text-white/70 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>
              Service Area
            </a>
            <a href="#contact" className="text-white/70 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
            <Link
              href="/agent/login"
              className="bg-spectrum-blue text-white text-sm font-semibold px-4 py-2 rounded-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              Agent Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
