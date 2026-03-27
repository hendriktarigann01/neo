import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export const LAYERS = {
  grid: 0.015,
  orbL: 0.025,
  orbR: 0.02,
  panelA: 0.06,
  panelB: 0.045,
  panelC: 0.03,
  panelD: 0.08,
  badgeA: 0.09,
  badgeB: 0.07,
  lines: 0.012,
  text: 0.018,
  stats: 0.022,
} as const;

export type LayerKey = keyof typeof LAYERS;

export function useSmoothMouse(heroRef: React.RefObject<HTMLElement | null>) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.8 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.8 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      rawX.set(e.clientX - r.left - r.width / 2);
      rawY.set(e.clientY - r.top - r.height / 2);
    };

    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [heroRef, rawX, rawY]);

  return { springX, springY };
}

export function useLayerTransform(
  springX: ReturnType<typeof useSpring>,
  springY: ReturnType<typeof useSpring>,
  depth: number,
) {
  const x = useTransform(springX, (v) => v * depth);
  const y = useTransform(springY, (v) => v * depth);
  return { x, y };
}

export function useFloatAnimation() {
  const floatY = useMotionValue(0);

  useEffect(() => {
    let raf: number;
    let t = 0;
    const animate = () => {
      t += 0.012;
      floatY.set(Math.sin(t) * 8);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [floatY]);

  return {
    floatA: useTransform(floatY, (v) => v),
    floatB: useTransform(floatY, (v) => v * -0.7),
    floatC: useTransform(floatY, (v) => v * 0.5),
    floatD: useTransform(floatY, (v) => v * -1.1),
  };
}
