type BadgeProps = {
  label: string;
};

export function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-zinc-300 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-700">
      {label}
    </span>
  );
}
