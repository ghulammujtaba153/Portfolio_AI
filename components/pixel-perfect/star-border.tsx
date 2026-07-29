import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Corner-star frame — adapted from Pixel Perfect star-border. */
export default function StarBorder({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative inline-flex border border-dashed border-accent/40 px-5 py-4",
        className,
      )}
    >
      <Star className="absolute -top-[7px] -left-[7px] text-accent" />
      <Star className="absolute -top-[7px] -right-[7px] text-accent" />
      <Star className="absolute -bottom-[7px] -left-[7px] text-accent" />
      <Star className="absolute -bottom-[7px] -right-[7px] text-accent" />
      {children}
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <div className={cn("size-3.5", className)}>
      <svg viewBox="0 0 30 30" className="size-full" aria-hidden>
        <path
          fill="currentColor"
          d="M15 0 C19 9 21 11 30 15 C21 19 19 21 15 30 C11 21 9 19 0 15 C9 11 11 9 15 0 Z"
        />
      </svg>
    </div>
  );
}
