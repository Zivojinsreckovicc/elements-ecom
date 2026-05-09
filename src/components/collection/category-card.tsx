import Image from "next/image";
import Link from "next/link";
import type { CollectionListItem } from "@/types/shopify";

type CategoryCardProps = {
  category: CollectionListItem;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={category.href}
      className="group block overflow-hidden rounded-3xl bg-zinc-100"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {category.imageUrl ? (
          <Image
            src={category.imageUrl}
            alt={category.imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-zinc-200 to-zinc-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/45 via-zinc-900/10 to-transparent" />
        <div className="absolute bottom-0 p-6">
          <h3 className="text-2xl text-white md:text-3xl">{category.title}</h3>
          {category.description ? (
            <p className="mt-2 max-w-xs text-sm text-zinc-100/90">{category.description}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
