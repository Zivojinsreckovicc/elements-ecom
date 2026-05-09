import type {
  CollectionListItem,
  ProductListItem,
  ShopifyCart,
  ShopifyCartLine,
  ShopifyMoney,
  ShopifyProductDetail,
  ShopifyVariant,
} from "@/types/shopify";

export function formatMoney(money: ShopifyMoney): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: 2,
  }).format(Number(money.amount));
}

export function plainTextExcerpt(text: string, max = 120): string {
  const stripped = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  if (stripped.length <= max) return stripped;
  return `${stripped.slice(0, max).trim()}…`;
}

type ProductCardGql = {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyMoney | null;
  } | null;
};

export function toProductListItem(node: ProductCardGql): ProductListItem {
  const min = node.priceRange.minVariantPrice;
  const compareMin = node.compareAtPriceRange?.minVariantPrice;
  const hasCompare =
    compareMin != null && Number(compareMin.amount) > Number(min.amount);

  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    subtitle: plainTextExcerpt(node.description || "", 110),
    priceFormatted: formatMoney(min),
    compareAtFormatted: compareMin ? formatMoney(compareMin) : null,
    imageUrl: node.featuredImage?.url ?? null,
    imageAlt: node.featuredImage?.altText || node.title,
    href: `/products/${node.handle}`,
    badge: hasCompare ? "Sale" : undefined,
    availableForSale: node.availableForSale,
  };
}

type CollectionCardGql = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: { url: string; altText: string | null } | null;
};

export function toCollectionListItem(node: CollectionCardGql): CollectionListItem {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: plainTextExcerpt(node.description || "", 160),
    imageUrl: node.image?.url ?? null,
    imageAlt: node.image?.altText || node.title,
    href: `/collections/${node.handle}`,
  };
}

type ProductByHandleGql = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  options: Array<{ name: string; values: string[] }>;
  featuredImage: { url: string; altText: string | null } | null;
  images: {
    edges: Array<{
      node: { url: string; altText: string | null };
    }>;
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  collections: {
    edges: Array<{ node: { handle: string; title: string } }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        quantityAvailable: number | null;
        selectedOptions: Array<{ name: string; value: string }>;
        price: ShopifyMoney;
        compareAtPrice: ShopifyMoney | null;
        image: { url: string; altText: string | null } | null;
      };
    }>;
  };
};

export function toProductDetail(node: ProductByHandleGql): ShopifyProductDetail {
  const variants: ShopifyVariant[] = node.variants.edges.map((e) => ({
    id: e.node.id,
    title: e.node.title,
    availableForSale: e.node.availableForSale,
    quantityAvailable: e.node.quantityAvailable,
    selectedOptions: e.node.selectedOptions,
    price: e.node.price,
    compareAtPrice: e.node.compareAtPrice,
    image: e.node.image,
  }));

  const images = node.images.edges.map((e) => ({
    url: e.node.url,
    altText: e.node.altText,
  }));

  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    tags: node.tags,
    options: node.options,
    variants,
    images,
    featuredImage: node.featuredImage,
    collections: node.collections.edges.map((e) => e.node),
    priceRange: {
      min: node.priceRange.minVariantPrice,
      max: node.priceRange.maxVariantPrice,
    },
  };
}

type CartGql = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise:
          | {
              id: string;
              title: string;
              image: { url: string; altText: string | null } | null;
              price: ShopifyMoney;
              product: { title: string; handle: string };
            }
          | null;
      };
    }>;
  };
};

export function toShopifyCart(cart: CartGql): ShopifyCart {
  const lines: ShopifyCartLine[] = [];

  for (const edge of cart.lines.edges) {
    const m = edge.node.merchandise;
    if (!m?.id) continue;
    lines.push({
      id: edge.node.id,
      quantity: edge.node.quantity,
      merchandiseId: m.id,
      title: m.product.title,
      productTitle: m.product.title,
      productHandle: m.product.handle,
      variantTitle: m.title,
      image: m.image,
      price: m.price,
    });
  }

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    lines,
    cost: {
      subtotal: cart.cost.subtotalAmount,
      total: cart.cost.totalAmount,
    },
  };
}
