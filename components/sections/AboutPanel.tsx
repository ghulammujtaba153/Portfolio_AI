"use client";

/**
 * Inline about visual — avoids broken <img> SVG loads; still supports clip reveal.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutPanel({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(root, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    gsap.set(root, { clipPath: "inset(0% 100% 0% 0%)" });

    const reveal = () => {
      gsap.to(root, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        ease: "power4.inOut",
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        reveal();
        io.disconnect();
        clearTimeout(t);
      },
      { threshold: 0.2 },
    );
    io.observe(root);

    const t = window.setTimeout(() => {
      reveal();
      io.disconnect();
    }, 1800);

    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative aspect-[4/5] w-full max-w-md overflow-hidden ${className}`}
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <svg
        viewBox="0 0 800 1000"
        className="size-full"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Neural mesh visual"
      >
        <g stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1.2" fill="none">
          <circle cx="400" cy="420" r="180" />
          <circle cx="400" cy="420" r="260" />
          <circle cx="400" cy="420" r="340" />
          <path d="M120 420 H680 M400 140 V700" />
          <path d="M210 230 L590 610 M590 230 L210 610" />
        </g>
        <g fill="var(--ink)">
          <circle cx="400" cy="420" r="10" />
          <circle cx="400" cy="240" r="6" fill="var(--accent)" />
          <circle cx="560" cy="420" r="6" fill="var(--accent)" />
          <circle cx="400" cy="600" r="6" fill="var(--accent)" />
          <circle cx="240" cy="420" r="6" fill="var(--accent)" />
          <circle cx="520" cy="280" r="5" />
          <circle cx="280" cy="560" r="5" />
        </g>
        <text
          x="64"
          y="900"
          fill="var(--muted)"
          fontFamily="ui-monospace, monospace"
          fontSize="22"
          letterSpacing="4"
        >
          AI ENGINEER
        </text>
      </svg>
    </div>
  );
}
