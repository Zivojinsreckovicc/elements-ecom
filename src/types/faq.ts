export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSectionContent = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FaqItem[];
};
