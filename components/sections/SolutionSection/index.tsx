"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Coffee,
  Users,
  TrainFront,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";

const LOAD_DURATION = 10000;
const CHIP_DURATION = 5000;
const SOLUTION_IMAGES: Record<string, string> = {
  station: "/solutions/station.webp",
  meeting: "/solutions/meeting.webp",
  cafe: "/solutions/cafe.webp",
  retail: "/solutions/retail.webp",
};

const TAB_ICONS: Record<string, React.ElementType> = {
  cafe: Coffee,
  meeting: Users,
  station: TrainFront,
  retail: ShoppingCart,
};

const INFO_BUTTONS = [
  {
    icon: "/icons/megaphone.svg",
    bg: "#BBF7D0",
    dot: "#4ADE80",
    pos: "top-[10%] left-[44%]",
  },
  {
    icon: "/icons/food.svg",
    bg: "#BFDBFE",
    dot: "#60A5FA",
    pos: "top-[25%] left-[15%]",
  },
] as const;

type Tab = {
  id: string;
  label: string;
  title: string;
  desc: string;
  products: { name: string; sub: string }[];
};

function LoadingBar({ runKey, paused }: { runKey: number; paused: boolean }) {
  return (
    <div className="relative h-px w-full bg-white/10">
      <div
        key={runKey}
        className="absolute top-0 left-0 h-full bg-neo-yellow"
        style={{
          animation: `loadBar ${LOAD_DURATION}ms linear forwards`,
          animationPlayState: paused ? "paused" : "running",
        }}
      />
    </div>
  );
}

function TabItem({
  tab,
  isOpen,
  loadKey,
  paused,
  onTabClick,
}: {
  tab: Pick<Tab, "id" | "label" | "desc">;
  isOpen: boolean;
  loadKey: number;
  paused: boolean;
  onTabClick: () => void;
}) {
  const Icon = TAB_ICONS[tab.id] ?? Coffee;

  return (
    <div>
      <button
        onClick={onTabClick}
        className="w-full flex items-center gap-4 py-5 text-left group"
      >
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${
            isOpen
              ? "bg-neo-yellow/15 border border-neo-yellow/30"
              : "bg-white/5 border border-white/8"
          }`}
        >
          <Icon
            size={18}
            className={isOpen ? "text-neo-yellow" : "text-white/40"}
          />
        </div>
        <span
          className={`flex-1 font-display font-semibold text-base transition-colors duration-200 ${
            isOpen ? "text-white" : "text-white/50 group-hover:text-white/70"
          }`}
        >
          {tab.label}
        </span>
        <div
          className={`shrink-0 transition-colors duration-200 ${isOpen ? "text-neo-yellow" : "text-white/30"}`}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-neo-white text-sm leading-relaxed pb-3">
              {tab.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && <LoadingBar runKey={loadKey} paused={paused} />}
    </div>
  );
}

function InfoPin({
  config,
  product,
  isOpen,
  onToggle,
}: {
  config: (typeof INFO_BUTTONS)[number];
  product: { name: string; sub: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`absolute ${config.pos} z-20`}>
      <button onClick={onToggle}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: config.bg }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: config.dot }}
          >
            <Image src={config.icon} alt="" width={22} height={22} />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full mt-2 z-30 bg-[#262412] rounded-xl px-4 py-3 w-[190px]"
            style={{ left: "calc(50% - 90px)" }}
          >
            <p className="text-white text-xs font-bold mb-0.5">
              {product.name}
            </p>
            <p className="text-neo-white/50 text-[10px]">{product.sub}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function SolutionSection() {
  const t = useTranslations("solution");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tabs = t.raw("tabs") as Tab[];

  const [activeId, setActiveId] = useState(tabs[0].id);
  const [loadKey, setLoadKey] = useState(0);
  const [visibleChip, setVisibleChip] = useState<number | null>(null);

  const activeIdx = tabs.findIndex((t) => t.id === activeId);
  const active = tabs[activeIdx];

  useEffect(() => {
    if (!isInView || visibleChip !== null) return;
    const timer = setTimeout(() => {
      setActiveId(tabs[(activeIdx + 1) % tabs.length].id);
      setLoadKey((k) => k + 1);
    }, LOAD_DURATION);
    return () => clearTimeout(timer);
  }, [activeId, isInView, visibleChip]);

  useEffect(() => {
    if (visibleChip === null) return;
    const timer = setTimeout(() => setVisibleChip(null), CHIP_DURATION);
    return () => clearTimeout(timer);
  }, [visibleChip]);

  const handleTabClick = (id: string) => {
    setActiveId(id);
    setLoadKey((k) => k + 1);
    setVisibleChip(null);
  };

  const handleChipToggle = (pi: number) =>
    setVisibleChip((prev) => (prev === pi ? null : pi));

  return (
    <section
      ref={ref}
      id="solution"
      className="py-28 px-6 bg-neo-dark-gray overflow-hidden"
    >
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
              <h2 className="max-w-sm font-display font-medium text-2xl md:text-3xl lg:text-4xl leading-tight text-white">
                {t("title1")}
                <span className="text-neo-yellow">{t("title2")}</span>
              </h2>
              <div className="max-w-md text-neo-white text-sm leading-relaxed">
                {t("desc")}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-32 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col"
          >
            {tabs.map((tab) => (
              <TabItem
                key={tab.id}
                tab={tab}
                isOpen={activeId === tab.id}
                loadKey={loadKey}
                paused={visibleChip !== null}
                onTabClick={() => handleTabClick(tab.id)}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square lg:aspect-[4/3]"
              >
                <Image
                  src={SOLUTION_IMAGES[activeId]}
                  alt={active.title}
                  fill
                  className="object-contain"
                />

                {INFO_BUTTONS.map((btn, pi) => (
                  <InfoPin
                    key={pi}
                    config={btn}
                    product={active.products[pi]}
                    isOpen={visibleChip === pi}
                    onToggle={() => handleChipToggle(pi)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
