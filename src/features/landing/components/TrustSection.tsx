import { Container } from "@/design-system/components/Container";
import { Reveal } from "@/design-system/components/Reveal";
import { SectionHeading } from "@/design-system/components/SectionHeading";
import { TRUST_POINTS } from "@/features/landing/content/landing-content";

export function TrustSection() {
  return (
    <section
      id="seguranca"
      data-track-section="trust"
      className="py-20 sm:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Feito para o dia a dia"
          title="Simples para o morador. Completo para a gestão."
          description="Pensado para quem não tem tempo a perder: abre rápido, funciona em qualquer celular e protege os dados de todos."
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {TRUST_POINTS.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={(index % 2) * 90}
              className="flex gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-chrome text-brand">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted">{description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
