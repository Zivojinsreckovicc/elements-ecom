import type { FaqSectionContent } from "@/types/faq";

const defaultFaq: FaqSectionContent = {
  eyebrow: "FAQ",
  title: "Common questions",
  description: "Quick answers about shopping with Elements.",
  items: [
    {
      question: "Where do you ship?",
      answer:
        "We ship to the regions supported at checkout. Delivery times and carriers are confirmed after your order is placed.",
    },
    {
      question: "How can I get help with an order?",
      answer:
        "Use the contact form on our contact page with your order details. We typically reply within one to two business days.",
    },
    {
      question: "Are your products authentic?",
      answer:
        "Yes. We source through verified suppliers and our Shopify storefront reflects live inventory from our catalog.",
    },
  ],
};

const homeFaq: FaqSectionContent = {
  eyebrow: "FAQ",
  title: "Before you explore",
  description: "A few things guests ask when they first land on Elements.",
  items: [
    {
      question: "What is Elements?",
      answer:
        "Elements is a premium wellness boutique: supplements, skincare, and family care curated with a calm, editorial shopping experience.",
    },
    {
      question: "How do I browse by category?",
      answer:
        "Use the shop navigation collections or the curated categories on this page. Each collection is synced from our live catalog.",
    },
    {
      question: "Do you offer subscriptions?",
      answer:
        "Subscribe options appear on eligible products at checkout when your store has them enabled. Otherwise, order anytime as a one-off purchase.",
    },
    {
      question: "Is checkout secure?",
      answer:
        "Checkout is handled by Shopify with industry-standard encryption. We never store your full card details on this site.",
    },
  ],
};

const aboutFaq: FaqSectionContent = {
  eyebrow: "FAQ",
  title: "About Elements",
  description: "Context for how we think about wellness and retail.",
  items: [
    {
      question: "What does “premium wellness” mean here?",
      answer:
        "We prioritize clarity of information, careful curation, and products aligned with modern routines—not hype or overcrowded shelves.",
    },
    {
      question: "Do you formulate your own products?",
      answer:
        "We partner with trusted brands and suppliers. Product pages list ingredients and claims as provided by each brand and Shopify.",
    },
    {
      question: "Can I visit a physical store?",
      answer:
        "This site reflects our digital boutique. For retail partnerships or press, reach out through the contact page.",
    },
  ],
};

const contactFaq: FaqSectionContent = {
  eyebrow: "FAQ",
  title: "Contact & support",
  description: "What to expect when you message the team.",
  items: [
    {
      question: "How fast will you reply?",
      answer:
        "We aim to respond within one to two business days. Complex order investigations can take a little longer while we coordinate with carriers.",
    },
    {
      question: "What should I include in my message?",
      answer:
        "Order number (if any), email used at checkout, and photos for damage or wrong-item cases help us resolve things in one pass.",
    },
    {
      question: "Can I change my order after it is placed?",
      answer:
        "Contact us immediately. Once fulfillment begins, changes may not be possible and a return process may apply instead.",
    },
  ],
};

const collectionsIndexFaq: FaqSectionContent = {
  eyebrow: "FAQ",
  title: "Browsing collections",
  items: [
    {
      question: "Why is a collection empty?",
      answer:
        "Collections mirror Shopify. If a collection has no products yet, add or publish products to that collection in your admin.",
    },
    {
      question: "Do prices include tax?",
      answer:
        "Taxes and duties follow your Shopify store settings and the customer’s region at checkout.",
    },
    {
      question: "Can I see products from every collection at once?",
      answer:
        "Use search or open individual collections. The catalog is organized so each collection stays focused and fast to scan.",
    },
  ],
};

const collectionDetailFaq: FaqSectionContent = {
  eyebrow: "FAQ",
  title: "Shopping this collection",
  items: [
    {
      question: "Will sold-out items restock?",
      answer:
        "Restocks depend on the brand and our buying calendar. Join the newsletter to hear about drops and restocks first.",
    },
    {
      question: "How do variants work?",
      answer:
        "When a product has sizes, counts, or formulas, choose the variant on the product page before adding to cart.",
    },
    {
      question: "Is there a bundle discount?",
      answer:
        "Promotions follow what is configured in Shopify for your market. Eligible discounts apply automatically at checkout when rules are met.",
    },
  ],
};

const productFaq: FaqSectionContent = {
  eyebrow: "FAQ",
  title: "This product",
  items: [
    {
      question: "How do I read ingredients and allergens?",
      answer:
        "The description and product details on this page come from Shopify. Always read the physical label before use if you have allergies.",
    },
    {
      question: "Can I return an opened supplement?",
      answer:
        "Return eligibility depends on your store’s policy and local regulations. Contact support with your order ID for a clear answer.",
    },
    {
      question: "How should I store this?",
      answer:
        "Follow any storage notes on the label or product description. When in doubt, keep products cool, dry, and out of direct sunlight.",
    },
  ],
};

const searchFaq: FaqSectionContent = {
  eyebrow: "FAQ",
  title: "Search tips",
  items: [
    {
      question: "Why did my search return nothing?",
      answer:
        "Try a shorter keyword, check spelling, or browse collections. Search runs against product titles and catalog fields exposed to the storefront API.",
    },
    {
      question: "Do you search inside long descriptions?",
      answer:
        "Storefront search depends on your Shopify search configuration. Short product-relevant keywords usually perform best.",
    },
    {
      question: "Can I filter by price here?",
      answer:
        "Use collection pages or refine your query. Advanced filters can be added later as the storefront evolves.",
    },
  ],
};

const testFaq: FaqSectionContent = {
  eyebrow: "FAQ",
  title: "Shopify test page",
  items: [
    {
      question: "What is this page for?",
      answer:
        "It is an internal-style view to verify Storefront API connectivity, environment variables, and raw responses during development.",
    },
    {
      question: "Why might products be empty?",
      answer:
        "Check .env.local tokens, API permissions, and network access. GraphQL errors in the panel above explain most failures.",
    },
    {
      question: "Should customers see this route?",
      answer:
        "Normally no—remove or protect it before production if you do not want it indexed or linked in navigation.",
    },
  ],
};

/** Normalize pathname from `usePathname()` (no trailing slash except root). */
function normalizePath(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

export function getFaqContentForPathname(pathname: string): FaqSectionContent {
  const path = normalizePath(pathname);

  if (path === "/") return homeFaq;
  if (path === "/about") return aboutFaq;
  if (path === "/contact") return contactFaq;
  if (path === "/collections") return collectionsIndexFaq;
  if (path.startsWith("/collections/")) return collectionDetailFaq;
  if (path.startsWith("/products/")) return productFaq;
  if (path === "/search") return searchFaq;
  if (path === "/test") return testFaq;

  return defaultFaq;
}
