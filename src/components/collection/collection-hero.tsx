import Image from "next/image";
import type { CollectionListItem } from "@/types/shopify";

type CollectionHeroProps = {
  collection: CollectionListItem;
};

export function CollectionHero({ collection }: CollectionHeroProps) {
  return (
    <div className="grid gap-8 border-b border-zinc-200/70 pb-14 md:grid-cols-[1fr_1.1fr] md:items-end md:pb-20">
      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Collection</p>
        <h1 className="text-4xl tracking-tight text-zinc-900 md:text-6xl">{collection.title}</h1>
        {collection.description ? (
          <p className="max-w-xl text-base leading-8 text-zinc-600">{collection.description}</p>
        ) : null}
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-zinc-100 md:aspect-[5/4]">
        {collection.imageUrl ? (
          <Image
            src={collection.imageUrl}
            alt={collection.imageAlt}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-zinc-200 to-zinc-50" />
        )}
      </div>
    </div>
  );
}
