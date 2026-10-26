import type { ReactNode } from "react";

import type { PreviewKind, Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * Abstract, on-brand previews in each project's own colors. No real
 * screenshots exist, so each one sketches what the product does.
 * Everything is inline SVG; hover motion is pure CSS (see `.pv-*` below).
 */
export function ProjectPreview({ project, className }: { project: Project; className?: string }) {
  const { accent: a, accent2: b, slug, preview } = project;
  const id = (name: string) => `${slug}-${name}`;

  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden bg-ink-900", className)}
      style={{
        background: `radial-gradient(120% 90% at 85% 0%, color-mix(in oklab, ${a} 26%, transparent), transparent 55%), radial-gradient(90% 80% at 0% 100%, color-mix(in oklab, ${b} 20%, transparent), transparent 60%), var(--color-ink-900)`,
      }}
    >
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={id("ab")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
          <linearGradient id={id("fade")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={a} stopOpacity=".55" />
            <stop offset="1" stopColor={a} stopOpacity="0" />
          </linearGradient>
          <pattern id={id("grid")} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#a3bee1" strokeOpacity=".06" />
          </pattern>
        </defs>
        <rect width="320" height="200" fill={`url(#${id("grid")})`} />
        {renderArt(preview, a, b, id)}
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950/50 via-transparent to-transparent" />
    </div>
  );
}

type IdFn = (name: string) => string;

/** A rounded app window with three dots */
function Window({ x, y, w, h, children, stroke = "#a3bee1" }: { x: number; y: number; w: number; h: number; children?: ReactNode; stroke?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="#0b1017" fillOpacity=".92" stroke={stroke} strokeOpacity=".22" />
      <circle cx={x + 10} cy={y + 9} r="2" fill="#a3bee1" fillOpacity=".35" />
      <circle cx={x + 17} cy={y + 9} r="2" fill="#a3bee1" fillOpacity=".35" />
      <circle cx={x + 24} cy={y + 9} r="2" fill="#a3bee1" fillOpacity=".35" />
      {children}
    </g>
  );
}

/** A text line placeholder */
function Bar({ x, y, w, o = 0.18, h = 4, fill = "#edf2f7" }: { x: number; y: number; w: number; o?: number; h?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} fillOpacity={o} />;
}

function renderArt(kind: PreviewKind, a: string, b: string, id: IdFn) {
  switch (kind) {
    case "spec":
      return (
        <g>
          {/* messy notes */}
          <g className="pv-drift">
            <g transform="rotate(-8 60 70)">
              <rect x="22" y="44" width="70" height="52" rx="5" fill={b} fillOpacity=".16" stroke={b} strokeOpacity=".4" />
              <Bar x={30} y={56} w={44} />
              <Bar x={30} y={66} w={54} o={0.12} />
              <Bar x={30} y={76} w={30} o={0.12} />
            </g>
            <g transform="rotate(6 70 130)">
              <rect x="34" y="108" width="64" height="46" rx="5" fill={a} fillOpacity=".12" stroke={a} strokeOpacity=".35" />
              <path d="M42 122c8-4 14 4 22 0s14 4 22 0" stroke="#edf2f7" strokeOpacity=".25" fill="none" strokeWidth="2" strokeLinecap="round" />
              <Bar x={42} y={134} w={38} o={0.12} />
            </g>
          </g>
          {/* arrow */}
          <path d="M112 100h30" stroke={`url(#${id("ab")})`} strokeWidth="2" strokeDasharray="3 4" className="pv-flow" />
          <path d="M138 95l6 5-6 5" stroke={a} strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* clean PRD */}
          <Window x={156} y={26} w={140} h={150} stroke={a}>
            <Bar x={168} y={42} w={70} h={7} o={0.85} fill={a} />
            {["Problem", "Scope", "User stories", "Metrics"].map((_, i) => (
              <g key={i}>
                <rect x="168" y={60 + i * 24} width="3" height="14" rx="1.5" fill={i % 2 ? b : a} />
                <Bar x={176} y={61 + i * 24} w={50 + ((i * 17) % 40)} o={0.4} />
                <Bar x={176} y={69 + i * 24} w={80 - ((i * 11) % 30)} o={0.14} />
              </g>
            ))}
          </Window>
          {/* poke holes badge */}
          <g className="pv-pop">
            <rect x="232" y="140" width="72" height="22" rx="11" fill="#ff6b81" fillOpacity=".16" stroke="#ff6b81" strokeOpacity=".6" />
            <circle cx="245" cy="151" r="4.5" fill="none" stroke="#ff6b81" strokeWidth="1.5" />
            <path d="M245 144v3M245 155v3M238 151h3M249 151h3" stroke="#ff6b81" strokeWidth="1.5" />
            <Bar x={254} y={149} w={42} o={0.55} fill="#ffd0d8" />
          </g>
        </g>
      );

    case "outage":
      return (
        <g>
          <g className="pv-pop">
            <rect x="24" y="22" width="170" height="30" rx="8" fill="#ff6b81" fillOpacity=".12" stroke="#ff6b81" strokeOpacity=".5" />
            <circle cx="40" cy="37" r="5" fill="#ff6b81" className="pv-blink" />
            <circle cx="40" cy="37" r="9" fill="#ff6b81" fillOpacity=".25" />
            <Bar x={54} y={31} w={70} o={0.7} fill="#ffd0d8" />
            <Bar x={54} y={40} w={110} o={0.25} />
          </g>
          {/* commit timeline */}
          <path d="M30 104H290" stroke="#a3bee1" strokeOpacity=".25" strokeWidth="1.5" />
          {[44, 92, 140, 188, 236, 280].map((cx, i) => (
            <g key={cx}>
              <circle cx={cx} cy="104" r={i === 3 ? 7 : 4.5} fill={i === 3 ? a : "#1b2431"} stroke={i === 3 ? a : "#a3bee1"} strokeOpacity={i === 3 ? 1 : 0.4} />
              <Bar x={cx - 14} y={118} w={28} o={0.12} />
            </g>
          ))}
          <circle cx="188" cy="104" r="15" fill="none" stroke={a} strokeOpacity=".5" className="pv-ring" />
          <path d="M188 89V70" stroke={a} strokeOpacity=".6" strokeDasharray="2 3" />
          <rect x="160" y="58" width="56" height="14" rx="7" fill={a} fillOpacity=".18" />
          <Bar x={168} y={63} w={40} o={0.8} fill={a} />
          {/* slack brief */}
          <Window x={70} y={136} w={210} h={52} stroke={b}>
            <rect x="82" y="152" width="18" height="18" rx="5" fill={`url(#${id("ab")})`} />
            <Bar x={108} y={154} w={60} o={0.6} />
            <Bar x={108} y={163} w={150} o={0.16} />
            <Bar x={108} y={172} w={110} o={0.16} />
          </Window>
        </g>
      );

    case "resume":
      return (
        <g>
          <Window x={32} y={22} w={150} h={160} stroke={a}>
            <circle cx="56" cy="50" r="10" fill={a} fillOpacity=".3" />
            <Bar x={72} y={44} w={70} h={6} o={0.7} />
            <Bar x={72} y={54} w={46} o={0.2} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i}>
                <Bar x={46} y={76 + i * 16} w={110 - ((i * 23) % 50)} o={0.16} />
                {i % 2 === 1 && <rect x="42" y={73 + i * 16} width="128" height="10" rx="3" fill={a} fillOpacity=".1" stroke={a} strokeOpacity=".35" strokeDasharray="2 2" />}
              </g>
            ))}
          </Window>
          {/* score ring */}
          <g transform="translate(240 70)">
            <circle r="34" fill="none" stroke="#a3bee1" strokeOpacity=".12" strokeWidth="8" />
            <circle r="34" fill="none" stroke={`url(#${id("ab")})`} strokeWidth="8" strokeLinecap="round" strokeDasharray="160 214" transform="rotate(-90)" className="pv-dash" />
            <Bar x={-14} y={-4} w={28} h={8} o={0.75} />
          </g>
          {/* suggestions */}
          {[0, 1, 2].map((i) => (
            <g key={i} className="pv-rise" style={{ transitionDelay: `${i * 60}ms` }}>
              <rect x="198" y={122 + i * 22} width="96" height="16" rx="8" fill={b} fillOpacity=".1" stroke={b} strokeOpacity=".35" />
              <path d={`M206 ${130 + i * 22}l3 3 5-6`} stroke={b} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <Bar x={220} y={128 + i * 22} w={60 - i * 10} o={0.4} />
            </g>
          ))}
        </g>
      );

    case "atelier": {
      const shirt = "M-16-14l10-6h12l10 6 6 12-9 4-3-5V22h-20V-3l-3 5-9-4z";
      const pants = "M-12-20h24l3 42h-10L0-6l-5 28h-10z";
      const dress = "M-7-20h14l4 10 9 32h-40l9-32z";
      const items = [shirt, pants, dress, shirt, dress];
      return (
        <g>
          <path d="M24 40H296" stroke="#a3bee1" strokeOpacity=".3" strokeWidth="1.5" />
          {items.map((d, i) => {
            const x = 50 + i * 55;
            const hl = i === 1 || i === 3;
            return (
              <g key={i} className={hl ? "pv-rise" : undefined}>
                <g transform={`translate(${x} 80)`}>
                  <path d="M0-40v8m0 0-10 8m10-8 10 8" stroke="#a3bee1" strokeOpacity=".4" fill="none" />
                  <path d={d} fill={hl ? (i === 1 ? a : b) : "#a3bee1"} fillOpacity={hl ? 0.32 : 0.08} stroke={hl ? (i === 1 ? a : b) : "#a3bee1"} strokeOpacity={hl ? 0.9 : 0.25} />
                </g>
              </g>
            );
          })}
          <g className="pv-pop">
            <rect x="92" y="140" width="136" height="34" rx="17" fill="#0b1017" stroke={`url(#${id("ab")})`} />
            <path d="M110 150l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill={a} />
            <Bar x={124} y={152} w={80} o={0.6} />
            <Bar x={124} y={160} w={50} o={0.2} />
          </g>
        </g>
      );
    }

    case "registration":
      return (
        <g>
          {/* sticky notes */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={30 + i * 34} y={20 + (i % 2) * 6} width="26" height="22" rx="3" fill={i % 2 ? b : a} fillOpacity=".25" transform={`rotate(${(i % 2 ? 4 : -5)} ${43 + i * 34} 31)`} />
          ))}
          {/* screen flow */}
          {[0, 1, 2].map((i) => (
            <g key={i} className="pv-rise" style={{ transitionDelay: `${i * 70}ms` }}>
              <rect x={30 + i * 92} y="62" width="70" height="96" rx="8" fill="#0b1017" stroke={i === 1 ? a : "#a3bee1"} strokeOpacity={i === 1 ? 0.8 : 0.25} />
              <Bar x={40 + i * 92} y={74} w={34} o={0.5} />
              <rect x={40 + i * 92} y="86" width="50" height="24" rx="4" fill={i === 1 ? a : "#a3bee1"} fillOpacity={i === 1 ? 0.18 : 0.06} />
              <Bar x={40 + i * 92} y={118} w={44} o={0.14} />
              <Bar x={40 + i * 92} y={127} w={36} o={0.14} />
              <rect x={40 + i * 92} y="140" width="30" height="9" rx="4.5" fill={`url(#${id("ab")})`} fillOpacity=".8" />
            </g>
          ))}
          <path d="M104 110h14M196 110h14" stroke={a} strokeWidth="1.6" strokeDasharray="2 3" className="pv-flow" />
          {/* backlog column */}
          <g opacity=".9">
            <rect x="30" y="170" width="260" height="18" rx="5" fill="#a3bee1" fillOpacity=".05" stroke="#a3bee1" strokeOpacity=".12" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={38 + i * 50} y="175" width="40" height="8" rx="4" fill={i < 3 ? b : "#a3bee1"} fillOpacity={i < 3 ? 0.45 : 0.15} />
            ))}
          </g>
        </g>
      );

    case "injection":
      return (
        <g>
          <g transform="translate(160 100)">
            {[62, 46, 30].map((r, i) => (
              <circle key={r} r={r} fill="none" stroke={b} strokeOpacity={0.15 + i * 0.12} strokeDasharray={i === 0 ? "3 5" : undefined} />
            ))}
            <path d="M0-18l14 6v9c0 9-6 15-14 18-8-3-14-9-14-18v-9z" fill={b} fillOpacity=".25" stroke={b} />
          </g>
          {/* sources */}
          {[
            [40, 46],
            [40, 154],
            [280, 46],
            [280, 154],
          ].map(([x, y], i) => (
            <g key={i}>
              <path d={`M${x} ${y}L160 100`} stroke={i === 2 ? a : "#a3bee1"} strokeOpacity={i === 2 ? 0.9 : 0.2} strokeDasharray={i === 2 ? "4 4" : undefined} className={i === 2 ? "pv-flow" : undefined} />
              <rect x={x - 16} y={y - 12} width="32" height="24" rx="5" fill="#0b1017" stroke={i === 2 ? a : "#a3bee1"} strokeOpacity={i === 2 ? 0.9 : 0.3} />
              <Bar x={x - 9} y={y - 4} w={18} o={i === 2 ? 0.7 : 0.25} fill={i === 2 ? a : "#edf2f7"} />
              <Bar x={x - 9} y={y + 3} w={12} o={0.15} />
            </g>
          ))}
          <g className="pv-pop">
            <circle cx="220" cy="73" r="10" fill={a} fillOpacity=".2" stroke={a} />
            <path d="M220 67v7M220 77.5v.5" stroke={a} strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      );

    case "fifa": {
      const bars = [64, 88, 100, 78, 70, 62, 60, 56, 52, 50, 49, 48];
      return (
        <g>
          <path d="M30 170H294" stroke="#a3bee1" strokeOpacity=".25" />
          {bars.map((h, i) => (
            <rect
              key={i}
              x={34 + i * 21.5}
              y={170 - h}
              width="13"
              height={h}
              rx="3"
              fill={i === 2 ? a : `url(#${id("fade")})`}
              fillOpacity={i === 2 ? 0.95 : 1}
              className="pv-bar"
              style={{ transitionDelay: `${i * 25}ms` }}
            />
          ))}
          {/* attendance trend */}
          <path d="M40 150C90 140 120 120 160 112S240 84 290 58" fill="none" stroke={b} strokeWidth="2.2" strokeLinecap="round" className="pv-dash" strokeDasharray="300" />
          <circle cx="290" cy="58" r="4" fill={b} />
          <g>
            <rect x="60" y="34" width="50" height="20" rx="6" fill="#0b1017" stroke={a} strokeOpacity=".6" />
            <text x="85" y="48" textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill={a}>5.38</text>
            <rect x="244" y="98" width="50" height="20" rx="6" fill="#0b1017" stroke="#a3bee1" strokeOpacity=".3" />
            <text x="269" y="112" textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill="#edf2f7" fillOpacity=".75">2.67</text>
          </g>
        </g>
      );
    }

    case "health": {
      const dots = Array.from({ length: 42 }, (_, i) => {
        const x = 40 + ((i * 53) % 230);
        const base = 160 - (x - 40) * 0.42;
        const y = base + (((i * 37) % 40) - 20);
        return { x, y, r: 2 + ((i * 7) % 4) };
      });
      return (
        <g>
          <path d="M34 22V176H296" stroke="#a3bee1" strokeOpacity=".25" fill="none" />
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={i % 5 === 0 ? b : a} fillOpacity={i % 5 === 0 ? 0.8 : 0.45} />
          ))}
          <path d="M40 166C110 140 180 100 290 58" fill="none" stroke="#edf2f7" strokeOpacity=".55" strokeWidth="1.6" strokeDasharray="4 4" className="pv-flow" />
          <g className="pv-pop">
            <rect x="216" y="132" width="74" height="36" rx="8" fill="#0b1017" stroke={a} strokeOpacity=".5" />
            <text x="228" y="155" fontSize="15" fontFamily="ui-monospace, monospace" fill={a}>118</text>
            <Bar x={258} y={147} w={24} o={0.3} />
            <Bar x={258} y={155} w={18} o={0.15} />
          </g>
        </g>
      );
    }

    case "portal":
      return (
        <g>
          <Window x={24} y={18} w={272} h={166} stroke={a}>
            <Bar x={38} y={34} w={80} h={7} o={0.8} />
            <rect x="226" y="30" width="56" height="14" rx="7" fill={b} fillOpacity=".2" stroke={b} strokeOpacity=".6" />
            <text x="254" y="40.5" textAnchor="middle" fontSize="8.5" fontFamily="ui-monospace, monospace" fill={b} letterSpacing="1">FREE</text>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const cx = 38 + (i % 3) * 84;
              const cy = 56 + Math.floor(i / 3) * 62;
              return (
                <g key={i} className="pv-rise" style={{ transitionDelay: `${i * 40}ms` }}>
                  <rect x={cx} y={cy} width="74" height="52" rx="6" fill={i === 1 ? a : "#a3bee1"} fillOpacity={i === 1 ? 0.14 : 0.05} stroke={i === 1 ? a : "#a3bee1"} strokeOpacity={i === 1 ? 0.6 : 0.15} />
                  <path d={`M${cx + 10} ${cy + 10}l8 5-8 5z`} fill={i === 1 ? a : "#a3bee1"} fillOpacity=".7" />
                  <Bar x={cx + 10} y={cy + 28} w={46} o={0.3} />
                  <rect x={cx + 10} y={cy + 40} width="54" height="3" rx="1.5" fill="#a3bee1" fillOpacity=".12" />
                  <rect x={cx + 10} y={cy + 40} width={12 + ((i * 13) % 42)} height="3" rx="1.5" fill={`url(#${id("ab")})`} />
                </g>
              );
            })}
          </Window>
        </g>
      );

    case "aqua":
      return (
        <g>
          <rect y="70" width="320" height="130" fill={`url(#${id("fade")})`} opacity=".5" />
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M-20 ${80 + i * 26} C 40 ${70 + i * 26}, 80 ${92 + i * 26}, 140 ${80 + i * 26} S 240 ${70 + i * 26}, 340 ${82 + i * 26}`}
              fill="none"
              stroke={i === 0 ? a : b}
              strokeOpacity={0.7 - i * 0.18}
              strokeWidth={2 - i * 0.4}
              className="pv-drift"
            />
          ))}
          {/* bubbles */}
          {[
            [60, 170, 5],
            [74, 150, 3],
            [66, 132, 2],
            [250, 180, 6],
            [262, 156, 3.5],
            [244, 140, 2.2],
            [180, 176, 3],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="#edf2f7" strokeOpacity=".45" className="pv-rise" />
          ))}
          {/* dive flag on a buoy */}
          <g className="pv-pop">
            <g transform="translate(150 22)">
              <path d="M10 0v58" stroke="#edf2f7" strokeOpacity=".7" strokeWidth="1.5" />
              <rect x="11" y="2" width="44" height="30" rx="2" fill="#ff4d5e" />
              <path d="M11 2l44 30" stroke="#fff" strokeWidth="6" />
              <ellipse cx="10" cy="60" rx="14" ry="5" fill={a} fillOpacity=".5" />
            </g>
          </g>
        </g>
      );

    case "wavelength":
      return (
        <g>
          {[40, 62, 84, 106].map((r, i) => (
            <circle key={r} cx="160" cy="100" r={r} fill="none" stroke={i % 2 ? b : a} strokeOpacity={0.35 - i * 0.07} className="pv-ring" style={{ transitionDelay: `${i * 60}ms` }} />
          ))}
          <rect x="122" y="18" width="76" height="164" rx="16" fill="#0b1017" stroke={`url(#${id("ab")})`} strokeWidth="1.5" />
          <rect x="148" y="24" width="24" height="5" rx="2.5" fill="#a3bee1" fillOpacity=".25" />
          {[0, 1, 2].map((i) => (
            <g key={i} className="pv-rise" style={{ transitionDelay: `${i * 70}ms` }}>
              <rect x="131" y={42 + i * 44} width="58" height="36" rx="8" fill={i === 0 ? a : "#a3bee1"} fillOpacity={i === 0 ? 0.18 : 0.06} stroke={i === 0 ? a : "#a3bee1"} strokeOpacity={i === 0 ? 0.6 : 0.15} />
              <Bar x={138} y={50 + i * 44} w={36} o={0.55} />
              {[0, 1, 2].map((j) => (
                <circle key={j} cx={142 + j * 9} cy={66 + i * 44} r="4" fill={j === 1 ? b : a} fillOpacity=".7" stroke="#0b1017" strokeWidth="1.5" />
              ))}
            </g>
          ))}
          <path d="M20 100c20-16 30 16 50 0s30 16 50 0" fill="none" stroke={a} strokeOpacity=".6" strokeWidth="1.6" className="pv-flow" strokeDasharray="4 4" />
          <path d="M200 100c20-16 30 16 50 0s30 16 50 0" fill="none" stroke={b} strokeOpacity=".6" strokeWidth="1.6" className="pv-flow" strokeDasharray="4 4" />
        </g>
      );

    case "nudge":
      return (
        <g>
          {/* sender phone */}
          <g className="pv-drift">
            <rect x="40" y="26" width="78" height="150" rx="14" fill="#0b1017" stroke={a} strokeOpacity=".45" />
            <rect x="68" y="32" width="22" height="4" rx="2" fill="#a3bee1" fillOpacity=".25" />
            <circle cx="79" cy="72" r="16" fill={b} fillOpacity=".2" stroke={b} strokeOpacity=".7" />
            <Bar x={66} y={68} w={26} h={8} o={0.75} fill={b} />
            <Bar x={56} y={98} w={46} o={0.4} />
            <Bar x={62} y={108} w={34} o={0.16} />
            <rect x="52" y="128" width="54" height="20" rx="10" fill={a} fillOpacity=".9" />
            <Bar x={64} y={136} w={30} o={0.85} fill="#05070b" />
          </g>
          {/* the nudge */}
          <path d="M122 110c28-46 52-46 76-20" fill="none" stroke={`url(#${id("ab")})`} strokeWidth="2" strokeDasharray="3 4" className="pv-flow" />
          <path d="M193 84l6 7-9 1" stroke={b} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* receiver phone */}
          <rect x="202" y="26" width="78" height="150" rx="14" fill="#0b1017" stroke={b} strokeOpacity=".45" />
          <rect x="230" y="32" width="22" height="4" rx="2" fill="#a3bee1" fillOpacity=".25" />
          <g className="pv-rise">
            <rect x="210" y="50" width="62" height="40" rx="9" fill={a} fillOpacity=".14" stroke={a} strokeOpacity=".6" />
            <circle cx="222" cy="62" r="5" fill={b} fillOpacity=".85" />
            <Bar x={231} y={59} w={34} o={0.7} />
            <Bar x={218} y={74} w={46} o={0.2} />
            <rect x="218" y="81" width="46" height="3" rx="1.5" fill="#a3bee1" fillOpacity=".15" />
            <rect x="218" y="81" width="30" height="3" rx="1.5" fill={a} className="pv-blink" />
          </g>
          <rect x="214" y="104" width="54" height="40" rx="8" fill="#a3bee1" fillOpacity=".06" stroke="#a3bee1" strokeOpacity=".15" />
          <rect x="250" y="108" width="14" height="14" rx="4" fill={b} fillOpacity=".35" />
          <rect x="214" y="152" width="54" height="14" rx="7" fill={b} fillOpacity=".2" stroke={b} strokeOpacity=".5" />
          {/* RICE badge */}
          <g className="pv-pop">
            <rect x="128" y="146" width="66" height="22" rx="11" fill={a} fillOpacity=".12" stroke={a} strokeOpacity=".55" />
            <circle cx="140" cy="157" r="3.5" fill={a} />
            <Bar x={149} y={155} w={36} o={0.6} />
          </g>
        </g>
      );

    case "campaign": {
      // eight regions, loosely tracing the archipelago from Hokkaido to Kyushu
      const nodes = [
        [256, 34],
        [238, 66],
        [214, 96],
        [184, 112],
        [154, 122],
        [122, 128],
        [96, 146],
        [66, 162],
      ];
      return (
        <g>
          <path
            d={`M${nodes.map(([x, y]) => `${x} ${y}`).join("L")}`}
            fill="none"
            stroke={`url(#${id("ab")})`}
            strokeWidth="1.8"
            strokeDasharray="3 4"
            className="pv-flow"
          />
          {nodes.map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="11" fill={i % 2 ? b : a} fillOpacity=".12" className="pv-ring" style={{ transitionDelay: `${i * 40}ms` }} />
              <circle cx={cx} cy={cy} r="5" fill={i % 2 ? b : a} />
            </g>
          ))}
          {/* the can */}
          <g className="pv-rise">
            <rect x="34" y="34" width="34" height="62" rx="7" fill="#0b1017" stroke={a} strokeOpacity=".6" />
            <rect x="34" y="50" width="34" height="18" fill={a} fillOpacity=".22" />
            <rect x="40" y="56" width="22" height="5" rx="2.5" fill={b} fillOpacity=".85" />
            <rect x="42" y="28" width="18" height="6" rx="3" fill="#a3bee1" fillOpacity=".3" />
          </g>
          {/* live vote */}
          <Window x={176} y={136} w={124} h={52} stroke={b}>
            {[0.55, 0.85, 0.35].map((v, i) => (
              <g key={i}>
                <rect x={188 + i * 36} y={152} width="24" height="28" rx="3" fill="#a3bee1" fillOpacity=".06" />
                <rect x={188 + i * 36} y={180 - 28 * v} width="24" height={28 * v} rx="3" fill={i === 1 ? a : b} fillOpacity={i === 1 ? 0.9 : 0.45} className="pv-bar" />
              </g>
            ))}
            <circle cx="290" cy="145" r="3" fill="#ff6b81" className="pv-blink" />
          </Window>
        </g>
      );
    }

    case "broke":
      return (
        <g>
          {/* receipt */}
          <g transform="translate(130 30)">
            <path d="M0 0h60v118l-7.5-6-7.5 6-7.5-6-7.5 6-7.5-6-7.5 6-7.5-6-7.5 6z" fill="#0b1017" stroke={a} strokeOpacity=".6" />
            <Bar x={10} y={14} w={30} h={6} o={0.75} />
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <Bar x={10} y={32 + i * 14} w={24} o={0.2} />
                <Bar x={40} y={32 + i * 14} w={10} o={0.35} fill={a} />
              </g>
            ))}
            <path d="M10 92h40" stroke="#a3bee1" strokeOpacity=".3" strokeDasharray="2 2" />
            <Bar x={10} y={98} w={40} h={6} o={0.8} fill={a} />
          </g>
          {/* people */}
          {[
            [52, 60],
            [52, 140],
            [268, 100],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <path d={`M${cx} ${cy}L${i === 2 ? 190 : 130} ${i === 2 ? 90 : 80 + i * 20}`} stroke={`url(#${id("ab")})`} strokeWidth="1.6" strokeDasharray="3 4" className="pv-flow" />
              <circle cx={cx} cy={cy} r="18" fill={i === 1 ? b : a} fillOpacity=".18" stroke={i === 1 ? b : a} strokeOpacity=".7" />
              <circle cx={cx} cy={cy - 4} r="5" fill={i === 1 ? b : a} fillOpacity=".8" />
              <path d={`M${cx - 9} ${cy + 10}a9 7 0 0 1 18 0`} fill={i === 1 ? b : a} fillOpacity=".8" />
              <rect x={cx - 20} y={cy + 24} width="40" height="5" rx="2.5" fill="#a3bee1" fillOpacity=".12" />
              <rect x={cx - 20} y={cy + 24} width={[28, 14, 34][i]} height="5" rx="2.5" fill={i === 1 ? b : a} className="pv-bar" />
            </g>
          ))}
          {/* sync badge */}
          <g className="pv-pop">
            <rect x="212" y="26" width="84" height="22" rx="11" fill={b} fillOpacity=".12" stroke={b} strokeOpacity=".5" />
            <circle cx="225" cy="37" r="3.5" fill={b} className="pv-blink" />
            <Bar x={234} y={35} w={52} o={0.55} />
          </g>
        </g>
      );
  }
}
