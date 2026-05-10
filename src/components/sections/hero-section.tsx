import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { heroContent } from "@/data/homepage";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[min(94vh,980px)] flex-col justify-center overflow-hidden py-20 max-md:bg-gradient-to-br max-md:from-[#FAF9F5] max-md:via-[#F4EFE6] max-md:to-[#E8E2D6] md:bg-[url('/hero-section.png')] md:bg-cover md:bg-center md:bg-no-repeat md:py-28 lg:py-32"
    >
      {/* Mobile-only: minimal cream backdrop shapes (hidden on md+ where photo is used). */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        aria-hidden
      >
        <div className="absolute -right-24 -top-20 h-[min(55vw,240px)] w-[min(55vw,240px)] rounded-full bg-[#DDD5C5]/35 blur-[48px]" />
        <div className="absolute -bottom-28 -left-20 h-[min(70vw,280px)] w-[min(70vw,280px)] rounded-full bg-[#D4CBB8]/25 blur-[56px]" />
        <div className="absolute left-[8%] top-[42%] h-24 w-24 rounded-full border border-[#C4B8A4]/18 bg-[#F2EDE4]/40" />
        <div className="absolute right-[12%] bottom-[38%] h-16 w-32 rotate-[-18deg] rounded-full border border-[#BFB5A3]/12 bg-transparent" />
      </div>

      <Container className="relative z-10 !px-4 sm:!px-5 md:!px-8 lg:!px-10">
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
