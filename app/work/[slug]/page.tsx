import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Text } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { DeliverableCard } from "@/components/work/DeliverableCard";
import { DocStack } from "@/components/work/DocStack";
import { site } from "@/content/site";
import { caseStudies, documentCount, getCaseStudy } from "@/content/work";

type Props = { params: Promise<{ slug: string }> };

// Only the case studies in content/work.ts exist; any other slug is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  const title = `${study.org}: ${study.program}`;
  const url = `/work/${study.slug}`;
  // Setting openGraph here replaces the root one, so point back at the site's shared image
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}, ${site.positioning}` };
  return {
    title,
    description: study.tagline,
    alternates: { canonical: url },
    openGraph: { type: "article", url, siteName: site.name, title, description: study.tagline, locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title, description: study.tagline, images: [image] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const docs = documentCount(study);
  const next = caseStudies[(caseStudies.indexOf(study) + 1) % caseStudies.length];

  return (
    <article style={{ ["--accent" as string]: study.accent }}>
      <header className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36">
        <div aria-hidden className="grid-backdrop absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="absolute -right-[10vmax] -top-[10vmax] -z-10 size-[55vmax]"
          style={{ background: `radial-gradient(closest-side, color-mix(in oklab, ${study.accent} 14%, transparent), transparent)` }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/#work" className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg">
            <ArrowLeft aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            All work samples
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16">
            <div>
              <div className="enter-fade flex flex-wrap items-center gap-3">
                <span className="label" style={{ color: study.accent }}>
                  {study.kind}
                </span>
                {study.via && (
                  <a
                    href={study.via.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-ion/30 bg-ion/10 px-3 py-1.5 text-xs font-medium text-ion transition-colors hover:border-ion/60"
                  >
                    <BadgeCheck aria-hidden className="size-3.5" />
                    Completed through {study.via.name}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                    <span className="sr-only"> (opens my {study.via.name} portfolio in a new tab)</span>
                  </a>
                )}
              </div>
              <p className="enter-fade mt-7 text-lead" style={{ color: study.accent, ["--d" as string]: "80ms" }}>
                {study.org}
              </p>
              <h1 className="enter-fade mt-2 text-h1 font-semibold" style={{ ["--d" as string]: "140ms" }}>
                {study.program}
              </h1>
              <p className="enter-fade mt-6 max-w-2xl text-lead text-fg-muted" style={{ ["--d" as string]: "220ms" }}>
                {study.tagline}
              </p>

              <dl className="enter-fade mt-9 grid grid-cols-2 gap-x-8 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-12" style={{ ["--d" as string]: "300ms" }}>
                <Meta label="Role" value={study.role} />
                <Meta label="Dates" value={study.dates} />
                <Meta label="Documents" value={`${docs} across ${study.steps.length} steps`} />
              </dl>
            </div>

            <DocStack
              slug={study.slug}
              accent={study.accent}
              accent2={study.accent2}
              className="enter-fade pv-live group aspect-[16/10] w-full rounded-3xl border border-line"
            />
          </div>
        </div>
      </header>

      <section aria-label="Highlights" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
            {study.highlights.map((h) => (
              <div key={h.label} className="flex flex-col-reverse bg-ink-950 p-5 md:p-7">
                <dt className="mt-2 text-sm leading-snug text-fg-subtle">{h.label}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight md:text-4xl" style={{ color: study.accent }}>
                  {h.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section aria-labelledby="overview-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <h2 id="overview-title" className="label flex items-center gap-3 text-signal">
          <span aria-hidden className="size-1.5 rounded-full bg-signal shadow-[0_0_10px_2px_rgb(67_226_255/0.45)]" />
          Overview
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
          <Reveal className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
            <Block title="The brief">{study.brief}</Block>
            <Block title="The challenge">{study.challenge}</Block>
            <Block title="What I did">{study.approach}</Block>
            <div
              className="rounded-2xl border p-5"
              style={{ borderColor: `color-mix(in oklab, ${study.accent} 30%, transparent)`, background: `color-mix(in oklab, ${study.accent} 6%, transparent)` }}
            >
              <h3 className="label text-fg-subtle">The result</h3>
              <p className="mt-2.5 text-[0.98rem] leading-relaxed text-fg">{study.outcome}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <Chips title="Skills" items={study.skills} />
            <Chips title="Tools" items={study.tools} />
            {study.note && <p className="border-l-2 border-line-strong pl-3 text-xs leading-relaxed text-fg-subtle">{study.note}</p>}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
        <div className="flex flex-col gap-3 border-t border-line pt-14 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="steps-title" className="text-h2 font-semibold">
            The work, step by step.
          </h2>
          <p className="text-sm text-fg-subtle">In the order I did it. Open any document to see the original.</p>
        </div>

        <ol className="mt-14 space-y-16 md:space-y-20">
          {study.steps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-14">
              <Reveal className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-sm" style={{ color: study.accent }}>
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-h3 font-semibold">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{step.summary}</p>
              </Reveal>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {step.deliverables.map((d, j) => (
                  <li key={d.title}>
                    <Reveal delay={j * 0.05} className="h-full">
                      <DeliverableCard item={d} />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <nav aria-label="More work" className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          {next.slug !== study.slug ? (
            <Link href={`/work/${next.slug}`} className="group block">
              <span className="label text-fg-subtle">Next work sample</span>
              <span className="mt-3 block font-display text-2xl font-semibold md:text-3xl">
                {next.org}: {next.program}
                <ArrowRight
                  aria-hidden
                  className="ml-3 inline size-6 align-[-0.12em] transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: next.accent }}
                />
              </span>
            </Link>
          ) : (
            <span />
          )}
          <div className="flex flex-wrap gap-3">
            <Link href="/#projects" className="inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm text-fg transition-colors hover:border-signal/40">
              See projects
            </Link>
            <Link href="/#contact" className="inline-flex h-11 items-center rounded-full bg-signal px-5 text-sm font-medium text-ink-950 transition-[filter] hover:brightness-110">
              Get in touch
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label text-[0.62rem] text-fg-subtle">{label}</dt>
      <dd className="mt-2 text-[0.95rem] text-fg">
        <Text value={value} />
      </dd>
    </div>
  );
}

function Block({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h3 className="label text-fg-subtle">{title}</h3>
      <p className="mt-2.5 text-[0.98rem] leading-relaxed text-fg-muted">{children}</p>
    </div>
  );
}

function Chips({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="label text-fg-subtle">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {items.map((s) => (
          <li key={s} className="rounded-full border border-line-strong bg-white/[0.03] px-2.5 py-1 text-xs text-fg-muted">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
