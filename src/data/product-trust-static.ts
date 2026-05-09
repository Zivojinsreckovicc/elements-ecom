/** Static trust / social proof for PDP (not from Shopify). Edit copy here. */
export const productTrustStatic = {
  /** Shown as X / 5 */
  rating: 4.9,
  maxRating: 5,
  /** Short line under stars */
  headline: "Highly rated by Elements customers",
  /** Optional second line (set to "" to hide) */
  subline: "Based on thousands of verified orders",
  /** Reassurance under add to cart */
  checkoutReassurance: "Free shipping on orders over $75 · Secure Shopify checkout · Easy returns",
} as const;

export const productTrustStripItems = [
  {
    id: "rating",
    title: "4.9 / 5 average",
    body: "Customers consistently rate our curation and product quality.",
  },
  {
    id: "shipping",
    title: "Fast, careful fulfillment",
    body: "Orders packed with attention and shipped from trusted partners.",
  },
  {
    id: "checkout",
    title: "Secure checkout",
    body: "Your payment is processed safely through Shopify.",
  },
] as const;
