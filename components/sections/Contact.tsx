import { profile } from "@/lib/content";
import GlassButton from "@/components/pixel-perfect/glass-button";
import LiquidGlassButton from "@/components/pixel-perfect/liquid-glass-button";
import ScrollHeadline from "@/components/pixel-perfect/scroll-headline";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden section-pad section-y"
    >
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--glow), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="eyebrow">05 · Contact</p>
        <ScrollHeadline className="heading mt-3">
          {"Let's build the next intelligent system"}
        </ScrollHeadline>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          Based in {profile.location}. {profile.availability} — research, ML
          engineering, and AI product roles. Email is the fastest way to reach
          me.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <GlassButton href={`mailto:${profile.email}`}>
            {profile.email}
          </GlassButton>
          <LiquidGlassButton href={profile.linkedin}>LinkedIn</LiquidGlassButton>
          <LiquidGlassButton href={profile.github}>GitHub</LiquidGlassButton>
        </div>
        <a
          href={profile.phoneHref}
          className="mt-6 font-mono text-sm text-subtle transition-colors hover:text-ink"
        >
          {profile.phone}
        </a>
      </div>
    </section>
  );
}
