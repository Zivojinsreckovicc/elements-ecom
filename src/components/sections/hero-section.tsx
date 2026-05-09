import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { heroContent } from "@/data/homepage";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[min(94vh,980px)] flex-col justify-center bg-[url('/hero-section.png')] bg-cover bg-center bg-no-repeat py-20 md:py-28 lg:py-32">
      <Container className="!px-4 sm:!px-5 md:!px-8 lg:!px-10">
        <div className="max-w-3xl space-y-8 text-left">
          <p className="text-xs uppercase tracking-[0.24em] text-black/55">{heroContent.eyebrow}</p>
          <h1 className="text-5xl font-medium leading-[1.02] tracking-tight text-black md:text-6xl lg:text-7xl">
            {heroContent.title}
          </h1>
          <p className="max-w-lg text-[0.8125rem] leading-[1.65] text-black/72 sm:text-sm sm:leading-relaxed">
            {heroContent.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href={heroContent.primaryCta.href}>{heroContent.primaryCta.label}</Button>
            <Button href={heroContent.secondaryCta.href} variant="secondary">
              {heroContent.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
