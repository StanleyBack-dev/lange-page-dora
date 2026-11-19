import { Check } from "lucide-react";
import { Container } from "@/design-system/components/Container";
import { Reveal } from "@/design-system/components/Reveal";
import { SectionHeading } from "@/design-system/components/SectionHeading";
import { FEATURES } from "@/features/landing/content/landing-content";

export function FeaturesSection() {
  return (
    <section
      id="recursos"
      data-track-section="features"
      className="bg-grid-light relative border-y border-border bg-surface py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Recursos"
          title={
            <>
              Tudo o que o condomínio precisa,{" "}
              <span className="text-brand-ink">disponível hoje.</span>
            </>
          }
          description="Módulos que já funcionam no dia a dia de síndicos, moradores e portaria."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, points }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={(index % 3) * 90}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-border hover:shadow-pop"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-chrome text-brand transition-colors group-hover:bg-brand group-hover:text-brand-fg">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{description}</p>
              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
