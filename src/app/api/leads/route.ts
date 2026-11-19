import { NextResponse } from "next/server";
import { BackendError } from "@/server/graphql/backend-graphql";
import { clientIp } from "@/server/http/client-ip";
import { isSameOrigin } from "@/server/http/same-origin";
import { checkFormToken } from "@/server/security/form-token";
import { verifyTurnstile } from "@/server/security/turnstile";
import { submitLead } from "@/server/services/landing.service";
import { leadSchema, type LeadResponse } from "@/shared/contracts/lead";

/** A real form is far smaller (message up to 3000 characters). */
const MAX_BODY_BYTES = 12_000;

const reply = (body: LeadResponse, status: number) =>
  NextResponse.json(body, { status });

const FALLBACK =
  "Não conseguimos enviar agora. Tente de novo em instantes ou fale pelo WhatsApp.";
const RELOAD =
  "Não foi possível enviar. Recarregue a página e tente de novo, ou fale pelo WhatsApp.";

// Contact form. Cheap checks first, so a flood is turned away before it
// costs anything: origin, size, format, honeypot, time trap, Turnstile;
// only then the backend (rate limits per IP and e-mail, duplicates, the
// e-mail breaker), which stores the lead and e-mails the Dora inbox.
export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return reply({ ok: false, message: "Origem não permitida." }, 403);
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return reply({ ok: false, message: "Mensagem grande demais." }, 413);
  }
  const raw = await request.text().catch(() => "");
  if (raw.length > MAX_BODY_BYTES) {
    return reply({ ok: false, message: "Mensagem grande demais." }, 413);
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply({ ok: false, message: RELOAD }, 400);
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot means a bot: pretend it worked.
    if (parsed.error.issues.some((issue) => issue.path[0] === "website")) {
      return reply({ ok: true }, 200);
    }
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fields[key] ??= issue.message;
    }
    return reply(
      { ok: false, message: "Revise os campos destacados.", fields },
      400,
    );
  }

  const timing = checkFormToken(parsed.data.formToken);
  if (timing === "too-fast") {
    // Filled in under 3 s: a bot. Pretend it worked, so it learns nothing.
    return reply({ ok: true }, 200);
  }
  if (timing !== "ok") {
    return reply({ ok: false, message: RELOAD, retry: "token" }, 400);
  }

  const human = await verifyTurnstile(
    parsed.data.turnstileToken,
    clientIp(request.headers),
  );
  if (!human) {
    return reply(
      {
        ok: false,
        message:
          "Não conseguimos confirmar que você não é um robô. Tente de novo.",
        retry: "challenge",
      },
      400,
    );
  }

  try {
    await submitLead(parsed.data, request.headers);
    return reply({ ok: true }, 201);
  } catch (error) {
    if (error instanceof BackendError && error.status < 500) {
      // Rate limit and validation messages are written for the visitor.
      return reply({ ok: false, message: error.message }, error.status);
    }
    console.error("[leads] submit failed", error);
    return reply({ ok: false, message: FALLBACK }, 502);
  }
}
