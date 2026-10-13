"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/cn";
import { ease, viewportOnce } from "@/lib/motion";

type Props = {
  label: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

/** Eyebrow label, a title that rises in word by word, and an optional intro */
export function SectionHeading({ label, title, intro, align = "left", className, id }: Props) {
  const words = title.split(" ");
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <motion.p
        className={cn("label flex items-center gap-3 text-signal", align === "center" && "justify-center")}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: ease.outExpo }}
      >
        <span aria-hidden className="relative flex size-1.5">
          <span className="absolute inset-0 rounded-full bg-signal animate-pulse-soft" />
          <span className="absolute -inset-1.5 rounded-full bg-signal/20 blur-[3px]" />
        </span>
        {label}
      </motion.p>
      <motion.h2
        id={id}
        className="mt-5 text-h2 font-semibold text-fg"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        transition={{ staggerChildren: 0.05 }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
              transition={{ duration: 0.85, ease: ease.outExpo }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      {intro && (
        <motion.p
          className="mt-6 text-lead text-fg-muted"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.15, ease: ease.outExpo }}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
