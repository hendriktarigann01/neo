"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLayerTransform } from "@/components/hooks/useParallax";
import type { useSpring } from "framer-motion";

interface HeroBackgroundProps {
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}

export function HeroBackground({ springX, springY }: HeroBackgroundProps) {
  const grid = useLayerTransform(springX, springY, 0.015);
  const orbL = useLayerTransform(springX, springY, 0.025);
  const orbR = useLayerTransform(springX, springY, 0.02);
  const lines = useLayerTransform(springX, springY, 0.012);
  const patB = useLayerTransform(springX, springY, 0.07);

  return (
    <>
      {/* Grid */}
      <motion.div
        style={{ x: grid.x, y: grid.y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="w-full h-full opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#ffec3d 1px, transparent 1px), linear-gradient(90deg, #ffec3d 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />
      </motion.div>

      {/* CSS pattern tile */}
      <div className="absolute inset-0 pattern-bg pointer-events-none" />

      {/* Glow orb left */}
      <motion.div
        style={{ x: orbL.x, y: orbL.y }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-neo-yellow/[0.04] blur-[100px] pointer-events-none"
      />

      {/* Glow orb right */}
      <motion.div
        style={{ x: orbR.x, y: orbR.y }}
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-neo-yellow/[0.03] blur-[120px] pointer-events-none"
      />

      {/* Depth lines */}
      <motion.div
        style={{ x: lines.x, y: lines.y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-neo-yellow/10 to-transparent" />
        <div className="absolute top-[62%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-neo-yellow/8 to-transparent" />
      </motion.div>
    </>
  );
}
