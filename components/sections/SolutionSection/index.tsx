"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import GroupDropdown from "@/components/ui/dropdown";
import {
  Coffee,
  Users,
  TrainFront,
  ShoppingCart,
  GraduationCap,
  Heart,
  Church,
  MapPin,
  Ticket,
  Building2,
  Plus,
  Minus,
} from "lucide-react";

const LOAD_DURATION = 1000000;
const CHIP_DURATION = 5000;

const TAB_ICONS: Record<string, React.ElementType> = {
  corporate: Building2,
  education: GraduationCap,
  coffee: Coffee,
  worship: Church,
  retail: ShoppingCart,
  health: Heart,
  transportation: TrainFront,
  lobby: MapPin,
  ticketing: Ticket,
};

type InfoButton = {
  icon: string;
  bg: string;
  dot: string;
  top: string;
  left: string;
};

type Tab = {
  id: string;
  label: string;
  desc: string;
  products: { name: string; sub: string }[];
  infoButtons: InfoButton[];
  image: string;
};

type Group = {
  id: string;
  label: string;
  tabs: Tab[];
};

// ─── LoadingBar ───────────────────────────────────────────────────────────────

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

// ─── TabItem ──────────────────────────────────────────────────────────────────

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

// ─── InfoPin ──────────────────────────────────────────────────────────────────

function InfoPin({
  config,
  product,
  isOpen,
  onToggle,
}: {
  config: InfoButton;
  product: { name: string; sub: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ top: config.top, left: config.left }}
    >
      <div className="relative inline-block">
        {/* button */}
        <button onClick={onToggle}>
          <div
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: config.bg }}
          >
            <div
              className="w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: config.dot }}
            >
              <Image
                src={config.icon}
                alt=""
                width={18}
                height={18}
                className="md:w-[22px] md:h-[22px]"
              />
            </div>
          </div>
        </button>
        <AnimatePresence>
          {isOpen && (
            // isi
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full mt-2 z-[99] bg-[#262412] rounded-xl px-3 py-2 md:px-4 md:py-3 w-max max-w-[220px]"
              style={{
                translateX: "-50%",
                left: "50%",
              }}
            >
              <p className="text-white text-xs md:text-xs font-bold mb-0.5">
                {product.name}
              </p>
              <p className="text-neo-white/50 text-xs md:text-[10px]">
                {product.sub}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function SolutionSection() {
  const t = useTranslations("solution");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const groups = t.raw("groups") as Group[];

  const [activeGroupId, setActiveGroupId] = useState(groups[0].id);
  const [activeTabId, setActiveTabId] = useState(groups[0].tabs[0].id);
  const [loadKey, setLoadKey] = useState(0);
  const [visibleChip, setVisibleChip] = useState<number | null>(null);

  const activeGroup = groups.find((g) => g.id === activeGroupId)!;
  const activeTabIdx = activeGroup.tabs.findIndex((t) => t.id === activeTabId);
  const activeTab = activeGroup.tabs[activeTabIdx] ?? activeGroup.tabs[0];

  // Switch group → reset ke tab pertama group baru
  const handleGroupClick = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId)!;
    setActiveGroupId(groupId);
    setActiveTabId(group.tabs[0].id);
    setLoadKey((k) => k + 1);
    setVisibleChip(null);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    setLoadKey((k) => k + 1);
    setVisibleChip(null);
  };

  const handleChipToggle = (pi: number) =>
    setVisibleChip((prev) => (prev === pi ? null : pi));

  // Auto-advance tab dalam group
  useEffect(() => {
    if (!isInView || visibleChip !== null) return;
    const timer = setTimeout(() => {
      const nextIdx = (activeTabIdx + 1) % activeGroup.tabs.length;
      setActiveTabId(activeGroup.tabs[nextIdx].id);
      setLoadKey((k) => k + 1);
    }, LOAD_DURATION);
    return () => clearTimeout(timer);
  }, [activeTabId, activeGroupId, isInView, visibleChip]);

  // Auto-close chip
  useEffect(() => {
    if (visibleChip === null) return;
    const timer = setTimeout(() => setVisibleChip(null), CHIP_DURATION);
    return () => clearTimeout(timer);
  }, [visibleChip]);

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
                <span className="text-neo-yellow"> {t("title2")}</span>
              </h2>
              <div className="max-w-md text-neo-white text-sm leading-relaxed">
                {t("desc")}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Group selector */}
        <div className="flex w-full justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Desktop */}
            <div className="hidden md:flex items-center justify-center px-6 py-4 gap-2">
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleGroupClick(group.id)}
                  className={`text-base font-medium rounded-lg px-6 py-3 transition-all duration-200 min-w-[210px] ${
                    activeGroupId === group.id
                      ? "bg-neo-yellow text-[#4B5563]"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>

            {/* Mobile */}
            <GroupDropdown
              groups={groups}
              activeGroupId={activeGroupId}
              handleGroupClick={handleGroupClick}
            />
          </motion.div>
        </div>

        {/* Body */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-32 items-start">
       
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroupId}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                {activeGroup.tabs.map((tab) => (
                  <TabItem
                    key={tab.id}
                    tab={tab}
                    isOpen={activeTabId === tab.id}
                    loadKey={loadKey}
                    paused={visibleChip !== null}
                    onTabClick={() => handleTabClick(tab.id)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeGroupId}-${activeTabId}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square lg:aspect-[4/3]"
              >
                <Image
                  src={activeTab.image}
                  alt={activeTab.label}
                  fill
                  className="object-contain lg:scale-110"
                />

                {activeTab.infoButtons.map((btn, pi) => (
                  <InfoPin
                    key={`${activeGroupId}-${activeTabId}-${pi}`}
                    config={btn}
                    product={activeTab.products[pi]}
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
