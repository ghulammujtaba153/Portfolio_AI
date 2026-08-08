"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero name that lifts / glows under the cursor light.
 */
export default function HeroName({ name }: { name: string }) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const words = name.split(" ");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    let raf = 0;
    let mx = -9999;
    let my = -9999;
    let active = true;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!active) return;

      const letters = letterRefs.current;
      for (let i = 0; i < letters.length; i++) {
        const el = letters[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0) continue;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        const t = Math.max(0, 1 - dist / 140);
        const lift = t * -14;
        const scale = 1 + t * 0.12;
        const glow = t * 0.55;
        el.style.transform = `translate3d(0, ${lift}px, 0) scale(${scale})`;
        el.style.textShadow =
          glow > 0.02
            ? `0 0 ${18 * glow}px color-mix(in srgb, var(--accent) ${40 + glow * 60}%, transparent), 0 ${8 * glow}px ${20 * glow}px color-mix(in srgb, var(--cursor-glow) 80%, transparent)`
            : "none";
        el.style.color =
          glow > 0.08
            ? `color-mix(in srgb, var(--accent-strong) ${glow * 100}%, var(--ink))`
            : "";
      }

      const box = root.getBoundingClientRect();
      const lx = ((mx - box.left) / box.width) * 100;
      const ly = ((my - box.top) / box.height) * 100;
      const inside =
        mx >= box.left - 40 &&
        mx <= box.right + 40 &&
        my >= box.top - 40 &&
        my <= box.bottom + 40;
      root.style.setProperty("--spot-x", `${lx}%`);
      root.style.setProperty("--spot-y", `${ly}%`);
      root.style.setProperty("--spot-a", inside ? "0.22" : "0");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    tick();

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced, name]);

  return (
    <motion.h1
      ref={rootRef}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.08, ease }}
      className="relative mt-6 text-[clamp(4.25rem,15vw,10.5rem)] font-extrabold uppercase leading-[0.86] tracking-tighter text-ink"
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "50%",
          "--spot-a": "0",
        } as CSSProperties
      }
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-full blur-2xl transition-opacity duration-300"
        style={{
          opacity: "var(--spot-a)",
          background:
            "radial-gradient(circle at var(--spot-x) var(--spot-y), var(--cursor-glow), transparent 55%)",
        }}
      />
      <span className="relative flex flex-col">
        {words.map((word, wi) => (
          <span key={`${word}-${wi}`} className="block whitespace-nowrap">
            {word.split("").map((char, ci) => {
              const i =
                words.slice(0, wi).join(" ").length + (wi > 0 ? 1 : 0) + ci;
              return (
                <span
                  key={`${char}-${i}`}
                  ref={(el) => {
                    letterRefs.current[i] = el;
                  }}
                  className="inline-block will-change-transform"
                  style={{ transition: "color 80ms linear" }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </motion.h1>
  );
}
