import Image from "next/image";
import { Section } from "@/components/ui/section";
import { shopifyStorefrontRequest } from "@/lib/shopify/client";

type ProductsQueryResult = {
  products: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
        featuredImage: { url: string; altText: string | null } | null;
        priceRange: {
          minVariantPrice: { amount: string; currencyCode: string };
        } | null;
      };
    }>;
  } | null;
};

type ProductNode = NonNullable<
  NonNullable<ProductsQueryResult["products"]>["edges"][number]
>["node"];

const PRODUCTS_QUERY = /* GraphQL */ `
  query TestProducts {
    products(first: 5) {
      edges {
        node {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

export const metadata = {
  title: "Shopify Connection Test | Elements",
  description: "Verify Shopify Storefront API connectivity for Elements.",
};

export default async function TestPage() {
  const request = await shopifyStorefrontRequest<ProductsQueryResult>({
    query: PRODUCTS_QUERY,
  });

  const rawBody = request.body;
  const graphQLErrors = rawBody?.errors ?? null;
  const data = rawBody?.data ?? null;
  const edges = data?.products?.edges ?? [];
  const products: ProductNode[] = edges.map((edge) => edge.node);

  console.log("[test] raw Shopify response:", rawBody);
  console.log("[test] GraphQL errors:", graphQLErrors);
  console.log("[test] products array:", products);

  const problemLines: string[] = [];
  if (request.envError) problemLines.push(`Env: ${request.envError}`);
  if (request.networkError) problemLines.push(`Network: ${request.networkError}`);
  if (!request.httpOk) {
    problemLines.push(`HTTP: request failed with status ${request.httpStatus}.`);
  }
  if (request.parseError) problemLines.push(`Parse: ${request.parseError}`);
  if (graphQLErrors?.length) {
    problemLines.push(
      `GraphQL: ${graphQLErrors.map((e) => e.message).join(" | ")}`,
    );
  }
  if (products.length === 0) {
    problemLines.push(
      "Products: Storefront returned no products (empty or missing `products.edges`).",
    );
  }

  const hasProblem = problemLines.length > 0;
  const isOk = !hasProblem;

  return (
    <div className="bg-white text-zinc-900">
      <Section className="pt-16 md:pt-20">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
            Storefront API test
          </p>
          <h1 className="text-3xl font-medium tracking-tight md:text-5xl">
            Shopify Storefront — live response
          </h1>
          <p className="text-sm text-zinc-600">
            HTTP {request.httpStatus} {request.httpOk ? "(ok)" : "(not ok)"}
          </p>
        </div>

        {isOk ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-950">
            Shopify connection successful
          </div>
        ) : (
          <div className="mt-6 space-y-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-950">
            <p className="font-medium">Validation failed (see reasons below).</p>
            <ul className="list-inside list-disc space-y-1">
              {problemLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        {isOk ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
                  {product.featuredImage?.url ? (
                    <Image
                      src={product.featuredImage.url}
                      alt={
                        product.featuredImage.altText ?? product.title
                      }
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-zinc-500">
                      No image
                    </div>
                  )}
                </div>
                <div className="mt-4 space-y-1">
                  <h2 className="text-lg tracking-tight text-zinc-900">
                    {product.title}
                  </h2>
                  <p className="text-sm text-zinc-500">/{product.handle}</p>
                  <p className="text-sm text-zinc-800">
                    {product.priceRange?.minVariantPrice
                      ? formatPrice(
                          product.priceRange.minVariantPrice.amount,
                          product.priceRange.minVariantPrice.currencyCode,
                        )
                      : "—"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        <div className="mt-12">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Raw response body (parsed JSON)
          </p>
          <pre className="mt-3 max-h-[480px] overflow-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-800">
            {rawBody === null
              ? "null (could not parse or no body)"
              : JSON.stringify(rawBody, null, 2)}
          </pre>
        </div>
      </Section>
    </div>
  );
}
