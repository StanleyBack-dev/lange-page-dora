import { ContactSection } from "@/features/landing/components/ContactSection";
import { DemoSection } from "@/features/landing/components/DemoSection";
import { FaqSection } from "@/features/landing/components/FaqSection";
import { FeatureMarquee } from "@/features/landing/components/FeatureMarquee";
import { FeaturesSection } from "@/features/landing/components/FeaturesSection";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { HowItWorksSection } from "@/features/landing/components/HowItWorksSection";
import { ProblemSection } from "@/features/landing/components/ProblemSection";
import { RoadmapSection } from "@/features/landing/components/RoadmapSection";
import { SiteFooter } from "@/features/landing/components/SiteFooter";
import { SiteHeader } from "@/features/landing/components/SiteHeader";
import { StructuredData } from "@/features/landing/components/StructuredData";
import { TrustSection } from "@/features/landing/components/TrustSection";
import { FloatingActions } from "@/features/landing/components/FloatingActions";

// The landing page: statically rendered (fast, fully indexable). Only the
// header, the demo, the form and the reveal effects hydrate.
export default function HomePage() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main>
        <HeroSection />
        <FeatureMarquee />
        <ProblemSection />
        <FeaturesSection />
        <DemoSection />
        <HowItWorksSection />
        <RoadmapSection />
        <TrustSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
