import { FooterColumn, HeroContent, Testimonial } from "@/types/homepage";

export const announcementText = "Free shipping on orders over $75";

export const heroContent: HeroContent = {
  eyebrow: "Your Wellness Boutique",
  tagline: "Everything Your Body And Your Home Need To Thrive",
  description:
    "Science-backed supplements and considered home technology — water, air, frequency and recovery — curated into one calm, intentional place to shop.",
  primaryCta: { label: "Shop supplements", href: "/collections" },
  secondaryCta: { label: "Explore home tech", href: "/collections" },
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
