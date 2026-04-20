"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/mock-data";
import { ArrowUpRight } from "lucide-react";

export function SquareProductGrid({ products }: { products: Product[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants} className="group relative w-full aspect-square bg-secondary/30 overflow-hidden cursor-pointer">
          <Link href={`/shop/${product.id}`} className="block w-full h-full">
            {/* Image Box */}
            <div className="absolute inset-0 z-0">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-[800ms] ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Dark overlay on hover for better text visibility */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 z-10" />
            </div>

            {/* Default Info (Bottom Left) */}
            <div className="absolute bottom-0 left-0 p-5 z-20 w-full bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>{product.name}</h3>
              <p className="text-white/80 font-medium mt-1">
                ${(product.discountPrice ?? product.price).toLocaleString("en-US")}
              </p>
            </div>

            {/* Hover Info (Centered) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
              <h3 className="text-white font-extrabold text-2xl text-center px-4 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                {product.name}
              </h3>
              <span className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-white bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/30 hover:bg-white hover:text-black transition-colors">
                View Details
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.section>
  );
}
