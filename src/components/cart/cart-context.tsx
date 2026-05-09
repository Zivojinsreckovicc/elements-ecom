"use client";

import { createContext, type ReactNode } from "react";
import type { ShopifyCart } from "@/types/shopify";

export type CartContextValue = {
  cart: ShopifyCart | null;
  cartId: string | null;
  isOpen: boolean;
  isBusy: boolean;
  itemCount: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    merchandiseId: string,
    quantity: number,
    options?: { openCart?: boolean },
  ) => Promise<ShopifyCart | null>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  checkout: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProviderShell({
  value,
  children,
}: {
  value: CartContextValue;
  children: ReactNode;
}) {
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
