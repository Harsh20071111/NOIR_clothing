"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Star, ShoppingCart, Heart, Share2, Truck, ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products, Product, ProductVariant } from "@/lib/mock-data";
import { useCartStore } from "@/store/useCartStore";

export default function ProductProfile() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // We are using mock data for now, ideally fetch from backend API
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "done" | "copied">("idle");

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      // Decode the slug to match names, or use slug directly if your mock has slugs
      // Our mock has IDs, so we'll match by name logic or ID
      const found = products.find(
        (p) =>
          p.id === slug ||
          p.name.toLowerCase().replace(/ /g, "-") === slug
      );
      
      setProduct(found || null);
      if (found) {
        // Pre-select first available color and size
        if (found.variants && found.variants.length > 0) {
          setSelectedColor(found.variants[0].color);
          setSelectedSize(found.variants[0].size);
        }
      }
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center bg-background">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you are looking for does not exist.</p>
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  // Derive unique colors and sizes from variants
  const uniqueColors = Array.from(new Set(product.variants.map((v: ProductVariant) => v.color)));
  const uniqueSizes = Array.from(new Set(product.variants.map((v: ProductVariant) => v.size)));

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }

    const selectedVariant =
      product.variants.find(
        (variant) => variant.size === selectedSize && variant.color === selectedColor
      ) ?? product.variants[0];

    if (!selectedVariant) {
      return;
    }

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      image: product.images[0],
      price: product.discountPrice ?? product.price,
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity,
    });
    setCartOpen(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on NOIR`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("done");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus("copied");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus("copied");
      } catch {
        setShareStatus("idle");
      }
    }

    window.setTimeout(() => setShareStatus("idle"), 1800);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li>
              <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            </li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 mb-10 lg:mb-0">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 lg:w-24 shrink-0 scrollbar-hide">
              {product.images.map((image: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-24 lg:w-full lg:h-32 shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[3/4] rounded-lg overflow-hidden bg-secondary">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col mt-4 px-2 sm:px-0">
            <div className="mb-2">
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                {product.brand}
              </h2>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-outfit)" }}>
                {product.name}
              </h1>
            </div>

            {/* Reviews & Price */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
              
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">
                  ${(product.discountPrice ?? product.price).toLocaleString("en-US")}
                </span>
                {product.discountPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.price.toLocaleString("en-US")}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="py-6 border-b border-border">
              <p className="text-base text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Selectors */}
            <div className="py-6 space-y-6 border-b border-border">
              {/* Colors */}
              {uniqueColors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-foreground">Color</h3>
                    <span className="text-sm text-muted-foreground capitalize">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {uniqueColors.map((color: string) => {
                      const variant = product.variants.find((v: ProductVariant) => v.color === color);
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            selectedColor === color 
                              ? "ring-2 ring-offset-2 ring-primary scale-110" 
                              : "ring-1 ring-border hover:scale-105"
                          }`}
                          style={{ backgroundColor: variant?.colorHex || color.toLowerCase() }}
                          title={color}
                          aria-label={`Select ${color} color`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {uniqueSizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-foreground">Size</h3>
                    <Link
                      href="/size-guide"
                      className="text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      Size Guide
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {uniqueSizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] px-4 py-2 rounded-md font-medium text-sm transition-colors border ${
                          selectedSize === size
                            ? "bg-foreground text-background border-foreground"
                            : "bg-background text-foreground border-border hover:border-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="py-8 flex flex-col gap-4">
              <div className="flex gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-border rounded-md px-3 bg-secondary/30">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-foreground hover:text-primary transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-foreground hover:text-primary transition-colors"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background hover:bg-primary hover:text-primary-foreground py-4 rounded-md font-bold text-base transition-all active:scale-[0.98]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                
                <button
                  onClick={() => setIsWishlisted((prev) => !prev)}
                  className={`flex items-center justify-center p-4 border rounded-md transition-colors ${
                    isWishlisted
                      ? "border-red-500/50 bg-red-50 text-red-500"
                      : "border-border hover:bg-secondary text-foreground"
                  }`}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isWishlisted ? "fill-current text-red-500" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Features/Trust badges */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg border border-border/50">
                <Truck className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg border border-border/50 hover:bg-secondary transition-colors text-left"
              >
                {shareStatus === "idle" ? (
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Check className="w-5 h-5 text-emerald-600" />
                )}
                <span className="text-sm font-medium">
                  {shareStatus === "copied"
                    ? "Link copied"
                    : shareStatus === "done"
                      ? "Shared"
                      : "Share Product"}
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
