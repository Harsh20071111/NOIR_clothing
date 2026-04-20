import { create } from "zustand";

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;

  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.variantId === item.variantId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (variantId) =>
    set((state) => ({
      items: state.items.filter((i) => i.variantId !== variantId),
    })),

  updateQuantity: (variantId, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.variantId !== variantId)
          : state.items.map((i) =>
              i.variantId === variantId ? { ...i, quantity } : i
            ),
    })),

  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setCartOpen: (open) => set({ isOpen: open }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
