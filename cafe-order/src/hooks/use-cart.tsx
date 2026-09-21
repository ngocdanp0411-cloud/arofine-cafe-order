"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { CartItem } from "@/lib/types";
import { addToCart, removeCartLine, updateCartQty } from "@/lib/cart";
import { CART_KEY, readJSON, writeJSON, removeKey } from "@/lib/storage";

type CartContextValue = {
  items: CartItem[];
  isReady: boolean;
  addItem: (entry: Omit<CartItem, "key">) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Hydrate giỏ từ localStorage sau mount để tránh hydration mismatch (SSR không có localStorage).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readJSON<CartItem[]>(CART_KEY, []));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) writeJSON(CART_KEY, items);
  }, [items, isReady]);

  const addItem = useCallback((entry: Omit<CartItem, "key">) => {
    setItems((prev) => addToCart(prev, entry));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) => updateCartQty(prev, key, qty));
  }, []);

  const removeLine = useCallback((key: string) => {
    setItems((prev) => removeCartLine(prev, key));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    removeKey(CART_KEY);
  }, []);

  return (
    <CartContext.Provider
      value={{ items, isReady, addItem, setQty, removeLine, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải dùng trong CartProvider");
  return ctx;
}
