"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useCartStore } from "@/store/useCartStore";
import { categories } from "@/lib/mock-data";
import { MobileDrawer } from "./MobileDrawer";
import { SearchSheet } from "./SearchSheet";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop By Category", href: "/shop", hasMega: true },
  { name: "Sale", href: "/shop?tag=sale" },
  { name: "Fit Guide", href: "/fit-guide" },
  { name: "Policy", href: "/policy" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();
  const items = useCartStore((s) => s.items);
  const isCartOpen = useCartStore((s) => s.isOpen);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const toggleCart = useCartStore((s) => s.toggleCart);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    if (drawerOpen || searchOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen, searchOpen, isCartOpen]);

  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <>
      <motion.header
        className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-transparent transition-shadow"
        animate={{
          boxShadow: isScrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
          borderBottomColor: isScrolled ? "#E5E7EB" : "transparent",
        }}
        transition={{ duration: 0.3 }}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Left: Hamburger + Logo + Links */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Open menu"
                id="mobile-menu-button"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link href="/" className="flex items-center">
                <span className="text-2xl md:text-3xl font-bold tracking-[0.08em]" style={{ fontFamily: "var(--font-bebas)" }}>
                  NOIR
                  <span className="text-[var(--color-gold)]">.</span>
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-6 ml-6">
                {navLinks.map((link) =>
                  link.hasMega ? (
                    <div
                      key={link.name}
                      ref={megaRef}
                      onMouseEnter={handleMegaEnter}
                      onMouseLeave={handleMegaLeave}
                      className="relative"
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-wide text-foreground/70 hover:text-foreground transition-colors py-4"
                      >
                        {link.name}
                        <ChevronDown className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-[13px] font-semibold uppercase tracking-wide text-foreground/70 hover:text-foreground transition-colors relative group py-4"
                    >
                      {link.name}
                      <span className="absolute bottom-3 left-0 w-0 h-[1.5px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-foreground/60 hover:text-foreground transition-colors p-1"
                aria-label="Search products"
                id="search-button"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    className="hidden sm:block text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 border border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all"
                    id="sign-in-button"
                  >
                    Sign In
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton appearance={{ elements: { avatarBox: "w-7 h-7" } }} />
              </Show>

              <button
                onClick={toggleCart}
                className="relative text-foreground/60 hover:text-foreground transition-colors p-1"
                aria-label="Shopping bag"
                id="cart-button"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--color-gold)] text-[9px] font-bold text-white flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mega Menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleMegaLeave}
              className="absolute left-0 right-0 bg-white border-b border-border shadow-lg overflow-hidden z-40"
            >
              <div className="max-w-[1400px] mx-auto px-8 py-8 grid grid-cols-4 gap-8">
                {categories.filter(c => c.subcategories.length > 0).map((cat) => (
                  <div key={cat.id}>
                    <Link
                      href={`/shop?category=${cat.slug}`}
                      className="text-sm font-bold uppercase tracking-wider text-foreground hover:text-[var(--color-gold)] transition-colors"
                    >
                      {cat.name}
                    </Link>
                    <ul className="mt-3 space-y-2">
                      {cat.subcategories.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={`/shop?category=${cat.slug}&sub=${sub.slug}`}
                            onClick={() => setMegaOpen(false)}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}
