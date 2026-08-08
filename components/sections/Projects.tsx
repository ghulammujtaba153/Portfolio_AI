"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
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
        background: `linear-gradient(145deg, ${project.accent}66 0%, #121214 48%, #0a0a0b 100%)`,
      }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
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
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${8 - py * 6}deg) rotateY(${14 + px * 10}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = frameRef.current;
    if (!el) return;
    el.style.transform = "rotateX(8deg) rotateY(14deg) translateZ(0)";
  };

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ perspective: "1400px" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-5 bottom-[-10%] h-[32%] rounded-[100%] bg-ink/18 blur-2xl dark:bg-black/45"
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
          <div
            ref={frameRef}
            className="relative overflow-hidden border-[3px] border-ink bg-bg-elevated shadow-[10px_10px_0_var(--ink)] transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: "rotateX(8deg) rotateY(14deg)",
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
      <div className="mb-1.5 flex items-baseline justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
        <span className="text-ink">
          {String(index + 1).padStart(2, "0")}
          <span className="text-muted"> / {String(total).padStart(2, "0")}</span>
        </span>
        <span className="text-muted">
          {remaining === 0
            ? "Last"
            : `${String(remaining).padStart(2, "0")} left`}
        </span>
      </div>
      <div
        className="relative h-[3px] w-full overflow-hidden bg-ink/15"
        role="progressbar"
        aria-label="Featured projects progress"
        aria-valuenow={Math.round(((index + 1) / total) * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="absolute inset-y-0 left-0 origin-left bg-ink"
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
      <div className="relative h-36 w-[3px] overflow-hidden bg-ink/15">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-ink"
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
                "flex min-w-[1.75rem] items-center justify-center border border-ink px-1 py-0.5 font-mono text-[9px] font-bold tracking-[0.08em] transition-colors",
                i === index
                  ? "bg-ink text-bg"
                  : "bg-transparent text-muted hover:bg-ink/10 hover:text-ink",
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
        <li
          key={tool}
          className="border-[2px] border-ink bg-bg px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink"
        >
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
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(5rem,18vw,9rem)] font-extrabold leading-none tracking-tighter text-ink/[0.06] dark:text-ink/[0.09]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

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
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
            Featured · {project.year}
            {project.company ? ` · ${project.company}` : ""}
          </p>
          <h3 className="mt-2 text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold uppercase leading-[0.95] tracking-tighter">
            {project.title}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
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
                className="inline-flex size-10 items-center justify-center border-[3px] border-ink font-bold text-ink shadow-[3px_3px_0_var(--ink)] transition-transform enabled:hover:translate-x-[1px] enabled:hover:translate-y-[1px] enabled:hover:shadow-[2px_2px_0_var(--ink)] disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next project"
                disabled={index === total - 1}
                onClick={onNext}
                className="inline-flex size-10 items-center justify-center border-[3px] border-ink font-bold text-ink shadow-[3px_3px_0_var(--ink)] transition-transform enabled:hover:translate-x-[1px] enabled:hover:translate-y-[1px] enabled:hover:shadow-[2px_2px_0_var(--ink)] disabled:opacity-30"
              >
                →
              </button>
            </div>
            {project.href ? (
              <GlassButton href={project.href} variant="cyan">
                Open project
              </GlassButton>
            ) : (
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
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
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
            Projects · Selected work
          </p>
        </div>
        {featuredProjects.map((project, i) => (
          <article
            key={project.slug}
            className="grid items-center gap-8 border-t-[3px] border-ink pt-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.1fr)]"
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
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden border-y-[3px] border-ink bg-[var(--snow)]">
        <div className="section-pad relative mx-auto flex h-full w-full max-w-6xl flex-col pt-[4.75rem] pb-5 sm:pt-20">
          <PinProgress progress={smoothProgress} index={index} total={total} />

          <div className="mt-3 flex shrink-0 items-baseline justify-between gap-4">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
              Projects · Selected work
            </p>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:block">
              Scroll to advance
            </p>
          </div>

          <div className="relative mt-4 grid min-h-0 flex-1 items-center gap-6 sm:mt-5 sm:gap-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.15fr)] lg:gap-12 lg:pr-12">
            <StageFrame
              project={active}
              direction={direction}
              className="mx-auto w-full max-w-[15.5rem] sm:max-w-[17.5rem] lg:mx-0 lg:max-w-[19.5rem]"
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
                    "h-1.5 border border-ink transition-all",
                    i === index ? "w-6 bg-ink" : "w-1.5 bg-transparent",
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
        <div className="flex items-baseline justify-between gap-4 border-b-[3px] border-ink pb-4">
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
            More work
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {String(otherProjects.length).padStart(2, "0")} entries
          </span>
        </div>
        <ul className="mt-0 space-y-0">
          {otherProjects.map((project, i) => (
            <li
              key={project.slug}
              className="group border-b-[3px] border-ink transition-colors hover:bg-ink/[0.03] dark:hover:bg-ink/[0.06]"
            >
              <div className="grid items-center gap-4 py-4 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:gap-6 sm:py-5">
                <div className="relative hidden aspect-[16/10] overflow-hidden border-[2px] border-ink bg-bg-elevated sm:block">
                  <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
                    <div className="size-full transition-transform duration-500 ease-out group-hover:[transform:perspective(700px)_rotateY(-6deg)]">
                      <ProjectVisual project={project} />
                    </div>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <LineHoverTitle href={project.href}>
                      {project.title}
                    </LineHoverTitle>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1 max-w-2xl line-clamp-2 text-sm text-muted">
                    {project.summary}
                  </p>
                </div>
                <div className="shrink-0 self-start font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:self-center sm:text-right">
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
