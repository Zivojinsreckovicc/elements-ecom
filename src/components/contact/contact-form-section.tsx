import { Section } from "@/components/ui/section";

const supportPillars = [
  {
    title: "Product guidance",
    text: "Help choosing supplements, skincare, and family wellness essentials.",
  },
  {
    title: "Order assistance",
    text: "Support for shipping, delivery updates, returns, and order questions.",
  },
  {
    title: "General inquiries",
    text: "Partnerships, press, and brand questions handled by our team.",
  },
];

export function ContactFormSection() {
  return (
    <Section className="border-t border-zinc-200/70" containerClassName="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-7 md:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Reach Out</p>
        <h2 className="mt-4 text-3xl tracking-tight text-zinc-900 md:text-4xl">We are here to help.</h2>
        <p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">
          Typical response time is within 1-2 business days.
        </p>
        <div className="mt-8 space-y-5 border-t border-zinc-200 pt-6">
          {supportPillars.map((item) => (
            <div key={item.title}>
              <p className="text-sm uppercase tracking-[0.16em] text-zinc-500">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-zinc-700">{item.text}</p>
            </div>
          ))}
        </div>
      </aside>

      <form className="rounded-[2rem] border border-zinc-200 bg-white p-7 md:p-10">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-zinc-700">
            <span>First name</span>
            <input
              type="text"
              name="firstName"
              className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
            />
          </label>
          <label className="space-y-2 text-sm text-zinc-700">
            <span>Last name</span>
            <input
              type="text"
              name="lastName"
              className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
            />
          </label>
          <label className="space-y-2 text-sm text-zinc-700 md:col-span-2">
            <span>Email</span>
            <input
              type="email"
              name="email"
              className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
            />
          </label>
          <label className="space-y-2 text-sm text-zinc-700 md:col-span-2">
            <span>Topic</span>
            <select
              name="topic"
              className="h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
              defaultValue=""
            >
              <option value="" disabled>
                Select a topic
              </option>
              <option value="product">Product question</option>
              <option value="order">Order support</option>
              <option value="returns">Returns & shipping</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-zinc-700 md:col-span-2">
            <span>Message</span>
            <textarea
              name="message"
              rows={6}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
              placeholder="How can we help you today?"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-7 text-sm text-white transition-colors hover:bg-zinc-700"
        >
          Send message
        </button>
      </form>
    </Section>
  );
}
