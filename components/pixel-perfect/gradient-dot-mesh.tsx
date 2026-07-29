/**
 * Dot-mesh texture — adapted from Pixel Perfect gradient-dot-mesh.
 */
export default function GradientDotMesh({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 aura-grid opacity-60 ${className}`}
    />
  );
}
