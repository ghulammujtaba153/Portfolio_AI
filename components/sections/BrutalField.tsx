"use client";

/**
 * Large-scale brutal field — slabs tinted with ivory / cream / linen / snow.
 */
export default function BrutalField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--mist) 0%, var(--ivory) 40%, var(--linen) 100%)",
        }}
      />
      <div className="absolute inset-0 aura-grid opacity-35" />

      <div className="absolute -right-[4%] top-[8%] select-none font-display text-[min(70vw,28rem)] font-extrabold leading-none tracking-tighter text-ink/[0.07]">
        AI
      </div>

      {/* Snow slab */}
      <div
        className="absolute right-[6%] top-[18%] hidden h-[52vh] w-[34vw] max-w-[420px] border-[4px] border-ink shadow-[16px_16px_0_var(--ink)] lg:block"
        style={{ background: "var(--snow)" }}
      />
      {/* Cream slab */}
      <div
        className="absolute right-[18%] top-[38%] hidden h-[28vh] w-[22vw] max-w-[260px] border-[4px] border-ink shadow-[12px_12px_0_var(--bg)] lg:block"
        style={{ background: "var(--cream)" }}
      />
      <div className="absolute bottom-[12%] right-[8%] hidden h-4 w-[40vw] max-w-[480px] bg-ink lg:block" />
      {/* Ivory tile */}
      <div
        className="absolute top-[22%] right-[42%] hidden size-24 border-[4px] border-ink lg:block"
        style={{ background: "var(--ivory)" }}
      />
      {/* Linen diamond */}
      <div
        className="absolute bottom-[28%] right-[36%] hidden h-20 w-20 rotate-45 border-[4px] border-ink lg:block"
        style={{ background: "var(--linen)" }}
      />

      <div
        className="absolute inset-y-0 left-0 w-[55%]"
        style={{
          background:
            "linear-gradient(to right, var(--mist) 0%, color-mix(in srgb, var(--mist) 85%, transparent) 55%, transparent 100%)",
        }}
      />
    </div>
  );
}
