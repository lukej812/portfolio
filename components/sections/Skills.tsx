"use client";

import { motion } from "framer-motion";
import { Bot, Briefcase, ChartColumn, Compass, PenTool, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/content/skills";
import { ease, viewportOnce } from "@/lib/motion";
import { trackSpotlight } from "@/lib/spotlight";

const icons = { Compass, ChartColumn, Briefcase, Bot, ShieldCheck, PenTool };

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="skills-title"
          label="Skills & Tools"
          title="A product mind with a builder's toolkit."
          intro="I move between research, data, and code depending on what the problem needs. Here's what I reach for."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => {
            const Icon = icons[group.icon];
            return (
              <motion.article
                key={group.title}
                onPointerMove={trackSpotlight}
                style={{ ["--accent" as string]: group.accent }}
                className="glass spotlight group flex flex-col rounded-3xl p-6 md:p-7"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: ease.outExpo, delay: (gi % 3) * 0.08 }}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className="flex size-11 items-center justify-center rounded-2xl border transition-transform duration-500 ease-out-expo group-hover:scale-105"
                    style={{
                      color: group.accent,
                      borderColor: `color-mix(in oklab, ${group.accent} 35%, transparent)`,
                      background: `color-mix(in oklab, ${group.accent} 12%, transparent)`,
                    }}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted">{group.blurb}</p>
                <motion.ul
                  className="mt-6 flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={{ show: { transition: { staggerChildren: 0.035, delayChildren: 0.2 + (gi % 3) * 0.08 } } }}
                >
                  {group.items.map((item) => (
                    <motion.li
                      key={item}
                      variants={{
                        hidden: { opacity: 0, y: 10, scale: 0.94 },
                        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: ease.outExpo } },
                      }}
                      className="cursor-default rounded-full border border-line-strong bg-white/[0.025] px-3 py-1.5 text-[0.82rem] text-fg-muted transition-[color,border-color,background-color,box-shadow] duration-300 hover:text-fg"
                      onPointerEnter={(e) => {
                        e.currentTarget.style.borderColor = `color-mix(in oklab, ${group.accent} 55%, transparent)`;
                        e.currentTarget.style.boxShadow = `0 0 18px -6px ${group.accent}`;
                      }}
                      onPointerLeave={(e) => {
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
