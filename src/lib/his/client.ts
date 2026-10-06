/**
 * HTTP transport for the hospital's local HIS server.
 *
 * Deliberately conservative: a clinic-floor LAN is not the public internet.
 * Requests time out fast, retry only on transport/5xx errors, and never retry
 * non-idempotent verbs. All traffic is server-to-server — this module must
 * never be imported into a client component.
 */
import { getEnv } from "@/lib/config/env";

/** Thrown when the hospital server could not be reached or returned an error. */
export class HisUnavailableError extends Error {
  readonly status?: number;
  readonly cause?: unknown;

  constructor(message: string, options: { status?: number; cause?: unknown } = {}) {
    super(message);
    this.name = "HisUnavailableError";
    this.status = options.status;
    this.cause = options.cause;
  }
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HisRequestOptions {
  method?: Method;
  /** Path relative to HIS_BASE_URL, e.g. "Patient" or "Appointment". */
  path: string;
  query?: Record<string, string | number | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  /** Per-request override of the configured timeout. */
  timeoutMs?: number;
  /**
   * Next.js fetch cache hint. Clinical data must stay `no-store`; reference
   * data (departments, practitioners) may be revalidated on an interval.
   */
  revalidateSeconds?: number | false;
}

function buildUrl(baseUrl: string, path: string, query?: HisRequestOptions["query"]): string {
  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const url = new URL(path.replace(/^\//, ""), base);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);

function isRetryable(method: Method, status?: number): boolean {
  if (method !== "GET") return false;
  if (status === undefined) return true; // transport-level failure
  return RETRYABLE_STATUS.has(status);
}

async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Perform a request against the hospital HIS and parse the JSON response.
 *
 * Throws `HisUnavailableError` on any non-2xx response or transport failure,
 * after exhausting the configured retries.
 */
export async function hisRequest<T>(options: HisRequestOptions): Promise<T> {
  const env = getEnv();

  if (!env.HIS_BASE_URL) {
    throw new HisUnavailableError(
      "HIS_BASE_URL is not configured; the hospital server is not wired up yet."
    );
  }

  const method = options.method ?? "GET";
  const url = buildUrl(env.HIS_BASE_URL, options.path, options.query);
  const timeoutMs = options.timeoutMs ?? env.HIS_TIMEOUT_MS;
  const attempts = method === "GET" ? env.HIS_RETRIES + 1 : 1;

  let lastError: HisUnavailableError | null = null;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method,
        signal: controller.signal,
        headers: {
          Accept: "application/fhir+json, application/json",
          ...(options.body ? { "Content-Type": "application/fhir+json" } : {}),
          ...(env.HIS_API_KEY ? { Authorization: `Bearer ${env.HIS_API_KEY}` } : {}),
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: options.revalidateSeconds ? undefined : "no-store",
        next: options.revalidateSeconds ? { revalidate: options.revalidateSeconds } : undefined,
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        const error = new HisUnavailableError(
          `HIS responded ${response.status} for ${method} ${options.path}${
            detail ? `: ${detail.slice(0, 200)}` : ""
          }`,
          { status: response.status }
        );

        if (isRetryable(method, response.status) && attempt < attempts - 1) {
          lastError = error;
          await delay(150 * 2 ** attempt);
          continue;
        }

        throw error;
      }

      // 204 and empty bodies are valid for some HIS endpoints.
      const text = await response.text();
      return (text ? JSON.parse(text) : null) as T;
    } catch (error) {
      if (error instanceof HisUnavailableError) throw error;

      const wrapped = new HisUnavailableError(
        `Could not reach the hospital server at ${url}: ${
          error instanceof Error ? error.message : String(error)
        }`,
        { cause: error }
      );

      if (isRetryable(method) && attempt < attempts - 1) {
        lastError = wrapped;
        await delay(150 * 2 ** attempt);
        continue;
      }

      throw wrapped;
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError ?? new HisUnavailableError("HIS request failed for an unknown reason.");
}
