import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, Clock, MapPin, Phone, UserCircle } from "@phosphor-icons/react/dist/ssr";

import { BookingButton } from "@/components/booking/BookingButton";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getHis } from "@/lib/his";
import { departments as seedDepartments, departmentsBySlug } from "@/lib/his/data/departments";
import type { Department, Practitioner } from "@/lib/his/types";
import { phoneLines, primaryPhone } from "@/lib/contact";

export const revalidate = 300;

/** Pre-render the published directory; unknown slugs still resolve at request time. */
export function generateStaticParams() {
  return seedDepartments.map((department) => ({ slug: department.slug }));
}

async function loadDepartment(slug: string): Promise<{ department: Department | null; practitioners: Practitioner[] }> {
  try {
    const his = getHis();
    const [department, practitioners] = await Promise.all([
      his.getDepartment(slug),
      his.listPractitioners({ departmentSlug: slug }).catch(() => [] as Practitioner[]),
    ]);
    return { department, practitioners };
  } catch {
    // Hospital server unreachable — fall back to the published directory so the
    // public page keeps working. Practitioner rosters come from the HIS only.
    return { department: departmentsBySlug.get(slug) ?? null, practitioners: [] };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const department = departmentsBySlug.get(slug);

  if (!department) return { title: "Department not found — Police Hospital" };

  return {
    title: `${department.name} — Police Hospital`,
    description: department.description ?? department.summary,
  };
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { department, practitioners } = await loadDepartment(slug);

  if (!department) notFound();

  const isEmergency = department.category === "emergency";

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f5fb]">
      <SiteHeader />

      <main className="w-full flex-1">
        {/* --- Department hero --- */}
        <section className="bg-gradient-to-br from-[#0d2f7a] via-[#0a2a6b] to-[#05123a] text-white">
          <div className="section-shell py-10 sm:py-14">
            <nav aria-label="Breadcrumb" className="text-[13px] text-white/50">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/departments" className="transition hover:text-white">
                Departments
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/80">{department.name}</span>
            </nav>

            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
              <span className={`h-1.5 w-1.5 rounded-full ${isEmergency ? "bg-[#ff6b6b]" : "bg-[#f5b301]"}`} />
              {isEmergency ? "Open 24/7" : `${department.category} department`}
            </span>

            <h1 className="font-display mt-3 max-w-3xl text-3xl leading-tight sm:text-5xl">{department.name}</h1>
            <p className="mt-4 max-w-2xl text-[13px] leading-6 text-white/75 sm:text-base sm:leading-7">
              {department.description ?? department.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-white/75 sm:text-sm">
              {department.location ? (
                <span className="flex items-center gap-2">
                  <MapPin size={16} weight="fill" className="shrink-0 text-[#f5b301]" /> {department.location}
                </span>
              ) : null}
              {department.hours ? (
                <span className="flex items-center gap-2">
                  <Clock size={16} weight="fill" className="shrink-0 text-[#f5b301]" /> {department.hours}
                </span>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <BookingButton className="inline-flex items-center gap-2 rounded-full bg-[#f5b301] px-6 py-3 text-sm font-semibold text-[#071a45] transition hover:-translate-y-0.5 hover:bg-[#ffc21f]">
                Book an appointment <ArrowRight size={16} />
              </BookingButton>
              <a
                href={`tel:${primaryPhone.tel}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Phone size={16} weight="fill" /> Call the hospital
              </a>
            </div>
          </div>
        </section>

        <div className="section-shell grid gap-6 py-10 lg:grid-cols-[1.4fr_1fr] sm:py-14">
          {/* --- Services offered --- */}
          <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(19,27,34,0.05)] sm:p-8">
            <h2 className="font-display text-2xl text-[#0a2a6b]">What this department offers</h2>
            {department.services.length > 0 ? (
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {department.services.map((service) => (
                  <li key={service} className="flex items-start gap-2.5 text-[13px] leading-6 text-slate-600 sm:text-sm">
                    <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-[#1f8f4e]" />
                    {service}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[13px] leading-6 text-slate-500">
                Service details for this department are being updated. Please call the hospital for current information.
              </p>
            )}

            {practitioners.length > 0 ? (
              <>
                <h3 className="font-display mt-8 text-xl text-[#0a2a6b]">Consultants &amp; specialists</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {practitioners.map((practitioner) => (
                    <li
                      key={practitioner.id}
                      className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      <UserCircle size={32} weight="fill" className="shrink-0 text-[#0a2a6b]" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-slate-800">{practitioner.name}</span>
                        {practitioner.title ? (
                          <span className="block truncate text-[12px] text-slate-500">{practitioner.title}</span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>

          {/* --- Sidebar --- */}
          <aside className="space-y-4">
            {isEmergency ? (
              <div className="rounded-[24px] border border-[#f5b301]/40 bg-[#fff8e6] p-6">
                <p className="text-sm font-semibold text-[#8a6100]">In an emergency, do not book online</p>
                <p className="mt-1.5 text-[13px] leading-6 text-[#7a5800]">
                  Come directly to the emergency entrance at the Main Block, or call{" "}
                  <a href={`tel:${phoneLines[0].tel}`} className="font-semibold underline">
                    {phoneLines[0].display}
                  </a>{" "}
                  or{" "}
                  <a href={`tel:${phoneLines[1].tel}`} className="font-semibold underline">
                    {phoneLines[1].display}
                  </a>{" "}
                  for ambulance response.
                </p>
              </div>
            ) : null}

            <div className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(19,27,34,0.05)]">
              <h2 className="font-display text-xl text-[#0a2a6b]">Insurance &amp; payment</h2>
              <p className="mt-2 text-[13px] leading-6 text-slate-500">
                We are accredited under NHIA and work with registered HMOs. Bring your enrolee number and, where
                required, an authorisation code from your provider.
              </p>
              <Link
                href="/departments/nhia-hmo"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0a2a6b] hover:underline"
              >
                NHIA / HMO desk <ArrowRight size={14} />
              </Link>
            </div>

            <div className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(19,27,34,0.05)]">
              <h2 className="font-display text-xl text-[#0a2a6b]">Other departments</h2>
              <ul className="mt-3 divide-y divide-slate-100">
                {seedDepartments
                  .filter((other) => other.slug !== department.slug && other.category === department.category)
                  .slice(0, 5)
                  .map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/departments/${other.slug}`}
                        className="flex items-center justify-between gap-3 py-3 text-[13px] font-medium text-slate-600 transition hover:text-[#0a2a6b]"
                      >
                        {other.name}
                        <ArrowRight size={14} className="shrink-0 text-slate-300" />
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link
                href="/departments"
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0a2a6b] hover:underline"
              >
                See all departments <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
