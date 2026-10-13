import { ArrowUp } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-display font-semibold">{site.name}</p>
          <p className="mt-1 text-sm text-fg-subtle">
            Built with Next.js, Tailwind, Framer Motion, and Claude Code. {site.location}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-signal/40 hover:text-fg"
          >
            <LinkedInIcon className="size-4" />
            <span className="sr-only">LinkedIn (opens in a new tab)</span>
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-signal/40 hover:text-fg"
          >
            <GitHubIcon className="size-4" />
            <span className="sr-only">GitHub (opens in a new tab)</span>
          </a>
          <a
            href="#home"
            className="group ml-2 flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-fg-muted transition-colors hover:border-signal/40 hover:text-fg"
          >
            Back to top
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
