import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/about/about-hero-section";
import { ClosingCtaSection } from "@/components/about/closing-cta-section";
import { EditorialLifestyleSection } from "@/components/about/editorial-lifestyle-section";
import { FamilyWellnessSection } from "@/components/about/family-wellness-section";
import { StatsSection } from "@/components/about/stats-section";
import { StorySection } from "@/components/about/story-section";
import { TrustQualitySection } from "@/components/about/trust-quality-section";
import { WhyElementsSection } from "@/components/about/why-elements-section";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "About Elements | Premium Wellness Brand",
  description:
    "Learn how Elements curates premium supplements, skincare, and family wellness essentials for intentional modern living.",
};

export default function AboutPage() {
  return (
    <div className="bg-white text-zinc-900">
      <AnnouncementBar />
      <Navbar />
      <main>
        <AboutHeroSection />
        <StorySection />
        <WhyElementsSection />
        <EditorialLifestyleSection />
        <TrustQualitySection />
        <FamilyWellnessSection />
        <StatsSection />
        <ClosingCtaSection />
      </main>
      <Footer />
    </div>
  );
}
