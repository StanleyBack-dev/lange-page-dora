import { ArrowRight, Check, Play } from "lucide-react";
import { BrandIcon } from "@/design-system/components/BrandIcon";
import { ButtonLink } from "@/design-system/components/ButtonLink";
import { Container } from "@/design-system/components/Container";
import { PhoneMockup } from "@/features/landing/components/PhoneMockup";
import { whatsappLink } from "@/shared/lib/contacts";

const HIGHLIGHTS = [
  "Sem instalar pela loja",
  "Implantação em poucos dias",
  "Suporte humano",
];

export function HeroSection() {
  const whatsapp = whatsappLink();
  return (
    <section
      id="inicio"
      data-track-section="hero"
      className="relative isolate overflow-hidden bg-chrome pt-28 pb-20 text-chrome-fg sm:pt-36 lg:pb-28"
    >
      <div className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-40 -right-32 -z-10 size-[36rem] animate-blob rounded-full bg-brand/25 blur-3xl" />
      <div className="absolute -bottom-48 -left-40 -z-10 size-[30rem] animate-blob rounded-full bg-brand/10 blur-3xl [animation-delay:-6s]" />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-chrome-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-positive opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-positive" />
            </span>
            App de gestão para condomínios
          </p>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            O condomínio inteiro{" "}
            <span className="text-gradient-brand">
              organizado em um só app.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-chrome-muted">
            Reserva de áreas comuns, portaria com QR code, eventos com ingressos
            e comunicados que chegam no celular de cada morador. Menos papel,
            menos grupo de WhatsApp e mais tempo para o que importa.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contato" size="lg" track="cta-contact:hero">
              Agendar demonstração grátis
              <ArrowRight className="size-5" />
            </ButtonLink>
            {whatsapp ? (
              <ButtonLink
                href={whatsapp}
                external
                variant="ghost"
                size="lg"
                track="whatsapp:hero"
              >
                <BrandIcon name="whatsapp" />
                Falar no WhatsApp
              </ButtonLink>
            ) : (
              <ButtonLink
                href="#demonstracao"
                variant="ghost"
                size="lg"
                track="cta-demo:hero"
              >
                <Play className="size-5" />
                Ver demonstração
              </ButtonLink>
            )}
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-chrome-muted">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <Check className="size-4 text-positive" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <PhoneMockup />
      </Container>
    </section>
  );
}
