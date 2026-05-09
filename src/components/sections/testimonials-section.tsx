import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/data/homepage";

export function TestimonialsSection() {
  return (
    <Section className="border-t border-zinc-200/60">
      <SectionHeading
        eyebrow="Community"
        title="Trusted by people who value intentional wellness."
        align="center"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.id} className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-base leading-7 text-zinc-700">“{item.quote}”</p>
            <div className="mt-6 border-t border-zinc-200 pt-4">
              <p className="text-sm text-zinc-900">{item.author}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
