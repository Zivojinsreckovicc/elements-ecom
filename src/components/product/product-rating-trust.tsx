import { productTrustStatic } from "@/data/product-trust-static";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = Math.max(0, Math.min(1, rating - full));
  const empty = 5 - full - (partial > 0 ? 1 : 0);

  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: full }).map((_, i) => (
        <StarIcon key={`f-${i}`} className="h-4 w-4 text-zinc-900" />
      ))}
      {partial > 0 ? (
        <span className="relative h-4 w-4 shrink-0">
          <StarIcon className="absolute inset-0 h-4 w-4 text-zinc-200" />
          <span
            className="absolute inset-0 overflow-hidden text-zinc-900"
            style={{ width: `${partial * 100}%` }}
          >
            <StarIcon className="h-4 w-4" />
          </span>
        </span>
      ) : null}
      {Array.from({ length: empty }).map((_, i) => (
        <StarIcon key={`e-${i}`} className="h-4 w-4 text-zinc-200" />
      ))}
    </span>
  );
}

export function ProductRatingTrust() {
  const { rating, maxRating, headline, subline } = productTrustStatic;

  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50/80 px-5 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <span aria-hidden>
          <StarRow rating={rating} />
        </span>
        <span className="text-sm font-medium tabular-nums text-zinc-900">
          {rating}
          <span className="font-normal text-zinc-500">/{maxRating}</span>
        </span>
      </div>
      <p className="mt-2 text-sm text-zinc-800">{headline}</p>
      {subline ? <p className="mt-1 text-xs text-zinc-500">{subline}</p> : null}
    </div>
  );
}

export function ProductCheckoutReassurance() {
  return (
    <p className="text-center text-xs leading-relaxed text-zinc-500 md:text-left">
      {productTrustStatic.checkoutReassurance}
    </p>
  );
}
