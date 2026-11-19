import { FAQ } from "@/features/landing/content/landing-content";
import { DEMO_VIDEOS } from "@/features/landing/content/videos";
import {
  BUSINESS_HOURS,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
  whatsappDisplay,
} from "@/shared/lib/contacts";
import { SITE_DESCRIPTION, SITE_NAME, siteUrl } from "@/shared/lib/site";

// schema.org JSON-LD for search engines: the organization, the website, the
// app (SoftwareApplication), the FAQ (rich results) and any demo videos.
export function StructuredData() {
  const url = siteUrl();
  const phone = whatsappDisplay();

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${url}/#organization`,
      name: SITE_NAME,
      url,
      logo: `${url}/icon.svg`,
      email: CONTACT_EMAIL,
      sameAs: SOCIAL_LINKS.map((link) => link.url),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT_EMAIL,
        ...(phone ? { telephone: phone } : {}),
        areaServed: "BR",
        availableLanguage: "Portuguese",
        hoursAvailable: BUSINESS_HOURS.map((hours) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: hours.days,
          opens: hours.opens,
          closes: hours.closes,
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url,
      name: SITE_NAME,
      inLanguage: "pt-BR",
      publisher: { "@id": `${url}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Gestão de condomínios",
      operatingSystem: "Android, iOS, Web",
      inLanguage: "pt-BR",
      url,
      publisher: { "@id": `${url}/#organization` },
      featureList: [
        "Reserva de áreas comuns",
        "Portaria digital com QR code",
        "Eventos com venda de ingressos via Pix",
        "Comunicados com notificações push",
        "Cadastro de moradores por link",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    ...DEMO_VIDEOS.map((video) => ({
      "@type": "VideoObject",
      name: video.title,
      description: video.description,
      uploadDate: video.uploadDate,
      thumbnailUrl:
        video.poster ??
        (video.youtubeId
          ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
          : `${url}/opengraph-image`),
      ...(video.youtubeId
        ? { embedUrl: `https://www.youtube.com/embed/${video.youtubeId}` }
        : { contentUrl: `${url}${video.src}` }),
    })),
  ];

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped cannot break out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
