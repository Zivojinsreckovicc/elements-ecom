import { CategoryCard } from "@/components/collection/category-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollections } from "@/lib/shopify/fetchers";

export async function FeaturedCategoriesSection() {
  const collections = await getCollections(6);

  return (
    <Section id="featured-categories" className="border-t border-zinc-200/60">
      <SectionHeading
        eyebrow="Curated Categories"
        title="Wellness tailored to every ritual."
        description="Discover foundational health, performance support, skincare, and family care designed with a calm premium approach."
      />
      {collections.length === 0 ? (
        <p className="mt-10 text-sm text-zinc-600">
          Collections will appear here once they are available in your Shopify store.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </Section>
  );
}
