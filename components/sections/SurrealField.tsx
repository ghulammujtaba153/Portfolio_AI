"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Surreal dreamfield — floating solids, melting horizon, long shadow plaza.
 * Parallax follows the pointer; stays behind type.
 */
export default function SurrealField({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || reduced) return;

    let raf = 0;
    let mx = 0.65;
    let my = 0.4;
    let cx = 0.65;
    let cy = 0.4;
    let active = true;

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        mx = 0.65;
        my = 0.4;
        return;
      }
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!active) return;
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      const x = (cx - 0.5) * -36;
      const y = (cy - 0.5) * -22;
      const rot = (cx - 0.5) * 4;
      stage.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`;
    };

    tick();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 72% 38%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 65%), linear-gradient(180deg, transparent 40%, color-mix(in srgb, var(--ink) 6%, transparent) 100%)",
        }}
      />

      {/* Melting horizon */}
      <svg
        className="absolute inset-x-0 bottom-[-8%] h-[42%] w-full opacity-50 dark:opacity-40"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <g
          className={reduced ? "" : "origin-bottom animate-[surreal-melt_14s_ease-in-out_infinite]"}
          style={{ transformOrigin: "center bottom" }}
        >
          <path
            fill="color-mix(in srgb, var(--ink) 8%, transparent)"
            d="M0,224 C180,280 320,120 480,180 C640,240 720,300 900,220 C1080,140 1260,260 1440,200 L1440,320 L0,320 Z"
          />
        </g>
        <g
          className={
            reduced
              ? ""
              : "origin-bottom animate-[surreal-melt_18s_ease-in-out_infinite_reverse]"
          }
          style={{ transformOrigin: "center bottom" }}
        >
          <path
            fill="color-mix(in srgb, var(--accent) 7%, transparent)"
            d="M0,260 C220,200 400,300 560,250 C720,200 880,160 1040,230 C1200,300 1320,240 1440,260 L1440,320 L0,320 Z"
          />
        </g>
      </svg>

      <div
        ref={stageRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: "70% 45%" }}
      >
        {/* Chirico long shadow plaza */}
        <div
          className="absolute right-[8%] top-[28%] h-[46%] w-[38%] origin-top-left opacity-30 dark:opacity-25"
          style={{
            background:
              "linear-gradient(118deg, color-mix(in srgb, var(--ink) 35%, transparent) 0%, transparent 62%)",
            clipPath: "polygon(18% 0%, 42% 0%, 100% 100%, 0% 100%)",
            transform: "skewX(-12deg)",
          }}
        />

        {/* Floating doorway / aperture */}
        <div
          className={`absolute right-[18%] top-[16%] ${reduced ? "" : "animate-[surreal-float_11s_ease-in-out_infinite]"}`}
        >
          <div
            className="relative h-[42vmin] w-[28vmin] max-w-[240px] border border-line/80 bg-bg/20 backdrop-blur-[2px]"
            style={{
              borderRadius: "48% 48% 12% 12% / 38% 38% 8% 8%",
              boxShadow:
                "0 40px 80px -40px color-mix(in srgb, var(--ink) 45%, transparent), inset 0 0 40px color-mix(in srgb, var(--accent) 8%, transparent)",
            }}
          >
            <div
              className="absolute inset-[12%] border border-line/60"
              style={{
                borderRadius: "46% 46% 10% 10% / 36% 36% 6% 6%",
                background:
                  "radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%)",
              }}
            />
            <div className="absolute bottom-[14%] left-1/2 h-[3px] w-[42%] -translate-x-1/2 bg-accent/40" />
          </div>
        </div>

        {/* Impossible floating solids */}
        <div
          className={`absolute right-[48%] top-[22%] ${reduced ? "" : "animate-[surreal-float_13s_ease-in-out_infinite_reverse]"}`}
        >
          <div
            className="size-16 border border-line bg-bg-elevated/40"
            style={{
              transform: "rotate(18deg) skewY(-8deg)",
              boxShadow: "18px 28px 0 color-mix(in srgb, var(--ink) 12%, transparent)",
            }}
          />
        </div>
        <div
          className={`absolute right-[8%] top-[58%] ${reduced ? "" : "animate-[surreal-float_15s_ease-in-out_infinite]"}`}
        >
          <div
            className="size-24 rounded-full border border-line/70"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--accent) 25%, transparent), transparent 60%)",
              boxShadow: "0 30px 60px -20px color-mix(in srgb, var(--ink) 40%, transparent)",
            }}
          />
        </div>
        <div
          className={`absolute right-[36%] bottom-[22%] ${reduced ? "" : "animate-[surreal-drift_9s_ease-in-out_infinite]"}`}
        >
          <div
            className="h-3 w-28 bg-accent/30"
            style={{
              borderRadius: "40% 60% 50% 50%",
              filter: "blur(0.4px)",
              transform: "rotate(-8deg)",
            }}
          />
        </div>

        {/* Soft orb cluster */}
        <div
          className={`absolute right-[22%] top-[48%] size-[18vmin] rounded-full opacity-60 blur-2xl ${reduced ? "" : "animate-[hero-glow_16s_ease-in-out_infinite]"}`}
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-bg via-bg/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
