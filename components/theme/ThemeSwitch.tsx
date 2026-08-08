"use client";

import { useTheme, type ThemeMode } from "./ThemeProvider";
import { cn } from "@/lib/utils";

const OPTIONS: { id: ThemeMode; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

function Icon({ mode }: { mode: ThemeMode }) {
  if (mode === "light") {
    return (
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
        <circle cx="8" cy="8" r="3" fill="currentColor" />
        <path
          d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (mode === "dark") {
    return (
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
        <path
          fill="currentColor"
          d="M12.5 9.2A5.5 5.5 0 0 1 6.8 3.5 5.6 5.6 0 1 0 12.5 9.2Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path fill="currentColor" d="M8 2a6 6 0 0 1 0 12V2Z" />
    </svg>
  );
}

export default function ThemeSwitch() {
  const { mode, setMode } = useTheme();

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex items-center gap-0.5 border-[2px] border-ink bg-bg p-0.5"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setMode(opt.id)}
          aria-label={opt.label}
          aria-pressed={mode === opt.id}
          title={opt.label}
          className={cn(
            "flex h-8 w-8 items-center justify-center transition-colors",
            mode === opt.id
              ? "bg-ink text-bg"
              : "text-muted hover:text-ink",
          )}
        >
          <Icon mode={opt.id} />
        </button>
      ))}
    </div>
  );
}
