import { StatItem } from "@/types/about";

type StatCardProps = {
  stat: StatItem;
};

export function StatCard({ stat }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 text-center md:text-left">
      <p className="text-3xl tracking-tight text-zinc-900 md:text-4xl">{stat.value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-500">{stat.label}</p>
      <p className="mt-4 text-sm leading-7 text-zinc-600">{stat.note}</p>
    </article>
  );
}
