"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/design-system/utils/cn";
import { track } from "@/features/analytics/lib/tracker";
import { DEMO_PROFILES } from "@/features/landing/content/demo-screens";

const STEP_MS = 5500;
/** Horizontal drag (px) that counts as a swipe on the phone. */
const SWIPE_PX = 40;

type Position = { profile: number; screen: number };

/** The next (or previous) screen, crossing into the next profile. */
function step(from: Position, delta: 1 | -1): Position {
  const count = DEMO_PROFILES[from.profile].screens.length;
  const screen = from.screen + delta;
  if (screen >= 0 && screen < count) return { ...from, screen };
  const profile =
    (from.profile + delta + DEMO_PROFILES.length) % DEMO_PROFILES.length;
  return {
    profile,
    screen: delta === 1 ? 0 : DEMO_PROFILES[profile].screens.length - 1,
  };
}

// A self-playing walkthrough of real app screens (like a short video), per
// profile (management / resident). It pauses while hovered or off screen
// and stops for good once the visitor takes control.
//  - Desktop: the list of screens on the left, the phone on the right.
//  - Phones: a row of chips above the phone, arrows and swipe on the phone,
//    and the description right below it, so the screen is always in view.
export function AppDemo() {
  const [position, setPosition] = useState<Position>({ profile: 0, screen: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [manual, setManual] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const profile = DEMO_PROFILES[position.profile];
  const screens = profile.screens;
  const screen = screens[position.screen];

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const running = visible && !hovered && !manual;

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(
      () => setPosition((current) => step(current, 1)),
      STEP_MS,
    );
    return () => clearTimeout(timer);
  }, [position, running]);

  // Phones: keeps the active chip centered in its row (scrolls the row
  // only, never the page).
  useEffect(() => {
    const row = chipsRef.current;
    const chip = row?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({
      left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [position]);

  const go = (next: Position, how: string) => {
    setManual(true);
    setPosition(next);
    const target = DEMO_PROFILES[next.profile];
    track("demo_step", `${target.id}:${target.screens[next.screen].id}`);
    if (how) track("click", `demo-${how}:demo`);
  };

  const selectProfile = (index: number) =>
    go({ profile: index, screen: 0 }, "");
  const selectScreen = (index: number) =>
    go({ profile: position.profile, screen: index }, "");
  const move = (delta: 1 | -1, how: "arrow" | "swipe") =>
    go(step(position, delta), how);

  // The bar that fills while a screen is on (until the visitor takes over).
  const progress = (key: string, className: string) =>
    manual ? null : (
      <span
        key={`${key}-${position.profile}-${position.screen}-${running}`}
        className={cn(
          "absolute inset-x-0 bottom-0 origin-left animate-progress bg-brand",
          className,
        )}
        style={{
          animationDuration: `${STEP_MS}ms`,
          animationPlayState: running ? "running" : "paused",
        }}
      />
    );

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grid items-center gap-6 lg:grid-cols-[1fr_auto] lg:gap-16"
    >
      <div className="min-w-0">
        {/* Profile switch (all screens). */}
        <div className="flex justify-center lg:justify-start">
          <div
            role="group"
            aria-label="Perfil da demonstração"
            className="inline-flex rounded-full border border-white/10 bg-white/5 p-1"
          >
            {DEMO_PROFILES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={index === position.profile}
                onClick={() => selectProfile(index)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5",
                  index === position.profile
                    ? "bg-brand text-brand-fg"
                    : "text-chrome-muted hover:text-chrome-fg",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: the list of screens with their descriptions. */}
        <div
          role="tablist"
          aria-label={`Telas do Dora para ${profile.label.toLowerCase()}`}
          className="mt-6 hidden gap-2.5 lg:grid"
        >
          {screens.map(({ id, icon: Icon, label, caption }, index) => {
            const selected = index === position.screen;
            return (
              <button
                key={`${profile.id}-${id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="demo-screen"
                onClick={() => selectScreen(index)}
                className={cn(
                  "relative overflow-hidden rounded-2xl border px-5 py-3.5 text-left transition-all duration-300",
                  selected
                    ? "border-white/20 bg-white/10"
                    : "border-white/5 bg-white/[0.03] hover:bg-white/[0.07]",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                      selected
                        ? "bg-brand text-brand-fg"
                        : "bg-white/10 text-chrome-muted",
                    )}
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="font-bold text-chrome-fg">{label}</span>
                </div>
                <p
                  className={cn(
                    "grid text-sm leading-relaxed text-chrome-muted transition-all duration-300",
                    selected
                      ? "mt-2.5 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <span className="overflow-hidden">{caption}</span>
                </p>
                {selected ? progress("list", "h-0.5") : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-w-0">
        {/* Phones: one row of chips, swiped sideways. */}
        <div
          ref={chipsRef}
          role="tablist"
          aria-label={`Telas do Dora para ${profile.label.toLowerCase()}`}
          className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
        >
          {screens.map(({ id, icon: Icon, label }, index) => {
            const selected = index === position.screen;
            return (
              <button
                key={`${profile.id}-${id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="demo-screen"
                onClick={() => selectScreen(index)}
                className={cn(
                  "inline-flex shrink-0 snap-center items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                  selected
                    ? "border-brand bg-brand text-brand-fg"
                    : "border-white/10 bg-white/5 text-chrome-muted",
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            );
          })}
        </div>

        <div
          id="demo-screen"
          role="tabpanel"
          aria-live="polite"
          className="relative mx-auto mt-6 w-full max-w-[16.5rem] sm:max-w-[19rem] lg:mt-0"
        >
          <div className="absolute -inset-8 rounded-full bg-brand/25 blur-3xl" />
          <div
            className="relative touch-pan-y rounded-[2.6rem] border border-white/15 bg-chrome-top p-2.5 shadow-pop ring-1 ring-black"
            onTouchStart={(event) => {
              touchX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              const start = touchX.current;
              touchX.current = null;
              if (start === null) return;
              const dx = event.changedTouches[0].clientX - start;
              if (Math.abs(dx) >= SWIPE_PX) move(dx < 0 ? 1 : -1, "swipe");
            }}
          >
            <div className="relative aspect-[9/16] overflow-hidden rounded-[2.1rem] bg-bg">
              {/* Every screen stays mounted (preloaded); the active one fades in. */}
              {DEMO_PROFILES.flatMap((item, pIndex) =>
                item.screens.map((shot, sIndex) => {
                  const shown =
                    pIndex === position.profile && sIndex === position.screen;
                  return (
                    <Image
                      key={shot.image}
                      src={shot.image}
                      alt={shown ? shot.alt : ""}
                      aria-hidden={!shown}
                      fill
                      draggable={false}
                      sizes="(min-width: 640px) 304px, 264px"
                      priority={pIndex === 0 && sIndex === 0}
                      className={cn(
                        "object-cover object-top transition-all duration-500 select-none",
                        shown
                          ? "scale-100 opacity-100"
                          : "pointer-events-none scale-[1.03] opacity-0",
                      )}
                    />
                  );
                }),
              )}
            </div>
          </div>

          {/* Phones: previous / next on the sides of the phone. */}
          {(
            [
              [-1, "Tela anterior", ChevronLeft, "-left-5"],
              [1, "Próxima tela", ChevronRight, "-right-5"],
            ] as const
          ).map(([delta, label, Icon, side]) => (
            <button
              key={delta}
              type="button"
              onClick={() => move(delta, "arrow")}
              aria-label={label}
              className={cn(
                "absolute top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-chrome/90 text-chrome-fg shadow-pop backdrop-blur active:scale-95 lg:hidden",
                side,
              )}
            >
              <Icon className="size-5" />
            </button>
          ))}
        </div>

        {/* Phones: what the screen shows, right below it. */}
        <div className="mx-auto mt-6 max-w-md text-center lg:hidden">
          <p className="text-lg font-bold text-chrome-fg">{screen.label}</p>
          <p className="mt-1.5 min-h-[3lh] text-sm leading-relaxed text-chrome-muted">
            {screen.caption}
          </p>
          <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
            {screens.map((item, index) => (
              <span
                key={item.id}
                className={cn(
                  "relative h-1.5 overflow-hidden rounded-full transition-all duration-300",
                  index === position.screen
                    ? "w-8 bg-white/20"
                    : "w-1.5 bg-white/25",
                )}
              >
                {index === position.screen
                  ? (progress("dots", "top-0") ?? (
                      <span className="absolute inset-0 bg-brand" />
                    ))
                  : null}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-chrome-subtle">
          <span className="hidden lg:inline">{screen.label} · </span>
          Telas reais do app, com dados de demonstração
        </p>
      </div>
    </div>
  );
}
