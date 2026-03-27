"use client";

import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import type { useSpring, MotionValue } from "framer-motion";
import { useLayerTransform } from "@/components/hooks/useParallax";

// ─── Scan line ────────────────────────────────────────────────────────────────

function ScanLine({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="absolute inset-x-0 h-16 pointer-events-none z-10"
      style={{
        background:
          "linear-gradient(to bottom, transparent, rgba(255,236,61,0.07), transparent)",
        animation: "scan-line 3.5s linear infinite",
        animationDelay: delay,
      }}
    />
  );
}

// ─── Panel frame ──────────────────────────────────────────────────────────────

function PanelFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full bg-[#0d0d0d] border border-neo-yellow/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,236,61,0.06)]">
      {/* Bezel inner inset */}
      <div className="absolute inset-[5px] rounded-xl overflow-hidden">
        {children}
      </div>
      {/* Bottom frame bar */}
      <div className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-between px-3 bg-[#0d0d0d]">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-neo-yellow/35" />
          ))}
        </div>
        <span className="text-neo-light-yellow/20 text-[8px] font-mono tracking-widest">
          NEO
        </span>
      </div>
    </div>
  );
}

// ─── Product screen ───────────────────────────────────────────────────────────

interface ProductScreenProps {
  src: string;
  title: string;
  sub: string;
  badge?: string;
  scanDelay?: string;
}

function ProductScreen({
  src,
  title,
  sub,
  badge,
  scanDelay = "0s",
}: ProductScreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 
        Image asli 233x200 — pakai object-cover dengan posisi center
        Container tiap panel sudah mengikuti ratio 233:200 (≈ aspect-[233/200])
        sehingga tidak ada distorsi gepeng
      */}
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 50vw, 25vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />

      {/* Scan line */}
      <ScanLine delay={scanDelay} />

      {/* Badge */}
      {badge && (
        <div className="absolute top-2.5 left-2.5 z-20">
          <span className="bg-neo-yellow text-black text-[8px] font-black px-2 py-0.5 rounded-full tracking-wide uppercase">
            {badge}
          </span>
        </div>
      )}

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
        <p className="text-white font-bold text-xs leading-tight">{title}</p>
        <p className="text-neo-light-yellow/50 text-[9px] mt-0.5 tracking-wide">
          {sub}
        </p>
      </div>

      {/* LED strip */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neo-yellow animate-glow-pulse z-30" /> */}
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeroPanelsProps {
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
  floatA: MotionValue<number>;
  floatB: MotionValue<number>;
  floatC: MotionValue<number>;
  floatD: MotionValue<number>;
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function HeroPanels({
  springX,
  springY,
  floatA,
  floatB,
  floatC,
  floatD,
}: HeroPanelsProps) {
  const pA = useLayerTransform(springX, springY, 0.06);
  const pB = useLayerTransform(springX, springY, 0.045);
  const pC = useLayerTransform(springX, springY, 0.03);
  const pD = useLayerTransform(springX, springY, 0.08);

  const yA = useTransform(pA.y, (v) => v + floatA.get());
  const yB = useTransform(pB.y, (v) => v + floatB.get());
  const yC = useTransform(pC.y, (v) => v + floatC.get());
  const yD = useTransform(pD.y, (v) => v + floatD.get());

  return (
    <>
      {/* 
        Semua panel width & height mengikuti ratio 233:200.
        Formula: jika width = W, maka height = W * (200/233) ≈ W * 0.859
        
        Panel D  → w-[116px]  h-[100px]   (233/2 : 200/2)
        Panel A  → w-[186px]  h-[160px]   (custom, sedikit diperbesar)
        Panel B  → w-[163px]  h-[140px]
        Panel C  → w-[140px]  h-[120px]
        Panel E  → w-[128px]  h-[110px]
      -->

      {/* ── Panel D — tiny, top center — LED Transparent ── */}
      <motion.div
        style={{ x: pD.x, y: yD }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute top-[7%] left-[38%] z-10 w-[116px] h-[100px]"
      >
        <PanelFrame>
          <ProductScreen
            src="/products/led-transparent.png"
            title="Transparent LED"
            sub="See through Display"
            scanDelay="2.5s"
          />
        </PanelFrame>
      </motion.div>

      {/* ── Panel A — large, left — LED Poster ── */}
      <motion.div
        style={{ x: pA.x, y: yA }}
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[12%] left-[3%] z-10 w-[186px] h-[160px] lg:w-[210px] lg:h-[180px]"
      >
        <PanelFrame>
          <ProductScreen
            src="/products/led-poster.png"
            title="LED Poster"
            sub="Presenting Ideas Through Poster"
            badge="Best Seller"
            scanDelay="0s"
          />
        </PanelFrame>
      </motion.div>

      {/* ── Panel B — medium, right top — Video Wall ── */}
      <motion.div
        style={{ x: pB.x, y: yB }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[6%] right-[4%] z-10 w-[163px] h-[140px] lg:w-[186px] lg:h-[160px]"
      >
        <PanelFrame>
          <ProductScreen
            src="/products/video-wall.png"
            title="Video Wall"
            sub="Power Your Message with Video Walls"
            badge="Enterprise"
            scanDelay="1s"
          />
        </PanelFrame>
      </motion.div>

      {/* ── Panel C — small, bottom right — Digital Signage ── */}
      <motion.div
        style={{ x: pC.x, y: yC }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9 }}
        className="absolute bottom-[14%] right-[10%] z-10 w-[140px] h-[120px]"
      >
        <PanelFrame>
          <ProductScreen
            src="/products/digital-signage.png"
            title="Digital Signage"
            sub="Indoor · Outdoor"
            scanDelay="1.8s"
          />
        </PanelFrame>
      </motion.div>

      {/* ── Panel E — bottom left — LED Indoor ── */}
      <motion.div
        style={{ x: pA.x, y: useTransform(pA.y, (v) => v + floatC.get()) }}
        initial={{ opacity: 0, x: -30, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.75, duration: 0.9 }}
        className="absolute bottom-[10%] left-[3%] z-10 w-[128px] h-[110px]"
      >
        <PanelFrame>
          <ProductScreen
            src="/products/led-indoor.png"
            title="LED Indoor"
            sub="High Brightness"
            scanDelay="0.5s"
          />
        </PanelFrame>
      </motion.div>
    </>
  );
}
