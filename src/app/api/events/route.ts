import { isSameOrigin } from "@/server/http/same-origin";
import { recordEvents } from "@/server/services/landing.service";
import { analyticsBatchSchema } from "@/shared/contracts/analytics-event";

const noContent = () => new Response(null, { status: 204 });

// Analytics beacon (navigator.sendBeacon): always answers 204 so the page
// never cares; invalid batches are dropped here, bots and floods by the API.
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return noContent();

  const raw = await request.text().catch(() => "");
  if (!raw || raw.length > 16_000) return noContent();
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return noContent();
  }
  const parsed = analyticsBatchSchema.safeParse(body);
  if (!parsed.success) return noContent();

  try {
    await recordEvents(parsed.data, request.headers);
  } catch (error) {
    console.error("[analytics] beacon not forwarded", error);
  }
  return noContent();
}
