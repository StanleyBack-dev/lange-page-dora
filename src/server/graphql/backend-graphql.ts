import "server-only";
import { serverEnv } from "@/server/config/env";
import { clientIp } from "@/server/http/client-ip";

const TIMEOUT_MS = 15_000;

/** A failure reported by the backend (its error `code` and message). */
export class BackendError extends Error {
  constructor(
    message: string,
    readonly code: string | undefined,
    readonly status: number,
  ) {
    super(message);
  }
}

type GraphqlResponse<T> = {
  data?: T | null;
  errors?: {
    message?: string;
    extensions?: { code?: string; statusCode?: number };
  }[];
};

// Single gateway to the backend's GraphQL API (backend-dora, `landing`
// module): the internal key, plus the visitor's IP and browser so the API
// can rate limit and filter bots. The landing page has no sessions.
export async function backendGraphql<T>(
  query: string,
  variables: Record<string, unknown>,
  client: Headers,
): Promise<T> {
  const env = serverEnv();
  const headers: Record<string, string> = {
    accept: "application/json",
    "content-type": "application/json",
    "x-internal-api-key": env.INTERNAL_API_KEY,
  };
  const ip = clientIp(client);
  if (ip) headers["x-client-ip"] = ip;
  const agent = client.get("user-agent");
  if (agent) headers["x-client-user-agent"] = agent.slice(0, 512);

  let response: Response;
  try {
    response = await fetch(new URL("/graphql", env.BACKEND_URL), {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  } catch {
    throw new BackendError("Backend unreachable.", "NETWORK", 503);
  }

  const body = (await response.json().catch(() => ({}))) as GraphqlResponse<T>;
  const error = body.errors?.[0];
  if (error || !body.data) {
    throw new BackendError(
      error?.message ?? `Backend responded ${response.status}.`,
      error?.extensions?.code,
      error?.extensions?.statusCode ?? response.status,
    );
  }
  return body.data;
}
