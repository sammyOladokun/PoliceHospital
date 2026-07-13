"use client";

import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type PointerEvent as ReactPointerEvent
} from "react";
import Image from "next/image";
import brandLogo from "../../assets/brand_logo.png";
import heroImage from "../../assets/hero_image.png";
import {
  ChatCenteredDots,
  FacebookLogo,
  FirstAid,
  Heartbeat,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
  Scan,
  List,
  Hospital,
  Syringe,
  MagnifyingGlass,
  Stethoscope,
  Ambulance,
  DesktopTower,
  FileText,
  UsersFour,
  Eyeglasses,
  YoutubeLogo,
  X,
  CaretDown
} from "@phosphor-icons/react/dist/ssr";

const navLinks = ["Second Opinion", "Medical Tourism", "Client's Talk", "Membership Card", "Testimonials", "Login"];

const keyFeatures = [
  {
    title: "Advanced Diagnostics",
    description: "Digital X-ray, ultrasound, and modern laboratory systems that support faster, more accurate diagnosis.",
    icon: Scan
  },
  {
    title: "Operating Theatres",
    description: "Fully equipped theatres designed to support safe procedures and a wide range of surgical care.",
    icon: Hospital
  },
  {
    title: "Specialist Clinics",
    description:
      "Outpatient clinics across cardiology, orthopaedics, paediatrics, obstetrics and gynaecology, ophthalmology, ENT, and family medicine.",
    icon: Stethoscope
  },
  {
    title: "Critical & Emergency Care",
    description: "ICU, NICU, emergency and trauma centres, and high-dependency units for urgent and intensive care.",
    icon: Ambulance
  },
  {
    title: "Digital Health Systems",
    description: "EMR, telemedicine, digital imaging, and an integrated hospital information management system.",
    icon: DesktopTower
  },
  {
    title: "Expert Multidisciplinary Care",
    description:
      "Consultants, nurses, pharmacists, laboratory scientists, physiotherapists, radiographers, and allied health teams working with inpatient wards, private suites, infection prevention, quality assurance, research, continuous medical education, and international standards.",
    icon: UsersFour
  }
];

const aboutPanels = [
  {
    title: "Our Vision",
    body: "To be a centre of excellence in specialist healthcare delivery, recognized for outstanding clinical services, innovation, professionalism, and patient satisfaction."
  },
  {
    title: "Our Mission",
    body: "To provide accessible, high-quality, and compassionate specialist healthcare through skilled professionals, advanced medical technology, continuous improvement, and a patient-first approach."
  },
  {
    title: "Our Core Values",
    items: ["Excellence", "Compassion", "Professionalism", "Integrity", "Innovation", "Teamwork", "Patient-Centred Care"]
  },
  {
    title: "Our Specialist Services",
    items: [
      "Family Medicine",
      "Internal Medicine",
      "General Surgery",
      "Obstetrics and Gynaecology",
      "Paediatrics",
      "Orthopaedics",
      "ENT",
      "Ophthalmology",
      "Dental Services",
      "Mental Health Services",
      "Emergency and Trauma Care",
      "Antenatal, Delivery and Postnatal Care",
      "Child Welfare and Immunization",
      "Diagnostic Laboratory Services",
      "Medical Imaging and Radiology",
      "Pharmacy Services",
      "Physiotherapy and Rehabilitation",
      "NHIA/HMO Services",
      "Preventive Health and Wellness Clinics"
    ]
  }
];

