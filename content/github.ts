/**
 * GitHub section config ("Open Source & Builds").
 *
 * The username can be overridden with NEXT_PUBLIC_GITHUB_USERNAME.
 * Repos are fetched live from the GitHub API at build time and refreshed
 * hourly. If the API is down or rate-limited, `fallbackRepos` is used.
 */

export const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "lukej812";

/** Shown first, in this order */
export const featuredRepos = [
  "lukej812/Autonomous-outage-response-system",
  "lukej812/spec-writer-",
  "lukej812/TabsAqua-website-redesign",
  "fruitSalad266/wavelength",
];

/** Repos outside my account to include (shared team repos I contributed to) */
export const extraRepos = ["fruitSalad266/wavelength"];

/** Never shown, even if public */
export const hiddenRepos = ["lukej812/a4e-web"];

/** Friendlier names and descriptions. An override description wins over the one on GitHub. */
export const repoOverrides: Record<string, { name?: string; description?: string; note?: string }> = {
  "lukej812/Autonomous-outage-response-system": {
    name: "Autonomous Outage Response",
    description:
      "Triages production outages before the on-call engineer opens their laptop. Scores commits, matches runbooks, estimates impact, and posts a brief to Slack.",
  },
  "lukej812/spec-writer-": {
    name: "Spec Writer",
    description:
      "Turns messy product input into a structured PRD, with a red-team \"Poke Holes\" mode powered by Claude tool use.",
  },
  "lukej812/TabsAqua-website-redesign": {
    name: "Tabs AquaQuest Website",
    description:
      "A new marketing site for my sister's scuba diving business in the Jacksonville, FL area, replacing her Wix site.",
  },
  "fruitSalad266/wavelength": {
    name: "Wavelength",
    description: "A social app for incoming college freshmen, with LLM-powered group activity recommendations.",
    note: "Team repo",
  },
  "lukej812/portfolio": {
    name: "This portfolio",
    description: "The site you're on. Next.js, TypeScript, Tailwind, and Framer Motion, built with Claude Code.",
  },
};

export type Repo = {
  fullName: string;
  name: string;
  description: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
  note?: string;
};

/** Snapshot used when the live API isn't reachable. Last synced Oct 2026. */
export const fallbackRepos: Repo[] = [
  {
    fullName: "lukej812/Autonomous-outage-response-system",
    name: "Autonomous-outage-response-system",
    description: "",
    language: "Python",
    stars: 0,
    forks: 0,
    updatedAt: "2026-07-24T00:59:30Z",
    url: "https://github.com/lukej812/Autonomous-outage-response-system",
  },
  {
    fullName: "lukej812/spec-writer-",
    name: "spec-writer-",
    description: "",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: "2026-07-24T21:03:14Z",
    url: "https://github.com/lukej812/spec-writer-",
  },
  {
    fullName: "lukej812/TabsAqua-website-redesign",
    name: "TabsAqua-website-redesign",
    description: "",
    language: null,
    stars: 0,
    forks: 0,
    updatedAt: "2026-10-12T00:51:11Z",
    url: "https://github.com/lukej812/TabsAqua-website-redesign",
  },
  {
    fullName: "fruitSalad266/wavelength",
    name: "wavelength",
    description: "Stealth social app",
    language: "JavaScript",
    stars: 0,
    forks: 0,
    updatedAt: "2026-05-31T08:33:16Z",
    url: "https://github.com/fruitSalad266/wavelength",
  },
];
