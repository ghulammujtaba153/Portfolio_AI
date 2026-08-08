"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/content";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-ink"
      style={{ background: "var(--snow)" }}
    >
      <div className="section-pad mx-auto flex h-16 max-w-6xl items-center justify-between gap-3">
        <a
          href="#top"
          onClick={close}
          className="shrink-0 font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink"
        >
          {profile.name.split(" ")[0]}
          <span className="opacity-50">/{profile.name.split(" ")[1]}</span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
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

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted hover:text-ink lg:inline"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted hover:text-ink lg:inline"
          >
            LinkedIn
          </a>
          <ThemeSwitch />
          <a
            href="#contact"
            className="hidden border-[2px] border-ink bg-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-bg shadow-[3px_3px_0_color-mix(in_srgb,var(--ink)_40%,transparent)] lg:inline-flex"
          >
            Hire me
          </a>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center border-[2px] border-ink bg-bg text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block size-4" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 block h-[2px] w-4 bg-ink transition-transform",
                  open ? "top-[7px] rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] block h-[2px] w-4 bg-ink transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-[2px] w-4 bg-ink transition-transform",
                  open ? "top-[7px] -rotate-45" : "top-[12px]",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t-[3px] border-ink lg:hidden",
          open ? "block" : "hidden",
        )}
        style={{ background: "var(--snow)" }}
      >
        <nav className="section-pad mx-auto flex max-w-6xl flex-col py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="border-b border-ink/20 py-3 font-mono text-sm font-bold uppercase tracking-[0.14em] text-ink last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex flex-wrap gap-2 border-t-[3px] border-ink pt-4 pb-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-[2px] border-ink px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border-[2px] border-ink px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink"
            >
              LinkedIn
            </a>
            <a
              href="#contact"
              onClick={close}
              className="border-[2px] border-ink bg-ink px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-bg"
            >
              Hire me
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
