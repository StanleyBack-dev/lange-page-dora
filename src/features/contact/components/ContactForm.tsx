"use client";

import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RequiredMark } from "@/design-system/components/RequiredMark";
import { buttonClass } from "@/design-system/components/ButtonLink";
import { cn } from "@/design-system/utils/cn";
import {
  attribution,
  track,
  trackingAllowed,
  visitorId,
} from "@/features/analytics/lib/tracker";
import {
  LEAD_ROLES,
  LEAD_SUBJECTS,
  LEAD_UNITS,
  leadSchema,
  type LeadResponse,
} from "@/shared/contracts/lead";
import { maskPhone, phoneError } from "@/shared/lib/masks";
import { TurnstileWidget } from "@/features/contact/components/TurnstileWidget";

/** Cloudflare Turnstile (bot check); empty in local dev = no challenge. */
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";

type Status = "idle" | "sending" | "sent";

const fieldClass = (invalid: boolean) =>
  cn(
    "w-full rounded-xl border bg-surface px-4 py-3 text-base text-fg placeholder:text-soft transition focus:border-brand focus:ring-4 focus:ring-ring focus:outline-none",
    invalid ? "border-danger" : "border-border-strong",
  );

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {optional ? (
          <span className="ml-1 font-normal text-soft">(opcional)</span>
        ) : (
          <RequiredMark />
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

// Contact form: validated in the browser with the same contract as the API
// route, sent to /api/leads (which forwards it to the backend). Reports
// form_start / form_submit / form_success / form_error to analytics.
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>();
  const [phone, setPhone] = useState("");
  const [formToken, setFormToken] = useState<string>();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const started = useRef(false);

  // Time-trap token, signed by the server when the form loads.
  const loadFormToken = useCallback(async () => {
    try {
      const response = await fetch("/api/leads/token", { cache: "no-store" });
      const body = (await response.json()) as { token?: string };
      setFormToken(body.token);
    } catch {
      setFormToken(undefined);
    }
  }, []);

  useEffect(() => {
    // Fetching on mount is the point here (the token marks the load time).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadFormToken();
  }, [loadFormToken]);

  const setFieldError = (field: string, error?: string | null) =>
    setErrors((current) => {
      const next = { ...current };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });

  const onFocus = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", "contact");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const form = new FormData(event.currentTarget);
    const source = trackingAllowed() ? attribution() : {};
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone,
      condominium: String(form.get("condominium") ?? ""),
      role: String(form.get("role") ?? ""),
      unitsRange: String(form.get("unitsRange") ?? ""),
      subject: String(form.get("subject") ?? ""),
      message: String(form.get("message") ?? ""),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
      visitorId: trackingAllowed() ? visitorId() : undefined,
      ...source,
      formToken,
      turnstileToken: turnstileToken ?? undefined,
    };

    track("form_submit", "contact");
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setMessage(
        "Aguarde a verificação de segurança terminar e envie de novo.",
      );
      track("form_error", "challenge-pending");
      return;
    }
    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fields[String(issue.path[0])] ??= issue.message;
      }
      setErrors(fields);
      setMessage("Revise os campos destacados.");
      track("form_error", "validation");
      return;
    }

    setStatus("sending");
    setErrors({});
    setMessage(undefined);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as LeadResponse;
      if (body.ok) {
        setStatus("sent");
        track("form_success", "contact");
        return;
      }
      setErrors(body.fields ?? {});
      setMessage(body.message);
      track("form_error", `http-${response.status}`);
      if (body.retry === "token") void loadFormToken();
    } catch {
      setMessage(
        "Sem conexão agora. Tente de novo em instantes ou fale pelo WhatsApp.",
      );
      track("form_error", "network");
    }
    // A Turnstile token is good for one check only: get a new one.
    setTurnstileReset((value) => value + 1);
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-3xl border border-success-border bg-success-soft p-10 text-center"
      >
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-positive text-positive-fg">
          <CircleCheck className="size-8" />
        </span>
        <h3 className="mt-5 text-2xl font-bold">Mensagem enviada!</h3>
        <p className="mt-2 max-w-sm text-muted">
          Obrigado pelo contato. Nossa equipe responde em até 1 dia útil, no
          e-mail que você informou.
        </p>
      </div>
    );
  }

  const describedBy = (name: string) =>
    errors[name] ? `${name}-error` : undefined;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onFocus={onFocus}
      className="grid gap-5 sm:grid-cols-2"
      aria-label="Formulário de contato"
    >
      <Field id="name" label="Nome" error={errors.name}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={120}
          aria-invalid={!!errors.name}
          aria-describedby={describedBy("name")}
          className={fieldClass(!!errors.name)}
          placeholder="Seu nome"
        />
      </Field>
      <Field id="email" label="E-mail" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={160}
          aria-invalid={!!errors.email}
          aria-describedby={describedBy("email")}
          className={fieldClass(!!errors.email)}
          placeholder="voce@email.com"
        />
      </Field>
      <Field id="phone" label="WhatsApp" optional error={errors.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel-national"
          inputMode="numeric"
          maxLength={15}
          value={phone}
          onChange={(event) => {
            const masked = maskPhone(event.target.value);
            setPhone(masked);
            // An error clears as soon as the number becomes valid.
            if (errors.phone && !phoneError(masked)) setFieldError("phone");
          }}
          onBlur={() => setFieldError("phone", phoneError(phone))}
          aria-invalid={!!errors.phone}
          aria-describedby={describedBy("phone")}
          className={fieldClass(!!errors.phone)}
          placeholder="(11) 99999-9999"
        />
      </Field>
      <Field
        id="condominium"
        label="Condomínio"
        optional
        error={errors.condominium}
      >
        <input
          id="condominium"
          name="condominium"
          maxLength={160}
          className={fieldClass(!!errors.condominium)}
          placeholder="Nome do condomínio"
        />
      </Field>
      <Field id="role" label="Você é" error={errors.role}>
        <select
          id="role"
          name="role"
          required
          defaultValue=""
          aria-invalid={!!errors.role}
          aria-describedby={describedBy("role")}
          className={fieldClass(!!errors.role)}
        >
          <option value="" disabled>
            Selecione
          </option>
          {Object.entries(LEAD_ROLES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="unitsRange" label="Tamanho do condomínio" optional>
        <select
          id="unitsRange"
          name="unitsRange"
          defaultValue=""
          className={fieldClass(false)}
        >
          <option value="">Não sei / prefiro não dizer</option>
          {Object.entries(LEAD_UNITS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-semibold">
          Assunto
          <RequiredMark />
        </legend>
        <div className="flex flex-wrap gap-2">
          {Object.entries(LEAD_SUBJECTS).map(([value, label], index) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="subject"
                value={value}
                defaultChecked={index === 0}
                className="peer sr-only"
              />
              <span className="inline-flex rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-medium transition peer-checked:border-fg peer-checked:bg-chrome peer-checked:text-chrome-fg peer-focus-visible:ring-4 peer-focus-visible:ring-ring hover:border-fg">
                {label}
              </span>
            </label>
          ))}
        </div>
        {errors.subject ? (
          <p className="mt-1.5 text-sm text-danger">{errors.subject}</p>
        ) : null}
      </fieldset>

      <div className="sm:col-span-2">
        <Field id="message" label="Mensagem" error={errors.message}>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={3000}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            className={cn(fieldClass(!!errors.message), "resize-y")}
            placeholder="Conte como funciona o seu condomínio e o que você precisa."
          />
        </Field>
      </div>

      {TURNSTILE_SITE_KEY ? (
        <TurnstileWidget
          siteKey={TURNSTILE_SITE_KEY}
          onToken={setTurnstileToken}
          resetKey={turnstileReset}
        />
      ) : null}

      {/* Honeypot: invisible to people, filled by bots. */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Site</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={!!errors.consent}
            className="mt-0.5 size-5 shrink-0 accent-[var(--brand)]"
          />
          <span>
            Concordo com o uso dos meus dados para receber o contato do Dora,
            conforme a{" "}
            <a
              href="/privacidade"
              className="font-semibold text-brand-ink underline underline-offset-2"
            >
              política de privacidade
            </a>
            .
            <RequiredMark />
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-1.5 text-sm text-danger">{errors.consent}</p>
        ) : null}
      </div>

      <p className="-mt-2 text-xs text-soft sm:col-span-2">
        <span className="text-danger">*</span> Campos obrigatórios
      </p>

      {message ? (
        <p
          role="alert"
          className="rounded-xl border border-danger-border bg-danger-soft px-4 py-3 text-sm text-danger sm:col-span-2"
        >
          {message}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClass("brand", "lg", "w-full sm:w-auto")}
        >
          {status === "sending" ? (
            <>
              <LoaderCircle className="size-5 animate-spin" /> Enviando…
            </>
          ) : (
            <>
              <Send className="size-5" /> Enviar mensagem
            </>
          )}
        </button>
      </div>
    </form>
  );
}
