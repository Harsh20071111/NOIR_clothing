"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { Product } from "@/lib/mock-data";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

function ProductSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[3/4] w-full bg-white/5 rounded-sm" />
      <Skeleton className="h-3 w-16 bg-white/5" />
      <Skeleton className="h-4 w-32 bg-white/5" />
      <Skeleton className="h-4 w-20 bg-white/5" />
    </div>
  );
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <p className="text-lg font-medium text-muted-foreground mb-2">
          No products found
        </p>
        <p className="text-sm text-muted-foreground/60">
          Try adjusting your filters to find what you&apos;re looking for.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
    >
      {products.map((product, i) => (
        <motion.div key={product.id} variants={staggerItem}>
          <ProductCard product={product} index={i} />
        </motion.div>
      ))}
    </motion.div>
  );
}
