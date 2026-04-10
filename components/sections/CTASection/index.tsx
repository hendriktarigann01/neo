"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

export function CTASection() {
  const t = useTranslations("cta");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="py-32 px-6 bg-neo-dark-gray">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-display font-medium text-2xl md:text-3xl lg:text-4xl text-white mb-5 leading-tight"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-neo-white text-sm leading-relaxed mb-10"
        >
          {t("desc")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <a
            href="mailto:sales@neodisplay.id?subject=LED/LCD%20Product%20Inquiry&body=Hi%20Neo,%20I%20would%20like%20to%20consult%20about%20LED%20%26%20LCD%20display%20products.%20Please%20provide%20more%20information."
             target="_blank"
            rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-neo-yellow text-black font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-neo-gold transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {t("button")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
