"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LogoMark } from "@/design-system/components/LogoMark";
import { APP_URL } from "@/shared/lib/site";

/** After this long without leaving the page, offer to try again. */
const SLOW_MS = 12_000;

type AppLoginLinkProps = {
  /** Analytics click name, "app-login:<place>". */
  track: string;
  className?: string;
  children: React.ReactNode;
};

// "Entrar": opens the Dora app (another site). Opening it can take a few
// seconds (the app checks the session first), so a full-screen loading
// state shows right away, until the browser leaves this page. Clicks that
// open a new tab or window keep the normal behaviour.
export function AppLoginLink({
  track,
  className,
  children,
}: AppLoginLinkProps) {
  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);

  // Back button (page restored from the cache): no leftover loading state.
  useEffect(() => {
    const onShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      setLoading(false);
      setSlow(false);
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setSlow(true), SLOW_MS);
    return () => clearTimeout(timer);
  }, [loading]);

  if (!APP_URL) return null;

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const newTab =
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;
    if (newTab) return;
    setSlow(false);
    setLoading(true);
  };

  return (
    <>
      <a
        href={APP_URL}
        onClick={onClick}
        data-track={track}
        aria-busy={loading}
        className={className}
      >
        {children}
      </a>
      {loading
        ? createPortal(
            <AppLaunchScreen
              slow={slow}
              onCancel={() => {
                window.stop();
                setLoading(false);
              }}
            />,
            document.body,
          )
        : null}
    </>
  );
}

function AppLaunchScreen({
  slow,
  onCancel,
}: {
  slow: boolean;
  onCancel: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-screen-in fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-chrome/95 px-6 text-center text-chrome-fg backdrop-blur-sm"
    >
      <div className="relative">
        <span className="absolute -inset-6 animate-pulse rounded-full bg-brand/30 blur-2xl" />
        <LogoMark className="relative size-16 animate-pulse" />
      </div>
      <div>
        <p className="flex items-center justify-center gap-2 text-xl font-bold">
          <LoaderCircle className="size-5 animate-spin text-brand" />
          Abrindo o Dora…
        </p>
        <p className="mt-2 text-sm text-chrome-muted">
          {slow
            ? "Está demorando mais que o normal. Verifique sua conexão."
            : "Carregando sua sessão. Isso leva só alguns segundos."}
        </p>
      </div>
      {slow ? (
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={APP_URL}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-fg hover:bg-brand-hover"
          >
            Tentar de novo
          </a>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-chrome-fg hover:bg-white/10"
          >
            Cancelar
          </button>
        </div>
      ) : null}
    </div>
  );
}
