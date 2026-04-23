"use client";

import { products } from "@/lib/mock-data";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ProductRow } from "@/components/home/ProductRow";
import { CollectionGrid } from "@/components/home/CollectionGrid";
import { EditorialPoster } from "@/components/home/EditorialPoster";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { MarqueeBanner } from "@/components/home/MarqueeBanner";
import Link from "next/link";

export default function HomePage() {
  const newInn = products.filter((p) => p.collections.includes("new-inn"));
  const cultFavs = products.filter((p) => p.collections.includes("cult-favourites"));
  const bottomsEdit = products.filter((p) => p.collections.includes("bottoms-edit"));
  const winterSale = products.filter((p) => p.collections.includes("winter-flash-sale"));
  const stealDeal = products.filter((p) => p.collections.includes("steal-deal"));

  const trustStats = [
    { label: "1,70,000+", value: "Happy Customers" },
    { label: "4.8/5", value: "Average Rating" },
    { label: "48 Hrs", value: "Fast Dispatch" },
    { label: "95%", value: "Repeat Buyers" },
  ];

  return (
    <div className="bg-white">
      {/* 1. Hero Banner Slider */}
      <HeroBanner />

      {/* 2. NEW INN */}
      <ProductRow title="NEW INN 🚀" products={newInn} />

      {/* 3. Shop By Collection */}
      <CollectionGrid />

      {/* 4. CULT FAVOURITES */}
      <ProductRow title="CULT FAVOURITES 🔥" products={cultFavs} />

      {/* 5. Editorial Poster */}
      <EditorialPoster
        imageUrl="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop"
        title="THE NOIR EDIT"
        subtitle="Curated picks for the bold. Premium fabrics, statement fits."
        buttonText="SHOP THE EDIT"
        link="/shop?category=new-drops"
      />

      {/* 6. BOTTOMS EDIT */}
      <ProductRow title="BOTTOMS EDIT 🔥" products={bottomsEdit} />

      {/* 7. WINTER FLASH SALE */}
      <ProductRow title="WINTER FLASH SALE 🚀" products={winterSale} />

      {/* 8. STEAL DEAL */}
      <ProductRow title="STEAL DEAL 💰" products={stealDeal} />

      {/* 9. Trust Stats Strip */}
      <section className="py-10 md:py-14 border-y border-border bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {trustStats.map((stat) => (
            <div key={stat.value}>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-bebas)" }}>
                {stat.label}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Testimonials */}
      <TestimonialCarousel />

      {/* 11. Marquee Footer Text */}
      <MarqueeBanner speed={20} className="py-6 md:py-8 border-y border-border bg-white">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-foreground/10 mx-6 sm:mx-10 whitespace-nowrap" style={{ fontFamily: "var(--font-bebas)" }}>
            INNOVATION LAB
            <span className="mx-4 sm:mx-6 text-[var(--color-gold)]/30">·</span>
            OUR JOURNEY
            <span className="mx-4 sm:mx-6 text-[var(--color-gold)]/30">·</span>
            ABOUT US
            <span className="mx-4 sm:mx-6 text-[var(--color-gold)]/30">·</span>
          </span>
        ))}
      </MarqueeBanner>

      {/* 12. Newsletter */}
      <section className="py-12 md:py-16 bg-[#0A0A0A] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide" style={{ fontFamily: "var(--font-bebas)" }}>
            JOIN THE COMMUNITY OF CHANGE MAKERS
          </h2>
          <p className="mt-3 text-white/60 text-sm max-w-lg mx-auto">
            Subscribe for exclusive drops, early access, and members-only deals.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
            />
            <button className="px-6 py-3 bg-[var(--color-gold)] text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-[var(--color-gold-light)] transition-colors shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
