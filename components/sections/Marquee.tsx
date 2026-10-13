import { marquee } from "@/content/site";

/** Slow, CSS-only ticker of tools. Pauses on hover; static with reduced motion. */
export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div
      aria-label="Tools I work with"
      className="group relative overflow-hidden border-y border-line bg-ink-900/60 py-5 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
    >
      <ul className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {items.map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= marquee.length}
            className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-medium text-fg-muted"
          >
            {item}
            <span aria-hidden className="size-1.5 rotate-45 bg-signal/60" />
          </li>
        ))}
      </ul>
    </div>
  );
}
