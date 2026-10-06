/**
 * Searchable catalogue for the public site.
 *
 * Three kinds of entry are indexed:
 *   - `department` — a clinic or unit patients can be directed to
 *   - `service`    — something the hospital does, owned by a department
 *   - `condition`  — a symptom or diagnosis in the words patients actually use,
 *                    routed to the department that treats it
 *
 * Conditions are the reason this catalogue exists. Someone typing "chest pain"
 * or "BP" does not know our department names, and a search that only matches
 * department titles would fail them.
 */
import { departments } from "@/lib/his/data/departments";
import type { DepartmentSlug } from "@/lib/his/types";

export type SearchKind = "department" | "service" | "condition";

export interface SearchEntry {
  id: string;
  kind: SearchKind;
  title: string;
  /** Short qualifier shown beside the title, e.g. the owning department. */
  subtitle: string;
  summary: string;
  departmentSlug: DepartmentSlug;
  /** Alternative spellings, abbreviations, and layman's terms. */
  keywords: string[];
}

/** Symptoms and diagnoses in patient language, mapped to the treating department. */
const conditions: Array<{
  title: string;
  departmentSlug: DepartmentSlug;
  summary: string;
  keywords: string[];
}> = [
  {
    title: "Malaria",
    departmentSlug: "laboratory",
    summary: "Rapid malaria testing and treatment, with same-day results in most cases.",
    keywords: ["fever", "malaria test", "mp", "rdt", "chills", "body temperature"],
  },
  {
    title: "Typhoid Fever",
    departmentSlug: "laboratory",
    summary: "Widal and culture testing followed by treatment in our medical clinics.",
    keywords: ["typhoid", "widal", "enteric fever", "stomach fever"],
  },
  {
    title: "High Blood Pressure",
    departmentSlug: "internal-medicine",
    summary: "Hypertension diagnosis, monitoring, and long-term medication management.",
    keywords: ["hypertension", "bp", "blood pressure", "high bp", "heart pressure"],
  },
  {
    title: "Diabetes",
    departmentSlug: "internal-medicine",
    summary: "Blood sugar testing, diabetes clinics, and lifestyle plus medication management.",
    keywords: ["diabetes", "sugar", "blood sugar", "diabetic", "glucose", "sugar level"],
  },
  {
    title: "Chest Pain",
    departmentSlug: "emergency",
    summary: "Chest pain is treated as an emergency — come straight to our 24/7 emergency centre.",
    keywords: ["chest pain", "heart attack", "heart", "cardiac", "palpitations", "urgent"],
  },
  {
    title: "Asthma & Breathing Difficulty",
    departmentSlug: "internal-medicine",
    summary: "Assessment and management of asthma and other respiratory conditions.",
    keywords: ["asthma", "breathing", "shortness of breath", "wheezing", "cough", "chest tightness"],
  },
  {
    title: "Toothache & Dental Pain",
    departmentSlug: "dental",
    summary: "Same-week dental appointments for pain, decay, extraction, and fillings.",
    keywords: ["toothache", "tooth", "teeth", "dentist", "gum", "cavity", "filling", "extraction"],
  },
  {
    title: "Blurred Vision & Eye Test",
    departmentSlug: "ophthalmology",
    summary: "Comprehensive eye examination, refraction, and prescription glasses.",
    keywords: ["eye", "eyes", "vision", "blurred", "glasses", "spectacles", "eye test", "sight", "optician", "optometry"],
  },
  {
    title: "Glaucoma & Cataract",
    departmentSlug: "ophthalmology",
    summary: "Screening, monitoring, and specialist management of glaucoma and cataract.",
    keywords: ["glaucoma", "cataract", "eye pressure", "cloudy vision"],
  },
  {
    title: "Pregnancy & Antenatal Care",
    departmentSlug: "obstetrics-gynaecology",
    summary: "Antenatal clinics, ultrasound scanning, safe delivery, and postnatal review.",
    keywords: ["pregnant", "pregnancy", "antenatal", "anc", "delivery", "labour", "birth", "maternity", "baby scan", "postnatal"],
  },
  {
    title: "Family Planning",
    departmentSlug: "obstetrics-gynaecology",
    summary: "Confidential family planning counselling and contraception options.",
    keywords: ["family planning", "contraception", "birth control", "implant", "iud", "coil"],
  },
  {
    title: "Child Immunisation",
    departmentSlug: "paediatrics",
    summary: "Routine childhood immunisation and child welfare clinics.",
    keywords: ["immunisation", "immunization", "vaccine", "vaccination", "child welfare", "baby", "jab", "bcg", "polio"],
  },
  {
    title: "Fracture & Broken Bones",
    departmentSlug: "orthopaedics",
    summary: "X-ray, casting, and orthopaedic management of fractures and injuries.",
    keywords: ["fracture", "broken bone", "broken arm", "broken leg", "sprain", "dislocation", "cast", "plaster"],
  },
  {
    title: "Back & Joint Pain",
    departmentSlug: "orthopaedics",
    summary: "Assessment of back, neck, knee, and joint pain with physiotherapy support.",
    keywords: ["back pain", "waist pain", "joint pain", "knee", "neck pain", "arthritis", "spine", "shoulder"],
  },
  {
    title: "Ear Pain & Hearing Loss",
    departmentSlug: "ent",
    summary: "Ear examination, hearing assessment, and treatment of ear infections.",
    keywords: ["ear", "ear pain", "hearing", "deaf", "earache", "ear infection", "wax", "tinnitus"],
  },
  {
    title: "Sinus, Throat & Tonsils",
    departmentSlug: "ent",
    summary: "Treatment of sinusitis, sore throat, tonsillitis, and voice problems.",
    keywords: ["sinus", "sinusitis", "sore throat", "tonsils", "tonsillitis", "catarrh", "nose", "voice", "hoarseness"],
  },
  {
    title: "Depression, Anxiety & Stress",
    departmentSlug: "mental-health",
    summary: "Confidential counselling, assessment, and psychiatric support.",
    keywords: ["depression", "anxiety", "stress", "mental health", "counselling", "counseling", "therapy", "insomnia", "trauma", "ptsd"],
  },
  {
    title: "X-ray",
    departmentSlug: "radiology",
    summary: "Digital X-ray imaging with specialist radiologist reporting.",
    keywords: ["x-ray", "xray", "x ray", "radiograph", "imaging", "chest x-ray"],
  },
  {
    title: "Ultrasound Scan",
    departmentSlug: "radiology",
    summary: "Abdominal, pelvic, and antenatal ultrasound scanning.",
    keywords: ["ultrasound", "scan", "sonography", "usg", "abdominal scan", "pelvic scan"],
  },
  {
    title: "Mammogram & Breast Screening",
    departmentSlug: "radiology",
    summary: "Breast imaging that supports early detection and preventive screening.",
    keywords: ["mammogram", "mammography", "breast", "breast lump", "breast screening"],
  },
  {
    title: "Blood Test",
    departmentSlug: "laboratory",
    summary: "Full blood count, chemistry, and a wide range of diagnostic blood tests.",
    keywords: ["blood test", "fbc", "full blood count", "lab test", "blood work", "pcv", "genotype", "blood group", "e&u", "lft"],
  },
  {
    title: "HIV & Infection Screening",
    departmentSlug: "laboratory",
    summary: "Confidential HIV, hepatitis, and infection screening with counselling.",
    keywords: ["hiv", "aids", "hepatitis", "std", "sti", "screening", "confidential test", "vdrl"],
  },
  {
    title: "Surgery & Operations",
    departmentSlug: "general-surgery",
    summary: "Surgical consultation, day-case and general surgery in modern theatres.",
    keywords: ["surgery", "operation", "surgical", "hernia", "appendix", "appendicitis", "theatre", "lump", "biopsy"],
  },
  {
    title: "Physiotherapy",
    departmentSlug: "physiotherapy",
    summary: "Rehabilitation to restore mobility, strength, and everyday function.",
    keywords: ["physiotherapy", "physio", "rehabilitation", "rehab", "stroke", "mobility", "massage therapy", "exercise therapy"],
  },
  {
    title: "Accident & Emergency",
    departmentSlug: "emergency",
    summary: "24/7 emergency and trauma care with ambulance response.",
    keywords: ["emergency", "accident", "a&e", "ambulance", "trauma", "urgent", "casualty", "911", "resuscitation", "icu"],
  },
  {
    title: "Medical Check-up",
    departmentSlug: "preventive-health",
    summary: "Comprehensive health checks, screening, and wellness assessment.",
    keywords: ["check up", "checkup", "medical", "screening", "wellness", "health check", "annual medical", "pre-employment"],
  },
  {
    title: "Prescription Refill",
    departmentSlug: "pharmacy",
    summary: "Repeat prescriptions and pharmacist counselling on your medication.",
    keywords: ["prescription", "refill", "drugs", "medication", "medicine", "pharmacy", "dispensing", "tablets"],
  },
  {
    title: "NHIA & HMO Cover",
    departmentSlug: "nhia-hmo",
    summary: "Insurance verification, authorisation codes, and claims support.",
    keywords: ["nhia", "nhis", "hmo", "insurance", "health insurance", "authorisation", "authorization", "code", "claims", "enrolee"],
  },
];

