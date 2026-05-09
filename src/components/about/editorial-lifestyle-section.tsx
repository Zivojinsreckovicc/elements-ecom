import Image from "next/image";
import { Section } from "@/components/ui/section";

export function EditorialLifestyleSection() {
  return (
    <Section className="pt-6 md:pt-8">
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-between rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Lifestyle Editorial</p>
            <h2 className="mt-4 text-3xl tracking-tight text-zinc-900 md:text-5xl">
              Wellness as a calm, modern way of living.
            </h2>
            <p className="mt-6 text-base leading-8 text-zinc-600">
              Elements supports routines that balance performance and recovery, short-term energy and long-term
              longevity, ambition and rest. We believe wellness works best when it becomes a natural part of life.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-zinc-700">
            <p>Balanced routines</p>
            <p>Daily recovery</p>
            <p>Performance support</p>
            <p>Longevity mindset</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-100 sm:mt-12">
            <Image
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80"
              alt="Modern wellness self-care routine"
              fill
              className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
            />
          </div>
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-100">
            <Image
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80"
              alt="Calm premium skincare ritual"
              fill
              className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
