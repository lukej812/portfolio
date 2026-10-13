"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PointerEvent, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { springs } from "@/lib/motion";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  /** Show the animated arrow. Defaults to true for external links. */
  arrow?: boolean;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-signal text-ink-950 shadow-[0_0_0_1px_rgb(67_226_255/0.4),0_10px_40px_-10px_rgb(67_226_255/0.7)] hover:shadow-[0_0_0_1px_rgb(67_226_255/0.7),0_14px_50px_-8px_rgb(67_226_255/0.9)] hover:bg-[#6ae8ff]",
  secondary:
    "glass text-fg hover:border-signal/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_-8px_rgb(67_226_255/0.35)]",
  ghost: "text-fg-muted hover:text-fg",
};

/**
 * A link that leans toward the cursor. The pull only runs for mouse
 * pointers and is off when the visitor prefers reduced motion.
 */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  icon,
  arrow,
  external,
  className,
  ariaLabel,
}: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springs.magnetic);
  const sy = useSpring(y, springs.magnetic);

  const isExternal = external ?? /^(https?:|mailto:)/.test(href);
  const showArrow = arrow ?? isExternal;

  function onMove(e: PointerEvent<HTMLAnchorElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-10, Math.min(10, dx * 0.25)));
    y.set(Math.max(-8, Math.min(8, dy * 0.35)));
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      target={isExternal && !href.startsWith("mailto:") ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-medium transition-[background-color,border-color,box-shadow,color] duration-300",
        styles[variant],
        className,
      )}
    >
      {icon && <span className="flex size-4 items-center justify-center">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
      {isExternal && !href.startsWith("mailto:") && <span className="sr-only"> (opens in a new tab)</span>}
    </motion.a>
  );
}
