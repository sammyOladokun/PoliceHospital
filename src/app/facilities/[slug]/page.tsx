import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Ambulance,
  ArrowRight,
  CalendarCheck,
  CaretDown,
  CheckCircle,
  Clock,
  FirstAid,
  List,
  Phone,
  Check,
  ShieldCheck
} from "@phosphor-icons/react/dist/ssr";

import brandLogo from "../../../../assets/brand_logo.png";
import ambulanceImg from "../../../../assets/ambulance.jpeg";
import dentalImg from "../../../../assets/dental.jpeg";
import eyeImg from "../../../../assets/lab.jpeg";
import labImg from "../../../../assets/area.jpeg";
import mammographyImg from "../../../../assets/lab-subject.jpeg";
import optometryImg from "../../../../assets/lab-2.jpeg";
import pharmacyImg from "../../../../assets/pharmacy.jpeg";
import physioImg from "../../../../assets/lab-3.jpeg";
import surgeryImg from "../../../../assets/s.jpeg";
import ultrasoundImg from "../../../../assets/office.jpeg";
import xrayImg from "../../../../assets/lab-subject-2.jpeg";

type Facility = {
  title: string;
  tag: string;
  description: string;
  image: StaticImageData;
  intro: string;
  services: string[];
  preparation: string;
};

