/**
 * "From Idea to Product with AI": the four-step loop, each with real
 * examples pulled from projects.
 */

export type WorkflowStep = {
  title: string;
  summary: string;
  examples: { project: string; detail: string }[];
};

export const workflow = {
  label: "How I build",
  title: "From idea to product, with AI.",
  intro:
    "AI makes building fast. Judgment decides what's worth building. This is the loop I run on every project.",
  steps: [
    {
      title: "Identify a real user or business problem",
      summary: "Start with people and the moment where things go wrong, not with a feature list.",
      examples: [
        {
          project: "Outage Response",
          detail: "On-call engineers lose critical minutes figuring out what broke and which runbook applies.",
        },
        {
          project: "Spec Writer",
          detail: "Product ideas live in meeting notes and Slack threads, and the hard questions get skipped.",
        },
      ],
    },
    {
      title: "Define the product idea, users, and success criteria",
      summary: "Decide who it's for, what done looks like, and what to build first.",
      examples: [
        {
          project: "BrokeTogether",
          detail: "Turned 12 user interviews into a prioritized roadmap.",
        },
        {
          project: "Spec Writer",
          detail: "Every PRD it writes includes success metrics, edge cases, and stated assumptions.",
        },
      ],
    },
    {
      title: "Prototype quickly with Claude Code and AI tools",
      summary: "Get to something clickable fast, and make the AI parts reliable instead of magical.",
      examples: [
        {
          project: "Wavelength",
          detail: "Prompt-engineered structured LLM output to power group activity recommendations.",
        },
        {
          project: "Spec Writer",
          detail: "Forced Claude tool calls return clean, structured JSON every time.",
        },
      ],
    },
    {
      title: "Test, iterate, and communicate the value",
      summary: "Put it in front of real users, fix what they trip on, and explain why it matters.",
      examples: [
        {
          project: "Wavelength",
          detail: "Ran usability testing as part of INFO 490.",
        },
        {
          project: "BrokeTogether",
          detail: "Usability testing raised first-time setup success from about 50% to about 63%.",
        },
        {
          project: "Spec Writer",
          detail: "A \"Poke Holes\" mode red-teams the spec before reviewers do.",
        },
      ],
    },
  ] satisfies WorkflowStep[],
};
