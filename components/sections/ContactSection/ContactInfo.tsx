"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

interface ContactInfoProps {
  isInView: boolean;
  waNumber: string;
}

export function ContactInfo({ isInView, waNumber }: ContactInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="lg:col-span-2 flex flex-col gap-4"
    >
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-neo-yellow/5 border border-neo-yellow/15 rounded-2xl p-6 hover:bg-neo-yellow/10 hover:border-neo-yellow/30 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-neo-yellow/10 rounded-xl flex items-center justify-center">
            <MessageCircle size={20} className="text-neo-yellow" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">WhatsApp</p>
            <p className="text-neo-light/35 text-xs">Instant reply</p>
          </div>
        </div>
        <p className="text-neo-yellow font-bold text-lg">+62 811-1122-492</p>
        <p className="text-neo-light/35 text-xs mt-1">
          Mon–Sat, 08.00–17.00 WIB
        </p>
      </a>

      {/* Phone */}
      <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
            <Phone size={20} className="text-neo-light/50" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Phone / Call</p>
            <p className="text-neo-light/35 text-xs">Business hours</p>
          </div>
        </div>
        <p className="text-neo-light/60 font-semibold">+62 811-1122-492</p>
      </div>

      {/* Note */}
      <div className="bg-neo-yellow/5 border border-neo-yellow/10 rounded-2xl p-5">
        <p className="text-neo-light/60 text-xs leading-relaxed">
          <strong className="text-neo-yellow">No walk-in visits.</strong> All
          inquiries, demos, and consultations are handled via WhatsApp or phone
          call for a faster, more convenient experience.
        </p>
      </div>

      {/* Response badge */}
      <div className="flex items-center gap-2 px-4 py-3 border border-white/5 rounded-xl">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-neo-light/40 text-xs">
          Average response time:{" "}
          <strong className="text-neo-light/60">&lt; 1 hour</strong>
        </span>
      </div>
    </motion.div>
  );
}
