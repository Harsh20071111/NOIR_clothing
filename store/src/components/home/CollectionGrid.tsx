"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/mock-data";

export function CollectionGrid() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-6" style={{ fontFamily: "var(--font-bebas)" }}>
          SHOP BY COLLECTION
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {collections.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Link
                href={`/shop?collection=${col.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-[#F5F5F5]"
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide" style={{ fontFamily: "var(--font-bebas)" }}>
                    {col.name}
                  </h3>
                  <p className="text-white/70 text-xs mt-1">{col.description}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
                    Shop Now
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
