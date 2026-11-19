import { BrandIcon } from "@/design-system/components/BrandIcon";
import { Container } from "@/design-system/components/Container";
import { Logo } from "@/design-system/components/LogoMark";
import { NAV_LINKS } from "@/features/landing/content/landing-content";
import {
  BUSINESS_HOURS,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
  emailLink,
  whatsappDisplay,
  whatsappLink,
} from "@/shared/lib/contacts";
import { AppLoginLink } from "@/features/landing/components/AppLoginLink";
import { APP_URL } from "@/shared/lib/site";

export function SiteFooter() {
  const whatsapp = whatsappLink();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-chrome text-chrome-muted">
      {/* Phones: one centered column; from sm up, left-aligned columns. */}
      <Container className="grid gap-10 py-14 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed sm:mx-0">
            O app que reúne reservas, portaria, eventos e comunicados do seu
            condomínio. Do celular, para todos.
          </p>
          {SOCIAL_LINKS.length > 0 ? (
            <ul className="mt-6 flex justify-center gap-2 sm:justify-start">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.network}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    data-track={`${link.network}:footer`}
                    className="inline-flex size-10 items-center justify-center rounded-xl bg-white/5 text-chrome-fg transition hover:bg-brand hover:text-brand-fg"
                  >
                    <BrandIcon name={link.network} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <nav aria-label="Rodapé">
          <p className="text-sm font-bold text-chrome-fg">Navegação</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`/#${link.id}`}
                  className="transition-colors hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {APP_URL ? (
              <li>
                <AppLoginLink
                  track="app-login:footer"
                  className="transition-colors hover:text-brand"
                >
                  Entrar no app
                </AppLoginLink>
              </li>
            ) : null}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-bold text-chrome-fg">Contato</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {whatsapp ? (
              <li>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp:footer"
                  className="transition-colors hover:text-brand"
                >
                  WhatsApp {whatsappDisplay()}
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={emailLink()}
                data-track="email:footer"
                className="break-all transition-colors hover:text-brand"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            {BUSINESS_HOURS.map((hours) => (
              <li key={hours.label}>{hours.label}</li>
            ))}
            <li>
              <a
                href="/privacidade"
                className="transition-colors hover:text-brand"
              >
                Política de privacidade
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-center text-xs text-chrome-subtle sm:flex-row sm:justify-between sm:text-left">
          <p>© {year} Dora. Todos os direitos reservados.</p>
          <p>Feito no Brasil para condomínios brasileiros.</p>
        </Container>
      </div>
    </footer>
  );
}
