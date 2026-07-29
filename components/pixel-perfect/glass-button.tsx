"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type GlassVariant = "grey" | "slate" | "cyan";

const glassStyles: Record<
  "grey" | "slate",
  { border: string; inner: string; shadow: string }
> = {
  grey: {
    border:
      "linear-gradient(90deg, rgba(255,255,255,0.45) 0%, rgba(160,160,170,0.65) 52%, rgba(255,255,255,0.45) 100%)",
    inner:
      "linear-gradient(263deg, rgba(230,230,235,0.25) 10%, rgba(60,60,68,0.75) 49%, rgba(230,230,235,0.25) 100%)",
    shadow: "0 12px 24px rgba(0,0,0,0.28)",
  },
  slate: {
    border:
      "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(100,100,110,0.55) 52%, rgba(255,255,255,0.4) 100%)",
    inner:
      "linear-gradient(263deg, rgba(220,220,225,0.2) 10%, rgba(40,40,48,0.7) 49%, rgba(220,220,225,0.2) 100%)",
    shadow: "0 12px 24px rgba(0,0,0,0.25)",
  },
};

type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: GlassVariant;
  href?: string;
};

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, variant = "grey", href, ...props }, ref) => {
    const resolved = variant === "cyan" ? "grey" : variant;
    const { border, inner, shadow } = glassStyles[resolved];
    const classes = cn(
      "relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-ink dark:text-white transition-transform duration-200 active:scale-[0.98]",
      className,
    );
    const style: React.CSSProperties = {
      background: border,
      borderRadius: 4,
      border: "none",
      boxShadow: shadow,
    };
    const content = (
      <>
        <span
          className="absolute inset-[1.5px] rounded-[3px]"
          style={{ background: inner }}
          aria-hidden
        />
        <span className="relative z-10">{children}</span>
      </>
    );

    if (href) {
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          style={style}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} style={style} {...props}>
        {content}
      </button>
    );
  },
);

GlassButton.displayName = "GlassButton";
export default GlassButton;
