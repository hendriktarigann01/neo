"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Background } from "@/components/layout/Background";

const tabs = {
  led: {
    label: "LED Display Solution",
    products: [
      {
        name: "Indoor LED Fixed Installation",
        specs: ["P1.25", "P1.5", "P1.8", "P2.5", "P3.0"],
        image: "/products/led-indoor.webp",
      },
      {
        name: "Outdoor LED Fixed Installation",
        specs: ["P1.25", "P1.5", "P1.8", "P2.5", "P3.0"],
        image: "/products/led-outdoor.webp",
      },
    ],
  },
  lcd: {
    label: "LCD Display Solution",
    products: [
      {
        name: "Standfloor LCD Display",
        specs: ['32"', '43"', '55"', '65"'],
        image: "/products/digital-signage.webp",
      },
      {
        name: "Interactive LCD Panel",
        specs: ['55"', '65"', '75"', '86"'],
        image: "/products/interactive-whiteboard.webp",
      },
    ],
  },
};

type TabKey = keyof typeof tabs;

export function ProductSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<TabKey>("led");

  return (
    <section
      ref={ref}
      id="product"
      className="relative py-28 px-6 bg-neo-black"
    >
      <Background
        position="left-0 -translate-y-1/2 top-1/2"
        opacity="opacity-10"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-neo-yellow text-xs font-bold tracking-[0.3em] uppercase block mb-5">
            Product
          </span>
          <h2 className="font-display font-medium text-2xl md:text-3xl lg:text-4xl text-white mb-4 leading-tight">
            Display Technologies That{" "}
            <span className="text-neo-yellow">Power Every Solution</span>
          </h2>
          <p className="text-neo-white text-sm max-w-xl mx-auto leading-relaxed">
            A range of advanced display technologies designed to support various
            applications and environments.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="w-fit mx-auto flex mb-10 overflow-x-auto pb-px border-b border-neo-white"
        >
          {(Object.keys(tabs) as TabKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`shrink-0 text-sm px-5 font-semibold pb-3 border-b-2 -mb-[1px] transition-all duration-200 ${
                activeTab === key
                  ? "text-white border-neo-yellow"
                  : "text-neo-white border-transparent hover:text-white/60"
              }`}
            >
              {tabs[key].label}
            </button>
          ))}
        </motion.div>

        {/* Product cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
          >
            {tabs[activeTab].products.map((product) => (
              <div
                key={product.name}
                className="bg-[#111] z-20 border border-[#262412] rounded-2xl overflow-hidden transition-colors duration-300 group"
              >
                {/* Image */}
                <div className="relative aspect-[233/200] bg-[#0a0a0a] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain scale-75 group-hover:scale-[0.82] transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="px-5 py-4">
                  <h3 className="font-display font-bold text-white text-sm mb-3 leading-tight">
                    {product.name}
                  </h3>
                  {/* Spec pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {product.specs.map((s) => (
                      <span
                        key={s}
                        className="text-neo-white text-[10px] border border-[#262412] px-3 py-2 rounded-md font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
