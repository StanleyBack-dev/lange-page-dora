// Public contact channels, from NEXT_PUBLIC_* variables (inlined at build
// time). A channel left empty is hidden everywhere.

const clean = (value: string | undefined) => value?.trim() || undefined;

const whatsappNumber = clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(
  /\D/g,
  "",
);

export const CONTACT_EMAIL =
  clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ??
  "suporte.doragestao@gmail.com";

const DEFAULT_WHATSAPP_TEXT =
  "Olá! Vim pelo site do Dora e quero saber mais sobre o app para o meu condomínio.";

/** wa.me link: opens the app on phones and WhatsApp Web on computers. */
export function whatsappLink(text = DEFAULT_WHATSAPP_TEXT): string | undefined {
  if (!whatsappNumber) return undefined;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function emailLink(subject = "Quero conhecer o Dora"): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

/** Formats 5511999999999 as +55 (11) 99999-9999. */
export function whatsappDisplay(): string | undefined {
  if (!whatsappNumber) return undefined;
  const match = /^55(\d{2})(\d{4,5})(\d{4})$/.exec(whatsappNumber);
  return match
    ? `+55 (${match[1]}) ${match[2]}-${match[3]}`
    : `+${whatsappNumber}`;
}

export type SocialNetwork =
  "instagram" | "facebook" | "linkedin" | "youtube" | "tiktok";

type SocialLink = { network: SocialNetwork; label: string; url: string };

const SOCIAL_SOURCES: [SocialNetwork, string, string | undefined][] = [
  ["instagram", "Instagram", process.env.NEXT_PUBLIC_INSTAGRAM_URL],
  ["facebook", "Facebook", process.env.NEXT_PUBLIC_FACEBOOK_URL],
  ["linkedin", "LinkedIn", process.env.NEXT_PUBLIC_LINKEDIN_URL],
  ["youtube", "YouTube", process.env.NEXT_PUBLIC_YOUTUBE_URL],
  ["tiktok", "TikTok", process.env.NEXT_PUBLIC_TIKTOK_URL],
];

export const SOCIAL_LINKS: SocialLink[] = SOCIAL_SOURCES.flatMap(
  ([network, label, url]) => {
    const value = clean(url);
    return value ? [{ network, label, url: value }] : [];
  },
);

/** Service hours (contact section, footer and schema.org openingHours). */
export const BUSINESS_HOURS = [
  {
    label: "Segunda a sexta, das 8h às 18h",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  {
    label: "Sábado, das 9h às 13h",
    days: ["Saturday"],
    opens: "09:00",
    closes: "13:00",
  },
];
