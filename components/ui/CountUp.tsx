"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import { ease } from "@/lib/motion";

type Props = { value: number; prefix?: string; suffix?: string; duration?: number; className?: string };

/**
 * Counts up to `value` when scrolled into view. The final number is in the
 * server HTML and in screen-reader-only text, so it reads correctly without JS.
 */
export function CountUp({ value, prefix = "", suffix = "", duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const started = useRef(false);
  const format = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || started.current) return;
    if (!inView) {
      el.textContent = format(0);
      return;
    }
    started.current = true;
    const controls = animate(0, value, {
      duration,
      ease: ease.outExpo,
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span className={className}>
      <span className="sr-only">{format(value)}</span>
      <span ref={ref} aria-hidden>
        {format(value)}
      </span>
    </span>
  );
}
