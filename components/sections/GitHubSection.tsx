import { RepoGrid } from "@/components/sections/RepoGrid";
import { GitHubIcon } from "@/components/ui/Icons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GITHUB_USERNAME } from "@/content/github";
import { getRepos } from "@/lib/github";

/** Server component: fetches repos (cached for an hour), then hands off to the animated grid */
export async function GitHubSection() {
  const { repos, live } = await getRepos();

  return (
    <section id="github" aria-labelledby="github-title" className="relative py-24 md:py-32">
      <div aria-hidden className="grid-backdrop absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="github-title"
            label="Open Source & Builds"
            title="The code behind the work."
            intro="My public repos, pulled live from GitHub, plus a team repo I contributed to."
          />
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <MagneticButton
              href={`https://github.com/${GITHUB_USERNAME}`}
              variant="secondary"
              icon={<GitHubIcon className="size-4" />}
            >
              @{GITHUB_USERNAME}
            </MagneticButton>
            <p className="flex items-center gap-2 text-xs text-fg-subtle">
              <span className={live ? "size-1.5 rounded-full bg-ion animate-pulse-soft" : "size-1.5 rounded-full bg-fg-subtle"} aria-hidden />
              {live ? "Live from the GitHub API" : "Showing a saved snapshot (GitHub API unavailable)"}
            </p>
          </div>
        </div>

        <RepoGrid repos={repos} />
      </div>
    </section>
  );
}
