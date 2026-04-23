"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, Star, ShoppingBag, Heart, Share2,
  Truck, ArrowLeft, Check, Shield, RotateCcw,
  Minus, Plus, Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products, Product, ProductVariant } from "@/lib/mock-data";
import { useCartStore } from "@/store/useCartStore";
import { ProductCard } from "@/components/home/ProductCard";

/* ── Tiered discount offers (same as CartDrawer) ── */
const tieredOffers = [
  { min: 2, label: "Buy 2 & get 10% off", code: "DOUBLEUP10" },
  { min: 3, label: "Buy 3 & get 15% off + Freebie", code: "THREEBIES15" },
  { min: 5, label: "Buy 5 & get 25% off + Freebie", code: "FIVEFEST25" },
];

export default function ProductProfile() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "done" | "copied">("idle");
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = products.find(
        (p) =>
          p.id === slug ||
          p.name.toLowerCase().replace(/ /g, "-") === slug
      );
      setProduct(found || null);
      if (found && found.variants.length > 0) {
        setSelectedColor(found.variants[0].color);
        setSelectedSize(found.variants[0].size);
      }
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [slug]);

  /* ── Related products ── */
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  /* ── Derived values ── */
  const uniqueColors = product
    ? Array.from(new Set(product.variants.map((v: ProductVariant) => v.color)))
    : [];
  const uniqueSizes = product
    ? Array.from(new Set(product.variants.map((v: ProductVariant) => v.size)))
    : [];

  const selectedVariant = product?.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );
  const inStock = selectedVariant ? selectedVariant.stock > 0 : false;

  const hasDiscount = product ? product.regularPrice > product.price : false;
  const discountPercent = hasDiscount && product
    ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
    : 0;

  /* ── Handlers ── */
  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize || !selectedColor) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    const variant = selectedVariant ?? product.variants[0];
    if (!variant) return;

    addItem({
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: variant.size,
      color: variant.color,
      quantity,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // In a real app this would redirect to /checkout
  };

  const handleShare = async () => {
    const shareData = {
      title: product?.name ?? "NOIR Product",
      text: `Check out ${product?.name} on NOIR`,
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

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 animate-pulse">
            <div className="aspect-[3/4] bg-[#F5F5F5]" />
            <div className="mt-8 lg:mt-0 space-y-4">
              <div className="h-4 w-20 bg-[#F0F0F0] rounded" />
              <div className="h-8 w-64 bg-[#F0F0F0] rounded" />
              <div className="h-6 w-32 bg-[#F0F0F0] rounded" />
              <div className="h-20 w-full bg-[#F0F0F0] rounded mt-6" />
              <div className="flex gap-3 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-10 bg-[#F0F0F0] rounded" />
                ))}
              </div>
              <div className="h-14 w-full bg-[#F0F0F0] rounded mt-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (!product) {
    return (
      <div className="min-h-screen py-24 flex flex-col items-center justify-center bg-white">
        <h1
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          Product Not Found
        </h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Breadcrumbs ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-xs text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li><Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li>
              <Link
                href={`/shop?category=${product.category.toLowerCase().replace(/ /g, "")}`}
                className="hover:text-foreground transition-colors"
              >
                {product.category}
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-foreground font-medium truncate max-w-[180px]">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* ── Main Product Section ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* ── Left: Image Gallery ── */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mb-8 lg:mb-0">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0 scrollbar-hide">
              {product.images.map((image: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-20 sm:w-full sm:h-24 shrink-0 overflow-hidden border transition-all ${
                    selectedImage === idx
                      ? "border-foreground"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
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

              {/* Tag badge */}
              {product.tag && (
                <span className="absolute bottom-3 left-3 z-10 text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-[#0A0A0A] text-white shadow-sm">
                  {product.tag}
                </span>
              )}

              {/* Discount badge */}
              {hasDiscount && (
                <span className="absolute top-3 right-3 z-10 text-[10px] font-bold bg-[#E53935] text-white px-2 py-1">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Brand */}
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">
              {product.brand}
            </p>

            {/* Name */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-wide"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold">${product.price.toLocaleString("en-US")}</span>
              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.regularPrice.toLocaleString("en-US")}
                </span>
              )}
              {hasDiscount && (
                <span className="text-sm font-bold text-[#E53935]">
                  Save ${(product.regularPrice - product.price).toLocaleString("en-US")}
                </span>
              )}
            </div>

            <p className="text-[10px] text-muted-foreground mt-1">Inclusive of all taxes</p>

            {/* Tiered Discount Offers */}
            <div className="mt-5 p-3 bg-[#FFFDE7] border border-[#FFF176] space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#6D4C00] flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> COMBO OFFERS
              </p>
              {tieredOffers.map((offer) => (
                <div key={offer.code} className="flex items-center justify-between text-xs text-[#6D4C00]">
                  <span>{offer.label}</span>
                  <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#FFF176]">
                    {offer.code}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mt-5 border-t border-border pt-5">
              {product.description}
            </p>

            {/* Color Selector */}
            {uniqueColors.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider">Color</h3>
                  <span className="text-xs text-muted-foreground capitalize">— {selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {uniqueColors.map((color: string) => {
                    const variant = product.variants.find((v: ProductVariant) => v.color === color);
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-9 h-9 rounded-full transition-all ${
                          selectedColor === color
                            ? "ring-2 ring-offset-2 ring-foreground scale-110"
                            : "ring-1 ring-border hover:scale-105"
                        }`}
                        style={{ backgroundColor: variant?.colorHex || color.toLowerCase() }}
                        title={color}
                        aria-label={`Select ${color}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {uniqueSizes.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider">
                    Size {selectedSize && <span className="text-muted-foreground font-normal">— {selectedSize}</span>}
                  </h3>
                  <Link
                    href="/fit-guide"
                    className="text-xs font-medium text-[var(--color-gold-dark)] hover:underline underline-offset-4"
                  >
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {uniqueSizes.map((size: string) => {
                    const v = product.variants.find(
                      (vr) => vr.size === size && vr.color === selectedColor
                    );
                    const outOfStock = !v || v.stock <= 0;
                    return (
                      <button
                        key={size}
                        onClick={() => { setSelectedSize(size); setSizeError(false); }}
                        disabled={outOfStock}
                        className={`min-w-[3rem] px-3 py-2 text-sm font-medium border transition-all ${
                          outOfStock
                            ? "border-border text-muted-foreground/40 line-through cursor-not-allowed"
                            : selectedSize === size
                            ? "bg-foreground text-background border-foreground"
                            : "bg-white text-foreground border-border hover:border-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {sizeError && (
                  <p className="text-xs text-[#E53935] mt-1.5 font-medium">Please select a size</p>
                )}
                {selectedVariant && selectedVariant.stock <= 5 && selectedVariant.stock > 0 && (
                  <p className="text-xs text-[#E65100] mt-1.5 font-medium">
                    Only {selectedVariant.stock} left — hurry!
                  </p>
                )}
              </div>
            )}

            {/* Quantity + Actions */}
            <div className="mt-6 space-y-3">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-border shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-foreground hover:bg-secondary transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 text-foreground hover:bg-secondary transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition-all active:scale-[0.98] ${
                    !inStock
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : addedToCart
                      ? "bg-[#2E7D32] text-white"
                      : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  {addedToCart ? (
                    <><Check className="w-4 h-4" /> Added!</>
                  ) : !inStock ? (
                    "Out of Stock"
                  ) : (
                    <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => setIsWishlisted((prev) => !prev)}
                  className={`flex items-center justify-center p-3.5 border transition-all ${
                    isWishlisted
                      ? "border-red-400 bg-red-50 text-red-500"
                      : "border-border text-foreground hover:bg-secondary"
                  }`}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className={`w-full py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition-all active:scale-[0.98] ${
                  !inStock
                    ? "bg-muted text-muted-foreground cursor-not-allowed border border-muted"
                    : "bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-light)] border border-[var(--color-gold)]"
                }`}
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
              <div className="flex flex-col items-center text-center gap-1.5 py-3">
                <Truck className="w-5 h-5 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Free Shipping</span>
                <span className="text-[9px] text-muted-foreground">Orders above $49</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 py-3">
                <RotateCcw className="w-5 h-5 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Easy Returns</span>
                <span className="text-[9px] text-muted-foreground">7-day return policy</span>
              </div>
              <button
                onClick={handleShare}
                className="flex flex-col items-center text-center gap-1.5 py-3 hover:bg-secondary/50 transition-colors rounded"
              >
                {shareStatus === "idle" ? (
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Check className="w-5 h-5 text-emerald-600" />
                )}
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {shareStatus === "copied" ? "Link Copied!" : shareStatus === "done" ? "Shared!" : "Share"}
                </span>
                <span className="text-[9px] text-muted-foreground">Send to a friend</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── You May Also Like ── */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border py-12 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-wide mb-6"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
