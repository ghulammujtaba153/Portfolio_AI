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
      "btn btn-primary",
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
