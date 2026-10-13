import type { Transition, Variants } from "framer-motion";

/**
 * Motion tokens. Everything eases out fast and settles softly, so the site
 * feels responsive without being jumpy.
 */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutQuart: [0.76, 0, 0.24, 1] as const,
};

export const duration = { fast: 0.2, base: 0.6, slow: 0.9 };

export const springs = {
  magnetic: { type: "spring", stiffness: 220, damping: 16, mass: 0.4 } satisfies Transition,
  tilt: { type: "spring", stiffness: 160, damping: 18, mass: 0.6 } satisfies Transition,
  snappy: { type: "spring", stiffness: 420, damping: 34 } satisfies Transition,
};

/**
 * Fade and rise: the default section reveal. Opacity and transform only, so
 * it stays on the compositor (animating a blur filter repaints every frame).
 */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.outExpo, delay },
  }),
};

export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
