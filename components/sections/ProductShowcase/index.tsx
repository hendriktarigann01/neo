"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Monitor, Tv, LayoutGrid, Gauge } from "lucide-react";
import { ProductCard } from "./ProductCard";

const products = [
  {
    icon: Monitor,
    name: "LED Indoor",
    size: "P1.25 | P1.5 | P1.8 | P2.5 | P3.0",
    desc: "Fine-pitch indoor LED panels delivering vibrant, seamless visuals for retail, showrooms, and corporate environments.",
    badge: "Best Seller",
    features: ["Fine Pitch", "Seamless Display", "High Contrast"],
    image: "/products/led-indoor.webp",
  },
  {
    icon: Tv,
    name: "Stand Floor",
    size: '43" | 55" | 65"',
    desc: "Freestanding digital display for lobbies, malls, and retail floors. Eye-catching, plug-and-play, no wall mounting needed.",
    badge: "Popular",
    features: ["Plug & Play", "Android Built-in", "Portrait Ready"],
    image: "/products/digital-signage.webp",
  },
];

export function ProductShowcase() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="products"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-neo-yellow text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            Product Line
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Built to{" "}
            <span className="text-neo-yellow text-glow">Perform & Impress</span>
          </h2>
          <p className="text-neo-light-yellow/50 text-lg mt-4 max-w-xl mx-auto">
            One goal & make your space impossible to ignore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {products.map((product, i) => (
            <ProductCard
              key={product.name}
              product={product}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
