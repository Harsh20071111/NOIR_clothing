export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  department: "men" | "women" | "accessories";
  subcategory: string;
  brand: string;
  price: number;
  regularPrice: number;
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  tags: string[];
  tag?: string;
  sizeType: "alpha" | "numeric";
  collections: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: { name: string; slug: string }[];
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "cat-1", name: "T-Shirts", slug: "tshirts",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&h=800&fit=crop",
    subcategories: [
      { name: "Relaxed Fit", slug: "relaxed-fit" },
      { name: "Oversized Fit", slug: "oversized-fit" },
    ],
  },
  {
    id: "cat-2", name: "Shirts", slug: "shirts",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=800&fit=crop",
    subcategories: [
      { name: "Casual Shirts", slug: "casual-shirts" },
      { name: "Formal Shirts", slug: "formal-shirts" },
    ],
  },
  {
    id: "cat-3", name: "Bottomwear", slug: "bottomwear",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop",
    subcategories: [
      { name: "Joggers", slug: "joggers" },
      { name: "Cargo", slug: "cargo" },
      { name: "Shorts", slug: "shorts" },
    ],
  },
  {
    id: "cat-4", name: "Winter Wear", slug: "winterwear",
    image: "https://images.unsplash.com/photo-1544923246-77307dd270cb?w=600&h=800&fit=crop",
    subcategories: [
      { name: "Leather Jackets", slug: "leather-jackets" },
      { name: "Hoodies", slug: "hoodies" },
      { name: "Long Coats", slug: "long-coats" },
    ],
  },
  {
    id: "cat-5", name: "New Drops", slug: "new-drops",
    image: "https://res.cloudinary.com/duyhzu8so/image/upload/v1776708342/shopping_y4i7d9.webp",
    subcategories: [],
  },
];

