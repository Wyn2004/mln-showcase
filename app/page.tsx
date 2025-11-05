"use client";

import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import TransitionSection from "@/components/home/TransitionSection";
import IntroductionSection from "@/components/home/IntroductionSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HistoricalSection from "@/components/home/HistoricalSection";
import VideoSection from "@/components/home/VideoSection";
import GallerySection from "@/components/home/GallerySection";
import CallToActionSection from "@/components/home/CallToActionSection";

export default function Home() {
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

      <HeroSection />
      <TransitionSection />
      <IntroductionSection />
      <FeaturesSection />
      <HistoricalSection />
      <VideoSection />
      <GallerySection />
      <CallToActionSection />
    </div>
  );
}