const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION =
  process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? "2024-10";

export type ShopifyFetchVariables = Record<string, unknown>;

type ShopifyGraphQLError = {
  message: string;
};

export type ShopifyFetchResult<TData> = {
  data?: TData;
  errors?: ShopifyGraphQLError[];
};

export type ShopifyStorefrontRequestResult<TData> = {
  envError: string | null;
  networkError: string | null;
  httpStatus: number;
  httpOk: boolean;
  parseError: string | null;
  body: ShopifyFetchResult<TData> | null;
};

/** Next.js `fetch` cache / revalidation (App Router). */
export type ShopifyFetchOptions = {
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
};

export class ShopifyClientError extends Error {
  code:
    | "MISSING_ENV"
    | "HTTP_ERROR"
    | "GRAPHQL_ERROR"
    | "NETWORK_ERROR"
    | "PARSE_ERROR";
  status?: number;

  constructor(
    message: string,
    code: ShopifyClientError["code"],
    status?: number,
  ) {
    super(message);
    this.name = "ShopifyClientError";
    this.code = code;
    this.status = status;
  }
}

function getShopifyEndpoint() {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN || !SHOPIFY_API_VERSION) {
    throw new ShopifyClientError(
      "Missing one or more Shopify environment variables.",
      "MISSING_ENV",
    );
  }

  return `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
}

/**
 * Low-level Storefront GraphQL request. Does not throw on GraphQL errors or empty data;
 * inspect `body.errors`, `body.data`, and `httpOk` for the real outcome.
 */
export async function shopifyStorefrontRequest<TData>({
  query,
  variables,
  fetchOptions,
}: {
  query: string;
  variables?: ShopifyFetchVariables;
  fetchOptions?: ShopifyFetchOptions;
}): Promise<ShopifyStorefrontRequestResult<TData>> {
  const empty = (): ShopifyStorefrontRequestResult<TData> => ({
    envError: null,
    networkError: null,
    httpStatus: 0,
    httpOk: false,
    parseError: null,
    body: null,
  });

  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN || !SHOPIFY_API_VERSION) {
    return {
      ...empty(),
      envError: "Missing one or more Shopify environment variables.",
    };
  }

  const endpoint = getShopifyEndpoint();
  const domain = SHOPIFY_DOMAIN;
  const token = SHOPIFY_TOKEN;
  const apiVersion = SHOPIFY_API_VERSION;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: fetchOptions?.cache,
      next: fetchOptions?.next,
    });
  } catch {
    return {
      ...empty(),
      networkError: "Network request to Shopify failed.",
    };
  }

  const httpStatus = response.status;
  const httpOk = response.ok;

  let body: ShopifyFetchResult<TData> | null = null;
  let parseError: string | null = null;
  try {
    body = (await response.json()) as ShopifyFetchResult<TData>;
  } catch {
    parseError = "Failed to parse Shopify API response as JSON.";
  }

  if (process.env.NODE_ENV === "development") {
    console.log("DOMAIN:", domain);
    console.log("TOKEN:", token);
    console.log("API VERSION:", apiVersion);
    console.log("SHOPIFY RESPONSE:", body);
  }

  return {
    envError: null,
    networkError: null,
    httpStatus,
    httpOk,
    parseError,
    body,
  };
}

export async function shopifyFetch<TData>({
  query,
  variables,
  fetchOptions,
}: {
  query: string;
  variables?: ShopifyFetchVariables;
  fetchOptions?: ShopifyFetchOptions;
}): Promise<TData> {
  const result = await shopifyStorefrontRequest<TData>({
    query,
    variables,
    fetchOptions,
  });

  if (result.envError) {
    throw new ShopifyClientError(result.envError, "MISSING_ENV");
  }
  if (result.networkError) {
    throw new ShopifyClientError(result.networkError, "NETWORK_ERROR");
  }
  if (!result.httpOk) {
    throw new ShopifyClientError(
      `Shopify API request failed with status ${result.httpStatus}.`,
      "HTTP_ERROR",
      result.httpStatus,
    );
  }
  if (result.parseError) {
    throw new ShopifyClientError(result.parseError, "PARSE_ERROR");
  }
  if (!result.body) {
    throw new ShopifyClientError(
      "Shopify API returned an empty body.",
      "PARSE_ERROR",
    );
  }

  if (result.body.errors?.length) {
    throw new ShopifyClientError(
      result.body.errors.map((error) => error.message).join(" "),
      "GRAPHQL_ERROR",
    );
  }

  if (!result.body.data) {
    throw new ShopifyClientError(
      "Shopify API returned no data.",
      "PARSE_ERROR",
    );
  }

  return result.body.data;
}
