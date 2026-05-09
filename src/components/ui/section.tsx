import { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
};

export function Section({ children, id, className = "", containerClassName = "" }: SectionProps) {
  return (
    <section id={id} className={`py-14 md:py-20 ${className}`.trim()}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
