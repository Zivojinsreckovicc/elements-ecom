import { notFound } from "next/navigation";
import { CollectionExploreMoreSection } from "@/components/collection/collection-explore-more-section";
import { CollectionHero } from "@/components/collection/collection-hero";
import { ProductCard } from "@/components/product/product-card";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CollectionNewsletterSection } from "@/components/sections/collection-newsletter-section";
import { Section } from "@/components/ui/section";
import { getCollectionByHandle, getOtherCollections } from "@/lib/shopify/fetchers";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const data = await getCollectionByHandle(handle, 1);
  if (!data?.collection) {
    return { title: "Collection | Elements" };
  }
  return {
    title: `${data.collection.title} | Elements`,
    description: data.collection.description || `Shop ${data.collection.title} at Elements.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const [data, otherCollections] = await Promise.all([
    getCollectionByHandle(handle, 48),
    getOtherCollections(handle, 3),
  ]);

  if (!data?.collection) {
    notFound();
  }

  const { collection, products } = data;

  return (
    <div className="bg-white text-zinc-900">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Section className="pt-14 md:pt-20">
          <CollectionHero collection={collection} />
          {products.length === 0 ? (
            <p className="mt-12 text-sm text-zinc-600">No products in this collection yet.</p>
          ) : (
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </Section>
        <CollectionExploreMoreSection otherCollections={otherCollections} />
        <CollectionNewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