export const collections: Collection[] = [
  { id: "col-1", name: "Steal Deal", slug: "steal-deal", image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&h=1000&fit=crop", description: "Unbeatable prices on top picks" },
  { id: "col-2", name: "Relaxed Fit", slug: "relaxed-fit", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&h=1000&fit=crop", description: "Effortless comfort, perfect drape" },
  { id: "col-3", name: "Oversized T-Shirts", slug: "oversized", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop", description: "Bold cuts, statement silhouettes" },
  { id: "col-4", name: "Polo Shirts", slug: "polo", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop", description: "Classic elevated essentials" },
];

export const products: Product[] = [
  {
    id: "prod-1", name: "Stallion Oversized T-shirt", description: "Premium heavyweight cotton oversized t-shirt with a relaxed drop-shoulder fit.",
    category: "T-Shirts", department: "men", subcategory: "Oversized Fit", brand: "NOIR",
    price: 29.99, regularPrice: 44.99,
    images: ["/products/prod-1-1.webp", "/products/prod-1-2.webp"],
    variants: [
      { id: "v1", size: "S", color: "Black", colorHex: "#0a0a0a", stock: 15, sku: "NOIR-STL-BLK-S" },
      { id: "v2", size: "M", color: "Black", colorHex: "#0a0a0a", stock: 22, sku: "NOIR-STL-BLK-M" },
      { id: "v3", size: "L", color: "Black", colorHex: "#0a0a0a", stock: 18, sku: "NOIR-STL-BLK-L" },
      { id: "v4", size: "XL", color: "Black", colorHex: "#0a0a0a", stock: 10, sku: "NOIR-STL-BLK-XL" },
    ],
    rating: 4.8, reviewCount: 342, tags: ["trending", "new"], tag: "NEW ARRIVAL 🚀",
    sizeType: "alpha", collections: ["new-inn"], createdAt: "2026-04-10",
  },
  {
    id: "prod-2", name: "Glory Arc Relaxed Fit T-Shirt", description: "Soft cotton relaxed-fit tee with clean lines and breathable comfort.",
    category: "T-Shirts", department: "men", subcategory: "Relaxed Fit", brand: "NOIR",
    price: 24.99, regularPrice: 39.99,
    images: ["/products/prod-2-1.webp", "/products/prod-2-2.webp"],
    variants: [
      { id: "v5", size: "S", color: "White", colorHex: "#f5f5f5", stock: 8, sku: "NOIR-GLA-WHT-S" },
      { id: "v6", size: "M", color: "White", colorHex: "#f5f5f5", stock: 14, sku: "NOIR-GLA-WHT-M" },
      { id: "v7", size: "L", color: "White", colorHex: "#f5f5f5", stock: 20, sku: "NOIR-GLA-WHT-L" },
      { id: "v8", size: "XL", color: "White", colorHex: "#f5f5f5", stock: 6, sku: "NOIR-GLA-WHT-XL" },
    ],
    rating: 4.6, reviewCount: 189, tags: ["bestseller"], tag: "BEST SELLER 🔥",
    sizeType: "alpha", collections: ["cult-favourites"], createdAt: "2026-03-28",
  },
  {
    id: "prod-3", name: "Carpedian Black Oversized Tshirt", description: "Statement oversized tee with bold graphic print and premium fabric.",
    category: "T-Shirts", department: "men", subcategory: "Oversized Fit", brand: "NOIR",
    price: 34.99, regularPrice: 49.99,
    images: ["/products/prod-3-1.webp", "/products/prod-3-2.webp"],
    variants: [
      { id: "v9", size: "S", color: "Black", colorHex: "#0a0a0a", stock: 12, sku: "NOIR-CPD-BLK-S" },
      { id: "v10", size: "M", color: "Black", colorHex: "#0a0a0a", stock: 25, sku: "NOIR-CPD-BLK-M" },
      { id: "v11", size: "L", color: "Black", colorHex: "#0a0a0a", stock: 18, sku: "NOIR-CPD-BLK-L" },
      { id: "v12", size: "XL", color: "Black", colorHex: "#0a0a0a", stock: 10, sku: "NOIR-CPD-BLK-XL" },
    ],
    rating: 4.5, reviewCount: 256, tags: ["trending"], tag: "Hot Selling 🔥",
    sizeType: "alpha", collections: ["cult-favourites"], createdAt: "2026-04-05",
  },
  {
    id: "prod-4", name: "Night Fall Dragon Relaxed Fit T-shirt", description: "Dark-themed relaxed fit tee with dragon embroidery detail.",
    category: "T-Shirts", department: "men", subcategory: "Relaxed Fit", brand: "NOIR",
    price: 32.99, regularPrice: 49.99,
    images: ["/products/prod-4-1.webp", "/products/prod-4-2.webp"],
    variants: [
      { id: "v13", size: "S", color: "Black", colorHex: "#0a0a0a", stock: 20, sku: "NOIR-NFD-BLK-S" },
      { id: "v14", size: "M", color: "Black", colorHex: "#0a0a0a", stock: 30, sku: "NOIR-NFD-BLK-M" },
      { id: "v15", size: "L", color: "Black", colorHex: "#0a0a0a", stock: 15, sku: "NOIR-NFD-BLK-L" },
    ],
    rating: 4.3, reviewCount: 128, tags: ["new"], tag: "New Launch 🔥",
    sizeType: "alpha", collections: ["new-inn"], createdAt: "2026-04-15",
  },
  {
    id: "prod-5", name: "Wild Drift Beige Joggers", description: "Premium beige joggers with tapered fit and elastic cuffs.",
    category: "Bottomwear", department: "men", subcategory: "Joggers", brand: "NOIR",
    price: 39.99, regularPrice: 59.99,
    images: ["/products/prod-5-1.webp", "/products/prod-5-2.webp"],
    variants: [
      { id: "v16", size: "28", color: "Beige", colorHex: "#D4B896", stock: 8, sku: "NOIR-WDB-BEI-28" },
      { id: "v17", size: "30", color: "Beige", colorHex: "#D4B896", stock: 12, sku: "NOIR-WDB-BEI-30" },
      { id: "v18", size: "32", color: "Beige", colorHex: "#D4B896", stock: 15, sku: "NOIR-WDB-BEI-32" },
      { id: "v19", size: "34", color: "Beige", colorHex: "#D4B896", stock: 10, sku: "NOIR-WDB-BEI-34" },
    ],
    rating: 4.9, reviewCount: 87, tags: ["bestseller", "trending"], tag: "BEST SELLER 🔥",
    sizeType: "numeric", collections: ["bottoms-edit"], createdAt: "2026-03-20",
  },
  {
    id: "prod-6", name: "Vintage Washed Black Cargo", description: "Distressed wash cargo pants with utility pockets and relaxed fit.",
    category: "Bottomwear", department: "men", subcategory: "Cargo", brand: "NOIR",
    price: 44.99, regularPrice: 64.99,
    images: ["/products/prod-6-1.webp", "/products/prod-6-2.webp"],
    variants: [
      { id: "v20", size: "28", color: "Black", colorHex: "#0a0a0a", stock: 14, sku: "NOIR-VWC-BLK-28" },
      { id: "v21", size: "30", color: "Black", colorHex: "#0a0a0a", stock: 20, sku: "NOIR-VWC-BLK-30" },
      { id: "v22", size: "32", color: "Black", colorHex: "#0a0a0a", stock: 10, sku: "NOIR-VWC-BLK-32" },
      { id: "v23", size: "34", color: "Black", colorHex: "#0a0a0a", stock: 8, sku: "NOIR-VWC-BLK-34" },
    ],
    rating: 4.7, reviewCount: 198, tags: ["trending", "new"], tag: "Hot Selling 🔥",
    sizeType: "numeric", collections: ["bottoms-edit"], createdAt: "2026-04-12",
  },
  {
    id: "prod-7", name: "Faux Leather Biker Jacket", description: "Premium faux leather jacket with asymmetric zip and quilted shoulders.",
    category: "Winter Wear", department: "men", subcategory: "Leather Jackets", brand: "NOIR",
    price: 89.99, regularPrice: 149.99,
    images: ["/products/prod-7-1.webp", "/products/prod-7-2.webp"],
    variants: [
      { id: "v24", size: "M", color: "Black", colorHex: "#0a0a0a", stock: 7, sku: "NOIR-FLB-BLK-M" },
      { id: "v25", size: "L", color: "Black", colorHex: "#0a0a0a", stock: 12, sku: "NOIR-FLB-BLK-L" },
      { id: "v26", size: "XL", color: "Black", colorHex: "#0a0a0a", stock: 9, sku: "NOIR-FLB-BLK-XL" },
    ],
    rating: 4.4, reviewCount: 76, tags: ["new"], tag: "NEW ARRIVAL 🚀",
    sizeType: "alpha", collections: ["winter-flash-sale"], createdAt: "2026-04-18",
  },
  {
    id: "prod-8", name: "Distressed Washed Hoodie", description: "Heavyweight washed hoodie with distressed details and oversized fit.",
    category: "Winter Wear", department: "men", subcategory: "Hoodies", brand: "NOIR",
    price: 54.99, regularPrice: 89.99,
    images: ["/products/prod-8-1.webp", "/products/prod-8-2.webp"],
    variants: [
      { id: "v27", size: "S", color: "Charcoal", colorHex: "#36454F", stock: 16, sku: "NOIR-DWH-CHR-S" },
      { id: "v28", size: "M", color: "Charcoal", colorHex: "#36454F", stock: 22, sku: "NOIR-DWH-CHR-M" },
      { id: "v29", size: "L", color: "Charcoal", colorHex: "#36454F", stock: 11, sku: "NOIR-DWH-CHR-L" },
    ],
    rating: 4.6, reviewCount: 143, tags: ["bestseller"], tag: "BEST SELLER 🔥",
    sizeType: "alpha", collections: ["winter-flash-sale", "cult-favourites"], createdAt: "2026-04-01",
  },
  {
    id: "prod-9", name: "Shadow Stripe Polo", description: "Premium polo with shadow stripe pattern and ribbed collar.",
    category: "T-Shirts", department: "men", subcategory: "Relaxed Fit", brand: "NOIR",
    price: 19.99, regularPrice: 34.99,
    images: ["/products/prod-9-1.webp", "/products/prod-9-2.webp"],
    variants: [
      { id: "v30", size: "M", color: "Navy", colorHex: "#1B2A4A", stock: 50, sku: "NOIR-SSP-NAV-M" },
      { id: "v31", size: "L", color: "Navy", colorHex: "#1B2A4A", stock: 30, sku: "NOIR-SSP-NAV-L" },
    ],
    rating: 4.2, reviewCount: 312, tags: ["bestseller"], tag: "BEST SELLER 🔥",
    sizeType: "alpha", collections: ["cult-favourites", "steal-deal"], createdAt: "2026-02-15",
  },
  {
    id: "prod-10", name: "Slate Oversized Hoodie", description: "Slate grey oversized hoodie with kangaroo pocket and ribbed cuffs.",
    category: "Winter Wear", department: "men", subcategory: "Hoodies", brand: "NOIR",
    price: 49.99, regularPrice: 79.99,
    images: ["/products/prod-10-1.webp", "/products/prod-10-2.webp"],
    variants: [
      { id: "v32", size: "M", color: "Slate", colorHex: "#708090", stock: 18, sku: "NOIR-SOH-SLT-M" },
      { id: "v33", size: "L", color: "Slate", colorHex: "#708090", stock: 24, sku: "NOIR-SOH-SLT-L" },
      { id: "v34", size: "XL", color: "Slate", colorHex: "#708090", stock: 10, sku: "NOIR-SOH-SLT-XL" },
    ],
    rating: 4.7, reviewCount: 201, tags: ["trending"], tag: "Hot Selling 🔥",
    sizeType: "alpha", collections: ["winter-flash-sale", "new-inn"], createdAt: "2026-03-15",
  },
  {
    id: "prod-11", name: "Onyx Black Relaxed Tee", description: "Relaxed-fit tee with contrast neon stitching. Organic cotton.",
    category: "T-Shirts", department: "men", subcategory: "Relaxed Fit", brand: "NOIR",
    price: 22.99, regularPrice: 34.99,
    images: ["/products/prod-11-1.webp", "/products/prod-11-2.webp"],
    variants: [
      { id: "v35", size: "S", color: "Black", colorHex: "#0a0a0a", stock: 25, sku: "NOIR-OBR-BLK-S" },
      { id: "v36", size: "M", color: "Black", colorHex: "#0a0a0a", stock: 35, sku: "NOIR-OBR-BLK-M" },
      { id: "v37", size: "L", color: "Black", colorHex: "#0a0a0a", stock: 20, sku: "NOIR-OBR-BLK-L" },
      { id: "v38", size: "XL", color: "Black", colorHex: "#0a0a0a", stock: 12, sku: "NOIR-OBR-BLK-XL" },
    ],
    rating: 4.1, reviewCount: 95, tags: ["new"], tag: "New Launch 🔥",
    sizeType: "alpha", collections: ["new-inn", "steal-deal"], createdAt: "2026-04-17",
  },
  {
    id: "prod-12", name: "Olive Utility Cargo Shorts", description: "Knee-length cargo shorts with multiple utility pockets.",
    category: "Bottomwear", department: "men", subcategory: "Shorts", brand: "NOIR",
    price: 29.99, regularPrice: 44.99,
    images: ["/products/prod-12-1.webp", "/products/prod-12-2.webp"],
    variants: [
      { id: "v39", size: "28", color: "Olive", colorHex: "#556B2F", stock: 5, sku: "NOIR-OCS-OLV-28" },
      { id: "v40", size: "30", color: "Olive", colorHex: "#556B2F", stock: 8, sku: "NOIR-OCS-OLV-30" },
      { id: "v41", size: "32", color: "Olive", colorHex: "#556B2F", stock: 10, sku: "NOIR-OCS-OLV-32" },
    ],
    rating: 4.8, reviewCount: 64, tags: ["new", "trending"], tag: "NEW ARRIVAL 🚀",
    sizeType: "numeric", collections: ["bottoms-edit", "new-inn"], createdAt: "2026-04-14",
  },
  {
    id: "prod-13", name: "Charcoal Washed Boxy Tee", description: "Garment-washed cotton tee with a boxy silhouette.",
    category: "T-Shirts", department: "men", subcategory: "Oversized Fit", brand: "NOIR",
    price: 19.99, regularPrice: 29.99,
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&h=1200&fit=crop", "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&h=1200&fit=crop"],
    variants: [
      { id: "v42", size: "S", color: "Charcoal", colorHex: "#36454F", stock: 18, sku: "NOIR-CWB-CHR-S" },
      { id: "v43", size: "M", color: "Charcoal", colorHex: "#36454F", stock: 24, sku: "NOIR-CWB-CHR-M" },
      { id: "v44", size: "L", color: "Charcoal", colorHex: "#36454F", stock: 16, sku: "NOIR-CWB-CHR-L" },
    ],
    rating: 4.5, reviewCount: 118, tags: ["affordable", "new"], tag: "New Launch 🔥",
    sizeType: "alpha", collections: ["steal-deal"], createdAt: "2026-04-20",
  },
  {
    id: "prod-14", name: "Sand Twill Shacket", description: "Lightweight twill shacket with utility chest pockets.",
    category: "Winter Wear", department: "men", subcategory: "Leather Jackets", brand: "NOIR",
    price: 69.99, regularPrice: 99.99,
    images: ["https://images.unsplash.com/photo-1593032465171-8bd2f4f32b0f?w=900&h=1200&fit=crop", "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&h=1200&fit=crop"],
    variants: [
      { id: "v45", size: "S", color: "Sand", colorHex: "#C2B280", stock: 9, sku: "NOIR-STW-SND-S" },
      { id: "v46", size: "M", color: "Sand", colorHex: "#C2B280", stock: 14, sku: "NOIR-STW-SND-M" },
      { id: "v47", size: "L", color: "Sand", colorHex: "#C2B280", stock: 10, sku: "NOIR-STW-SND-L" },
    ],
    rating: 4.4, reviewCount: 72, tags: ["affordable", "trending"], tag: "Hot Selling 🔥",
    sizeType: "alpha", collections: ["winter-flash-sale"], createdAt: "2026-04-20",
  },
  {
    id: "prod-15", name: "Black Slim Joggers", description: "Tapered slim joggers with zipper pockets.",
    category: "Bottomwear", department: "men", subcategory: "Joggers", brand: "NOIR",
    price: 34.99, regularPrice: 49.99,
    images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&h=1200&fit=crop", "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=900&h=1200&fit=crop"],
    variants: [
      { id: "v48", size: "28", color: "Black", colorHex: "#0a0a0a", stock: 13, sku: "NOIR-BSJ-BLK-28" },
      { id: "v49", size: "30", color: "Black", colorHex: "#0a0a0a", stock: 19, sku: "NOIR-BSJ-BLK-30" },
      { id: "v50", size: "32", color: "Black", colorHex: "#0a0a0a", stock: 15, sku: "NOIR-BSJ-BLK-32" },
      { id: "v51", size: "34", color: "Black", colorHex: "#0a0a0a", stock: 9, sku: "NOIR-BSJ-BLK-34" },
    ],
    rating: 4.6, reviewCount: 94, tags: ["affordable", "bestseller"], tag: "BEST SELLER 🔥",
    sizeType: "numeric", collections: ["bottoms-edit", "steal-deal"], createdAt: "2026-04-21",
  },
  {
    id: "prod-16", name: "Arctic White Long Coat", description: "Premium wool-blend long coat in arctic white with structured shoulders.",
    category: "Winter Wear", department: "men", subcategory: "Long Coats", brand: "NOIR",
    price: 129.99, regularPrice: 199.99,
    images: ["https://images.unsplash.com/photo-1544923246-77307dd270cb?w=900&h=1200&fit=crop", "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=1200&fit=crop"],
    variants: [
      { id: "v52", size: "M", color: "White", colorHex: "#F5F5F5", stock: 10, sku: "NOIR-AWL-WHT-M" },
      { id: "v53", size: "L", color: "White", colorHex: "#F5F5F5", stock: 14, sku: "NOIR-AWL-WHT-L" },
      { id: "v54", size: "XL", color: "White", colorHex: "#F5F5F5", stock: 11, sku: "NOIR-AWL-WHT-XL" },
    ],
    rating: 4.7, reviewCount: 83, tags: ["new"], tag: "NEW ARRIVAL 🚀",
    sizeType: "alpha", collections: ["winter-flash-sale", "new-inn"], createdAt: "2026-04-21",
  },
  {
    id: "prod-17", name: "Midnight Linen Casual Shirt", description: "Lightweight linen-blend casual shirt with a relaxed collar and chest pocket.",
    category: "Shirts", department: "men", subcategory: "Casual Shirts", brand: "NOIR",
    price: 39.99, regularPrice: 59.99,
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&h=1200&fit=crop", "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900&h=1200&fit=crop"],
    variants: [
      { id: "v55", size: "S", color: "Navy", colorHex: "#1B2A4A", stock: 12, sku: "NOIR-MLC-NAV-S" },
      { id: "v56", size: "M", color: "Navy", colorHex: "#1B2A4A", stock: 20, sku: "NOIR-MLC-NAV-M" },
      { id: "v57", size: "L", color: "Navy", colorHex: "#1B2A4A", stock: 15, sku: "NOIR-MLC-NAV-L" },
      { id: "v58", size: "XL", color: "Navy", colorHex: "#1B2A4A", stock: 8, sku: "NOIR-MLC-NAV-XL" },
    ],
    rating: 4.5, reviewCount: 67, tags: ["new"], tag: "NEW ARRIVAL 🚀",
    sizeType: "alpha", collections: ["new-inn"], createdAt: "2026-04-19",
  },
  {
    id: "prod-18", name: "Sand Textured Camp Collar Shirt", description: "Relaxed camp-collar shirt with textured weave. Perfect for layering.",
    category: "Shirts", department: "men", subcategory: "Casual Shirts", brand: "NOIR",
    price: 34.99, regularPrice: 49.99,
    images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=900&h=1200&fit=crop", "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=900&h=1200&fit=crop"],
    variants: [
      { id: "v59", size: "S", color: "Sand", colorHex: "#C2B280", stock: 10, sku: "NOIR-STC-SND-S" },
      { id: "v60", size: "M", color: "Sand", colorHex: "#C2B280", stock: 18, sku: "NOIR-STC-SND-M" },
      { id: "v61", size: "L", color: "Sand", colorHex: "#C2B280", stock: 14, sku: "NOIR-STC-SND-L" },
    ],
    rating: 4.3, reviewCount: 48, tags: ["trending"], tag: "Hot Selling 🔥",
    sizeType: "alpha", collections: ["cult-favourites"], createdAt: "2026-04-16",
  },
  {
    id: "prod-19", name: "Classic Black Formal Shirt", description: "Tailored slim-fit formal shirt in premium cotton with French cuffs.",
    category: "Shirts", department: "men", subcategory: "Formal Shirts", brand: "NOIR",
    price: 44.99, regularPrice: 69.99,
    images: ["https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=900&h=1200&fit=crop", "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&h=1200&fit=crop"],
    variants: [
      { id: "v62", size: "S", color: "Black", colorHex: "#0a0a0a", stock: 9, sku: "NOIR-CBF-BLK-S" },
      { id: "v63", size: "M", color: "Black", colorHex: "#0a0a0a", stock: 16, sku: "NOIR-CBF-BLK-M" },
      { id: "v64", size: "L", color: "Black", colorHex: "#0a0a0a", stock: 12, sku: "NOIR-CBF-BLK-L" },
      { id: "v65", size: "XL", color: "Black", colorHex: "#0a0a0a", stock: 7, sku: "NOIR-CBF-BLK-XL" },
    ],
    rating: 4.6, reviewCount: 91, tags: ["bestseller"], tag: "BEST SELLER 🔥",
    sizeType: "alpha", collections: ["cult-favourites"], createdAt: "2026-03-25",
  },
  {
    id: "prod-20", name: "White Slim Formal Shirt", description: "Crisp white formal shirt with spread collar and tailored fit.",
    category: "Shirts", department: "men", subcategory: "Formal Shirts", brand: "NOIR",
    price: 42.99, regularPrice: 64.99,
    images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900&h=1200&fit=crop", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&h=1200&fit=crop"],
    variants: [
      { id: "v66", size: "S", color: "White", colorHex: "#f5f5f5", stock: 14, sku: "NOIR-WSF-WHT-S" },
      { id: "v67", size: "M", color: "White", colorHex: "#f5f5f5", stock: 22, sku: "NOIR-WSF-WHT-M" },
      { id: "v68", size: "L", color: "White", colorHex: "#f5f5f5", stock: 11, sku: "NOIR-WSF-WHT-L" },
    ],
    rating: 4.4, reviewCount: 56, tags: ["new", "trending"], tag: "NEW ARRIVAL 🚀",
    sizeType: "alpha", collections: ["new-inn"], createdAt: "2026-04-22",
  },
];

export const testimonials = [
  { name: "Yash", rating: 5, text: "Premium material and perfect fit. The oversized tee is my daily go-to now. Totally worth it!", product: "Stallion Oversized T-shirt" },
  { name: "Pranay", rating: 5, text: "Great fit and fast delivery. The fabric quality is unreal at this price point. Ordered 3 more!", product: "Glory Arc Relaxed Fit T-Shirt" },
  { name: "Nihar", rating: 4, text: "The joggers are insanely comfortable. Perfect tapered fit. Will buy every color they drop.", product: "Wild Drift Beige Joggers" },
  { name: "Sneha", rating: 5, text: "Ordered the hoodie and leather jacket — both are amazing. NOIR is my new favourite brand!", product: "Distressed Washed Hoodie" },
  { name: "Arjun", rating: 5, text: "The cargo pants have the best utility pockets. Vintage wash looks even better in person.", product: "Vintage Washed Black Cargo" },
];

export const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
export const numericSizes = ["28", "30", "32", "34", "36", "38"];
export const allColors = [
  { name: "Black", hex: "#0a0a0a" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Olive", hex: "#556B2F" },
  { name: "Beige", hex: "#D4B896" },
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Sand", hex: "#C2B280" },
  { name: "Slate", hex: "#708090" },
];
export const allBrands = ["NOIR"];
