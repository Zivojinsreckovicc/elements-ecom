type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl space-y-4 ${alignment}`}>
      {eyebrow ? <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{eyebrow}</p> : null}
      <h2 className="text-3xl font-medium tracking-tight text-zinc-900 md:text-5xl">{title}</h2>
      {description ? <p className="text-sm leading-7 text-zinc-600 md:text-base">{description}</p> : null}
    </div>
  );
}
