export type HeroContent = {
  eyebrow: string;
  tagline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
};

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  href: string;
  badge?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
};

export type FooterColumn = {
  title: string;
  links: Array<{ label: string; href: string }>;
};
