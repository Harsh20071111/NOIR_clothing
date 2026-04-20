import { create } from "zustand";

interface FilterState {
  sizes: string[];
  colors: string[];
  brands: string[];
  priceRange: [number, number];
  sort: string;
  category: string;

  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
  toggleBrand: (brand: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSort: (sort: string) => void;
  setCategory: (category: string) => void;
  clearAll: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  sizes: [],
  colors: [],
  brands: [],
  priceRange: [30, 50],
  sort: "popular",
  category: "all",

  toggleSize: (size) =>
    set((state) => ({
      sizes: state.sizes.includes(size)
        ? state.sizes.filter((s) => s !== size)
        : [...state.sizes, size],
    })),

  toggleColor: (color) =>
    set((state) => ({
      colors: state.colors.includes(color)
        ? state.colors.filter((c) => c !== color)
        : [...state.colors, color],
    })),

  toggleBrand: (brand) =>
    set((state) => ({
      brands: state.brands.includes(brand)
        ? state.brands.filter((b) => b !== brand)
        : [...state.brands, brand],
    })),

  setPriceRange: (range) => set({ priceRange: range }),
  setSort: (sort) => set({ sort }),
  setCategory: (category) => set({ category }),

  clearAll: () =>
    set({
      sizes: [],
      colors: [],
      brands: [],
      priceRange: [30, 50],
      sort: "popular",
      category: "all",
    }),
}));
