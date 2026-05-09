import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { ProductListItem } from "@/types/shopify";

type ProductCardProps = {
  product: ProductListItem;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={product.href}
      className="group block rounded-3xl border border-zinc-200/80 bg-white p-4 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-zinc-400">
            No image
          </div>
        )}
      </div>
      <div className="pt-5">
        {product.badge ? (
          <div className="mb-3">
            <Badge label={product.badge} />
          </div>
        ) : null}
        <h3 className="text-xl tracking-tight text-zinc-900">{product.title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{product.subtitle}</p>
        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <p className="text-sm tracking-[0.08em] text-zinc-800">{product.priceFormatted}</p>
          {product.compareAtFormatted ? (
            <p className="text-sm text-zinc-400 line-through">{product.compareAtFormatted}</p>
          ) : null}
        </div>
        {!product.availableForSale ? (
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">Sold out</p>
        ) : null}
      </div>
    </Link>
  );
}
