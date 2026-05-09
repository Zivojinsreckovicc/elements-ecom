import * as queries from "@/lib/shopify/queries";
import { toShopifyCart } from "@/lib/shopify/transformers";
import type { ShopifyCart } from "@/types/shopify";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

function getEndpoint(): string {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const version = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? "2024-10";
  if (!domain) throw new Error("NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set.");
  return `https://${domain}/api/${version}/graphql.json`;
}

function getHeaders(): HeadersInit {
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) throw new Error("NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set.");
  return {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": token,
  };
}

async function storefrontMutation<TData>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  const res = await fetch(getEndpoint(), {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ query, variables }),
  });

  const json = (await res.json()) as GraphQLResponse<TData>;

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(" "));
  }
  if (!json.data) {
    throw new Error("Empty Shopify response.");
  }
  return json.data;
}

type CartQueryData = {
  cart: Parameters<typeof toShopifyCart>[0] | null;
};

type CartCreateData = {
  cartCreate: {
    cart: Parameters<typeof toShopifyCart>[0] | null;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

type CartLinesData = {
  cartLinesAdd: {
    cart: Parameters<typeof toShopifyCart>[0] | null;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

type CartUpdateData = {
  cartLinesUpdate: {
    cart: Parameters<typeof toShopifyCart>[0] | null;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

type CartRemoveData = {
  cartLinesRemove: {
    cart: Parameters<typeof toShopifyCart>[0] | null;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

export async function fetchCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await storefrontMutation<CartQueryData>(queries.CART_QUERY, {
    cartId,
  });
  if (!data.cart) return null;
  return toShopifyCart(data.cart);
}

export async function createCart(
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<ShopifyCart> {
  const data = await storefrontMutation<CartCreateData>(queries.CART_CREATE_MUTATION, {
    input: { lines },
  });
  const errs = data.cartCreate.userErrors;
  if (errs.length) {
    throw new Error(errs.map((e) => e.message).join(" "));
  }
  if (!data.cartCreate.cart) {
    throw new Error("Cart create returned no cart.");
  }
  return toShopifyCart(data.cartCreate.cart);
}

export async function addCartLines(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<ShopifyCart> {
  const data = await storefrontMutation<CartLinesData>(queries.CART_LINES_ADD_MUTATION, {
    cartId,
    lines,
  });
  const errs = data.cartLinesAdd.userErrors;
  if (errs.length) {
    throw new Error(errs.map((e) => e.message).join(" "));
  }
  if (!data.cartLinesAdd.cart) {
    throw new Error("cartLinesAdd returned no cart.");
  }
  return toShopifyCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<ShopifyCart> {
  const data = await storefrontMutation<CartUpdateData>(
    queries.CART_LINES_UPDATE_MUTATION,
    { cartId, lines },
  );
  const errs = data.cartLinesUpdate.userErrors;
  if (errs.length) {
    throw new Error(errs.map((e) => e.message).join(" "));
  }
  if (!data.cartLinesUpdate.cart) {
    throw new Error("cartLinesUpdate returned no cart.");
  }
  return toShopifyCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[],
): Promise<ShopifyCart> {
  const data = await storefrontMutation<CartRemoveData>(
    queries.CART_LINES_REMOVE_MUTATION,
    { cartId, lineIds },
  );
  const errs = data.cartLinesRemove.userErrors;
  if (errs.length) {
    throw new Error(errs.map((e) => e.message).join(" "));
  }
  if (!data.cartLinesRemove.cart) {
    throw new Error("cartLinesRemove returned no cart.");
  }
  return toShopifyCart(data.cartLinesRemove.cart);
}
