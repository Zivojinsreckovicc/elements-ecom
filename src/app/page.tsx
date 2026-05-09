import { ContactFormSection } from "@/components/contact/contact-form-section";
import { RoutedFaqSection } from "@/components/faq/routed-faq-section";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BrandPhilosophySection } from "@/components/sections/brand-philosophy-section";
import { ElementsStatementSplitSection } from "@/components/sections/elements-statement-split-section";
import { FeaturedCategoriesSection } from "@/components/sections/featured-categories-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactCountersSection } from "@/components/sections/impact-counters-section";
import { LifestyleSplitSection } from "@/components/sections/lifestyle-split-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <div className="bg-white text-zinc-900">
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <ImpactCountersSection />
        <FeaturedCategoriesSection />
        <ElementsStatementSplitSection />
        <FeaturedProductsSection />
        <BrandPhilosophySection />
        <LifestyleSplitSection />
        <TestimonialsSection />
      </main>
      <RoutedFaqSection />
      <ContactFormSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
