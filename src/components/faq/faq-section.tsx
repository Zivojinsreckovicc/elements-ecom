import { Section } from "@/components/ui/section";
import type { FaqSectionContent } from "@/types/faq";

type FaqSectionProps = FaqSectionContent & {
  id?: string;
  className?: string;
};

export function FaqSection({
  id = "faq",
  className = "",
  eyebrow = "FAQ",
  title,
  description,
  items,
}: FaqSectionProps) {
  return (
    <Section id={id} className={`border-t border-zinc-200/70 ${className}`.trim()}>
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{eyebrow}</p>
        <h2 className="mt-4 text-3xl tracking-tight text-zinc-900 md:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-4 text-base leading-8 text-zinc-600">{description}</p>
        ) : null}
      </div>

      <div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200">
        {items.map((item) => (
          <details key={item.question} className="group py-5 md:py-6">
            <summary className="cursor-pointer list-none pr-8 text-left text-base font-medium tracking-tight text-zinc-900 outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                <span>{item.question}</span>
                <span
                  className="mt-0.5 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 md:text-base md:leading-8">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
