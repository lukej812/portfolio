/**
 * Skills and tools, grouped. No proficiency percentages on purpose.
 * `icon` is a lucide-react icon name, `accent` is a CSS color.
 */

export type SkillGroup = {
  title: string;
  icon: "Compass" | "ChartColumn" | "Briefcase" | "Bot" | "ShieldCheck" | "PenTool";
  accent: string;
  blurb: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    title: "Product",
    icon: "Compass",
    accent: "var(--color-signal)",
    blurb: "Finding the real problem and deciding what to build first.",
    items: [
      "Product discovery",
      "User research",
      "Roadmapping",
      "Prioritization",
      "Wireframing",
      "Product strategy",
      "AI product thinking",
      "PRDs and user stories",
    ],
  },
  {
    title: "Data",
    icon: "ChartColumn",
    accent: "var(--color-ion)",
    blurb: "Turning messy data into a decision someone can act on.",
    items: [
      "Data analysis",
      "SQL",
      "Python",
      "R",
      "Excel",
      "Tableau",
      "Dashboards",
      "Visualization",
      "Sentiment analysis",
      "Experiment thinking",
    ],
  },
  {
    title: "Business & Program",
    icon: "Briefcase",
    accent: "var(--color-flare)",
    blurb: "Keeping people, plans, and operations moving together.",
    items: [
      "Program management",
      "Stakeholder communication",
      "Operations",
      "Outreach",
      "Process improvement",
      "Project coordination",
    ],
  },
  {
    title: "AI & Building",
    icon: "Bot",
    accent: "var(--color-volt)",
    blurb: "Using AI to go from idea to working prototype, fast.",
    items: [
      "Claude",
      "Claude Code",
      "Anthropic API (tool use, structured output)",
      "Prompt design",
      "AI workflows",
      "Rapid prototyping",
      "AI literacy education",
    ],
  },
  {
    title: "Security & Research",
    icon: "ShieldCheck",
    accent: "var(--color-alert)",
    blurb: "Understanding how AI systems break, so I can build better ones.",
    items: ["LLM security", "Threat modeling", "OWASP LLM Top 10", "NIST AI RMF"],
  },
  {
    title: "Design & Development",
    icon: "PenTool",
    accent: "var(--color-pulse)",
    blurb: "Enough design and code to ship the thing myself.",
    items: [
      "Figma",
      "HTML/CSS",
      "JavaScript/React",
      "React Native/Expo",
      "FastAPI",
      "Firebase",
      "Supabase",
      "Git/GitHub",
      "Azure DevOps",
      "Responsive design",
    ],
  },
];
