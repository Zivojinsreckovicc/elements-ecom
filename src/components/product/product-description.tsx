"use client";

import { useLayoutEffect, useRef, useState } from "react";

const COLLAPSED_MAX_PX = 300;

type ProductDescriptionProps = {
  html: string;
};

export function ProductDescription({ html }: ProductDescriptionProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [isLong, setIsLong] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    setIsLong(el.scrollHeight > COLLAPSED_MAX_PX + 24);
  }, [html]);

  return (
    <div className="border-t border-zinc-200/70 pt-8">
      <p className="mb-5 text-xs uppercase tracking-[0.2em] text-zinc-500">Details</p>
      <div className="relative">
        <div
          ref={innerRef}
          className={`product-description ${!expanded && isLong ? "product-description--clamped" : ""}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {!expanded && isLong ? (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/90 to-transparent"
            aria-hidden
          />
        ) : null}
      </div>
      {isLong ? (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-5 text-sm text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 hover:decoration-zinc-900"
        >
          {expanded ? "Show less" : "Read full description"}
        </button>
      ) : null}
    </div>
  );
}
