import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import type { CollectionListItem } from "@/types/shopify";

type CollectionShowcaseSectionProps = {
  category: CollectionListItem;
  /** When true, copy column is on the left and image on the right (desktop). */
  textOnLeft: boolean;
};

export function CollectionShowcaseSection({ category, textOnLeft }: CollectionShowcaseSectionProps) {
  const imageBlock = (
    <Link
      href={category.href}
      className="group relative block aspect-[5/6] w-full overflow-hidden rounded-[2rem] bg-zinc-100"
      aria-label={`Browse ${category.title}`}
    >
      {category.imageUrl ? (
        <Image
          src={category.imageUrl}
          alt={category.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-200 to-zinc-100" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Link>
  );

  const textBlock = (
    <div className="flex flex-col justify-center py-2 md:max-w-xl md:py-6 lg:py-10">
      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Collection</p>
      <h2 className="mt-4 text-3xl tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">{category.title}</h2>
      {category.description ? (
        <p className="mt-5 text-base leading-8 text-zinc-600">{category.description}</p>
      ) : (
        <p className="mt-5 text-base leading-8 text-zinc-600">
          Explore products in this curated category from Elements.
        </p>
      )}
      <Link
        href={category.href}
        className="mt-8 inline-flex h-12 w-max items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 px-8 text-sm text-white transition-colors hover:bg-zinc-800"
      >
        Browse collection
      </Link>
    </div>
  );

  return (
    <Section id={`collection-${category.handle}`} className="border-t border-zinc-200/60">
      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14 lg:gap-20">
        {textOnLeft ? (
          <>
            {textBlock}
            {imageBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {textBlock}
          </>
        )}
      </div>
    </Section>
  );
}
