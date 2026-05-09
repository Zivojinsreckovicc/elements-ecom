import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandStory } from "@/data/about";

export function StorySection() {
  return (
    <Section className="border-t border-zinc-200/70">
      <SectionHeading
        eyebrow="Brand Story"
        title="A refined approach to modern wellness."
        description="Elements is built around intentional choices, premium care, and a clear everyday wellness philosophy."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {brandStory.map((block) => (
          <article key={block.title} className="rounded-3xl border border-zinc-200 bg-white p-7 md:p-8">
            <h3 className="text-2xl tracking-tight text-zinc-900">{block.title}</h3>
            <p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">{block.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
