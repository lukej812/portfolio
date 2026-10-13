import { Text } from "@/components/ui/Placeholder";
import type { StatusTone } from "@/content/projects";
import { cn } from "@/lib/cn";
import { shouldShow } from "@/lib/placeholder";

import { toneStyles } from "./meta";

export function StatusPill({ status, tone, className }: { status: string; tone: StatusTone; className?: string }) {
  if (!shouldShow(status)) return null;
  const t = toneStyles[tone];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.72rem] font-medium", t.border, t.text, className)}>
      <span className={cn("size-1.5 rounded-full", t.dot, t.pulse && "animate-pulse-soft")} aria-hidden />
      <Text value={status} />
    </span>
  );
}
