"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/lib/content";
import BrutalField from "@/components/sections/BrutalField";
import HeroName from "@/components/sections/HeroName";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden border-b-[4px] border-ink pb-16 pt-28 sm:items-center sm:pb-24"
    >
      <BrutalField />

      <div className="section-pad relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-block border-[3px] border-ink bg-bg px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink shadow-[4px_4px_0_var(--ink)]"
        >
          {profile.title}
        </motion.div>

        <HeroName name={profile.name} />

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease }}
          className="mt-8 max-w-lg border-l-[4px] border-ink pl-4 text-sm leading-relaxed text-muted sm:text-base"
        >
          Deep learning, vision, NLP, and generative systems — from training
          and XAI to APIs, React Native, and cloud deploy. Building at Mative;
          shipping client products on Fiverr.
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.24, ease }}
          className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted"
        >
          {profile.location} · Masters AI @ FAST · {profile.availability}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex border-[3px] border-ink bg-ink px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-bg shadow-[6px_6px_0_color-mix(in_srgb,var(--ink)_35%,transparent)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_color-mix(in_srgb,var(--ink)_35%,transparent)]"
          >
            View projects
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex border-[3px] border-ink bg-bg px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-ink shadow-[6px_6px_0_var(--ink)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--ink)]"
          >
            Email me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
