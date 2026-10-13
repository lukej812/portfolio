import "server-only";

import {
  GITHUB_USERNAME,
  extraRepos,
  fallbackRepos,
  featuredRepos,
  hiddenRepos,
  repoOverrides,
  type Repo,
} from "@/content/github";

type ApiRepo = {
  full_name: string;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  updated_at: string;
  html_url: string;
  fork: boolean;
  private: boolean;
  archived: boolean;
};

const REVALIDATE_SECONDS = 3600;

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: headers(),
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

function toRepo(r: ApiRepo): Repo {
  return {
    fullName: r.full_name,
    name: r.name,
    description: r.description ?? "",
    language: r.language,
    stars: r.stargazers_count,
    forks: r.forks_count,
    updatedAt: r.pushed_at || r.updated_at,
    url: r.html_url,
  };
}

const lower = (s: string) => s.toLowerCase();

/** Applies hide rules, overrides, and featured ordering */
function shape(repos: Repo[]): Repo[] {
  const hidden = new Set(hiddenRepos.map(lower));
  const featured = featuredRepos.map(lower);
  const seen = new Set<string>();

  const cleaned = repos
    .filter((r) => {
      const key = lower(r.fullName);
      if (hidden.has(key) || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((r) => {
      const o = repoOverrides[r.fullName] ??
        Object.entries(repoOverrides).find(([k]) => lower(k) === lower(r.fullName))?.[1];
      return {
        ...r,
        name: o?.name ?? r.name,
        description: o?.description || r.description || "",
        note: o?.note,
      };
    });

  const rank = (r: Repo) => {
    const i = featured.indexOf(lower(r.fullName));
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };

  return cleaned.sort((a, b) => {
    const diff = rank(a) - rank(b);
    if (diff !== 0) return diff;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export async function getRepos(): Promise<{ repos: Repo[]; live: boolean }> {
  try {
    const [own, ...extra] = await Promise.all([
      getJson<ApiRepo[]>(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&type=owner`),
      ...extraRepos.map((name) =>
        getJson<ApiRepo>(`https://api.github.com/repos/${name}`).catch(() => null),
      ),
    ]);

    const ownRepos = own.filter((r) => !r.private && !r.fork && !r.archived).map(toRepo);
    const extraList = extra.filter((r): r is ApiRepo => !!r && !r.private).map(toRepo);

    // Keep a team repo even if its single fetch failed
    const missingExtras = fallbackRepos.filter(
      (f) =>
        extraRepos.some((e) => lower(e) === lower(f.fullName)) &&
        !extraList.some((r) => lower(r.fullName) === lower(f.fullName)),
    );

    return { repos: shape([...ownRepos, ...extraList, ...missingExtras]), live: true };
  } catch (error) {
    console.warn("[github] falling back to static repo data:", (error as Error).message);
    return { repos: shape(fallbackRepos), live: false };
  }
}
