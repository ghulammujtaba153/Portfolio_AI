"use client";

/**
 * Orbit carousel — 3D ring with perspective, yaw, and depth.
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
  const shineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dims, setDims] = useState({
    rx: 330,
    ry: 78,
    rz: 220,
    cw: 190,
    ch: 250,
  });
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDims({ rx: 130, ry: 48, rz: 110, cw: 140, ch: 190 });
      } else if (w < 1024) {
        setDims({ rx: 230, ry: 64, rz: 160, cw: 168, ch: 220 });
      } else {
        setDims({ rx: 330, ry: 78, rz: 220, cw: 190, ch: 250 });
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
        const z = Math.cos(theta) * dims.rz;
        const y = Math.cos(theta) * dims.ry;
        const near = (Math.cos(theta) + 1) / 2;
        const rotY = reduced ? 0 : -Math.sin(theta) * 42;
        const rotX = reduced ? 0 : 8 - near * 10;
        const scale = 0.58 + near * 0.52;

        el.style.transform = [
          `translate3d(${x}px, ${y}px, ${z}px)`,
          `rotateY(${rotY}deg)`,
          `rotateX(${rotX}deg)`,
          `scale(${scale})`,
        ].join(" ");
        el.style.zIndex = String(Math.round(near * 200));
        el.style.opacity = String(0.32 + near * 0.68);
        el.style.filter = reduced
          ? "none"
          : `blur(${(1 - near) * 1.8}px) brightness(${0.62 + near * 0.38})`;

        const shine = shineRefs.current[i];
        if (shine && !reduced) {
          const lx = 50 + Math.sin(theta) * 38;
          shine.style.background = `radial-gradient(circle at ${lx}% 18%, rgba(255,255,255,${0.08 + near * 0.18}) 0%, transparent 52%)`;
        }

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
      style={{ perspective: "1100px", perspectiveOrigin: "50% 42%" }}
    >
      <div
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {items.map((card, i) => (
          <div
            key={card.slug}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute overflow-hidden rounded-xl ring-1 ring-white/20 shadow-[0_30px_60px_-18px_rgba(0,0,0,0.7)]"
            style={{
              width: dims.cw,
              height: dims.ch,
              marginLeft: -dims.cw / 2,
              marginTop: -dims.ch / 2,
              willChange: "transform, opacity, filter",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
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
            <div
              ref={(el) => {
                shineRefs.current[i] = el;
              }}
              className="pointer-events-none absolute inset-0"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-px bg-white/25"
              aria-hidden
            />
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
