import type { SkillTag, StatusTone } from "@/content/projects";

export const tagColors: Record<SkillTag, string> = {
  Product: "var(--color-signal)",
  Data: "var(--color-ion)",
  AI: "#8aa7ff",
  "Business Tech": "var(--color-flare)",
  Development: "var(--color-pulse)",
  Marketing: "var(--color-alert)",
};

export const toneStyles: Record<StatusTone, { dot: string; text: string; border: string; pulse: boolean }> = {
  live: { dot: "bg-ion", text: "text-ion", border: "border-ion/30 bg-ion/10", pulse: true },
  progress: { dot: "bg-flare", text: "text-flare", border: "border-flare/30 bg-flare/10", pulse: false },
  prototype: { dot: "bg-signal", text: "text-signal", border: "border-signal/30 bg-signal/10", pulse: false },
  complete: { dot: "bg-fg-muted", text: "text-fg-muted", border: "border-line-strong bg-white/[0.03]", pulse: false },
};
