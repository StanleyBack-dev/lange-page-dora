import { BrandIcon } from "@/design-system/components/BrandIcon";
import { BackToTopButton } from "@/features/landing/components/BackToTopButton";
import { whatsappLink } from "@/shared/lib/contacts";

// Floating actions, bottom right: "back to top" above the WhatsApp shortcut
// (the WhatsApp one is hidden when no number is configured).
export function FloatingActions() {
  const href = whatsappLink();
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <BackToTopButton />
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com o Dora no WhatsApp"
          data-track="whatsapp:float"
          className="group relative inline-flex items-center gap-2 rounded-full bg-positive p-3.5 text-positive-fg shadow-pop transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 animate-pulse-ring rounded-full" />
          <BrandIcon name="whatsapp" className="relative size-7" />
          <span className="relative hidden pr-1 text-sm font-bold sm:group-hover:inline">
            Fale com a gente
          </span>
        </a>
      ) : null}
    </div>
  );
}
