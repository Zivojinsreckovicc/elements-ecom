import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm tracking-wide transition-all duration-300";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-700",
  secondary: "border border-zinc-300 text-zinc-800 hover:border-zinc-900 hover:text-zinc-900",
};

export function Button({ href, children, variant = "primary" }: ButtonProps) {
  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </Link>
  );
}
