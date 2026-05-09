/** Money from Storefront API */
export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
} | null;

/** Grid / card product (homepage, collection, search) */
export type ProductListItem = {
  id: string;
  title: string;
  handle: string;
  subtitle: string;
  priceFormatted: string;
  compareAtFormatted: string | null;
  imageUrl: string | null;
  imageAlt: string;
  href: string;
  badge?: string;
  availableForSale: boolean;
  /** Storefront variant GID for cart (first available / default). */
  defaultVariantId: string | null;
  defaultVariantAvailable: boolean;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: Array<{ name: string; value: string }>;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  image: ShopifyImage;
};

export type ShopifyProductOption = {
  name: string;
  values: string[];
};

/** Full product for PDP */
export type ShopifyProductDetail = {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  description: string;
  tags: string[];
  options: ShopifyProductOption[];
  variants: ShopifyVariant[];
  images: Array<{ url: string; altText: string | null }>;
  featuredImage: ShopifyImage;
  collections: Array<{ handle: string; title: string }>;
  priceRange: {
    min: ShopifyMoney;
    max: ShopifyMoney;
  };
};

export type CollectionListItem = {
  id: string;
  handle: string;
  title: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string;
  href: string;
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandiseId: string;
  title: string;
  productTitle: string;
  productHandle: string;
  variantTitle: string;
  image: ShopifyImage;
  price: ShopifyMoney;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: ShopifyCartLine[];
  cost: {
    subtotal: ShopifyMoney;
    total: ShopifyMoney;
  };
};
