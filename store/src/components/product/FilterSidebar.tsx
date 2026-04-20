"use client";

import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";
import { useFilterStore } from "@/store/useFilterStore";
import { allSizes, allColors, allBrands } from "@/lib/mock-data";
import { fadeInUp } from "@/lib/animations";

export function FilterSidebar() {
  const {
    sizes,
    colors,
    brands,
    priceRange,
    toggleSize,
    toggleColor,
    toggleBrand,
    setPriceRange,
    clearAll,
  } = useFilterStore();

  const hasActiveFilters =
    sizes.length > 0 || colors.length > 0 || brands.length > 0;

  return (
    <motion.aside
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="w-full lg:w-[260px] flex-shrink-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-sm font-semibold text-foreground tracking-wider uppercase"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-[var(--color-gold-dark)] hover:text-[var(--color-gold)] transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      <Accordion className="w-full">
        {/* Size Filter */}
        <AccordionItem value="size" className="border-border">
          <AccordionTrigger className="text-xs font-semibold text-foreground/80 hover:text-foreground hover:no-underline uppercase tracking-wider py-4">
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-1 pb-3">
              {allSizes.map((size) => {
                const isActive = sizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 text-xs font-medium border transition-all duration-200 ${
                      isActive
                        ? "border-[var(--color-gold)] text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10"
                        : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color Filter */}
        <AccordionItem value="color" className="border-border">
          <AccordionTrigger className="text-xs font-semibold text-foreground/80 hover:text-foreground hover:no-underline uppercase tracking-wider py-4">
            Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2.5 pt-1 pb-3">
              {allColors.map((color) => {
                const isActive = colors.includes(color.name);
                return (
                  <button
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className="group flex flex-col items-center gap-1"
                    title={color.name}
                  >
                    <span
                      className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                        isActive
                          ? "border-[var(--color-gold)] scale-110"
                          : "border-border shadow-sm hover:border-foreground/30"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span
                      className={`text-[9px] transition-colors ${
                        isActive ? "text-[var(--color-gold-dark)] font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Filter */}
        <AccordionItem value="price" className="border-border">
          <AccordionTrigger className="text-xs font-semibold text-foreground/80 hover:text-foreground hover:no-underline uppercase tracking-wider py-4">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1 pb-3">
              {[
                { label: "$30 — $35", range: [30, 35] as [number, number] },
                { label: "$35 — $40", range: [35, 40] as [number, number] },
                { label: "$40 — $45", range: [40, 45] as [number, number] },
                { label: "$45 — $50", range: [45, 50] as [number, number] },
              ].map((item) => (
                <label
                  key={item.label}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <Checkbox
                    checked={priceRange[0] === item.range[0] && priceRange[1] === item.range[1]}
                    onCheckedChange={() => setPriceRange(item.range)}
                    className="border-border data-[state=checked]:bg-[var(--color-gold)] data-[state=checked]:border-[var(--color-gold)]"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brand" className="border-border border-b-0">
          <AccordionTrigger className="text-xs font-semibold text-foreground/80 hover:text-foreground hover:no-underline uppercase tracking-wider py-4">
            Brand
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1 pb-3">
              {allBrands.map((brand) => {
                const isActive = brands.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <Checkbox
                      checked={isActive}
                      onCheckedChange={() => toggleBrand(brand)}
                      className="border-border data-[state=checked]:bg-[var(--color-gold)] data-[state=checked]:border-[var(--color-gold)]"
                    />
                    <span
                      className={`text-sm transition-colors ${
                        isActive
                          ? "text-[var(--color-gold-dark)] font-medium"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {brand}
                    </span>
                  </label>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.aside>
  );
}
