"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type GlassVariant = "grey" | "slate" | "cyan";

type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: GlassVariant;
  href?: string;
};

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, variant = "grey", href, ...props }, ref) => {
    void variant;
    const classes = cn(
      "relative inline-flex items-center justify-center border-[3px] border-ink bg-ink px-7 py-3 text-sm font-bold uppercase tracking-[0.1em] text-bg shadow-[6px_6px_0_color-mix(in_srgb,var(--ink)_35%,transparent)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_color-mix(in_srgb,var(--ink)_35%,transparent)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
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
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

GlassButton.displayName = "GlassButton";
export default GlassButton;
