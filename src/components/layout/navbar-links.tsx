"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CollectionListItem } from "@/types/shopify";
import type { PartitionedNavCollections } from "@/lib/navigation/partition-collections";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function DropdownPanel({ items }: { items: CollectionListItem[] }) {
  if (items.length === 0) {
    return (
      <p className="px-4 py-3 text-sm text-zinc-500">No collections yet.</p>
    );
  }
  return (
    <ul className="max-h-[min(70vh,420px)] overflow-y-auto py-2">
      {items.map((c) => (
        <li key={c.id}>
          <Link
            href={c.href}
            className="block px-4 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
          >
            {c.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function DesktopDropdown({
  label,
  items,
  openId,
  setOpenId,
  id,
}: {
  label: string;
  items: CollectionListItem[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
  id: string;
}) {
  const open = openId === id;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpenId(null), 120);
  };

  useEffect(() => () => clearClose(), []);

  return (
    <li
      className="relative"
      onMouseEnter={() => {
        clearClose();
        setOpenId(id);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpenId(open ? null : id)}
        onFocus={() => {
          clearClose();
          setOpenId(id);
        }}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 opacity-50" />
      </button>
      {open ? (
        <div
          className="absolute left-0 top-full z-50 min-w-[240px] pt-2"
          onMouseEnter={clearClose}
          onMouseLeave={scheduleClose}
        >
          <div className="rounded-xl border border-zinc-200/90 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="border-b border-zinc-100 px-4 py-2">
              <Link
                href="/collections"
                className="text-xs uppercase tracking-[0.16em] text-zinc-500 hover:text-zinc-900"
              >
                View all collections
              </Link>
            </div>
            <DropdownPanel items={items} />
          </div>
        </div>
      ) : null}
    </li>
  );
}

function MobileAccordion({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: CollectionListItem[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-zinc-100">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left text-sm text-zinc-900"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded ? (
        <ul className="pb-4 pl-1">
          <li>
            <Link
              href="/collections"
              onClick={onNavigate}
              className="block py-2 text-sm text-zinc-500 hover:text-zinc-900"
            >
              View all collections
            </Link>
          </li>
          {items.map((c) => (
            <li key={c.id}>
              <Link
                href={c.href}
                onClick={onNavigate}
                className="block py-2 text-sm text-zinc-700 hover:text-zinc-900"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

const linkClass =
  "text-sm text-zinc-600 transition-colors duration-300 hover:text-zinc-900";

export function NavbarDesktopNav({ groups }: { groups: PartitionedNavCollections }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="flex items-center gap-8">
      <li>
        <Link href="/" className={linkClass}>
          Home
        </Link>
      </li>
      <DesktopDropdown
        label="Supplements"
        items={groups.supplements}
        openId={openId}
        setOpenId={setOpenId}
        id="supplements"
      />
      <DesktopDropdown
        label="Performance"
        items={groups.performance}
        openId={openId}
        setOpenId={setOpenId}
        id="performance"
      />
      <DesktopDropdown
        label="Family Care"
        items={groups.family}
        openId={openId}
        setOpenId={setOpenId}
        id="family"
      />
      <li>
        <Link href="/about" className={linkClass}>
          About Us
        </Link>
      </li>
      <DesktopDropdown
        label="Catalog"
        items={groups.catalog}
        openId={openId}
        setOpenId={setOpenId}
        id="catalog"
      />
      <li>
        <Link href="/contact" className={linkClass}>
          Contact
        </Link>
      </li>
    </ul>
  );
}

export function NavbarMobileNav({ groups }: { groups: PartitionedNavCollections }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <button
        type="button"
        className="rounded-full p-2 text-zinc-700 md:hidden"
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/25"
            aria-label="Close menu"
            onClick={closeMobile}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,380px)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Menu</p>
              <button
                type="button"
                onClick={closeMobile}
                className="rounded-full p-2 text-sm text-zinc-600 hover:bg-zinc-100"
              >
                Close
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5">
              <Link
                href="/"
                onClick={closeMobile}
                className="block border-b border-zinc-100 py-4 text-sm text-zinc-900"
              >
                Home
              </Link>
              <MobileAccordion
                label="Supplements"
                items={groups.supplements}
                onNavigate={closeMobile}
              />
              <MobileAccordion
                label="Performance"
                items={groups.performance}
                onNavigate={closeMobile}
              />
              <MobileAccordion
                label="Family Care"
                items={groups.family}
                onNavigate={closeMobile}
              />
              <Link
                href="/about"
                onClick={closeMobile}
                className="block border-b border-zinc-100 py-4 text-sm text-zinc-900"
              >
                About Us
              </Link>
              <MobileAccordion
                label="Catalog"
                items={groups.catalog}
                onNavigate={closeMobile}
              />
              <Link
                href="/contact"
                onClick={closeMobile}
                className="block py-4 text-sm text-zinc-900"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
