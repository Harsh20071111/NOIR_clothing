"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/lib/mock-data";

interface SearchSheetProps {
  open: boolean;
  onClose: () => void;
}

export function SearchSheet({ open, onClose }: SearchSheetProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return products.slice(0, 5);
    }

    return products
      .filter((product) => {
        const haystack = `${product.name} ${product.brand} ${product.category}`.toLowerCase();
        return haystack.includes(trimmed);
      })
      .slice(0, 6);
  }, [query]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = query.trim();
    router.push(`/shop?search=${encodeURIComponent(search)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/35"
          />

          <motion.section
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-[80] border-b border-border bg-background/95 backdrop-blur-md"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex items-center gap-3">
                <form onSubmit={handleSubmit} className="flex-1">
                  <div className="flex items-center rounded-md border border-border bg-background px-3 py-2.5">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input
                      autoFocus
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search products"
                      className="w-full bg-transparent px-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                      aria-label="Search products"
                    />
                    <button
                      type="submit"
                      className="text-xs font-semibold rounded-sm px-2.5 py-1.5 bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-dark)] transition-colors"
                    >
                      Search
                    </button>
                  </div>
                </form>

                <button
                  onClick={onClose}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2.5">
                  Quick picks
                </p>
                <div className="grid gap-2">
                  {suggestions.map((product) => (
                    <Link
                      key={product.id}
                      href={`/shop/${product.id}`}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-sm border border-border/70 px-3 py-2.5 hover:border-[var(--color-gold)] hover:bg-secondary/40 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        ${product.price.toLocaleString("en-US")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
