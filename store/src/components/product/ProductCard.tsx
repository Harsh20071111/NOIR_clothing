"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/mock-data";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const hasDiscount = product.regularPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
    : 0;

  const handleQuickAdd = () => {
    const variant = product.variants.find((v) => v.stock > 0) ?? product.variants[0];
    if (!variant) {
      return;
    }

    addItem({
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: variant.size,
      color: variant.color,
      quantity: 1,
    });
    setCartOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col h-full bg-card rounded-md shadow-sm border border-border/50 hover:shadow-md transition-shadow"
    >
      <Link href={`/shop/${product.id}`} className="block flex-shrink-0">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-t-md">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.tags.includes("new") && (
              <Badge className="bg-[var(--color-gold)] text-white text-[10px] font-semibold tracking-wider px-2.5 py-0.5 rounded-sm hover:bg-[var(--color-gold-dark)] border-none">
                NEW
              </Badge>
            )}
            {hasDiscount && (
              <Badge className="bg-red-500 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-sm hover:bg-red-600 border-none">
                -{discountPercent}%
              </Badge>
            )}
          </div>

          {/* Quick Add Button */}
          <motion.button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleQuickAdd();
            }}
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background text-foreground shadow-sm p-2.5 hover:bg-[var(--color-gold)] hover:text-white rounded-full z-10"
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag className="w-4 h-4" />
          </motion.button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase font-medium mb-1">
          {product.brand}
        </p>
        <Link href={`/shop/${product.id}`} className="flex-1">
          <h3 className="text-sm font-medium text-foreground group-hover:text-[var(--color-gold-dark)] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          {hasDiscount ? (
            <>
              <span className="text-sm font-semibold text-foreground">
                ${product.price.toLocaleString("en-US")}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                ${product.regularPrice.toLocaleString("en-US")}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-foreground">
              ${product.price.toLocaleString("en-US")}
            </span>
          )}
        </div>

        {/* Color dots */}
        <div className="flex gap-1.5 pt-3 mt-auto">
          {Array.from(
            new Set(product.variants.map((v) => v.colorHex))
          ).map((hex) => (
            <span
              key={hex}
              className="w-3.5 h-3.5 rounded-full border border-border shadow-sm"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
