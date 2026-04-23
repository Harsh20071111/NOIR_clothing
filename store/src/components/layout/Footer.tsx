import Link from "next/link";
import { Globe, Play, MessageCircle } from "lucide-react";

const footerLinks = {
  "Top Categories": [
    { name: "Oversized T-Shirts", href: "/shop?category=tshirts&sub=oversized-fit" },
    { name: "Joggers", href: "/shop?category=bottomwear&sub=joggers" },
    { name: "Cargo Pants", href: "/shop?category=bottomwear&sub=cargo" },
    { name: "Hoodies", href: "/shop?category=winterwear&sub=hoodies" },
    { name: "Polo Shirts", href: "/shop?collection=polo" },
  ],
  "Best Seller": [
    { name: "Glory Arc Tee", href: "/shop/prod-2" },
    { name: "Wild Drift Joggers", href: "/shop/prod-5" },
    { name: "Distressed Hoodie", href: "/shop/prod-8" },
    { name: "Shadow Stripe Polo", href: "/shop/prod-9" },
  ],
  Company: [
    { name: "Home", href: "/" },
    { name: "Track My Order", href: "/track-order" },
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" },
  ],
  Policies: [
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold tracking-[0.08em]" style={{ fontFamily: "var(--font-bebas)" }}>
                NOIR<span className="text-[var(--color-gold)]">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
              Premium streetwear crafted for the bold. Designed in India, worn worldwide.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/20 text-white/50 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all" aria-label="Instagram">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/20 text-white/50 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all" aria-label="YouTube">
                <Play className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/20 text-white/50 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all" aria-label="Twitter">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[11px] font-bold tracking-[0.15em] text-white/80 uppercase mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2026 NOIR. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <Link href="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/refund-policy" className="hover:text-white/60 transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