const faqItems = [
  {
    question: "Why should I choose Police College Hospital Ikeja?",
    answer:
      "We combine specialist healthcare expertise, compassionate service, modern diagnostics, and a patient-centred approach to deliver safe, timely, and high-quality care."
  },
  {
    question: "What makes your specialist care different?",
    answer:
      "Our consultants, specialist physicians, nurses, pharmacists, laboratory scientists, and other professionals work together to provide expert diagnosis, treatment, and follow-up across multiple specialties."
  },
  {
    question: "How do you keep care patient-centred?",
    answer:
      "We listen carefully, involve patients in care decisions, and tailor each treatment plan to the individual with dignity, respect, and compassion."
  },
  {
    question: "What diagnostic services support treatment?",
    answer:
      "We use reliable laboratory services and medical imaging to support accurate diagnosis, effective treatment, and safer clinical decisions."
  },
  {
    question: "Can I access multiple healthcare services in one place?",
    answer:
      "Yes. We provide preventive care, specialist consultations, emergency treatment, surgery, pharmacy services, laboratory services, and rehabilitation under one roof."
  },
  {
    question: "How do you protect patient safety?",
    answer:
      "Patient safety is central to our care through strong clinical governance, infection prevention and control, quality assurance, and continuous service improvement."
  },
  {
    question: "Do you accept NHIA and HMO patients?",
    answer:
      "Yes. We are accredited under NHIA and work with accredited HMOs to support insured patients with authorization and claims processes."
  },
  {
    question: "Where is the hospital located?",
    answer:
      "We are located within Police College, GRA Ikeja, Lagos, and serve police personnel, their families, and the general public."
  },
  {
    question: "What should I expect from your team?",
    answer:
      "You can expect professional, ethical, compassionate care from a multidisciplinary team committed to continuous improvement and medical excellence."
  },
  {
    question: "What is your promise to patients?",
    answer:
      "Our promise is expert specialist medical care, compassionate treatment, modern diagnostic support, a safe and clean environment, and dedicated professionals focused on your well-being."
  }
];

const blogPosts = [
  {
    title: "Why Specialist Healthcare Matters for Better Outcomes",
    date: "July 2026",
    summary:
      "Learn how specialist-led care improves diagnosis, treatment planning, and long-term patient outcomes across complex medical conditions.",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "How Modern Diagnostics Support Faster Clinical Decisions",
    date: "July 2026",
    summary:
      "See how laboratory services and medical imaging help clinicians deliver safer, more accurate, and more efficient care.",
    image:
      "https://images.unsplash.com/photo-1580281657527-47f249e8f8a8?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "What Patient-Centred Care Looks Like in Practice",
    date: "July 2026",
    summary:
      "A look at how compassion, communication, and shared decision-making shape the patient experience at Police College Hospital Ikeja.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80"
  }
];

const serviceTiles = [
  {
    title: "Family Medicine",
    short: "Primary care for all ages",
    summary:
      "First-contact care with routine check-ups, common illness treatment, chronic disease management, health education, and specialist referrals when needed.",
    details: [
      "Routine consultations and preventive care",
      "Management of chronic conditions",
      "Health education and referral coordination"
    ]
  },
  {
    title: "Internal Medicine",
    short: "Adult medical conditions",
    summary:
      "Diagnosis and treatment of hypertension, diabetes, asthma, heart disease, kidney disorders, infectious diseases, and other complex adult conditions.",
    details: [
      "Complex adult medical assessment",
      "Long-term disease management",
      "Specialist-led internal medicine reviews"
    ]
  },
  {
    title: "General Surgery",
    short: "Surgical consultations and care",
    summary:
      "Expert surgical consultation and operative care with safe procedures, effective treatment, and quality post-operative follow-up.",
    details: ["Pre-operative assessment", "Safe operative procedures", "Post-operative recovery support"]
  },
  {
    title: "Obstetrics & Gynaecology",
    short: "Women’s health services",
    summary:
      "Antenatal, delivery, postnatal, family planning, fertility, gynaecological consultations, and cervical cancer screening services.",
    details: [
      "Antenatal and safe delivery services",
      "Postnatal and fertility support",
      "Family planning and cervical screening"
    ]
  },
  {
    title: "Paediatrics",
    short: "Healthcare for children",
    summary:
      "Care for newborns, infants, children, and adolescents, including routine treatment, growth monitoring, immunization, and nutrition counselling.",
    details: [
      "Growth and development monitoring",
      "Childhood immunization",
      "Acute, chronic, and nutritional care"
    ]
  },
  {
    title: "Orthopaedics",
    short: "Bone and joint care",
    summary:
      "Diagnosis and treatment of conditions affecting bones, joints, muscles, ligaments, and the spine to restore mobility and function.",
    details: ["Musculoskeletal diagnosis", "Mobility restoration", "Joint, bone, and spine treatment"]
  },
  {
    title: "ENT & Eye Care",
    short: "Specialist sensory care",
    summary:
      "Specialist evaluation and treatment for ear, nose, throat, head and neck conditions, along with comprehensive vision care and eye disease management.",
    details: [
      "ENT evaluation and treatment",
      "Vision screening and eye examinations",
      "Diagnosis and treatment of eye diseases"
    ]
  },
  {
    title: "Support Services",
    short: "Diagnostics and care support",
    summary:
      "Medical laboratory, radiology and imaging, pharmacy, physiotherapy, emergency response, preventive health screening, mental health support, dental services, and NHIA/HMO guidance.",
    details: [
      "Laboratory, imaging, pharmacy, and physiotherapy",
      "Emergency and critical care response",
      "Preventive services and NHIA/HMO support"
    ]
  }
];

