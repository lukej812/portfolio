"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, type RefObject } from "react";

import { useMediaQuery } from "@/lib/use-media-query";

/** A soft light that trails the cursor inside the given container (mouse only) */
export function CursorGlow({ container }: { container: RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduce;
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 });

  useEffect(() => {
    const el = container.current;
    if (!el || !enabled) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, [container, enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-0 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 will-change-transform"
      style={{
        x: sx,
        y: sy,
        background: "radial-gradient(circle, rgb(67 226 255 / 0.16), rgb(79 125 255 / 0.07) 35%, transparent 65%)",
      }}
    />
  );
}
