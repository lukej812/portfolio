"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, HandHeart, Users } from "lucide-react";
import { useRef } from "react";

import { CountUp } from "@/components/ui/CountUp";
import { Text } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, experience, type ExperienceItem } from "@/content/experience";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { cleanMixed, shouldShow, visible } from "@/lib/placeholder";

const kinds = {
  work: { label: "Work", icon: Briefcase, color: "var(--color-signal)" },
  leadership: { label: "Leadership", icon: Users, color: "var(--color-flare)" },
  community: { label: "Community", icon: HandHeart, color: "var(--color-ion)" },
} as const;

/** Drops entries that are nothing but placeholders when placeholders are hidden */
const items = experience.filter((e) => visible(e.bullets).length > 0);

export function Experience() {
  const line = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: line, offset: ["start 65%", "end 65%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="experience-title"
            label="Experience"
            title="Where I've learned to lead, analyze, and ship."
            intro="Internships, leadership roles, and years of running programs for my community. Different settings, same habits: listen first, measure what matters, and follow through."
          />
          <Reveal className="glass spotlight w-full max-w-sm shrink-0 rounded-3xl p-6" style={{ ["--accent" as string]: "var(--color-ion)" }}>
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-ion/30 bg-ion/10 text-ion">
                <GraduationCap className="size-5" aria-hidden />
              </span>
              <div>
                <p className="label text-fg-subtle">Education</p>
                <p className="mt-2.5 font-display font-semibold">{education.school}</p>
                <p className="mt-1 text-sm text-fg-muted">
                  {education.unit}. {education.degree}.
                </p>
                <p className="mt-2 text-xs text-ion">{education.dates}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <ol ref={line} className="relative mt-20">
          <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-line lg:left-1/2 lg:-translate-x-1/2">
            <motion.div
              className="absolute inset-0 origin-top bg-linear-to-b from-signal via-volt to-ion shadow-[0_0_12px_rgb(67_226_255/0.6)]"
              style={{ scaleY: reduce ? scrollYProgress : fill }}
            />
          </div>

          {items.map((item, i) => (
            <TimelineRow key={item.role + item.org} item={item} side={i % 2 === 0 ? "left" : "right"} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineRow({ item, side }: { item: ExperienceItem; side: "left" | "right" }) {
  const kind = kinds[item.kind];
  const Icon = kind.icon;
  const dates = cleanMixed(item.dates);
  const bullets = visible(item.bullets);

  return (
    <li className="relative grid pb-12 pl-10 last:pb-0 lg:grid-cols-2 lg:gap-16 lg:pl-0">
      {/* node */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-7 flex size-6 items-center justify-center rounded-full border bg-ink-950 lg:left-1/2 lg:-translate-x-1/2"
        style={{ borderColor: kind.color }}
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -35% 0px" }}
        transition={{ duration: 0.6, ease: ease.outExpo }}
      >
        <span className="size-2 rounded-full" style={{ background: kind.color, boxShadow: `0 0 12px ${kind.color}` }} />
      </motion.span>

      {/* date on the opposite side (desktop) */}
      <motion.div
        className={cn("hidden pt-7 lg:block", side === "left" ? "lg:order-2" : "lg:order-1 lg:text-right")}
        initial={{ opacity: 0, x: side === "left" ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -25% 0px" }}
        transition={{ duration: 0.9, ease: ease.outExpo, delay: 0.1 }}
      >
        {shouldShow(item.dates) && (
          <p className="font-mono text-sm text-fg-muted">
            <Text value={item.dates} />
          </p>
        )}
        <p className="label mt-3 flex items-center gap-2 text-fg-subtle lg:inline-flex" style={{ color: kind.color }}>
          <Icon className="size-3.5" aria-hidden />
          {kind.label}
        </p>
      </motion.div>

      <motion.article
        className={cn(
          "glass spotlight rounded-3xl p-6 md:p-7",
          side === "left" ? "lg:order-1" : "lg:order-2",
        )}
        style={{ ["--accent" as string]: kind.color }}
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.9, ease: ease.outExpo }}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 lg:hidden">
          {dates && (
            <span className="font-mono text-xs text-fg-muted">
              <Text value={item.dates} />
            </span>
          )}
          <span className="label text-[0.62rem]" style={{ color: kind.color }}>
            {kind.label}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold leading-snug lg:mt-0">{item.role}</h3>
        <p className="mt-1 text-[0.95rem]" style={{ color: kind.color }}>
          {item.org}
        </p>
        {item.summary && <p className="mt-3 text-sm leading-relaxed text-fg-subtle">{item.summary}</p>}

        {bullets.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg-muted">
                <span aria-hidden className="mt-[0.62em] size-1 shrink-0 rounded-full bg-fg-subtle" />
                <Text value={b} />
              </li>
            ))}
          </ul>
        )}

        {item.metrics && item.metrics.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-5">
            {item.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <CountUp
                    value={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    className="font-display text-2xl font-semibold tracking-tight text-fg"
                  />
                  <span aria-hidden className="mt-1 block text-xs text-fg-subtle">
                    {m.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </motion.article>
    </li>
  );
}