const footerLinks = ["Privacy Policy", "Terms & Conditions", "License", "Resources", "Downloads"];

type ServiceTileData = (typeof serviceTiles)[number];
type Placement = "top" | "bottom" | "left" | "right";

type PopoverState = {
  service: ServiceTileData;
  top: number;
  left: number;
  placement: Placement;
};

function SectionTitle({
  title,
  subtitle,
  centered = false
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="font-display text-3xl leading-tight text-[#2d5e55] sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

function BlogCard({
  image,
  title,
  date,
  summary
}: {
  image: string;
  title: string;
  date: string;
  summary: string;
}) {
  return (
    <article className="overflow-hidden rounded-[26px] bg-white shadow-[0_18px_50px_rgba(19,27,34,0.08)]">
      <div
        className="h-[220px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(18,24,29,0.18), rgba(18,24,29,0.02)), url(${image})`
        }}
      />
      <div className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2d5e55]">{date}</p>
        <h3 className="font-display text-2xl leading-tight text-slate-800">{title}</h3>
        <p className="text-sm leading-7 text-slate-500">{summary}</p>
      </div>
    </article>
  );
}

function FaqItem({
  question,
  answer
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_18px_50px_rgba(19,27,34,0.06)] group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-display text-xl text-slate-800">
        <span>{question}</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2d5e55]/10 text-[#2d5e55] transition group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-4 text-sm leading-7 text-slate-500">{answer}</p>
    </details>
  );
}

function ServiceTile({
  service,
  active,
  onClick,
  onPointerEnter,
  onPointerLeave,
  buttonRef
}: {
  service: ServiceTileData;
  active: boolean;
  onClick: () => void;
  onPointerEnter: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  onPointerLeave: () => void;
  buttonRef: (element: HTMLButtonElement | null) => void;
}) {
  const iconByTitle: Record<string, ComponentType<{ size?: number; className?: string }>> = {
    "Family Medicine": FirstAid,
    "Internal Medicine": Stethoscope,
    "General Surgery": Hospital,
    "Obstetrics & Gynaecology": Heartbeat,
    Paediatrics: UsersFour,
    Orthopaedics: Syringe,
    "ENT & Eye Care": Eyeglasses,
    "Support Services": DesktopTower
  };

  const Icon = iconByTitle[service.title] ?? FileText;

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      aria-expanded={active}
      className="group relative flex h-28 flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <Icon size={22} className="text-[#2d5e55]" />
      <p className="mt-2 text-xs font-semibold leading-tight text-slate-700">{service.title}</p>
      <p className="mt-1 text-[10px] leading-tight text-slate-500">{service.short}</p>
    </button>
  );
}

function NavLink({ children }: { children: string }) {
  return (
    <span className="text-sm font-medium text-white/80 transition hover:text-white">{children}</span>
  );
}

