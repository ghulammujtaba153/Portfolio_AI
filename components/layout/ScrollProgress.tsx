"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduced ? 400 : 120,
    damping: reduced ? 40 : 28,
    restDelta: 0.001,
  });

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="absolute inset-0 bg-ink/15" aria-hidden />
      <motion.div
        className="absolute inset-y-0 left-0 origin-left bg-ink"
        style={{ scaleX }}
      />
    </div>
  );
}
