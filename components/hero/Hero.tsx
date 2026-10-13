"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, type CSSProperties } from "react";

import { CursorGlow } from "@/components/hero/CursorGlow";
import { EnergyField } from "@/components/hero/EnergyField";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { hero, site } from "@/content/site";

/** Delay for a CSS entrance animation (see .enter-rise / .enter-fade in globals.css) */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/*
 * Entrance timing in ms. Kept short on purpose: the subheadline is usually
 * the Largest Contentful Paint element, so it should be visible fast.
 */
const T = { name: 60, letter: 28, headline: 320, word: 28, sub: 480, ctas: 580, status: 680, cue: 1400 };

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  const nameWords = site.name.split(" ");
  const headlineWords = hero.headline.split(" ");

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Background layers. Glows are radial gradients, not blur filters, so they cost almost nothing to paint. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-backdrop absolute inset-0 opacity-60" />
        <div className="absolute -left-[15%] top-0 size-[65vmax] animate-drift bg-[radial-gradient(closest-side,rgb(79_125_255/0.22),transparent)] will-change-transform" />
        <div className="absolute -right-[20%] top-[22%] size-[55vmax] animate-drift bg-[radial-gradient(closest-side,rgb(67_226_255/0.14),transparent)] will-change-transform [animation-delay:-8s]" />
        <div className="absolute bottom-[-30%] left-[25%] size-[50vmax] animate-drift bg-[radial-gradient(closest-side,rgb(47_217_169/0.1),transparent)] will-change-transform [animation-delay:-14s]" />
        <motion.div className="absolute inset-0" style={{ y: fieldY }}>
          <EnergyField className="absolute inset-0 h-full w-full" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-ink-950" />
      </div>
      <CursorGlow container={ref} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-28 pt-32 sm:px-6 lg:px-8"
      >
        <p className="enter-fade label inline-flex w-fit items-center gap-2.5 rounded-full border border-line-strong bg-ink-900/70 px-3.5 py-2 text-fg-muted">
          <span aria-hidden className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-ion animate-pulse-soft" />
          </span>
          {hero.eyebrow}
        </p>

        <h1 id="hero-title" className="mt-7 text-display font-semibold">
          <span className="sr-only">{site.name}</span>
          <span aria-hidden className="block">
            {nameWords.map((word, w) => (
              <span key={word} className="mr-[0.22em] inline-block whitespace-nowrap last:mr-0">
                {word.split("").map((char, c) => {
                  const index = nameWords.slice(0, w).join("").length + c;
                  return (
                    <span key={c} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                      <span
                        className={w === nameWords.length - 1 ? "enter-rise text-gradient inline-block" : "enter-rise inline-block"}
                        style={delay(T.name + index * T.letter)}
                      >
                        {char}
                      </span>
                    </span>
                  );
                })}
              </span>
            ))}
          </span>
        </h1>

        <p className="mt-6 max-w-4xl font-display text-h3 font-medium text-fg sm:text-[clamp(1.5rem,2.6vw,2.25rem)] sm:leading-[1.15]">
          {headlineWords.map((word, i) => (
            <span key={i} className="enter-fade mr-[0.28em] inline-block" style={delay(T.headline + i * T.word)}>
              {word}
            </span>
          ))}
        </p>

        <p className="enter-fade mt-5 max-w-2xl text-lead text-fg-muted" style={delay(T.sub)}>
          {hero.subheadline}
        </p>

        <div className="enter-fade mt-9 flex flex-wrap items-center gap-3" style={delay(T.ctas)}>
          <MagneticButton href="#projects" variant="primary" arrow={false}>
            View Projects
            <ArrowRight aria-hidden className="ml-1 inline size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton href={site.links.github} variant="secondary" icon={<GitHubIcon className="size-4" />} className="bg-ink-900/60">
            View GitHub
          </MagneticButton>
          <MagneticButton href={site.links.linkedin} variant="secondary" icon={<LinkedInIcon className="size-4" />} className="bg-ink-900/60">
            Connect on LinkedIn
          </MagneticButton>
        </div>

        <dl className="enter-fade mt-12 grid max-w-2xl gap-3 sm:grid-cols-2" style={delay(T.status)}>
          {hero.status.map((s) => (
            <div key={s.label} className="glass rounded-2xl bg-ink-900/60 px-4 py-3.5">
              <dt className="label text-fg-subtle">{s.label}</dt>
              <dd className="mt-2 text-sm leading-snug text-fg">{s.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      <a
        href="#about"
        className="enter-fade label absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-fg-subtle transition-colors hover:text-fg sm:flex"
        style={delay(T.cue)}
      >
        Scroll
        <span className="relative flex h-10 w-px overflow-hidden bg-line-strong">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-transparent to-signal" />
        </span>
        <span className="sr-only">to About</span>
      </a>
    </section>
  );
}
