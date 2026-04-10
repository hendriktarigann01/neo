"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Background } from "@/components/layout/Background";

export function FlowSection() {
  const t = useTranslations("flow");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = t.raw("steps") as { title: string; desc: string }[];

  return (
    <section ref={ref} id="flow" className="relative py-28 px-6 bg-neo-black">
      <Background
        position="left-0 -translate-y-1/2 top-1/2"
        opacity="opacity-10"
      />
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
              <h2 className="font-display font-medium text-2xl md:text-3xl lg:text-4xl leading-tight text-white">
                {t("title1")}
                <br />
                {t("title2")}{" "}
                <span className="text-neo-yellow">{t("title3")}</span>
              </h2>
              <div className="max-w-md text-neo-white text-sm leading-relaxed">
                {t("desc")}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Row 1: step 1 & 2 */}
          <div className="grid sm:grid-cols-2 gap-4">
            {steps.slice(0, 2).map((step, i) => (
              <StepCard
                key={i}
                step={step}
                num={i + 1}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
          {/* Row 2: step 3, 4, 5 */}
          <div className="grid sm:grid-cols-3 gap-4">
            {steps.slice(2).map((step, i) => (
              <StepCard
                key={i}
                step={step}
                num={i + 3}
                index={i + 2}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  num,
  index,
  isInView,
}: {
  step: { title: string; desc: string };
  num: number;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
      className="bg-[#111] z-20 border border-[#262412] rounded-2xl p-7 transition-colors duration-300"
    >
      <div className="w-8 h-8 rounded-full bg-[#262412] flex items-center justify-center mb-6">
        <span className="text-neo-yellow text-xs">{num}</span>
      </div>
      <h3 className="font-display font-bold text-white text-xl mb-2">
        {step.title}
      </h3>
      <p className="text-neo-white text-sm leading-relaxed">{step.desc}</p>
    </motion.div>
  );
}
