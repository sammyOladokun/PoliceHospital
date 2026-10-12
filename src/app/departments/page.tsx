import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "@phosphor-icons/react/dist/ssr";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getHis } from "@/lib/his";
import { departments as seedDepartments } from "@/lib/his/data/departments";
import type { Department } from "@/lib/his/types";

import teamIllustration from "../../../assets/3.png";

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

  const departmentGroups = CATEGORY_ORDER.map((category) => ({
    category,
    group: departments.filter((department) => department.category === category),
  })).filter(({ group }) => group.length > 0);

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f5fb]">
      <SiteHeader action="menu" navFirstLink="blogs" />

      <main className="relative isolate w-full flex-1 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(10,42,107,0.22),transparent_58%)]" />
          <Image
            src={teamIllustration}
            alt=""
            className="absolute -left-24 top-20 w-[420px] opacity-[0.05]"
          />
        </div>
        <div className="section-shell relative z-10 py-8 sm:py-12">
        <h1 className="font-display text-3xl text-[#0a2a6b] sm:text-4xl">Departments &amp; Clinics</h1>
        <p className="mt-2 max-w-2xl text-[13px] leading-6 text-slate-500 sm:text-sm sm:leading-7">
          Specialist and general services under one roof. Not sure where to start? Family Medicine is our first point of
          contact and will refer you to the right specialist.
        </p>

        {departmentGroups.map(({ category, group }, sectionIndex) => (
            <section key={category} className="mt-10">
              {sectionIndex > 0 ? <hr aria-hidden="true" className="mb-8 w-full border-slate-300" /> : null}
              <h2 className="font-display text-2xl text-[#0a2a6b]">{CATEGORY_LABEL[category]}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((department) => (
                  <li key={department.slug}>
                    <Link
                      href={`/departments/${department.slug}`}
                      className="group flex h-full flex-col rounded-lg p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a2a6b]"
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
                      <span aria-hidden="true" className="mt-4 h-px w-1/2 bg-gradient-to-r from-[#0a2a6b]/35 to-transparent" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
        ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
