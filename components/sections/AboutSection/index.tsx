"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const pillars = [
  {
    label: "Our Mission",
    text: "Make premium digital display technology accessible for every small business in Indonesia — no bloated cost, no unnecessary complexity.",
  },
  {
    label: "Our Vision",
    text: "A future where every warung, cafe, and retail store communicates as powerfully as the biggest brands on the street.",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Top divider glow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-24 bg-gradient-to-b from-neo-yellow/30 to-transparent pointer-events-none" />

      {/* BG orb */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neo-yellow/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── Left: Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Main card */}
            <div className="relative bg-[#111] border border-white/5 rounded-3xl overflow-hidden aspect-[4/3]">
              <div className="absolute inset-0 pattern-bg opacity-[0.06]" />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="relative w-32 h-24">
                  <Image
                    src="/logo-neo.png"
                    alt="NEO"
                    fill
                    className="object-contain"
                  />
                </div>

                <p className="text-neo-light-yellow/40 text-[10px] tracking-[0.35em] uppercase font-medium">
                  Smart Economy Display
                </p>
              </div>

              {/* Scan line ambient */}
              <motion.div
                className="absolute left-0 right-0 h-32 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(255,236,61,0.04), transparent)",
                }}
                animate={{ y: ["-100%", "300%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              {/* Bottom glow bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neo-yellow to-transparent animate-glow-pulse" />
            </div>

            {/* Floating: Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 lg:-right-10 bg-[#1a1a1a] border border-neo-yellow/15 rounded-2xl px-5 py-4 box-glow"
            >
              <div className="flex gap-5">
                {[
                  { value: "500+", label: "Units Deployed" },
                  { value: "100+", label: "Happy Clients" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-neo-yellow font-black text-2xl leading-none text-glow">
                      {stat.value}
                    </p>
                    <p className="text-neo-light-yellow/45 text-[10px] mt-1 tracking-wide uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating: Est. chip */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="absolute -top-4 -left-4 lg:-left-8 bg-neo-yellow text-black text-[11px] font-black px-4 py-2 rounded-full shadow-lg"
            >
              Est. 2026
            </motion.div>
          </motion.div>

          {/* ── Right: Story & Pillars ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <span className="text-neo-yellow text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              About NEO
            </span>

            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
              Built for the{" "}
              <span className="text-neo-yellow text-glow">Everyday</span>{" "}
              Business.
            </h2>

            <div className="space-y-4 mb-10">
              <p className="text-neo-light-yellow/55 text-base leading-relaxed">
                NEO was born from a simple frustration — digital display
                technology was powerful, but locked behind enterprise price tags
                that small businesses couldn't justify.
              </p>
              <p className="text-neo-light-yellow/55 text-base leading-relaxed">
                Since 2026, we've been bringing high-impact LED and LCD
                solutions to retail stores, cafes, restaurants, and SMEs across
                Indonesia. Zero compromise on quality. Zero tolerance for
                complexity.
              </p>
            </div>

            {/* Mission & Vision cards */}
            <div className="flex flex-col gap-3 mb-10">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.12, duration: 0.6 }}
                  className="flex gap-4 bg-[#111] border border-white/5 rounded-2xl px-5 py-4 hover:border-neo-yellow/15 transition-colors duration-300"
                >
                  <div className="w-1 shrink-0 rounded-full bg-neo-yellow/60 self-stretch" />
                  <div>
                    <p className="text-neo-yellow text-[10px] font-bold tracking-widest uppercase mb-1.5">
                      {pillar.label}
                    </p>
                    <p className="text-neo-light-yellow/55 text-sm leading-relaxed">
                      {pillar.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-neo-yellow text-black font-bold text-sm px-7 py-3.5 rounded-full hover:bg-neo-gold transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Talk to Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
