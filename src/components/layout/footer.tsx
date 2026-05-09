import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footerColumns } from "@/data/homepage";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="max-w-sm space-y-3">
            <p className="text-lg tracking-[0.16em] text-zinc-900">ELEMENTS</p>
            <p className="text-sm leading-7 text-zinc-600">
              Premium wellness essentials for modern routines, intentional living, and long-term vitality.
            </p>
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-500">{column.title}</p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-zinc-700 transition-colors hover:text-zinc-900">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
}
