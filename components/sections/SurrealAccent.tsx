"use client";

/**
 * Soft surreal accents for section backgrounds — melting blobs + offset solids.
 */
export default function SurrealAccent({
  side = "right",
}: {
  side?: "left" | "right";
}) {
  const pos =
    side === "right"
      ? "right-[-12%] top-[10%]"
      : "left-[-14%] top-[18%]";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${pos} h-[55vmin] w-[55vmin] overflow-visible`}
    >
      <div
        className="absolute inset-[18%] rounded-full opacity-50 blur-3xl animate-[hero-glow_18s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute left-[22%] top-[28%] size-14 border border-line/70 bg-bg-elevated/30 animate-[surreal-float_12s_ease-in-out_infinite]"
        style={{
          transform: "rotate(24deg) skewX(-10deg)",
          boxShadow: "14px 22px 0 color-mix(in srgb, var(--ink) 10%, transparent)",
        }}
      />
      <div
        className="absolute right-[20%] bottom-[24%] h-2.5 w-24 bg-accent/25 animate-[surreal-drift_10s_ease-in-out_infinite]"
        style={{ borderRadius: "50% 40% 60% 50%", transform: "rotate(-14deg)" }}
      />
      <svg
        className="absolute inset-0 size-full opacity-40"
        viewBox="0 0 400 400"
        fill="none"
      >
        <ellipse
          cx="210"
          cy="200"
          rx="110"
          ry="70"
          stroke="var(--ink)"
          strokeOpacity="0.2"
          className="animate-[surreal-melt_16s_ease-in-out_infinite]"
          style={{ transformOrigin: "210px 200px" }}
        />
        <circle
          cx="250"
          cy="160"
          r="6"
          fill="var(--accent)"
          fillOpacity="0.45"
        />
      </svg>
    </div>
  );
}
