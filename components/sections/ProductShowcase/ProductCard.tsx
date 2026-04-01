"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

interface Product {
  icon: LucideIcon;
  name: string;
  size: string;
  desc: string;
  badge: string;
  features: string[];
  image: string;
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
      className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-neo-yellow/30 transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      <div className="relative w-full aspect-[233/200] overflow-hidden bg-[#0a0a0a]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain opacity-75 group-hover:opacity-95 scale-[0.65] group-hover:scale-75 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="bg-neo-yellow text-black text-[9px] font-black px-2.5 py-1 rounded-full tracking-widest uppercase">
            {product.badge}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 bg-neo-yellow/5 border border-neo-yellow/15 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-neo-yellow/10 transition-colors">
            <Icon size={16} className="text-neo-yellow" />
          </div>
          <h3 className="font-display font-bold text-sm text-white leading-tight">
            {product.name}
          </h3>
        </div>

        <p className="text-neo-yellow/60 text-[10px] font-medium mb-2">
          {product.size}
        </p>
        <p className="text-neo-light-yellow/50 text-xs leading-relaxed mb-4">
          {product.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {product.features.map((f) => (
            <span
              key={f}
              className="text-neo-light-yellow/40 text-[10px] border border-white/8 px-2 py-0.5 rounded-full"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-neo-yellow/0 to-neo-yellow/0 group-hover:from-neo-yellow/[0.03] group-hover:to-transparent transition-all duration-500 rounded-2xl pointer-events-none" />{" "}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(255,236,61,0.06) 0%, transparent 70%)",
        }}
      />{" "}
    </motion.div>
  );
}
