"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Word-stagger headline reveal on scroll into view. */
export default function ScrollHeadline({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(words, { opacity: 1, y: 0, filter: "none" });
      return;
    }

    gsap.set(words, { opacity: 0, y: 18, filter: "blur(6px)" });

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        gsap.to(words, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.045,
          duration: 0.55,
          ease: "power3.out",
        });
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [children]);

  // Decode HTML entities that may appear in source text
  const text = children.replace(/&apos;/g, "'").replace(/&amp;/g, "&");

  return (
    <h2 ref={ref} className={className}>
      {text.split(" ").map((word, i, arr) => (
        <span key={`${word}-${i}`} data-word className="inline-block">
          {word}
          {i < arr.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </h2>
  );
}
