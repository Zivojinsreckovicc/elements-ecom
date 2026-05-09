import type { Metadata } from "next";
import { ContactFormSection } from "@/components/contact/contact-form-section";
import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { RoutedFaqSection } from "@/components/faq/routed-faq-section";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { NewsletterSection } from "@/components/sections/newsletter-section";

export const metadata: Metadata = {
  title: "Contact Elements | Premium Wellness Support",
  description:
    "Get in touch with Elements for product guidance, order support, and wellness inquiries.",
};

export default function ContactPage() {
  return (
    <div className="bg-white text-zinc-900">
      <AnnouncementBar />
      <Navbar />
      <main>
        <ContactHeroSection />
        <ContactFormSection />
        <NewsletterSection />
      </main>
      <RoutedFaqSection />
      <Footer />
    </div>
  );
}
