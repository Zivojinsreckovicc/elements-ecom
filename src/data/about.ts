import {
  AboutHero,
  FamilyPillar,
  StatItem,
  StoryBlock,
  TrustIndicator,
  ValueItem,
} from "@/types/about";

export const aboutHero: AboutHero = {
  eyebrow: "About Elements",
  title: "Modern wellness, thoughtfully curated.",
  description:
    "Elements brings premium supplements, skincare, and family wellness essentials into one refined destination designed for intentional daily living.",
  image:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80",
  imageAlt: "Minimal premium skincare and wellness products in soft daylight",
};

export const brandStory: StoryBlock[] = [
  {
    title: "Intentional by design",
    description:
      "Elements was created for people who want wellness to feel calm, considered, and easy to sustain. We curate essentials that support modern routines without noise or complexity.",
  },
  {
    title: "Rooted in everyday relevance",
    description:
      "From gut health and immunity to stress support, healthy aging, skincare, and family care, every category is selected to serve real daily needs with clarity and confidence.",
  },
];

export const whyElements: ValueItem[] = [
  {
    title: "Premium ingredients",
    description: "Formulas and products selected for quality, consistency, and thoughtful composition.",
  },
  {
    title: "Intentional assortment",
    description: "A focused catalog built around what people genuinely use in modern wellness routines.",
  },
  {
    title: "Daily ritual approach",
    description: "Products designed to integrate naturally into mornings, workdays, evenings, and recovery.",
  },
  {
    title: "Refined simplicity",
    description: "Clear choices and elegant presentation that remove friction from health-conscious shopping.",
  },
  {
    title: "Quality standards",
    description: "Careful sourcing and category curation centered on trust, safety, and long-term value.",
  },
  {
    title: "Modern wellness lens",
    description: "Balanced support for performance, longevity, stress resilience, and lifestyle well-being.",
  },
];

export const trustIndicators: TrustIndicator[] = [
  {
    title: "Premium formulations",
    description: "Focused products and supplements selected for quality-first daily use.",
  },
  {
    title: "Carefully selected range",
    description: "Supplements, skincare, creams, and wellness essentials chosen with intention.",
  },
  {
    title: "Quality-focused sourcing",
    description: "Thoughtful product standards designed for consistency and confidence.",
  },
  {
    title: "Modern wellness standards",
    description: "A curation model aligned with how people care for health today.",
  },
];

export const familyWellnessPillars: FamilyPillar[] = [
  {
    title: "For individuals",
    description: "Performance, recovery, and daily support essentials for personal routines.",
  },
  {
    title: "For families",
    description: "Baby care and kids wellness options integrated into a premium wellness experience.",
  },
  {
    title: "For modern lifestyles",
    description: "Flexible care across work, travel, parenting, and long-term well-being goals.",
  },
];

export const aboutStats: StatItem[] = [
  { label: "Products Curated", value: "120+", note: "Across supplements, skincare, and family care" },
  { label: "Wellness Categories", value: "9", note: "From gut health to healthy aging" },
  { label: "Returning Customers", value: "68%", note: "Driven by trust and routine fit" },
  { label: "Daily Essentials", value: "40+", note: "Built for morning-to-evening rituals" },
];
