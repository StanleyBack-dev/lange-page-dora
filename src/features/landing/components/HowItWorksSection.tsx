import { Container } from "@/design-system/components/Container";
import { Reveal } from "@/design-system/components/Reveal";
import { SectionHeading } from "@/design-system/components/SectionHeading";
import { AUDIENCES, STEPS } from "@/features/landing/content/landing-content";

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      data-track-section="how-it-works"
      className="py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Como funciona"
          title="Do primeiro contato ao condomínio organizado."
          description="A implantação é acompanhada pela nossa equipe, sem complicação para a administração."
        />

        <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-brand-border to-transparent lg:block"
            aria-hidden
          />
          {STEPS.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 110}
              className="relative text-center"
            >
              <span className="relative mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-chrome text-xl font-extrabold text-brand shadow-pop">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>

        <div
          id="para-quem"
          data-track-section="audience"
          className="mt-24 grid gap-5 md:grid-cols-3"
        >
          {AUDIENCES.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              key={title}
              delay={index * 100}
              className="rounded-3xl border border-border bg-surface p-7 shadow-card"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-ink ring-1 ring-brand-border">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
