import { MARQUEE_ITEMS } from "@/features/landing/content/landing-content";

// Copies of the list in each half of the track: one half must be wider than
// the widest screen, so the strip is always full while it loops.
const COPIES_PER_HALF = 3;

// Endless strip of what the app does, sliding to the right. The track holds
// two identical halves and moves by exactly one half per cycle, so the loop
// is seamless. Speed, direction and pause live in globals.css (.marquee-*).
export function FeatureMarquee() {
  const half = Array.from(
    { length: COPIES_PER_HALF },
    () => MARQUEE_ITEMS,
  ).flat();
  const items = [...half, ...half];
  return (
    <div className="relative overflow-hidden border-y border-black/10 bg-brand py-4">
      <div className="marquee-track flex w-max animate-marquee">
        {items.map((item, index) => (
          <span
            key={index}
            // Screen readers get the list once.
            aria-hidden={index >= MARQUEE_ITEMS.length}
            className="flex shrink-0 items-center gap-10 pr-10 text-base font-bold whitespace-nowrap text-brand-fg sm:text-lg"
          >
            {item}
            <span className="size-2 rounded-full bg-brand-fg/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
