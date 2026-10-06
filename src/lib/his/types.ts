/**
 * Domain model for the platform.
 *
 * These are *our* types, deliberately not FHIR types. Adapters translate
 * between whatever the hospital's local server speaks (FHIR R4, HL7 v2 via a
 * facade, or a vendor REST API) and these shapes, so that UI and business
 * logic never depend on the integration format.
 */

export type Id = string;

export type DepartmentSlug = string;

export interface Department {
  id: Id;
  slug: DepartmentSlug;
  name: string;
  /** One-line description shown in search results and cards. */
  summary: string;
  /** Longer body copy for the department page. */
  description?: string;
  /** Clinical area used for grouping: clinical, diagnostic, or support. */
  category: "clinical" | "diagnostic" | "support" | "emergency";
  /** Physical location within the hospital, when known. */
  location?: string;
  /** Human-readable opening hours, e.g. "Mon–Fri, 8:00 AM – 4:00 PM". */
  hours?: string;
  /** Common services offered. */
  services: string[];
}

export interface Practitioner {
  id: Id;
  name: string;
  /** e.g. "Consultant Cardiologist" */
  title?: string;
  departmentSlug?: DepartmentSlug;
  specialties: string[];
  active: boolean;
}

export type AppointmentStatus =
  | "requested"
  | "booked"
  | "arrived"
  | "in-progress"
  | "fulfilled"
  | "cancelled"
  | "no-show";

export interface Appointment {
  id: Id;
  patientId: Id;
  practitionerId?: Id;
  departmentSlug?: DepartmentSlug;
  status: AppointmentStatus;
  /** ISO 8601 timestamp. */
  start: string;
  /** ISO 8601 timestamp. */
  end?: string;
  reason?: string;
  location?: string;
}

export interface Patient {
  id: Id;
  /** Hospital-assigned medical record number. */
  hospitalNo: string;
  name: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other" | "unknown";
  phone?: string;
  email?: string;
}

export type LabResultStatus = "registered" | "preliminary" | "final" | "amended" | "cancelled";

export interface LabResult {
  id: Id;
  patientId: Id;
  /** e.g. "Full Blood Count" */
  name: string;
  status: LabResultStatus;
  /** ISO 8601 timestamp of when the specimen was collected or reported. */
  issued: string;
  /** Free-text or structured conclusion. */
  conclusion?: string;
  observations: Array<{
    name: string;
    value: string;
    unit?: string;
    referenceRange?: string;
    abnormal?: boolean;
  }>;
}

export interface Prescription {
  id: Id;
  patientId: Id;
  medication: string;
  dosage?: string;
  /** e.g. "Twice daily for 7 days" */
  instructions?: string;
  status: "active" | "completed" | "stopped" | "on-hold";
  authoredOn: string;
  prescriberId?: Id;
}

/**
 * Result of a connectivity probe against the hospital's local server.
 * Surfaced by `/api/health` so the on-site IT team can diagnose quickly.
 */
export interface HisHealth {
  mode: "local" | "fhir";
  reachable: boolean;
  /** Round-trip latency in milliseconds, when reachable. */
  latencyMs?: number;
  /** Server software identifier, when the endpoint reports one. */
  software?: string;
  /** FHIR version string reported by the endpoint, e.g. "4.0.1". */
  fhirVersion?: string;
  error?: string;
}

/**
 * The single seam between the app and the hospital's systems.
 *
 * Every method must be implemented by every adapter. When the hospital server
 * is unreachable, adapters are expected to throw `HisUnavailableError` rather
 * than return empty data, so callers can distinguish "nothing found" from
 * "we could not ask".
 */
export interface HisAdapter {
  readonly mode: "local" | "fhir";

  health(): Promise<HisHealth>;

  listDepartments(): Promise<Department[]>;
  getDepartment(slug: DepartmentSlug): Promise<Department | null>;

  listPractitioners(options?: { departmentSlug?: DepartmentSlug }): Promise<Practitioner[]>;

  findPatientByHospitalNo(hospitalNo: string): Promise<Patient | null>;

  listAppointments(options: { patientId: Id; from?: string; to?: string }): Promise<Appointment[]>;
  listLabResults(options: { patientId: Id }): Promise<LabResult[]>;
  listPrescriptions(options: { patientId: Id }): Promise<Prescription[]>;
}
