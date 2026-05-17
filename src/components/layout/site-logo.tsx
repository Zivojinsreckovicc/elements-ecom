import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  variant?: "nav" | "footer" | "hero";
  priority?: boolean;
  className?: string;
};

const imageClass: Record<NonNullable<SiteLogoProps["variant"]>, string> = {
  nav: "h-10 w-auto md:h-12",
  footer: "h-9 w-auto md:h-10",
  hero: "h-14 w-auto sm:h-16 md:h-[4.25rem] lg:h-20",
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
        width={376}
        height={96}
        sizes={
          variant === "hero"
            ? "(max-width: 768px) 260px, 360px"
            : variant === "nav"
              ? "(max-width: 768px) 184px, 240px"
              : "(max-width: 768px) 140px, 180px"
        }
        className={`object-contain object-left ${imageClass[variant]}`}
        priority={priority}
      />
    </Link>
  );
}
