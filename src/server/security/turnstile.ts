import "server-only";
import { serverEnv } from "@/server/config/env";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT_MS = 8_000;

let warned = false;

/**
 * Checks a Cloudflare Turnstile token with Cloudflare (each token is valid
 * once, for 5 minutes). Without TURNSTILE_SECRET_KEY the check is skipped,
 * which is only acceptable in local development.
 */
export async function verifyTurnstile(
  token: string | undefined,
  clientIp: string | null,
): Promise<boolean> {
  const env = serverEnv();
  if (!env.TURNSTILE_SECRET_KEY) {
    if (env.NODE_ENV === "production" && !warned) {
      warned = true;
      console.warn(
        "[turnstile] TURNSTILE_SECRET_KEY is not set: the contact form has no bot challenge.",
      );
    }
    return true;
  }
  if (!token) return false;

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  if (clientIp) body.set("remoteip", clientIp);

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    // Cloudflare unreachable: refuse (the visitor can still use WhatsApp or
    // e-mail, and nothing is stored half-way).
    console.error("[turnstile] verification failed", error);
    return false;
  }
}
