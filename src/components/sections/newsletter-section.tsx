import { Section } from "@/components/ui/section";

export function NewsletterSection() {
  return (
    <Section className="pb-20 md:pb-28">
      <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8 text-center md:p-14">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Newsletter</p>
        <h2 className="mt-4 text-3xl tracking-tight text-zinc-900 md:text-5xl">A refined weekly wellness edit.</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-zinc-600">
          Product drops, thoughtful guidance, and editorial insights on modern health and intentional daily rituals.
        </p>
        <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Your email"
            className="h-12 flex-1 rounded-full border border-zinc-300 bg-white px-5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
          />
          <button
            type="submit"
            className="h-12 rounded-full bg-zinc-900 px-6 text-sm text-white transition-colors hover:bg-zinc-700"
          >
            Subscribe
          </button>
        </form>
      </div>
    </Section>
  );
}
