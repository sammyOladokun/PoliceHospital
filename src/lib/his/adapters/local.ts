/**
 * Local adapter — no hospital server required.
 *
 * Serves reference data from the repo and a small set of demo clinical records.
 * This keeps the public site, search, and dashboard shells fully functional
 * before the hospital's local HIS is wired up, and gives the UI a stable target
 * to develop against.
 *
 * The demo records are clearly fictional and exist only in this file. Nothing
 * here should ever be deployed as `HIS_MODE=local` to production once the real
 * server is available — `/api/health` reports the active mode so this is visible.
 */
import { departments, departmentsBySlug } from "@/lib/his/data/departments";
import type {
  Appointment,
  Department,
  DepartmentSlug,
  HisAdapter,
  HisHealth,
  Id,
  LabResult,
  Patient,
  Practitioner,
  Prescription,
} from "@/lib/his/types";

const practitioners: Practitioner[] = [
  {
    id: "prac-001",
    name: "Dr. A. Adeyemi",
    title: "Consultant Physician",
    departmentSlug: "internal-medicine",
    specialties: ["Internal Medicine", "Hypertension"],
    active: true,
  },
  {
    id: "prac-002",
    name: "Dr. F. Okonkwo",
    title: "Consultant Obstetrician & Gynaecologist",
    departmentSlug: "obstetrics-gynaecology",
    specialties: ["Obstetrics", "Gynaecology"],
    active: true,
  },
  {
    id: "prac-003",
    name: "Dr. S. Bello",
    title: "Consultant Paediatrician",
    departmentSlug: "paediatrics",
    specialties: ["Paediatrics", "Neonatology"],
    active: true,
  },
  {
    id: "prac-004",
    name: "Dr. K. Eze",
    title: "Consultant Ophthalmologist",
    departmentSlug: "ophthalmology",
    specialties: ["Ophthalmology"],
    active: true,
  },
  {
    id: "prac-005",
    name: "Dr. M. Ibrahim",
    title: "Consultant Surgeon",
    departmentSlug: "general-surgery",
    specialties: ["General Surgery"],
    active: true,
  },
];

const demoPatient: Patient = {
  id: "patient-demo",
  hospitalNo: "PCH/2026/00184",
  name: "Victor Okafor",
  dateOfBirth: "1987-04-12",
  gender: "male",
  phone: "+234 000 000 0000",
  email: "victor.demo@example.com",
};

const demoAppointments: Appointment[] = [
  {
    id: "appt-001",
    patientId: demoPatient.id,
    practitionerId: "prac-001",
    departmentSlug: "internal-medicine",
    status: "booked",
    start: "2026-08-07T09:30:00.000Z",
    end: "2026-08-07T10:00:00.000Z",
    reason: "Blood pressure review",
    location: "Consulting Room 3",
  },
  {
    id: "appt-002",
    patientId: demoPatient.id,
    departmentSlug: "laboratory",
    status: "booked",
    start: "2026-08-21T07:45:00.000Z",
    reason: "Fasting blood sugar",
    location: "Diagnostics Wing",
  },
];

const demoLabResults: LabResult[] = [
  {
    id: "lab-001",
    patientId: demoPatient.id,
    name: "Full Blood Count",
    status: "final",
    issued: "2026-07-29T08:24:00.000Z",
    conclusion: "Within normal limits.",
    observations: [
      { name: "Haemoglobin", value: "14.2", unit: "g/dL", referenceRange: "13.0–17.0" },
      { name: "White Cell Count", value: "6.8", unit: "10^9/L", referenceRange: "4.0–11.0" },
      { name: "Platelets", value: "268", unit: "10^9/L", referenceRange: "150–400" },
    ],
  },
  {
    id: "lab-002",
    patientId: demoPatient.id,
    name: "Fasting Blood Sugar",
    status: "preliminary",
    issued: "2026-07-30T07:10:00.000Z",
    observations: [
      { name: "Glucose (fasting)", value: "6.4", unit: "mmol/L", referenceRange: "3.9–5.5", abnormal: true },
    ],
  },
];

const demoPrescriptions: Prescription[] = [
  {
    id: "rx-001",
    patientId: demoPatient.id,
    medication: "Amlodipine 5mg",
    dosage: "1 tablet",
    instructions: "Once daily in the morning",
    status: "active",
    authoredOn: "2026-07-12T10:00:00.000Z",
    prescriberId: "prac-001",
  },
  {
    id: "rx-002",
    patientId: demoPatient.id,
    medication: "Metformin 500mg",
    dosage: "1 tablet",
    instructions: "Twice daily after meals",
    status: "active",
    authoredOn: "2026-07-12T10:00:00.000Z",
    prescriberId: "prac-001",
  },
];

export class LocalHisAdapter implements HisAdapter {
  readonly mode = "local" as const;

  async health(): Promise<HisHealth> {
    return {
      mode: "local",
      reachable: true,
      latencyMs: 0,
      software: "in-repo local adapter (no hospital server configured)",
    };
  }

  async listDepartments(): Promise<Department[]> {
    return departments;
  }

  async getDepartment(slug: DepartmentSlug): Promise<Department | null> {
    return departmentsBySlug.get(slug) ?? null;
  }

  async listPractitioners(options: { departmentSlug?: DepartmentSlug } = {}): Promise<Practitioner[]> {
    if (!options.departmentSlug) return practitioners;
    return practitioners.filter((p) => p.departmentSlug === options.departmentSlug);
  }

  async findPatientByHospitalNo(hospitalNo: string): Promise<Patient | null> {
    return hospitalNo.trim().toUpperCase() === demoPatient.hospitalNo ? demoPatient : null;
  }

  async listAppointments(options: { patientId: Id; from?: string; to?: string }): Promise<Appointment[]> {
    return demoAppointments
      .filter((appt) => appt.patientId === options.patientId)
      .filter((appt) => (options.from ? appt.start >= options.from : true))
      .filter((appt) => (options.to ? appt.start <= options.to : true))
      .sort((a, b) => a.start.localeCompare(b.start));
  }

  async listLabResults(options: { patientId: Id }): Promise<LabResult[]> {
    return demoLabResults
      .filter((result) => result.patientId === options.patientId)
      .sort((a, b) => b.issued.localeCompare(a.issued));
  }

  async listPrescriptions(options: { patientId: Id }): Promise<Prescription[]> {
    return demoPrescriptions.filter((rx) => rx.patientId === options.patientId);
  }
}
