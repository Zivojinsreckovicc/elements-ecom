import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { getCollectionByHandle } from "@/lib/shopify/fetchers";
import type { ProductListItem } from "@/types/shopify";

const LIFESTYLE_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80";

/** Tried in order until a collection returns products (override via env for your store handle). */
function womensHealthCollectionHandles(): string[] {
  const fromEnv = process.env.NEXT_PUBLIC_WOMENS_HEALTH_COLLECTION_HANDLE?.trim();
  const candidates = [
    ...(fromEnv ? [fromEnv] : []),
    "womens-health",
    "women-s-health",
    "womens-health-collection",
    "women-health",
  ];
  return [...new Set(candidates)];
}

async function pickProductFromWomensHealth(): Promise<ProductListItem | null> {
  for (const handle of womensHealthCollectionHandles()) {
    const data = await getCollectionByHandle(handle, 24);
    if (!data?.products.length) continue;
    const withImage = data.products.find((p) => p.imageUrl);
    return withImage ?? data.products[0] ?? null;
  }
  return null;
}

export async function LifestyleSplitSection() {
  const product = await pickProductFromWomensHealth();
  const imageUrl = product?.imageUrl ?? LIFESTYLE_FALLBACK_IMAGE;
  const imageAlt = product?.imageUrl
    ? product.imageAlt || product.title
    : "Calm modern wellness lifestyle with movement and balance";

  const imageBlock = (
    <Image
      src={imageUrl}
      alt={imageAlt}
      fill
      sizes="(max-width: 1024px) 100vw, 55vw"
      className="object-cover transition-transform duration-[1300ms] group-hover:scale-[1.03]"
    />
  );

  return (
    <Section id="lifestyle" className="pt-4 md:pt-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="group relative aspect-[5/6] overflow-hidden rounded-[2rem] bg-zinc-100">
          {product?.href && product.imageUrl ? (
            <Link
              href={product.href}
              className="absolute inset-0 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
              aria-label={`View ${product.title}`}
            >
              {imageBlock}
            </Link>
          ) : (
            imageBlock
          )}
        </div>
        <div className="flex flex-col justify-between rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Rituals for Everyday</p>
            <h3 className="mt-4 text-3xl tracking-tight text-zinc-900 md:text-5xl">
              Better balance. Stronger performance. Thoughtful recovery.
            </h3>
            <p className="mt-6 text-base leading-8 text-zinc-600">
              Build a routine that supports longevity, energy, stress resilience, and daily well-being with essentials
              designed to fit seamlessly into real life.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-zinc-700">
            <p>Performance support</p>
            <p>Stress & sleep care</p>
            <p>Healthy aging focus</p>
            <p>Daily recovery rituals</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
