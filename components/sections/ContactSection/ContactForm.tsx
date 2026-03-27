"use client";

import { motion } from "framer-motion";
import { MessageCircle, Send, ChevronDown } from "lucide-react";

const productOptions = [
  "LED Poster Display",
  "Digital Signage",
  "Interactive Dashboard",
  "Creative Visual LED",
  "LED Outdoor",
  "LED Indoor",
  "LED Transparent",
  "LED Video Wall",
  "Not Sure (Need Recommendation)",
];

interface ContactFormProps {
  isInView: boolean;
  form: { name: string; business: string; product: string; message: string };
  onChange: (field: string, value: string) => void;
  waHref: string;
}

export function ContactForm({ isInView, form, onChange, waHref }: ContactFormProps) {
  const inputClass =
    "w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-neo-light-yellow/25 focus:outline-none focus:border-neo-yellow/50 transition-colors";

  const labelClass =
    "text-neo-light-yellow/45 text-xs font-medium tracking-wide uppercase block mb-2";

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="lg:col-span-3 bg-[#111] border border-white/5 rounded-2xl p-8"
    >
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelClass}>Your Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="John Doe"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Business Name</label>
          <input
            type="text"
            value={form.business}
            onChange={(e) => onChange("business", e.target.value)}
            placeholder="Toko Jaya"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass}>Product Interest</label>
        <div className="relative">
          <select
            value={form.product}
            onChange={(e) => onChange("product", e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="">Select a product...</option>
            {productOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neo-light-yellow/30 pointer-events-none"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className={labelClass}>Additional Info</label>
        <textarea
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          rows={3}
          placeholder="Tell us about your space, number of units, or any special requirements..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group w-full inline-flex items-center justify-center gap-3 bg-neo-yellow text-black font-bold text-base px-8 py-4 rounded-xl hover:bg-neo-gold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] box-glow-strong"
      >
        <MessageCircle size={20} />
        Send via WhatsApp
        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
}