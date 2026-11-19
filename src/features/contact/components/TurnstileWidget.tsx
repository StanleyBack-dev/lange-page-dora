"use client";

import { useEffect, useRef } from "react";

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: Record<string, unknown>,
  ) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | undefined;

/** Loads Cloudflare's script once per page. */
function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = undefined;
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

type TurnstileWidgetProps = {
  siteKey: string;
  /** A fresh token, or null when it expired or failed. */
  onToken: (token: string | null) => void;
  /** Bump to get a new token (each one is valid for a single check). */
  resetKey: number;
};

// Cloudflare Turnstile: usually invisible ("interaction-only"); a checkbox
// appears only when Cloudflare is unsure the visitor is a person.
export function TurnstileWidget({
  siteKey,
  onToken,
  resetKey,
}: TurnstileWidgetProps) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const callback = useRef(onToken);

  useEffect(() => {
    callback.current = onToken;
  }, [onToken]);

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !container.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(container.current, {
          sitekey: siteKey,
          action: "contact",
          appearance: "interaction-only",
          language: "pt-br",
          theme: "light",
          callback: (token: string) => callback.current(token),
          "expired-callback": () => callback.current(null),
          "error-callback": () => callback.current(null),
        });
      })
      .catch(() => callback.current(null));
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [siteKey]);

  useEffect(() => {
    if (resetKey === 0 || !widgetId.current) return;
    callback.current(null);
    window.turnstile?.reset(widgetId.current);
  }, [resetKey]);

  return <div ref={container} className="sm:col-span-2 empty:hidden" />;
}
