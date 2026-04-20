import { categories, products } from "@/lib/mock-data";
import { CircleCategories } from "@/components/home/CircleCategories";
import { EditorialPoster } from "@/components/home/EditorialPoster";
import { SquareProductGrid } from "@/components/home/SquareProductGrid";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // Take first 4 products for the top grid, next 4 for bottom
  const topProducts = products.slice(0, 4);
  const bottomProducts = products.slice(4, 8);
  const finalProducts = products.slice(8, 12);

  const trustStats = [
    { label: "40K+", value: "Customers Styled" },
    { label: "4.8/5", value: "Average Product Rating" },
    { label: "72 Hrs", value: "Dispatch for New Orders" },
    { label: "95%", value: "Repeat Buyer Satisfaction" },
  ];

  const styleInspiration = [
    {
      title: "Street Minimal",
      subtitle: "Monochrome layers",
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=900&h=1100&fit=crop",
      link: "/shop?search=oversized",
    },
    {
      title: "Soft Tailoring",
      subtitle: "Clean fall textures",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&h=1100&fit=crop",
      link: "/shop?category=women",
    },
    {
      title: "Everyday Utility",
      subtitle: "Cargo-ready staples",
      image: "https://images.unsplash.com/photo-1484516758160-69878111a911?w=900&h=1100&fit=crop",
      link: "/shop?search=joggers",
    },
    {
      title: "After Dark",
      subtitle: "Refined black edit",
      image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=900&h=1100&fit=crop",
      link: "/shop?search=black",
    },
    {
      title: "Weekend Icons",
      subtitle: "Relaxed and premium",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&h=1100&fit=crop",
      link: "/shop?search=hoodie",
    },
    {
      title: "Accessories Focus",
      subtitle: "Small details, sharp fit",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&h=1100&fit=crop",
      link: "/shop?category=accessories",
    },
  ];

  const testimonials = [
    {
      quote: "The fit is flawless and the fabrics feel premium. My NOIR hoodie became my daily go-to in one week.",
      author: "Rhea S.",
      detail: "Verified buyer · Arctic White Essential Hoodie",
      link: "/shop/prod-2",
    },
    {
      quote: "Every drop feels curated. The quality-to-price ratio is unreal, especially for the oversized tees.",
      author: "Aarav M.",
      detail: "Verified buyer · Midnight Oversized Tee",
      link: "/shop/prod-1",
    },
    {
      quote: "Ordered a full set for a weekend trip and got compliments all day. Minimal and bold at once.",
      author: "Kiara D.",
      detail: "Verified buyer · Storm Grey Co-ord Set",
      link: "/shop/prod-8",
    },
  ];

  return (
    <div className="bg-background pb-12 pt-20">
      {/* 1. Category Circles */}
      <CircleCategories categories={categories} />

      {/* 2. First Inset Editorial Poster */}
      <EditorialPoster 
        imageUrl="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop"
        title="THE FALL COLLECTION"
        subtitle="Elevate your everyday uniform with structured silhouettes and premium textures."
        buttonText="SHOP THE EDIT"
        link="/shop?category=new-drops"
      />

      {/* 3. Big Square Grid - Zero Gap */}
      <div className="mt-8">
        <SquareProductGrid products={topProducts} />
      </div>

      {/* 4. Second Inset Poster - New Arrivals */}
      <div className="mt-16">
        <EditorialPoster 
          imageUrl="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000&auto=format&fit=crop"
          title="NEW ARRIVALS"
          subtitle="Just landed. Fresh cuts to upgrade your rotation."
          buttonText="DISCOVER MORE"
          link="/shop?category=new-drops"
          align="right"
        />
      </div>

      {/* 5. Second Square Grid */}
      <div className="mt-8">
        <SquareProductGrid products={bottomProducts} />
      </div>

      {/* 6. Trust Strip */}
      <section className="mx-auto mt-14 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/60 bg-secondary/20 p-6 sm:grid-cols-4 sm:p-8">
          {trustStats.map((stat) => (
            <div key={stat.value} className="text-center sm:text-left">
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl" style={{ fontFamily: "var(--font-outfit)" }}>
                {stat.label}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Third Product Grid using remaining products */}
      <section className="mt-16">
        <div className="mx-auto mb-6 flex max-w-7xl items-end justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">More to Discover</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
              Complete the Look
            </h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold uppercase tracking-widest text-foreground/90 transition-colors hover:text-foreground">
            View All
          </Link>
        </div>
        <SquareProductGrid products={finalProducts} />
      </section>

      {/* 8. Style Inspiration gallery */}
      <section className="mx-auto mt-16 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Editorial Feed</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
            Style Inspiration
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {styleInspiration.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="group relative block aspect-[4/5] overflow-hidden rounded-xl border border-border/50 bg-secondary/20"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/80">{item.subtitle}</p>
                <h3 className="mt-2 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                  {item.title}
                </h3>
                <span className="mt-3 inline-block text-sm font-semibold uppercase tracking-wider text-white/90">Shop this mood</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. Testimonials / Social proof */}
      <section className="mx-auto mt-16 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Community Voice</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
            Loved by Everyday Stylists
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <Link
              key={item.author}
              href={item.link}
              className="rounded-xl border border-border/60 bg-secondary/20 p-6 transition-colors hover:border-primary/50"
            >
              <p className="text-sm leading-relaxed text-foreground/90">“{item.quote}”</p>
              <p className="mt-5 text-base font-semibold text-foreground">{item.author}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{item.detail}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="mx-auto mt-16 w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/60 bg-gradient-to-r from-secondary/40 via-secondary/10 to-secondary/40 px-6 py-10 text-center sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Ready to Refresh?</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
            Build Your Signature Wardrobe
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Explore bestsellers, trending drops, and elevated essentials crafted for daily wear.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider text-background transition-opacity hover:opacity-90"
            >
              Shop All
            </Link>
            <Link
              href="/shop?category=new-drops"
              className="rounded-full border border-border/80 px-6 py-3 text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary/60"
            >
              New Drops
            </Link>
            <Link
              href="/shop?search=hoodie"
              className="rounded-full border border-border/80 px-6 py-3 text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary/60"
            >
              Trending Edit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
