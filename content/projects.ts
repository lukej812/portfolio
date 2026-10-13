/**
 * Project showcase. Order here is the order on the page.
 *
 * - `categories` drives the filter (a project can live in more than one).
 * - `tags` are the skill chips on each card.
 * - `accent` / `accent2` color the card glow and the styled preview.
 * - `preview` picks which abstract mockup to draw (see components/projects/ProjectPreview.tsx).
 * - Any string starting with "[ADD:" is a placeholder.
 */

export type Category = "ai" | "product" | "data" | "business" | "campus";
export type SkillTag = "Product" | "Data" | "AI" | "Business Tech" | "Development";
export type StatusTone = "live" | "progress" | "prototype" | "complete";
export type PreviewKind =
  | "spec"
  | "outage"
  | "resume"
  | "atelier"
  | "registration"
  | "injection"
  | "fifa"
  | "health"
  | "portal"
  | "aqua"
  | "wavelength"
  | "broke";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  categories: Category[];
  tags: SkillTag[];
  status: string;
  statusTone: StatusTone;
  timeframe?: string;
  role?: string;
  problem?: string;
  summary: string;
  features?: string[];
  tech: string[];
  ai?: string;
  whyItMatters: string;
  note?: string;
  links: { label: string; href: string }[];
  accent: string;
  accent2: string;
  preview: PreviewKind;
};

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & Experiments" },
  { id: "product", label: "Product & UX" },
  { id: "data", label: "Data & Analytics" },
  { id: "business", label: "Business & Community" },
  { id: "campus", label: "College & Campus" },
];

