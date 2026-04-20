import Link from "next/link";
import { Globe, MessageCircle } from "lucide-react";

const footerLinks = {
  Shop: [
    { name: "New Drops", href: "/shop?category=new-drops" },
    { name: "Men", href: "/shop?category=men" },
    { name: "Women", href: "/shop?category=women" },
    { name: "Accessories", href: "/shop?category=accessories" },
  ],
  Help: [
    { name: "FAQs", href: "/faq" },
    { name: "Shipping & Returns", href: "/shipping-returns" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Track Order", href: "/track-order" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary/30 mt-auto border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-wider text-foreground">
                NOIR<span className="text-[var(--color-gold)]">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium streetwear crafted for the bold. Designed in India, worn
              worldwide.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[var(--color-gold-dark)] transition-colors"
                aria-label="Instagram"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[var(--color-gold-dark)] transition-colors"
                aria-label="Twitter"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold tracking-widest text-foreground uppercase mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 NOIR. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
