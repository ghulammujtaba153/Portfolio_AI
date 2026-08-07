"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "motion/react";

type Node = { id: number; x: number; y: number; r: number; accent: boolean };

const NODES: Node[] = [
  { id: 0, x: 180, y: 320, r: 3.5, accent: false },
  { id: 1, x: 310, y: 210, r: 4.5, accent: true },
  { id: 2, x: 460, y: 240, r: 5, accent: true },
  { id: 3, x: 580, y: 160, r: 3.5, accent: false },
  { id: 4, x: 720, y: 220, r: 4, accent: true },
  { id: 5, x: 210, y: 480, r: 3, accent: false },
  { id: 6, x: 340, y: 390, r: 4, accent: false },
  { id: 7, x: 500, y: 470, r: 3.5, accent: true },
  { id: 8, x: 620, y: 360, r: 4.5, accent: false },
  { id: 9, x: 760, y: 300, r: 3.5, accent: true },
  { id: 10, x: 680, y: 520, r: 3, accent: false },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [5, 6],
  [6, 2],
  [2, 8],
  [8, 9],
  [1, 6],
  [6, 7],
  [7, 8],
  [2, 7],
  [7, 10],
  [3, 8],
  [8, 4],
  [4, 9],
  [0, 5],
];

const INFLUENCE = 160;

/**
 * Soft lights + interactive network web — follows pointer, lights nearby nodes/edges.
 */
export default function HeroAtmosphere() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<SVGGElement>(null);
  const cursorDotRef = useRef<SVGCircleElement>(null);
  const cursorLineRef = useRef<SVGLineElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const haloRefs = useRef<(SVGCircleElement | null)[]>([]);
  const edgeRefs = useRef<(SVGLineElement | null)[]>([]);

  const nodesById = useMemo(() => {
    const map = new Map<number, Node>();
    NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const web = webRef.current;
    if (!root || !web) return;

    let raf = 0;
    let mx = 0.72;
    let my = 0.35;
    let cx = 0.72;
    let cy = 0.35;
    let active = !reduced;

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        mx = 0.72;
        my = 0.35;
        return;
      }
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!active) return;

      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;

      const parallaxX = (cx - 0.5) * -28;
      const parallaxY = (cy - 0.5) * -18;
      web.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, 0)`;

      // Map pointer into SVG viewBox (900x700), biased to the web's right placement
      const svgX = 120 + cx * 780;
      const svgY = 40 + cy * 620;

      let nearest = NODES[0];
      let nearestDist = Infinity;

      NODES.forEach((node, i) => {
        const dx = node.x - svgX;
        const dy = node.y - svgY;
        const dist = Math.hypot(dx, dy);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = node;
        }
        const t = Math.max(0, 1 - dist / INFLUENCE);
        const el = nodeRefs.current[i];
        const halo = haloRefs.current[i];
        if (el) {
          const scale = 1 + t * 1.35;
          el.setAttribute("r", String(node.r * scale));
          el.style.opacity = String(0.35 + t * 0.65);
        }
        if (halo) {
          halo.setAttribute("r", String(node.r * (2.2 + t * 4)));
          halo.style.opacity = String(t * 0.35);
        }
      });

      EDGES.forEach(([a, b], i) => {
        const na = nodesById.get(a);
        const nb = nodesById.get(b);
        const line = edgeRefs.current[i];
        if (!na || !nb || !line) return;
        const da = Math.hypot(na.x - svgX, na.y - svgY);
        const db = Math.hypot(nb.x - svgX, nb.y - svgY);
        const t = Math.max(0, 1 - Math.min(da, db) / INFLUENCE);
        line.style.opacity = String(0.2 + t * 0.75);
        line.setAttribute("stroke-width", String(1 + t * 1.4));
      });

      const cursorDot = cursorDotRef.current;
      const cursorLine = cursorLineRef.current;
      if (cursorDot && cursorLine) {
        cursorDot.setAttribute("cx", String(svgX));
        cursorDot.setAttribute("cy", String(svgY));
        const show = nearestDist < INFLUENCE * 1.35;
        cursorDot.style.opacity = show ? "0.55" : "0";
        cursorLine.setAttribute("x1", String(nearest.x));
        cursorLine.setAttribute("y1", String(nearest.y));
        cursorLine.setAttribute("x2", String(svgX));
        cursorLine.setAttribute("y2", String(svgY));
        cursorLine.style.opacity = show
          ? String(0.15 + (1 - nearestDist / (INFLUENCE * 1.35)) * 0.45)
          : "0";
      }
    };

    if (!reduced) {
      tick();
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced, nodesById]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute -left-[10%] top-[-5%] h-[55vmin] w-[55vmin] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent) 0%, transparent 68%)",
        }}
      />
      <div
        className={`absolute right-[-5%] top-[12%] h-[48vmin] w-[48vmin] rounded-full opacity-60 blur-3xl ${reduced ? "" : "animate-[hero-glow_12s_ease-in-out_infinite]"}`}
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        className={`absolute bottom-[-15%] left-[35%] h-[42vmin] w-[42vmin] rounded-full opacity-50 blur-3xl ${reduced ? "" : "animate-[hero-glow_16s_ease-in-out_infinite_reverse]"}`}
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--muted) 20%, transparent) 0%, transparent 72%)",
        }}
      />

      <svg
        viewBox="0 0 900 700"
        className="absolute right-[-12%] top-[6%] h-[85%] w-[75%] max-w-none opacity-40 dark:opacity-50 sm:right-[-4%] sm:w-[58%]"
        fill="none"
      >
        <g ref={webRef} className="will-change-transform">
          {EDGES.map(([a, b], i) => {
            const na = nodesById.get(a)!;
            const nb = nodesById.get(b)!;
            return (
              <line
                key={`e-${a}-${b}`}
                ref={(el) => {
                  edgeRefs.current[i] = el;
                }}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="var(--ink)"
                strokeWidth="1"
                style={{ opacity: 0.25, transition: "opacity 80ms linear" }}
              />
            );
          })}

          <line
            ref={cursorLineRef}
            x1={0}
            y1={0}
            x2={0}
            y2={0}
            stroke="var(--accent)"
            strokeWidth="1.25"
            strokeDasharray="3 5"
            style={{ opacity: 0 }}
          />

          {NODES.map((node, i) => (
            <g key={node.id}>
              <circle
                ref={(el) => {
                  haloRefs.current[i] = el;
                }}
                cx={node.x}
                cy={node.y}
                r={node.r * 2}
                fill="var(--accent)"
                style={{ opacity: 0 }}
              />
              <circle
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={node.accent ? "var(--accent)" : "var(--ink)"}
                style={{ opacity: 0.45 }}
              />
            </g>
          ))}

          <circle
            ref={cursorDotRef}
            cx={0}
            cy={0}
            r={4}
            fill="var(--accent)"
            style={{ opacity: 0 }}
          />
        </g>
      </svg>

      <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-bg via-bg/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
