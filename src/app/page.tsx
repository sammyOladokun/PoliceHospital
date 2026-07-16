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
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import brandLogo from "../../assets/brand_logo.png";
import buildingImg from "../../assets/building.jpeg";
import staffGroupImg from "../../assets/hero.jpeg";
import surgeryImg from "../../assets/s.jpeg";
import nurseImg from "../../assets/s2.jpeg";
import doctorImg from "../../assets/support.jpeg";
import ambulanceImg from "../../assets/ambulance.jpeg";
import dentalImg from "../../assets/dental.jpeg";
import pharmacyImg from "../../assets/pharmacy.jpeg";
import labImg from "../../assets/area.jpeg";
import ultrasoundImg from "../../assets/office.jpeg";
import eyeImg from "../../assets/lab.jpeg";
import optometryImg from "../../assets/lab-2.jpeg";
import physioImg from "../../assets/lab-3.jpeg";
import mammographyImg from "../../assets/lab-subject.jpeg";
import xrayImg from "../../assets/lab-subject-2.jpeg";
import lineArt1 from "../../assets/1.png";
import lineArt2 from "../../assets/2.png";
import teamIllustration from "../../assets/3.png";

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
  ArrowRight,
  Check,
  CaretDown,
  UserCircle,
  IdentificationCard
} from "@phosphor-icons/react/dist/ssr";

const navLinks = ["Second Opinion", "Medical Tourism", "Client's Talk", "Membership Card", "Testimonials", "Login"];

const stats = [
  { target: 18, suffix: "+", label: "Specialist Services" },
  { target: 24, suffix: "/7", label: "Emergency Care" },
  { target: 50, suffix: "+", label: "Care Professionals" },
  { target: 1000, suffix: "+", label: "Patients Served" }
];

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
      "Consultants, nurses, pharmacists, laboratory scientists, physiotherapists, radiographers, and allied health teams working to international standards.",
    icon: UsersFour
  }
];

