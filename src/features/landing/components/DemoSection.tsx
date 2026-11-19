import { Container } from "@/design-system/components/Container";
import { SectionHeading } from "@/design-system/components/SectionHeading";
import { AppDemo } from "@/features/landing/components/AppDemo";
import { VideoCard } from "@/features/landing/components/VideoCard";
import { DEMO_VIDEOS } from "@/features/landing/content/videos";

export function DemoSection() {
  return (
    <section
      id="demonstracao"
      data-track-section="demo"
      className="relative isolate overflow-hidden bg-chrome py-20 sm:py-28"
    >
      <div className="bg-grid-dark absolute inset-0 -z-10 opacity-60" />
      <div className="absolute top-1/3 -left-40 -z-10 size-[28rem] animate-blob rounded-full bg-brand/15 blur-3xl" />
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Demonstração"
          title="Veja o Dora em ação."
          description="Um passeio pelas telas que moradores, síndicos e portaria usam todos os dias."
        />
        <div className="mt-14">
          <AppDemo />
        </div>

        {DEMO_VIDEOS.length > 0 ? (
          <div className="mt-20">
            <h3 className="text-center text-2xl font-bold text-chrome-fg">
              Vídeos demonstrativos
            </h3>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {DEMO_VIDEOS.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
