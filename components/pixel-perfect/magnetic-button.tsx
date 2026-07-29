"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const STRENGTH = 0.35;
const LABEL_STRENGTH = 0.2;

export default function MagneticButton({
  children = "Hover Me",
  className,
  href,
}: {
  children?: ReactNode;
  className?: string;
  href?: string;
}) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const btn = btnRef.current;
    const label = labelRef.current;
    if (!zone || !btn || !label) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = zone.getBoundingClientRect();
      const mapX = gsap.utils.mapRange(
        rect.left,
        rect.right,
        -rect.width / 2,
        rect.width / 2,
        e.clientX,
      );
      const mapY = gsap.utils.mapRange(
        rect.top,
        rect.bottom,
        -rect.height / 2,
        rect.height / 2,
        e.clientY,
      );

      gsap.to(btn, {
        x: mapX * STRENGTH,
        y: mapY * STRENGTH,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(label, {
        x: mapX * LABEL_STRENGTH,
        y: mapY * LABEL_STRENGTH,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const onLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: "elastic.out(1,0.4)",
        overwrite: "auto",
      });
      gsap.to(label, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: "elastic.out(1,0.4)",
        overwrite: true,
      });
    };

    zone.addEventListener("mousemove", onMove);
    zone.addEventListener("mouseleave", onLeave);
    return () => {
      zone.removeEventListener("mousemove", onMove);
      zone.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf([btn, label]);
    };
  }, []);

  const classes = cn(
    "rounded-sm bg-accent px-7 py-3 text-sm font-semibold text-bg shadow-[0_12px_28px_-14px_rgba(0,0,0,0.55)]",
    className,
  );

  const label = (
    <span ref={labelRef} className="inline-block">
      {children}
    </span>
  );

  return (
    <div ref={zoneRef} className="grid place-items-center p-6">
      {href ? (
        <a
          ref={(el) => {
            btnRef.current = el;
          }}
          href={href}
          className={classes}
        >
          {label}
        </a>
      ) : (
        <button
          ref={(el) => {
            btnRef.current = el;
          }}
          type="button"
          className={classes}
        >
          {label}
        </button>
      )}
    </div>
  );
}
