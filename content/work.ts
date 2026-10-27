/**
 * Work samples: the actual documents behind each internship and externship,
 * organized the way Extern's portfolio does it. Each case study gets its own
 * page at /work/[slug], with the work grouped into steps in the order it was
 * done and every deliverable linked to the original file.
 *
 * - `href` is the Google Drive share link. The file must be shared as
 *   "Anyone with the link can view", or visitors land on a request-access page.
 * - Leave `href` out for work that can't be public (internal org documents).
 *   The card then reads "Available on request" and points to the contact form.
 * - `illustrative: true` labels a document built on example data written for
 *   coursework, so nobody mistakes it for results from a real study.
 * - Order here is the order on the page.
 */

export type DocKind = "doc" | "sheet" | "slides" | "pdf";

export type Deliverable = {
  title: string;
  kind: DocKind;
  description: string;
  href?: string;
  illustrative?: boolean;
};

export type Step = {
  title: string;
  summary: string;
  deliverables: Deliverable[];
};

export type CaseStudy = {
  slug: string;
  org: string;
  /** Short org name, used in titles like "BeReal Product Management Externship" */
  short: string;
  program: string;
  kind: "Externship" | "Internship";
  role: string;
  dates: string;
  /** Platform that verifies the work, shown as a "Verified by ..." badge linking to it (for example Extern) */
  via?: { name: string; href: string };
  tagline: string;
  /** The few skill tags shown on the homepage row */
  tags: string[];
  brief: string;
  challenge: string;
  approach: string;
  outcome: string;
  highlights: { value: string; label: string }[];
  skills: string[];
  tools: string[];
  note?: string;
  accent: string;
  accent2: string;
  steps: Step[];
};

const gdoc = (id: string) => `https://docs.google.com/document/d/${id}/edit?usp=sharing`;
const gsheet = (id: string) => `https://docs.google.com/spreadsheets/d/${id}/edit?usp=sharing`;
const gfile = (id: string) => `https://drive.google.com/file/d/${id}/view?usp=sharing`;

