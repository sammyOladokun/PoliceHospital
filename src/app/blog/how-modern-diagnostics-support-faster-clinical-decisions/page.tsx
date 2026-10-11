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
  Scan
} from "@phosphor-icons/react/dist/ssr";

import brandLogo from "../../../../assets/brand_logo.png";
import xrayImg from "../../../../assets/lab-subject-2.jpeg";
import labImg from "../../../../assets/area.jpeg";

export const metadata: Metadata = {
  title: "How Modern Diagnostics Support Faster Clinical Decisions | Police Hospital",
  description:
    "Learn how laboratory testing and medical imaging support timely, accurate clinical decisions at Police College Hospital Ikeja."
};

const takeaways = [
  "Reliable test results give clinicians clearer information for diagnosis and treatment.",
  "Laboratory services and imaging complement clinical examinations and patient history.",
  "Timely diagnostics help teams act with greater confidence and coordinate care efficiently."
];

const sections = [
  {
    title: "Diagnostics Give Care Teams a Clearer Picture",
    body:
      "A consultation begins with listening, examination, and clinical expertise. Diagnostic services build on that foundation by providing measurable information about what is happening inside the body. Blood tests, imaging, and other investigations can help confirm a suspected condition, rule out alternatives, or track changes over time."
  },
  {
    title: "Laboratory Results Support Timely Treatment",
    body:
      "Laboratory testing is central to many clinical decisions. Results can guide the selection of medicines, identify infections, monitor chronic conditions, and show how a patient is responding to treatment. When tests are requested appropriately and reviewed in context, they help clinicians make treatment plans that are safer and more precise."
  },
  {
    title: "Imaging Helps Clinicians See What an Examination Cannot",
    body:
      "Digital X-ray, ultrasound, and other imaging services provide another essential view of a patient's health. They can support the assessment of injuries, pregnancy, internal organs, and many other conditions. Imaging does not replace clinical judgment; it gives the care team valuable evidence to combine with the patient's symptoms, history, and examination."
  },
  {
    title: "Shared Information Improves the Next Decision",
    body:
      "The value of diagnostics is greatest when information moves smoothly between the laboratory, imaging unit, consulting room, pharmacy, and care team. Clear results and coordinated review reduce avoidable repetition, support appropriate referrals, and make follow-up conversations more useful for patients."
  }
];

export default function ModernDiagnosticsArticlePage() {
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
                How Modern Diagnostics Support Faster Clinical Decisions
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Laboratory services and medical imaging give clinical teams the timely, reliable information they need to make more accurate decisions for every patient.
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

          <div className="relative mt-10 h-[390px] overflow-hidden rounded-[30px] shadow-[0_25px_70px_rgba(10,42,107,0.18)] sm:h-[560px]">
            <Image src={xrayImg} alt="Radiology professional reviewing diagnostic imaging" fill priority sizes="100vw" className="object-cover object-[center_38%] transition duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#05123a]/70 via-transparent to-transparent" />
            <div className="absolute left-5 top-5 max-w-[190px] border-l-2 border-[#f5b301] pl-4 sm:left-8 sm:top-8 sm:max-w-xs"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f8ca45]">Inside diagnostics</p><p className="font-display mt-2 text-2xl leading-tight text-white sm:text-3xl">Clearer information. Faster decisions.</p></div>
          </div>
        </section>

        <section className="section-shell pb-14 sm:pb-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,760px)_minmax(280px,1fr)] lg:items-start">
            <div className="px-1 py-2 sm:px-0">
              <p className="text-[17px] leading-8 text-slate-600">
                Faster clinical decisions do not mean rushed decisions. They mean that the right information is available at the right time, so clinicians can assess a patient's needs with confidence. Modern diagnostics play a vital role in making that possible.
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
                  At Police College Hospital Ikeja, modern diagnostics support a connected care experience. By bringing clinical expertise together with reliable laboratory and imaging services, we help patients move from questions to informed next steps with less uncertainty.
                </p>
              </div>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[26px] bg-white shadow-[0_18px_50px_rgba(19,27,34,0.08)]">
                <div className="relative h-64">
                  <Image src={labImg} alt="Modern diagnostic laboratory at Police Hospital" fill sizes="360px" className="object-cover" />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl text-[#0a2a6b]">Need a Diagnostic Test?</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    Speak with our patient advisors about consultations, laboratory services, imaging, and next steps for your care.
                  </p>
                  <Link href="/#consult" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f5b301] px-5 py-2.5 text-sm font-semibold text-[#071a45]">
                    Book a consultation <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 rounded-[24px] border border-slate-100 bg-white p-5 text-sm text-slate-600">
                {[
                  { icon: Scan, label: "Digital imaging services" },
                  { icon: FirstAid, label: "Reliable laboratory testing" },
                  { icon: Heartbeat, label: "Coordinated care planning" }
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
