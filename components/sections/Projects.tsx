"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  featuredProjects,
  otherProjects,
  type Project,
} from "@/lib/content";
import GlassButton from "@/components/pixel-perfect/glass-button";
import ScrollHeadline from "@/components/pixel-perfect/scroll-headline";
import LineHoverTitle from "@/components/pixel-perfect/line-hover-title";
import BrutalAccent from "@/components/sections/BrutalAccent";
import { cn } from "@/lib/utils";

function ProjectVisual({
  project,
  className,
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  if (project.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        className={cn("size-full object-cover object-top", className)}
        draggable={false}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <div
      className={cn("flex size-full items-end p-6", className)}
      style={{
        background: `linear-gradient(145deg, ${project.accent}66 0%, #121214 48%, #0a0a0b 100%)`,
      }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
        {project.tools.slice(0, 3).join(" · ")}
      </p>
    </div>
  );
}

function StageFrame({ project }: { project: Project }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${12 - py * 10}deg) rotateY(${-16 + px * 14}deg) translateZ(0)`;
    const gloss = el.querySelector<HTMLElement>("[data-gloss]");
    if (gloss) {
      gloss.style.background = `linear-gradient(${115 + px * 40}deg, rgba(255,255,255,0.16) 0%, transparent 42%, transparent 58%, rgba(255,255,255,0.06) 100%)`;
    }
  };

  const onLeave = () => {
    const el = frameRef.current;
    if (!el) return;
    el.style.transform = "rotateX(12deg) rotateY(-16deg) translateZ(0)";
    const gloss = el.querySelector<HTMLElement>("[data-gloss]");
    if (gloss) {
      gloss.style.background =
        "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)";
    }
  };

  return (
    <div
      className="relative w-full max-w-[22rem] sm:max-w-sm"
      style={{ perspective: "1200px" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 bottom-[-10%] h-[32%] rounded-[100%] bg-ink/15 blur-2xl dark:bg-black/45"
      />
      <div
        ref={frameRef}
        className="relative overflow-hidden border-[3px] border-ink bg-bg-elevated shadow-[10px_10px_0_var(--ink)] transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: "rotateX(12deg) rotateY(-16deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="flex h-7 items-center gap-1.5 border-b-[3px] border-ink bg-ink px-2.5">
          <span className="size-2 bg-bg" />
          <span className="size-2 bg-bg/70" />
          <span className="size-2 bg-bg/40" />
          <span className="ml-2 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-bg">
            {project.slug}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-bg">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              initial={reduced ? false : { opacity: 0, y: 18, scale: 1.02 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <ProjectVisual project={project} priority />
            </motion.div>
          </AnimatePresence>
          <div
            data-gloss
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)",
            }}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [index, setIndex] = useState(0);
  const active = featuredProjects[index] ?? featuredProjects[0];
  const reduced = useReducedMotion();

  const go = useCallback(
    (next: number) => {
      const n = featuredProjects.length;
      setIndex(((next % n) + n) % n);
    },
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const section = document.getElementById("projects");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        go(index + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  return (
    <section id="projects" className="section-y section-pad relative overflow-hidden">
      <BrutalAccent side="right" />

      <div className="relative mx-auto max-w-6xl">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
          Projects
        </p>
        <ScrollHeadline className="mt-3 max-w-4xl text-5xl font-extrabold uppercase tracking-tighter sm:text-6xl lg:text-7xl">
          Selected work
        </ScrollHeadline>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Deep learning, vision, NLP research, and production AI platforms —
          pick a title to skim the build.
        </p>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-6xl gap-10 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[15rem_minmax(0,1fr)]">
        <nav
          aria-label="Featured projects"
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
            {featuredProjects.map((project, i) => {
              const selected = i === index;
              return (
                <li key={project.slug} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    className={cn(
                      "group flex w-full items-baseline gap-3 border-b border-transparent px-3 py-2.5 text-left transition-colors lg:border-b-line lg:px-0",
                      selected
                        ? "text-ink"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[10px] tracking-[0.16em]",
                        selected ? "text-accent" : "text-muted/70",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium tracking-tight transition-transform duration-300",
                        selected && !reduced && "translate-x-1",
                      )}
                    >
                      {project.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="min-w-0">
          <StageFrame project={active} />

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {active.year}
                  {active.company ? ` · ${active.company}` : ""}
                </p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {active.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {active.summary}
                </p>
                <p className="mt-4 font-mono text-xs text-accent-strong/90">
                  {active.tools.join(" · ")}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={() => go(index - 1)}
                  className="inline-flex size-10 items-center justify-center border-[3px] border-ink font-bold text-ink shadow-[3px_3px_0_var(--ink)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--ink)]"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={() => go(index + 1)}
                  className="inline-flex size-10 items-center justify-center border-[3px] border-ink font-bold text-ink shadow-[3px_3px_0_var(--ink)] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--ink)]"
                >
                  →
                </button>
              </div>
              {active.href ? (
                <GlassButton href={active.href} variant="cyan">
                  Open project
                </GlassButton>
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  Link soon
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-6xl">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          More work
        </h3>
        <ul className="mt-8 space-y-0">
          {otherProjects.map((project, i) => (
            <li
              key={project.slug}
              className="group border-t-[3px] border-ink last:border-b-[3px]"
            >
              <div className="grid items-center gap-4 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:gap-5">
                <div className="relative hidden aspect-[16/10] overflow-hidden bg-bg-elevated sm:block">
                  <div
                    className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    style={{ transformOrigin: "center" }}
                  >
                    <div className="size-full transition-transform duration-500 ease-out group-hover:[transform:perspective(700px)_rotateY(-7deg)]">
                      <ProjectVisual project={project} />
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(120deg, rgba(255,255,255,0.12), transparent 45%)",
                    }}
                    aria-hidden
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <LineHoverTitle href={project.href}>
                      {project.title}
                    </LineHoverTitle>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1 max-w-2xl text-sm text-muted">
                    {project.summary}
                  </p>
                </div>
                <div className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {project.year}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
