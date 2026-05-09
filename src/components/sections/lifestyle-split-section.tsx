import Image from "next/image";
import { Section } from "@/components/ui/section";

export function LifestyleSplitSection() {
  return (
    <Section id="lifestyle" className="pt-4 md:pt-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="group relative aspect-[5/6] overflow-hidden rounded-[2rem] bg-zinc-100">
          <Image
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80"
            alt="Calm modern wellness lifestyle with movement and balance"
            fill
            className="object-cover transition-transform duration-[1300ms] group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col justify-between rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Rituals for Everyday</p>
            <h3 className="mt-4 text-3xl tracking-tight text-zinc-900 md:text-5xl">
              Better balance. Stronger performance. Thoughtful recovery.
            </h3>
            <p className="mt-6 text-base leading-8 text-zinc-600">
              Build a routine that supports longevity, energy, stress resilience, and daily well-being with essentials
              designed to fit seamlessly into real life.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-zinc-700">
            <p>Performance support</p>
            <p>Stress & sleep care</p>
            <p>Healthy aging focus</p>
            <p>Daily recovery rituals</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
