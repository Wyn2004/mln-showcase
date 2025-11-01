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
    <section className={`py-16 bg-gradient-to-b ${bgGradient}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-4 inline-block px-8 py-4 border-4 ${borderColor} bg-white`}
              style={{
                fontFamily: "serif",
                boxShadow: `8px 8px 0px ${shadowColor}`
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
                      className={`border-8 ${borderColor} bg-transparent p-0 overflow-hidden rounded-2xl`}
                      style={{ boxShadow: `12px 12px 0px ${shadowColor}`, background: 'transparent' }}
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
              <CarouselPrevious className={`border-4 ${borderColor}`} />
              <CarouselNext className={`border-4 ${borderColor}`} />
            </Carousel>
          </div>

          {/* Sections with Accordion */}
          <Accordion type="multiple" className="space-y-6">
            {sections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className={`${bgBox} border-8 ${borderColor} overflow-hidden`}
                style={{ boxShadow: `10px 10px 0px ${shadowColor}` }}
              >
                <AccordionTrigger
                  className={`px-6 md:px-8 py-6 hover:no-underline ${accentColor} hover:bg-opacity-50 transition-colors`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-4xl">★</span>
                    <span className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "serif" }}>
                      {section.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 md:px-8 pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 bg-white p-6 border-4 border-gray-200 rounded-lg"
                    style={{ boxShadow: `4px 4px 0px ${shadowColor}` }}
                  >
                    {section.content.map((paragraph, pIndex) => (
                      <div key={pIndex} className="flex items-start">
                        <span className={`${accentColor} mr-3 mt-1 font-bold text-xl`}>▸</span>
                        <p className="text-gray-800 leading-relaxed flex-1 text-lg"
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

