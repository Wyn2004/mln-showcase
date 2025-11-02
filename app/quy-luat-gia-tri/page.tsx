"use client";

import HeroSection from "@/components/analytics/components/HeroSection";
import IntroSection from "@/components/analytics/components/IntroSection";
import FactorsSection from "@/components/analytics/components/FactorsSection";
import DiagramSection from "@/components/analytics/components/DiagramSection";
import FormulasSection from "@/components/analytics/components/FormulasSection";
import PriceValueSection from "@/components/analytics/components/PriceValueSection";
import ExamplesSection from "@/components/analytics/components/ExamplesSection";
import ImpactsSection from "@/components/analytics/components/ImpactsSection";
import ConclusionSection from "@/components/analytics/components/ConclusionSection";

export default function LawOfValuePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Introduction */}
      <IntroSection />

      {/* Four Factors: L, P, D, Q */}
      <FactorsSection />

      {/* Diagram with anh1.png */}
      <DiagramSection />

      {/* Formulas */}
      <FormulasSection />

      {/* Price-Value Relationship with anh2.png */}
      <PriceValueSection />

      {/* Examples */}
      <ExamplesSection />

      {/* Impacts with anh3.png */}
      <ImpactsSection />

      {/* Conclusion */}
      <ConclusionSection />
    </div>
  );
}
