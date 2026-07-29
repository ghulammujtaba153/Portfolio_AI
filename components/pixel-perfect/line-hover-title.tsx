"use client";

import { useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

/**
 * Line hover decode — lightweight port of Pixel Perfect line-hover.
 */
export default function LineHoverTitle({
  children,
  href,
  className,
}: {
  children: string;
  href?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLSpanElement | null>(null);
  const original = useRef(children);

  const scramble = () => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const glyphs = "abcdefghijklmnopqrstuvwxyz0123456789";
    const chars = Array.from(original.current);

    const tween = { t: 0 };
    gsap.killTweensOf(tween);
    gsap.to(tween, {
      t: 1,
      duration: 0.55,
      ease: "none",
      onUpdate: () => {
        const settle = Math.floor(tween.t * chars.length);
        el.textContent = chars
          .map((ch, i) => {
            if (!/\S/.test(ch) || i < settle) return ch;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("");
      },
      onComplete: () => {
        el.textContent = original.current;
      },
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.textContent = original.current;
  };

  const classes = cn(
    "group relative inline-block text-lg font-medium text-ink transition-colors",
    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-[width] after:duration-300",
    "hover:text-accent hover:after:w-full",
    className,
  );

  if (href) {
    return (
      <a
        ref={(node) => {
          ref.current = node;
        }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onMouseEnter={scramble}
        onMouseLeave={reset}
      >
        {children}
      </a>
    );
  }

  return (
    <span
      ref={(node) => {
        ref.current = node;
      }}
      className={classes}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {children}
    </span>
  );
}
