import { Section } from "@/components/ui/section";

export function BrandPhilosophySection() {
  return (
    <Section id="philosophy" className="border-t border-zinc-200/60">
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Brand Philosophy</p>
        <div className="space-y-6">
          <h2 className="text-3xl tracking-tight text-zinc-900 md:text-5xl">
            Wellness built on intentional living, premium ingredients, and modern simplicity.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-zinc-600">
            At Elements, every formula and ritual is designed to support how people live today: focused mornings,
            balanced days, restorative nights, and healthier years ahead. We believe wellness should feel refined,
            effortless, and deeply human.
          </p>
        </div>
      </div>
    </Section>
  );
}
