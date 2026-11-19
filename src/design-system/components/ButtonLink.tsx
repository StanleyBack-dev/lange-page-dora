import { cn } from "@/design-system/utils/cn";

export type ButtonVariant = "brand" | "dark" | "light" | "outline" | "ghost";
export type ButtonSize = "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  brand:
    "bg-brand text-brand-fg shadow-glow hover:bg-brand-hover hover:-translate-y-0.5",
  dark: "bg-accent text-accent-fg hover:bg-accent-hover hover:-translate-y-0.5",
  light:
    "bg-surface text-fg hover:bg-surface-muted hover:-translate-y-0.5 shadow-card",
  outline:
    "border border-border-strong bg-surface/60 text-fg hover:border-fg hover:-translate-y-0.5",
  ghost:
    "border border-white/15 bg-white/5 text-chrome-fg hover:bg-white/10 hover:-translate-y-0.5",
};

const SIZES: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonClass(
  variant: ButtonVariant = "brand",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Analytics click name, "<target>:<place>". */
  track?: string;
  external?: boolean;
};

/** A link that looks like a button (CTAs, contact channels). */
export function ButtonLink({
  variant,
  size,
  track,
  external,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...props}
      data-track={track}
      className={buttonClass(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
