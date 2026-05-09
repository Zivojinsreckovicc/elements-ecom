import { productTrustStatic, productTrustStripItems } from "@/data/product-trust-static";

function MiniStars() {
  const r = productTrustStatic.rating;
  const full = Math.floor(r);
  const partial = Math.max(0, Math.min(1, r - full));
  return (
    <span className="mb-3 flex gap-0.5" aria-hidden>
      {Array.from({ length: full }).map((_, i) => (
        <svg
          key={i}
          className="h-3 w-3 text-zinc-900"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
        </svg>
      ))}
      {partial > 0 ? (
        <span className="relative h-3 w-3 shrink-0">
          <svg className="absolute inset-0 h-3 w-3 text-zinc-200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
          </svg>
          <span
            className="absolute inset-0 overflow-hidden text-zinc-900"
            style={{ width: `${partial * 100}%` }}
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
            </svg>
          </span>
        </span>
      ) : null}
      {Array.from({ length: 5 - full - (partial > 0 ? 1 : 0) }).map((_, i) => (
        <svg
          key={`e-${i}`}
          className="h-3 w-3 text-zinc-200"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
        </svg>
      ))}
    </span>
  );
}

export function ProductTrustStrip() {
  return (
    <div className="mt-16 border-t border-zinc-200/80 pt-10">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Why shoppers choose Elements</p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-3">
        {productTrustStripItems.map((item) => (
          <li key={item.id} className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 px-5 py-5">
            {item.id === "rating" ? <MiniStars /> : null}
            <p className="text-sm font-medium text-zinc-900">{item.title}</p>
            <p className="mt-2 text-sm leading-7 text-zinc-600">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
