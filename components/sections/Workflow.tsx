"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { workflow } from "@/content/workflow";
import { ease, viewportOnce } from "@/lib/motion";
import { useMediaQuery } from "@/lib/use-media-query";

const accents = ["var(--color-signal)", "var(--color-volt)", "var(--color-ion)", "var(--color-flare)"];

/**
 * Four connected steps. On desktop they sit in a row joined by a beam that
 * fills as you scroll; on mobile the beam runs down the left edge.
 */
export function Workflow() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: wide ? ["start 80%", "start 30%"] : ["start 70%", "end 70%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section aria-labelledby="workflow-title" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-10 opacity-50" />
      <div aria-hidden className="absolute left-1/2 top-1/3 -z-10 h-[50vmax] w-[70vmax] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(79_125_255/0.08),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="workflow-title" label={workflow.label} title={workflow.title} intro={workflow.intro} />

        <ol ref={ref} className="relative mt-16 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {/* The beam: a dim track plus a bright fill driven by scroll */}
          <div
            aria-hidden
            className="absolute left-[27px] top-7 bottom-7 w-px bg-line-strong lg:bottom-auto lg:left-7 lg:right-auto lg:top-[27px] lg:h-px lg:w-[calc(75%+18px)]"
          >
            <motion.div
              className="absolute inset-0 origin-top bg-linear-to-b from-signal via-volt to-flare lg:origin-left lg:bg-linear-to-r"
              style={wide ? { scaleX: reduce ? scrollYProgress : fill } : { scaleY: reduce ? scrollYProgress : fill }}
            />
            <span aria-hidden className="workflow-spark-track absolute inset-0 motion-reduce:hidden">
              <span className="workflow-spark absolute block rounded-full" />
            </span>
          </div>

          {workflow.steps.map((step, i) => (
            <li key={step.title} className="relative pl-[4.75rem] lg:pl-0 lg:pt-[5.5rem]">
              <motion.div
                className="absolute left-0 top-0 flex size-14 items-center justify-center rounded-full border bg-ink-900 font-mono text-sm"
                style={{ color: accents[i] }}
                initial={{ borderColor: "rgb(163 190 225 / 0.18)", boxShadow: "0 0 0 0 transparent", scale: 0.85, opacity: 0.4 }}
                whileInView={{
                  borderColor: `color-mix(in oklab, ${accents[i]} 70%, transparent)`,
                  boxShadow: `0 0 0 6px color-mix(in oklab, ${accents[i]} 10%, transparent), 0 0 36px -4px ${accents[i]}`,
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                transition={{ duration: 0.7, ease: ease.outExpo, delay: wide ? 0.25 + i * 0.3 : 0.1 }}
              >
                0{i + 1}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: ease.outExpo, delay: wide ? 0.35 + i * 0.3 : 0.15 }}
              >
                <h3 className="font-display text-xl font-semibold leading-snug">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{step.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {step.examples.map((ex) => (
                    <li
                      key={ex.project + ex.detail}
                      className="glass rounded-2xl px-4 py-3 text-sm leading-snug"
                      style={{ borderColor: `color-mix(in oklab, ${accents[i]} 18%, transparent)` }}
                    >
                      <span className="label block text-[0.66rem]" style={{ color: accents[i] }}>
                        {ex.project}
                      </span>
                      <span className="mt-1.5 block text-fg-muted">{ex.detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
