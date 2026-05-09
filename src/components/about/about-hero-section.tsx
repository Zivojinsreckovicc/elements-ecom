import Image from "next/image";
import { Section } from "@/components/ui/section";
import { aboutHero } from "@/data/about";

export function AboutHeroSection() {
  return (
    <Section className="pt-14 md:pt-20" containerClassName="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      <div className="space-y-7">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{aboutHero.eyebrow}</p>
        <h1 className="max-w-2xl text-5xl leading-[1.04] tracking-tight text-zinc-900 md:text-7xl">{aboutHero.title}</h1>
        <p className="max-w-xl text-base leading-8 text-zinc-600 md:text-lg">{aboutHero.description}</p>
      </div>
      <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-100">
        <Image
          src={aboutHero.image}
          alt={aboutHero.imageAlt}
          fill
          priority
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02]"
        />
      </div>
    </Section>
  );
}
