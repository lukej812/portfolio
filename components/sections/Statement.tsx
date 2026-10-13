"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * A full-width line that lights up word by word as you scroll through it.
 */
export function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const words = text.split(" ");

  return (
    <div ref={ref} className="relative overflow-hidden py-16 md:py-24">
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="absolute left-1/2 top-1/2 -z-10 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(67_226_255/0.12),transparent_65%)] blur-2xl"
      />
      <div aria-hidden className="absolute inset-x-0 top-1/2 -z-10 h-px bg-linear-to-r from-transparent via-line-strong to-transparent" />
      <p className="mx-auto max-w-6xl px-4 text-center font-display text-h1 font-semibold sm:px-6 lg:px-8">
        <span className="sr-only">{text}</span>
        <span aria-hidden>
          {words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </Word>
          ))}
        </span>
      </p>
    </div>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  // Reduced motion: words stay fully visible instead of lighting up
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block last:mr-0 motion-reduce:opacity-100!">
      {children}
    </motion.span>
  );
}
