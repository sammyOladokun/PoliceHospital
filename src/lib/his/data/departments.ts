/**
 * Canonical department reference data.
 *
 * This is the source of truth while `HIS_MODE=local`. Once the hospital's local
 * server exposes its own department/location directory, the FHIR adapter reads
 * `Organization`/`HealthcareService` resources instead and this file becomes
 * seed data only.
 */
import type { Department } from "@/lib/his/types";

export const departments: Department[] = [
  {
    id: "dept-family-medicine",
    slug: "family-medicine",
    name: "Family Medicine",
    summary: "Primary care for all ages — your first point of contact.",
    description:
      "First-contact care covering routine check-ups, treatment of common illnesses, chronic disease management, health education, and onward referral to our specialist clinics when needed.",
    category: "clinical",
    location: "Outpatient Block, Ground Floor",
    hours: "Mon–Fri, 8:00 AM – 4:00 PM",
    services: [
      "Routine consultations and preventive care",
      "Management of chronic conditions",
      "Health education and referral coordination",
      "Travel and pre-employment medicals",
    ],
  },
  {
    id: "dept-internal-medicine",
    slug: "internal-medicine",
    name: "Internal Medicine",
    summary: "Specialist diagnosis and treatment of adult medical conditions.",
    description:
      "Diagnosis and long-term management of hypertension, diabetes, asthma, heart disease, kidney disorders, infectious diseases, and other complex adult conditions.",
    category: "clinical",
    location: "Specialist Clinics, First Floor",
    hours: "Mon, Wed, Fri — 9:00 AM – 3:00 PM",
    services: [
      "Complex adult medical assessment",
      "Hypertension and diabetes clinics",
      "Respiratory and kidney disease review",
      "Infectious disease management",
    ],
  },
  {
    id: "dept-general-surgery",
    slug: "general-surgery",
    name: "General Surgery",
    summary: "Surgical consultation, operative care, and post-operative follow-up.",
    description:
      "Expert surgical consultation and operative care in fully equipped theatres, with structured pre-operative assessment and post-operative recovery support.",
    category: "clinical",
    location: "Surgical Block, Second Floor",
    hours: "Clinic: Tue & Thu, 9:00 AM – 2:00 PM",
    services: [
      "Pre-operative assessment",
      "General and day-case surgery",
      "Hernia, appendix, and soft tissue procedures",
      "Post-operative recovery support",
    ],
  },
  {
    id: "dept-obstetrics-gynaecology",
    slug: "obstetrics-gynaecology",
    name: "Obstetrics & Gynaecology",
    summary: "Antenatal, delivery, postnatal, and women's health services.",
    description:
      "Complete maternity and women's health care: antenatal clinics, safe delivery, postnatal review, family planning, fertility support, gynaecological consultation, and cervical cancer screening.",
    category: "clinical",
    location: "Maternity Wing",
    hours: "Antenatal clinic: Mon & Thu, 8:00 AM – 1:00 PM · Delivery: 24/7",
    services: [
      "Antenatal and safe delivery services",
      "Postnatal and fertility support",
      "Family planning and contraception",
      "Cervical cancer screening",
    ],
  },
  {
    id: "dept-paediatrics",
    slug: "paediatrics",
    name: "Paediatrics",
    summary: "Healthcare for newborns, infants, children, and adolescents.",
    description:
      "Care for children from birth through adolescence, including treatment of acute and chronic illness, growth and development monitoring, immunisation, and nutrition counselling.",
    category: "clinical",
    location: "Children's Clinic, Ground Floor",
    hours: "Mon–Fri, 8:00 AM – 4:00 PM · Emergency: 24/7",
    services: [
      "Growth and development monitoring",
      "Childhood immunisation and child welfare",
      "Acute and chronic paediatric care",
      "Nutrition counselling",
    ],
  },
  {
    id: "dept-orthopaedics",
    slug: "orthopaedics",
    name: "Orthopaedics",
    summary: "Bone, joint, muscle, and spine care to restore mobility.",
    description:
      "Diagnosis and treatment of conditions affecting bones, joints, muscles, ligaments, and the spine — including fractures, arthritis, sports injuries, and back pain.",
    category: "clinical",
    location: "Specialist Clinics, First Floor",
    hours: "Tue & Fri, 9:00 AM – 2:00 PM",
    services: [
      "Fracture and trauma management",
      "Joint, bone, and spine treatment",
      "Arthritis and sports injury care",
      "Mobility restoration and casting",
    ],
  },
  {
    id: "dept-ent",
    slug: "ent",
    name: "ENT (Ear, Nose & Throat)",
    summary: "Specialist care for ear, nose, throat, head and neck conditions.",
    description:
      "Specialist evaluation and treatment of hearing loss, ear infections, sinus disease, tonsillitis, voice disorders, and head and neck conditions.",
    category: "clinical",
    location: "Specialist Clinics, First Floor",
    hours: "Wed, 9:00 AM – 2:00 PM",
    services: [
      "Hearing assessment and ear care",
      "Sinus and nasal treatment",
      "Throat, tonsil, and voice disorders",
      "Head and neck evaluation",
    ],
  },
  {
    id: "dept-ophthalmology",
    slug: "ophthalmology",
    name: "Ophthalmology & Eye Clinic",
    summary: "Comprehensive vision care and eye disease management.",
    description:
      "Specialist vision care backed by an advanced optometry suite: comprehensive eye examinations, refraction, glaucoma and cataract assessment, and management of eye disease.",
    category: "clinical",
    location: "Eye Clinic, Ground Floor",
    hours: "Mon & Thu, 9:00 AM – 3:00 PM",
    services: [
      "Comprehensive eye examinations",
      "Refraction and prescription glasses",
      "Glaucoma and cataract assessment",
      "Diagnosis and treatment of eye disease",
    ],
  },
  {
    id: "dept-dental",
    slug: "dental",
    name: "Dental Services",
    summary: "Routine, restorative, and specialist dental care.",
    description:
      "Comprehensive dental care from routine check-ups and scaling to fillings, extractions, restorative treatment, and oral surgery.",
    category: "clinical",
    location: "Dental Clinic, Ground Floor",
    hours: "Mon–Fri, 8:30 AM – 3:30 PM",
    services: [
      "Check-ups, scaling and polishing",
      "Fillings and restorative dentistry",
      "Extractions and oral surgery",
      "Oral health education",
    ],
  },
  {
    id: "dept-mental-health",
    slug: "mental-health",
    name: "Mental Health Services",
    summary: "Confidential assessment, counselling, and psychiatric support.",
    description:
      "Confidential mental health assessment, counselling, and psychiatric treatment for anxiety, depression, stress, substance use, and other conditions — with dignity and privacy.",
    category: "clinical",
    location: "Specialist Clinics, First Floor",
    hours: "By appointment, Mon–Fri",
    services: [
      "Mental health assessment",
      "Counselling and psychotherapy",
      "Psychiatric review and medication",
      "Stress and trauma support",
    ],
  },
  {
    id: "dept-emergency",
    slug: "emergency",
    name: "Emergency & Trauma Centre",
    summary: "24/7 emergency, trauma, and ambulance response.",
    description:
      "Round-the-clock emergency and trauma care with rapid triage, resuscitation, critical care, and an ambulance service ready to deliver life-saving treatment on the move.",
    category: "emergency",
    location: "Emergency Entrance, Main Block",
    hours: "Open 24 hours, every day",
    services: [
      "Triage and resuscitation",
      "Trauma and accident care",
      "Ambulance response and transfer",
      "ICU, NICU, and high-dependency care",
    ],
  },
  {
    id: "dept-laboratory",
    slug: "laboratory",
    name: "Medical Laboratory",
    summary: "Fast, reliable diagnostic testing across all specialties.",
    description:
      "Modern laboratory systems delivering accurate haematology, chemistry, microbiology, serology, and histopathology results to support safer clinical decisions.",
    category: "diagnostic",
    location: "Diagnostics Wing, Ground Floor",
    hours: "Mon–Sat, 7:30 AM – 6:00 PM · Emergency: 24/7",
    services: [
      "Full blood count and haematology",
      "Clinical chemistry and biochemistry",
      "Microbiology and serology",
      "Malaria, HIV, and infection screening",
    ],
  },
  {
    id: "dept-radiology",
    slug: "radiology",
    name: "Radiology & Medical Imaging",
    summary: "Digital X-ray, ultrasound, and mammography.",
    description:
      "Digital imaging that supports faster, more accurate diagnosis — including digital X-ray, ultrasound and antenatal scanning, and mammography for breast screening.",
    category: "diagnostic",
    location: "Imaging Suite, Ground Floor",
    hours: "Mon–Sat, 8:00 AM – 5:00 PM · Emergency X-ray: 24/7",
    services: [
      "Digital X-ray",
      "Ultrasound and antenatal scanning",
      "Mammography and breast screening",
      "Reporting by specialist radiologists",
    ],
  },
  {
    id: "dept-pharmacy",
    slug: "pharmacy",
    name: "Pharmacy",
    summary: "Quality, affordable medication with professional guidance.",
    description:
      "A well-stocked pharmacy dispensing quality, affordable medication, with pharmacist counselling on dosage, interactions, and adherence.",
    category: "support",
    location: "Main Block, Ground Floor",
    hours: "Mon–Sat, 8:00 AM – 7:00 PM · Emergency dispensing: 24/7",
    services: [
      "Prescription dispensing",
      "Medication counselling",
      "Refill and repeat prescriptions",
      "Over-the-counter advice",
    ],
  },
  {
    id: "dept-physiotherapy",
    slug: "physiotherapy",
    name: "Physiotherapy & Rehabilitation",
    summary: "Restore mobility, strength, and everyday function.",
    description:
      "Physiotherapy and rehabilitation programmes for post-operative recovery, injury, stroke, back and joint pain, and long-term mobility support.",
    category: "support",
    location: "Rehabilitation Unit",
    hours: "Mon–Fri, 8:00 AM – 4:00 PM",
    services: [
      "Post-operative rehabilitation",
      "Back, neck, and joint pain therapy",
      "Stroke and neurological rehabilitation",
      "Sports injury recovery",
    ],
  },
  {
    id: "dept-preventive-health",
    slug: "preventive-health",
    name: "Preventive Health & Wellness",
    summary: "Screening, health checks, and wellness clinics.",
    description:
      "Preventive health screening and wellness clinics designed to catch problems early — routine health checks, cancer screening, and lifestyle counselling.",
    category: "support",
    location: "Outpatient Block, Ground Floor",
    hours: "Mon–Fri, 8:00 AM – 3:00 PM",
    services: [
      "Comprehensive medical check-ups",
      "Cancer and chronic disease screening",
      "Immunisation for adults",
      "Lifestyle and nutrition counselling",
    ],
  },
  {
    id: "dept-nhia-hmo",
    slug: "nhia-hmo",
    name: "NHIA / HMO Services",
    summary: "Health insurance verification, authorisation, and claims support.",
    description:
      "Support desk for insured patients: NHIA and accredited HMO verification, treatment authorisation codes, and claims processing guidance.",
    category: "support",
    location: "Reception, Main Block",
    hours: "Mon–Fri, 8:00 AM – 4:00 PM",
    services: [
      "NHIA enrolee verification",
      "HMO authorisation codes",
      "Claims and referral paperwork",
      "Billing enquiries",
    ],
  },
];

export const departmentsBySlug = new Map(departments.map((dept) => [dept.slug, dept]));
