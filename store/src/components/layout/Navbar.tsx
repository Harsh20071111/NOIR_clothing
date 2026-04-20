"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useCartStore } from "@/store/useCartStore";
import { MobileDrawer } from "./MobileDrawer";
import { SearchSheet } from "./SearchSheet";
import { CartDrawer } from "./CartDrawer";

const headerVariants = {
  scrolled: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(16px)",
    borderBottomColor: "rgba(0, 0, 0, 0.08)",
    borderBottomWidth: "1px",
  },
  notScrolled: {
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    backdropFilter: "blur(8px)",
    borderBottomColor: "rgba(0, 0, 0, 0)",
    borderBottomWidth: "1px",
  },
};

const navLinks = [
  { name: "Home", href: "/" },
  { name: "New Drops", href: "/shop?category=new-drops" },
  { name: "Men", href: "/shop?category=men" },
  { name: "Women", href: "/shop?category=women" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();
  const items = useCartStore((s) => s.items);
  const isCartOpen = useCartStore((s) => s.isOpen);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const MotionLink = motion(Link);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldScroll = latest > 20;
    if (shouldScroll !== isScrolled) {
      setIsScrolled(shouldScroll);
    }
  });

  useEffect(() => {
    if (drawerOpen || searchOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, searchOpen, isCartOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={false}
        animate={isScrolled ? "scrolled" : "notScrolled"}
        variants={headerVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Hamburger + Links */}
            <div className="flex items-center gap-6">
              <motion.button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden"
                animate={{ color: isScrolled ? "rgb(75, 85, 99)" : "rgb(75, 85, 99)" }}
                whileHover={{ color: isScrolled ? "rgb(31, 41, 55)" : "rgb(31, 41, 55)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                aria-label="Open menu"
                id="mobile-menu-button"
              >
                <Menu className="w-6 h-6" />
              </motion.button>

              <Link href="/" className="flex items-center gap-2">
                <span
                  className="text-xl md:text-2xl font-bold tracking-wider font-[var(--font-heading)]"
                >
                  <motion.span
                    animate={{ color: isScrolled ? "rgb(31, 41, 55)" : "rgb(31, 41, 55)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    NOIR
                  </motion.span>
                  <span className="text-[var(--color-gold)]">.</span>
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-8 ml-8">
                {navLinks.map((link) => (
                  <MotionLink
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium relative group"
                    animate={{ color: "rgb(55, 65, 81)" }}
                    whileHover={{ color: "rgb(31, 41, 55)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
                  </MotionLink>
                ))}
              </div>
            </div>

            {/* Right: Utility Icons */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setSearchOpen(true)}
                className=""
                animate={{ color: isScrolled ? "rgb(55, 65, 81)" : "rgb(55, 65, 81)" }}
                whileHover={{ color: isScrolled ? "rgb(31, 41, 55)" : "rgb(31, 41, 55)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                aria-label="Search products"
                id="search-button"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Clerk Auth Controls */}
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <motion.button
                    className="text-xs font-semibold px-3 py-1.5 border rounded-sm hidden sm:block"
                    animate={{
                      color: isScrolled ? "rgb(17, 24, 39)" : "rgb(17, 24, 39)",
                      borderColor: isScrolled ? "rgb(229, 231, 235)" : "rgba(0, 0, 0, 0.12)"
                    }}
                    whileHover={{
                      color: isScrolled ? "rgb(31, 41, 55)" : "rgb(31, 41, 55)",
                      borderColor: isScrolled ? "rgb(229, 231, 235)" : "rgba(0, 0, 0, 0.2)"
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    id="sign-in-button"
                  >
                    Sign In
                  </motion.button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    className="text-xs font-semibold text-white bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] transition-colors px-3 py-1.5 rounded-sm hidden sm:block"
                    id="sign-up-button"
                  >
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </Show>

              <motion.button
                onClick={toggleCart}
                className="relative"
                animate={{ color: isScrolled ? "rgb(55, 65, 81)" : "rgb(55, 65, 81)" }}
                whileHover={{ color: isScrolled ? "rgb(31, 41, 55)" : "rgb(31, 41, 55)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                aria-label="Shopping bag"
                id="cart-button"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--color-gold)] text-[10px] font-bold text-white flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}
