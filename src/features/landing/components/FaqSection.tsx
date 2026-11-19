import { ChevronDown } from "lucide-react";
import { Container } from "@/design-system/components/Container";
import { SectionHeading } from "@/design-system/components/SectionHeading";
import { FAQ } from "@/features/landing/content/landing-content";

// Native <details>: works without JavaScript and the answers stay in the
// HTML for search engines (FAQPage structured data mirrors this list).
export function FaqSection() {
  return (
    <section
      id="perguntas"
      data-track-section="faq"
      className="border-t border-border bg-surface py-20 sm:py-28"
    >
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          title="Perguntas frequentes"
        />
        <div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-surface shadow-card">
          {FAQ.map((item, index) => (
            <details
              key={item.question}
              className="group px-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                data-track={`faq:${index + 1}`}
                className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold"
              >
                <h3 className="text-base sm:text-lg">{item.question}</h3>
                <ChevronDown className="size-5 shrink-0 text-soft transition-transform duration-300 group-open:rotate-180 group-open:text-brand-ink" />
              </summary>
              <p className="pb-6 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
