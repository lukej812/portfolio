import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { caseStudies } from "@/content/work";

/** Work samples: one row per internship or externship, each linking to its full /work page */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 md:py-32">
      <div aria-hidden className="absolute right-0 top-1/3 -z-10 size-[40vmax] bg-[radial-gradient(closest-side,rgb(143_125_255/0.07),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="work-title"
          label="Work samples"
          title="The documents behind the work."
          intro="Each internship and externship, broken into the steps I took, with the real research, specs, prototypes, and pitches attached. Open one to see everything I made."
        />

        <ul className="mt-14 space-y-5">
          {caseStudies.map((study, i) => (
            <li key={study.slug}>
              <CaseStudyCard study={study} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
