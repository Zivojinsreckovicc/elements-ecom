import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { trustIndicators } from "@/data/about";

export function TrustQualitySection() {
  return (
    <Section className="border-t border-zinc-200/70">
      <SectionHeading
        eyebrow="Trust & Quality"
        title="Confidence in every category you bring home."
        description="Our promise is simple: premium wellness essentials curated with care, clarity, and quality-first standards."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {trustIndicators.map((item) => (
          <article key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h3 className="text-xl tracking-tight text-zinc-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
