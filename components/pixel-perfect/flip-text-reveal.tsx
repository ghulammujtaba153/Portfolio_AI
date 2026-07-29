"use client";

/**
 * Staggered word reveal inspired by Pixel Perfect flip-text-reveal (without Club Flip UI).
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FlipTextReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const orb = orbRef.current;
    const textEl = textRef.current;
    if (!root || !orb || !textEl) return;

    const words = textEl.querySelectorAll("[data-word]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set([orb, words], { opacity: 1, filter: "none", x: 0, scale: 1 });
      return;
    }

    gsap.set(orb, { opacity: 0, scale: 0.4, filter: "blur(10px)" });
    gsap.set(words, { opacity: 0, filter: "blur(8px)", y: 12 });

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        const tl = gsap.timeline();
        tl.to(orb, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power3.out",
        }).to(
          words,
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            stagger: 0.035,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.15",
        );
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [text]);

  return (
    <div ref={rootRef} className={`flex items-start gap-4 sm:gap-6 ${className}`}>
      <div
        ref={orbRef}
        className="mt-1 size-10 shrink-0 rounded-full sm:size-14"
        style={{
          background:
            "radial-gradient(45% 50% at 40% 45%, #c4c4cc 0%, rgba(196,196,204,0) 70%), radial-gradient(40% 60% at 80% 20%, #8b8b93 0%, transparent 70%), #2c2c32",
        }}
        aria-hidden
      />
      <p
        ref={textRef}
        className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
      >
        {text.split(" ").map((word, index, arr) => (
          <span key={`${word}-${index}`} data-word className="inline">
            {word}
            {index < arr.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
