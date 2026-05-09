import { Section } from "@/components/ui/section";

export function ContactHeroSection() {
  return (
    <Section className="pt-14 md:pt-20">
      <div className="max-w-3xl space-y-6">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Contact</p>
        <h1 className="text-5xl leading-[1.04] tracking-tight text-zinc-900 md:text-7xl">
          Thoughtful support for your wellness routine.
        </h1>
        <p className="max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
          Whether you have questions about products, orders, or building a daily routine, our team is here to help with
          clarity and care.
        </p>
      </div>
    </Section>
  );
}
