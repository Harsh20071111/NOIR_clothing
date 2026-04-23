"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/mock-data";
import { useCartStore } from "@/store/useCartStore";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const sizes = product.sizeType === "alpha"
    ? ["XS", "S", "M", "L", "XL", "XXL"]
    : ["28", "30", "32", "34", "36", "38"];

  const availableSizes = new Set(product.variants.map((v) => v.size));

  const handleSizeClick = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.variants.find((v) => v.size === size);
    if (!variant || variant.stock <= 0) return;
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

  const tagColor = product.tag?.includes("NEW ARRIVAL") || product.tag?.includes("New Launch")
    ? "bg-[#2E7D32] text-white"
    : product.tag?.includes("BEST SELLER") || product.tag?.includes("Hot Selling")
    ? "bg-[#E65100] text-white"
    : "bg-[#0A0A0A] text-white";

  const hasDiscount = product.regularPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
    : 0;

  return (
    <div className="group flex flex-col w-full">
      {/* Image Container */}
      <Link href={`/shop/${product.id}`} className="product-card relative block aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
        {/* Primary Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="product-card-img product-card-img-primary object-cover object-center"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Secondary Image (hover swap) */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate`}
            fill
            className="product-card-img product-card-img-secondary object-cover object-center opacity-0 absolute inset-0"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Tag Badge */}
        {product.tag && (
          <span className={`absolute bottom-2 left-2 z-10 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm shadow-sm ${tagColor}`}>
            {product.tag}
          </span>
        )}

        {/* Discount Badge */}
        {hasDiscount && discountPercent > 0 && (
          <span className="absolute bottom-2 right-2 z-10 text-[8px] sm:text-[9px] font-bold bg-[var(--color-sale)] text-white px-1.5 py-0.5 rounded-sm shadow-sm">
            -{discountPercent}%
          </span>
        )}
      </Link>

      {/* Product Info */}
      <div className="pt-3 pb-1 px-1">
        <Link href={`/shop/${product.id}`}>
          <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2 hover:text-[var(--color-gold-dark)] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-1.5">
          {hasDiscount && (
            <span className="price-original">${product.regularPrice.toLocaleString("en-US")}</span>
          )}
          <span className={hasDiscount ? "price-sale" : "text-sm font-bold text-foreground"}>
            ${product.price.toLocaleString("en-US")}
          </span>
        </div>

        {/* Size Selector */}
        <div className="flex flex-wrap gap-1 mt-2">
          {sizes.map((size) => {
            const isAvailable = availableSizes.has(size);
            return (
              <button
                key={size}
                onClick={(e) => handleSizeClick(size, e)}
                disabled={!isAvailable}
                className={`size-btn ${!isAvailable ? "opacity-30 cursor-not-allowed line-through" : ""}`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
