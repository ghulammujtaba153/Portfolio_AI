import { profile } from "@/lib/content";
import GlassButton from "@/components/pixel-perfect/glass-button";
import LiquidGlassButton from "@/components/pixel-perfect/liquid-glass-button";
import StarBorder from "@/components/pixel-perfect/star-border";
import ScrollHeadline from "@/components/pixel-perfect/scroll-headline";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden section-pad section-y"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(50% 60% at 70% 40%, rgba(34,211,238,0.18), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          Contact
        </p>
        <ScrollHeadline className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          {"Let's ship the next intelligent system"}
        </ScrollHeadline>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Based in {profile.location}. Open to full-time, contract, and roles
          spanning research, ML engineering, and AI product delivery.
        </p>

        <StarBorder className="mt-10">
          <div className="flex flex-wrap items-center gap-4">
            <GlassButton href={`mailto:${profile.email}`} variant="cyan">
              {profile.email}
            </GlassButton>
            <LiquidGlassButton href={profile.phoneHref}>
              {profile.phone}
            </LiquidGlassButton>
            <LiquidGlassButton href={profile.github}>
              GitHub
            </LiquidGlassButton>
            <LiquidGlassButton href={profile.linkedin}>
              LinkedIn
            </LiquidGlassButton>
          </div>
        </StarBorder>
      </div>
    </section>
  );
}