const facilities: Record<string, Facility> = {
  "emergency-ambulance": {
    title: "Emergency & Ambulance",
    tag: "Emergency",
    description: "Rapid emergency assessment, stabilisation, and ambulance coordination for urgent illness, injury, and trauma, supported by a clinical team prepared to help patients access the right level of care quickly.",
    image: ambulanceImg,
    intro: "Our emergency team is equipped to assess and support urgent medical needs quickly, with ambulance coordination available when immediate transport is required.",
    services: ["Urgent medical assessment", "Emergency stabilisation and referral", "Ambulance response coordination"],
    preparation: "For a medical emergency, call the hospital immediately or come directly to the emergency unit. Bring any available medical records and current medication details."
  },
  "operating-theatres": {
    title: "Operating Theatres",
    tag: "Surgery",
    description: "Fully equipped operating theatres supporting planned and urgent procedures across multiple specialties, with coordinated preparation, perioperative monitoring, recovery support, and follow-up planning.",
    image: surgeryImg,
    intro: "Our operating theatres support planned and urgent procedures with careful preparation, trained clinical teams, and coordinated recovery planning.",
    services: ["Pre-operative clinical review", "Specialist surgical procedures", "Post-operative monitoring and follow-up"],
    preparation: "Your clinical team will explain any required tests, fasting instructions, consent process, and arrival time before a procedure."
  },
  "dental-clinic": {
    title: "Dental Clinic",
    tag: "Dental",
    description: "Comprehensive oral healthcare for preventive check-ups, dental pain, restorative treatment, oral health guidance, and specialist treatment or referral when a more complex procedure is required.",
    image: dentalImg,
    intro: "The Dental Clinic provides practical, patient-focused oral health care, from preventive visits to treatment for dental pain and more complex needs.",
    services: ["Routine dental examinations", "Oral health advice and preventive care", "Treatment planning and referrals"],
    preparation: "Please tell the dental team about any pain, allergies, current medicines, or previous dental treatment when you arrive."
  },
  pharmacy: {
    title: "Pharmacy",
    tag: "Pharmacy",
    description: "A patient-focused pharmacy service that dispenses prescribed medicines, provides practical guidance on safe use, and supports patients with questions about dosage, interactions, and ongoing treatment.",
    image: pharmacyImg,
    intro: "Our pharmacy team supports safe medicine use by dispensing prescribed treatment and helping patients understand how to take it correctly.",
    services: ["Prescription dispensing", "Medicine use guidance", "Medication availability support"],
    preparation: "Bring your current prescription and let the pharmacist know about allergies, other medicines, or concerns about your treatment."
  },
  "medical-laboratory": {
    title: "Medical Laboratory",
    tag: "Diagnostics",
    description: "Modern laboratory services providing reliable diagnostic testing for clinical investigations, routine monitoring, chronic disease management, and treatment decisions, with results reviewed alongside each patient's wider clinical picture.",
    image: labImg,
    intro: "Our medical laboratory provides diagnostic testing that helps clinicians investigate symptoms, monitor treatment, and make informed care decisions.",
    services: ["Routine laboratory investigations", "Monitoring for chronic conditions", "Clinician-requested diagnostic testing"],
    preparation: "Some tests require specific preparation, such as fasting. Confirm instructions with your clinician or the laboratory team before your visit."
  },
  "ultrasound-antenatal": {
    title: "Ultrasound & Antenatal",
    tag: "Imaging",
    description: "Ultrasound imaging and antenatal support for pregnancy monitoring, maternal wellbeing, and women's health, helping patients and clinicians follow important changes and plan appropriate next steps.",
    image: ultrasoundImg,
    intro: "This department combines ultrasound imaging with antenatal support to help women and families make informed decisions throughout pregnancy and beyond.",
    services: ["Obstetric ultrasound imaging", "Antenatal assessment and support", "Women's health imaging referrals"],
    preparation: "Your appointment instructions may include guidance on eating, drinking water, or bringing prior scan reports. Please check before attending."
  },
  "eye-clinic": {
    title: "Eye Clinic",
    tag: "Ophthalmology",
    description: "Specialist eye care for vision concerns, comprehensive examinations, eye health assessment, condition monitoring, and treatment guidance, with referral support when additional ophthalmic care is needed.",
    image: eyeImg,
    intro: "The Eye Clinic offers specialist assessments for vision concerns and eye health, with clear guidance on treatment, monitoring, and referral where needed.",
    services: ["Comprehensive eye examinations", "Vision and eye health assessment", "Eye condition monitoring and referral"],
    preparation: "Bring your current glasses, any previous eye records, and a list of medicines you use to help the team assess you fully."
  },
  "optometry-suite": {
    title: "Optometry Suite",
    tag: "Optometry",
    description: "Detailed optometry assessments supported by specialist equipment for vision checks, prescription review, eye health screening, and early identification of concerns that may require further clinical review.",
    image: optometryImg,
    intro: "Our Optometry Suite uses detailed vision assessment to support everyday eye care, prescription needs, and early identification of concerns that need further review.",
    services: ["Vision assessment", "Prescription review", "Eye health screening and referral"],
    preparation: "Bring your existing glasses or contact-lens information, along with any previous prescription details, to your appointment."
  },
  physiotherapy: {
    title: "Physiotherapy",
    tag: "Rehabilitation",
    description: "Personalised physiotherapy and rehabilitation to help patients recover movement, strength, balance, and everyday function after injury, surgery, illness, or changes in mobility.",
    image: physioImg,
    intro: "Our physiotherapy team helps patients improve movement, strength, and confidence after injury, surgery, illness, or changes in mobility.",
    services: ["Mobility and function assessment", "Individual rehabilitation plans", "Exercise guidance and recovery monitoring"],
    preparation: "Wear comfortable clothing that allows movement, and bring any referral notes, scan reports, or relevant medical records with you."
  },
  mammography: {
    title: "Mammography",
    tag: "Screening",
    description: "Breast imaging services that support preventive screening, investigation of breast concerns, early identification of changes, and coordinated follow-up with the appropriate clinical team.",
    image: mammographyImg,
    intro: "Mammography supports breast health assessment and screening, helping clinicians investigate concerns and plan appropriate next steps with patients.",
    services: ["Breast imaging assessment", "Preventive screening support", "Clinical follow-up and referral coordination"],
    preparation: "The imaging team will provide appointment-specific instructions. Let them know about previous breast imaging or any current concerns before the examination."
  },
  "radiology-xray": {
    title: "Radiology & X-ray",
    tag: "Radiology",
    description: "Digital X-ray and medical imaging for assessing injuries, symptoms, and internal conditions, giving clinicians clearer evidence to support safer diagnosis, treatment planning, and follow-up care.",
    image: xrayImg,
    intro: "Our Radiology and X-ray service provides digital imaging that helps clinicians assess injuries, symptoms, and medical conditions with greater clarity.",
    services: ["Digital X-ray imaging", "Clinician-requested diagnostic imaging", "Imaging result coordination and follow-up"],
    preparation: "Bring your imaging request form and let the radiology team know if you are pregnant or have any relevant prior imaging."
  }
};

export function generateStaticParams() {
  return Object.keys(facilities).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facility = facilities[slug];

  return facility
    ? { title: `${facility.title} | Police Hospital`, description: facility.description }
    : { title: "Facility Not Found | Police Hospital" };
}

