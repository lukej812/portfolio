"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PointerEvent } from "react";

import { categories, type Project } from "@/content/projects";
import { ease, springs } from "@/lib/motion";
import { trackSpotlight } from "@/lib/spotlight";

import { tagColors } from "./meta";
import { ProjectPreview } from "./ProjectPreview";
import { StatusPill } from "./StatusPill";

type Props = { project: Project; onOpen: (project: Project, trigger: HTMLElement) => void };

/** Lifts, glows, and tilts toward the cursor. Opens the detail modal. */
export function ProjectCard({ project, onOpen }: Props) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, springs.tilt);
  const rotateY = useSpring(ry, springs.tilt);
  const category = categories.find((c) => c.id === project.categories[0])?.label;

  function onMove(e: PointerEvent<HTMLElement>) {
    trackSpotlight(e);
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * 7);
    ry.set((px - 0.5) * 9);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: ease.outExpo }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, ["--accent" as string]: project.accent }}
      className="glass spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl transition-[translate,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_80px_-36px_var(--accent)]"
    >
      <ProjectPreview project={project} className="aspect-[16/10] w-full border-b border-line" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="label text-[0.66rem]" style={{ color: project.accent }}>
            {category}
          </span>
          <StatusPill status={project.status} tone={project.statusTone} />
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
          <button
            type="button"
            onClick={(e) => onOpen(project, e.currentTarget)}
            aria-haspopup="dialog"
            className="text-left after:absolute after:inset-0 after:z-10 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-signal"
          >
            {project.title}
          </button>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{project.tagline}</p>

        <motion.ul
          className="mt-5 flex flex-wrap gap-1.5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
        >
          {project.tags.map((tag) => (
            <motion.li
              key={tag}
              variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
              className="rounded-full border px-2.5 py-1 text-[0.7rem] font-medium"
              style={{
                color: tagColors[tag],
                borderColor: `color-mix(in oklab, ${tagColors[tag]} 30%, transparent)`,
                background: `color-mix(in oklab, ${tagColors[tag]} 8%, transparent)`,
              }}
            >
              {tag}
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-auto flex items-center gap-1.5 pt-6 text-sm text-fg-muted transition-colors duration-300 group-hover:text-fg">
          View details
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </motion.article>
  );
}
