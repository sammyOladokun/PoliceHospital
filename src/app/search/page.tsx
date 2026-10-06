import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Buildings,
  Clock,
  FirstAid,
  MagnifyingGlass,
  MapPin,
  Stethoscope,
  Ambulance,
} from "@phosphor-icons/react/dist/ssr";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { phoneLines } from "@/lib/contact";
import { departments, departmentsBySlug } from "@/lib/his/data/departments";
import { popularSearches, type SearchKind } from "@/lib/search/catalog";
import { search } from "@/lib/search/engine";

export const metadata: Metadata = {
  title: "Search — Police Hospital",
  description: "Find a department, service, or condition treated at Police Hospital, Police College Ikeja.",
  // Result pages are generated per query; there is nothing here worth indexing.
  robots: { index: false, follow: true },
};

const KIND_META: Record<SearchKind, { label: string; Icon: typeof Buildings }> = {
  department: { label: "Department", Icon: Buildings },
  service: { label: "Service", Icon: Stethoscope },
  condition: { label: "Condition", Icon: FirstAid },
};

/** Server-rendered refine box — works with JavaScript disabled. */
function RefineForm({ defaultValue }: { defaultValue: string }) {
  return (
    <form role="search" action="/search" method="get" className="mt-6 flex flex-row items-stretch gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-white px-4 py-3 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[#0a2a6b]/40 sm:px-5">
        <MagnifyingGlass size={18} className="shrink-0 text-slate-400" />
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Search disease, department"
          aria-label="Search departments, services, and conditions"
          className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-full bg-[#0a2a6b] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0d2f7a] sm:px-6"
      >
        Search
      </button>
    </form>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().slice(0, 120);
  const hits = query ? search(query, { limit: 20 }) : [];

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f5fb]">
      <SiteHeader />

      <main className="section-shell w-full flex-1 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-400">
          <Link href="/" className="transition hover:text-[#0a2a6b]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-600">Search</span>
        </nav>

        <h1 className="font-display mt-3 text-3xl text-[#0a2a6b] sm:text-4xl">
          {query ? <>Results for “{query}”</> : "Search our services"}
        </h1>
        <p className="mt-2 text-[13px] text-slate-500 sm:text-sm">
          {query
            ? `${hits.length} ${hits.length === 1 ? "match" : "matches"} across departments, services, and conditions we treat.`
            : "Search by symptom, test, or department name — for example “chest pain”, “x-ray”, or “antenatal”."}
        </p>

        <div className="max-w-2xl">
          <RefineForm defaultValue={query} />
        </div>

        {/* --- Emergency interrupt: some searches should not end in a list --- */}
        {hits.some((hit) => hit.entry.departmentSlug === "emergency") ? (
          <div className="mt-8 flex items-start gap-4 rounded-[22px] border border-[#f5b301]/40 bg-[#fff8e6] p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f5b301]/25 text-[#8a6100]">
              <Ambulance size={22} weight="fill" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#8a6100]">This may need urgent attention</p>
              <p className="mt-1 text-[13px] leading-6 text-[#7a5800]">
                Our Emergency &amp; Trauma Centre is open 24 hours a day. Do not wait for an appointment — come to the
                emergency entrance at the Main Block, or call{" "}
                <a href={`tel:${phoneLines[0].tel}`} className="font-semibold underline">
                  {phoneLines[0].display}
                </a>{" "}
                or{" "}
                <a href={`tel:${phoneLines[1].tel}`} className="font-semibold underline">
                  {phoneLines[1].display}
                </a>
                .
              </p>
            </div>
          </div>
        ) : null}

        {/* --- Results --- */}
        {query && hits.length > 0 ? (
          <ul className="mt-8 grid gap-3">
            {hits.map(({ entry }) => {
              const department = departmentsBySlug.get(entry.departmentSlug);
              const meta = KIND_META[entry.kind];

              return (
                <li key={entry.id}>
                  <Link
                    href={`/departments/${entry.departmentSlug}`}
                    className="group flex items-start gap-4 rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_10px_30px_rgba(19,27,34,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(19,27,34,0.09)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a2a6b]/10 text-[#0a2a6b] transition group-hover:bg-[#0a2a6b] group-hover:text-white">
                      <meta.Icon size={21} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <span className="font-display text-xl text-slate-800">{entry.title}</span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                          {meta.label}
                        </span>
                      </span>
                      <span className="mt-1.5 block text-[13px] leading-6 text-slate-500">{entry.summary}</span>

                      <span className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] text-slate-400">
                        {entry.kind !== "department" && department ? (
                          <span className="flex items-center gap-1.5 font-medium text-[#0a2a6b]">
                            <Buildings size={14} /> {department.name}
                          </span>
                        ) : null}
                        {department?.location ? (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} /> {department.location}
                          </span>
                        ) : null}
                        {department?.hours ? (
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} /> {department.hours}
                          </span>
                        ) : null}
                      </span>
                    </span>

                    <ArrowRight
                      size={18}
                      className="mt-2 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#f5b301]"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}

        {/* --- No results --- */}
        {query && hits.length === 0 ? (
          <div className="mt-8 rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(19,27,34,0.05)] sm:p-8">
            <h2 className="font-display text-2xl text-[#0a2a6b]">Nothing matched “{query}”</h2>
            <p className="mt-2 max-w-xl text-[13px] leading-6 text-slate-500 sm:text-sm sm:leading-7">
              Try describing the symptom in everyday words, naming the test you need, or picking a department below. If
              you are unsure where to go, our Family Medicine clinic is the right first stop — they will refer you on.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {popularSearches.map((suggestion) => (
                <Link
                  key={suggestion}
                  href={`/search?q=${encodeURIComponent(suggestion)}`}
                  className="rounded-full bg-slate-100 px-3.5 py-2 text-[13px] font-medium text-slate-600 transition hover:bg-[#0a2a6b] hover:text-white"
                >
                  {suggestion}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {/* --- Browse all (shown when there is no query, or nothing matched) --- */}
        {!query || hits.length === 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl text-[#0a2a6b]">All departments</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((department) => (
                <li key={department.slug}>
                  <Link
                    href={`/departments/${department.slug}`}
                    className="group flex h-full flex-col rounded-[20px] border border-slate-100 bg-white p-5 shadow-[0_10px_30px_rgba(19,27,34,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(19,27,34,0.09)]"
                  >
                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {department.category}
                    </span>
                    <span className="font-display mt-1 text-xl text-slate-800">{department.name}</span>
                    <span className="mt-1.5 flex-1 text-[13px] leading-6 text-slate-500">{department.summary}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0a2a6b]">
                      View department <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
