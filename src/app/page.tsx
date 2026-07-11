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
  CheckCircle,
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
  Record,
  Brain,
  Dna,
  Syringe,
  Lightning,
  ShieldCheck,
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

const specialties = [
  { label: "Oncology", icon: CheckCircle },
  { label: "Endocrinology", icon: Record },
  { label: "Infertility", icon: Heartbeat },
  { label: "Mental Health", icon: Brain },
  { label: "Cardiology", icon: Heartbeat },
  { label: "Neurology", icon: Lightning },
  { label: "Rheumatology", icon: ShieldCheck },
  { label: "Plastic Surgery", icon: FirstAid },
  { label: "Rare Diseases", icon: Dna },
  { label: "Surgery", icon: Syringe }
];

const doctors = [
  {
    name: "Dr. Wade Warren",
    role: "Chief Consultant",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Dr. Cameron Williamson",
    role: "Internal Medicine",
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Dr. Guy Hawkins",
    role: "Family Physician",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Dr. Leslie Alexander",
    role: "Surgery Lead",
    image:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=900&q=80"
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

function CardImage({
  image,
  name,
  role
}: {
  image: string;
  name: string;
  role: string;
}) {
  return (
    <div className="overflow-hidden rounded-[26px] bg-slate-200">
      <div
        className="h-[250px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(18,24,29,0.12), rgba(18,24,29,0.02)), url(${image})`
        }}
      />
      <div className="border-t border-white/80 bg-white px-4 py-3 text-center">
        <p className="text-sm font-semibold text-slate-800">{name}</p>
        <p className="text-xs text-slate-500">{role}</p>
      </div>
    </div>
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
        <div className="overflow-hidden rounded-[36px] bg-[#1f2732] text-white shadow-[0_30px_80px_rgba(24,30,39,0.16)]">
          <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12">
            <div>
              <h2 className="font-display max-w-md text-3xl leading-tight sm:text-4xl">
                Teleconsult Our Patient Advisors
              </h2>
              <button className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1f2732]">
                Book a Call
              </button>
            </div>

            <div className="relative h-[220px]">
              <div className="absolute left-10 top-10 rounded-full bg-white/20 p-5 text-white">
                <Phone size={32} weight="fill" />
              </div>
              <div
                className="absolute right-0 top-0 h-full w-[78%] rounded-[32px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(31,39,50,0.05), rgba(31,39,50,0.05)), url(https://images.unsplash.com/photo-1594824804732-d1a6ba93d94b?auto=format&fit=crop&w=1000&q=80)"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-24">
        <div>
          <div className="mx-auto max-w-4xl text-center">
            <SectionTitle
              title="Our Services"
              subtitle="Comprehensive Specialist Healthcare You Can Trust"
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
        <SectionTitle title="Explore Treatments across specialities" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {specialties.map((specialty) => {
            const Icon = specialty.icon;
            return (
              <div key={specialty.label} className="soft-card flex flex-col items-center gap-3 px-4 py-5 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-slate-500">
                  <Icon size={20} />
                </div>
                <p className="text-sm font-semibold text-slate-700">{specialty.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white/60 py-16 sm:py-24">
        <div className="section-shell">
          <SectionTitle title="World's Top Doctors" centered />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {doctors.map((doctor) => (
              <CardImage key={doctor.name} {...doctor} />
            ))}
          </div>
        </div>
      </section>

      <section id="consult" className="section-shell py-16 sm:py-24">
        <div className="overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#f0ece4_0%,#fbfaf7_55%,#ece7dc_100%)] shadow-[0_20px_60px_rgba(35,43,50,0.09)]">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="p-8 sm:p-10">
              <h2 className="font-display text-4xl text-[#2d5e55]">Book A Free Consultation</h2>
              <form className="mt-8 grid gap-4 sm:grid-cols-2">
                {["First Name", "Last Name", "Email ID", "Mobile Number"].map((field) => (
                  <input
                    key={field}
                    placeholder={field}
                    className="rounded-full border-0 bg-white px-5 py-4 text-sm outline-none ring-1 ring-black/5 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2d5e55]/35"
                  />
                ))}
                <div className="sm:col-span-2">
                  <button className="flex w-full items-center justify-between rounded-full bg-white px-5 py-4 text-left text-sm text-slate-400 ring-1 ring-black/5">
                    <span>Country</span>
                    <CaretDown size={16} />
                  </button>
                </div>
                <textarea
                  placeholder="Message"
                  className="min-h-28 rounded-[22px] border-0 bg-white px-5 py-4 text-sm outline-none ring-1 ring-black/5 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2d5e55]/35 sm:col-span-2"
                />
                <div className="sm:col-span-2">
                  <button className="rounded-full bg-[#1f2732] px-7 py-3 text-sm font-semibold text-white">
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <div className="relative min-h-[420px]">
              <div
                className="absolute inset-y-0 right-0 w-full bg-cover bg-right-bottom"
                style={{
                  backgroundImage:
                    "linear-gradient(to left, rgba(242,239,232,0.05), rgba(242,239,232,0.05)), url(https://images.unsplash.com/photo-1594824475317-8b5c6d9f0a10?auto=format&fit=crop&w=1000&q=80)"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#2d5e55] py-14 text-white">
        <div className="section-shell">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <FirstAid size={22} weight="fill" />
                </div>
                <div>
                  <p className="font-display text-2xl leading-none">Police Hospital</p>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">Healthcare platform</p>
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
            © 2026 Police Hospital Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
