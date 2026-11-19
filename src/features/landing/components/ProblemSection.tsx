import { Check, X } from "lucide-react";
import { Container } from "@/design-system/components/Container";
import { Reveal } from "@/design-system/components/Reveal";
import { SectionHeading } from "@/design-system/components/SectionHeading";
import { GAINS, PAINS } from "@/features/landing/content/landing-content";

export function ProblemSection() {
  return (
    <section
      id="por-que"
      data-track-section="problem"
      className="py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Por que o Dora"
          title="Chega de caderno, planilha e grupo lotado."
          description="A rotina do condomínio não precisa depender de papel e de mensagens perdidas. O Dora organiza tudo com regras claras e histórico."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-border bg-surface-muted p-7 sm:p-9">
            <p className="text-sm font-bold tracking-wide text-soft uppercase">
              Hoje
            </p>
            <ul className="mt-5 space-y-4">
              {PAINS.map((pain) => (
                <li key={pain} className="flex gap-3 text-muted">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-danger-soft text-danger">
                    <X className="size-3.5" />
                  </span>
                  {pain}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={120}
            className="relative overflow-hidden rounded-3xl bg-chrome p-7 text-chrome-fg shadow-pop sm:p-9"
          >
            <div className="absolute -top-20 -right-20 size-60 rounded-full bg-brand/30 blur-3xl" />
            <p className="relative text-sm font-bold tracking-wide text-brand uppercase">
              Com o Dora
            </p>
            <ul className="relative mt-5 space-y-4">
              {GAINS.map((gain) => (
                <li key={gain} className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-positive text-positive-fg">
                    <Check className="size-3.5" />
                  </span>
                  {gain}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
