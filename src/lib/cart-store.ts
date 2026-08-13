import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { slug: string; qty: number };

type CartState = {
  items: CartItem[];
  open: boolean;
  lastPlugged: string | null;
  setOpen: (open: boolean) => void;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      lastPlugged: null,
      setOpen: (open) => set({ open }),
      add: (slug) => {
        const items = [...get().items];
        const i = items.findIndex((it) => it.slug === slug);
        if (i >= 0) items[i] = { slug, qty: items[i].qty + 1 };
        else items.push({ slug, qty: 1 });
        set({ items, open: true, lastPlugged: slug });
      },
      remove: (slug) =>
        set({ items: get().items.filter((it) => it.slug !== slug) }),
      setQty: (slug, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((it) => it.slug !== slug) });
          return;
        }
        set({
          items: get().items.map((it) => (it.slug === slug ? { ...it, qty } : it)),
        });
      },
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, it) => n + it.qty, 0),
    }),
    { name: "sp-connect-bag", partialize: (s) => ({ items: s.items }) },
  ),
);
