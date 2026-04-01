"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import type { useSpring } from "framer-motion";
import { useLayerTransform } from "@/components/hooks/useParallax";

interface HeroTextProps {
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}

export function HeroText({ springX, springY }: HeroTextProps) {
  const text = useLayerTransform(springX, springY, 0.018);

  return (
    <motion.div
      style={{ x: text.x, y: text.y }}
      className="relative z-10 text-center max-w-2xl mx-auto px-6 pt-28"
    >
      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-5"
      >
        High-Impact <span className="text-neo-yellow text-glow">Visuals,</span>
        <br />
        Small-Business{" "}
        <span className="relative inline-block">
          Budget.
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="absolute -bottom-1 left-0 right-0 h-[3px] bg-neo-yellow origin-left rounded-full"
          />
        </span>
      </motion.h1>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.7 }}
        className="flex flex-wrap mt-16 gap-4 justify-center"
      >
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 bg-neo-yellow text-black font-bold text-base px-8 py-4 rounded-full hover:bg-neo-gold transition-all duration-200 hover:scale-105 active:scale-95 box-glow-strong"
        >
          Get a Quote
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </a>
        <a
          href="#products"
          className="inline-flex items-center gap-2 border border-white/12 text-white font-semibold text-base px-8 py-4 rounded-full hover:border-neo-yellow/40 hover:text-neo-yellow transition-all duration-200"
        >
          See Products
        </a>
      </motion.div>
    </motion.div>
  );
}
