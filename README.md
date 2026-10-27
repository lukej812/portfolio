# Luke Johnson | Portfolio

Personal portfolio for Luke Johnson, an AI-forward product, data, and business-tech builder in Seattle.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS 4**, and **Framer Motion**. Ready to deploy on Vercel.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run build`     | Production build                          |
| `npm run start`     | Serve the production build locally        |
| `npm run lint`      | ESLint (Next.js core web vitals + TS)     |
| `npm run typecheck` | TypeScript, no emit                       |

Requires Node 20.9 or newer.

---

## Editing content

All copy lives in `content/`. You should rarely need to touch a component.

| File                     | What's in it                                                                      |
| ------------------------ | --------------------------------------------------------------------------------- |
| `content/site.ts`        | Name, links, SEO, nav, hero, About, hobbies, statements, testimonials, contact |
| `public/Luke_Johnson_Resume.pdf` | The resume behind every Resume button. Replace the file (same name) to update it. |
| `content/projects.ts`    | Every project card and its detail modal, plus the category filter                 |
| `content/work.ts`        | Work samples: each internship or externship, its steps, and the linked documents  |
| `content/experience.ts`  | Timeline entries, education, and count-up metrics                                 |
| `content/skills.ts`      | Skill groups and tags                                                             |
| `content/workflow.ts`    | The "From idea to product, with AI" steps and their examples                      |
| `content/github.ts`      | **GitHub username**, featured/hidden repos, description overrides, offline fallback |

House style: **no em dashes anywhere.** Use commas, periods, or parentheses.

### Placeholders

Anything unknown is written as `[ADD: description]`, for example `"[ADD: App Store status or link]"`.

- In `npm run dev`, placeholders render as dashed amber chips so they're easy to find.
- In production builds they're hidden automatically. A bullet, date, link, or testimonial that is only a placeholder is dropped, and a mixed string like `"Dec 2025 to [ADD: end date]"` becomes `"Dec 2025"`.
- The Testimonials section only appears once at least one real quote exists.
- To preview placeholders in a production build, set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`.

Find every open placeholder with:

```bash
grep -rn "\[ADD:" content
```

### Adding a project

Add an object to the `projects` array in `content/projects.ts`. The fields are typed, so your editor will tell you what's required. Pick a `preview` style from the existing ones (`spec`, `outage`, `resume`, `atelier`, `registration`, `injection`, `fifa`, `health`, `portal`, `aqua`, `wavelength`, `broke`, `nudge`) or add a new case in `components/projects/ProjectPreview.tsx`. Set `accent` and `accent2` to give the card its own colors.

A link whose `href` starts with `/` (like `/work/bereal`) opens in place; anything else opens in a new tab.

### Work samples

`content/work.ts` powers the "Work samples" section and one page per entry at `/work/[slug]`, modeled on Extern's portfolio: the role and dates up top, highlights, an overview, then the work grouped into steps with every document linked.

- Add a case study by adding an object to `caseStudies`. Its page, sitemap entry, and homepage card are generated from it.
- Each deliverable's `href` is its Google Drive share link. **Share the file as "Anyone with the link can view"**, or visitors land on a request-access page.
- Leave `href` out for documents that can't be public (internal org work). The card then reads "Available on request" and points to the contact form.
- Set `illustrative: true` on documents built on example data rather than real research results. They get a visible "Illustrative" tag.
- Set `caseStudy: "<slug>"` on an entry in `content/experience.ts` to add a "See the work" link to its timeline card.

### GitHub section

`content/github.ts` controls "Open Source & Builds":

- `GITHUB_USERNAME`: defaults to `lukej812`, or set `NEXT_PUBLIC_GITHUB_USERNAME`.
- `featuredRepos`: shown first, in order.
- `extraRepos`: repos outside the account to include (the Wavelength team repo).
- `hiddenRepos`: never shown (`a4e-web`).
- `repoOverrides`: friendlier names and descriptions. These win over GitHub's own description.
- `fallbackRepos`: a saved snapshot used if the GitHub API is down or rate-limited.

Repos are fetched on the server at build time and refreshed at most once an hour, so visitors never hit GitHub's rate limit. Add a `GITHUB_TOKEN` (no scopes needed) to raise the limit for builds.

### Contact form

With no configuration, the form opens the visitor's email app with the message pre-filled. To send messages straight to your inbox instead, create a free [Formspree](https://formspree.io) form and set `NEXT_PUBLIC_FORM_ENDPOINT` to its URL. If that request ever fails, the form falls back to email.

---

## Deploying to Vercel

