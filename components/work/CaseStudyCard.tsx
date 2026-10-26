"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";

import { Text } from "@/components/ui/Placeholder";
import { documentCount, type CaseStudy } from "@/content/work";
import { ease } from "@/lib/motion";
import { trackSpotlight } from "@/lib/spotlight";

import { DocStack } from "./DocStack";

/** Homepage card for one case study. The whole card links to its /work page. */
export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const docs = documentCount(study);
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: ease.outExpo, delay: index * 0.08 }}
      onPointerMove={trackSpotlight}
      style={{ ["--accent" as string]: study.accent }}
      className="glass spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl transition-[translate,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_80px_-36px_var(--accent)]"
    >
      <DocStack slug={study.slug} accent={study.accent} accent2={study.accent2} className="aspect-[16/8] w-full border-b border-line" />

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="label text-[0.66rem]" style={{ color: study.accent }}>
            {study.kind}
          </span>
          {study.via && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ion/30 bg-ion/10 px-2.5 py-1 text-[0.72rem] font-medium text-ion">
              <BadgeCheck aria-hidden className="size-3.5" />
              Through {study.via.name}
            </span>
          )}
          <span className="font-mono text-xs text-fg-subtle">
            <Text value={study.dates} />
          </span>
        </div>

        <p className="mt-5 text-[0.95rem]" style={{ color: study.accent }}>
          {study.org}
        </p>
        <h3 className="mt-1 font-display text-2xl font-semibold leading-snug">
          <Link
            href={`/work/${study.slug}`}
            className="after:absolute after:inset-0 after:z-10 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-signal"
          >
            {study.program}
          </Link>
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{study.tagline}</p>

        <ol aria-label="Steps" className="mt-6 flex flex-wrap gap-1.5">
          {study.stepLabels.map((label, i) => (
            <li key={label} className="flex items-center gap-1.5 rounded-full border border-line-strong bg-white/[0.03] py-1 pl-1.5 pr-2.5 text-[0.72rem] text-fg-muted">
              <span className="font-mono text-[0.62rem]" style={{ color: study.accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
            </li>
          ))}
        </ol>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-7 text-sm">
          <span className="text-fg-subtle">
            <span className="font-display text-lg font-semibold text-fg">{docs}</span> documents across {study.steps.length} steps
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap text-fg-muted transition-colors duration-300 group-hover:text-fg">
            Explore the work
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