const facilities = [
  {
    title: "Emergency & Ambulance",
    tag: "Emergency",
    description: "Rapid emergency response with ambulance services ready to deliver life-saving care around the clock.",
    image: ambulanceImg
  },
  {
    title: "Operating Theatres",
    tag: "Surgery",
    description: "Fully equipped theatres supporting safe surgical procedures across multiple specialties.",
    image: surgeryImg
  },
  {
    title: "Dental Clinic",
    tag: "Dental",
    description: "Comprehensive dental care, from routine check-ups to specialist treatment and oral surgery.",
    image: dentalImg
  },
  {
    title: "Pharmacy",
    tag: "Pharmacy",
    description: "A well-stocked pharmacy dispensing quality, affordable medication with professional guidance.",
    image: pharmacyImg
  },
  {
    title: "Medical Laboratory",
    tag: "Diagnostics",
    description: "Modern laboratory systems delivering fast, reliable, and accurate diagnostic testing.",
    image: labImg
  },
  {
    title: "Ultrasound & Antenatal",
    tag: "Imaging",
    description: "Ultrasound imaging and antenatal support for safe pregnancy and women's health.",
    image: ultrasoundImg
  },
  {
    title: "Eye Clinic",
    tag: "Ophthalmology",
    description: "Specialist vision care, comprehensive eye examinations, and eye disease management.",
    image: eyeImg
  },
  {
    title: "Optometry Suite",
    tag: "Optometry",
    description: "Advanced eye-diagnostic equipment for precise, detailed vision assessment.",
    image: optometryImg
  },
  {
    title: "Physiotherapy",
    tag: "Rehabilitation",
    description: "Physiotherapy and rehabilitation to restore mobility, strength, and everyday function.",
    image: physioImg
  },
  {
    title: "Mammography",
    tag: "Screening",
    description: "Breast imaging that supports early detection and preventive women's health screening.",
    image: mammographyImg
  },
  {
    title: "Radiology & X-ray",
    tag: "Radiology",
    description: "Digital X-ray and medical imaging that support safer, more accurate clinical decisions.",
    image: xrayImg
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
    image: labImg
  },
  {
    title: "How Modern Diagnostics Support Faster Clinical Decisions",
    date: "July 2026",
    summary:
      "See how laboratory services and medical imaging help clinicians deliver safer, more accurate, and more efficient care.",
    image: xrayImg
  },
  {
    title: "What Patient-Centred Care Looks Like in Practice",
    date: "July 2026",
    summary:
      "A look at how compassion, communication, and shared decision-making shape the patient experience at Police College Hospital Ikeja.",
    image: dentalImg
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
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto flex max-w-2xl flex-col items-center text-center" : ""}>
      {eyebrow ? (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] ${
            light ? "bg-white/10 text-white/80" : "bg-[#0a2a6b]/10 text-[#0a2a6b]"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-[#f5b301]" : "bg-[#0a2a6b]"}`} />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`font-display mt-3 text-2xl leading-tight sm:mt-4 sm:text-4xl ${light ? "text-white" : "text-[#0a2a6b]"}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-3 max-w-2xl text-[13px] leading-6 sm:text-sm sm:leading-7 ${light ? "text-white/65" : "text-slate-500"}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}

function BlogCard({
  image,
  title,
  date,
  summary
}: {
  image: (typeof blogPosts)[number]["image"];
  title: string;
  date: string;
  summary: string;
}) {
  return (
    <article className="photo-card group overflow-hidden rounded-[26px] bg-white shadow-[0_18px_50px_rgba(19,27,34,0.08)]">
      <div className="relative h-[180px] overflow-hidden sm:h-[220px]">
        <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05123a]/55 via-[#05123a]/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0a2a6b] sm:text-[11px]">
          {date}
        </span>
      </div>
      <div className="space-y-2.5 p-5 sm:space-y-3">
        <h3 className="font-display text-xl leading-tight text-slate-800 sm:text-2xl">{title}</h3>
        <p className="text-[13px] leading-6 text-slate-500 sm:text-sm sm:leading-7">{summary}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a2a6b]">
          Read article <ArrowRight size={15} />
        </span>
      </div>
    </article>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="reveal group rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_18px_50px_rgba(19,27,34,0.06)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-display text-xl text-slate-800">
        <span>{question}</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a2a6b]/10 text-[#0a2a6b] transition group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-4 text-sm leading-7 text-slate-500">{answer}</p>
    </details>
  );
}

function FacilityCard({ facility }: { facility: (typeof facilities)[number] }) {
  return (
    <article className="photo-card group relative overflow-hidden rounded-[22px] shadow-[0_20px_55px_rgba(19,27,34,0.12)] sm:rounded-[26px]">
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[300px]">
        <Image
          src={facility.image}
          alt={facility.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        {/* reduced-opacity dark overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05123a]/92 via-[#05123a]/45 to-[#05123a]/10 transition-opacity duration-500 group-hover:from-[#0a2a6b]/92 group-hover:via-[#0a2a6b]/40" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:px-3 sm:text-[10px] sm:tracking-[0.2em]">
          {facility.tag}
        </span>
        <h3 className="font-display mt-2 text-lg leading-tight text-white sm:mt-3 sm:text-2xl">{facility.title}</h3>
        {/* visible on mobile (no hover); reveal-on-hover from sm up */}
        <p className="mt-1.5 text-[12px] leading-5 text-white/85 sm:mt-2 sm:max-h-0 sm:overflow-hidden sm:text-sm sm:leading-6 sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:max-h-32 sm:group-hover:opacity-100">
          {facility.description}
        </p>
      </div>
    </article>
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
      className={`group relative flex h-28 flex-col items-center justify-center rounded-2xl border px-2.5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:h-32 sm:px-3 ${
        active ? "border-[#0a2a6b] bg-[#0a2a6b] text-white" : "border-slate-100 bg-white"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition sm:h-11 sm:w-11 ${
          active ? "bg-white/15" : "bg-[#0a2a6b]/10 group-hover:bg-[#0a2a6b]/15"
        }`}
      >
        <Icon size={20} className={`shrink-0 ${active ? "text-white" : "text-[#0a2a6b]"}`} />
      </span>
      <p className={`mt-2 text-[11px] font-semibold leading-tight sm:mt-2.5 sm:text-xs ${active ? "text-white" : "text-slate-700"}`}>
        {service.title}
      </p>
      <p className={`mt-1 text-[9px] leading-tight sm:text-[10px] ${active ? "text-white/75" : "text-slate-500"}`}>
        {service.short}
      </p>
    </button>
  );
}

function NavLink({ children }: { children: string }) {
  return <span className="cursor-pointer text-sm font-medium text-white/80 transition hover:text-white">{children}</span>;
}

export default function HomePage() {
  const [popover, setPopover] = useState<PopoverState | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tileRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  // ---- GSAP animations ----
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero entrance timeline
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-fade", { y: 32, opacity: 0, duration: 0.85, stagger: 0.12, delay: 0.15 })
        .from(".hero-float", { y: 40, opacity: 0, duration: 0.8, stagger: 0.15 }, "-=0.5");

      // Hero background parallax
      gsap.to(".hero-bg", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
      });

      // Generic reveal-on-scroll
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          startAt: { y: 44 }
        });
      });

      // Staggered groups (cards / grids)
      gsap.utils.toArray<HTMLElement>(".reveal-group").forEach((group) => {
        gsap.to(group.children, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 84%" },
          startAt: { y: 46 }
        });
      });

      // Count-up stats
      gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
        const target = Number(el.dataset.target ?? 0);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = Math.floor(counter.value).toLocaleString();
          }
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

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

    const clamp = (value: number, minimum: number, maximum: number) => Math.max(minimum, Math.min(value, maximum));

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
            className="fixed z-[999] w-[min(320px,88vw)] rounded-[22px] bg-[#071a45] p-4 text-left text-white shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
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
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5b301]" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )
      : null;

  return (
    <main ref={rootRef} className="overflow-hidden bg-[var(--background)]">
      {/* ================= HERO ================= */}
      <section className="hero-section relative isolate overflow-hidden text-white">
        {/* background photo + reduced-opacity overlay */}
        <div className="absolute inset-0 -z-10">
          <Image src={buildingImg} alt="Police Hospital, Police College Ikeja" fill priority sizes="100vw" className="hero-bg scale-110 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d2f7a]/95 via-[#0a2a6b]/90 to-[#05123a]/95" />
          {/* faint line-art watermark (low opacity) */}
          <Image src={lineArt1} alt="" aria-hidden className="watermark absolute -right-16 top-24 w-[520px] max-w-[70%] opacity-[0.06]" />
        </div>

        <div className="section-shell">
          <header className="relative flex items-center justify-between py-5 sm:py-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image src={brandLogo} alt="Police Hospital brand" className="h-11 w-11 object-contain sm:h-16 sm:w-16" priority />
              <div>
                <p className="font-display text-xl leading-none tracking-tight sm:text-2xl">Police Hospital</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/60 sm:text-[11px] sm:tracking-[0.28em]">
                  Police College, Ikeja
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks
                .filter((link) => link !== "Login")
                .map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}

              {/* Login dropdown */}
              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-white/80 transition hover:text-white"
                >
                  Login <CaretDown size={12} weight="bold" className="transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute right-0 top-full z-30 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="w-52 rounded-2xl bg-white p-2 shadow-[0_20px_50px_rgba(5,18,58,0.22)]">
                    <Link
                      href="/login/patient"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#0a2a6b] transition hover:bg-slate-50"
                    >
                      <UserCircle size={20} weight="fill" className="text-[#0a2a6b]" /> Patient Login
                    </Link>
                    <Link
                      href="/login/staff"
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#0a2a6b] transition hover:bg-slate-50"
                    >
                      <IdentificationCard size={20} weight="fill" className="text-[#1f8f4e]" /> Staff Login
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            <div className="hidden lg:block">
              <a
                href="#consult"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5"
                style={{ color: "#071a45" }}
              >
                Book Now
              </a>
            </div>

            <button
              type="button"
              className="relative z-30 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 lg:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen((value) => !value)}
            >
              <span className="flex h-4 w-6 flex-col justify-between">
                <span
                  className={`h-[2.5px] w-full origin-center rounded-full bg-[#f5b301] transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? "translate-y-[6.75px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-[2.5px] w-full rounded-full bg-[#f5b301] transition-all duration-200 ease-in-out ${
                    mobileMenuOpen ? "scale-x-0 opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-[2.5px] w-full origin-center rounded-full bg-[#f5b301] transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? "-translate-y-[6.75px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>

            {mobileMenuOpen ? (
              <div
                id="mobile-menu"
                className="absolute right-0 top-full z-20 mt-3 w-[min(280px,88vw)] rounded-[24px] border border-white/15 bg-[#071a45] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.25)] lg:hidden"
              >
                <div className="flex flex-col gap-2">
                  {navLinks
                    .filter((link) => link !== "Login")
                    .map((link) => (
                      <span
                        key={link}
                        className="rounded-2xl px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                      >
                        {link}
                      </span>
                    ))}

                  <div className="my-1 h-px bg-white/10" />
                  <Link
                    href="/login/patient"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                  >
                    <UserCircle size={20} weight="fill" className="text-[#f5b301]" /> Patient Login
                  </Link>
                  <Link
                    href="/login/staff"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                  >
                    <IdentificationCard size={20} weight="fill" className="text-[#f5b301]" /> Staff Login
                  </Link>

                  <a href="#consult" className="mt-2 rounded-full bg-white px-4 py-3 text-center text-sm font-semibold" style={{ color: "#071a45" }}>
                    Book Now
                  </a>
                </div>
              </div>
            ) : null}
          </header>

          <div className="grid items-center gap-10 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-12">
            <div className="max-w-2xl">
              <p className="hero-fade inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5b301]" />
                Trusted Partner in Specialist Healthcare
              </p>
              <h1 className="hero-fade font-display mt-4 text-3xl leading-[1.1] sm:mt-5 sm:text-5xl sm:leading-[1.05] lg:text-6xl">
                A Leading Specialist Healthcare Institution
              </h1>
              <p className="hero-fade mt-4 max-w-xl text-[13px] leading-6 text-white/75 sm:mt-5 sm:text-base sm:leading-7">
                Committed to delivering exceptional, patient-centered medical services through clinical excellence,
                innovation, and compassion — for police personnel, their families, and the general public.
              </p>

              <div className="hero-fade mt-8 flex max-w-xl flex-row items-stretch gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-white/12 px-4 py-3 text-left text-sm text-white/75 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:px-5">
                  <MagnifyingGlass size={18} />
                  <span className="truncate">Search disease, department</span>
                </div>
                <button className="shrink-0 rounded-full bg-[#f5b301] px-5 py-3 text-sm font-semibold text-[#071a45] shadow-[0_20px_60px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-[#ffc21f] sm:px-6">
                  Search
                </button>
              </div>

              <div className="hero-fade mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-white/75 sm:mt-8 sm:gap-x-6 sm:gap-y-3 sm:text-sm">
                <span className="flex items-center gap-2"><Ambulance size={16} weight="fill" className="shrink-0 text-[#f5b301]" /> 24/7 Emergency</span>
                <span className="flex items-center gap-2"><Stethoscope size={16} weight="fill" className="shrink-0 text-[#f5b301]" /> Specialist Consultants</span>
                <span className="flex items-center gap-2"><Heartbeat size={16} weight="fill" className="shrink-0 text-[#f5b301]" /> NHIA / HMO Accredited</span>
              </div>
            </div>

            {/* Hero collage using real portraits */}
            <div className="relative mx-auto hidden h-[440px] w-full max-w-md lg:block">
              <div className="hero-float absolute right-0 top-0 h-[300px] w-[220px] overflow-hidden rounded-[28px] border border-white/15 shadow-2xl">
                <Image src={doctorImg} alt="Hospital doctor" fill sizes="220px" className="object-cover" />
              </div>
              <div className="hero-float absolute bottom-0 left-0 h-[260px] w-[200px] overflow-hidden rounded-[28px] border border-white/15 shadow-2xl">
                <Image src={nurseImg} alt="Hospital nurse" fill sizes="200px" className="object-cover" />
              </div>
              <div className="hero-float absolute bottom-8 right-2 rounded-2xl bg-white px-5 py-4 text-[#071a45] shadow-xl">
                <p className="font-display text-3xl leading-none text-[#0a2a6b]">100%</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Patient-First Care</p>
              </div>
              <div className="hero-float absolute left-3 top-6 rounded-2xl bg-[#071a45] px-4 py-3 shadow-xl">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">Comprehensive</p>
                <p className="text-sm font-semibold">Diagnosis & Care</p>
              </div>
            </div>
          </div>
        </div>

        {/* stat bar */}
        <div className="relative border-t border-white/10 bg-[#05123a]/50 backdrop-blur-sm">
          <div className="section-shell reveal-group grid grid-cols-2 gap-6 py-8 sm:py-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="font-display text-3xl text-white sm:text-5xl">
                  <span className="count" data-target={stat.target}>0</span>
                  {stat.suffix}
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/60 sm:text-xs sm:tracking-[0.14em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= KEY FEATURES ================= */}
      <section className="relative overflow-hidden">
        {/* faint line-art watermark (reduced opacity) */}
        <Image src={teamIllustration} alt="" aria-hidden className="watermark pointer-events-none absolute -left-24 top-10 w-[420px] opacity-[0.05]" />
        <div className="section-shell py-12 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <SectionTitle
              eyebrow="Why Choose Us"
              title="Police Hospital Key Features"
              subtitle="An ultramodern specialist hospital and state-of-the-art healthcare facility providing highly specialized medical services for all police officers, their families, and the general public."
            />
            <div className="space-y-4 text-sm leading-7 text-slate-500">
              <p>
                Using modern technology, infrastructure, and a multidisciplinary team of healthcare professionals, we
                offer comprehensive diagnosis, treatment, surgery, rehabilitation, and preventive care across multiple
                specialties — prioritizing patient safety, comfort, and quality of care.
              </p>
            </div>
          </div>

          <div className="reveal-group mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {keyFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_18px_45px_rgba(19,27,34,0.06)] transition hover:-translate-y-1.5 hover:shadow-[0_28px_65px_rgba(19,27,34,0.1)] sm:rounded-[24px] sm:p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0a2a6b]/10 transition group-hover:bg-[#0a2a6b] sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Icon size={24} className="shrink-0 text-[#0a2a6b] transition group-hover:text-white sm:hidden" />
                    <Icon size={28} className="hidden shrink-0 text-[#0a2a6b] transition group-hover:text-white sm:block" />
                  </span>
                  <h3 className="mt-4 font-display text-xl text-slate-800 sm:mt-5 sm:text-2xl">{feature.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-slate-500 sm:mt-3 sm:text-sm sm:leading-7">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FACILITIES GALLERY ================= */}
      <section className="bg-[#eef2fb]">
        <div className="section-shell py-12 sm:py-24">
          <SectionTitle
            eyebrow="Our Facilities"
            title="Modern Departments & Diagnostic Suites"
            subtitle="From emergency response to advanced imaging, explore the departments that make comprehensive, one-stop specialist care possible."
            centered
          />
          <div className="reveal-group mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <FacilityCard key={facility.title} facility={facility} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= TELECONSULT CTA ================= */}
      <section className="section-shell py-12 sm:py-24">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0a2a6b] via-[#071a45] to-[#05123a] text-white shadow-[0_30px_80px_rgba(5,18,58,0.35)]">
          {/* gold accent strip + line-art watermark */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#f5b301] via-[#f5b301]/70 to-[#1f8f4e]" />
          <Image src={lineArt2} alt="" aria-hidden className="watermark pointer-events-none absolute right-0 top-0 h-full w-auto opacity-[0.06]" />

          <div className="grid items-center gap-10 p-6 sm:gap-12 sm:p-12 lg:grid-cols-2 lg:gap-8">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f5b301]/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f5b301] sm:px-4 sm:text-[11px] sm:tracking-[0.22em]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5b301]" /> Telemedicine
              </span>
              <h2 className="font-display mt-3 max-w-md text-2xl leading-tight sm:mt-4 sm:text-4xl">
                Teleconsult Our Patient Advisors
              </h2>
              <p className="mt-3 max-w-md text-[13px] leading-6 text-white/70 sm:mt-4 sm:text-sm sm:leading-7">
                Speak with our specialist advisors from anywhere. Get guidance on symptoms, referrals, appointments, and
                follow-up care — quickly and confidentially.
              </p>

              <ul className="mt-5 grid max-w-md gap-2.5 text-[13px] text-white/85 sm:mt-6 sm:gap-3 sm:text-sm">
                {["Same-day virtual consultations", "Specialist referrals & second opinions", "Confidential, secure sessions"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f8f4e]/20 text-[#4ade80]">
                        <Check size={13} weight="bold" className="shrink-0" />
                      </span>
                      {item}
                    </li>
                  )
                )}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#consult"
                  className="inline-flex items-center gap-2 rounded-full bg-[#f5b301] px-6 py-3 text-sm font-semibold text-[#071a45] shadow-[0_12px_30px_rgba(245,179,1,0.3)] transition hover:-translate-y-0.5 hover:bg-[#ffc21f]"
                >
                  <Phone size={18} weight="fill" /> Start a consult
                </a>
                <a
                  href="#consult"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <ChatCenteredDots size={18} /> Chat with us
                </a>
              </div>

              <p className="mt-5 flex items-center gap-2 text-sm text-white/60">
                <Phone size={15} weight="fill" className="text-[#f5b301]" /> Hotline: +234 000 000 0000
              </p>
            </div>

            {/* framed portrait composition (white-bg cutouts on a light panel) */}
            <div className="reveal relative mx-auto mt-2 w-[85%] max-w-[300px] sm:mt-0 sm:w-full sm:max-w-[340px]">
              <div className="absolute -inset-3 rounded-[34px] bg-[#f5b301]/20 blur-2xl sm:-inset-4 sm:rounded-[38px]" />
              <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-b from-white to-[#eef2fb] p-1.5 shadow-2xl sm:rounded-[30px] sm:p-2">
                <div className="relative h-[300px] w-full overflow-hidden rounded-[22px] sm:h-[360px] sm:rounded-[24px]">
                  <Image src={doctorImg} alt="Specialist doctor" fill sizes="(max-width: 640px) 300px, 340px" className="object-cover object-top" />
                </div>
              </div>

              {/* floating nurse thumbnail */}
              <div className="absolute -bottom-4 -left-3 h-20 w-16 overflow-hidden rounded-xl border-4 border-[#071a45] bg-white shadow-xl sm:-bottom-6 sm:-left-6 sm:h-28 sm:w-24 sm:rounded-2xl">
                <Image src={nurseImg} alt="Patient advisor" fill sizes="(max-width: 640px) 64px, 96px" className="object-cover object-top" />
              </div>

              {/* green availability chip */}
              <div className="absolute right-1 top-3 flex items-center gap-1.5 rounded-full bg-[#1f8f4e] px-3 py-1.5 text-[10px] font-semibold shadow-lg sm:-right-3 sm:top-6 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Available 24/7
              </div>

              {/* navy call badge */}
              <div className="absolute -right-1 bottom-6 flex items-center gap-2 rounded-xl bg-[#071a45] px-3 py-2 shadow-xl ring-1 ring-white/10 sm:-right-4 sm:bottom-8 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5b301] text-[#071a45] sm:h-9 sm:w-9">
                  <Phone size={16} weight="fill" className="shrink-0" />
                </span>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.14em] text-white/50 sm:text-[10px] sm:tracking-[0.16em]">Call now</p>
                  <p className="text-[13px] font-semibold sm:text-sm">Talk to a doctor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR SERVICES (interactive tiles) ================= */}
      <section className="section-shell pb-12 sm:pb-24">
        <SectionTitle
          eyebrow="Our Services"
          title="Specialist & General Medical Services"
          subtitle="Committed to high-quality, patient-centred healthcare — whether you need preventive care, specialist consultation, emergency treatment, or long-term management. Hover or tap a service to learn more."
          centered
        />

        <div className="reveal-group mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
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
                  setPopover((current) => (current && current.service.title === service.title ? null : current));
                }, 120);
              }}
            />
          ))}
        </div>
      </section>

      {popoverPortal}

      {/* ================= WHO WE ARE ================= */}
      <section className="relative overflow-hidden bg-[#071a45] py-12 text-white sm:py-24">
        <Image src={lineArt1} alt="" aria-hidden className="watermark pointer-events-none absolute -left-20 bottom-0 w-[460px] opacity-[0.05]" />
        <div className="section-shell">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* image collage */}
            <div className="reveal relative">
              <div className="relative h-[300px] overflow-hidden rounded-[28px] shadow-2xl sm:h-[380px]">
                <Image src={staffGroupImg} alt="Police Hospital care team" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071a45]/60 to-transparent" />
              </div>
              <div className="absolute -bottom-8 -right-4 hidden h-[190px] w-[240px] overflow-hidden rounded-[24px] border-4 border-[#071a45] shadow-2xl sm:block">
                <Image src={buildingImg} alt="Police Hospital building" fill sizes="240px" className="object-cover" />
              </div>
            </div>

            <div>
              <SectionTitle eyebrow="Who We Are" title="Built on Clinical Excellence & Compassion" light />
              <p className="mt-4 text-sm leading-7 text-white/70">
                A specialist hospital rooted in clinical excellence, compassion, innovation, and a deep commitment to
                patient-centred care — serving our community with dignity and professionalism.
              </p>
            </div>
          </div>

          <div className="reveal-group mt-14 grid gap-8 md:grid-cols-2">
            {aboutPanels.map((panel) => (
              <div key={panel.title} className="rounded-[26px] border border-white/10 bg-white/[0.04] p-7">
                <h3 className="font-display text-2xl text-white">{panel.title}</h3>
                {"body" in panel ? (
                  <p className="mt-4 text-sm leading-7 text-white/75">{panel.body}</p>
                ) : (
                  <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/80">
                    {panel.items.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5b301]" />
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

      {/* ================= FAQ ================= */}
      <section className="section-shell py-12 sm:py-24">
        <SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" centered />
        <div className="mt-12 grid gap-4">
          {faqItems.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>

      {/* ================= BLOG ================= */}
      <section className="bg-white/60 py-12 sm:py-24">
        <div className="section-shell">
          <SectionTitle eyebrow="From the Blog" title="Insights & Patient Education" subtitle="Updates and health education from our team." centered />
          <div className="reveal-group mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.title} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONSULTATION FORM ================= */}
      <section id="consult" className="section-shell py-12 sm:py-20">
        <div className="grid overflow-hidden rounded-[28px] shadow-[0_20px_60px_rgba(35,43,50,0.12)] lg:grid-cols-2">
          <div className="relative hidden min-h-[420px] lg:block">
            <Image src={dentalImg} alt="Care in action at Police Hospital" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2a6b]/85 via-[#0a2a6b]/45 to-[#0a2a6b]/25" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-display text-3xl leading-tight">Your health, our priority</h3>
              <p className="mt-2 text-sm leading-7 text-white/80">
                Book a free consultation and let our specialists guide your care with compassion and expertise.
              </p>
            </div>
          </div>

          <div className="bg-[linear-gradient(135deg,#e9eefc_0%,#ffffff_55%,#fdf3d6_100%)] px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
            <h2 className="font-display text-2xl text-[#0a2a6b] sm:text-4xl">Book A Free Consultation</h2>
            <p className="mt-2 text-[13px] leading-6 text-slate-500 sm:text-sm sm:leading-7">Fill in your details and we'll reach out to schedule your visit.</p>
            <form className="mt-6 grid gap-3 sm:grid-cols-2">
              {["First Name", "Last Name", "Email", "Mobile Number"].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  className="rounded-full border-0 bg-white px-5 py-3 text-sm outline-none ring-1 ring-black/5 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0a2a6b]/35"
                />
              ))}
              <textarea
                placeholder="Message"
                className="min-h-24 rounded-[22px] border-0 bg-white px-5 py-3 text-sm outline-none ring-1 ring-black/5 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0a2a6b]/35 sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <button className="inline-flex items-center gap-2 rounded-full bg-[#071a45] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                  Submit <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0a2a6b] py-14 text-white sm:py-16">
        <div className="section-shell">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
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
                  <li>
                    <Link href="/login/patient" className="transition hover:text-white">Patient care</Link>
                  </li>
                  <li>
                    <Link href="/login/staff" className="transition hover:text-white">Staff access</Link>
                  </li>
                  <li>Support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Contact</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/75">
                  <li className="flex items-start gap-2.5">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-[#f5b301]" /> Police College, GRA Ikeja, Lagos
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Phone size={16} className="mt-0.5 shrink-0 text-[#f5b301]" /> +234 000 000 0000
                  </li>
                  <li className="flex items-start gap-2.5">
                    <ChatCenteredDots size={16} className="mt-0.5 shrink-0 text-[#f5b301]" /> help@policehospital.ng
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
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {[FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo, X].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      aria-label="Social link"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-[#f5b301] hover:text-[#071a45] hover:ring-[#f5b301]"
                    >
                      <Icon size={18} className="shrink-0" />
                    </a>
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
