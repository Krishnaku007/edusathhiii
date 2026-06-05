import type React from "react";
import { cn } from "@/lib/utils/cn";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-brand/10 px-2 py-1 text-xs font-semibold text-brand", className)}>
      {children}
    </span>
  );
}
