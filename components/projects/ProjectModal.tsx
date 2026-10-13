"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { PlaceholderChip, Text } from "@/components/ui/Placeholder";
import { categories, type Project } from "@/content/projects";
import { ease } from "@/lib/motion";
import { isPlaceholder, shouldShow, visible } from "@/lib/placeholder";

import { tagColors } from "./meta";
import { ProjectPreview } from "./ProjectPreview";
import { StatusPill } from "./StatusPill";

type Props = { project: Project | null; onClose: () => void };

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    panel.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const nodes = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      root.style.paddingRight = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-md" onClick={onClose} aria-hidden />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${project.slug}-title`}
            tabIndex={-1}
            className="relative flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-line-strong bg-ink-900 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)] outline-none sm:rounded-3xl"
            style={{ boxShadow: `0 0 0 1px color-mix(in oklab, ${project.accent} 20%, transparent), 0 40px 120px -40px color-mix(in oklab, ${project.accent} 45%, transparent)` }}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: ease.outExpo }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full border border-line-strong bg-ink-950/70 text-fg backdrop-blur transition-colors hover:border-signal/50 hover:text-signal"
              aria-label="Close project details"
            >
              <X className="size-5" />
            </button>

            <div className="overflow-y-auto overscroll-contain">
              <ProjectPreview project={project} className="pv-live aspect-[16/8] w-full sm:aspect-[16/7]" />

              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  {project.categories.map((c) => (
                    <span key={c} className="label rounded-full border border-line-strong px-2.5 py-1.5 text-[0.62rem] text-fg-muted">
                      {categories.find((x) => x.id === c)?.label}
                    </span>
                  ))}
                  <StatusPill status={project.status} tone={project.statusTone} />
                  {shouldShow(project.timeframe) && (
                    <span className="text-xs text-fg-subtle">
                      <Text value={project.timeframe} />
                    </span>
                  )}
                </div>

                <h2 id={`${project.slug}-title`} className="mt-5 text-h2 font-semibold">
                  {project.title}
                </h2>
                <p className="mt-3 text-lead text-fg-muted">{project.tagline}</p>

                <Links project={project} />

                <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr]">
                  <div className="space-y-8">
                    {project.problem && <Block title="The problem">{project.problem}</Block>}
                    <Block title="What it is">{project.summary}</Block>
                    {visible(project.features).length > 0 && (
                      <div>
                        <BlockTitle>Key features and highlights</BlockTitle>
                        <ul className="mt-3 space-y-2.5">
                          {visible(project.features).map((f) => (
                            <li key={f} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg-muted">
                              <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rotate-45" style={{ background: project.accent }} />
                              <Text value={f} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="rounded-2xl border p-5" style={{ borderColor: `color-mix(in oklab, ${project.accent} 30%, transparent)`, background: `color-mix(in oklab, ${project.accent} 6%, transparent)` }}>
                      <BlockTitle>Why it matters</BlockTitle>
                      <p className="mt-2 text-[0.98rem] leading-relaxed text-fg">{project.whyItMatters}</p>
                    </div>
                  </div>

                  <aside className="space-y-7">
                    {shouldShow(project.role) && (
                      <div>
                        <BlockTitle>My role</BlockTitle>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-fg">
                          <Text value={project.role} />
                        </p>
                      </div>
                    )}
                    {visible(project.tech).length > 0 && (
                      <div>
                        <BlockTitle>Tech</BlockTitle>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {visible(project.tech).map((t) => (
                            <li key={t} className="rounded-full border border-line-strong bg-white/[0.03] px-2.5 py-1 text-xs text-fg-muted">
                              <Text value={t} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.ai && (
                      <div>
                        <BlockTitle>How AI is used</BlockTitle>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{project.ai}</p>
                      </div>
                    )}
                    <div>
                      <BlockTitle>Skills</BlockTitle>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <li key={tag} className="rounded-full border px-2.5 py-1 text-[0.7rem] font-medium" style={{ color: tagColors[tag], borderColor: `color-mix(in oklab, ${tagColors[tag]} 30%, transparent)` }}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {project.note && <p className="border-l-2 border-line-strong pl-3 text-xs leading-relaxed text-fg-subtle">{project.note}</p>}
                  </aside>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Links({ project }: { project: Project }) {
  const links = project.links.filter((l) => shouldShow(l.href));
  if (links.length === 0) return null;
  return (
    <div className="mt-7 flex flex-wrap items-center gap-3">
      {links.map((l, i) =>
        isPlaceholder(l.href) ? (
          <span key={l.label} className="inline-flex items-center gap-2 text-sm text-fg-subtle">
            {l.label}: <PlaceholderChip>{l.href}</PlaceholderChip>
          </span>
        ) : (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              i === 0
                ? "group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-ink-950 transition-[filter,box-shadow] duration-300 hover:brightness-110"
                : "group inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm text-fg transition-colors duration-300 hover:border-signal/40"
            }
            style={i === 0 ? { background: project.accent, boxShadow: `0 10px 40px -12px ${project.accent}` } : undefined}
          >
            {l.label}
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ),
      )}
    </div>
  );
}

function BlockTitle({ children }: { children: string }) {
  return <h3 className="label text-fg-subtle">{children}</h3>;
}

function Block({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <BlockTitle>{title}</BlockTitle>
      <p className="mt-2 text-[0.98rem] leading-relaxed text-fg-muted">{children}</p>
    </div>
  );
}
