import { ButtonLink } from "@/design-system/components/ButtonLink";
import { LogoMark } from "@/design-system/components/LogoMark";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-chrome px-4 text-center text-chrome-fg">
      <LogoMark className="size-16" />
      <h1 className="text-3xl font-extrabold">Página não encontrada</h1>
      <p className="max-w-sm text-chrome-muted">
        O endereço pode ter mudado. Volte para a página inicial do Dora.
      </p>
      <ButtonLink href="/" track="nav:not-found">
        Ir para o início
      </ButtonLink>
    </main>
  );
}