1. Push this repo to GitHub (already done if you're reading this there).
2. Go to [vercel.com/new](https://vercel.com/new) and import `lukej812/portfolio`. Vercel detects Next.js automatically; keep the default build settings.
3. Optional: under **Settings > Environment Variables**, add any of the variables below.
4. Click **Deploy**. Every push to `main` redeploys; every other branch gets a preview URL.
5. Optional: add a custom domain under **Settings > Domains**, then set `NEXT_PUBLIC_SITE_URL` to it so Open Graph tags and the sitemap use the right URL.

### Environment variables

All optional. See `.env.example`.

| Variable                        | Purpose                                                                 |
| ------------------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Canonical URL for SEO and OG tags. Falls back to the Vercel domain.     |
| `NEXT_PUBLIC_GITHUB_USERNAME`   | Override the GitHub account shown in the GitHub section.                |
| `GITHUB_TOKEN`                  | Raises the GitHub API rate limit at build time. Server-only.            |
| `NEXT_PUBLIC_FORM_ENDPOINT`     | Formspree (or similar) endpoint for the contact form.                   |
| `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | `true` to show `[ADD: ...]` placeholders in production.                 |

---

## Design system

**Direction:** dark, premium, and technical, with energy and momentum. Original palette and layout; the mood was inspired by AI and energy-tech sites, without copying any of them.

### Palette (`app/globals.css`, `@theme`)

| Token          | Value     | Use                                    |
| -------------- | --------- | -------------------------------------- |
| `ink-950`      | `#05070b` | Page background                        |
| `ink-900/850/800` | `#090d13` to `#121924` | Surfaces and panels   |
| `fg`           | `#edf2f7` | Primary text                           |
| `fg-muted`     | `#a3aebd` | Body copy                              |
| `fg-subtle`    | `#6f7b8d` | Labels and metadata                    |
| `signal`       | `#43e2ff` | Primary accent (electric cyan)         |
| `volt`         | `#4f7dff` | Secondary accent (electric blue)       |
| `ion`          | `#2fd9a9` | Tertiary accent (teal), "live" states  |
| `flare`        | `#ffb547` | The one warm highlight (amber)         |
| `pulse`, `alert` | `#8f7dff`, `#ff6b81` | Used sparingly in previews  |

Violet is deliberately a minor accent to avoid the generic purple-gradient SaaS look.

### Type

- **Display:** Sora (600 to 700), tight tracking. **Body:** Geist. **Labels:** Geist Mono, uppercase, wide tracking.
- Fluid scale with `clamp()`: `text-display` (hero name), `text-h1` (statements), `text-h2` (section titles), `text-h3`, `text-lead`, `label`.

### Motion principles

- One easing family: fast out, soft landing (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Reveals combine a fade and a short rise, staggered 50 to 80ms. No blur filters in motion: they repaint every frame.
- The hero entrance is plain CSS, so it plays on first paint instead of waiting for JavaScript.
- Scroll drives the big moments: statements light up word by word, the workflow beam and the experience timeline fill as you scroll.
- Hover is quick and subtle: magnetic buttons, card tilt and spotlight glow, arrows that nudge.
- **Reduced motion:** Framer Motion runs with `reducedMotion="user"`, CSS animations are disabled, the hero canvas draws a single still frame, and scroll-linked text stays fully visible.

### Performance guardrails

These came out of profiling (Lighthouse plus frame-time measurements). Keep them when adding features.

- **No `backdrop-filter` on cards.** `.glass` is a translucent surface only. Add `.glass-blur` just where something busy sits behind (the nav, the modal overlay). Blur on ~50 cards was the main cause of scroll jank.
- **Glows are `radial-gradient` backgrounds, not `blur()` filters.** Same look, nearly free to paint.
- **Animate only `transform` and `opacity`.** Anything else (`top`, `left`, `filter`) forces layout or repaint every frame.
- **Hero canvas:** capped pixel ratio, 30fps (24 on phones), fewer lines on phones, starts once the browser is idle, pauses offscreen and in background tabs, and draws one still frame for reduced motion.
- **Keep infinite animations rare.** Each one keeps the browser producing frames even when nothing else moves.
- Cursor glow, magnetic pull, and tilt only run for mouse pointers.
- The nav tracks the active section with an IntersectionObserver, not scroll-time layout reads.
- The page is statically generated and revalidated hourly.

Measured on a production build (Lighthouse mobile, simulated slow 4G):

| | Before | After |
| --- | --- | --- |
| Performance score | 64 | 90 to 91 |
| Largest Contentful Paint | 4.3 s | 2.8 to 3.1 s |
| Total Blocking Time | 810 ms | 190 to 280 ms |
| Speed Index | 4.1 s | 1.1 to 1.2 s |
| Desktop scroll (frames over 50 ms) | 14 | 0 |

---

## Project structure

```
app/            layout, page, global styles, OG image, icons, robots, sitemap
  work/[slug]/  one statically generated page per case study
components/
  hero/         Hero, EnergyField (canvas), CursorGlow
  layout/       Navbar, Footer, MotionProvider
  projects/     ProjectCard, ProjectModal, ProjectPreview, StatusPill
  sections/     About, Skills, Workflow, Projects, Work, Experience, GitHub, Testimonials, Contact
  work/         CaseStudyCard, DeliverableCard, DocStack
  ui/           Reveal, SectionHeading, MagneticButton, CountUp, Placeholder, Icons
content/        everything you edit
lib/            GitHub fetcher, placeholder helpers, motion tokens, hooks
```

## Accessibility

- Semantic landmarks, a skip link, labelled sections, and visible focus rings.
- The project modal traps focus, closes on Escape or backdrop click, and returns focus to the card that opened it.
- The mobile menu locks scroll, closes on Escape, and manages focus.
- Animated numbers and split text expose their final values to screen readers.
