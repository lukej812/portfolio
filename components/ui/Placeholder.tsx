import { Fragment } from "react";

import { cn } from "@/lib/cn";
import { SHOW_PLACEHOLDERS, cleanMixed } from "@/lib/placeholder";

/**
 * Renders a content string. Any "[ADD: ...]" inside it is highlighted in
 * development and stripped in production.
 */
export function Text({ value, className }: { value: string | undefined; className?: string }) {
  if (!value) return null;
  if (!SHOW_PLACEHOLDERS) {
    const cleaned = cleanMixed(value);
    return cleaned ? <span className={className}>{cleaned}</span> : null;
  }
  const parts = value.split(/(\[ADD:[^\]]*\])/g).filter(Boolean);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.startsWith("[ADD:") ? (
          <PlaceholderChip key={i}>{part}</PlaceholderChip>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </span>
  );
}

export function PlaceholderChip({ children, className }: { children: string; className?: string }) {
  return (
    <span
      title="Placeholder: fill this in under /content"
      className={cn(
        "inline rounded-md border border-dashed border-flare/60 bg-flare/10 px-1.5 py-0.5 font-mono text-[0.82em] text-flare [box-decoration-break:clone]",
        className,
      )}
    >
      {children}
    </span>
  );
}
