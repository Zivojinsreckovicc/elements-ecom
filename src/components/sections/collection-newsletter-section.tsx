import { Section } from "@/components/ui/section";

/**
 * Newsletter block tuned for collection pages — stronger benefit + urgency without feeling cheap.
 */
export function CollectionNewsletterSection() {
  return (
    <Section className="border-t border-zinc-200/60 pb-20 md:pb-28">
      <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 text-center shadow-[0_2px_40px_rgba(0,0,0,0.04)] md:p-14">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Insider access</p>
        <h2 className="mt-4 text-3xl tracking-tight text-zinc-900 md:text-5xl">
          Be first in line for restocks & new drops.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-zinc-600">
          One short email each week: new arrivals, quiet sales, and editorial picks for your wellness
          routine. Join thousands of readers — unsubscribe anytime, no clutter.
        </p>
        <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Your email address"
            className="h-12 flex-1 rounded-full border border-zinc-300 bg-zinc-50 px-5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Get the list
          </button>
        </form>
        <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-zinc-500">
          We respect your inbox. No third-party promos — only Elements wellness edits.
        </p>
      </div>
    </Section>
  );
}
