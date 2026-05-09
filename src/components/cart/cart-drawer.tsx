"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { formatMoney } from "@/lib/shopify/transformers";

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateLine, removeLine, checkout, isBusy } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-zinc-950/30 backdrop-blur-[2px] transition-opacity"
        onClick={closeCart}
      />
      <aside className="relative flex h-full w-full max-w-md flex-col border-l border-zinc-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Cart</p>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!cart || cart.lines.length === 0 ? (
            <p className="text-sm text-zinc-600">Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {cart.lines.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-4 border-b border-zinc-100 pb-6 last:border-0"
                >
                  <Link
                    href={`/products/${line.productHandle}`}
                    onClick={closeCart}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100"
                  >
                    {line.image?.url ? (
                      <Image
                        src={line.image.url}
                        alt={line.image.altText ?? line.productTitle}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${line.productHandle}`}
                      onClick={closeCart}
                      className="text-sm font-medium text-zinc-900 hover:underline"
                    >
                      {line.productTitle}
                    </Link>
                    {line.variantTitle && line.variantTitle !== "Default Title" ? (
                      <p className="mt-1 text-xs text-zinc-500">{line.variantTitle}</p>
                    ) : null}
                    <p className="mt-2 text-sm text-zinc-700">
                      {formatMoney(line.price)}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <label className="flex items-center gap-2 text-xs text-zinc-600">
                        Qty
                        <input
                          type="number"
                          min={1}
                          className="h-8 w-14 rounded-lg border border-zinc-300 px-2 text-sm"
                          value={line.quantity}
                          disabled={isBusy}
                          onChange={(e) => {
                            const n = Number(e.target.value);
                            if (!Number.isFinite(n) || n < 1) return;
                            void updateLine(line.id, n);
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => void removeLine(line.id)}
                        className="text-xs uppercase tracking-[0.14em] text-zinc-500 hover:text-zinc-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart && cart.lines.length > 0 ? (
          <div className="border-t border-zinc-200 px-6 py-5">
            <div className="flex items-center justify-between text-sm text-zinc-700">
              <span>Subtotal</span>
              <span>{formatMoney(cart.cost.subtotal)}</span>
            </div>
            <button
              type="button"
              disabled={isBusy}
              onClick={checkout}
              className="mt-4 w-full rounded-full bg-zinc-900 py-3 text-sm text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
