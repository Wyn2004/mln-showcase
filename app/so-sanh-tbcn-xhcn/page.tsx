"use client";

import Image from "next/image";
import HeroSection from "@/components/compare/components/HeroSection";
import IntroSection from "@/components/compare/components/IntroSection";
import SystemSection from "@/components/compare/components/SystemSection";
import ComparisonTable from "@/components/compare/components/ComparisonTable";
import VietnamSection from "@/components/compare/components/VietnamSection";
import ConclusionSection from "@/components/compare/components/ConclusionSection";
import { capitalismSections, socialismSections } from "@/components/compare/data/data";

export default function ComparePage() {
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
