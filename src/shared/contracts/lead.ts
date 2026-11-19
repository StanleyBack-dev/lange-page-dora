import { z } from "zod";
import { digitsOf, phoneError } from "@/shared/lib/masks";

// Contract of the contact form: validated in the browser (instant feedback)
// and again by POST /api/leads. Keys match the backend enums
// (LandingLeadRole, LandingLeadSubject, LandingLeadUnitsRange).

export const LEAD_ROLES = {
  SINDICO: "Síndico(a)",
  ADMINISTRADORA: "Administradora",
  CONSELHO: "Conselho / subsíndico",
  MORADOR: "Morador(a)",
  OUTRO: "Outro",
} as const;

export const LEAD_SUBJECTS = {
  DEMONSTRACAO: "Quero uma demonstração",
  ORCAMENTO: "Planos e valores",
  DUVIDA: "Tenho uma dúvida",
  PARCERIA: "Parceria / integração",
  SUPORTE: "Já uso o Dora (suporte)",
} as const;

export const LEAD_UNITS = {
  ATE_50: "Até 50 unidades",
  DE_51_A_150: "51 a 150 unidades",
  DE_151_A_400: "151 a 400 unidades",
  MAIS_DE_400: "Mais de 400 unidades",
} as const;

const keys = <T extends Record<string, string>>(record: T) =>
  Object.keys(record) as [keyof T & string, ...(keyof T & string)[]];

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Use no máximo ${max} caracteres.`)
    .optional()
    .transform((value) => value || undefined);

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(120, "Use no máximo 120 caracteres."),
  email: z.email("Informe um e-mail válido.").trim().max(160),
  // WhatsApp with the app's mask, "(62) 99999-0000"; sent as digits only.
  phone: optionalText(20)
    .superRefine((value, ctx) => {
      const error = value ? phoneError(value) : null;
      if (error) ctx.addIssue({ code: "custom", message: error });
    })
    .transform((value) => (value ? digitsOf(value) : undefined)),
  condominium: optionalText(160),
  role: z.enum(keys(LEAD_ROLES), "Selecione seu perfil."),
  unitsRange: z
    .union([z.enum(keys(LEAD_UNITS)), z.literal("")])
    .optional()
    .transform((value) => value || undefined),
  subject: z.enum(keys(LEAD_SUBJECTS), "Selecione o assunto."),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais (mínimo de 10 caracteres).")
    .max(3000, "Use no máximo 3000 caracteres."),
  consent: z.literal(true, "É preciso aceitar a política de privacidade."),
  // Honeypot: hidden from people, filled only by bots.
  website: z.string().max(0).optional(),
  // Bot protection, checked by POST /api/leads (never sent to the API):
  // the signed time-trap token and the Cloudflare Turnstile token.
  formToken: z.string().max(200).optional(),
  turnstileToken: z.string().max(4096).optional(),
  // Attribution, filled by the page.
  visitorId: z.uuid().optional(),
  referrerHost: optionalText(200),
  utmSource: optionalText(100),
  utmMedium: optionalText(100),
  utmCampaign: optionalText(100),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

export type LeadResponse =
  | { ok: true }
  | {
      ok: false;
      message: string;
      fields?: Record<string, string>;
      /** What the form should renew before trying again. */
      retry?: "token" | "challenge";
    };
