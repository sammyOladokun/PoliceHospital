/**
 * Validated environment configuration.
 *
 * Everything the app reads from `process.env` goes through here so that a
 * misconfigured deployment fails loudly at boot instead of silently at 3am in
 * the middle of a clinic session.
 *
 * Server-only. Never import this from a "use client" module.
 */
import { z } from "zod";

const booleanish = z
  .enum(["true", "false", "1", "0"])
  .transform((value) => value === "true" || value === "1");

const serverSchema = z.object({
  APP_NAME: z.string().min(1).default("Police Hospital Platform"),
  APP_ENV: z.enum(["development", "staging", "production"]).default("development"),

  DATABASE_URL: z.string().min(1).optional(),

  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(16).optional(),

  /**
   * Hospital Information System (HIS) running on the hospital's local server.
   *
   * `HIS_MODE`
   *   - `local`  → use the in-repo catalogue + seeded fixtures. The public site
   *                works with no hospital server reachable at all. Default.
   *   - `fhir`   → talk to an HL7 FHIR R4 endpoint (either a native FHIR server
   *                or a FHIR facade sitting in front of the legacy HIS).
   *
   * `HIS_BASE_URL` is expected to be a private-network address, e.g.
   * `https://his.pch.local/fhir` — reachable from the app server only, never
   * from the patient's browser.
   */
  HIS_MODE: z.enum(["local", "fhir"]).default("local"),
  HIS_BASE_URL: z.string().url().optional(),
  HIS_API_KEY: z.string().optional(),
  HIS_TIMEOUT_MS: z.coerce.number().int().positive().max(60_000).default(8_000),
  HIS_RETRIES: z.coerce.number().int().min(0).max(5).default(2),
  /** Set to true only for a hospital LAN server using a self-signed certificate. */
  HIS_ALLOW_SELF_SIGNED: booleanish.default("false"),
});

type ServerEnv = z.infer<typeof serverSchema>;

let cached: ServerEnv | null = null;

export function getEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = serverSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }

  // Cross-field rule: FHIR mode is useless without somewhere to point at.
  if (parsed.data.HIS_MODE === "fhir" && !parsed.data.HIS_BASE_URL) {
    throw new Error("HIS_MODE=fhir requires HIS_BASE_URL to be set.");
  }

  cached = parsed.data;
  return cached;
}

/** True when the app is expected to reach the hospital's local HIS server. */
export function isHisConnected(): boolean {
  return getEnv().HIS_MODE !== "local";
}
