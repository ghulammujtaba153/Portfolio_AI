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
  accent: string;
};

function StackCard({ i, job, progress, range, targetScale, accent }: CardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-24 flex justify-center pb-8 sm:top-28">
      <motion.article
        style={{
          scale,
          top: i * 18,
          borderColor: `${accent}55`,
        }}
        className="relative w-full max-w-3xl origin-top border bg-bg-elevated p-6 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)] sm:p-8"
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-2xl font-semibold text-ink sm:text-3xl">{job.role}</h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            {job.period}
          </span>
        </div>
        <p className="mt-1 text-muted">
          {job.company} · {job.location}
        </p>
        <ul className="mt-6 space-y-3">
          {job.bullets.map((bullet) => (
            <li
              key={bullet}
              className="border-l pl-4 text-sm leading-relaxed text-muted"
              style={{ borderColor: `${accent}66` }}
            >
              {bullet}
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

const ACCENTS = ["#c4c4cc", "#8b8b93"];

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
            accent={ACCENTS[i % ACCENTS.length]}
          />
        );
      })}
    </div>
  );
}
