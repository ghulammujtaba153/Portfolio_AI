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
    "btn btn-secondary",
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
