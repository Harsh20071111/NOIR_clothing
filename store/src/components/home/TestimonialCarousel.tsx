"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/mock-data";

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), []);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-10 md:py-16 bg-[#FAFAFA]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-8 text-center" style={{ fontFamily: "var(--font-bebas)" }}>
          COMMUNITY SQUAD NOIR 🚀
        </h2>

        {/* Desktop: show 3 cards */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-border p-6 flex flex-col"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed flex-1">"{t.text}"</p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Verified buyer · {t.product}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: single card carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-border p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">"{testimonials[current].text}"</p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-bold">{testimonials[current].name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Verified buyer · {testimonials[current].product}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-4">
            <button onClick={prev} className="w-8 h-8 flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-all" aria-label="Previous review">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-muted-foreground">{current + 1} / {testimonials.length}</span>
            <button onClick={next} className="w-8 h-8 flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-all" aria-label="Next review">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
