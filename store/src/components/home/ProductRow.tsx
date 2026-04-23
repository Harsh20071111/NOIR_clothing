"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/mock-data";
import { ProductCard } from "./ProductCard";

interface ProductRowProps {
  title: string;
  products: Product[];
}

export function ProductRow({ title, products }: ProductRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-8 md:py-12">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide" style={{ fontFamily: "var(--font-bebas)" }}>
          {title}
        </h2>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => scroll("left")} className="w-9 h-9 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all" aria-label="Scroll left">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => scroll("right")} className="w-9 h-9 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all" aria-label="Scroll right">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide snap-x-mandatory px-4 sm:px-6 lg:px-8 pb-2"
          style={{ maxWidth: "1400px", margin: "0 auto" }}
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="snap-start shrink-0 w-[48%] sm:w-[31%] md:w-[23%] lg:w-[19%]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
