import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/design-system/components/Container";
import { Logo } from "@/design-system/components/LogoMark";
import { CONTACT_EMAIL } from "@/shared/lib/contacts";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Como o site do Dora trata os dados enviados pelo formulário de contato e as métricas anônimas de navegação.",
  alternates: { canonical: "/privacidade" },
};

const SECTIONS = [
  {
    title: "Dados que coletamos pelo formulário",
    body: "Quando você nos envia uma mensagem, guardamos o nome, o e-mail, o telefone (se informado), o condomínio, o perfil, o assunto e a mensagem. Usamos esses dados apenas para responder ao seu contato e apresentar o Dora.",
  },
  {
    title: "Métricas de navegação",
    body: 'Medimos o uso do site de forma anônima: páginas e seções vistas, cliques nos botões de contato, vídeos assistidos e etapas do formulário. Para isso o navegador guarda um identificador aleatório, sem nome, e-mail ou endereço IP. Não usamos cookies de publicidade. Se o seu navegador enviar o sinal "Do Not Track" ou "Global Privacy Control", nada é medido.',
  },
  {
    title: "Base legal e compartilhamento",
    body: "Tratamos os dados do formulário com base no seu consentimento e no nosso legítimo interesse em responder ao contato (LGPD, art. 7º, I e IX). Não vendemos nem compartilhamos seus dados com terceiros, exceto com os provedores que operam o site e o envio de e-mails, sob contrato.",
  },
  {
    title: "Por quanto tempo guardamos",
    body: "As mensagens ficam guardadas enquanto houver relação comercial ou interesse no contato. As métricas anônimas são usadas de forma agregada.",
  },
  {
    title: "Seus direitos",
    body: `Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail ${CONTACT_EMAIL}.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-bg">
      <header className="bg-chrome">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Dora, página inicial">
            <Logo tone="light" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-chrome-fg hover:text-brand"
          >
            <ArrowLeft className="size-4" /> Voltar
          </Link>
        </Container>
      </header>
      <main>
        <Container className="max-w-3xl py-16">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Política de privacidade
          </h1>
          <p className="mt-4 text-muted">
            Esta política vale para o site do Dora. O uso do aplicativo segue os
            termos apresentados no próprio app.
          </p>
          <div className="mt-10 space-y-8">
            {SECTIONS.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold">{section.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
