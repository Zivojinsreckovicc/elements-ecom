import Link from "next/link";
import { CategoryCard } from "@/components/collection/category-card";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Section } from "@/components/ui/section";
import { getCollections } from "@/lib/shopify/fetchers";

export const metadata = {
  title: "Collections | Elements",
  description: "Browse wellness collections from Elements.",
};

export default async function CollectionsPage() {
  const collections = await getCollections(50);

  return (
    <div className="bg-white text-zinc-900">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Section className="pt-14 md:pt-20">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Shop</p>
            <h1 className="text-4xl tracking-tight text-zinc-900 md:text-6xl">Collections</h1>
            <p className="text-base leading-8 text-zinc-600">
              Explore categories from your Shopify store, presented with the same calm, editorial
              layout as the rest of Elements.
            </p>
          </div>
          {collections.length === 0 ? (
            <p className="mt-12 text-sm text-zinc-600">
              No collections found. Add collections in Shopify to populate this page.
            </p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((c) => (
                <CategoryCard key={c.id} category={c} />
              ))}
            </div>
          )}
          <p className="mt-12 text-sm text-zinc-600">
            <Link href="/" className="underline underline-offset-4 hover:text-zinc-900">
              Back to home
            </Link>
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
