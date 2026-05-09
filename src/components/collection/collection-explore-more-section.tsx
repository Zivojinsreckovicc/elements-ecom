import Link from "next/link";
import { CategoryCard } from "@/components/collection/category-card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { CollectionListItem } from "@/types/shopify";

type CollectionExploreMoreSectionProps = {
  otherCollections: CollectionListItem[];
};

export function CollectionExploreMoreSection({
  otherCollections,
}: CollectionExploreMoreSectionProps) {
  return (
    <Section className="border-t border-zinc-200/70 bg-zinc-50/40">
      <SectionHeading
        eyebrow="Explore"
        title="More collections to discover."
        description="Continue building your routine with curated categories from Elements."
      />
      {otherCollections.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherCollections.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-zinc-600">
          Explore the full catalog to see every collection in one place.
        </p>
      )}
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="/collections">All collections</Button>
        <Link
          href="/"
          className="text-sm text-zinc-600 underline underline-offset-4 transition-colors hover:text-zinc-900"
        >
          Back to home
        </Link>
      </div>
    </Section>
  );
}
