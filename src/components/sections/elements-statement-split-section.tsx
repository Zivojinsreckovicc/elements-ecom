"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const LINES = ["EL", "EM", "ENTS"] as const;

/** SVG ring circumference for r=54 (viewBox 120×120). */
const RING_CIRC = 2 * Math.PI * 54;

const WELLNESS_IMAGE =
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=85";

export function ElementsStatementSplitSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => {
        setInView(true);
      });
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      id="elements-statement"
      aria-label="Elements brand statement"
      className="border-t border-zinc-200/60"
    >
      <div className="relative grid min-h-[clamp(26rem,62dvh,700px)] grid-cols-1 items-stretch md:grid-cols-2 md:grid-rows-1">
        {/* Size container: font scales with column width (cqw); section height is independent. */}
        <div className="relative z-0 flex w-full flex-col justify-center bg-[#F2F2EB] px-3 py-10 [container-type:size] max-md:min-h-[min(42dvh,400px)] md:h-full md:min-h-0 md:px-5 md:py-8 lg:px-7">
          <div
            className="select-none w-full overflow-hidden leading-[0.78]"
            style={{
              // Width-led sizing (matches previous “big type” on desktop); not tied to shorter section height.
              fontSize: "clamp(2.75rem, min(34cqw, 18vw), 11rem)",
            }}
          >
            {LINES.map((line, index) => (
              <span
                key={line}
                className={`block font-black uppercase tracking-[-0.05em] text-black transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{
                  transitionDelay: inView ? `${index * 110}ms` : "0ms",
                }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-0 min-h-[min(42dvh,400px)] w-full md:min-h-0">
          <Image
            src={WELLNESS_IMAGE}
            alt="Calm wellness moment — restorative care and relaxation"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[center_30%]"
            priority={false}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4">
          <Link
            href="/collections"
            aria-label="Shop all categories"
            className="pointer-events-auto relative flex size-[clamp(8.5rem,22vmin,10.5rem)] items-center justify-center rounded-full bg-white/95 text-zinc-900 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-zinc-900/10 backdrop-blur-sm transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98] motion-reduce:transition-none"
          >
            <svg
              className="pointer-events-none absolute inset-[-4px] size-[calc(100%+8px)] -rotate-90"
              viewBox="0 0 120 120"
              aria-hidden
            >
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-zinc-200"
              />
              <circle
                className="text-zinc-900"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={RING_CIRC}
                strokeDashoffset={inView ? 0 : RING_CIRC}
                style={{
                  transition: reduceMotion
                    ? "none"
                    : "stroke-dashoffset 1.15s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
                }}
              />
            </svg>
            <span className="relative z-[1] flex max-w-[78%] flex-col items-center gap-2.5 text-center">
              <span
                aria-hidden
                className={`block h-px w-11 max-w-full origin-center bg-zinc-900 transition-transform duration-1000 ease-out motion-reduce:scale-x-100 ${
                  inView ? "scale-x-100" : "scale-x-0"
                }`}
              />
              <span className="text-[0.5625rem] font-semibold uppercase leading-snug tracking-[0.22em] text-zinc-900 sm:text-[0.625rem]">
                Shop all
                <br />
                categories
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
