import { navLinks, profile } from "@/lib/content";
import LiquidGlassButton from "@/components/pixel-perfect/liquid-glass-button";
import ThemeSwitch from "@/components/theme/ThemeSwitch";

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="section-pad mx-auto flex h-16 max-w-6xl items-center justify-between gap-3">
        <a href="#top" className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          {profile.name.split(" ")[0]}
          <span className="text-ink">.{profile.name.split(" ")[1]}</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSwitch />
          <LiquidGlassButton href="#top" className="hidden px-4 py-2 text-xs sm:inline-flex">
            Hire me
          </LiquidGlassButton>
        </div>
      </div>
    </header>
  );
}
