"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Monitor, Tv, LayoutGrid, Gauge } from "lucide-react";
import { ProductCard } from "./ProductCard";

// ─── 4 produk terlaris ────────────────────────────────────────────────────────

const products = [
  {
    icon: Monitor,
    name: "LED Poster Display",
    size: 'A1 / A0 — 24"–32"',
    desc: "Ultra-slim portrait LED panel for retail windows and entrances. Android built-in, no PC required.",
    badge: "Best Seller",
    features: ["4K Capable", "Android Built-in", "Wireless Setup"],
    image: "/products/led-poster.png",
  },
  {
    icon: Tv,
    name: "Digital Signage",
    size: '32" – 65" Landscape',
    desc: "Versatile indoor digital signage for malls, offices, and retail. Crystal-clear display, easy content management.",
    badge: "Popular",
    features: ["Cloud CMS", "Schedule Content", "Full HD"],
    image: "/products/digital-signage.png",
  },
  {
    icon: Gauge,
    name: "Interactive Dashboard",
    size: '43" – 86" Touch',
    desc: "Touch-enabled interactive displays for showrooms, lobbies, and presentations. Engage your audience directly.",
    badge: "Interactive",
    features: ["Multi-touch", "Custom UI", "Real-time Data"],
    image: "/products/interactive-dashboard.png",
  },
  {
    icon: LayoutGrid,
    name: "LED Video Wall",
    size: "Custom Module",
    desc: "Modular LED tiles for large-format brand storytelling in showrooms, malls, and events.",
    badge: "Enterprise",
    features: ["Seamless", "Custom Size", "High Brightness"],
    image: "/products/video-wall.png",
  },
];

// ─── Semua 8 produk untuk marquee ─────────────────────────────────────────────

const marqueeItems = [
  {
    src: "/products/creative-visual-led-display.png",
    label: "Creative Visual LED",
  },
  { src: "/products/digital-signage.png", label: "Digital Signage" },
  {
    src: "/products/interactive-dashboard.png",
    label: "Interactive Dashboard",
  },
  { src: "/products/led-indoor.png", label: "LED Indoor" },
  { src: "/products/led-outdoor.png", label: "LED Outdoor" },
  { src: "/products/led-poster.png", label: "LED Poster" },
  { src: "/products/led-transparent.png", label: "LED Transparent" },
  { src: "/products/video-wall.png", label: "Video Wall" },
];

// ─── Tinggi marquee item dari ratio 233:200 ────────────────────────────────────
// width 160px → height = 160 * (200/233) ≈ 137px

const MARQUEE_W = 160;
const MARQUEE_H = Math.round(MARQUEE_W * (200 / 233));

// ─── Section ──────────────────────────────────────────────────────────────────

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
          <p className="text-neo-light-yellow/50 text-lg mt-4 max-w-xl mx-auto">
            Our top picks — from poster displays to full video walls.
          </p>
        </motion.div>

        {/* 4 Product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ProductCard
              key={product.name}
              product={product}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Also available label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 mb-4 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-neo-light-yellow/30 text-[10px] font-bold tracking-[0.3em] uppercase shrink-0">
            Also Available
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </motion.div>

        {/* Marquee — semua 8 produk, ratio 233:200 */}
        <div className="overflow-hidden border-y border-white/5 py-3">
          <div className="flex animate-marquee whitespace-nowrap gap-3">
            {[...Array(2)].map((_, setIdx) =>
              marqueeItems.map((item, idx) => (
                <div
                  key={`${setIdx}-${idx}`}
                  className="relative shrink-0 overflow-hidden rounded-xl border border-white/5 group"
                  style={{ width: `${MARQUEE_W}px`, height: `${MARQUEE_H}px` }}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-contain opacity-55 group-hover:opacity-85 transition-opacity duration-300"
                    sizes="160px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <p className="absolute bottom-2 left-2.5 text-neo-light-yellow/65 text-[9px] font-semibold tracking-wide">
                    {item.label}
                  </p>
                </div>
              )),
            )}
          </div>
        </div>

        {/* CTA ke contact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-neo-light-yellow/35 text-sm mb-4">
            Need something specific? We carry more than what's shown here.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-neo-yellow/25 text-neo-yellow text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-neo-yellow/5 hover:border-neo-yellow/50 transition-all duration-200"
          >
            Ask for Full Catalog →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
