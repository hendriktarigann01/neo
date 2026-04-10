"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Background } from "@/components/layout/Background";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neo-black overflow-hidden">
      <Background position="top-1/2 -translate-y-1/2" opacity="opacity-10" />
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-medium text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.08] tracking-tight text-white mb-6"
        >
          {t("headline1")}{" "}
          <span className="text-neo-yellow">{t("headline2")}</span>{" "}
          {t("headline3")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-neo-white text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#solution"
            className="inline-flex items-center gap-2 bg-neo-yellow text-black text-sm px-6 py-3 rounded-lg hover:bg-neo-gold transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-neo-yellow text-white text-sm px-6 py-3 rounded-lg hover:border-white/50 hover:bg-white/5 transition-all duration-200"
          >
            {t("ctaSecondary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
