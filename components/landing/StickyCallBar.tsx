"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function StickyCallBar() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const bar = (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: "12px",
        display: "flex",
        gap: "8px",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 300ms ease",
        background: "rgba(0,27,58,0.97)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
      className="lg:hidden"
    >
      <a
        href="#top"
        style={{ flex: 1, textAlign: "center", padding: "14px 0", borderRadius: "12px", fontWeight: 800, fontSize: "14px", background: "#F6A623", color: "#001B3A", textDecoration: "none" }}
      >
        Get My Free Quote
      </a>
      <a
        href="tel:8885104882"
        style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "6px", padding: "14px 16px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", textDecoration: "none" }}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call
      </a>
    </div>
  );

  return createPortal(bar, document.body);
}
