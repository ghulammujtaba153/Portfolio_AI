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
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-xl"
    >
      <div className="section-pad mx-auto flex h-16 max-w-6xl items-center justify-between gap-3">
        <a
          href="#top"
          onClick={close}
          className="shrink-0 text-sm font-semibold tracking-tight text-ink"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
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
            className="hidden text-sm text-muted transition-colors hover:text-ink lg:inline"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm text-muted transition-colors hover:text-ink lg:inline"
          >
            LinkedIn
          </a>
          <ThemeSwitch />
          <a
            href="#contact"
            className="btn btn-primary hidden !h-9 !px-3.5 lg:inline-flex"
          >
            Hire me
          </a>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-bg-elevated text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block size-4" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-4 bg-ink transition-transform",
                  open ? "top-[7px] rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] block h-[1.5px] w-4 bg-ink transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-4 bg-ink transition-transform",
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
          "border-t border-line bg-bg lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="section-pad mx-auto flex max-w-6xl flex-col py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="border-b border-line py-3 text-base text-ink last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex flex-wrap gap-2 border-t border-line pt-4 pb-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary !h-9"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary !h-9"
            >
              LinkedIn
            </a>
            <a
              href="#contact"
              onClick={close}
              className="btn btn-primary !h-9"
            >
              Hire me
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
