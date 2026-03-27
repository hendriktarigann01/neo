"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Product {
  icon: LucideIcon;
  name: string;
  size: string;
  desc: string;
  badge: string;
  features: string[];
}

interface ProductCardProps {
  product: Product;
  index: number;
  isInView: boolean;
}

export function ProductCard({ product, index, isInView }: ProductCardProps) {
  const Icon = product.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-neo-yellow/30 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-neo-yellow/0 to-neo-yellow/0 group-hover:from-neo-yellow/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

      {/* Badge */}
      <div className="inline-flex items-center bg-neo-yellow/10 text-neo-yellow text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase mb-4">
        {product.badge}
      </div>

      {/* Icon */}
      <div className="w-12 h-12 bg-neo-yellow/5 border border-neo-yellow/15 rounded-xl flex items-center justify-center mb-4 group-hover:bg-neo-yellow/10 transition-colors">
        <Icon size={22} className="text-neo-yellow" />
      </div>

      <h3 className="font-display font-bold text-lg text-white mb-1">
        {product.name}
      </h3>
      <p className="text-neo-yellow/60 text-xs font-medium mb-3">
        {product.size}
      </p>
      <p className="text-neo-light/50 text-sm leading-relaxed mb-5">
        {product.desc}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-1.5">
        {product.features.map((f) => (
          <span
            key={f}
            className="text-neo-light/40 text-[10px] border border-white/8 px-2 py-0.5 rounded-full"
          >
            {f}
          </span>
        ))}
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neo-yellow/0 to-transparent group-hover:via-neo-yellow/30 transition-all duration-500" />
    </motion.div>
  );
}
