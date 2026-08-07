"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/lib/content";
import LiquidGlassButton from "@/components/pixel-perfect/liquid-glass-button";
import MagneticButton from "@/components/pixel-perfect/magnetic-button";
import HeroAtmosphere from "@/components/sections/HeroAtmosphere";
import HeroName from "@/components/sections/HeroName";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28"
    >
      <HeroAtmosphere />

      <div className="section-pad relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent"
        >
          {profile.title}
        </motion.p>

        <HeroName name={profile.name} />

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          className="mt-7 max-w-md text-sm leading-relaxed text-muted sm:text-base"
        >
          End-to-end AI — deep learning, vision, NLP, and generative
          systems from training and XAI through APIs, apps, and cloud.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.34, ease }}
          className="mt-10 flex flex-wrap items-center gap-1 sm:gap-2"
        >
          <div className="-m-4 sm:-m-6">
            <MagneticButton href="#projects">View projects</MagneticButton>
          </div>
          <LiquidGlassButton href={`mailto:${profile.email}`}>
            Email me
          </LiquidGlassButton>
        </motion.div>
      </div>
    </section>
  );
}
