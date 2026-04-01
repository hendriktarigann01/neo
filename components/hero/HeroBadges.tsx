"use client";

import { motion } from "framer-motion";
import type { useSpring } from "framer-motion";
import { useLayerTransform } from "@/components/hooks/useParallax";

interface HeroBadgesProps {
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}

export function HeroBadges({ springX, springY }: HeroBadgesProps) {
  const bA = useLayerTransform(springX, springY, 0.09);
  const bB = useLayerTransform(springX, springY, 0.07);

  return (
    <>
      {/* Badge A */}
      <motion.div
        style={{ x: bA.x, y: bA.y }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute top-[18%] left-[20%] bg-neo-yellow text-black text-[10px] font-black px-3 py-1.5 rounded-full tracking-wide shadow-lg z-20"
      >
        Plug &amp; Play ✦
      </motion.div>

      {/* Badge B */}
      <motion.div
        style={{ x: bB.x, y: bB.y }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-[40%] right-[20%] bg-neo-yellow text-black text-[10px] font-black px-3 py-1.5 rounded-full tracking-wide shadow-lg z-20"
      >
        Smart Economy Display ✦
      </motion.div>
    </>
  );
}