export default async function FacilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facility = facilities[slug];

  if (!facility) notFound();

  const relatedFacilities = Object.entries(facilities)
    .filter(([facilitySlug]) => facilitySlug !== slug)
    .slice(0, 3);

  const facilityLinks = Object.entries(facilities).map(([facilitySlug, item]) => ({
    slug: facilitySlug,
    title: item.title
  }));

  return (
    <main className="scroll-theme-facility relative min-h-screen bg-[#f3f5fb] text-slate-800">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 bg-transparent text-white">
        <div className="section-shell flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image src={brandLogo} alt="Police Hospital brand" className="h-11 w-11 object-contain sm:h-16 sm:w-16" />
            <div>
              <p className="font-display text-xl leading-none tracking-tight text-white sm:text-2xl">Police Hospital</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/60 sm:text-[11px] sm:tracking-[0.28em]">Police College, Ikeja</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            <Link href="/" className="text-xs font-bold uppercase tracking-[0.12em] text-white/80 transition hover:text-white">Home</Link>
            <Link href="/#blog" className="text-xs font-bold uppercase tracking-[0.12em] text-white/80 transition hover:text-white">Blog</Link>
            <Link href="/blog" className="text-xs font-bold uppercase tracking-[0.12em] text-white/80 transition hover:text-white">Blog</Link>
            <div className="group relative">
              <button type="button" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition">
                All Facilities <CaretDown size={14} weight="bold" className="transition group-hover:rotate-180" />
              </button>
              <div className="invisible absolute right-0 top-full z-50 w-72 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                <div className="facility-scroll max-h-[min(70vh,520px)] overflow-y-auto rounded-2xl border border-white/15 bg-[#071a45]/95 p-2 shadow-[0_20px_50px_rgba(5,18,58,0.35)] backdrop-blur-xl">
                  <Link href="/#facilities" className="mb-1 flex items-center rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[#f8ca45] transition hover:bg-white/10">View all facilities</Link>
                  {facilityLinks.map((item) => (
                    <Link key={item.slug} href={`/facilities/${item.slug}`} className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-white/10 ${item.slug === slug ? "bg-white/10 text-white" : "text-white/75"}`}>
                      <span>{item.title}</span>
                      {item.slug === slug ? <Check size={16} weight="bold" className="shrink-0 text-[#f8ca45]" /> : null}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/#consult" className="rounded-full border border-[#f5b301] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#f5b301] transition hover:bg-[#f5b301]/10 hover:text-[#ffd35a]">Book consultation</Link>
          </nav>
          <details className="relative md:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center text-[#f5b301] transition hover:text-white [&::-webkit-details-marker]:hidden">
              <List size={22} weight="bold" aria-hidden="true" />
              <span className="sr-only">Open navigation menu</span>
            </summary>
            <div className="absolute right-0 top-full z-50 mt-3 w-[min(320px,88vw)] rounded-2xl border border-white/15 bg-[#071a45]/95 p-3 shadow-[0_20px_50px_rgba(5,18,58,0.35)] backdrop-blur-xl">
              <div className="grid gap-1">
                <Link href="/" className="rounded-xl px-3 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white">Home</Link>
                <Link href="/#blog" className="rounded-xl px-3 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white">Blog</Link>
                <Link href="/blog" className="rounded-xl px-3 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white">Blog</Link>
                <div className="my-1 border-t border-white/15 pt-2"><p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f8ca45]">All Facilities</p>
                  {facilityLinks.map((item) => (
                    <Link key={item.slug} href={`/facilities/${item.slug}`} className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-white/10 ${item.slug === slug ? "bg-white/10 text-white" : "text-white/75"}`}>
                      <span>{item.title}</span>{item.slug === slug ? <Check size={16} weight="bold" className="shrink-0 text-[#f8ca45]" /> : null}
                    </Link>
                  ))}
                </div>
                <Link href="/#consult" className="mt-1 rounded-xl border border-[#f5b301] px-3 py-3 text-center text-sm font-semibold text-[#f5b301] transition hover:bg-[#f5b301]/10">Book consultation</Link>
              </div>
            </div>
          </details>
        </div>
      </header>

      <article>
        <section className="relative isolate min-h-[540px] overflow-hidden bg-[#071a45] pt-20 text-white sm:min-h-[620px] sm:pt-20">
          <Image src={facility.image} alt={facility.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#05123a]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05123a]/95 via-[#05123a]/75 to-[#05123a]/20" />
          <div className="section-shell relative flex min-h-[540px] flex-col justify-start py-8 sm:min-h-[620px] sm:py-12">
            <div className="max-w-3xl pt-10 sm:pt-14">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f8ca45]">| {facility.tag}</span>
              <h1 className="font-display mt-5 text-5xl leading-[0.93] sm:text-7xl">{facility.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">{facility.description}</p>
              <div className="mt-8 flex flex-nowrap items-center gap-4">
                <a href="tel:+234000000000" className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-300/70 px-3 py-3 text-xs font-semibold text-white/95 transition hover:border-white hover:text-white sm:gap-2 sm:px-4 sm:text-sm"><Phone size={16} /><span className="sm:hidden">Contact hospital</span><span className="hidden sm:inline">Contact the hospital</span></a>
                <Link href="/#consult" className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#f5b301] px-4 py-3 text-xs font-bold text-[#071a45] transition hover:bg-[#ffd35a] sm:gap-2 sm:px-5 sm:text-sm"><span className="sm:hidden">Request appointment</span><span className="hidden sm:inline">Request an appointment</span> <ArrowRight size={16} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="section-shell grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { icon: CalendarCheck, label: "Appointments", detail: "Guided booking and referrals" },
              { icon: facility.tag === "Emergency" ? Ambulance : FirstAid, label: "Clinical support", detail: "Professional care coordination" },
              { icon: ShieldCheck, label: "Patient first", detail: "Safe, respectful care" }
            ].map(({ icon: Icon, label, detail }) => (
              <div key={label} className="flex items-center gap-4 py-5 sm:px-7 sm:py-6 first:sm:pl-0 last:sm:pr-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e7edfb] text-[#0a2a6b]"><Icon size={22} weight="fill" /></span>
                <div><p className="text-sm font-bold text-[#0a2a6b]">{label}</p><p className="mt-0.5 text-xs leading-5 text-slate-500">{detail}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1f8f4e]">Department Overview</span>
              <h2 className="font-display mt-3 max-w-2xl text-4xl leading-tight text-[#0a2a6b] sm:text-5xl">Care designed around your next step.</h2>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-slate-600">{facility.intro}</p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {facility.services.map((service) => (
                  <div key={service} className="flex gap-3 border-t border-slate-200 py-4 text-sm font-semibold leading-6 text-slate-700">
                    <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-[#1f8f4e]" />{service}
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-l-4 border-[#f5b301] bg-white p-6 shadow-[0_18px_50px_rgba(19,27,34,0.07)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0a2a6b] text-white"><Clock size={22} weight="fill" /></div>
              <h2 className="font-display mt-5 text-3xl text-[#0a2a6b]">Before your visit</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{facility.preparation}</p>
              <Link href="/#consult" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0a2a6b]">Speak to a patient advisor <ArrowRight size={15} /></Link>
            </aside>
          </div>
        </section>

        <section className="bg-[#071a45] py-14 text-white sm:py-20">
          <div className="section-shell">
            <div className="max-w-2xl"><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#f8ca45]">Your Care Journey</span><h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">Clear support from first contact to follow-up.</h2></div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                { number: "01", title: "Talk to us", text: "Our team helps you understand the right service, referral, or appointment path." },
                { number: "02", title: "Receive care", text: "Your clinical team reviews your needs and guides each stage of your care." },
                { number: "03", title: "Plan next steps", text: "You leave with clear advice, results guidance, and follow-up where needed." }
              ].map((step) => (
                <div key={step.number} className="border-t border-white/20 pt-5"><p className="text-sm font-bold text-[#f8ca45]">{step.number}</p><h3 className="font-display mt-4 text-3xl">{step.title}</h3><p className="mt-3 text-sm leading-7 text-white/70">{step.text}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-14 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1f8f4e]">Explore More</span><h2 className="font-display mt-3 text-4xl text-[#0a2a6b]">Related facilities</h2></div><Link href="/#facilities" className="inline-flex items-center gap-2 text-sm font-bold text-[#0a2a6b]">View all facilities <ArrowRight size={15} /></Link></div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedFacilities.map(([relatedSlug, related]) => (
              <Link key={relatedSlug} href={`/facilities/${relatedSlug}`} className="group relative min-h-72 overflow-hidden bg-[#071a45]">
                <Image src={related.image} alt={related.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05123a]/95 via-[#05123a]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white"><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f8ca45]">{related.tag}</span><h3 className="font-display mt-2 text-3xl leading-tight">{related.title}</h3><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">Explore facility <ArrowRight size={15} /></span></div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
