"use client";

import { motion } from "framer-motion";
import { Section } from "../data/data";
// using plain <img> for predictable object-fit behavior inside the card
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface SystemSectionProps {
  title: string;
  sections: Section[];
  color: "red" | "yellow";
  images: string[];
}

export default function SystemSection({ title, sections, color, images }: SystemSectionProps) {
  const isRed = color === "red";
  const bgGradient = isRed
    ? "from-red-100 to-red-50"
    : "from-yellow-100 to-yellow-50";
  const borderColor = isRed ? "border-red-700" : "border-yellow-700";
  const textColor = isRed ? "text-red-900" : "text-yellow-900";
  const accentColor = isRed ? "text-red-600" : "text-yellow-600";
  const bgBox = isRed ? "bg-red-50" : "bg-yellow-50";
  const shadowColor = isRed
    ? "rgba(185, 28, 28, 0.2)"
    : "rgba(161, 98, 7, 0.2)";

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold text-amber-50 mb-4 inline-block px-8 py-4 border-2 border-amber-600/50 bg-[#130E07]/90 backdrop-blur-sm`}
              style={{
                fontFamily: "serif",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
              }}>
              {title}
            </h2>
          </div>

          {/* Images Carousel */}
          <div className="mb-12 flex justify-center">
            {/* Make carousel wider: increase max width and allow larger images on md+ */}
            <Carousel className="w-full max-w-4xl">
              <CarouselContent>
                {images.map((img, idx) => (
                  <CarouselItem key={idx}>
                    <Card
                      className="border-2 border-amber-700/50 bg-transparent p-0 overflow-hidden rounded-2xl"
                      style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)", background: 'transparent' }}
                    >
                      <CardContent className="p-0 bg-transparent" style={{ background: 'transparent' }}>
                        {/* larger image: use consistent aspect ratio so images always cover the card */}
                        <div
                          className="w-full aspect-video md:aspect-[16/9] overflow-hidden"
                          style={{ aspectRatio: '16/9' }}
                        >
                          <img
                            src={img}
                            alt={`${title} illustration ${idx + 1}`}
                            className="w-full h-full object-cover block grayscale hover:grayscale-0 transition-all duration-300"
                            style={{ display: 'block' }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-2 border-amber-600/50 bg-[#130E07]/90 text-amber-100 hover:bg-[#1a1208]/80" />
              <CarouselNext className="border-2 border-amber-600/50 bg-[#130E07]/90 text-amber-100 hover:bg-[#1a1208]/80" />
            </Carousel>
          </div>

          {/* Sections with Accordion */}
          <Accordion type="multiple" className="space-y-6">
            {sections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className={`bg-[#130E07]/90 backdrop-blur-sm border-2 border-amber-600/50 overflow-hidden`}
                style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)" }}
              >
                <AccordionTrigger
                  className={`px-6 md:px-8 py-6 hover:no-underline text-amber-100 hover:text-amber-50 hover:bg-[#1a1208]/50 transition-colors`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-4xl text-amber-300">★</span>
                    <span className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "serif", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                      {section.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 md:px-8 pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 bg-[#1a1208]/60 p-6 border border-amber-700/30 rounded-lg"
                    style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" }}
                  >
                    {section.content.map((paragraph, pIndex) => (
                      <div key={pIndex} className="flex items-start">
                        <span className={`text-amber-300 mr-3 mt-1 font-bold text-xl`}>▸</span>
                        <p className="text-amber-100 leading-relaxed flex-1 text-lg"
                          style={{ fontFamily: "serif", textAlign: "justify" }}>
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

