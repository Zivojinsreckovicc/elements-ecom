import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export function ClosingCtaSection() {
  return (
    <Section className="pb-20 md:pb-28">
      <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8 text-center md:p-14">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Daily Rituals</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl tracking-tight text-zinc-900 md:text-5xl">
          Build your daily wellness routine.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-600">
          Discover premium essentials designed for modern living, from foundational supplements to refined skincare
          and family care.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/collections">Shop essentials</Button>
          <Button href="/collections" variant="secondary">
            Explore collections
          </Button>
        </div>
      </div>
    </Section>
  );
}
