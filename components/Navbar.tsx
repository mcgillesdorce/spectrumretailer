"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-spectrum-dark sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-white font-bold text-lg tracking-tight">
              HIWS
              <span className="text-spectrum-gold font-normal text-sm ml-1">Home Internet &amp; Wireless</span>
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
