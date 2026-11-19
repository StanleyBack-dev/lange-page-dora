import type {
  AnalyticsBatch,
  AnalyticsEvent,
  EventType,
} from "@/shared/contracts/analytics-event";
import { uuidV4 } from "@/shared/lib/uuid";

// First-party, anonymous analytics. A random visitor id (localStorage) and
// session id (sessionStorage); no cookies, no IP, no personal data. Visitors
// who ask not to be tracked (Do Not Track / Global Privacy Control) are not.

const VISITOR_KEY = "dora:vid";
const SESSION_KEY = "dora:sid";
const ATTRIBUTION_KEY = "dora:attr";
const ENDPOINT = "/api/events";
const FLUSH_DELAY_MS = 1500;

type Attribution = Pick<
  AnalyticsBatch,
  "referrerHost" | "utmSource" | "utmMedium" | "utmCampaign"
>;

const queue: AnalyticsEvent[] = [];
let timer: ReturnType<typeof setTimeout> | undefined;

function storedId(storage: Storage, key: string): string {
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
    const id = uuidV4();
    storage.setItem(key, id);
    return id;
  } catch {
    return uuidV4();
  }
}

export function trackingAllowed(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.doNotTrack !== "1" && nav.globalPrivacyControl !== true;
}

export function visitorId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return storedId(localStorage, VISITOR_KEY);
}

function device(): AnalyticsBatch["device"] {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/** Where this session came from, captured on its first page. */
export function attribution(): Attribution {
  try {
    const saved = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (saved) return JSON.parse(saved) as Attribution;
  } catch {
    // Storage blocked: compute it again.
  }
  const params = new URLSearchParams(window.location.search);
  let referrerHost: string | undefined;
  try {
    const host = document.referrer ? new URL(document.referrer).host : "";
    referrerHost = host && host !== window.location.host ? host : undefined;
  } catch {
    referrerHost = undefined;
  }
  const value: Attribution = {
    referrerHost,
    utmSource: params.get("utm_source")?.slice(0, 100) || undefined,
    utmMedium: params.get("utm_medium")?.slice(0, 100) || undefined,
    utmCampaign: params.get("utm_campaign")?.slice(0, 100) || undefined,
  };
  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(value));
  } catch {
    // Not persisted: fine.
  }
  return value;
}

export function flush(): void {
  if (timer) clearTimeout(timer);
  timer = undefined;
  if (!queue.length) return;
  const events = queue.splice(0, 25);
  const batch: AnalyticsBatch = {
    visitorId: storedId(localStorage, VISITOR_KEY),
    sessionId: storedId(sessionStorage, SESSION_KEY),
    device: device(),
    ...attribution(),
    events,
  };
  const body = JSON.stringify(batch);
  const sent =
    typeof navigator.sendBeacon === "function" &&
    navigator.sendBeacon(
      ENDPOINT,
      new Blob([body], { type: "application/json" }),
    );
  if (!sent) {
    void fetch(ENDPOINT, {
      method: "POST",
      body,
      keepalive: true,
      headers: { "content-type": "application/json" },
    }).catch(() => undefined);
  }
  if (queue.length) flush();
}

/** Queues an event; batches go out shortly after, or when the page hides. */
export function track(type: EventType, name?: string): void {
  if (!trackingAllowed()) return;
  queue.push({
    type,
    name: name?.slice(0, 80),
    path: window.location.pathname.slice(0, 200),
  });
  if (queue.length >= 20) {
    flush();
    return;
  }
  timer ??= setTimeout(flush, FLUSH_DELAY_MS);
}
