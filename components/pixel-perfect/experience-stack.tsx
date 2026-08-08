"use client";

/**
 * Scroll-driven stacking cards — adapted from Pixel Perfect for experience roles.
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { experience } from "@/lib/content";

type Job = (typeof experience)[number];

type CardProps = {
  i: number;
  job: Job;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

function StackCard({ i, job, progress, range, targetScale }: Omit<CardProps, "accent">) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-24 flex justify-center pb-8 sm:top-28">
      <motion.article
        style={{
          scale,
          top: i * 18,
        }}
        className="relative w-full max-w-3xl origin-top border-[3px] border-ink bg-bg p-6 shadow-[10px_10px_0_var(--ink)] sm:p-8"
      >
        <div className="mb-5 h-3 w-full bg-ink" />
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
            {job.role}
          </h3>
          <span className="border-[2px] border-ink px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
            {job.period}
          </span>
        </div>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {job.company} · {job.location}
        </p>
        <ul className="mt-6 space-y-3">
          {job.bullets.map((bullet) => (
            <li
              key={bullet}
              className="border-l-[3px] border-ink pl-4 text-sm leading-relaxed text-muted"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export default function ExperienceStack({ jobs }: { jobs: Job[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative mt-10"
      style={{ height: `${Math.max(jobs.length, 1) * 85}vh` }}
    >
      {jobs.map((job, i) => {
        const targetScale = 1 - (jobs.length - i) * 0.05;
        return (
          <StackCard
            key={job.company}
            i={i}
            job={job}
            progress={scrollYProgress}
            range={[i * (1 / jobs.length), 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
