"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.totalPrice());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[70] bg-black/35"
          />

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.2 }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md border-l border-border bg-background shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-sm font-bold tracking-wider uppercase text-foreground">
                Your Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground">Your cart is empty</p>
                <p className="text-xs text-muted-foreground mt-1 mb-5">
                  Add something you love and it will appear here.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setCartOpen(false)}
                  className="text-xs font-semibold rounded-sm px-3 py-2 bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-dark)] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.variantId}
                      className="flex gap-3 rounded-md border border-border/70 p-3"
                    >
                      <div className="relative w-16 h-20 rounded-sm overflow-hidden bg-secondary shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-2">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.size} / {item.color}
                        </p>
                        <p className="text-sm font-semibold mt-1.5 text-foreground">
                          ${item.price.toLocaleString("en-US")}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center border border-border rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                              aria-label={`Decrease quantity for ${item.name}`}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                              aria-label={`Increase quantity for ${item.name}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ${subtotal.toLocaleString("en-US")}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={clearCart}
                      className="py-2.5 text-xs font-semibold rounded-sm border border-border text-foreground hover:bg-secondary transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="py-2.5 text-xs font-semibold rounded-sm bg-foreground text-background hover:bg-primary transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
