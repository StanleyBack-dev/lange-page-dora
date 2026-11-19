import { Rocket } from "lucide-react";
import { ButtonLink } from "@/design-system/components/ButtonLink";
import { Container } from "@/design-system/components/Container";
import { Reveal } from "@/design-system/components/Reveal";
import { SectionHeading } from "@/design-system/components/SectionHeading";
import { ROADMAP } from "@/features/landing/content/landing-content";

export function RoadmapSection() {
  return (
    <section
      id="em-breve"
      data-track-section="roadmap"
      className="relative isolate overflow-hidden border-y border-border bg-surface-muted py-20 sm:py-28"
    >
      <div className="absolute -top-32 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      <Container>
        <SectionHeading
          eyebrow="Em breve"
          title={
            <>
              O Dora não para de crescer.{" "}
              <span className="text-brand-ink">Novos módulos chegando.</span>
            </>
          }
          description="Estamos construindo a gestão completa do condomínio: do financeiro às encomendas, com integrações para tudo conversar entre si."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROADMAP.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={(index % 4) * 80}
              className="group relative rounded-3xl border border-dashed border-border-strong bg-surface/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-solid hover:border-brand hover:bg-surface"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-surface-sunken text-fg transition-colors group-hover:bg-brand group-hover:text-brand-fg">
                  <Icon className="size-5" />
                </span>
                <span className="rounded-full bg-chrome px-2 py-0.5 text-[10px] font-bold tracking-wide text-brand uppercase">
                  Em breve
                </span>
              </div>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {description}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="inline-flex items-center gap-2 font-semibold">
            <Rocket className="size-5 text-brand-ink" />
            Quer um módulo para o seu condomínio? Conte pra gente.
          </p>
          <ButtonLink
            href="#contato"
            variant="dark"
            track="cta-contact:roadmap"
          >
            Sugerir um módulo
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
