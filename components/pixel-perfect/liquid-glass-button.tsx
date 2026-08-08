"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LiquidGlassButtonProps = {
  children?: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function LiquidGlassButton({
  children = "Button",
  className,
  href,
  onClick,
  type = "button",
}: LiquidGlassButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center border-[3px] border-ink bg-bg px-7 py-3 text-sm font-bold uppercase tracking-[0.1em] text-ink shadow-[6px_6px_0_var(--ink)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_var(--ink)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
    className,
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
