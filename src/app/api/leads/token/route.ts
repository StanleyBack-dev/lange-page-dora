import { NextResponse } from "next/server";
import { issueFormToken } from "@/server/security/form-token";

export const dynamic = "force-dynamic";

// The contact form asks for its signed token when it loads (time trap; see
// server/security/form-token.ts).
export function GET() {
  return NextResponse.json(
    { token: issueFormToken() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
