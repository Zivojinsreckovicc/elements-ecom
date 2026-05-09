import { FooterColumn, HeroContent, Testimonial } from "@/types/homepage";

export const announcementText = "Free shipping on orders over $75";

export const heroContent: HeroContent = {
  eyebrow: "Elements Wellness",
  title: "Elements - Your Wellness Boutique",
  description:
    "Science-backed and nature-rooted supplements that restore balance, boost vitality, and support your health journey every single day.",
  primaryCta: { label: "Shop essentials", href: "/collections" },
  secondaryCta: { label: "Explore philosophy", href: "/about" },
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Elements made wellness feel effortless: clean formulas, thoughtful packaging, and products I actually use every day.",
    author: "Mila T.",
    role: "Creative Director",
  },
  {
    id: "t2",
    quote:
      "From probiotics to recovery support, the quality feels premium and the routine feels intentionally simple.",
    author: "Daniel K.",
    role: "Founder, Studio Nine",
  },
  {
    id: "t3",
    quote:
      "The family care line is beautifully designed and genuinely gentle. It fits seamlessly into our home.",
    author: "Lea R.",
    role: "Parent of Two",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "All collections", href: "/collections" },
      { label: "Search", href: "/search" },
      { label: "Home", href: "/" },
      { label: "Featured", href: "/#featured-products" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Philosophy", href: "/about" },
      { label: "Ingredients", href: "#" },
      { label: "Journal", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];
