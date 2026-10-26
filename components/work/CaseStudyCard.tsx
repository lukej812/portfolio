"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";

import { Text } from "@/components/ui/Placeholder";
import { documentCount, type CaseStudy } from "@/content/work";
import { ease } from "@/lib/motion";
import { trackSpotlight } from "@/lib/spotlight";

import { DocStack } from "./DocStack";

/**
 * Homepage row for one case study, laid out like Extern's work samples:
 * a visual on the left; org, verification, title, description, and tags on
 * the right. The whole row links to its /work page.
 */
export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const docs = documentCount(study);
  const mark = study.short.length <= 3 ? study.short : study.short[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: ease.outExpo, delay: index * 0.08 }}
      onPointerMove={trackSpotlight}
      style={{ ["--accent" as string]: study.accent }}
      className="glass spotlight group relative grid grid-cols-1 overflow-hidden rounded-3xl transition-[translate,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-transparent hover:shadow-[0_30px_80px_-40px_var(--accent)] md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    >
      <DocStack
        slug={study.slug}
        accent={study.accent}
        accent2={study.accent2}
        className="aspect-[16/9] w-full border-b border-line md:aspect-auto md:h-full md:min-h-72 md:border-b-0 md:border-r"
      />

      <div className="flex flex-col p-6 md:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-sm text-fg-muted">
          <span
            aria-hidden
            className="flex size-7 items-center justify-center rounded-full border font-display text-[0.62rem] font-semibold"
            style={{ color: study.accent, borderColor: `color-mix(in oklab, ${study.accent} 45%, transparent)`, background: `color-mix(in oklab, ${study.accent} 12%, transparent)` }}
          >
            {mark}
          </span>
          <span className="text-fg">{study.short}</span>
          <span aria-hidden className="text-fg-subtle">·</span>
          <span>{study.kind}</span>
          {study.via && (
            <>
              <span aria-hidden className="hidden text-fg-subtle sm:inline">·</span>
              {/* Own line on phones, so a wrap never leaves a dangling dot */}
              <span className="inline-flex basis-full items-center gap-1.5 text-ion sm:basis-auto">
                <BadgeCheck aria-hidden className="size-4" />
                Verified by {study.via.name}
              </span>
            </>
          )}
        </div>

        <h3 className="mt-5 font-display text-2xl font-semibold leading-snug md:text-[1.75rem]">
          <Link
            href={`/work/${study.slug}`}
            className="after:absolute after:inset-0 after:z-10 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-signal"
          >
            {study.short} {study.program}
          </Link>
        </h3>
        <p className="mt-2 font-mono text-xs text-fg-subtle">
          <Text value={study.dates} />
        </p>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-fg-muted">{study.approach}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line-strong bg-white/[0.03] px-2.5 py-1 text-xs text-fg-muted">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-5 text-sm">
            <span className="text-fg-subtle">
              <span className="font-display text-lg font-semibold text-fg">{docs}</span> documents across {study.steps.length} steps
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap text-fg-muted transition-colors duration-300 group-hover:text-fg">
              View the work
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
