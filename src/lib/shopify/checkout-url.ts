/**
 * Cart.checkoutUrl uses the Shopify store primary domain. If that domain is
 * pointed at this headless app (same host as the storefront), /cart/c/… hits
 * Next.js and returns 404. Point a subdomain at Shopify (Online Store) and set
 * NEXT_PUBLIC_SHOPIFY_ONLINE_STORE_HOST to that hostname — see:
 * https://shopify.dev/docs/storefronts/headless/hydrogen/migrate/redirect-traffic
 */
export function resolveCartCheckoutUrl(checkoutUrl: string): string {
  const raw = checkoutUrl.trim();
  if (!raw) return raw;

  const onlineHost = process.env.NEXT_PUBLIC_SHOPIFY_ONLINE_STORE_HOST?.replace(
    /^https?:\/\//i,
    "",
  ).replace(/\/$/, "");

  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace(
    /^https?:\/\//i,
    "",
  ).replace(/\/$/, "");

  let u: URL;
  try {
    if (/^https?:\/\//i.test(raw)) {
      u = new URL(raw);
    } else if (raw.startsWith("//")) {
      u = new URL(`https:${raw}`);
    } else if (storeDomain) {
      u = new URL(raw.startsWith("/") ? raw : `/${raw}`, `https://${storeDomain}`);
    } else {
      return raw;
    }
  } catch {
    return checkoutUrl;
  }

  if (onlineHost) {
    u.hostname = onlineHost;
    u.protocol = "https:";
    return u.toString();
  }

  return u.toString();
}
