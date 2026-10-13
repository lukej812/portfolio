import { FileText, Mail } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { contact, site } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-linear-to-r from-transparent via-signal/60 to-transparent" />
        <div className="absolute left-1/2 top-0 h-[70%] w-[90%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_top,rgb(67_226_255/0.16),rgb(79_125_255/0.06)_45%,transparent_70%)]" />
        <div className="grid-backdrop absolute inset-0 opacity-50" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:px-8">
        <div>
          <Reveal>
            <p className="label flex items-center gap-3 text-signal">
              <span aria-hidden className="size-1.5 rounded-full bg-signal animate-pulse-soft" />
              {contact.label}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="contact-title" className="mt-5 text-h1 font-semibold">
              <span className="text-gradient">{contact.title}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lead text-fg">{contact.statement}</p>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-fg-muted">{contact.alsoOpenTo}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href={`mailto:${site.email}`} variant="primary" icon={<Mail className="size-4" aria-hidden />}>
              Email me
            </MagneticButton>
            <MagneticButton href={site.links.linkedin} variant="secondary" icon={<LinkedInIcon className="size-4" />}>
              LinkedIn
            </MagneticButton>
            <MagneticButton href={site.links.github} variant="secondary" icon={<GitHubIcon className="size-4" />}>
              GitHub
            </MagneticButton>
            <MagneticButton href={site.links.resume} variant="secondary" icon={<FileText className="size-4" aria-hidden />}>
              Resume
            </MagneticButton>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-sm text-fg-subtle">
              Or write to{" "}
              <a href={`mailto:${site.email}`} className="text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-signal hover:decoration-signal">
                {site.email}
              </a>
              . Based in {site.location}.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm email={site.email} />
        </Reveal>
      </div>
    </section>
  );
}
