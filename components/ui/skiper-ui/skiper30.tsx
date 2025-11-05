"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/lummi/mln1.png",
  "/images/lummi/mln2.png",
  "/images/lummi/mln3.png",
  "/images/lummi/mln4.png",
  "/images/lummi/mln5.png",
  "/images/lummi/mln6.png",
  "/images/lummi/mln7.png",
  "/images/lummi/mln8.png",
  "/images/lummi/mln10.png",
  "/images/lummi/mln11.png",
];

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="w-full bg-[#130E07]">
      <div className="font-geist flex h-screen items-center justify-center">
        <div className="absolute left-1/2 top-[15%] -translate-x-1/2 text-center space-y-6 max-w-4xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-100" style={{ fontFamily: "serif" }}>
            Hình Ảnh Lịch Sử
          </h2>
          <p className="text-lg md:text-xl text-amber-200/80 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "serif" }}>
            Khám phá những hình ảnh quan trọng về cuộc cách mạng và tư tưởng Mác-Lênin
          </p>
          <div className="flex flex-col items-center space-y-2 mt-8">
            <span className="text-xs uppercase tracking-wider text-amber-300/70">
              cuộn xuống để xem
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-amber-500 to-amber-600"></div>
          </div>
        </div>
      </div>

      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-[#130E07] p-[2vw]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[6], images[7], images[8]]} y={y4} />
      </div>

      <div className="font-geist relative flex h-screen items-center justify-center">
        <div className="absolute left-1/2 top-[15%] -translate-x-1/2 text-center space-y-6 max-w-4xl px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-amber-100" style={{ fontFamily: "serif" }}>
            Di Sản Tư Tưởng
          </h3>
          <p className="text-lg md:text-xl text-amber-200/80 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "serif" }}>
            Những hình ảnh này minh chứng cho sức mạnh của tư tưởng cách mạng và tinh thần đấu tranh
          </p>
          <div className="flex flex-col items-center space-y-2 mt-8">
            <span className="text-xs uppercase tracking-wider text-amber-300/70">
              cuộn lên để xem
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-amber-500 to-amber-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={`${src}-${i}`} className="relative h-full w-full overflow-hidden">
          <img
            src={`${src}`}
            alt={`Hình ảnh lịch sử ${i + 1}`}
            className="pointer-events-none object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };

/**
 * Skiper 30 Parallax_002 — React + framer motion + lenis
 * Inspired by and adapted from https://www.siena.film/films/my-project-x
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the siena.film . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
