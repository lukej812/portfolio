"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories, projects, type Category, type Project } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type Filter = Category | "all";

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const shown = projects.filter((p) => filter === "all" || p.categories.includes(filter));
  const count = (id: Filter) => (id === "all" ? projects.length : projects.filter((p) => p.categories.includes(id)).length);

  const onOpen = useCallback((project: Project, el: HTMLElement) => {
    trigger.current = el;
    setOpen(project);
  }, []);

  const onClose = useCallback(() => {
    setOpen(null);
    // Return focus to the card that opened the modal
    requestAnimationFrame(() => trigger.current?.focus());
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute left-0 top-1/4 -z-10 size-[45vmax] bg-[radial-gradient(closest-side,rgb(67_226_255/0.07),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="projects-title"
          label="Projects"
          title="Things I've built, researched, and shipped."
          intro="A curated set of products, prototypes, and analysis. Each one started with a real problem. Open any card for the full story."
        />

        <LayoutGroup>
          <div role="group" aria-label="Filter projects by category" className="-mx-4 mt-12 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {categories.map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c.id)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors duration-300",
                    active ? "border-transparent text-ink-950" : "border-line-strong text-fg-muted hover:border-signal/30 hover:text-fg",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-signal shadow-[0_0_30px_-6px_rgb(67_226_255/0.7)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative font-medium">{c.label}</span>
                  <span className={cn("relative font-mono text-[0.7rem]", active ? "text-ink-950/70" : "text-fg-subtle")}>{count(c.id)}</span>
                </button>
              );
            })}
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
          </p>
          <motion.ul layout className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((p) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.6, ease: ease.outExpo }}
                  className="h-full"
                >
                  <ProjectCard project={p} onOpen={onOpen} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>

      <ProjectModal project={open} onClose={onClose} />
    </section>
  );
}
