"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ComponentProps } from "react";

import { GitHubIcon, Monogram } from "@/components/ui/Icons";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type SectionId = (typeof nav)[number]["id"];

/**
 * Tracks which block of the page crosses a line 35% down the viewport, using
 * an IntersectionObserver so scrolling never forces a layout read. Every
 * top-level block in <main> is observed; blocks that aren't in the nav (the
 * workflow, statements, testimonials) count as the nav section before them.
 */
function useActiveSection(pathname: string): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    if (pathname !== "/") return;
    const main = document.getElementById("main");
    if (!main) return;
    const ids = new Set<string>(nav.map((n) => n.id));
    const owner = new Map<Element, SectionId>();
    let current: SectionId = "home";
    for (const el of Array.from(main.children)) {
      if (ids.has(el.id)) current = el.id as SectionId;
      owner.set(el, current);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = owner.get(entry.target);
          if (entry.isIntersecting && id) setActive(id);
        }
      },
      { rootMargin: "-35% 0px -64% 0px" },
    );
    owner.forEach((_, el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Case study pages belong to the Work section
  if (pathname.startsWith("/work/")) return "work";
  return active;
}

/** Same-page anchor on the home page; a link back to that section from anywhere else */
function SectionLink({ id, onHome, ...rest }: { id: string; onHome: boolean } & Omit<ComponentProps<"a">, "href">) {
  return onHome ? <a href={`#${id}`} {...rest} /> : <Link href={`/#${id}`} {...rest} />;
}

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, manage focus
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const button = menuButton.current;
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      button?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-linear-to-r from-signal via-volt to-ion"
        style={{ scaleX: progress }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:px-8">
        <nav
          aria-label="Primary"
          className={cn(
            "flex h-14 items-center justify-between rounded-full pl-3 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
            scrolled || open
              ? "glass glass-blur bg-ink-900/70 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.8)]"
              : "border border-transparent",
          )}
        >
          <SectionLink
            id="home"
            onHome={onHome}
            className="group flex items-center gap-2.5 rounded-full pr-2"
            aria-label={onHome ? `${site.name}, back to top` : `${site.name}, home`}
          >
            <Monogram className="size-8 transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg]" />
            <span className="font-display text-[0.95rem] font-semibold tracking-tight">{site.name}</span>
          </SectionLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <SectionLink
                    id={item.id}
                    onHome={onHome}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-signal/25 bg-signal/10 shadow-[0_0_20px_-6px_rgb(67_226_255/0.5)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </SectionLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-4 text-sm text-fg transition-all duration-300 hover:border-signal/40 hover:bg-signal/10 hover:shadow-[0_0_24px_-6px_rgb(67_226_255/0.5)]"
            >
              <GitHubIcon className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-[-12deg]" />
              <span className="hidden sm:inline">GitHub</span>
              <span className="sr-only sm:hidden">GitHub</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              ref={menuButton}
              type="button"
              className="flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-white/5 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-0 -z-10 bg-ink-950/[0.97] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className="flex h-full flex-col justify-center gap-1 px-8"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: ease.outExpo }}
                >
                  <SectionLink
                    ref={i === 0 ? firstLink : undefined}
                    id={item.id}
                    onHome={onHome}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-4 py-2 font-display text-4xl font-semibold tracking-tight transition-colors",
                      active === item.id ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    <span className="label text-signal/70">0{i + 1}</span>
                    {item.label}
                  </SectionLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
