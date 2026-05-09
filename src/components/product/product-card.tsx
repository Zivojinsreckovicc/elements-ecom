import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductCardActions } from "@/components/product/product-card-actions";
import type { ProductListItem } from "@/types/shopify";

type ProductCardProps = {
  product: ProductListItem;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-zinc-200/80 bg-white p-4 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50">
      <Link
        href={product.href}
        className="group flex min-h-0 flex-1 flex-col rounded-2xl outline-none ring-zinc-900/0 transition-[box-shadow] focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
      >
        <div className="relative aspect-square shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-zinc-400">
              No image
            </div>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col pt-5">
          <div className="min-h-0 flex-1">
            <div className="mb-3 min-h-[2.25rem]">
              {product.badge ? <Badge label={product.badge} /> : null}
            </div>
            <h3 className="line-clamp-2 text-xl tracking-tight text-zinc-900">{product.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">{product.subtitle}</p>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex flex-wrap items-baseline gap-2">
              <p className="text-sm tracking-[0.08em] text-zinc-800">{product.priceFormatted}</p>
              {product.compareAtFormatted ? (
                <p className="text-sm text-zinc-400 line-through">{product.compareAtFormatted}</p>
              ) : null}
            </div>
            <div className="mt-1 min-h-[1.25rem]">
              {!product.availableForSale ? (
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Sold out</p>
              ) : null}
            </div>
          </div>
        </div>
      </Link>

      <ProductCardActions
        defaultVariantId={product.defaultVariantId}
        defaultVariantAvailable={product.defaultVariantAvailable}
        productAvailable={product.availableForSale}
      />
    </div>
  );
}
