/**
 * Single entry point for hospital data.
 *
 * Application code calls `getHis()` and never constructs an adapter directly,
 * so switching between the local fixtures and the hospital's live server is a
 * change to `HIS_MODE` in the environment, not a change to any feature code.
 */
import { getEnv } from "@/lib/config/env";
import { FhirHisAdapter } from "@/lib/his/adapters/fhir";
import { LocalHisAdapter } from "@/lib/his/adapters/local";
import type { HisAdapter } from "@/lib/his/types";

let instance: HisAdapter | null = null;

export function getHis(): HisAdapter {
  if (instance) return instance;

  const { HIS_MODE } = getEnv();
  instance = HIS_MODE === "fhir" ? new FhirHisAdapter() : new LocalHisAdapter();
  return instance;
}

/** Reset the cached adapter. Test-only. */
export function resetHis(): void {
  instance = null;
}

export { HisUnavailableError } from "@/lib/his/client";
export type * from "@/lib/his/types";
