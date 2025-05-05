import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../../sanity.types";

export type Size = string;

export type Color = {
  name: string;
  value: string;
};

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  selectedSize: Size;
  selectedColor: Color;
};

interface CartState {
  items: CartItem[];
  addItem: (
    product: Product,
    variantId: string,
    size: Size,
    color: Color
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variantId, size, color) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) =>
            item.productId === product._id && item.variantId === variantId
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += 1;
          set({ items: updatedItems });
        } else {
          const newItem: CartItem = {
            productId: product._id,
            variantId,
            quantity: 1,
            product,
            selectedSize: size,
            selectedColor: color,
          };
          set({ items: [...currentItems, newItem] });
        }
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) return;

        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const variant = item.product.variants?.find(
            (v) => v.variantId === item.variantId
          );
          const price = variant?.price ?? item.product.price ?? 0;
          return total + price * item.quantity;
        }, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "sartorial-cart",
    }
  )
);