export const kindLabels: Record<DocKind, string> = {
  doc: "Google Doc",
  sheet: "Google Sheet",
  slides: "Google Slides",
  pdf: "PDF",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "bereal",
    org: "BeReal",
    short: "BeReal",
    program: "Product Management Externship",
    kind: "Externship",
    role: "Product Management Extern",
    dates: "Jun 2026 to Aug 2026",
    via: { name: "Extern", href: "https://extern.com/portfolios/luke-johnson" },
    tagline: "From company research to a specced, prototyped, and pitched feature: Buddy Nudge.",
    tags: ["Product Management", "UX Research", "Prototyping"],
    brief:
      "An 8-week, project-based externship through Extern, built around a real brief from BeReal: find a way to grow monthly active users without breaking the app's authenticity-first identity.",
    challenge:
      "BeReal is one unfiltered photo a day inside a two-minute window. That constraint is what makes it feel real, and it's also why people forget, post late, or drift away. Any growth idea had to raise daily engagement without adding the pressure the app was built to remove.",
    approach:
      "I worked through the full PM loop: researched the company and its competitors, mapped the user journey from awareness to retention, framed the problem, scored six feature ideas with RICE, then specced, prototyped, planned a user test for, and pitched the winner.",
    outcome:
      "Buddy Nudge: pair with one friend who can send a single, private, one-tap nudge if you haven't posted yet. Light accountability from someone you know, with no leaderboards, no streak pressure, and no new chat.",
    highlights: [
      { value: "6", label: "feature ideas scored with RICE" },
      { value: "12.8", label: "RICE score for Buddy Nudge, the top pick" },
      { value: "5", label: "journey stages mapped, awareness to retention" },
      { value: "8", label: "high-fidelity prototype screens" },
    ],
    skills: [
      "Company and competitive research",
      "User journey mapping",
      "Problem framing",
      "RICE prioritization",
      "PRD writing",
      "Flow mapping",
      "Prototyping",
      "User test design",
      "Stakeholder pitching",
    ],
    tools: ["Google Docs", "Google Sheets", "Canva"],
    accent: "#43e2ff",
    accent2: "#8f7dff",
    steps: [
      {
        title: "Research the market",
        summary:
          "Compared what delights and frustrates users on BeReal and Instagram, found the standout difference between them, and proposed a product tweak for each.",
        deliverables: [
          {
            title: "Instagram vs. BeReal: Frustration and Delight",
            kind: "doc",
            description:
              "One delight and one frustration for each app, the standout difference between them, and a symmetric product tweak for each.",
            href: gdoc("1JOBHF-wBUKBQLau2n9NbFl2B_MrASKjPRt3e7Iz1AtA"),
          },
        ],
      },
      {
        title: "Map the user journey",
        summary:
          "Followed a user from first hearing about BeReal to building a daily habit, tracking what they do, think, and feel at each stage, and where the experience breaks.",
        deliverables: [
          {
            title: "User Journey Map: Awareness to Retention",
            kind: "sheet",
            description:
              "Five stages (awareness, onboarding, engagement, validation, retention and advocacy), each with actions, thoughts, feelings, touchpoints, and a pain point paired with an opportunity.",
            href: gsheet("1vl-F-tj5qHsX63H8wbBd4MjCHNeRYM5AOWg2B6cdTyI"),
          },
        ],
      },
      {
        title: "Design a new feature",
        summary:
          "Generated six ideas aimed at MAU growth, scored them with RICE, and took the winner from a one-page spec to high-fidelity screens.",
        deliverables: [
          {
            title: "Feature Brainstorm and RICE Scoring",
            kind: "doc",
            description:
              "Six problem, idea, and MAU hypothesis pairs, scored on reach, impact, confidence, and effort. Buddy Nudge ranked first at 12.8, ahead of Streak Freeze at 9.0.",
            href: gdoc("1oJ5eOBwuNOVNrFa4O27CnJHAKxa2JNmhFoR8V4Vo0rg"),
          },
          {
            title: "Buddy Nudge PRD-Lite",
            kind: "doc",
            description:
              "Problem, target user, MAU success metrics, assumptions and non-goals, user stories, acceptance criteria, and the guardrails that keep it true to BeReal.",
            href: gdoc("1ovusY_bivTUdkcY5to73C3MdKtbn2MBkbKd8iryS28s"),
          },
          {
            title: "Prototype Screens",
            kind: "pdf",
            description:
              "High-fidelity mobile screens for the whole flow: intro, choosing a buddy, sending the invite, receiving a nudge, error recovery, and the end-of-day wrap-up.",
            href: gfile("1re4nelXKBGw-_iMt3hHSL6AA1Hd9E26z"),
          },
        ],
      },
      {
        title: "Plan a user test",
        summary: "Designed a focus group to check whether the feature feels authentic and low-pressure to BeReal users.",
        deliverables: [
          {
            title: "Focus Group Plan",
            kind: "doc",
            description:
              "Goal, a seven-person participant mix (frequent, occasional, and non-users), session flow, tools, and the pitfalls to avoid.",
            href: gdoc("15WmZ1Y7Wq6mo9oPyEjlRqiLSULxzuT83rUzFkcyP0Yw"),
          },
        ],
      },
    ],
  },
  {
    slug: "americans4equality",
    org: "Americans4Equality (A4E)",
    short: "A4E",
    program: "Program Management Internship",
    kind: "Internship",
    role: "Program Management Intern",
    dates: "Aug 2026 to Nov 2026",
    tagline: "Research, strategy, and operations work for a nonprofit closing the AI skills gap.",
    tags: ["Program Management", "Market Research", "Product Strategy"],
    brief:
      "A4E is a nonprofit that offers free tech and AI education through its Warp programs, with a focus on underserved communities in South King County.",
    challenge:
      "AI skills have become a hiring baseline, and the people A4E serves are the least likely to have had any AI education. A small team needed evidence for where to invest next, and cleaner operations to run its programs.",
    approach:
      "I researched and pitched a beginner-first AI learning portal, evaluated five strategic directions for the next digital product, mapped career pathways the existing program family could grow into, audited the social presence, compared project-management platforms, and proposed clearer intake questions.",
    outcome:
      "A recommendation to build the /ai portal content-first in 6 to 8 weeks, backed by five personas, a 12-competitor analysis, MoSCoW scope, a three-phase roadmap, a north-star metric, and a pitch deck for leadership.",
    highlights: [
      { value: "12", label: "competitors profiled for the AI Portal" },
      { value: "5", label: "learner personas with jobs to be done" },
      { value: "18", label: "career pathways scored on 15 criteria" },
      { value: "5", label: "strategic directions weighed in a decision matrix" },
    ],
    skills: [
      "Market research",
      "Competitive analysis",
      "Personas and jobs to be done",
      "MoSCoW prioritization",
      "Roadmapping",
      "Metrics design",
      "Decision matrices",
      "Form and intake design",
    ],
    tools: ["Monday.com", "Office 365", "JotForm", "Google Workspace", "Claude"],
    note: "These documents were written for A4E's internal teams, so they aren't posted publicly. I'm happy to walk through any of them.",
    accent: "#4f7dff",
    accent2: "#ffb547",
    steps: [
      {
        title: "Evaluate tools and channels",
        summary:
          "Evaluated the platform the intern team would run on, and audited A4E's social presence against nonprofit benchmarks.",
        deliverables: [
          {
            title: "Platform Comparison: Asana vs. Monday.com vs. ClickUp",
            kind: "doc",
            description:
              "Side by side on ease of use, customization, automation, AI, dashboards, integrations, and price, and why Monday.com fit A4E's intern program.",
          },
          {
            title: "Social Media Audit",
            kind: "doc",
            description:
              "Strengths, gaps, and a teach-don't-broadcast content strategy, grounded in nonprofit benchmarks from Media Cause, Hootsuite, and a LinkedIn benchmarking study.",
          },
        ],
      },
      {
        title: "Make the case for an AI Portal",
        summary:
          "Researched whether A4E should build a dedicated AI learning page for beginners, then turned the research into a pitch.",
        deliverables: [
          {
            title: "AI Portal Market Research and Competitive Analysis",
            kind: "doc",
            description:
              "Demand and equity data, five learner personas with jobs to be done, 12 competitor profiles, a section-by-section page concept, MoSCoW scope, a three-phase roadmap, and a measurement plan.",
          },
          {
            title: "AI Portal Pitch Deck",
            kind: "slides",
            description:
              "The problem, the 8-week build plan, a wireframe-level prototype of the /ai page, the free courses it would curate, and why A4E should build it now.",
          },
        ],
      },
      {
        title: "Set the product strategy",
        summary:
          "Stepped back from the original brief to ask what A4E's next digital product should be, then mapped where its programs could grow.",
        deliverables: [
          {
            title: "Strategic Opportunity Selection",
            kind: "doc",
            description:
              "Five strategic directions evaluated with raw and weighted decision matrices, a recommended product concept, an MVP plan with MoSCoW scope, a 30/60/90-day roadmap, a RACI, and interview guides.",
          },
          {
            title: "Career Pathways and Website Product Strategy",
            kind: "doc",
            description:
              "18 aviation, maritime, port, and green-jobs pathways scored on 15 criteria, a recommended five-pathway portfolio, matching website concepts, the funding landscape, and open questions for leadership.",
          },
        ],
      },
      {
        title: "Improve program intake",
        summary: "Reviewed the application forms and proposed clearer identity and eligibility questions for the rebuild.",
        deliverables: [
          {
            title: "Identification and Eligibility Question Improvements",
            kind: "doc",
            description:
              "Revised wording, field type, and purpose for each question, which verification steps to keep and clarify, and the decisions staff need to make before implementation.",
          },
        ],
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const documentCount = (c: CaseStudy) => c.steps.reduce((n, s) => n + s.deliverables.length, 0);
