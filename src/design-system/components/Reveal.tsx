"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/design-system/utils/cn";

type RevealProps = {
  as?: "div" | "li" | "article" | "section";
  /** Delay before appearing (ms), to stagger siblings. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

// Fades and lifts its content in the first time it scrolls into view
// (styles in globals.css; nothing is hidden without JavaScript or with
// reduced motion).
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Tells the failsafe in app/layout.tsx that reveals are running.
    (window as Window & { __doraReveal?: boolean }).__doraReveal = true;
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.visible = "true";
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal
      className={cn(className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
