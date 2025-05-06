// wishlistStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../../sanity.types";

interface WishlistState {
  items: Product[];
  count: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      count: 0,

      addItem: (product) => {
        const currentItems = get().items;
        if (!currentItems.some((item) => item._id === product._id)) {
          set({
            items: [...currentItems, product],
            count: currentItems.length + 1,
          });
        }
      },

      removeItem: (productId) => {
        const currentItems = get().items.filter(
          (item) => item._id !== productId
        );
        set({
          items: currentItems,
          count: currentItems.length,
        });
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item._id === productId);
      },

      clearWishlist: () => {
        set({ items: [], count: 0 });
      },
    }),
    {
      name: "sartorial-wishlist",
    }
  )
);
