"use client";

import HeroSection from "@/components/compare/components/HeroSection";
import IntroSection from "@/components/compare/components/IntroSection";
import SystemSection from "@/components/compare/components/SystemSection";
import ComparisonTable from "@/components/compare/components/ComparisonTable";
import VietnamSection from "@/components/compare/components/VietnamSection";
import ConclusionSection from "@/components/compare/components/ConclusionSection";
import { capitalismSections, socialismSections } from "@/components/compare/data/data";

export default function ComparePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Introduction */}
      <IntroSection />

      {/* Capitalism Section */}
      <SystemSection
        title="CHỦ NGHĨA TƯ BẢN"
        sections={capitalismSections}
        color="red"
        images={[
          "/images/compare/anh1.png",
          "/images/compare/anh2.png",
          "/images/compare/anh3.png"
        ]}
      />

      {/* Socialism Section */}
      <SystemSection
        title="CHỦ NGHĨA XÃ HỘI"
        sections={socialismSections}
        color="yellow"
        images={[
          "/images/lummi/mln6.png",
          "/images/lummi/mln7.png",
          "/images/lummi/mln8.png"
        ]}
      />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Vietnam Model */}
      <VietnamSection />

      {/* Conclusion */}
      <ConclusionSection />
    </div>
  );
}
