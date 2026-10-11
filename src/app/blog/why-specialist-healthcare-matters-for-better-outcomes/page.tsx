import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  CheckCircle,
  Clock,
  FirstAid,
  Heartbeat,
  Stethoscope
} from "@phosphor-icons/react/dist/ssr";

import brandLogo from "../../../../assets/brand_logo.png";
import labImg from "../../../../assets/area.jpeg";
import doctorImg from "../../../../assets/support.jpeg";

export const metadata: Metadata = {
  title: "Why Specialist Healthcare Matters for Better Outcomes | Police Hospital",
  description:
    "Learn how specialist-led care improves diagnosis, treatment planning, follow-up, and patient outcomes at Police College Hospital Ikeja."
};

const takeaways = [
  "Specialist care helps patients get a clearer diagnosis earlier.",
  "Multidisciplinary teams reduce delays between consultation, testing, treatment, and follow-up.",
  "Better coordination supports safer decisions for complex or long-term conditions."
];

const sections = [
  {
    title: "Specialists Bring Focused Clinical Expertise",
    body:
      "General medical care is essential, but some conditions need deeper assessment from clinicians who focus on a particular field. Specialist teams are trained to recognize patterns, interpret complex results, and recommend treatment plans that match the patient's full clinical picture."
  },
  {
    title: "Accurate Diagnosis Shapes Better Treatment",
    body:
      "A strong outcome often begins with the right diagnosis. When specialist consultation is supported by laboratory services, imaging, pharmacy, nursing, and rehabilitation, patients are more likely to receive care that is targeted rather than delayed or repeated unnecessarily."
  },
  {
    title: "Team-Based Care Improves Continuity",
    body:
      "The best care is rarely delivered by one person working alone. Consultants, nurses, pharmacists, laboratory scientists, radiographers, physiotherapists, and administrative teams all contribute to a smoother care journey, especially when patients need ongoing review."
  },
  {
    title: "Follow-Up Turns Treatment Into Recovery",
    body:
      "Specialist healthcare does not end after one appointment. Regular follow-up helps clinicians monitor progress, adjust medicines, review test results, and support patients with practical guidance. This continuity is especially important for chronic conditions, surgery recovery, maternal care, and rehabilitation."
  }
];

export default function SpecialistHealthcareArticlePage() {
  return (
    <main className="scroll-theme-editorial min-h-screen bg-[#f3f5fb] text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="bg-[#071a45] text-white"><div className="section-shell flex h-9 items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-white/70"><span>Health Insights</span><span>Patient education and clinical guidance</span></div></div>
        <div className="section-shell flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src={brandLogo} alt="" className="h-12 w-12 object-contain" />
            <div>
              <p className="font-display text-xl leading-none text-[#0a2a6b]">Police Hospital</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">Police College, Ikeja</p>
            </div>
          </Link>
          <div className="flex items-center gap-5"><Link href="/#blog" className="hidden text-xs font-bold uppercase tracking-[0.12em] text-[#0a2a6b] lg:inline">All articles</Link><Link href="/#consult" className="rounded-full bg-[#0a2a6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d3488]">Book consultation</Link></div>
        </div>
      </header>

      <article>
        <section className="section-shell py-10 sm:py-16">
          <div className="border-b border-slate-200 pb-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1f8f4e]">Health Insights</p><Link href="/#blog" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0a2a6b]">
            <ArrowLeft size={16} />
            Back to insights
          </Link></div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-3 text-[13px] font-medium text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
                  <CalendarBlank size={15} className="text-[#0a2a6b]" />
                  July 2026
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
                  <Clock size={15} className="text-[#0a2a6b]" />
                  5 min read
                </span>
              </div>

              <h1 className="font-display mt-5 max-w-4xl text-4xl leading-tight text-[#0a2a6b] sm:text-6xl">
                Why Specialist Healthcare Matters for Better Outcomes
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Specialist-led care helps patients move from uncertainty to clear clinical decisions through expert review,
                coordinated diagnostics, and focused treatment planning.
              </p>
            </div>

            <aside className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_18px_50px_rgba(19,27,34,0.06)]">
              <h2 className="font-display text-2xl text-[#0a2a6b]">Key Takeaways</h2>
              <ul className="mt-5 space-y-4">
                {takeaways.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-[#1f8f4e]" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-[minmax(0,1.45fr)_minmax(180px,0.55fr)] sm:items-stretch">
            <div className="relative h-[330px] overflow-hidden rounded-[30px] shadow-[0_25px_70px_rgba(10,42,107,0.18)] sm:h-[500px]">
              <Image src={labImg} alt="Modern diagnostic laboratory at Police Hospital" fill priority sizes="(max-width: 640px) 100vw, 70vw" className="object-cover object-center transition duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05123a]/65 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#0a2a6b]">Clinical focus</span>
            </div>
            <div className="relative hidden min-h-[220px] overflow-hidden rounded-[30px] bg-[#0a2a6b] sm:block">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(245,179,1,0.95)_0%,rgba(245,179,1,0.2)_42%,transparent_43%)]" />
              <div className="absolute bottom-6 left-5 right-5"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">Specialist care</p><p className="font-display mt-2 text-3xl leading-tight text-white">Expertise that moves care forward.</p></div>
            </div>
          </div>
        </section>

        <section className="section-shell pb-14 sm:pb-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,760px)_minmax(280px,1fr)] lg:items-start">
            <div className="px-1 py-2 sm:px-0">
              <p className="text-[17px] leading-8 text-slate-600">
                When people think about healthcare, they often think first about access: seeing a doctor, getting a test,
                or receiving medicine. Access matters. But for many patients, the difference between temporary relief and
                lasting improvement is the quality of specialist input behind each decision.
              </p>

              <div className="mt-8 space-y-9">
                {sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="font-display text-3xl leading-tight text-[#0a2a6b]">{section.title}</h2>
                    <p className="mt-3 text-[15px] leading-8 text-slate-600">{section.body}</p>
                  </section>
                ))}
              </div>

              <div className="mt-9 rounded-[24px] bg-[#eef2fb] p-6">
                <h2 className="font-display text-3xl text-[#0a2a6b]">What This Means for Patients</h2>
                <p className="mt-3 text-[15px] leading-8 text-slate-600">
                  At Police College Hospital Ikeja, specialist healthcare is not only about advanced knowledge. It is about
                  bringing the right professionals, technology, and follow-up together so each patient receives care that is
                  thoughtful, timely, and coordinated.
                </p>
              </div>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[26px] bg-white shadow-[0_18px_50px_rgba(19,27,34,0.08)]">
                <div className="relative h-64">
                  <Image src={doctorImg} alt="Specialist doctor at Police Hospital" fill sizes="360px" className="object-cover object-top" />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl text-[#0a2a6b]">Need Specialist Guidance?</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    Speak with our patient advisors about consultations, referrals, diagnostics, and follow-up care.
                  </p>
                  <Link
                    href="/#consult"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f5b301] px-5 py-2.5 text-sm font-semibold text-[#071a45]"
                  >
                    Book a consultation <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 rounded-[24px] border border-slate-100 bg-white p-5 text-sm text-slate-600">
                {[
                  { icon: Stethoscope, label: "Specialist consultations" },
                  { icon: FirstAid, label: "Coordinated diagnostics" },
                  { icon: Heartbeat, label: "Follow-up care planning" }
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a2a6b]/10 text-[#0a2a6b]">
                      <Icon size={20} weight="fill" />
                    </span>
                    <span className="font-semibold">{label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}
