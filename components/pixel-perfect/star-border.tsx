import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Brutal hard frame for CTA groups. */
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
        "relative inline-flex border-[3px] border-ink bg-bg-elevated p-5 shadow-[8px_8px_0_var(--ink)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
