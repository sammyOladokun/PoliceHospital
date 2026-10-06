import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "@phosphor-icons/react/dist/ssr";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getHis } from "@/lib/his";
import { departments as seedDepartments } from "@/lib/his/data/departments";
import type { Department } from "@/lib/his/types";

export const metadata: Metadata = {
  title: "Departments & Clinics — Police Hospital",
  description:
    "Browse the clinical, diagnostic, emergency, and support departments at Police Hospital, Police College Ikeja.",
};

// Reference data — cheap to cache, and the HIS should not be polled per visitor.
export const revalidate = 300;

const CATEGORY_ORDER: Array<Department["category"]> = ["emergency", "clinical", "diagnostic", "support"];

const CATEGORY_LABEL: Record<Department["category"], string> = {
  emergency: "Emergency & Critical Care",
  clinical: "Clinical Specialties",
  diagnostic: "Diagnostics",
  support: "Support Services",
};

export default async function DepartmentsPage() {
  // If the hospital server is unreachable we still show the published directory
  // rather than an error page — this is public information, not clinical data.
  let departments: Department[];
  try {
    departments = await getHis().listDepartments();
  } catch {
    departments = seedDepartments;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f5fb]">
      <SiteHeader />

      <main className="section-shell w-full flex-1 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-400">
          <Link href="/" className="transition hover:text-[#0a2a6b]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-600">Departments</span>
        </nav>

        <h1 className="font-display mt-3 text-3xl text-[#0a2a6b] sm:text-4xl">Departments &amp; Clinics</h1>
        <p className="mt-2 max-w-2xl text-[13px] leading-6 text-slate-500 sm:text-sm sm:leading-7">
          Specialist and general services under one roof. Not sure where to start? Family Medicine is our first point of
          contact and will refer you to the right specialist.
        </p>

        {CATEGORY_ORDER.map((category) => {
          const group = departments.filter((department) => department.category === category);
          if (group.length === 0) return null;

          return (
            <section key={category} className="mt-10">
              <h2 className="font-display text-2xl text-[#0a2a6b]">{CATEGORY_LABEL[category]}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((department) => (
                  <li key={department.slug}>
                    <Link
                      href={`/departments/${department.slug}`}
                      className="group flex h-full flex-col rounded-[20px] border border-slate-100 bg-white p-5 shadow-[0_10px_30px_rgba(19,27,34,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(19,27,34,0.09)]"
                    >
                      <span className="font-display text-xl text-slate-800">{department.name}</span>
                      <span className="mt-1.5 flex-1 text-[13px] leading-6 text-slate-500">{department.summary}</span>

                      <span className="mt-3 flex flex-col gap-1.5 text-[12px] text-slate-400">
                        {department.location ? (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} className="shrink-0" /> {department.location}
                          </span>
                        ) : null}
                        {department.hours ? (
                          <span className="flex items-center gap-1.5">
                            <Clock size={13} className="shrink-0" /> {department.hours}
                          </span>
                        ) : null}
                      </span>

                      <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0a2a6b]">
                        View department <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>

      <SiteFooter />
    </div>
  );
}