function buildCatalog(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const dept of departments) {
    entries.push({
      id: `department:${dept.slug}`,
      kind: "department",
      title: dept.name,
      subtitle: dept.category === "emergency" ? "Emergency · 24/7" : `${dept.category} department`,
      summary: dept.summary,
      departmentSlug: dept.slug,
      keywords: [dept.slug.replace(/-/g, " "), ...dept.services],
    });

    for (const [index, service] of dept.services.entries()) {
      entries.push({
        id: `service:${dept.slug}:${index}`,
        kind: "service",
        title: service,
        subtitle: dept.name,
        summary: dept.summary,
        departmentSlug: dept.slug,
        keywords: [dept.name],
      });
    }
  }

  for (const condition of conditions) {
    entries.push({
      id: `condition:${condition.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      kind: "condition",
      title: condition.title,
      subtitle: departments.find((d) => d.slug === condition.departmentSlug)?.name ?? "",
      summary: condition.summary,
      departmentSlug: condition.departmentSlug,
      keywords: condition.keywords,
    });
  }

  return entries;
}

export const searchCatalog: SearchEntry[] = buildCatalog();

/** A handful of prompts shown before the user has typed anything. */
export const popularSearches = [
  "Antenatal",
  "Malaria test",
  "Eye test",
  "Dental",
  "X-ray",
  "Blood pressure",
] as const;
