import "server-only";

/** The visitor's IP as the hosting proxy reports it (Vercel sets it). */
export function clientIp(headers: Headers): string | null {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    null
  );
}
