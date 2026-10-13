/**
 * Experience timeline, newest first. `metrics` render as animated count-ups,
 * so only put real, sourced numbers there.
 */

export type Metric = { value: number; prefix?: string; suffix?: string; label: string };

export type ExperienceItem = {
  role: string;
  org: string;
  dates: string;
  kind: "work" | "leadership" | "community";
  summary?: string;
  bullets: string[];
  metrics?: Metric[];
};

export const education = {
  school: "University of Washington",
  unit: "Information School",
  degree: "B.S. Informatics, Data Science concentration",
  dates: "Graduated June 2026",
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
      "Support program operations, content creation, outreach, and AI education.",
      "Created launch content for the A4E AI Portal on LinkedIn, Meta, and X.",
      "[ADD: accomplishments or metrics]",
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
    role: "Operational Strategy & People Analytics Extern",
    org: "Amazon",
    dates: "Dec 2025 to [ADD: end date]",
    kind: "work",
    bullets: [
      "Analyzed employee reviews with Python and sentiment analysis to surface themes like burnout, miscommunication, and recognition gaps.",
      "Clustered unstructured text into pain point categories mapped to stages of the employee journey.",
      "Found 10 to 15% bottlenecks in hourly labor allocation and recommended process changes projected to cut downtime by up to 8%.",
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
