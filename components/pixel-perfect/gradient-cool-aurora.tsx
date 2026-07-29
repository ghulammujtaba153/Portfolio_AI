export default function GradientCoolAurora({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-90 ${className}`}
      style={{ background: "var(--aurora)" }}
    />
  );
}
