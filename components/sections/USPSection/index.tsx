"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Lightbulb, Layers, Headphones } from "lucide-react";
import { USPCard } from "./USPCard";

const usps = [
  {
    icon: TrendingUp,
    title: "Proven ROI Impact",
    desc: "Digital displays consistently outperform static media, helping you capture more attention and turn it into measurable business results.",
    stat: "3x",
    statLabel: "Engagement Boost",
  },
  {
    icon: Lightbulb,
    title: "Built Around Your Business",
    desc: "Every solution starts with your goals. We design what fits your needs — not what's most expensive or overcomplicated.",
    stat: "Customize",
    statLabel: "Fit Solution",
  },
  {
    icon: Layers,
    title: "All in One Execution",
    desc: "No juggling multiple vendors. We handle everything from planning to rollout and long-term support in one seamless flow.",
    stat: "Seamless",
    statLabel: "Process",
  },
  {
    icon: Headphones,
    title: "Support That Stays",
    desc: "Our team is always within reach via WhatsApp, ensuring your display keeps running without disruption.",
    stat: "24/7",
    statLabel: "Assistance",
  },
];

export function USPSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="why-neo" className="relative py-32 px-6">
      <div className="absolute inset-0 pattern-bg pointer-events-none opacity-[0.03]" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-neo-yellow/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: statement */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-neo-yellow text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              Why NEO
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-6">
              Sell More.{" "}
              <span className="text-neo-yellow text-glow block">Spend Less.</span>
              Look Great.
            </h2>
            <p className="text-neo-light/50 text-lg leading-relaxed mb-10">
              NEO was built from the ground up for small businesses that want
              enterprise-level impact without the enterprise-level price.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-neo-yellow text-black font-bold text-base px-8 py-4 rounded-full hover:bg-neo-gold transition-all duration-200 hover:scale-105"
            >
              Start with a Free Consult
            </a>
          </motion.div>

          {/* Right: USP cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {usps.map((usp, i) => (
              <USPCard key={usp.title} usp={usp} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}