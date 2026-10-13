import { Quote } from "lucide-react";

import { Text } from "@/components/ui/Placeholder";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/site";
import { shouldShow } from "@/lib/placeholder";

/** Hidden entirely on production until at least one real quote is added */
export function Testimonials() {
  const items = testimonials.items.filter((t) => shouldShow(t.quote));
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="testimonials-title" label={testimonials.label} title={testimonials.title} />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3" gap={0.1}>
          {items.map((t, i) => (
            <RevealItem key={i} className="h-full">
              <figure className="glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7">
                <div aria-hidden className="absolute -right-16 -top-16 size-56 bg-[radial-gradient(closest-side,rgb(67_226_255/0.12),transparent)]" />
                <Quote className="size-7 text-signal/70" aria-hidden />
                <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-fg">
                  <Text value={t.quote} />
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                  <span aria-hidden className="size-10 rounded-full bg-linear-to-br from-signal/40 to-volt/30" />
                  <span>
                    <span className="block text-sm font-medium text-fg">
                      <Text value={t.name} />
                    </span>
                    <span className="mt-0.5 block text-xs text-fg-subtle">
                      <Text value={t.role} />
                    </span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
