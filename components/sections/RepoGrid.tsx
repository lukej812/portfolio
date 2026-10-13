"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, GitFork, Star } from "lucide-react";

import type { Repo } from "@/content/github";
import { ease, viewportOnce } from "@/lib/motion";
import { trackSpotlight } from "@/lib/spotlight";

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#663399",
  R: "#198CE7",
  Jupyter: "#DA5B0B",
};

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export function RepoGrid({ repos }: { repos: Repo[] }) {
  return (
    <motion.ul
      className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      {repos.map((repo) => (
        <motion.li
          key={repo.fullName}
          className="min-w-0"
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.outExpo } },
          }}
        >
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            onPointerMove={trackSpotlight}
            className="glass spotlight group flex h-full flex-col rounded-3xl p-6 transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgb(67_226_255/0.6)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate font-mono text-xs text-fg-subtle">{repo.fullName}</p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{repo.name}</h3>
              </div>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-all duration-300 group-hover:border-signal/50 group-hover:text-signal">
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
            {repo.note && (
              <span className="mt-3 w-fit rounded-full border border-pulse/30 bg-pulse/10 px-2.5 py-0.5 text-[0.7rem] text-[#b5a9ff]">
                {repo.note}
              </span>
            )}
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-fg-muted">
              {repo.description || "No description yet."}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6 text-xs text-fg-subtle">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full" style={{ background: languageColors[repo.language] ?? "#a3aebd" }} aria-hidden />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1" title="Stars">
                <Star className="size-3.5" aria-hidden />
                <span className="sr-only">Stars:</span>
                {repo.stars}
              </span>
              <span className="flex items-center gap-1" title="Forks">
                <GitFork className="size-3.5" aria-hidden />
                <span className="sr-only">Forks:</span>
                {repo.forks}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden />
                Updated {dateFmt.format(new Date(repo.updatedAt))}
              </span>
            </div>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
