import Link from "next/link";
import { notFound } from "next/navigation";
import { RoutedFaqSection } from "@/components/faq/routed-faq-section";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProductPageMain } from "@/components/product/product-page-main";
import { ProductTrustStrip } from "@/components/product/product-trust-strip";
import { RelatedProducts } from "@/components/product/related-products";
import { Container } from "@/components/ui/container";
import { getProductByHandle, getRelatedProducts } from "@/lib/shopify/fetchers";
import { plainTextExcerpt } from "@/lib/shopify/transformers";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product | Elements" };
  return {
    title: `${product.title} | Elements`,
    description: product.description
      ? plainTextExcerpt(product.description, 160)
      : product.title,
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.id);

  return (
    <div className="bg-white text-zinc-900">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Container>
          <div className="pt-14 md:pt-20">
            <ProductPageMain product={product} />
            <ProductTrustStrip />
            <p className="mt-10 text-sm text-zinc-600">
              <Link href="/collections" className="underline underline-offset-4 hover:text-zinc-900">
                View all collections
              </Link>
            </p>
          </div>
        </Container>
        <Container>
          <RelatedProducts products={related} currentHandle={product.handle} />
        </Container>
      </main>
      <RoutedFaqSection />
      <Footer />
    </div>
  );
}
