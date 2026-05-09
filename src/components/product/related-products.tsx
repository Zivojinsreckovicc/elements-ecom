import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProductListItem } from "@/types/shopify";

type RelatedProductsProps = {
  products: ProductListItem[];
  currentHandle: string;
};

export function RelatedProducts({ products, currentHandle }: RelatedProductsProps) {
  const filtered = products.filter((p) => p.handle !== currentHandle).slice(0, 4);

  if (filtered.length === 0) return null;

  return (
    <section className="border-t border-zinc-200/70 py-16 md:py-20">
      <SectionHeading
        eyebrow="You may also like"
        title="Related essentials."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
