import { cn } from "@/design-system/utils/cn";

// Dora mark (mirrors frontend-dora brand-mark.ts): a lowercase "d" in black
// on the orange rounded tile.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-9", className)}
      role="img"
      aria-label="Dora"
    >
      <rect width="64" height="64" rx="16" fill="#ff6b1a" />
      <circle
        cx="31"
        cy="38"
        r="11"
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="7"
      />
      <rect x="40" y="12" width="7" height="40.5" rx="3.5" fill="#0a0a0a" />
    </svg>
  );
}

/** Mark + "dora." wordmark. */
export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "text-2xl font-extrabold tracking-tight",
          tone === "light" ? "text-chrome-fg" : "text-fg",
        )}
      >
        dora<span className="text-brand">.</span>
      </span>
    </span>
  );
}
