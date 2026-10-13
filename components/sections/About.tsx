import { ChartLine, Flag, Flame, GraduationCap, HandHeart, Shirt, Spade, Sparkles, Target, Users } from "lucide-react";

import { CountUp } from "@/components/ui/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, site } from "@/content/site";

const hobbyIcons = { Flag, Spade, Shirt, Flame, Sparkles, ChartLine, HandHeart };

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute right-0 top-40 -z-10 size-[40vmax] bg-[radial-gradient(closest-side,rgb(79_125_255/0.09),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading id="about-title" label={about.label} title={about.title} />
            <div className="mt-10 space-y-6 text-lead text-fg-muted">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className={i === 0 ? "text-fg" : undefined}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <RevealGroup className="flex flex-col gap-4 lg:col-span-5 lg:pt-24" gap={0.1}>
            <RevealItem className="glass spotlight rounded-3xl p-6" style={{ ["--accent" as string]: "var(--color-signal)" }}>
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-signal/25 bg-signal/10 text-signal">
                  <GraduationCap className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="label text-fg-subtle">Education</p>
                  <p className="mt-2.5 font-display text-lg font-semibold">{site.education.school}</p>
                  <p className="mt-1 text-sm text-fg-muted">
                    {site.education.unit}. {site.education.degree}.
                  </p>
                  <p className="mt-3 inline-flex rounded-full border border-ion/30 bg-ion/10 px-2.5 py-1 text-xs text-ion">
                    Graduated {site.education.graduated}
                  </p>
                </div>
              </div>
            </RevealItem>

            <RevealItem className="glass spotlight rounded-3xl p-6" style={{ ["--accent" as string]: "var(--color-flare)" }}>
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-flare/25 bg-flare/10 text-flare">
                  <Target className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="label text-fg-subtle">{about.goal.title}</p>
                  <p className="mt-2.5 leading-relaxed text-fg">{about.goal.body}</p>
                </div>
              </div>
            </RevealItem>

            <RevealItem className="glass spotlight rounded-3xl p-6" style={{ ["--accent" as string]: "var(--color-volt)" }}>
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-volt/30 bg-volt/10 text-[#8aa7ff]">
                  <Users className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="label text-fg-subtle">{about.community.title}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {about.community.items.map((c) => (
                      <li key={c} className="rounded-full border border-line-strong bg-white/[0.03] px-3 py-1.5 text-sm text-fg-muted">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Numbers */}
        <RevealGroup className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4" gap={0.08}>
          {about.stats.map((s) => (
            <RevealItem key={s.label} className="bg-ink-950 p-6 md:p-8">
              <CountUp
                value={s.value}
                prefix={"prefix" in s ? s.prefix : ""}
                suffix={s.suffix}
                className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-none tracking-tight text-gradient"
              />
              <p className="mt-3 text-sm leading-snug text-fg-muted">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Hobbies */}
        <div className="mt-24">
          <Reveal>
            <p className="label text-fg-subtle">Off the clock</p>
            <h3 className="mt-3 text-h3 font-semibold">Hobbies and interests</h3>
          </Reveal>
          <RevealGroup className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7" gap={0.05}>
            {about.hobbies.map((h) => {
              const Icon = hobbyIcons[h.icon];
              return (
                <RevealItem key={h.label}>
                  <div className="group glass flex h-full flex-col gap-4 rounded-2xl p-4 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-signal/30 hover:shadow-[0_18px_40px_-20px_rgb(67_226_255/0.5)]">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-signal/20 to-volt/10 text-signal transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:rotate-[-6deg]">
                      <Icon className="size-[1.15rem]" aria-hidden />
                    </span>
                    <span className="text-sm leading-snug text-fg">{h.label}</span>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
