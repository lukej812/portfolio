"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { reveal, stagger, viewportOnce } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & { delay?: number };

/** Fades, rises, and un-blurs its children the first time they scroll into view */
export function Reveal({ delay = 0, children, ...rest }: Props) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      custom={delay}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers any <RevealItem> children */
export function RevealGroup({
  children,
  gap = 0.07,
  delay = 0,
  ...rest
}: HTMLMotionProps<"div"> & { gap?: number; delay?: number }) {
  return (
    <motion.div variants={stagger(gap, delay)} initial="hidden" whileInView="show" viewport={viewportOnce} {...rest}>
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={reveal} {...rest}>
      {children}
    </motion.div>
  );
}
