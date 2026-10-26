import { cn } from "@/lib/cn";

type Props = { slug: string; accent: string; accent2: string; className?: string };

/**
 * A fanned stack of documents (a spreadsheet, a deck, and a doc) in a case
 * study's colors. Same visual language as the project previews: inline SVG,
 * CSS-only hover motion via the `.pv-*` classes.
 */
export function DocStack({ slug, accent: a, accent2: b, className }: Props) {
  const id = (name: string) => `work-${slug}-${name}`;
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden bg-ink-900", className)}
      style={{
        background: `radial-gradient(120% 90% at 85% 0%, color-mix(in oklab, ${a} 24%, transparent), transparent 55%), radial-gradient(90% 80% at 0% 100%, color-mix(in oklab, ${b} 18%, transparent), transparent 60%), var(--color-ink-900)`,
      }}
    >
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={id("ab")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
          <pattern id={id("grid")} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#a3bee1" strokeOpacity=".06" />
          </pattern>
        </defs>
        <rect width="320" height="200" fill={`url(#${id("grid")})`} />

        {/* spreadsheet, back left */}
        <g className="pv-drift">
          <g transform="rotate(-9 92 112)">
            <rect x="34" y="44" width="116" height="136" rx="8" fill="#0b1017" stroke={b} strokeOpacity=".4" />
            <rect x="34" y="44" width="116" height="16" rx="8" fill={b} fillOpacity=".18" />
            {[0, 1, 2, 3, 4, 5].map((r) => (
              <g key={r}>
                <path d={`M44 ${76 + r * 16}H140`} stroke="#a3bee1" strokeOpacity=".1" />
                <rect x="46" y={68 + r * 16} width="22" height="4" rx="2" fill="#edf2f7" fillOpacity=".18" />
                <rect x="78" y={68 + r * 16} width={14 + ((r * 13) % 24)} height="4" rx="2" fill={r === 2 ? b : "#edf2f7"} fillOpacity={r === 2 ? 0.8 : 0.12} />
              </g>
            ))}
          </g>
        </g>

        {/* deck, back right */}
        <g className="pv-rise">
          <g transform="rotate(7 236 100)">
            <rect x="178" y="38" width="118" height="78" rx="8" fill="#0b1017" stroke={a} strokeOpacity=".4" />
            <rect x="190" y="52" width="46" height="7" rx="3.5" fill={a} fillOpacity=".85" />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={190 + i * 20} y={100 - (14 + i * 10)} width="12" height={14 + i * 10} rx="2" fill={i === 2 ? a : b} fillOpacity={i === 2 ? 0.85 : 0.4} className="pv-bar" />
            ))}
            <rect x="256" y="70" width="28" height="4" rx="2" fill="#edf2f7" fillOpacity=".18" />
            <rect x="256" y="80" width="20" height="4" rx="2" fill="#edf2f7" fillOpacity=".12" />
          </g>
        </g>

        {/* doc, front */}
        <g className="pv-pop">
          <rect x="104" y="30" width="112" height="152" rx="9" fill="#0d121a" stroke={`url(#${id("ab")})`} strokeWidth="1.5" />
          <rect x="118" y="46" width="60" height="7" rx="3.5" fill="#edf2f7" fillOpacity=".8" />
          <rect x="118" y="60" width="40" height="4" rx="2" fill={a} fillOpacity=".7" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="118" y={78 + i * 22} width="3" height="14" rx="1.5" fill={i % 2 ? b : a} />
              <rect x="126" y={79 + i * 22} width={44 + ((i * 17) % 30)} height="4" rx="2" fill="#edf2f7" fillOpacity=".4" />
              <rect x="126" y={87 + i * 22} width={70 - ((i * 11) % 24)} height="4" rx="2" fill="#edf2f7" fillOpacity=".14" />
            </g>
          ))}
          <circle cx="198" cy="164" r="9" fill={a} fillOpacity=".18" stroke={a} strokeOpacity=".7" />
          <path d="M194 164l3 3 5-6" stroke={a} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950/50 via-transparent to-transparent" />
    </div>
  );
}
