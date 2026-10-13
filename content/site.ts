/**
 * Site-wide content: who I am, links, section copy, and SEO.
 *
 * Edit freely. Anything wrapped as "[ADD: ...]" is a placeholder: it shows
 * in `npm run dev` and is hidden on the production site until filled in.
 * House style: no em dashes anywhere.
 */

export const site = {
  name: "Luke Johnson",
  firstName: "Luke",
  positioning: "AI-forward product, data, and business-tech builder",
  location: "Seattle, WA",
  email: "Lukejohnson394@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/luke-johnson-a950521b7/",
    github: "https://github.com/lukej812",
    resume:
      "https://docs.google.com/document/d/13pYQlRhbrA2X8-_XVBSpwuR8Q3OcIwRfVrxfw6No17s/edit?usp=sharing",
  },
  education: {
    school: "University of Washington",
    unit: "Information School",
    degree: "B.S. Informatics, Data Science concentration",
    graduated: "June 2026",
  },
  seo: {
    title: "Luke Johnson | AI-forward product, data, and business-tech builder",
    description:
      "Recent UW Informatics grad in Seattle building AI-forward products. Product management, data, and business technology, with a focus on making tech useful for everyone.",
    keywords: [
      "Luke Johnson",
      "product manager",
      "AI product",
      "data analyst",
      "business technology",
      "University of Washington Informatics",
      "Claude Code",
      "Seattle",
    ],
  },
} as const;

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
] as const;

export const hero = {
  eyebrow: "UW Informatics '26 · Seattle, WA",
  headline: "AI-forward builder across product, data, and business tech.",
  subheadline:
    "I build with AI, think in products, and care about making technology useful and accessible for people who aren't tech-savvy.",
  status: [
    { label: "Now", value: "Program Management Intern at Americans4Equality" },
    { label: "Open to", value: "Product, data, business tech, and AI roles" },
  ],
};

/** Tools that scroll past in the strip under the hero */
export const marquee = [
  "Claude Code",
  "Anthropic API",
  "Product discovery",
  "SQL",
  "Python",
  "Tableau",
  "Figma",
  "React",
  "FastAPI",
  "Supabase",
  "User research",
  "Roadmapping",
  "Prompt design",
  "Azure DevOps",
];

export const about = {
  label: "About",
  title: "Building where AI, product, and people meet.",
  paragraphs: [
    "I'm Luke. I recently graduated from the University of Washington Information School with a B.S. in Informatics and a concentration in data science. My work sits where AI, product management, data, and business technology overlap.",
    "Right now I'm a Program Management Intern at Americans4Equality (A4E), a nonprofit that helps people explore AI and technology education so they can grow in their careers or move into new ones. I support program operations, content creation, outreach, and AI education, and I guide intern groups through AI fluency concepts and certifications, including Anthropic's AI Fluency: Framework & Foundations course.",
    "Outside of work, I use Claude Code to prototype products and solve practical problems. Wavelength is a social app for incoming college freshmen. BrokeTogether helps groups split shared costs. I like taking an idea from a rough concept to something people can actually use, then improving it based on what they need.",
  ],
  goal: {
    title: "Where I'm headed",
    body: "I want to build a career helping people feel confident using technology: designing AI products that create real value, at the intersection of product, data, and business strategy. And I want to use AI ethically to help close the tech-access gap.",
  },
  community: {
    title: "Community",
    items: [
      "Product Management Club, UW",
      "Applied Analytics Club, UW",
      "Pi Kappa Alpha",
      "GDPTLQ Co Lam Pagoda",
    ],
  },
  stats: [
    { value: 12, suffix: "", label: "user interviews turned into a product roadmap" },
    { value: 20, suffix: "+", label: "student interviews and usability tests on one redesign" },
    { value: 22, suffix: "", label: "student users on an app I shipped" },
    { value: 28, prefix: "$", suffix: "K+", label: "raised for Seattle Children's Hospital" },
  ],
  hobbies: [
    { icon: "Flag", label: "Golf" },
    { icon: "Spade", label: "Poker" },
    { icon: "Shirt", label: "Fashion" },
    { icon: "Flame", label: "Cooking and grilling" },
    { icon: "Sparkles", label: "Building products and experimenting with AI tools" },
    { icon: "ChartLine", label: "Product strategy and data" },
    { icon: "HandHeart", label: "Community and cultural involvement" },
  ],
} as const;

/** Short full-width statements between sections */
export const statements = {
  afterAbout: "Technology only matters if people can actually use it.",
  beforeProjects: "An idea gets real the moment someone can click on it.",
};

export const testimonials = {
  label: "Kind words",
  title: "What people say about working with me.",
  items: [
    {
      quote: "[ADD: quote from A4E supervisor]",
      name: "[ADD: name]",
      role: "[ADD: title, Americans4Equality]",
    },
    {
      quote: "[ADD: quote from project collaborator]",
      name: "[ADD: name]",
      role: "[ADD: role and project]",
    },
    {
      quote: "[ADD: quote from professor or club leader]",
      name: "[ADD: name]",
      role: "[ADD: title and organization]",
    },
  ],
};

export const contact = {
  label: "Contact",
  title: "Let's build something useful.",
  statement:
    "I'm looking for roles in product management, data, business technology, and AI.",
  alsoOpenTo:
    "I'm also open to business analyst, technical program management, product operations, solutions, and associate consulting roles.",
};
