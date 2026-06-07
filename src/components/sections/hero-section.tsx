import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { heroContent } from "@/data/homepage";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[min(90vh,900px)] flex-col justify-center overflow-hidden bg-gradient-to-b from-[#FBFAF6] via-[#F6F1E9] to-[#FBFAF6] py-24 md:py-32 lg:py-36">
      {/* Soft, on-brand ambient gradient orbs (gentle drift, no hard edges). */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-[12%] top-1/2 h-[min(80vw,620px)] w-[min(80vw,620px)] -translate-y-1/2">
          <div className="hero-orb hero-orb-left h-full w-full rounded-full bg-[radial-gradient(circle_at_center,#2563EB_0%,#60A5FA_45%,transparent_72%)] blur-[80px]" />
        </div>
        <div className="absolute -right-[12%] top-1/2 h-[min(80vw,620px)] w-[min(80vw,620px)] -translate-y-1/2">
          <div className="hero-orb hero-orb-right h-full w-full rounded-full bg-[radial-gradient(circle_at_center,#06B6D4_0%,#38BDF8_45%,transparent_72%)] blur-[80px]" />
        </div>
      </div>

      <Container className="relative z-10 !px-5 sm:!px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-7 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-black/55">{heroContent.eyebrow}</p>
          <h1 className="text-3xl font-medium leading-[1.12] tracking-tight text-black/90 sm:text-4xl md:text-5xl lg:text-6xl">
            {heroContent.tagline}
          </h1>
          <p className="max-w-xl text-sm leading-[1.7] text-black/70 sm:text-base sm:leading-relaxed">
            {heroContent.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
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
