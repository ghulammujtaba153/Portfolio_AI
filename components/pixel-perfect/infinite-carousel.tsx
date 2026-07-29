"use client";

/**
 * Infinite carousel — adapted from Pixel Perfect for skill marquee.
 */
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { skillLogoSrc, type SkillLogoId } from "@/components/skills/skill-logos";

gsap.registerPlugin(useGSAP);

export type Slide = {
  title: string;
  tag: string;
  gradient: string;
  logo?: SkillLogoId;
};

const SPEED = 90;

export default function InfiniteCarousel({ slides }: { slides: Slide[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container || slides.length === 0) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const firstCard = track.children[0] as HTMLElement;
      const cardWidth =
        firstCard.offsetWidth +
        parseFloat(getComputedStyle(firstCard).marginRight);
      const loopWidth = cardWidth * slides.length;

      const loop = gsap.to(track, {
        x: -loopWidth,
        duration: loopWidth / SPEED,
        ease: "none",
        repeat: -1,
      });

      const wrapTime = gsap.utils.wrap(0, loop.duration());
      const pxPerSec = loopWidth / loop.duration();

      let dragging = false;
      let base = 1;
      let targetBase = 1;
      let scroll = 0;

      const tick = () => {
        base += (targetBase - base) * 0.1;
        scroll *= 0.9;
        if (Math.abs(scroll) < 0.001) scroll = 0;
        if (!dragging) loop.timeScale(base + scroll);
      };
      gsap.ticker.add(tick);

      const onEnter = () => {
        targetBase = 0.15;
      };
      const onLeave = () => {
        targetBase = 1;
      };
      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        scroll = gsap.utils.clamp(-60, 1000, scroll + e.deltaY * 0.018);
      };
      container.addEventListener("wheel", onWheel, { passive: false });

      let startX = 0;
      let startTime = 0;

      const onDown = (e: PointerEvent) => {
        dragging = true;
        startX = e.clientX;
        startTime = loop.time();
        loop.pause();
        container.setPointerCapture(e.pointerId);
        container.style.cursor = "grabbing";
      };

      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - startX;
        loop.time(wrapTime(startTime - dx / pxPerSec));
      };

      const onUp = (e: PointerEvent) => {
        if (!dragging) return;
        dragging = false;
        loop.play();
        container.releasePointerCapture(e.pointerId);
        container.style.cursor = "";
      };

      container.addEventListener("pointerdown", onDown);
      container.addEventListener("pointermove", onMove);
      container.addEventListener("pointerup", onUp);
      container.addEventListener("pointercancel", onUp);

      return () => {
        gsap.ticker.remove(tick);
        container.removeEventListener("wheel", onWheel);
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
        container.removeEventListener("pointerdown", onDown);
        container.removeEventListener("pointermove", onMove);
        container.removeEventListener("pointerup", onUp);
        container.removeEventListener("pointercancel", onUp);
      };
    },
    { scope: containerRef, dependencies: [slides] },
  );

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="w-full cursor-grab touch-none select-none overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {[...slides, ...slides].map((s, i) => (
            <article
              key={`${s.title}-${i}`}
              className="mr-5 flex h-44 w-52 shrink-0 flex-col justify-between rounded-2xl p-5 text-white shadow-xl sm:h-52 sm:w-60"
              style={{ backgroundImage: s.gradient }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white/70">{s.tag}</span>
                {s.logo ? (
                  <Image
                    src={skillLogoSrc[s.logo]}
                    alt=""
                    width={28}
                    height={28}
                    unoptimized
                    className="opacity-95 drop-shadow"
                  />
                ) : null}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
