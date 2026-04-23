"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SortDropdown } from "@/components/product/SortDropdown";
import { useFilterStore } from "@/store/useFilterStore";
import { products as allProducts } from "@/lib/mock-data";

const toKey = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");

const toDepartment = (value: string): "men" | "women" | "accessories" | null => {
  const key = toKey(value);
  if (key === "men") return "men";
  if (key === "women") return "women";
  if (key === "accessories") return "accessories";
  return null;
};

const toTitleCase = (value: string) =>
  value
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function ShopPageContent() {
  const { sizes, colors, brands, priceRange, sort } = useFilterStore();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categoryParam = searchParams.get("category")?.trim() ?? "";
  const subParam = searchParams.get("sub")?.trim() ?? "";
  const searchParam = searchParams.get("search")?.trim() ?? "";

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Query filter: category + optional subcategory
    if (categoryParam) {
      const categoryKey = toKey(categoryParam);
      const strictDepartment = toDepartment(categoryParam);

      // Strict gender/accessory guardrails:
      // men => only men's wear, women => only women's wear, accessories => only accessories.
      if (strictDepartment) {
        result = result.filter((p) => p.department === strictDepartment);
      }

      result = result.filter((p) => {
        if (toKey(p.category) === categoryKey) {
          return true;
        }

        if (categoryKey === "newdrops") {
          return p.tags.includes("new");
        }

        if (categoryKey === "bestseller" || categoryKey === "bestsellers") {
          return p.tags.includes("bestseller");
        }

        return false;
      });
    }

    if (subParam) {
      const subKey = toKey(subParam);
      result = result.filter((p) => toKey(p.subcategory) === subKey);
    }

    // Query filter: free-text search
    if (searchParam) {
      const query = searchParam.toLowerCase();
      result = result.filter((p) =>
        [p.name, p.brand, p.category, p.subcategory].some((field) =>
          field.toLowerCase().includes(query)
        )
      );
    }

    // Filter by size
    if (sizes.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => sizes.includes(v.size))
      );
    }

    // Filter by color
    if (colors.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => colors.includes(v.color))
      );
    }

    // Filter by brand
    if (brands.length > 0) {
      result = result.filter((p) => brands.includes(p.brand));
    }

    // Filter by price range
    result = result.filter((p) => {
      const price = p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    switch (sort) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "price-asc":
        result.sort(
          (a, b) =>
            a.price - b.price
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) =>
            b.price - a.price
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [sizes, colors, brands, priceRange, sort, categoryParam, subParam, searchParam]);

  const heading = useMemo(() => {
    if (categoryParam && subParam) {
      return `${toTitleCase(categoryParam)} / ${toTitleCase(subParam)}`;
    }
    if (categoryParam) {
      return toTitleCase(categoryParam);
    }
    if (searchParam) {
      return `Search results for "${searchParam}"`;
    }
    return "Shop All";
  }, [categoryParam, subParam, searchParam]);

  const subheading = useMemo(() => {
    if (searchParam && (categoryParam || subParam)) {
      return `${filteredProducts.length} product${
        filteredProducts.length !== 1 ? "s" : ""
      } matching your filters and search`;
    }
    return `${filteredProducts.length} product${
      filteredProducts.length !== 1 ? "s" : ""
    }`;
  }, [filteredProducts.length, searchParam, categoryParam, subParam]);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1
            className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {heading}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-medium">{subheading}</p>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-6">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex flex-1 sm:flex-none items-center justify-center gap-2 text-sm font-semibold text-foreground bg-secondary/50 border border-border px-4 py-2.5 rounded-sm hover:bg-secondary transition-colors shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <SortDropdown />
        </div>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileFiltersOpen(false)}
                className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-0 top-0 bottom-0 z-[70] w-[85%] max-w-sm bg-background border-r border-border overflow-y-auto p-6 shadow-2xl lg:hidden"
              >
                <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                  <span className="text-sm font-bold text-foreground tracking-wider uppercase">
                    Filters
                  </span>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Layout: Sidebar + Grid */}
        <div className="flex gap-8 lg:gap-12">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 pr-4">
              <FilterSidebar />
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1 min-w-0">
            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-border">
              <p className="text-sm font-medium text-muted-foreground">
                Showing {filteredProducts.length} results
              </p>
              <SortDropdown />
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 pb-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-10 w-48 animate-pulse rounded bg-secondary/60" />
            <div className="mt-4 h-4 w-32 animate-pulse rounded bg-secondary/40" />
          </div>
        </div>
      }
    >
      <ShopPageContent />
    </Suspense>
  );
}
