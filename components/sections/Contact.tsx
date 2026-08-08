import { profile } from "@/lib/content";
import GlassButton from "@/components/pixel-perfect/glass-button";
import LiquidGlassButton from "@/components/pixel-perfect/liquid-glass-button";
import StarBorder from "@/components/pixel-perfect/star-border";
import ScrollHeadline from "@/components/pixel-perfect/scroll-headline";
import BrutalAccent from "@/components/sections/BrutalAccent";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden border-t-[4px] border-ink section-pad section-y"
    >
      <BrutalAccent side="left" />
      <div className="absolute inset-0 aura-grid opacity-30" />
      <div className="relative mx-auto w-full max-w-6xl pb-4">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
          Contact
        </p>
        <ScrollHeadline className="mt-3 max-w-4xl text-5xl font-extrabold uppercase tracking-tighter sm:text-6xl lg:text-7xl">
          {"Let's ship the next intelligent system"}
        </ScrollHeadline>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Based in {profile.location}. {profile.availability} — research, ML
          engineering, and AI product roles. Prefer email for opportunities.
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
