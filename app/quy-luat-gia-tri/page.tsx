"use client";

import Image from "next/image";
import {HeroSection, IntroSection, FactorsSection, DiagramSection, FormulasSection, PriceValueSection, ExamplesSection, ImpactsSection, ConclusionSection} from "@/components/analytics/components";

export default function LawOfValuePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with image - applied to full page */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/backgroud/bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Dark overlay to darken the background */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Additional vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
      </div>

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
