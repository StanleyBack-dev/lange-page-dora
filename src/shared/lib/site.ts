// Public address of the landing page: canonical URLs, sitemap and og:image.
// SITE_URL wins; on Vercel the production domain is known at build time.
export function siteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3001";
}

export const SITE_NAME = "Dora";
export const SITE_TITLE =
  "Dora · App para condomínio: reservas, portaria, eventos e comunicados";
export const SITE_DESCRIPTION =
  "Dora é o aplicativo de gestão de condomínio que reúne reserva de áreas comuns, portaria com QR code, eventos com ingressos, comunicados e notificações em um só app. Fale com a gente e agende uma demonstração.";
export const SITE_KEYWORDS = [
  "app para condomínio",
  "aplicativo de condomínio",
  "gestão de condomínio",
  "reserva de áreas comuns",
  "reserva de salão de festas",
  "reserva de quadra condomínio",
  "portaria digital",
  "controle de visitantes QR code",
  "comunicados para condôminos",
  "aplicativo para síndico",
  "software para administradora de condomínio",
  "eventos no condomínio",
];

/** The Dora app itself (the "Entrar" button). */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";
