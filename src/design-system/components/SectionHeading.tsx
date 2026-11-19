import { Reveal } from "@/design-system/components/Reveal";
import { cn } from "@/design-system/utils/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
};

/** Eyebrow + h2 + lead paragraph that opens every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase",
          dark
            ? "bg-white/10 text-brand"
            : "bg-brand-soft text-brand-ink ring-1 ring-brand-border",
        )}
      >
        <span className="size-1.5 rounded-full bg-brand" aria-hidden />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl",
          dark ? "text-chrome-fg" : "text-fg",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-pretty sm:text-lg",
            dark ? "text-chrome-muted" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
