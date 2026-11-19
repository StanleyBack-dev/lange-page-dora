"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/design-system/utils/cn";

const SHOW_AFTER_PX = 600;

// "Back to top", shown once the visitor has scrolled past the first screen.
// A plain link to #inicio, so it also works when the page scripts do not
// run (then it is always shown: see .back-to-top in globals.css).
export function BackToTopButton() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#inicio"
      onClick={(event) => {
        event.preventDefault();
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
      aria-label="Voltar ao topo da página"
      title="Voltar ao topo"
      data-track="back-to-top:float"
      tabIndex={shown ? 0 : -1}
      className={cn(
        "back-to-top inline-flex size-12 items-center justify-center rounded-full border border-white/15 bg-chrome text-chrome-fg shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-brand-fg focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-none",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-5" />
    </a>
  );
}
