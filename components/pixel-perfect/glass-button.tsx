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
      "relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-ink transition-transform duration-200 active:scale-[0.98]",
      className,
    );
    const style: React.CSSProperties = {
      background: "var(--glass-border)",
      borderRadius: 4,
      border: "none",
      boxShadow: "var(--glass-shadow)",
    };
    const content = (
      <>
        <span
          className="absolute inset-[1.5px] rounded-[3px]"
          style={{ background: "var(--glass-inner)" }}
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
