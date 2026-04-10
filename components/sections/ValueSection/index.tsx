"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Link2, BarChart3, Puzzle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Background } from "@/components/layout/Background";

const icons = [Target, Link2, BarChart3, Puzzle];

export function ValueSection() {
  const t = useTranslations("value");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section ref={ref} id="value" className="relative py-28 px-6 bg-neo-black">
      <Background position="left-0 top-[18%]" opacity="opacity-10" />
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <span className="text-neo-yellow text-xs font-bold tracking-[0.3em] uppercase block mb-5">
              {t("tag")}
            </span>
            <div className="flex flex-col md:flex-row justify-between gap-6 w-full">
              <h2 className="max-w-sm font-display font-medium text-2xl md:text-3xl lg:text-4xl leading-tight text-white">
                {t("title1")}
                <span className="text-neo-yellow">{t("title2")}</span>
              </h2>

              <div className="max-w-md text-neo-white text-sm leading-relaxed">
                {t("desc")}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="bg-[#111] z-20 border border-[#262412] rounded-2xl p-7 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#262412] flex items-center justify-center mb-6">
                  <Icon size={22} className="text-neo-yellow" />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-neo-white text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
