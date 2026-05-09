import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { heroContent } from "@/data/homepage";

export function HeroSection() {
  return (
    <Section className="pt-14 md:pt-20" containerClassName="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
      <div className="space-y-8">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{heroContent.eyebrow}</p>
        <h1 className="max-w-3xl text-5xl leading-[1.02] tracking-tight text-zinc-900 md:text-7xl">
          {heroContent.title}
        </h1>
        <p className="max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">{heroContent.description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button href={heroContent.primaryCta.href}>{heroContent.primaryCta.label}</Button>
          <Button href={heroContent.secondaryCta.href} variant="secondary">
            {heroContent.secondaryCta.label}
          </Button>
        </div>
      </div>
      <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-100">
        <Image
          src={heroContent.image}
          alt={heroContent.imageAlt}
          fill
          priority
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
        />
      </div>
    </Section>
  );
}
