import { ArrowUpRight, FileSpreadsheet, FileText, FileType, Lock, Presentation } from "lucide-react";
import Link from "next/link";

import { kindLabels, type Deliverable, type DocKind } from "@/content/work";

const icons = { doc: FileText, sheet: FileSpreadsheet, slides: Presentation, pdf: FileType } satisfies Record<DocKind, unknown>;

/** Each file type gets its own color, so a step's mix of docs, sheets, and decks reads at a glance */
const kindColors: Record<DocKind, string> = {
  doc: "#8aa7ff",
  sheet: "var(--color-ion)",
  slides: "var(--color-flare)",
  pdf: "var(--color-alert)",
};

const openLabels: Record<DocKind, string> = { doc: "Open doc", sheet: "Open sheet", slides: "Open deck", pdf: "Open PDF" };

/**
 * One document. Linked files open in a new tab; private ones (no `href`)
 * say so and point to the contact form instead.
 */
export function DeliverableCard({ item }: { item: Deliverable }) {
  const Icon = icons[item.kind];
  const color = kindColors[item.kind];

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border"
          style={{ color, borderColor: `color-mix(in oklab, ${color} 30%, transparent)`, background: `color-mix(in oklab, ${color} 10%, transparent)` }}
        >
          <Icon aria-hidden className="size-5" />
        </span>
        {item.illustrative && (
          <span
            title="Uses example data written for coursework, not results from a real study"
            className="rounded-full border border-flare/30 bg-flare/10 px-2.5 py-1 text-[0.68rem] font-medium text-flare"
          >
            Illustrative
          </span>
        )}
      </div>
      <p className="label mt-5 text-[0.62rem]" style={{ color }}>
        {kindLabels[item.kind]}
      </p>
      <h4 className="mt-2.5 font-display text-[1.05rem] font-semibold leading-snug text-fg">{item.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.description}</p>
    </>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="glass group flex h-full flex-col rounded-2xl p-5 transition-[translate,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_60px_-34px_var(--accent)]"
      >
        {body}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm text-fg-muted transition-colors duration-300 group-hover:text-fg">
          {openLabels[item.kind]}
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      </a>
    );
  }

  return (
    <div className="glass flex h-full flex-col rounded-2xl p-5">
      {body}
      <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-5 text-sm text-fg-subtle">
        <Lock aria-hidden className="size-3.5" />
        Available on request
        <Link href="/#contact" className="text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-signal">
          Ask me
        </Link>
      </p>
    </div>
  );
}
