"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { categories } from "@/lib/mock-data";
import { useState } from "react";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const extraLinks = [
  { name: "Sale", href: "/shop?tag=sale" },
  { name: "Fit Guide", href: "/fit-guide" },
  { name: "Policy", href: "/policy" },
];

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-[70] w-[85%] max-w-sm bg-white border-r border-border flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <span className="text-2xl font-bold tracking-[0.08em]" style={{ fontFamily: "var(--font-bebas)" }}>
                NOIR<span className="text-[var(--color-gold)]">.</span>
              </span>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close menu" id="close-drawer-button">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              <Link href="/" onClick={onClose} className="block px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-colors">
                Home
              </Link>

              {/* Shop By Category heading */}
              <p className="px-6 pt-4 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Shop By Category</p>

              {categories.map((cat, idx) => (
                <motion.div key={cat.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                  {cat.subcategories.length > 0 ? (
                    <div>
                      <button
                        onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                        className="w-full flex items-center justify-between px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-colors"
                      >
                        <span>{cat.name}</span>
                        <motion.div animate={{ rotate: expandedCategory === cat.id ? 90 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {expandedCategory === cat.id && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden bg-secondary/20">
                            <Link href={`/shop?category=${cat.slug}`} onClick={onClose} className="block px-10 py-2.5 text-sm font-medium text-[var(--color-gold-dark)]">
                              View All {cat.name}
                            </Link>
                            {cat.subcategories.map((sub) => (
                              <Link key={sub.slug} href={`/shop?category=${cat.slug}&sub=${sub.slug}`} onClick={onClose} className="block px-10 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link href={`/shop?category=${cat.slug}`} onClick={onClose} className="block px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-colors">
                      {cat.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              <div className="my-3 mx-6 border-t border-border" />

              {extraLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={onClose} className="block px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-colors">
                  {link.name}
                </Link>
              ))}

              <div className="my-3 mx-6 border-t border-border" />
              <div className="px-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Account</p>
                <Show when="signed-out">
                  <div className="grid grid-cols-2 gap-2">
                    <SignInButton mode="modal">
                      <button onClick={onClose} className="w-full text-sm font-bold uppercase tracking-wider py-2.5 border border-border text-foreground hover:bg-secondary transition-colors" id="mobile-sign-in-button">Sign In</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button onClick={onClose} className="w-full text-sm font-bold uppercase tracking-wider text-white bg-foreground hover:opacity-90 py-2.5 transition-opacity" id="mobile-sign-up-button">Sign Up</button>
                    </SignUpButton>
                  </div>
                </Show>
                <Show when="signed-in">
                  <div className="flex items-center justify-between border border-border px-3 py-2">
                    <span className="text-sm font-medium">My Account</span>
                    <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
                  </div>
                </Show>
              </div>
            </nav>

            <div className="p-5 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">© 2026 NOIR. All rights reserved.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
