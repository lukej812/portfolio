/**
 * Content placeholders look like "[ADD: description]".
 *
 * They render (highlighted) in development so they're easy to spot, and are
 * hidden in production builds so the live site never shows them. Set
 * NEXT_PUBLIC_SHOW_PLACEHOLDERS=true to show them in production too.
 */

export const SHOW_PLACEHOLDERS =
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== undefined && process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== ""
    ? process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true"
    : process.env.NODE_ENV !== "production";

const PATTERN = /\[ADD:[^\]]*\]/;

/** True when the whole string is a placeholder */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !!value && value.trim().startsWith("[ADD:") && value.trim().endsWith("]");
}

/** True when the string contains a placeholder anywhere */
export function hasPlaceholder(value: string | undefined | null): boolean {
  return !!value && PATTERN.test(value);
}

/** Whether a string should be rendered at all */
export function shouldShow(value: string | undefined | null): value is string {
  if (!value) return false;
  return SHOW_PLACEHOLDERS || !hasPlaceholder(value);
}

/** Drops placeholder strings from a list when placeholders are hidden */
export function visible<T extends string>(values: readonly T[] | undefined): T[] {
  return (values ?? []).filter((v) => shouldShow(v));
}

/**
 * For strings that mix real text and a placeholder, like
 * "Dec 2025 to [ADD: end date]". When hidden, the placeholder is stripped
 * and dangling joiners are cleaned up.
 */
export function cleanMixed(value: string | undefined): string {
  if (!value) return "";
  if (SHOW_PLACEHOLDERS) return value;
  return value
    .replace(/\[ADD:[^\]]*\]\.?/g, "")
    .replace(/\s+to\s*$/, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
