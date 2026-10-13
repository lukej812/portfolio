/**
 * Experience timeline, newest first. `metrics` render as animated count-ups,
 * so only put real, sourced numbers there.
 */

export type Metric = { value: number; prefix?: string; suffix?: string; label: string };

export type ExperienceItem = {
  role: string;
  org: string;
  dates: string;
  kind: "work" | "externship" | "leadership" | "community";
  summary?: string;
  bullets: string[];
  metrics?: Metric[];
};

export const education = {
  school: "University of Washington",
  unit: "Information School",
  degree: "B.S. Informatics",
  dates: "Graduated June 2026",
  coursework: [
    "Database & Data Modeling",
    "Product and Information Systems Management",
    "Enterprise Risk Management",
    "Python with Applied Machine Learning",
  ],
};

export const experience: ExperienceItem[] = [
  {
    role: "Program Management Intern",
    org: "Americans4Equality (A4E)",
    dates: "Aug 2026 to present",
    kind: "work",
    summary:
      "A nonprofit that helps people explore AI and technology education to advance their careers or move into new paths.",
    bullets: [
      "Rebuilt the nonprofit's website from zero to production as PM and lead developer, using React 19, TypeScript, Vite, and Cloudflare Pages with GitHub Actions CI/CD.",
      "Designed a centralized TypeScript content system so non-technical staff can update all site copy without touching component code.",
      "Developed a multi-platform social media strategy across Instagram, TikTok, YouTube, and LinkedIn, and introduced Claude-powered content workflows to speed up production.",
      "Built a JotForm student intake and screening system to evaluate program eligibility at scale, and managed all workstreams in Monday.com and Office 365.",
      "Created launch content for the A4E AI Portal on LinkedIn, Meta, and X.",
    ],
  },
  {
    role: "AI Fluency Guide for Intern Groups",
    org: "Americans4Equality (A4E)",
    dates: "[ADD: dates]",
    kind: "work",
    bullets: [
      "Teach and guide interns through AI fluency concepts and certifications, including Anthropic's AI Fluency: Framework & Foundations course.",
      "[ADD: number of interns or sessions]",
    ],
  },
  {
    role: "BeReal Product Management Externship",
    org: "Extern",
    dates: "Jun 2026 to Aug 2026",
    kind: "externship",
    summary:
      "Extern runs project-based externships where students work on real problems from partner companies. This one was a product challenge from BeReal.",
    bullets: [
      "Identified the highest-priority MAU growth feature out of 6 candidates (\"Buddy Nudge\", RICE score 12.8) by mapping a 5-stage user journey from awareness through retention.",
      "Analyzed 4 core retention mechanisms and benchmarked BeReal against TikTok, Instagram, and Snapchat on DAU/MAU and feature differentiation.",
      "Wrote a PM problem statement identifying forced video adoption as the main friction against BeReal's authenticity-first value proposition, validated the feature with structured focus group testing, and delivered a stakeholder pitch with business rationale and an implementation roadmap.",
    ],
    metrics: [
      { value: 6, label: "feature candidates scored with RICE" },
      { value: 3, label: "competitors benchmarked" },
    ],
  },
  {
    role: "Amazon Operational Strategy & People Analytics Externship",
    org: "Extern",
    dates: "Dec 2025 to Feb 2026",
    kind: "externship",
    summary:
      "A project-based externship through Extern, solving a real operations problem posed by Amazon.",
    bullets: [
      "Analyzed employee reviews with Python and sentiment analysis to surface themes like burnout, miscommunication, and recognition gaps.",
      "Clustered unstructured text into pain point categories mapped to stages of the employee journey.",
      "Built an analytical framework in Python and SQL that surfaced 10 to 15% bottlenecks in hourly labor allocation, with recommended process changes projected to cut downtime by up to 8%.",
      "Turned the technical findings into executive-ready recommendations.",
    ],
  },
  {
    role: "House Manager Assistant",
    org: "Tri Delta Housing Corporation",
    dates: "Apr 2023 to Jun 2026",
    kind: "work",
    bullets: [
      "Led a data-informed $100,000 facility renovation using member feedback, increasing member satisfaction by 80%.",
      "Ran weekly feedback reviews that contributed to a 25% increase in recruitment inquiries and retention.",
    ],
    metrics: [
      { value: 100, prefix: "$", suffix: "K", label: "renovation led" },
      { value: 80, suffix: "%", label: "member satisfaction increase" },
    ],
  },
  {
    role: "Internal VP, Secretary, Recruitment Chair, Events Chair",
    org: "Pi Kappa Alpha",
    dates: "Sept 2022 to Jun 2026",
    kind: "leadership",
    bullets: [
      "Two-time elected executive board member over a 60+ member chapter, covering internal affairs, property, scholarship, member experience, alumni relations, and fundraising.",
      "Built an alumni database and streamlined meeting documentation, improving communication and engagement by 27%.",
      "Organized philanthropy for Seattle Children's Hospital, raising over $28,000 across 3 years.",
    ],
    metrics: [
      { value: 28, prefix: "$", suffix: "K+", label: "raised for Seattle Children's" },
      { value: 60, suffix: "+", label: "member chapter" },
    ],
  },
  {
    role: "Event Manager",
    org: "GDPTLQ Co Lam Pagoda",
    dates: "Jan 2017 to Jun 2022",
    kind: "community",
    summary: "Still involved in cultural community events.",
    bullets: [
      "Owned end-to-end delivery of 7 cultural programs a year, from requirements gathering through execution and debrief.",
      "Managed $10,000+ in event resources and improved engagement by 18% through feedback-driven redesigns.",
    ],
    metrics: [
      { value: 7, label: "programs a year" },
      { value: 18, suffix: "%", label: "engagement lift" },
    ],
  },
  {
    role: "Product Management Club, Applied Analytics Club",
    org: "University of Washington",
    dates: "[ADD: dates]",
    kind: "community",
    bullets: ["[ADD: roles or highlights]"],
  },
];
