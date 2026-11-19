"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/design-system/components/ButtonLink";
import { Container } from "@/design-system/components/Container";
import { Logo } from "@/design-system/components/LogoMark";
import { cn } from "@/design-system/utils/cn";
import { NAV_LINKS } from "@/features/landing/content/landing-content";
import { APP_URL } from "@/shared/lib/site";

// Sticky header: transparent over the dark hero, solid once scrolled.
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-white/10 bg-chrome/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
        <a
          href="#inicio"
          aria-label="Dora, voltar ao início"
          data-track="nav:logo"
        >
          <Logo tone="light" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  data-track={`nav:${link.id}`}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-chrome-muted transition-colors hover:bg-white/10 hover:text-chrome-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {APP_URL ? (
            <a
              href={APP_URL}
              data-track="app-login:header"
              className="rounded-full px-4 py-2 text-sm font-semibold text-chrome-fg transition-colors hover:bg-white/10"
            >
              Entrar
            </a>
          ) : null}
          <ButtonLink href="#contato" track="cta-contact:header">
            Agendar demonstração
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="inline-flex size-11 items-center justify-center rounded-full text-chrome-fg hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-chrome lg:hidden"
      >
        <Container className="flex flex-col gap-1 py-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              data-track={`nav:${link.id}`}
              className="rounded-xl px-4 py-3.5 text-lg font-semibold text-chrome-fg hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <ButtonLink
              href="#contato"
              size="lg"
              track="cta-contact:mobile-menu"
              onClick={() => setOpen(false)}
            >
              Agendar demonstração
            </ButtonLink>
            {APP_URL ? (
              <ButtonLink
                href={APP_URL}
                variant="ghost"
                size="lg"
                track="app-login:mobile-menu"
              >
                Entrar no app
              </ButtonLink>
            ) : null}
          </div>
        </Container>
      </div>
    </header>
  );
}
