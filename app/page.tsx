import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { Marquee } from "@/components/sections/Marquee";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Statement } from "@/components/sections/Statement";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";
import { Workflow } from "@/components/sections/Workflow";
import { statements } from "@/content/site";

// Rebuild the page (and re-fetch GitHub repos) at most once an hour
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Statement text={statements.afterAbout} />
      <Skills />
      <Workflow />
      <Statement text={statements.beforeProjects} />
      <Projects />
      <Work />
      <Experience />
      <GitHubSection />
      <Testimonials />
      <Contact />
    </>
  );
}
