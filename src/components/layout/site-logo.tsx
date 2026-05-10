import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  variant?: "nav" | "footer";
  priority?: boolean;
  className?: string;
};

const imageClass: Record<NonNullable<SiteLogoProps["variant"]>, string> = {
  nav: "h-7 w-auto md:h-8",
  footer: "h-9 w-auto md:h-10",
};

export function SiteLogo({ variant = "nav", priority = false, className = "" }: SiteLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Elements home"
      className={`inline-flex shrink-0 items-center ${className}`.trim()}
    >
      <Image
        src="/logo.png"
        alt=""
        width={220}
        height={72}
        sizes="(max-width: 768px) 140px, 180px"
        className={`object-contain object-left ${imageClass[variant]}`}
        priority={priority}
      />
    </Link>
  );
}
