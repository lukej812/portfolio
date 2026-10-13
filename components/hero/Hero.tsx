"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

import { CursorGlow } from "@/components/hero/CursorGlow";
import { EnergyField } from "@/components/hero/EnergyField";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { hero, site } from "@/content/site";
import { ease } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  const nameWords = site.name.split(" ");
  const headlineWords = hero.headline.split(" ");
  const nameDelay = 0.15;
  const headlineDelay = nameDelay + 0.5;

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-backdrop absolute inset-0 opacity-60" />
        <div className="absolute -left-[10%] top-[8%] size-[55vmax] rounded-full bg-volt/20 blur-[120px] animate-drift" />
        <div className="absolute -right-[15%] top-[30%] size-[45vmax] rounded-full bg-signal/[0.13] blur-[120px] animate-drift [animation-delay:-8s]" />
        <div className="absolute bottom-[-20%] left-[30%] size-[40vmax] rounded-full bg-ion/10 blur-[120px] animate-drift [animation-delay:-14s]" />
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
        <motion.p
          className="label inline-flex w-fit items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-2 text-fg-muted backdrop-blur"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease.outExpo }}
        >
          <span aria-hidden className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-ion animate-pulse-soft" />
          </span>
          {hero.eyebrow}
        </motion.p>

        <h1 id="hero-title" className="mt-7 text-display font-semibold">
          <span className="sr-only">{site.name}</span>
          <span aria-hidden className="block">
            {nameWords.map((word, w) => (
              <span key={word} className="mr-[0.22em] inline-block whitespace-nowrap last:mr-0">
                {word.split("").map((char, c) => {
                  const index = nameWords.slice(0, w).join("").length + c;
                  return (
                    <span key={c} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                      <motion.span
                        className={w === nameWords.length - 1 ? "text-gradient inline-block" : "inline-block"}
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 1, ease: ease.outExpo, delay: nameDelay + index * 0.035 }}
                      >
                        {char}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </span>
        </h1>

        <p className="mt-6 max-w-4xl font-display text-h3 font-medium text-fg sm:text-[clamp(1.5rem,2.6vw,2.25rem)] sm:leading-[1.15]">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              className="mr-[0.28em] inline-block"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: ease.outExpo, delay: headlineDelay + i * 0.04 }}
            >
              {word}
            </motion.span>
          ))}
        </p>

        <motion.p
          className="mt-5 max-w-2xl text-lead text-fg-muted"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: ease.outExpo, delay: headlineDelay + 0.35 }}
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: ease.outExpo, delay: headlineDelay + 0.5 }}
        >
          <MagneticButton href="#projects" variant="primary" arrow={false}>
            View Projects
            <ArrowRight aria-hidden className="ml-1 inline size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton href={site.links.github} variant="secondary" icon={<GitHubIcon className="size-4" />}>
            View GitHub
          </MagneticButton>
          <MagneticButton href={site.links.linkedin} variant="secondary" icon={<LinkedInIcon className="size-4" />}>
            Connect on LinkedIn
          </MagneticButton>
        </motion.div>

        <motion.dl
          className="mt-12 grid max-w-2xl gap-3 sm:grid-cols-2"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: ease.outExpo, delay: headlineDelay + 0.7 }}
        >
          {hero.status.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-4 py-3.5">
              <dt className="label text-fg-subtle">{s.label}</dt>
              <dd className="mt-2 text-sm leading-snug text-fg">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.a
        href="#about"
        className="label absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-fg-subtle transition-colors hover:text-fg sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        Scroll
        <span className="relative flex h-10 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-transparent to-signal"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="sr-only">to About</span>
      </motion.a>
    </section>
  );
}
