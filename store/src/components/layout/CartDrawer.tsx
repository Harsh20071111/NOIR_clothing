"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, Gift, Tag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const tieredOffers = [
  { min: 2, label: "Buy 2 get 10% off", code: "DOUBLEUP10", icon: Tag },
  { min: 3, label: "Buy 3 get 15% off + Freebie", code: "THREEBIES15", icon: Gift },
  { min: 5, label: "Buy 5 get 25% off + Freebie", code: "FIVEFEST25", icon: Gift },
];

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.totalPrice());
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

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
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md border-l border-border bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-sm font-bold tracking-wider uppercase">
                Your Cart ({totalQty})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tiered Discount Offers */}
            <div className="px-4 py-3 bg-[#FFF8E1] border-b border-[#FFE082] space-y-1.5">
              {tieredOffers.map((offer) => {
                const Icon = offer.icon;
                const isActive = totalQty >= offer.min;
                return (
                  <div key={offer.code} className={`flex items-center gap-2 text-xs ${isActive ? "text-[#E65100] font-bold" : "text-[#6D4C00]"}`}>
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{offer.label}</span>
                    <span className="ml-auto font-mono text-[10px] bg-white/80 px-1.5 py-0.5 rounded">{offer.code}</span>
                  </div>
                );
              })}
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium">Your cart is empty</p>
                <p className="text-xs text-muted-foreground mt-1 mb-5">
                  Add something you love and it will appear here.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setCartOpen(false)}
                  className="text-xs font-bold uppercase tracking-wider px-4 py-2.5 bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-3 border border-border/70 p-3">
                      <div className="relative w-16 h-20 overflow-hidden bg-secondary shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.size} / {item.color}</p>
                        <p className="text-sm font-bold mt-1.5">${item.price.toLocaleString("en-US")}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center border border-border">
                            <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Decrease quantity">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Increase quantity">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.variantId)} className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors" aria-label="Remove item">
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
                    <span className="font-bold text-lg">${subtotal.toLocaleString("en-US")}</span>
                  </div>
                  <button onClick={clearCart} className="w-full py-2.5 text-xs font-bold uppercase tracking-wider border border-border text-foreground hover:bg-secondary transition-colors">
                    Clear Cart
                  </button>
                  <button className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-foreground text-background hover:opacity-90 transition-opacity">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
