"use client";

import { motion, useReducedMotion } from "motion/react";
import { highlights, profile } from "@/lib/content";
import HeroAtmosphere from "@/components/sections/HeroAtmosphere";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-line pb-16 pt-28 sm:pb-20"
    >
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <HeroAtmosphere />

      <div className="section-pad relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          {...reveal(0)}
          className="inline-flex items-center rounded-full border border-line bg-bg-elevated/70 px-3 py-1 text-xs text-muted backdrop-blur"
        >
          {profile.availability}
        </motion.div>

        <motion.p
          {...reveal(0.05)}
          className="mt-8 font-mono text-sm text-muted"
        >
          {profile.name} <span className="text-subtle">—</span>{" "}
          <span className="text-accent">{profile.title}</span>
        </motion.p>

        <motion.h1
          {...reveal(0.1)}
          className="mt-4 max-w-4xl text-[clamp(2.5rem,6.5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink"
        >
          I build ML systems that go from{" "}
          <span className="text-accent">research to production.</span>
        </motion.h1>

        <motion.p
          {...reveal(0.18)}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Medical imaging, NLU, and generative AI — from training and
          explainability to APIs, React Native apps, and cloud deploy.
          Masters in AI at FAST, Islamabad.
        </motion.p>

        <motion.div
          {...reveal(0.24)}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className="btn btn-primary">
            View projects
            <span aria-hidden>→</span>
          </a>
          <a href={`mailto:${profile.email}`} className="btn btn-secondary">
            Get in touch
          </a>
        </motion.div>

        <motion.div
          {...reveal(0.32)}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4"
        >
          {highlights.map((item) => (
            <div key={item.label} className="bg-bg-elevated px-4 py-4">
              <p className="font-mono text-2xl font-medium tracking-tight text-ink">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-muted">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
