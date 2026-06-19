"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  priceCents: number;
  image?: string | null;
  category?: string;
  quantity: number;
};

type State = { items: CartItem[] };

type Action =
  | { type: "ADD"; item: Omit<CartItem, "quantity">; quantity: number }
  | { type: "REMOVE"; productId: string }
  | { type: "SET_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

const STORAGE_KEY = "lumocad-cart-v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD": {
      const existing = state.items.find((i) => i.productId === action.item.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.item.productId
              ? { ...i, quantity: i.quantity + action.quantity }
              : i,
          ),
        };
      }
      return { items: [...state.items, { ...action.item, quantity: action.quantity }] };
    }
    case "SET_QTY":
      return {
        items: state.items
          .map((i) =>
            i.productId === action.productId
              ? { ...i, quantity: Math.max(0, action.quantity) }
              : i,
          )
          .filter((i) => i.quantity > 0),
      };
    case "REMOVE":
      return { items: state.items.filter((i) => i.productId !== action.productId) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotalCents: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydratation depuis localStorage (côté client uniquement)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) as CartItem[] });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persistance
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore */
    }
  }, [state.items, hydrated]);

  const add = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      dispatch({ type: "ADD", item, quantity });
      setIsOpen(true);
    },
    [],
  );
  const remove = useCallback((productId: string) => dispatch({ type: "REMOVE", productId }), []);
  const setQty = useCallback(
    (productId: string, quantity: number) => dispatch({ type: "SET_QTY", productId, quantity }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((n, i) => n + i.quantity, 0);
    const subtotalCents = state.items.reduce((n, i) => n + i.priceCents * i.quantity, 0);
    return {
      items: state.items,
      count,
      subtotalCents,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      remove,
      setQty,
      clear,
    };
  }, [state.items, isOpen, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
