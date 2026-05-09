import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { familyWellnessPillars } from "@/data/about";

export function FamilyWellnessSection() {
  return (
    <Section className="bg-zinc-50/70">
      <SectionHeading
        eyebrow="Family Wellness"
        title="Made for individuals, families, and modern homes."
        description="From everyday personal rituals to baby care and kids wellness, Elements supports health across every stage of life."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {familyWellnessPillars.map((pillar) => (
          <article key={pillar.title} className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-7">
            <h3 className="text-xl tracking-tight text-zinc-900">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{pillar.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
