import { ValueCard } from "@/components/about/value-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyElements } from "@/data/about";

export function WhyElementsSection() {
  return (
    <Section className="bg-zinc-50/70">
      <SectionHeading
        eyebrow="Why Elements"
        title="Designed to earn trust with every product."
        description="A focused wellness curation model built for quality, consistency, and long-term daily value."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyElements.map((item) => (
          <ValueCard key={item.title} item={item} />
        ))}
      </div>
    </Section>
  );
}
