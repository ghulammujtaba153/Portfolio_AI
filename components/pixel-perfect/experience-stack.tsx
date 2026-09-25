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
        className="card relative w-full max-w-3xl origin-top p-6 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)] sm:p-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            {job.role}
          </h3>
          <span className="chip">
            {job.period}
          </span>
        </div>
        <p className="mt-1 text-base font-medium text-accent">
          {job.company}
        </p>
        <p className="mt-0.5 text-sm text-subtle">
          {job.location}
        </p>
        <ul className="mt-6 space-y-3 border-t border-line pt-6">
          {job.bullets.map((bullet) => (
            <li
              key={bullet}
              className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-line-strong"
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
