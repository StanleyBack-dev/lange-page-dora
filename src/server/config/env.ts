import "server-only";
import { z } from "zod";

const optional = z
  .string()
  .optional()
  .transform((value) => value?.trim() || undefined);

// Server variables, validated once on first use. Public ones (NEXT_PUBLIC_*)
// live in shared/lib.
const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  BACKEND_URL: z.url(),
  INTERNAL_API_KEY: z.string().min(16),
  /** HMAC key of the contact form token (time trap). */
  LEAD_FORM_SECRET: z.string().min(32),
  /** Cloudflare Turnstile; empty = no challenge (local dev only). */
  TURNSTILE_SECRET_KEY: optional,
});

export type ServerEnv = z.infer<typeof schema>;

let cached: ServerEnv | undefined;

export function serverEnv(): ServerEnv {
  cached ??= schema.parse(process.env);
  return cached;
}
