"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  mobileImage?: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  align?: "left" | "center" | "right";
}

const slides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop",
    title: "THE NEW COLLECTION",
    subtitle: "Bold cuts. Premium fabric. Made for the streets.",
    cta: "SHOP NOW",
    link: "/shop?category=new-drops",
    align: "left",
  },
  {
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop",
    title: "WINTER FLASH SALE",
    subtitle: "Up to 50% off on jackets, hoodies & long coats.",
    cta: "GRAB THE DEAL",
    link: "/shop?category=winterwear",
    align: "center",
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop",
    title: "OVERSIZED ESSENTIALS",
    subtitle: "The perfect drop-shoulder fit. Starting $19.99.",
    cta: "EXPLORE",
    link: "/shop?category=tshirts&sub=oversized-fit",
    align: "right",
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];
  const alignClass = slide.align === "center" ? "items-center text-center" : slide.align === "right" ? "items-end text-right" : "items-start text-left";

  return (
    <section className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover object-center"
            priority={current === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className={`absolute inset-0 z-10 flex flex-col justify-end ${alignClass} px-6 sm:px-12 lg:px-20 pb-12 sm:pb-16 lg:pb-20`}>
        <motion.h1
          key={`title-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-wider max-w-4xl"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          {slide.title}
        </motion.h1>
        <motion.p
          key={`sub-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-white/80 text-sm sm:text-base md:text-lg mt-3 max-w-xl"
        >
          {slide.subtitle}
        </motion.p>
        <motion.div
          key={`cta-${current}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <Link
            href={slide.link}
            className="mt-5 inline-block bg-white text-black px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] hover:bg-[var(--color-gold)] hover:text-white transition-all duration-300"
          >
            {slide.cta}
          </Link>
        </motion.div>
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/30 text-white transition-all" aria-label="Previous slide">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/30 text-white transition-all" aria-label="Next slide">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-4 bg-white/40"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
