/**
 * Readiness probe.
 *
 * Written for the hospital's on-site IT team: one URL that answers "is the
 * portal healthy, and can it see the HIS on the local server?". Returns 503
 * when a dependency the app needs is down, so it can be wired straight into a
 * monitor or load balancer.
 *
 * Deliberately terse — no versions, hostnames, or stack traces beyond the HIS
 * error string, which the adapter already truncates.
 */
import { NextResponse } from "next/server";

import { getEnv } from "@/lib/config/env";
import { getHis } from "@/lib/his";

export const dynamic = "force-dynamic";

export async function GET() {
  const env = getEnv();
  const his = getHis();

  const hisHealth = await his.health().catch((error) => ({
    mode: his.mode,
    reachable: false,
    error: error instanceof Error ? error.message : String(error),
  }));

  const healthy = hisHealth.reachable;

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      appEnv: env.APP_ENV,
      checks: {
        app: { status: "ok" },
        his: hisHealth,
      },
    },
    {
      status: healthy ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    }
  );
}
