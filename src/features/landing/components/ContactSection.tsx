import { Clock, Mail } from "lucide-react";
import { BrandIcon } from "@/design-system/components/BrandIcon";
import { Container } from "@/design-system/components/Container";
import { Reveal } from "@/design-system/components/Reveal";
import { ContactForm } from "@/features/contact/components/ContactForm";
import {
  BUSINESS_HOURS,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
  emailLink,
  whatsappDisplay,
  whatsappLink,
} from "@/shared/lib/contacts";

export function ContactSection() {
  const whatsapp = whatsappLink();
  return (
    <section
      id="contato"
      data-track-section="contact"
      className="relative isolate overflow-hidden bg-chrome py-20 sm:py-28"
    >
      <div className="bg-grid-dark absolute inset-0 -z-10 opacity-60" />
      <div className="absolute -top-40 right-0 -z-10 size-[34rem] animate-blob rounded-full bg-brand/20 blur-3xl" />

      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="text-chrome-fg">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wider text-brand uppercase">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden />
            Fale com a gente
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Vamos organizar o seu condomínio?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-chrome-muted">
            Agende uma demonstração gratuita, tire dúvidas ou peça uma proposta.
            Respondemos em até 1 dia útil.
          </p>

          <ul className="mt-10 space-y-3">
            {whatsapp ? (
              <li>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp:contact"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-positive/60 hover:bg-white/10"
                >
                  <span className="inline-flex size-12 animate-pulse-ring items-center justify-center rounded-xl bg-positive text-positive-fg">
                    <BrandIcon name="whatsapp" className="size-6" />
                  </span>
                  <span>
                    <span className="block font-bold">WhatsApp</span>
                    <span className="text-sm text-chrome-muted">
                      {whatsappDisplay()} · resposta rápida
                    </span>
                  </span>
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={emailLink()}
                data-track="email:contact"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-brand/60 hover:bg-white/10"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand text-brand-fg">
                  <Mail className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold">E-mail</span>
                  <span className="block truncate text-sm text-chrome-muted">
                    {CONTACT_EMAIL}
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4 p-4 text-chrome-muted">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/5">
                <Clock className="size-6" />
              </span>
              <span>
                <span className="block font-bold text-chrome-fg">
                  Horário de atendimento
                </span>
                {BUSINESS_HOURS.map((hours) => (
                  <span key={hours.label} className="block text-sm">
                    {hours.label}
                  </span>
                ))}
              </span>
            </li>
          </ul>

          {SOCIAL_LINKS.length > 0 ? (
            <div className="mt-8">
              <p className="text-sm font-semibold text-chrome-muted">
                Acompanhe o Dora
              </p>
              <ul className="mt-3 flex gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.network}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      data-track={`${link.network}:contact`}
                      className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-chrome-fg transition hover:-translate-y-0.5 hover:bg-brand hover:text-brand-fg"
                    >
                      <BrandIcon name={link.network} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Reveal>

        <Reveal
          delay={120}
          className="rounded-3xl bg-surface p-6 text-fg shadow-pop sm:p-9"
        >
          <h3 className="text-xl font-bold">Envie sua mensagem</h3>
          <p className="mt-1 mb-6 text-sm text-muted">
            Ela chega direto na caixa de entrada da nossa equipe.
          </p>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