export const projects: Project[] = [
  {
    slug: "spec-writer",
    title: "Spec Writer",
    tagline: "Turns messy product input into a structured PRD",
    categories: ["ai", "product"],
    tags: ["AI", "Product", "Development"],
    status: "Prototype",
    statusTone: "prototype",
    timeframe: "Runs locally",
    role: "Solo builder: product, design, and code",
    problem:
      "Product ideas live in meeting notes, Slack threads, and transcripts. Turning them into a clear spec takes time and often skips the hard questions.",
    summary:
      "Paste in raw notes and get a PRD back: problem statement, solution, scope, user stories, success metrics, edge cases, open questions, and stated assumptions. If the input is too vague, it asks two or three clarifying questions instead of making things up.",
    features: [
      "Full PRD generation from unstructured notes or transcripts",
      "Asks clarifying questions when the input is too thin, instead of guessing",
      "\"Poke Holes\" mode: Claude red-teams the spec for weak assumptions, missing edge cases, likely reviewer questions, and scope creep",
      "Exports to Markdown or Notion-ready text",
    ],
    tech: ["React 18", "Vite", "Tailwind", "FastAPI", "Anthropic Python SDK", "GitHub Actions CI"],
    ai: "Claude tool use with forced tools (submit_prd, submit_critique), so every response comes back as reliable, structured JSON.",
    whyItMatters:
      "It shows PM thinking and AI building in the same product. It's the tool I'd want as a PM.",
    links: [
      { label: "View repo", href: "https://github.com/lukej812/spec-writer-" },
      { label: "Live demo", href: "[ADD: live link if deployed]" },
    ],
    accent: "#43e2ff",
    accent2: "#4f7dff",
    preview: "spec",
  },
  {
    slug: "wavelength",
    title: "Wavelength",
    tagline: "A social app for incoming college freshmen",
    categories: ["campus", "ai", "product"],
    tags: ["Product", "AI", "Development"],
    status: "Submitted to the App Store",
    statusTone: "progress",
    timeframe: "Capstone project",
    role: "PM Lead and co-developer",
    problem:
      "Starting college means finding your people from scratch, usually before you know anyone or anything about campus.",
    summary:
      "Wavelength started as a capstone project and grew into a mobile app that helps incoming freshmen connect. An LLM-powered recommendation engine suggests group activities, and the product was shaped through usability testing in INFO 490.",
    features: [
      "LLM-powered group activity recommendation engine",
      "Prompt engineering for structured, predictable LLM output",
      "Usability testing in INFO 490",
      "Led product direction as PM while co-developing the app",
    ],
    tech: ["React Native", "Expo", "React Navigation", "Supabase", "LLM integration"],
    ai: "Prompt-engineered structured output so the recommendation engine returns data the app can render reliably.",
    whyItMatters:
      "It's the project where I owned both the product decisions and real code on a team, from capstone idea to App Store submission.",
    note: "Shared team repo. Described at a high level out of respect for the team's request not to copy the code.",
    links: [
      { label: "Team repo", href: "https://github.com/fruitSalad266/wavelength" },
      { label: "App Store", href: "[ADD: App Store status or link]" },
    ],
    accent: "#8f7dff",
    accent2: "#43e2ff",
    preview: "wavelength",
  },
  {
    slug: "broketogether",
    title: "BrokeTogether",
    tagline: "Split shared costs without the awkward spreadsheet",
    categories: ["campus", "product"],
    tags: ["Product", "Development", "Data"],
    status: "Live",
    statusTone: "live",
    timeframe: "Apr to Jun 2025",
    role: "Product Lead and full-stack developer",
    problem:
      "Splitting rent, groceries, and trips between friends usually means a shared spreadsheet nobody updates and awkward reminders.",
    summary:
      "A budgeting tool that helps groups split shared costs and see who owes what in real time. I led the product from user interviews to launch and worked across the full stack.",
    features: [
      "Turned 12 user interviews into a prioritized roadmap",
      "Cut average time to split expenses by about 36%",
      "Real-time Firebase sync updates shared balances in under 2 seconds",
      "Usability testing raised first-time setup success from about 50% to about 63%",
      "Shipped to 22 student users",
    ],
    tech: ["React", "JavaScript", "Firebase", "HTML/CSS"],
    whyItMatters:
      "It's a full loop: research, roadmap, build, test, and measurable improvement with real users.",
    links: [{ label: "Live product", href: "https://info340b-sp25.github.io/project-JohnJinHM/" }],
    accent: "#b6f24a",
    accent2: "#2fd9a9",
    preview: "broke",
  },
  {
    slug: "outage-response",
    title: "Autonomous Outage Response System",
    tagline: "Triages production outages before the on-call engineer opens their laptop",
    categories: ["ai"],
    tags: ["AI", "Development", "Business Tech"],
    status: "Prototype",
    statusTone: "prototype",
    timeframe: "Runs locally, 29-test pytest suite",
    role: "Solo builder: workflow design and code",
    problem:
      "When an alert fires, on-call engineers lose critical minutes figuring out what broke, which runbook applies, and who's affected.",
    summary:
      "Receives an alert by webhook, scores recent git commits to find the likely culprit, finds the matching runbook with TF-IDF similarity search, estimates user impact, and posts a brief to Slack (or saves Markdown). Once the incident is resolved, it generates a postmortem.",
    features: [
      "Webhook alert intake",
      "Commit scoring to surface the likely culprit",
      "Runbook matching with TF-IDF similarity search",
      "User impact estimation",
      "Slack brief or Markdown output, plus an auto-generated postmortem",
      "29-test pytest suite",
    ],
    tech: ["Python", "FastAPI", "SQLite", "TF-IDF (scikit-learn style)", "Slack integration", "pytest"],
    ai: "Claude tool use for impact estimation, with an offline fallback so the whole system runs with no API key.",
    whyItMatters:
      "It shows I can think through an operational workflow end to end and build AI into it responsibly, with tests and fallbacks.",
    links: [{ label: "View repo", href: "https://github.com/lukej812/Autonomous-outage-response-system" }],
    accent: "#ffb547",
    accent2: "#ff6b81",
    preview: "outage",
  },
  {
    slug: "school-registration",
    title: "School Registration System Redesign",
    tagline: "Running a full product lifecycle, from discovery to stakeholder handoff",
    categories: ["product"],
    tags: ["Product", "Business Tech"],
    status: "Completed",
    statusTone: "complete",
    timeframe: "Course project",
    role: "Product Manager and UX Lead",
    problem:
      "A redesign is only as good as the research behind it and the handoff after it. The goal was to ground every decision in what students actually needed, then hand off something stakeholders could act on.",
    summary:
      "This project is about the process more than the screens. I owned the product lifecycle from discovery through stakeholder handoff, and ran the project and product wiki in Azure DevOps so the whole team worked from one source of truth.",
    features: [
      "Owned the full lifecycle, from discovery to stakeholder handoff",
      "Ran 20+ student interviews and usability tests",
      "Defined requirements, user stories, and acceptance criteria",
      "Built and iterated on Figma prototypes",
      "Ran the project and product wiki in Azure DevOps",
    ],
    tech: ["Figma", "Miro", "Azure DevOps", "User testing"],
    whyItMatters:
      "It's the clearest example of how I run a product process end to end, not just how I design a screen.",
    links: [
      {
        label: "Read the wiki",
        href: "https://dev.azure.com/luke812/school%20registration%20system%20redesign/_wiki/wikis/school-registration-system-redesign.wiki/1/Executive-Summary",
      },
    ],
    accent: "#4f7dff",
    accent2: "#43e2ff",
    preview: "registration",
  },
  {
    slug: "prompt-injection",
    title: "Prompt Injection in Conversational AI",
    tagline: "How attackers hijack enterprise AI assistants, and how to defend them",
    categories: ["ai", "data"],
    tags: ["AI", "Data"],
    status: "Research paper",
    statusTone: "complete",
    timeframe: "Fall 2025, INFO 415",
    role: "Co-author, with 3 classmates",
    problem:
      "Enterprise AI assistants read emails, documents, and web pages, and any of that text can carry instructions an attacker planted.",
    summary:
      "A research paper combining case studies of real systems with a meta-analysis of the academic literature on prompt injection attacks and defenses.",
    features: [
      "Case studies of 4 real systems (Lenovo LENA, Google Gemini, Microsoft Copilot Studio, EchoLeak) with visual threat models",
      "Meta-analysis of 20 papers from USENIX, ACM, IEEE, and arXiv",
      "Found the field shifted from about 63% attack-focused (2023 to 2024) to about 83% defense-focused (2025)",
      "Context Boundary Weakness was the most common root cause, in 30% of papers",
      "Findings mapped to the OWASP LLM Top 10 and NIST AI RMF",
    ],
    tech: ["Threat modeling", "Literature meta-analysis", "OWASP LLM Top 10", "NIST AI RMF"],
    whyItMatters: "I want to build AI products, so I need to understand how they break.",
    links: [
      {
        label: "Read the paper",
        href: "https://drive.google.com/file/d/1zZ5ROCMUmYCfwTby_TnhCeZr9UwfOlvX/view?usp=sharing",
      },
    ],
    accent: "#ff6b81",
    accent2: "#8f7dff",
    preview: "injection",
  },
  {
    slug: "fifa-world-cup",
    title: "FIFA World Cup Data Analysis",
    tagline: "What 84 years of World Cup data says about goals, crowds, and cost",
    categories: ["data"],
    tags: ["Data"],
    status: "Completed",
    statusTone: "complete",
    timeframe: "Aug 2024, team of 5",
    role: "Team member, team of 5",
    summary:
      "An analysis of World Cup data from 1930 to 2014, built by merging three Kaggle datasets on MatchID in R and imputing missing attendance before any chart got made.",
    features: [
      "Merged 3 Kaggle datasets on MatchID and imputed missing attendance",
      "Goals per game fell from a 5.38 peak (1954) to 2.67 (2014) while attendance trended up",
      "Brazil 2014 cost about $15B against about $4.2B in revenue, a roughly $10.8B loss, despite 52,918 average attendance",
      "Germany scored 18 goals with 6 wins in 2014, including the 7-1 semifinal",
    ],
    tech: ["R", "tidyverse", "ggplot2"],
    whyItMatters:
      "Most of the real work in analysis is cleaning and joining messy data. This project was a crash course in doing that well, then telling a clear story with it.",
    links: [
      {
        label: "View presentation",
        href: "https://drive.google.com/file/d/1uGh4ZjfVi_cyVMwEBVb0EfL3qj1dw7wG/view?usp=sharing",
      },
    ],
    accent: "#2fd9a9",
    accent2: "#b6f24a",
    preview: "fifa",
  },
  {
    slug: "ai-resume-tracker",
    title: "AI Resume Tracker",
    tagline: "Instant AI feedback on your resume",
    categories: ["ai"],
    tags: ["AI", "Development"],
    status: "Live",
    statusTone: "live",
    role: "[ADD: your role]",
    summary:
      "Upload a resume and get feedback on its quality and clarity, with specific, actionable suggestions to strengthen it.",
    tech: ["React", "JavaScript", "HTML/CSS", "LLM integration"],
    ai: "An LLM reviews the resume and returns targeted suggestions instead of generic advice.",
    whyItMatters: "Built for students and job seekers trying to stand out.",
    links: [{ label: "Try it live", href: "https://puter.com/app/rkn-ai-resume-tracker" }],
    accent: "#2fd9a9",
    accent2: "#43e2ff",
    preview: "resume",
  },
  {
    slug: "atelier",
    title: "Atelier",
    tagline: "A values-driven virtual wardrobe",
    categories: ["ai", "product"],
    tags: ["AI", "Product", "Development"],
    status: "Class project",
    statusTone: "complete",
    timeframe: "INFO 110A",
    role: "[ADD: your role]",
    summary:
      "Atelier recommends outfits from clothes you already own. It recognizes garments with Claude's vision API and includes an AI stylist feature.",
    features: ["AI garment recognition with Claude's vision API", "AI stylist that builds outfits from your own closet"],
    tech: ["React", "Claude vision API"],
    ai: "Claude's vision API identifies garments from photos to fill in the wardrobe.",
    whyItMatters:
      "It encourages wearing what you have instead of buying more, and it ties into my interest in fashion.",
    links: [{ label: "View project", href: "[ADD: link if available]" }],
    accent: "#ffb547",
    accent2: "#8f7dff",
    preview: "atelier",
  },
  {
    slug: "a4e-ai-portal",
    title: "A4E AI Portal",
    tagline: "Free AI education for people changing careers",
    categories: ["business"],
    tags: ["Business Tech", "AI", "Product"],
    status: "[ADD: status]",
    statusTone: "progress",
    role: "[ADD: what I built or contributed]. I also created the launch social posts for LinkedIn, Meta, and X.",
    summary:
      "Americans4Equality's AI education portal. All A4E WARP courses are free, and about 90% of the courses in the external resource hub are free too.",
    tech: ["[ADD: tools or stack]"],
    whyItMatters: "It makes AI education accessible to people who are trying to change careers.",
    note: "The repo is private, so there's no public link.",
    links: [],
    accent: "#4f7dff",
    accent2: "#ffb547",
    preview: "portal",
  },
  {
    slug: "tabs-aquaquest",
    title: "Tabs AquaQuest Diving Website",
    tagline: "A new marketing site for a small scuba diving business",
    categories: ["business"],
    tags: ["Business Tech", "Development"],
    status: "In progress",
    statusTone: "progress",
    role: "[ADD: your role]",
    summary:
      "A new marketing site for my sister's scuba diving business in the Jacksonville, FL area, replacing her current Wix site. Booking stays on her existing pages for v1.",
    tech: ["[ADD: stack]"],
    whyItMatters: "A real small-business client with real constraints.",
    links: [{ label: "View repo", href: "https://github.com/lukej812/TabsAqua-website-redesign" }],
    accent: "#43e2ff",
    accent2: "#2fd9a9",
    preview: "aqua",
  },
  {
    slug: "global-health-dashboard",
    title: "Global Health & Economics Dashboard",
    tagline: "Health and economic indicators across 118 countries",
    categories: ["data"],
    tags: ["Data"],
    status: "Completed",
    statusTone: "complete",
    timeframe: "[ADD: course name]",
    summary:
      "A Tableau analysis of a global health and economics dataset covering World Bank style indicators across 118 countries.",
    features: ["[ADD: key finding]"],
    tech: ["Tableau"],
    whyItMatters:
      "Practice turning a wide, many-indicator dataset into a dashboard someone can read in a minute.",
    links: [{ label: "View dashboard", href: "[ADD: link]" }],
    accent: "#2fd9a9",
    accent2: "#4f7dff",
    preview: "health",
  },
];
