"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import {
  ProductCheckoutReassurance,
  ProductRatingTrust,
} from "@/components/product/product-rating-trust";
import { ProductDescription } from "@/components/product/product-description";
import { formatMoney, plainTextExcerpt } from "@/lib/shopify/transformers";
import type {
  ShopifyProductDetail,
  ShopifyProductOption,
  ShopifyVariant,
} from "@/types/shopify";

/** Shopify's placeholder when a product has no real variants (single "Default Title" option). */
function visibleProductOptions(
  product: ShopifyProductDetail,
): ShopifyProductOption[] {
  if (product.variants.length !== 1) {
    return product.options;
  }
  if (product.options.length !== 1) {
    return product.options;
  }
  const opt = product.options[0];
  const name = opt.name.trim().toLowerCase();
  const values = opt.values.map((v) => v.trim().toLowerCase());
  if (name !== "title" || values.length !== 1) {
    return product.options;
  }
  const only = values[0];
  if (only === "default title" || only === "default") {
    return [];
  }
  return product.options;
}

type ProductPageMainProps = {
  product: ShopifyProductDetail;
};

function optionsFromVariant(variant: ShopifyVariant): Record<string, string> {
  const o: Record<string, string> = {};
  for (const so of variant.selectedOptions) {
    o[so.name] = so.value;
  }
  return o;
}

function findVariant(
  variants: ShopifyVariant[],
  selected: Record<string, string>,
): ShopifyVariant | undefined {
  return variants.find((v) =>
    v.selectedOptions.every((so) => selected[so.name] === so.value),
  );
}

export function ProductPageMain({ product }: ProductPageMainProps) {
  const { addItem, isBusy } = useCart();
  const images = product.images.length
    ? product.images
    : product.featuredImage
      ? [{ url: product.featuredImage.url, altText: product.featuredImage.altText }]
      : [];

  const defaultVariant =
    product.variants.find((v) => v.availableForSale) ?? product.variants[0];

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    defaultVariant ? optionsFromVariant(defaultVariant) : {},
  );
  const [quantity, setQuantity] = useState(1);
  const [manualImageUrl, setManualImageUrl] = useState<string | null>(null);

  const selectedVariant = useMemo(
    () => findVariant(product.variants, selectedOptions),
    [product.variants, selectedOptions],
  );

  const optionsForUi = useMemo(() => visibleProductOptions(product), [product]);

  const variantImageUrl = selectedVariant?.image?.url ?? null;
  const activeFromVariant = variantImageUrl ?? product.featuredImage?.url ?? images[0]?.url ?? null;

  const mainUrl = manualImageUrl ?? activeFromVariant;
  const mainAlt =
    images.find((i) => i.url === mainUrl)?.altText ??
    product.featuredImage?.altText ??
    product.title;

  const subtitle = plainTextExcerpt(product.description || "", 220);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.02fr] lg:items-start">
      <div className="space-y-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-100">
          {mainUrl ? (
            <Image
              src={mainUrl}
              alt={mainAlt ?? product.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-zinc-400">
              No image
            </div>
          )}
        </div>
        {images.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img) => (
              <button
                key={img.url}
                type="button"
                onClick={() => setManualImageUrl(img.url)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition-colors ${
                  mainUrl === img.url
                    ? "border-zinc-900"
                    : "border-transparent ring-1 ring-zinc-200"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.altText ?? product.title}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-8 lg:pt-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Elements</p>
          <h1 className="mt-3 text-4xl tracking-tight text-zinc-900 md:text-5xl">
            {product.title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-xl text-base leading-8 text-zinc-600">{subtitle}</p>
          ) : null}
          <div className="mt-5">
            <ProductRatingTrust />
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">From</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <p className="text-2xl tracking-tight text-zinc-900">
              {selectedVariant
                ? formatMoney(selectedVariant.price)
                : formatMoney(product.priceRange.min)}
            </p>
            {selectedVariant?.compareAtPrice ? (
              <p className="text-lg text-zinc-400 line-through">
                {formatMoney(selectedVariant.compareAtPrice)}
              </p>
            ) : null}
          </div>
        </div>

        {optionsForUi.map((option) => (
          <div key={option.name}>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{option.name}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {option.values.map((value) => {
                const next = { ...selectedOptions, [option.name]: value };
                const match = findVariant(product.variants, next);
                const isSelected = selectedOptions[option.name] === value;
                const disabled = !match;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      setSelectedOptions(next);
                      setManualImageUrl(null);
                    }}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      isSelected
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-300 text-zinc-800 hover:border-zinc-900"
                    } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.16em] text-zinc-500">
            Quantity
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isFinite(n) && n >= 1) setQuantity(n);
              }}
              className="h-11 w-20 rounded-xl border border-zinc-300 px-3 text-sm text-zinc-900"
            />
          </label>
          <button
            type="button"
            disabled={
              isBusy ||
              !selectedVariant ||
              !selectedVariant.availableForSale ||
              quantity < 1
            }
            onClick={() => {
              if (!selectedVariant) return;
              void addItem(selectedVariant.id, quantity);
            }}
            className="h-11 rounded-full bg-zinc-900 px-8 text-sm text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add to cart
          </button>
        </div>

        <ProductCheckoutReassurance />

        {product.descriptionHtml ? (
          <ProductDescription html={product.descriptionHtml} />
        ) : null}
      </div>
    </div>
  );
}
