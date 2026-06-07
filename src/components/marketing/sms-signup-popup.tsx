"use client";

import {
  type FormEvent,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

const STORAGE_KEY = "elements_sms_popup";
const SCROLL_TRIGGER_PX = 600;
const DISCOUNT_CODE =
  process.env.NEXT_PUBLIC_SMS_DISCOUNT_CODE?.trim() || "WELCOME10";

type Status = "idle" | "loading" | "success" | "error";

// Normalizes a UAE mobile number to E.164 (+9715XXXXXXXX), or null if invalid.
function normalizeUaePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00971")) digits = digits.slice(5);
  else if (digits.startsWith("971")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  if (!/^5[0-9]{8}$/.test(digits)) return null;
  return `+971${digits}`;
}

export function SmsSignupPopup() {
  const isClient = useIsClient();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const dismissedRef = () =>
    typeof window !== "undefined" && !!localStorage.getItem(STORAGE_KEY);

  const close = useCallback(() => {
    setOpen(false);
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, "dismissed");
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    if (dismissedRef()) return;

    const maybeOpen = () => {
      if (window.scrollY > SCROLL_TRIGGER_PX && !dismissedRef()) {
        setOpen(true);
        window.removeEventListener("scroll", maybeOpen);
      }
    };

    window.addEventListener("scroll", maybeOpen, { passive: true });
    maybeOpen();
    return () => window.removeEventListener("scroll", maybeOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (status === "loading") return;

      const normalized = normalizeUaePhone(phone);
      if (!normalized) {
        setStatus("error");
        setErrorMsg("Please enter a valid UAE mobile number (e.g. 50 123 4567).");
        return;
      }

      setStatus("loading");
      setErrorMsg("");
      try {
        const res = await fetch("/api/sms-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: normalized }),
        });
        const data = (await res.json().catch(() => null)) as
          | { ok?: boolean; error?: string }
          | null;
        if (!res.ok || !data?.ok) {
          setStatus("error");
          setErrorMsg(data?.error || "Something went wrong. Please try again.");
          return;
        }
        setStatus("success");
        try {
          localStorage.setItem(STORAGE_KEY, "subscribed");
        } catch {
          // ignore storage errors
        }
      } catch {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    },
    [phone, status],
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  }, []);

  if (!isClient || !open) return null;

  const dialog = (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Get 10% off"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="sms-popup-backdrop-enter absolute inset-0 bg-zinc-950/40 opacity-0 backdrop-blur-[2px]"
      />
      <div className="sms-popup-panel-enter relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-[#E8E2D6] bg-gradient-to-b from-[#FBFAF6] to-[#F4EFE6] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-12">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-2 text-black/45 transition-colors hover:bg-black/5 hover:text-black/70"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-black/55">
              You&apos;re in
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-black/90 sm:text-4xl">
              Here&apos;s your 10% off
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-black/65 sm:text-base">
              Use this code at checkout. We&apos;ll text you when something good
              lands.
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="mx-auto mt-8 flex w-full max-w-sm items-center justify-between gap-3 rounded-full border border-dashed border-black/25 bg-white/70 px-6 py-4 text-left transition-colors hover:border-black/40"
            >
              <span className="text-xl font-semibold tracking-[0.12em] text-black/90">
                {DISCOUNT_CODE}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
            <button
              type="button"
              onClick={close}
              className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-black/50 transition-colors hover:text-black/80"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-black/55">
              Members get more
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-black/90 sm:text-[2.5rem] sm:leading-[1.1]">
              Get 10% off your first order
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-black/65 sm:text-base">
              Sign up to get texts from us - early drops, restocks, and a little
              calm in your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 max-w-md space-y-3 text-left"
            >
              <div className="flex h-14 w-full items-stretch overflow-hidden rounded-full border border-black/15 bg-white/80 transition-colors focus-within:border-black/50">
                <span className="flex select-none items-center gap-1.5 border-r border-black/10 px-5 text-sm font-medium text-black/70">
                  UAE +971
                </span>
                <input
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="50 123 4567"
                  className="h-full flex-1 bg-transparent px-5 text-sm text-black/90 outline-none placeholder:text-black/40"
                />
              </div>
              {status === "error" ? (
                <p className="px-2 text-xs text-red-600">{errorMsg}</p>
              ) : null}
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-14 w-full rounded-full bg-black/90 text-sm font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Get my 10% off"}
              </button>
            </form>
            <p className="mx-auto mt-5 max-w-md text-[0.6875rem] leading-relaxed text-black/45">
              UAE mobile numbers only. By submitting, you agree to receive
              recurring marketing texts from Elements. Msg &amp; data rates may
              apply. Reply STOP to opt out.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
