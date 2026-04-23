"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [promoVisible, setPromoVisible] = useState(true);

  return (
    <div className="relative z-[60]">
      {/* App Promo Banner */}
      {promoVisible && (
        <div className="bg-[#0A0A0A] text-white py-2 px-4 text-center relative">
          <p className="text-[11px] sm:text-xs tracking-wide">
            <span className="text-[var(--color-gold)]">Conquer Your Style on the NOIR App</span>
            <span className="mx-2 text-white/40">|</span>
            New Here? Get 10% Off
            <span className="mx-2 text-white/40">|</span>
            <span className="font-bold text-[var(--color-gold)]">NOIR10</span>
          </p>
          <button
            onClick={() => setPromoVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            aria-label="Close promo banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Discount Marquee */}
      <div className="bg-[var(--color-gold)] overflow-hidden py-1.5">
        <div className="animate-marquee flex whitespace-nowrap" style={{ "--marquee-duration": "25s" } as React.CSSProperties}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-[11px] sm:text-xs font-semibold text-black tracking-wide mx-8">
              Get Flat $5 OFF on $49+ orders
              <span className="mx-2">•</span>
              Code: INSTANT100
              <span className="mx-2">•</span>
              1,70,000+ Happy Customers
              <span className="mx-2">★</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
