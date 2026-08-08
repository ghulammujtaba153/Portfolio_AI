import { navLinks, profile } from "@/lib/content";
import ThemeSwitch from "@/components/theme/ThemeSwitch";

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-ink" style={{ background: "var(--snow)" }}>
      <div className="section-pad mx-auto flex h-16 max-w-6xl items-center justify-between gap-3">
        <a
          href="#top"
          className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink"
        >
          {profile.name.split(" ")[0]}
          <span className="opacity-50">/{profile.name.split(" ")[1]}</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted hover:text-ink sm:inline"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted hover:text-ink sm:inline"
          >
            LinkedIn
          </a>
          <ThemeSwitch />
          <a
            href="#contact"
            className="hidden border-[2px] border-ink bg-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-bg shadow-[3px_3px_0_color-mix(in_srgb,var(--ink)_40%,transparent)] sm:inline-flex"
          >
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}
