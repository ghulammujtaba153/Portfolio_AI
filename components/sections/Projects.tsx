"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useLenis } from "lenis/react";
import {
  featuredProjects,
  otherProjects,
  type Project,
} from "@/lib/content";
import GlassButton from "@/components/pixel-perfect/glass-button";
import LineHoverTitle from "@/components/pixel-perfect/line-hover-title";
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
        background:
          "linear-gradient(145deg, color-mix(in srgb, var(--accent) 32%, #0d0d10) 0%, #0d0d10 72%)",
      }}
    >
      <p className="font-mono text-[11px] text-white/60">
        {project.tools.slice(0, 3).join(" · ")}
      </p>
    </div>
  );
}

function StageFrame({
  project,
  className,
  direction = 1,
}: {
  project: Project;
  className?: string;
  direction?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative w-full", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 60%, var(--glow), transparent 70%)",
        }}
      />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={project.slug}
          custom={direction}
          initial={
            reduced
              ? false
              : { opacity: 0, y: direction > 0 ? 36 : -36, scale: 0.98 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reduced
              ? undefined
              : { opacity: 0, y: direction > 0 ? -28 : 28, scale: 0.98 }
          }
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="card relative overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
            <div className="flex h-8 items-center gap-1.5 border-b border-line bg-bg-panel px-3">
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="ml-2 truncate font-mono text-[10px] text-subtle">
                {project.href
                  ? project.href.replace(/^https?:\/\//, "").replace(/\/$/, "")
                  : project.slug}
              </span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-bg">
              <ProjectVisual project={project} priority />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PinProgress({
  progress,
  index,
  total,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const remaining = Math.max(0, total - index - 1);

  return (
    <div className="shrink-0">
      <div className="mb-2 flex items-baseline justify-between gap-4 font-mono text-xs">
        <span className="text-ink">
          {String(index + 1).padStart(2, "0")}
          <span className="text-muted"> / {String(total).padStart(2, "0")}</span>
        </span>
        <span className="text-muted">
          {remaining === 0 ? "Last" : `${remaining} more`}
        </span>
      </div>
      <div
        className="relative h-px w-full overflow-hidden bg-line-strong"
        role="progressbar"
        aria-label="Featured projects progress"
        aria-valuenow={Math.round(((index + 1) / total) * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="absolute inset-y-0 left-0 origin-left bg-accent"
          style={{ scaleX: progress }}
        />
      </div>
    </div>
  );
}

function VerticalRail({
  progress,
  index,
  total,
  onSelect,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:right-0 lg:flex xl:-right-2">
      <div className="relative h-36 w-px overflow-hidden bg-line-strong">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-accent"
          style={{ scaleY: progress }}
        />
      </div>
      <ol className="flex flex-col gap-1">
        {Array.from({ length: total }, (_, i) => (
          <li key={i}>
            <button
              type="button"
              aria-label={`Go to project ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => onSelect(i)}
              className={cn(
                "flex min-w-[1.75rem] items-center justify-center rounded-md px-1 py-0.5 font-mono text-[10px] transition-colors",
                i === index
                  ? "bg-accent-soft text-accent"
                  : "text-subtle hover:bg-bg-highlight hover:text-ink",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ToolChips({ tools }: { tools: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {tools.map((tool) => (
        <li key={tool} className="chip">
          {tool}
        </li>
      ))}
    </ul>
  );
}

function ProjectCopy({
  project,
  index,
  total,
  direction,
  onPrev,
  onNext,
}: {
  project: Project;
  index: number;
  total: number;
  direction: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex h-full min-w-0 flex-col justify-center">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={project.slug}
          custom={direction}
          initial={
            reduced ? false : { opacity: 0, y: direction > 0 ? 22 : -22 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={
            reduced ? undefined : { opacity: 0, y: direction > 0 ? -18 : 18 }
          }
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <p className="font-mono text-xs text-subtle">
            {project.year}
            {project.company ? ` · ${project.company}` : ""}
          </p>
          <h3 className="mt-2 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {project.summary}
          </p>
          <ToolChips tools={project.tools} />

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous project"
                disabled={index === 0}
                onClick={onPrev}
                className="inline-flex size-10 items-center justify-center rounded-lg border border-line-strong bg-bg-elevated text-ink transition-colors enabled:hover:border-muted disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next project"
                disabled={index === total - 1}
                onClick={onNext}
                className="inline-flex size-10 items-center justify-center rounded-lg border border-line-strong bg-bg-elevated text-ink transition-colors enabled:hover:border-muted disabled:opacity-30"
              >
                →
              </button>
            </div>
            {project.href ? (
              <GlassButton href={project.href} variant="cyan">
                Live demo <span aria-hidden>↗</span>
              </GlassButton>
            ) : (
              <span className="font-mono text-xs text-subtle">
                Link soon
              </span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PinnedStage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const active = featuredProjects[index] ?? featuredProjects[0];
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const trackRef = useRef<HTMLDivElement>(null);
  const total = featuredProjects.length;
  const prevIndex = useRef(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: reduced ? 500 : 90,
    damping: reduced ? 50 : 28,
    restDelta: 0.001,
  });

  const indexMV = useTransform(scrollYProgress, (v) => {
    if (total <= 1) return 0;
    return Math.min(total - 1, Math.floor(v * total * 0.999));
  });

  useMotionValueEvent(indexMV, "change", (v) => {
    if (v !== prevIndex.current) {
      setDirection(v > prevIndex.current ? 1 : -1);
      prevIndex.current = v;
      setIndex(v);
    }
  });

  const go = useCallback(
    (next: number) => {
      const target = Math.max(0, Math.min(total - 1, next));
      setDirection(target >= index ? 1 : -1);
      const el = trackRef.current;
      if (!el) {
        prevIndex.current = target;
        setIndex(target);
        return;
      }

      const top = el.getBoundingClientRect().top + window.scrollY;
      const range = Math.max(1, el.offsetHeight - window.innerHeight);
      const y = top + ((target + 0.5) / total) * range;

      if (lenis) {
        lenis.scrollTo(y, { duration: 1.05 });
      } else {
        window.scrollTo({
          top: y,
          behavior: reduced ? "auto" : "smooth",
        });
      }
    },
    [index, lenis, reduced, total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pinned =
        rect.top <= 8 && rect.bottom >= window.innerHeight * 0.55;
      if (!pinned) return;

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

  if (reduced) {
    return (
      <div className="section-pad space-y-14 py-14">
        <div>
          <p className="eyebrow">03 · Selected work</p>
        </div>
        {featuredProjects.map((project, i) => (
          <article
            key={project.slug}
            className="grid items-center gap-8 border-t border-line pt-10 lg:grid-cols-2"
          >
            <StageFrame project={project} direction={1} />
            <ProjectCopy
              project={project}
              index={i}
              total={total}
              direction={1}
              onPrev={() => {}}
              onNext={() => {}}
            />
          </article>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-bg">
        <div className="section-pad relative mx-auto flex h-full w-full max-w-6xl flex-col pt-[4.75rem] pb-5 sm:pt-20">
          <PinProgress progress={smoothProgress} index={index} total={total} />

          <div className="mt-3 flex shrink-0 items-baseline justify-between gap-4">
            <p className="eyebrow">03 · Selected work</p>
            <p className="hidden font-mono text-xs text-subtle sm:block">
              Scroll to advance
            </p>
          </div>

          <div className="relative mt-4 grid min-h-0 flex-1 items-center gap-6 sm:mt-5 sm:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pr-12">
            <StageFrame
              project={active}
              direction={direction}
              className="mx-auto w-full max-w-[17rem] sm:max-w-[22rem] lg:mx-0 lg:max-w-[30rem]"
            />
            <ProjectCopy
              project={active}
              index={index}
              total={total}
              direction={direction}
              onPrev={() => go(index - 1)}
              onNext={() => go(index + 1)}
            />
          </div>

          {/* Mobile step strip */}
          <ol className="mt-4 flex shrink-0 justify-center gap-1.5 lg:hidden">
            {featuredProjects.map((project, i) => (
              <li key={project.slug}>
                <button
                  type="button"
                  aria-label={`Go to ${project.title}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => go(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-accent" : "w-1.5 bg-line-strong",
                  )}
                />
              </li>
            ))}
          </ol>

          <VerticalRail
            progress={smoothProgress}
            index={index}
            total={total}
            onSelect={go}
          />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative">
      <PinnedStage />

      <div className="section-pad section-y relative mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <h3 className="text-2xl font-semibold tracking-tight">More work</h3>
          <span className="font-mono text-xs text-subtle">
            {otherProjects.length} projects
          </span>
        </div>
        <ul className="mt-0 space-y-0">
          {otherProjects.map((project) => (
            <li
              key={project.slug}
              className="group border-b border-line transition-colors hover:bg-bg-panel/60"
            >
              <div className="grid items-center gap-4 py-4 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:gap-6 sm:py-5">
                <div className="relative hidden aspect-[16/10] overflow-hidden rounded-md border border-line bg-bg-elevated sm:block">
                  <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                    <ProjectVisual project={project} />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <LineHoverTitle href={project.href}>
                      {project.title}
                    </LineHoverTitle>
                    {project.company ? (
                      <span className="chip">
                        {project.company}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 max-w-2xl line-clamp-2 text-sm text-muted">
                    {project.summary}
                  </p>
                </div>
                <div className="shrink-0 self-start font-mono text-xs text-subtle sm:self-center sm:text-right">
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
