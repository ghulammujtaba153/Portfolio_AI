"use client";

/**
 * Orbit carousel — adapted from Pixel Perfect for portfolio projects.
 */

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/content";

type OrbitCarouselProps = {
  items: Project[];
  onActiveChange?: (project: Project) => void;
};

export default function OrbitCarousel({
  items,
  onActiveChange,
}: OrbitCarouselProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dims, setDims] = useState({ rx: 330, ry: 78, cw: 190, ch: 250 });
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDims({ rx: 130, ry: 48, cw: 140, ch: 190 });
      } else if (w < 1024) {
        setDims({ rx: 230, ry: 64, cw: 168, ch: 220 });
      } else {
        setDims({ rx: 330, ry: 78, cw: 190, ch: 250 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const N = items.length;
    if (!N) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rot = 0;
    let vel = 0;
    let dragging = false;
    let lastX = 0;
    const drift = reduced ? 0 : 0.0026;

    const layout = () => {
      let bestNear = -1;
      let bestIdx = 0;
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const theta = (i / N) * Math.PI * 2 + rot;
        const x = Math.sin(theta) * dims.rx;
        const d = Math.cos(theta);
        const y = d * dims.ry;
        const near = (d + 1) / 2;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${0.5 + near * 0.6})`;
        el.style.zIndex = String(Math.round(near * 200));
        el.style.opacity = String(0.35 + near * 0.65);
        el.style.filter = reduced
          ? "none"
          : `blur(${(1 - near) * 2}px) brightness(${0.65 + near * 0.35})`;
        if (near > bestNear) {
          bestNear = near;
          bestIdx = i;
        }
      }
      if (bestIdx !== activeIndexRef.current) {
        activeIndexRef.current = bestIdx;
        onActiveChange?.(items[bestIdx]);
      }
    };

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!dragging) {
        rot += vel + drift;
        vel *= 0.95;
      }
      layout();
    };
    tick();
    onActiveChange?.(items[0]);

    const onDown = (e: PointerEvent) => {
      dragging = true;
      vel = 0;
      lastX = e.clientX;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      const dRot = dx * 0.0045;
      rot += dRot;
      vel = dRot;
    };
    const onUp = () => {
      dragging = false;
    };

    const scene = cardRefs.current[0]?.closest("[data-orbit]");
    scene?.addEventListener("pointerdown", onDown as EventListener);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      scene?.removeEventListener("pointerdown", onDown as EventListener);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [items, dims, onActiveChange]);

  return (
    <div
      data-orbit
      className="relative flex h-[min(70vh,560px)] w-full cursor-grab select-none items-center justify-center overflow-hidden active:cursor-grabbing"
    >
      <div className="relative">
        {items.map((card, i) => (
          <div
            key={card.slug}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute overflow-hidden rounded-xl ring-1 ring-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.55)]"
            style={{
              width: dims.cw,
              height: dims.ch,
              marginLeft: -dims.cw / 2,
              marginTop: -dims.ch / 2,
              willChange: "transform, opacity, filter",
              background: card.image
                ? "#0a0a0b"
                : `linear-gradient(160deg, ${card.accent}55 0%, #1a1a1c 55%, #0a0a0b 100%)`,
            }}
          >
            {card.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.image}
                alt=""
                className="absolute inset-0 size-full object-cover object-top"
                draggable={false}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />
            <div className="relative flex h-full flex-col justify-between p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                {card.year}
                {card.company ? ` · ${card.company}` : ""}
              </span>
              <div>
                <p className="text-lg font-semibold leading-tight text-white">
                  {card.title}
                </p>
                <p className="mt-2 line-clamp-3 text-[11px] leading-snug text-white/75">
                  {card.tools.slice(0, 4).join(" · ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
