import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { RoutedFaqSection } from "@/components/faq/routed-faq-section";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Section } from "@/components/ui/section";
import { searchProducts } from "@/lib/shopify/fetchers";

export const metadata = {
  title: "Search | Elements",
  description: "Search products at Elements.",
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const products = query ? await searchProducts(query, 24) : [];

  return (
    <div className="bg-white text-zinc-900">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Section className="pt-14 md:pt-20">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Search</p>
            <h1 className="text-3xl tracking-tight text-zinc-900 md:text-5xl">Find your essentials</h1>
            <form action="/search" method="get" className="mt-6 flex gap-2">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search products"
                className="h-12 flex-1 rounded-full border border-zinc-300 bg-white px-5 text-sm text-zinc-900 outline-none focus:border-zinc-900"
              />
              <button
                type="submit"
                className="h-12 rounded-full bg-zinc-900 px-6 text-sm text-white hover:bg-zinc-700"
              >
                Search
              </button>
            </form>
          </div>

          {query ? (
            <p className="mt-8 text-sm text-zinc-600">
              {products.length} result{products.length === 1 ? "" : "s"} for “{query}”
            </p>
          ) : (
            <p className="mt-8 text-sm text-zinc-600">Enter a search term to browse products.</p>
          )}

          {products.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : query ? (
            <p className="mt-10 text-sm text-zinc-600">No products matched your search.</p>
          ) : null}

          <p className="mt-12 text-sm text-zinc-600">
            <Link href="/" className="underline underline-offset-4 hover:text-zinc-900">
              Back to home
            </Link>
          </p>
        </Section>
      </main>
      <RoutedFaqSection />
      <Footer />
    </div>
  );
}
