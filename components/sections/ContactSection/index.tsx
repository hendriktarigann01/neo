"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

const WA_NUMBER = "628111122492";

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    name: "",
    business: "",
    product: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const waMessage = encodeURIComponent(
    `Halo NEO! Saya ${form.name} dari ${form.business || "bisnis saya"}.\n\nSaya tertarik dengan: ${form.product || "produk NEO"}\n\n${form.message}`,
  );

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-neo-yellow/5 blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-neo-yellow text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">
            Let&apos;s Talk{" "}
            <span className="text-neo-yellow text-glow">Display</span>
          </h2>
          <p className="text-neo-light/50 text-lg max-w-lg mx-auto">
            Drop us a message via WhatsApp. We reply within 1 hour during
            business hours.
          </p>
        </motion.div>

        {/* <div className="grid lg:grid-cols-5 gap-8 items-start"> */}
        <ContactForm
          isInView={isInView}
          form={form}
          onChange={handleChange}
          waHref={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
        />
        {/* <ContactInfo isInView={isInView} waNumber={WA_NUMBER} /> */}
        {/* </div> */}
      </div>
    </section>
  );
}