export default function HomePage() {
  const [popover, setPopover] = useState<PopoverState | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tileRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const closePopover = useCallback(() => {
    clearCloseTimer();
    setPopover(null);
  }, [clearCloseTimer]);

  const openPopover = useCallback((service: ServiceTileData, element: HTMLButtonElement) => {
    if (typeof window === "undefined") return;

    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const gap = 16;
    const popoverWidth = Math.min(320, viewportWidth - 24);
    const popoverHeight = 260;

    const spaces = {
      right: viewportWidth - rect.right,
      left: rect.left,
      bottom: viewportHeight - rect.bottom,
      top: rect.top
    };

    let placement: Placement = "bottom";
    if (spaces.right >= popoverWidth + gap && spaces.right >= spaces.left) {
      placement = "right";
    } else if (spaces.left >= popoverWidth + gap) {
      placement = "left";
    } else if (spaces.bottom >= popoverHeight + gap || spaces.bottom >= spaces.top) {
      placement = "bottom";
    } else {
      placement = "top";
    }

    const clamp = (value: number, minimum: number, maximum: number) =>
      Math.max(minimum, Math.min(value, maximum));

    let top = rect.top + rect.height / 2;
    let left = rect.left + rect.width / 2;

    if (placement === "right") {
      left = rect.right + gap;
      top = clamp(rect.top + rect.height / 2, 24, viewportHeight - 24);
    } else if (placement === "left") {
      left = rect.left - gap;
      top = clamp(rect.top + rect.height / 2, 24, viewportHeight - 24);
    } else if (placement === "bottom") {
      top = rect.bottom + gap;
      left = clamp(rect.left + rect.width / 2, popoverWidth / 2 + 12, viewportWidth - popoverWidth / 2 - 12);
    } else {
      top = rect.top - gap;
      left = clamp(rect.left + rect.width / 2, popoverWidth / 2 + 12, viewportWidth - popoverWidth / 2 - 12);
    }

    setPopover({ service, top, left, placement });
  }, []);

  useEffect(() => {
    const handleWindowChange = () => closePopover();
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!target) return;

      const withinTile = tileRefs.current.some((element) => element?.contains(target));
      const withinPopover = popoverRef.current?.contains(target) ?? false;
      if (!withinTile && !withinPopover) {
        closePopover();
      }
    };

    window.addEventListener("resize", handleWindowChange);
    window.addEventListener("scroll", handleWindowChange, true);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("resize", handleWindowChange);
      window.removeEventListener("scroll", handleWindowChange, true);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [closePopover]);

  const popoverPortal =
    typeof document !== "undefined" && popover
      ? createPortal(
          <div
            ref={popoverRef}
            className="fixed z-[999] w-[min(320px,88vw)] rounded-[22px] bg-[#1f2732] p-4 text-left text-white shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
            style={{
              left: popover.left,
              top: popover.top,
              transform:
                popover.placement === "right"
                  ? "translateY(-50%)"
                  : popover.placement === "left"
                    ? "translate(-100%, -50%)"
                    : popover.placement === "bottom"
                      ? "translate(-50%, 0)"
                      : "translate(-50%, -100%)"
            }}
            onPointerEnter={clearCloseTimer}
            onPointerLeave={closePopover}
          >
            <p className="font-display text-xl">{popover.service.title}</p>
            <p className="mt-2 text-sm leading-6 text-white/75">{popover.service.summary}</p>
            <ul className="mt-3 space-y-2 text-left text-sm text-white/80">
              {popover.service.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8fd3bf]" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )
      : null;

  return (
    <main className="overflow-hidden bg-[var(--background)]">
      <section className="bg-[#2d5e55] text-white">
        <div className="section-shell">
          <header className="relative flex items-center justify-between py-5 sm:py-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src={brandLogo}
                alt="Police Hospital brand"
                className="h-11 w-11 object-contain sm:h-16 sm:w-16"
                priority
              />
              <div>
                <p className="font-display text-xl leading-none tracking-tight sm:text-2xl">Police Hospital</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/60 sm:text-[11px] sm:tracking-[0.28em]">
                  Police College, Ikeja
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </nav>

            <div className="hidden lg:block">
              <a
                href="#consult"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5"
                style={{ color: "#1f2732" }}
              >
                Book Now
              </a>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 lg:hidden"
              style={{ color: "#1f2732" }}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen((value) => !value)}
            >
              <List size={18} />
              Menu
            </button>

            {mobileMenuOpen ? (
              <div
                id="mobile-menu"
                className="absolute right-0 top-full z-20 mt-3 w-[min(280px,88vw)] rounded-[24px] border border-white/15 bg-[#1f2732] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.25)] lg:hidden"
              >
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <span
                      key={link}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                    >
                      {link}
                    </span>
                  ))}
                  <a
                    href="#consult"
                    className="mt-2 rounded-full bg-white px-4 py-3 text-center text-sm font-semibold"
                    style={{ color: "#1f2732" }}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ) : null}
          </header>

          <div className="mx-auto max-w-4xl pb-12 pt-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60 max-sm:hidden">
              Trusted Partner in Specialist Healthcare
            </p>
            <h1 className="font-display mx-auto mt-5 max-w-3xl text-3xl leading-[1.1] sm:text-5xl sm:leading-[1.05] lg:text-6xl">
              A Leading Specialist Healthcare Institution 
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Committed to delivering exceptional, patient-centered medical services through clinical excellence, innovation, and compassion
            </p>

            <div className="mx-auto mt-8 flex max-w-2xl flex-row items-stretch gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-white/10 px-4 py-3 text-left text-sm text-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:px-5">
                <MagnifyingGlass size={18} />
                <span className="truncate">Search disease, department</span>
              </div>
              <button className="shrink-0 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#2d5e55] shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 sm:px-6">
                Search
              </button>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl pb-20 pt-2">
            <div className="relative mx-auto h-[420px] max-w-4xl">
              <Image src={heroImage} alt="Hero feature" fill className="object-contain object-center" priority />
              <div className="absolute left-5 top-5 rounded-2xl bg-white/90 px-4 py-3 shadow-lg">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2d5e55]">
                  Comprehensive Diagnosis
                </p>
              </div>

              <div className="absolute bottom-7 right-7 rounded-full bg-[#262d39] px-6 py-4 text-center text-white shadow-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">Quality Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <SectionTitle
            title="Police Hospital Key Features"
            subtitle="Police College Hospital Ikeja is an Ultramodern Specialist Hospital and a state-of-the-art healthcare facility designed to provide highly specialized medical services for all Police officers,their families and the general public"
          />
          <div className="space-y-4 text-sm leading-7 text-slate-500">
            <p>
              using modern technology, infrastructure, and a multidisciplinary team of healthcare professionals. It offers comprehensive diagnosis, treatment, surgery, rehabilitation, and preventive care across multiple medical specialties while prioritizing patient safety, comfort, and quality of care.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {keyFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="flex flex-col items-center text-center">
                <Icon size={32} className="mx-auto text-[#2d5e55]" />
                <h3 className="mt-5 font-display text-2xl text-slate-800">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-24">
        <div className="mx-auto w-full max-w-[590px] overflow-hidden rounded-[36px] bg-[#1f2732] text-white shadow-[0_30px_80px_rgba(24,30,39,0.16)]">
          <div className="relative flex items-start justify-between gap-4 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="max-w-[220px] sm:max-w-md">
              <h2 className="font-display max-w-md text-3xl leading-tight sm:text-4xl">
                Teleconsult Our Patient Advisors
              </h2>
            </div>

            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
              <div className="relative rounded-full bg-white/20 p-4 text-white sm:p-5">
                <Phone size={32} weight="fill" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-24">
        <div>
          <div className="mx-auto max-w-4xl text-center">
            <SectionTitle
              title="Our Services"
              centered
            />
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-500">
              <p>
                At Police College Hospital Ikeja, we are committed to providing high-quality, patient-centred
                healthcare through a broad range of specialist and general medical services. Our experienced
                healthcare professionals work collaboratively to deliver timely, safe, and evidence-based care using
                modern medical practices and advanced diagnostic support.
              </p>
              <p>
                Whether you require preventive care, specialist consultation, emergency treatment, or long-term
                management of a medical condition, we are dedicated to meeting your healthcare needs with
                professionalism, compassion, and excellence.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {serviceTiles.map((service, index) => (
              <ServiceTile
                key={service.title}
                service={service}
                active={popover?.service.title === service.title}
                buttonRef={(element) => {
                  tileRefs.current[index] = element;
                }}
                onClick={() => {
                  const element = tileRefs.current[index];
                  if (!element) return;

                  if (popover?.service.title === service.title) {
                    closePopover();
                  } else {
                    openPopover(service, element);
                  }
                }}
                onPointerEnter={(event) => {
                  if (event.pointerType === "touch") return;
                  clearCloseTimer();
                  const element = tileRefs.current[index];
                  if (!element) return;
                  openPopover(service, element);
                }}
                onPointerLeave={() => {
                  clearCloseTimer();
                  closeTimer.current = window.setTimeout(() => {
                    setPopover((current) =>
                      current && current.service.title === service.title ? null : current
                    );
                  }, 120);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {popoverPortal}

      <section className="bg-[#1f2732] py-16 text-white sm:py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl sm:text-5xl">Who We Are</h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              A specialist hospital built on clinical excellence, compassion, innovation, and a deep commitment to
              patient-centred care.
            </p>
          </div>

          <div className="mt-12 grid gap-10">
            {aboutPanels.map((panel) => (
              <div key={panel.title} className="space-y-4">
                <h3 className="font-display text-3xl text-white">{panel.title}</h3>
                {"body" in panel ? (
                  <p className="mt-4 text-sm leading-7 text-white/75">{panel.body}</p>
                ) : (
                  <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-white/80 lg:grid-cols-3">
                    {panel.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8fd3bf]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <SectionTitle
            title="Frequently Asked Questions"
            centered
          />
        </div>

        <div className="mt-12 grid gap-4">
          {faqItems.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>

      <section className="bg-white/60 py-16 sm:py-24">
        <div className="section-shell">
          <SectionTitle title="Latest from the Blog" subtitle="Insights, updates, and patient education from our team" centered />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.title} {...post} />
            ))}
          </div>
        </div>
      </section>

      <section id="consult" className="section-shell py-12 sm:py-20">
        <div className="overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#f0ece4_0%,#fbfaf7_55%,#ece7dc_100%)] shadow-[0_20px_60px_rgba(35,43,50,0.09)]">
          <div className="px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            <div className="p-6 sm:p-8 lg:p-9">
              <h2 className="font-display text-3xl text-[#2d5e55] sm:text-4xl">Book A Free Consultation</h2>
              <form className="mt-6 grid gap-3 sm:grid-cols-2">
                {["First Name", "Last Name", "Email", "Mobile Number"].map((field) => (
                  <input
                    key={field}
                    placeholder={field}
                    className="rounded-full border-0 bg-white px-5 py-3 text-sm outline-none ring-1 ring-black/5 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2d5e55]/35"
                  />
                ))}
                <textarea
                  placeholder="Message"
                  className="min-h-24 rounded-[22px] border-0 bg-white px-5 py-3 text-sm outline-none ring-1 ring-black/5 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2d5e55]/35 sm:col-span-2"
                />
                <div className="sm:col-span-2">
                  <button className="rounded-full bg-[#1f2732] px-6 py-3 text-sm font-semibold text-white">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#2d5e55] py-14 text-white">
        <div className="section-shell">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <Image src={brandLogo} alt="Police Hospital brand" className="h-12 w-12 object-contain" />
                <div>
                  <p className="font-display text-2xl leading-none">Police Hospital</p>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">Police College, Ikeja</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/72">
                Built to support patient care, staff workflows, and leadership visibility across the full hospital
                experience.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">About</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/75">
                  <li>How it works</li>
                  <li>Patient care</li>
                  <li>Staff access</li>
                  <li>Support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Contact</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/75">
                  <li className="flex items-center gap-2">
                    <MapPin size={16} /> Police Hospital, Nigeria
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={16} /> +234 000 000 0000
                  </li>
                  <li className="flex items-center gap-2">
                    <ChatCenteredDots size={16} /> help@policehospital.ng
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Legal</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/75">
                  {footerLinks.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Follow</h3>
                <div className="mt-4 flex gap-3">
                  {[FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo, X].map((Icon, index) => (
                    <div key={index} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <Icon size={18} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/15 pt-5 text-sm text-white/55">
            © 2026 Police Hospital. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
