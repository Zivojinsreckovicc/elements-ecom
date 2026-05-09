"use client";

import { usePathname } from "next/navigation";
import { FaqSection } from "@/components/faq/faq-section";
import { getFaqContentForPathname } from "@/data/page-faq";

export function RoutedFaqSection() {
  const pathname = usePathname();
  const content = getFaqContentForPathname(pathname);
  return <FaqSection {...content} />;
}
