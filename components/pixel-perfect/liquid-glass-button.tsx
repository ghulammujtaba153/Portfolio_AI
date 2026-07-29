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
  children = "Liquid Glass",
  className,
  href,
  onClick,
  type = "button",
}: LiquidGlassButtonProps) {
  const classes = cn(
    "relative inline-flex items-center justify-center overflow-visible rounded-sm border-none bg-transparent px-7 py-3 text-sm font-medium text-ink",
    className,
  );

  const inner = (
    <>
      <span className="relative z-50">{children}</span>
      <span
        className="pointer-events-none absolute inset-0 z-40 rounded-sm opacity-70"
        aria-hidden
        style={{
          background:
            "conic-gradient(from 102deg at 52% 38%, rgba(255,255,255,0.45) 0deg, rgba(160,160,170,0.5) 80deg, rgba(80,80,90,0.4) 140deg, rgba(255,255,255,0.35) 200deg, rgba(140,140,150,0.45) 280deg, rgba(255,255,255,0.4) 360deg)",
          padding: "1.5px",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <span
        className="absolute inset-[1px] z-40 rounded-sm"
        style={{
          background: "color-mix(in srgb, var(--bg-elevated) 80%, transparent)",
          backdropFilter: "blur(12px)",
        }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-0 z-0 rounded-sm"
        style={{
          transform: "translate(0, 6px)",
          background: "rgba(0,0,0,0.18)",
          filter: "blur(12px)",
        }}
        aria-hidden
      />
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
