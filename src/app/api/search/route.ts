/**
 * Public search endpoint.
 *
 * Backs the hero search box on the landing page. Intentionally public and
 * anonymous: it only ever returns published information about departments,
 * services, and the conditions we treat. No patient data is reachable from
 * here — patient lookup lives behind authentication in the portal routes.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { departmentsBySlug } from "@/lib/his/data/departments";
import { search } from "@/lib/search/engine";

const querySchema = z.object({
  q: z.string().trim().min(1).max(120),
  limit: z.coerce.number().int().min(1).max(25).default(8),
  kinds: z
    .string()
    .optional()
    .transform((value) =>
      value
        ? value
            .split(",")
            .map((kind) => kind.trim())
            .filter((kind): kind is "department" | "service" | "condition" =>
              kind === "department" || kind === "service" || kind === "condition"
            )
        : undefined
    ),
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse({
    q: request.nextUrl.searchParams.get("q") ?? "",
    limit: request.nextUrl.searchParams.get("limit") ?? undefined,
    kinds: request.nextUrl.searchParams.get("kinds") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ query: "", results: [], error: "Invalid query." }, { status: 400 });
  }

  const { q, limit, kinds } = parsed.data;
  const hits = search(q, { limit, kinds: kinds?.length ? kinds : undefined });

  return NextResponse.json(
    {
      query: q,
      count: hits.length,
      results: hits.map(({ entry, score }) => {
        const department = departmentsBySlug.get(entry.departmentSlug);
        return {
          id: entry.id,
          kind: entry.kind,
          title: entry.title,
          subtitle: entry.subtitle,
          summary: entry.summary,
          department: department
            ? { slug: department.slug, name: department.name, location: department.location, hours: department.hours }
            : null,
          href: `/departments/${entry.departmentSlug}`,
          score,
        };
      }),
    },
    {
      headers: {
        // Public reference data: safe to cache briefly at the edge/proxy.
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    }
  );
}
