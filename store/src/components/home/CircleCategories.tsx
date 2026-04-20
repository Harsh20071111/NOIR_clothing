"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/mock-data";

export function CircleCategories({ categories }: { categories: Category[] }) {
  return (
    <section className="w-full overflow-hidden py-8 md:py-12 flex justify-center border-b border-border/40 bg-secondary/20">
      <div className="flex gap-6 sm:gap-10 md:gap-16 px-4 overflow-x-auto scrollbar-hide shrink-0 pb-4 items-center">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link href={`/shop?category=${cat.slug}`} className="flex flex-col items-center group gap-3">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-sm ring-1 ring-border group-hover:ring-primary/40 group-hover:shadow-lg group-hover:scale-[1.03] transition-all duration-300">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 96px, 112px"
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
