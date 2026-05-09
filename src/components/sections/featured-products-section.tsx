import { ProductCard } from "@/components/product/product-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProducts } from "@/lib/shopify/fetchers";

export async function FeaturedProductsSection() {
  const products = await getProducts(8);

  return (
    <Section id="featured-products" className="bg-zinc-50/70">
      <SectionHeading
        eyebrow="Featured Essentials"
        title="Premium formulas for modern routines."
        description="High-quality supplements and skincare essentials selected for performance, balance, and long-term well-being."
      />
      {products.length === 0 ? (
        <p className="mt-10 text-sm text-zinc-600">
          Products will appear here once they are published in Shopify.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Section>
  );
}
