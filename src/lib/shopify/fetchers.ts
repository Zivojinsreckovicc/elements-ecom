import { shopifyFetch } from "@/lib/shopify/client";
import * as queries from "@/lib/shopify/queries";
import {
  toCollectionListItem,
  toProductDetail,
  toProductListItem,
} from "@/lib/shopify/transformers";
import type { CollectionListItem, ProductListItem } from "@/types/shopify";
import type { ShopifyProductDetail } from "@/types/shopify";

const defaultFetch = {
  next: { revalidate: 120, tags: ["shopify"] as string[] },
} as const;

type CollectionsData = {
  collections: {
    edges: Array<{ node: Parameters<typeof toCollectionListItem>[0] }>;
  };
};

type CollectionByHandleData = {
  collection: {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: { url: string; altText: string | null } | null;
    products: {
      edges: Array<{ node: Parameters<typeof toProductListItem>[0] }>;
    };
  } | null;
};

type ProductsData = {
  products: {
    edges: Array<{ node: Parameters<typeof toProductListItem>[0] }>;
  };
};

type ProductByHandleData = {
  product: Parameters<typeof toProductDetail>[0] | null;
};

type RecommendationsData = {
  productRecommendations: Array<Parameters<typeof toProductListItem>[0]>;
};

type SearchData = {
  search: {
    edges: Array<{
      node: Parameters<typeof toProductListItem>[0] | Record<string, unknown>;
    }>;
  };
};

export async function getCollections(first = 50): Promise<CollectionListItem[]> {
  try {
    const data = await shopifyFetch<CollectionsData>({
      query: queries.COLLECTIONS_QUERY,
      variables: { first },
      fetchOptions: defaultFetch,
    });
    return data.collections.edges.map((e) => toCollectionListItem(e.node));
  } catch (e) {
    console.error("[shopify] getCollections", e);
    return [];
  }
}

/** Other collections for cross-links (e.g. PDP / collection explore). */
export async function getOtherCollections(
  excludeHandle: string,
  limit = 3,
): Promise<CollectionListItem[]> {
  const all = await getCollections(100);
  return all.filter((c) => c.handle !== excludeHandle).slice(0, limit);
}

export async function getCollectionByHandle(
  handle: string,
  productFirst = 48,
): Promise<{
  collection: CollectionListItem | null;
  products: ProductListItem[];
} | null> {
  try {
    const data = await shopifyFetch<CollectionByHandleData>({
      query: queries.COLLECTION_BY_HANDLE_QUERY,
      variables: { handle, first: productFirst },
      fetchOptions: defaultFetch,
    });
    if (!data.collection) return null;

    const collection = toCollectionListItem(data.collection);
    const products = data.collection.products.edges.map((e) =>
      toProductListItem(e.node),
    );
    return { collection, products };
  } catch (e) {
    console.error("[shopify] getCollectionByHandle", e);
    return null;
  }
}

export async function getProducts(first = 24): Promise<ProductListItem[]> {
  try {
    const data = await shopifyFetch<ProductsData>({
      query: queries.PRODUCTS_QUERY,
      variables: { first },
      fetchOptions: defaultFetch,
    });
    return data.products.edges.map((e) => toProductListItem(e.node));
  } catch (e) {
    console.error("[shopify] getProducts", e);
    return [];
  }
}

export async function getProductByHandle(
  handle: string,
): Promise<ShopifyProductDetail | null> {
  try {
    const data = await shopifyFetch<ProductByHandleData>({
      query: queries.PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
      fetchOptions: defaultFetch,
    });
    if (!data.product) return null;
    return toProductDetail(data.product);
  } catch (e) {
    console.error("[shopify] getProductByHandle", e);
    return null;
  }
}

export async function getProductsByCollection(
  handle: string,
  first = 48,
): Promise<ProductListItem[]> {
  const res = await getCollectionByHandle(handle, first);
  return res?.products ?? [];
}

export async function getRelatedProducts(
  productId: string,
): Promise<ProductListItem[]> {
  try {
    const data = await shopifyFetch<RecommendationsData>({
      query: queries.PRODUCT_RECOMMENDATIONS_QUERY,
      variables: { productId },
      fetchOptions: defaultFetch,
    });
    const recs = data.productRecommendations ?? [];
    return recs.map((p) => toProductListItem(p));
  } catch (e) {
    console.error("[shopify] getRelatedProducts", e);
    return [];
  }
}

export async function searchProducts(
  queryText: string,
  first = 24,
): Promise<ProductListItem[]> {
  const q = queryText.trim();
  if (!q) return [];

  try {
    const data = await shopifyFetch<SearchData>({
      query: queries.SEARCH_PRODUCTS_QUERY,
      variables: { query: q, first },
      fetchOptions: { next: { revalidate: 30, tags: ["shopify-search"] } },
    });

    const items: ProductListItem[] = [];
    for (const edge of data.search.edges) {
      const node = edge.node;
      if (node && "handle" in node && "title" in node && "id" in node) {
        items.push(toProductListItem(node as Parameters<typeof toProductListItem>[0]));
      }
    }
    return items;
  } catch (e) {
    console.error("[shopify] searchProducts", e);
    return [];
  }
}
