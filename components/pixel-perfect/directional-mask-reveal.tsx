"use client";

/**
 * Directional mask reveal — adapted from Pixel Perfect.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

export type WipeDirection = "top" | "bottom" | "left" | "right";

const HIDDEN: Record<WipeDirection, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};
const SHOWN = "inset(0% 0% 0% 0%)";

export default function DirectionalMaskReveal({
  direction = "left",
  src,
  alt = "Reveal",
  className = "",
}: {
  direction?: WipeDirection;
  src: string;
  alt?: string;
  className?: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const rootRef = useRef<HTMLButtonElement>(null);

  const reveal = () => {
    if (!imgRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(imgRef.current, { clipPath: SHOWN });
      return;
    }
    gsap.fromTo(
      imgRef.current,
      { clipPath: HIDDEN[direction] },
      { clipPath: SHOWN, duration: 1.1, ease: "power4.inOut" },
    );
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(root);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, src]);

  return (
    <button
      ref={rootRef}
      type="button"
      onClick={reveal}
      className={`relative aspect-[4/5] w-full max-w-md cursor-pointer overflow-hidden rounded-sm ${className}`}
      aria-label="Replay reveal"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="size-full object-cover"
        style={{ clipPath: HIDDEN[direction] }}
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
    </button>
  );
}
