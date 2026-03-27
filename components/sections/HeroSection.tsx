"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { HeroPanels } from "@/components/hero/HeroPanels";
import { HeroBadges } from "@/components/hero/HeroBadges";
import { HeroText } from "@/components/hero/HeroText";
import {
  useSmoothMouse,
  useFloatAnimation,
} from "@/components/hooks/useParallax";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { springX, springY } = useSmoothMouse(heroRef);
  const { floatA, floatB, floatC, floatD } = useFloatAnimation();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: sectionOpacity, y: sectionY }}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      <HeroBackground springX={springX} springY={springY} />

      <HeroPanels
        springX={springX}
        springY={springY}
        floatA={floatA}
        floatB={floatB}
        floatC={floatC}
        floatD={floatD}
      />

      <HeroBadges springX={springX} springY={springY} />

      <HeroText springX={springX} springY={springY} />
    </motion.section>
  );
}
