"use client";

import { useCart } from "@/hooks/use-cart";

type ProductCardActionsProps = {
  defaultVariantId: string | null;
  defaultVariantAvailable: boolean;
  productAvailable: boolean;
};

export function ProductCardActions({
  defaultVariantId,
  defaultVariantAvailable,
  productAvailable,
}: ProductCardActionsProps) {
  const { addItem, isBusy } = useCart();

  const canPurchase = Boolean(
    productAvailable && defaultVariantAvailable && defaultVariantId,
  );

  const handleAddToCart = () => {
    if (!defaultVariantId || !canPurchase) return;
    void addItem(defaultVariantId, 1);
  };

  const handleBuyNow = async () => {
    if (!defaultVariantId || !canPurchase) return;
    const cart = await addItem(defaultVariantId, 1, { openCart: false });
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  const disabled = !canPurchase || isBusy;

  return (
    <div className="mt-4 flex gap-2">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={disabled}
        className="h-8 min-w-0 flex-1 rounded-full border border-zinc-300/90 bg-white px-2 text-[11px] font-medium tracking-wide text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Add to cart
      </button>
      <button
        type="button"
        onClick={() => void handleBuyNow()}
        disabled={disabled}
        className="h-8 min-w-0 flex-1 rounded-full bg-zinc-900 px-2 text-[11px] font-medium tracking-wide text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Buy now
      </button>
    </div>
  );
}
