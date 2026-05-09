import { StatCard } from "@/components/about/stat-card";
import { Section } from "@/components/ui/section";
import { aboutStats } from "@/data/about";

export function StatsSection() {
  return (
    <Section className="border-t border-zinc-200/70">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {aboutStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </Section>
  );
}
