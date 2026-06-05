import { cn } from "@/lib/utils/cn";

export function Progress({ value, className }: { value: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-2", className)}>
      <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${clamped}%` }} />
    </div>
  );
}
