/**
 * Hard brutal accent blocks using palette surfaces.
 */
export default function BrutalAccent({
  side = "right",
}: {
  side?: "left" | "right";
}) {
  const pos = side === "right" ? "right-0 top-8" : "left-0 top-12";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${pos} hidden h-[40vmin] w-[36vmin] md:block`}
    >
      <div
        className="absolute inset-[10%] border-[3px] border-ink shadow-[10px_10px_0_var(--ink)]"
        style={{ background: "var(--snow)" }}
      />
      <div
        className="absolute bottom-[8%] left-[18%] h-3 w-[70%]"
        style={{ background: "var(--cream)" }}
      />
      <div
        className="absolute right-[6%] top-[14%] size-16 border-[3px] border-ink"
        style={{ background: "var(--linen)" }}
      />
      <div
        className="absolute left-[12%] top-[12%] size-8 border-[3px] border-ink"
        style={{ background: "var(--ivory)" }}
      />
    </div>
  );
}
