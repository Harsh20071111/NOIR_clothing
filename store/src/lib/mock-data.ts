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
  discountPrice?: number;
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: { name: string; slug: string }[];
}

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Men",
    slug: "men",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&h=800&fit=crop",
    subcategories: [
      { name: "T-Shirts", slug: "tshirts" },
      { name: "Shirts", slug: "shirts" },
      { name: "Oversized", slug: "oversized" },
      { name: "Hoodies", slug: "hoodies" },
      { name: "Joggers", slug: "joggers" },
      { name: "Jackets", slug: "jackets" },
    ],
  },
  {
    id: "cat-2",
    name: "Women",
    slug: "women",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
    subcategories: [
      { name: "Tops", slug: "tops" },
      { name: "Dresses", slug: "dresses" },
      { name: "Kurtis", slug: "kurtis" },
      { name: "Co-ords", slug: "coords" },
      { name: "Hoodies", slug: "hoodies" },
    ],
  },
  {
    id: "cat-3",
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&h=800&fit=crop",
    subcategories: [
      { name: "Caps", slug: "caps" },
      { name: "Bags", slug: "bags" },
      { name: "Socks", slug: "socks" },
    ],
  },
  {
    id: "cat-4",
    name: "New Drops",
    slug: "new-drops",
    image: "https://res.cloudinary.com/duyhzu8so/image/upload/v1776708342/shopping_y4i7d9.webp",
    subcategories: [],
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Men's Oversized T-Shirt (Black)",
    description: "Premium heavyweight cotton oversized t-shirt with a relaxed drop-shoulder fit. Perfect for layering or wearing solo.",
    category: "Men",
    department: "men",
    subcategory: "Oversized",
    brand: "NOIR",
    price: 45,
    discountPrice: 39,
    images: [
      "/products/prod-1-1.webp",
      "/products/prod-1-2.webp",
    ],
    variants: [
      { id: "v1", size: "S", color: "Black", colorHex: "#0a0a0a", stock: 15, sku: "NOIR-OVS-BLK-S" },
      { id: "v2", size: "M", color: "Black", colorHex: "#0a0a0a", stock: 22, sku: "NOIR-OVS-BLK-M" },
      { id: "v3", size: "L", color: "Black", colorHex: "#0a0a0a", stock: 18, sku: "NOIR-OVS-BLK-L" },
      { id: "v4", size: "XL", color: "Black", colorHex: "#0a0a0a", stock: 10, sku: "NOIR-OVS-BLK-XL" },
    ],
    rating: 4.8,
    reviewCount: 342,
    tags: ["trending", "new"],
    createdAt: "2026-04-10",
  },
  {
    id: "prod-2",
    name: "Half Sleeve Men's Black T-Shirt",
    description: "Soft cotton half-sleeve t-shirt with a clean everyday fit and breathable feel.",
    category: "Men",
    department: "men",
    subcategory: "T-Shirts",
    brand: "FROST",
    price: 50,
    discountPrice: 44,
    images: [
      "/products/prod-2-1.webp",
      "/products/prod-2-2.webp",
    ],
    variants: [
      { id: "v5", size: "S", color: "White", colorHex: "#f5f5f5", stock: 8, sku: "FRS-HD-WHT-S" },
      { id: "v6", size: "M", color: "White", colorHex: "#f5f5f5", stock: 14, sku: "FRS-HD-WHT-M" },
      { id: "v7", size: "L", color: "White", colorHex: "#f5f5f5", stock: 20, sku: "FRS-HD-WHT-L" },
      { id: "v8", size: "XL", color: "White", colorHex: "#f5f5f5", stock: 6, sku: "FRS-HD-WHT-XL" },
    ],
    rating: 4.6,
    reviewCount: 189,
    tags: ["bestseller"],
    createdAt: "2026-03-28",
  },
  {
    id: "prod-3",
    name: "Virgio Pink Short Dress",
    description: "Soft cotton short dress in a pink tone with a relaxed, easy-to-wear silhouette.",
    category: "Women",
    department: "women",
    subcategory: "Dresses",
    brand: "VIRGIO",
    price: 42,
    images: [
      "/products/prod-3-1.webp",
      "/products/prod-3-2.webp",
    ],
    variants: [
      { id: "v9", size: "S", color: "Pink", colorHex: "#F4A7B9", stock: 12, sku: "VIR-DRS-PNK-S" },
      { id: "v10", size: "M", color: "Pink", colorHex: "#F4A7B9", stock: 25, sku: "VIR-DRS-PNK-M" },
      { id: "v11", size: "L", color: "Pink", colorHex: "#F4A7B9", stock: 18, sku: "VIR-DRS-PNK-L" },
      { id: "v12", size: "XL", color: "Rose", colorHex: "#E78CA8", stock: 10, sku: "VIR-DRS-ROS-XL" },
    ],
    rating: 4.5,
    reviewCount: 256,
    tags: ["trending"],
    createdAt: "2026-04-05",
  },
  {
    id: "prod-4",
    name: "Printed Kurti",
    description: "Printed kurti with a light fabric feel and a comfortable everyday fit.",
    category: "Women",
    department: "women",
    subcategory: "Kurtis",
    brand: "BLAZE",
    price: 38,
    discountPrice: 33,
    images: [
      "/products/prod-4-1.webp",
      "/products/prod-4-2.webp",
    ],
    variants: [
      { id: "v13", size: "S", color: "Rust", colorHex: "#B7410E", stock: 20, sku: "BLZ-GFX-RST-S" },
      { id: "v14", size: "M", color: "Rust", colorHex: "#B7410E", stock: 30, sku: "BLZ-GFX-RST-M" },
      { id: "v15", size: "L", color: "Rust", colorHex: "#B7410E", stock: 15, sku: "BLZ-GFX-RST-L" },
    ],
    rating: 4.3,
    reviewCount: 128,
    tags: ["new"],
    createdAt: "2026-04-15",
  },
  {
    id: "prod-5",
    name: "Printed Kurti",
    description: "Printed kurti style with a relaxed shape, made for easy day-long wear.",
    category: "Women",
    department: "women",
    subcategory: "Kurtis",
    brand: "NOIR",
    price: 49,
    images: [
      "/products/prod-5-1.webp",
      "/products/prod-5-2.webp",
    ],
    variants: [
      { id: "v16", size: "M", color: "Black", colorHex: "#0a0a0a", stock: 8, sku: "NOIR-BMB-BLK-M" },
      { id: "v17", size: "L", color: "Black", colorHex: "#0a0a0a", stock: 12, sku: "NOIR-BMB-BLK-L" },
      { id: "v18", size: "XL", color: "Black", colorHex: "#0a0a0a", stock: 5, sku: "NOIR-BMB-BLK-XL" },
    ],
    rating: 4.9,
    reviewCount: 87,
    tags: ["bestseller", "trending"],
    createdAt: "2026-03-20",
  },
  {
    id: "prod-6",
    name: "Women's Crop Top (Burgundy)",
    description: "Fitted cropped top in luxurious velvet fabric. Square neck with delicate strap detailing.",
    category: "Women",
    department: "women",
    subcategory: "Tops",
    brand: "LUNA",
    price: 40,
    discountPrice: 35,
    images: [
      "/products/prod-6-1.webp",
      "/products/prod-6-2.webp",
    ],
    variants: [
      { id: "v19", size: "S", color: "Burgundy", colorHex: "#800020", stock: 14, sku: "LUN-CRP-BRG-S" },
      { id: "v20", size: "M", color: "Burgundy", colorHex: "#800020", stock: 20, sku: "LUN-CRP-BRG-M" },
      { id: "v21", size: "L", color: "Burgundy", colorHex: "#800020", stock: 10, sku: "LUN-CRP-BRG-L" },
    ],
    rating: 4.7,
    reviewCount: 198,
    tags: ["trending", "new"],
    createdAt: "2026-04-12",
  },
  {
    id: "prod-7",
    name: "Women's Maxi Dress (Ivory)",
    description: "Flowing maxi dress in lightweight chiffon with a subtle floral print. Cinched waist with a tie-back detail.",
    category: "Women",
    department: "women",
    subcategory: "Dresses",
    brand: "LUNA",
    price: 47,
    images: [
      "/products/prod-7-1.webp",
      "/products/prod-7-2.webp",
    ],
    variants: [
      { id: "v22", size: "S", color: "Ivory", colorHex: "#FFFFF0", stock: 7, sku: "LUN-MXD-IVR-S" },
      { id: "v23", size: "M", color: "Ivory", colorHex: "#FFFFF0", stock: 12, sku: "LUN-MXD-IVR-M" },
      { id: "v24", size: "L", color: "Ivory", colorHex: "#FFFFF0", stock: 9, sku: "LUN-MXD-IVR-L" },
    ],
    rating: 4.4,
    reviewCount: 76,
    tags: ["new"],
    createdAt: "2026-04-18",
  },
  {
    id: "prod-8",
    name: "White Shirt",
    description: "Classic men's white shirt with a clean look and versatile styling.",
    category: "Men",
    department: "men",
    subcategory: "Shirts",
    brand: "FROST",
    price: 44,
    discountPrice: 39,
    images: [
      "/products/prod-8-1.webp",
      "/products/prod-8-2.webp",
    ],
    variants: [
      { id: "v25", size: "S", color: "White", colorHex: "#F5F5F5", stock: 16, sku: "MNS-SHR-WHT-S" },
      { id: "v26", size: "M", color: "White", colorHex: "#F5F5F5", stock: 22, sku: "MNS-SHR-WHT-M" },
      { id: "v27", size: "L", color: "White", colorHex: "#F5F5F5", stock: 11, sku: "MNS-SHR-WHT-L" },
    ],
    rating: 4.6,
    reviewCount: 143,
    tags: ["bestseller"],
    createdAt: "2026-04-01",
  },
  {
    id: "prod-9",
    name: "Linen Shirt",
    description: "Men's striped linen shirt with a breathable weave and clean, lightweight feel.",
    category: "Men",
    department: "men",
    subcategory: "Shirts",
    brand: "NOIR",
    price: 34,
    images: [
      "/products/prod-9-1.webp",
      "/products/prod-9-2.webp",
    ],
    variants: [
      { id: "v28", size: "M", color: "White", colorHex: "#F5F5F5", stock: 50, sku: "MNS-LIN-WHT-M" },
      { id: "v29", size: "L", color: "White", colorHex: "#F5F5F5", stock: 30, sku: "MNS-LIN-WHT-L" },
    ],
    rating: 4.2,
    reviewCount: 312,
    tags: ["bestseller"],
    createdAt: "2026-02-15",
  },
  {
    id: "prod-10",
    name: "Full Sleeve Black T-Shirt",
    description: "Full-sleeve black t-shirt with a clean silhouette and soft, comfortable fabric.",
    category: "Men",
    department: "men",
    subcategory: "T-Shirts",
    brand: "FROST",
    price: 46,
    images: [
      "/products/prod-10-1.webp",
      "/products/prod-10-2.webp",
    ],
    variants: [
      { id: "v30", size: "M", color: "Slate", colorHex: "#708090", stock: 18, sku: "FRS-HD-SLT-M" },
      { id: "v31", size: "L", color: "Slate", colorHex: "#708090", stock: 24, sku: "FRS-HD-SLT-L" },
      { id: "v32", size: "XL", color: "Slate", colorHex: "#708090", stock: 10, sku: "FRS-HD-SLT-XL" },
    ],
    rating: 4.7,
    reviewCount: 201,
    tags: ["trending"],
    createdAt: "2026-03-15",
  },
  {
    id: "prod-11",
    name: "Men's Relaxed T-Shirt (Black)",
    description: "Relaxed-fit t-shirt with contrast neon stitching along the seams. Made from organic cotton.",
    category: "Men",
    department: "men",
    subcategory: "T-Shirts",
    brand: "BLAZE",
    price: 36,
    images: [
      "/products/prod-11-1.webp",
      "/products/prod-11-2.webp",
    ],
    variants: [
      { id: "v33", size: "S", color: "Black", colorHex: "#0a0a0a", stock: 25, sku: "BLZ-NEO-BLK-S" },
      { id: "v34", size: "M", color: "Black", colorHex: "#0a0a0a", stock: 35, sku: "BLZ-NEO-BLK-M" },
      { id: "v35", size: "L", color: "Black", colorHex: "#0a0a0a", stock: 20, sku: "BLZ-NEO-BLK-L" },
      { id: "v36", size: "XL", color: "Black", colorHex: "#0a0a0a", stock: 12, sku: "BLZ-NEO-BLK-XL" },
    ],
    rating: 4.1,
    reviewCount: 95,
    tags: ["new"],
    createdAt: "2026-04-17",
  },
  {
    id: "prod-12",
    name: "Formal Black Shirt",
    description: "Men's formal black shirt with a sharp collar and structured fit for dressier occasions.",
    category: "Men",
    department: "men",
    subcategory: "Shirts",
    brand: "LUNA",
    price: 50,
    discountPrice: 45,
    images: [
      "/products/prod-12-1.webp",
      "/products/prod-12-2.webp",
    ],
    variants: [
      { id: "v37", size: "S", color: "Black", colorHex: "#0a0a0a", stock: 5, sku: "MNS-FRM-BLK-S" },
      { id: "v38", size: "M", color: "Black", colorHex: "#0a0a0a", stock: 8, sku: "MNS-FRM-BLK-M" },
      { id: "v39", size: "L", color: "Black", colorHex: "#0a0a0a", stock: 10, sku: "MNS-FRM-BLK-L" },
    ],
    rating: 4.8,
    reviewCount: 64,
    tags: ["new", "trending"],
    createdAt: "2026-04-14",
  },
];

export const allSizes = ["S", "M", "L", "XL", "One Size"];
export const allColors = [
  { name: "Black", hex: "#0a0a0a" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Olive", hex: "#556B2F" },
  { name: "Rust", hex: "#B7410E" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Ivory", hex: "#FFFFF0" },
  { name: "Grey", hex: "#808080" },
  { name: "Sand", hex: "#C2B280" },
  { name: "Slate", hex: "#708090" },
  { name: "Lavender", hex: "#E6E6FA" },
];
export const allBrands = ["NOIR", "FROST", "BLAZE", "LUNA"];
