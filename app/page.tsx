"use client";

import HeroSection from "@/components/home/HeroSection";
import TransitionSection from "@/components/home/TransitionSection";
import IntroductionSection from "@/components/home/IntroductionSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HistoricalSection from "@/components/home/HistoricalSection";
import GallerySection from "@/components/home/GallerySection";
import CallToActionSection from "@/components/home/CallToActionSection";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <HeroSection />
      <TransitionSection />
      <IntroductionSection />
      <FeaturesSection />
      <HistoricalSection />
      <GallerySection />
      <CallToActionSection />
    </div>
  );
}