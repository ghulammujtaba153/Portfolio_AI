import { profile } from "@/lib/content";
import GradientCoolAurora from "@/components/pixel-perfect/gradient-cool-aurora";
import GradientDotMesh from "@/components/pixel-perfect/gradient-dot-mesh";
import TextMatrixRain from "@/components/pixel-perfect/text-matrix-rain";
import LiquidGlassButton from "@/components/pixel-perfect/liquid-glass-button";
import MagneticButton from "@/components/pixel-perfect/magnetic-button";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-24"
    >
      <GradientCoolAurora />
      <GradientDotMesh />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />

      <div className="section-pad relative z-10 mx-auto w-full max-w-6xl">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          Islamabad · AI systems · Full stack
        </p>

        <TextMatrixRain
          className="font-display text-[clamp(2.75rem,10vw,6.5rem)] font-extrabold leading-[0.92] tracking-tight text-ink"
          accentColor="var(--accent)"
          repeat={false}
        >
          {profile.name}
        </TextMatrixRain>

        <p className="mt-5 max-w-xl text-lg text-muted sm:text-xl">
          {profile.title}. Shipping research-grade AI into production MERN
          products — from neural nets to cloud.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <MagneticButton href="#projects">View projects</MagneticButton>
          <LiquidGlassButton href={`mailto:${profile.email}`}>
            Email me
          </LiquidGlassButton>
        </div>
      </div>
    </section>
  );
}
