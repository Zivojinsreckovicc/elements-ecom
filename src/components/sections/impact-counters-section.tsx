"use client";

import { useEffect, useRef, useState } from "react";
import { impactStats, type ImpactStat } from "@/data/impact";
import { Section } from "@/components/ui/section";

function formatValue(n: number, format: ImpactStat["format"]): string {
  if (format === "comma") {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
      Math.round(n),
    );
  }
  return String(Math.round(n));
}

function easeOutQuart(t: number): number {
  return 1 - (1 - t) ** 4;
}

function AnimatedStat({ stat }: { stat: ImpactStat }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduceMotion) {
        setValue(stat.target);
        return;
      }
      const duration = stat.target >= 5000 ? 2200 : 1600;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = easeOutQuart(t);
        setValue(stat.target * eased);
        if (t < 1) {
          frame.current = requestAnimationFrame(tick);
        } else {
          setValue(stat.target);
        }
      };
      frame.current = requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      run();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [stat.target]);

  const display = formatValue(value, stat.format);

  return (
    <div
      ref={ref}
      className="text-center transition-opacity duration-500"
    >
      <p className="font-medium tabular-nums tracking-tight text-zinc-900 md:text-5xl text-4xl">
        {display}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm text-zinc-600 md:text-base">{stat.label}</p>
    </div>
  );
}

export function ImpactCountersSection() {
  return (
    <Section className="border-b border-zinc-200/60 py-12 md:py-16">
      <p className="text-center text-xs uppercase tracking-[0.24em] text-zinc-500">
        Our impact so far
      </p>
      <div className="mx-auto mt-10 grid max-w-4xl gap-10 sm:grid-cols-3 md:gap-8">
        {impactStats.map((stat) => (
          <AnimatedStat key={stat.id} stat={stat} />
        ))}
      </div>
    </Section>
  );
}
