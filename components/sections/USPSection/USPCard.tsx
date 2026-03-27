"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface USP {
  icon: LucideIcon;
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
}

interface USPCardProps {
  usp: USP;
  index: number;
  isInView: boolean;
}

export function USPCard({ usp, index, isInView }: USPCardProps) {
  const Icon = usp.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      className="bg-[#111] border border-white/5 rounded-2xl p-5 hover:border-neo-yellow/20 transition-all duration-300 group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 bg-neo-yellow/5 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-neo-yellow/10 transition-colors">
          <Icon size={18} className="text-neo-yellow" />
        </div>
        <div>
          <p className="text-neo-yellow font-black text-xl leading-none">
            {usp.stat}
          </p>
          <p className="text-neo-light/35 text-[10px] mt-0.5 tracking-wide">
            {usp.statLabel}
          </p>
        </div>
      </div>
      <h3 className="font-bold text-white text-sm mb-1.5">{usp.title}</h3>
      <p className="text-neo-light/45 text-xs leading-relaxed">{usp.desc}</p>
    </motion.div>
  );
}
