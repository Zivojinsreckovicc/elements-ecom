import { ValueItem } from "@/types/about";

type ValueCardProps = {
  item: ValueItem;
};

export function ValueCard({ item }: ValueCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200/80 bg-white p-6 transition-colors duration-300 hover:border-zinc-300">
      <h3 className="text-xl tracking-tight text-zinc-900">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-600">{item.description}</p>
    </article>
  );
}
