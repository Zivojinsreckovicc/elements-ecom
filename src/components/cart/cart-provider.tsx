"use client";

import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addCartLines,
  createCart,
  fetchCart,
  removeCartLines,
  updateCartLines,
} from "@/lib/shopify/cart-client";
import type { ShopifyCart } from "@/types/shopify";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProviderShell } from "@/components/cart/cart-context";

const STORAGE_KEY = "elements_shopify_cart_id";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem(STORAGE_KEY);
    startTransition(() => {
      if (id) setCartId(id);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!cartId) {
      startTransition(() => setCart(null));
      return;
    }

    let cancelled = false;

    void (async () => {
      const next = await fetchCart(cartId);
      if (cancelled) return;
      startTransition(() => {
        if (!next) {
          localStorage.removeItem(STORAGE_KEY);
          setCartId(null);
          setCart(null);
        } else {
          setCart(next);
        }
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [cartId, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    async (merchandiseId: string, quantity: number) => {
      setIsBusy(true);
      try {
        if (!cartId) {
          const created = await createCart([{ merchandiseId, quantity }]);
          localStorage.setItem(STORAGE_KEY, created.id);
          startTransition(() => {
            setCartId(created.id);
            setCart(created);
          });
        } else {
          const updated = await addCartLines(cartId, [{ merchandiseId, quantity }]);
          startTransition(() => setCart(updated));
        }
        setIsOpen(true);
      } finally {
        setIsBusy(false);
      }
    },
    [cartId],
  );

  const updateLine = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;
      setIsBusy(true);
      try {
        const updated = await updateCartLines(cartId, [{ id: lineId, quantity }]);
        startTransition(() => setCart(updated));
      } finally {
        setIsBusy(false);
      }
    },
    [cartId],
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setIsBusy(true);
      try {
        const updated = await removeCartLines(cartId, [lineId]);
        startTransition(() => setCart(updated));
      } finally {
        setIsBusy(false);
      }
    },
    [cartId],
  );

  const checkoutUrl = cart?.checkoutUrl ?? null;
  const checkout = useCallback(() => {
    if (!checkoutUrl) return;
    window.location.href = checkoutUrl;
  }, [checkoutUrl]);

  const itemCount = cart?.totalQuantity ?? 0;

  const value = useMemo(
    () => ({
      cart,
      cartId,
      isOpen,
      isBusy,
      itemCount,
      openCart,
      closeCart,
      addItem,
      updateLine,
      removeLine,
      checkout,
    }),
    [
      cart,
      cartId,
      isOpen,
      isBusy,
      itemCount,
      openCart,
      closeCart,
      addItem,
      updateLine,
      removeLine,
      checkout,
    ],
  );

  return (
    <CartProviderShell value={value}>
      {children}
      <CartDrawer />
    </CartProviderShell>
  );
}
