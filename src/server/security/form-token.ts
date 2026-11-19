import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { serverEnv } from "@/server/config/env";

/** Faster than this after the form loaded, it is a bot filling it. */
export const MIN_FILL_MS = 3_000;
/** An open tab keeps a usable token for this long. */
const MAX_AGE_MS = 12 * 60 * 60_000;

const sign = (issuedAt: string) =>
  createHmac("sha256", serverEnv().LEAD_FORM_SECRET)
    .update(`lead-form:${issuedAt}`)
    .digest("base64url");

// Time trap of the contact form: the page gets a signed "issued at" when the
// form loads, and the submission must come back with it, not too fast and
// not too late. Bots posting straight to the API have no token; bots that
// fetch one still have to wait.
export function issueFormToken(now = Date.now()): string {
  const issuedAt = String(now);
  return `${issuedAt}.${sign(issuedAt)}`;
}

export type FormTokenCheck = "ok" | "invalid" | "too-fast" | "expired";

export function checkFormToken(
  token: string | undefined,
  now = Date.now(),
): FormTokenCheck {
  const [issuedAt, signature] = token?.split(".") ?? [];
  if (!issuedAt || !signature || !/^\d{13}$/.test(issuedAt)) return "invalid";
  const expected = Buffer.from(sign(issuedAt));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return "invalid";
  }
  const age = now - Number(issuedAt);
  if (age < MIN_FILL_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}
