"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { flush, track } from "@/features/analytics/lib/tracker";

const SCROLL_MARKS = [25, 50, 75, 100];

// Mounted once in the layout. Reports, without any markup of its own:
//  - page_view on every route;
//  - section_view the first time a [data-track-section] is half visible;
//  - click on any element (or its parent) with [data-track="target:place"];
//  - scroll_depth at 25/50/75/100% of the page.
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/painel")) return;
    track("page_view");

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = (entry.target as HTMLElement).dataset.trackSection;
          if (!entry.isIntersecting || !name || seen.has(name)) continue;
          seen.add(name);
          track("section_view", name);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-track-section]")
      .forEach((element) => observer.observe(element));

    const reached = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const percent = max > 0 ? (window.scrollY / max) * 100 : 100;
      for (const mark of SCROLL_MARKS) {
        if (percent >= mark - 2 && !reached.has(mark)) {
          reached.add(mark);
          track("scroll_depth", String(mark));
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-track]",
      );
      const name = target?.dataset.track;
      if (name) track("click", name);
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
    };
  }, []);

  return null;
}
