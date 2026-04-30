'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CART_STORAGE_KEY } from '@/constants/config';
import type { CartLine } from '@/types/cart';

type CartStore = {
  items: CartLine[];
  addItem: (bookId: string) => void;
  decrementItem: (bookId: string) => void;
  incrementItem: (bookId: string) => void;
  removeItem: (bookId: string) => void;
  getTotalItems: () => number;
};

type PersistedCartLine = {
  bookId?: unknown;
  book?: {
    id?: unknown;
  };
  quantity?: unknown;
};

function normalizePersistedItem(item: unknown): CartLine | null {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const persistedItem = item as PersistedCartLine;
  const bookId =
    typeof persistedItem.bookId === 'string'
      ? persistedItem.bookId
      : persistedItem.book && typeof persistedItem.book.id === 'string'
        ? persistedItem.book.id
        : null;

  if (!bookId) {
    return null;
  }

  const quantity =
    typeof persistedItem.quantity === 'number' && persistedItem.quantity > 0
      ? Math.floor(persistedItem.quantity)
      : 1;

  return { bookId, quantity };
}

function migratePersistedCart(persistedState: unknown): Pick<CartStore, 'items'> {
  if (!persistedState || typeof persistedState !== 'object') {
    return { items: [] };
  }

  const persistedItems = (persistedState as { items?: unknown }).items;

  if (!Array.isArray(persistedItems)) {
    return { items: [] };
  }

  return {
    items: persistedItems.flatMap((item) => {
      const normalizedItem = normalizePersistedItem(item);
      return normalizedItem ? [normalizedItem] : [];
    }),
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (bookId) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.bookId === bookId,
          );

          if (!existingItem) {
            return {
              items: [...state.items, { bookId, quantity: 1 }],
            };
          }

          return {
            items: state.items.map((item) =>
              item.bookId === bookId
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          };
        });
      },
      decrementItem: (bookId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.bookId === bookId
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item,
          ),
        }));
      },
      incrementItem: (bookId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.bookId === bookId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
      },
      removeItem: (bookId) => {
        set((state) => ({
          items: state.items.filter((item) => item.bookId !== bookId),
        }));
      },
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      migrate: migratePersistedCart,
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      version: 1,
    },
  ),
);
