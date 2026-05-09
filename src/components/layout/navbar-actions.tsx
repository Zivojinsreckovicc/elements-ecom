"use client";

import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 stroke-current"
      fill="none"
      strokeWidth="1.6"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 stroke-current"
      fill="none"
      strokeWidth="1.6"
    >
      <path d="M3 5h2l2.2 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H7" />
      <circle cx="10" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </svg>
  );
}

export function NavbarActions() {
  const { openCart, itemCount } = useCart();

  return (
    <div className="flex items-center gap-2 text-zinc-700">
      <Link
        href="/search"
        aria-label="Search"
        className="rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
      >
        <SearchIcon />
      </Link>
      <button
        type="button"
        aria-label="Cart"
        onClick={openCart}
        className="relative rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
      >
        <CartIcon />
        {itemCount > 0 ? (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] text-white">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        ) : null}
      </button>
    </div>
  );
}
