"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Monitor, Layout, Columns, LayoutGrid } from "lucide-react";
import { ProductCard } from "./ProductCard";

const products = [
  {
    icon: Monitor,
    name: "LED Poster Display",
    size: 'A1 / A0 — 24"–32"',
    desc: "Ultra-slim portrait LED panel, perfect for retail windows and entrances. No PC required.",
    badge: "Best Seller",
    features: ["4K Capable", "Android Built-in", "Wireless Setup"],
  },
  {
    icon: Layout,
    name: "Digital Menu Board",
    size: '43" – 65" Landscape',
    desc: "Transform your cafe or restaurant with dynamic menu displays that update in seconds.",
    badge: "Restaurant Pick",
    features: ["Touch Optional", "Cloud CMS", "Schedule Content"],
  },
  {
    icon: Columns,
    name: "Retail Shelf Screen",
    size: '7" – 15" Compact',
    desc: "Product-level promotions directly at the shelf. Drive impulse buys with dynamic pricing.",
    badge: "New",
    features: ["Lightweight", "Easy Mount", "USB Powered"],
  },
  {
    icon: LayoutGrid,
    name: "LED Video Wall",
    size: "Custom Module",
    desc: "Modular LED tiles for large-format brand storytelling in showrooms and malls.",
    badge: "Enterprise",
    features: ["Seamless", "Custom Size", "High Brightness"],
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
            Displays Built for{" "}
            <span className="text-neo-yellow text-glow">Every Space</span>
          </h2>
          <p className="text-neo-light/50 text-lg mt-4 max-w-xl mx-auto">
            From compact shelf screens to full video walls — all plug-and-play.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ProductCard
              key={product.name}
              product={product}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-20 overflow-hidden border-y border-white/5 py-3">
          <div className="flex animate-marquee whitespace-nowrap gap-3">
            {[...Array(2)].map((_, setIdx) =>
              [
                {
                  src: "/products/creative-visual-led-display.png",
                  label: "Creative Visual LED",
                },
                {
                  src: "/products/digital-signage.png",
                  label: "Digital Signage",
                },
                {
                  src: "/products/interactive-dashboard.png",
                  label: "Interactive Dashboard",
                },
                { src: "/products/led-indoor.png", label: "LED Indoor" },
                { src: "/products/led-outdoor.png", label: "LED Outdoor" },
                { src: "/products/led-poster.png", label: "LED Poster" },
                {
                  src: "/products/led-transparent.png",
                  label: "LED Transparent",
                },
                { src: "/products/video-wall.png", label: "Video Wall" },
              ].map((item, idx) => (
                <div
                  key={`${setIdx}-${idx}`}
                  className="relative shrink-0 w-40 h-36 rounded-xl overflow-hidden border border-white/5 group"
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-300"
                    sizes="160px"
                  />
                  {/* Label overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <p className="absolute bottom-2 left-2.5 text-neo-light-yellow/70 text-[9px] font-semibold tracking-wide">
                    {item.label}
                  </p>
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
