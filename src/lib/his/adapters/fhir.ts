/**
 * FHIR R4 adapter — talks to the hospital's local server.
 *
 * Points at either a native FHIR R4 server on the hospital LAN, or a FHIR
 * facade placed in front of the existing HIS. The facade pattern is the usual
 * route for an established hospital: the legacy system keeps running and speaks
 * HL7 v2 internally (ADT for admissions, ORM/ORU for lab orders and results),
 * while an integration layer exposes those same records as FHIR R4 resources
 * on demand. See ARCHITECTURE.md for the deployment topology.
 *
 * Only read operations are implemented here. Writes (booking an appointment,
 * for example) must go through the hospital's own ordering rules, so those are
 * added deliberately per workflow rather than opened up wholesale.
 */
import { hisRequest } from "@/lib/his/client";
import { departments as seedDepartments } from "@/lib/his/data/departments";
import type {
  Appointment,
  AppointmentStatus,
  Department,
  DepartmentSlug,
  HisAdapter,
  HisHealth,
  Id,
  LabResult,
  LabResultStatus,
  Patient,
  Practitioner,
  Prescription,
} from "@/lib/his/types";

/* ------------------------------------------------------------------ *
 * Minimal FHIR shapes — only the fields we actually read.
 * ------------------------------------------------------------------ */

interface FhirCoding {
  system?: string;
  code?: string;
  display?: string;
}

interface FhirCodeableConcept {
  coding?: FhirCoding[];
  text?: string;
}

interface FhirReference {
  reference?: string;
  display?: string;
}

interface FhirHumanName {
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
}

interface FhirBundle<T> {
  resourceType: "Bundle";
  total?: number;
  entry?: Array<{ resource?: T }>;
}

interface FhirCapabilityStatement {
  resourceType: "CapabilityStatement";
  fhirVersion?: string;
  software?: { name?: string; version?: string };
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function referenceId(reference?: FhirReference): string | undefined {
  const raw = reference?.reference;
  if (!raw) return undefined;
  // "Patient/123" or an absolute URL ending in the id.
  const parts = raw.split("/");
  return parts[parts.length - 1] || undefined;
}

function conceptText(concept?: FhirCodeableConcept): string | undefined {
  return concept?.text ?? concept?.coding?.find((c) => c.display)?.display;
}

function humanName(names?: FhirHumanName[]): string {
  const name = names?.[0];
  if (!name) return "Unknown";
  if (name.text) return name.text;
  const parts = [...(name.prefix ?? []), ...(name.given ?? []), name.family].filter(Boolean);
  return parts.join(" ") || "Unknown";
}

function bundleResources<T>(bundle: FhirBundle<T> | null): T[] {
  return (bundle?.entry ?? []).map((entry) => entry.resource).filter((r): r is T => Boolean(r));
}

const APPOINTMENT_STATUS: Record<string, AppointmentStatus> = {
  proposed: "requested",
  pending: "requested",
  booked: "booked",
  arrived: "arrived",
  "checked-in": "arrived",
  fulfilled: "fulfilled",
  cancelled: "cancelled",
  noshow: "no-show",
  "entered-in-error": "cancelled",
  waitlist: "requested",
};

const REPORT_STATUS: Record<string, LabResultStatus> = {
  registered: "registered",
  partial: "preliminary",
  preliminary: "preliminary",
  final: "final",
  amended: "amended",
  corrected: "amended",
  appended: "amended",
  cancelled: "cancelled",
  "entered-in-error": "cancelled",
};

/**
 * `HealthcareService` and `Organization` records on a hospital server rarely
 * carry the marketing copy the public site needs. We match the server's
 * departments against our seed data by slug and fill the gaps, so the site
 * always has usable descriptions even when the HIS only supplies a name.
 */
function mergeWithSeed(name: string, id: string, location?: string): Department {
  const slug = slugify(name);
  const seed = seedDepartments.find((dept) => dept.slug === slug || dept.name === name);

  return {
    id,
    slug: seed?.slug ?? slug,
    name: seed?.name ?? name,
    summary: seed?.summary ?? name,
    description: seed?.description,
    category: seed?.category ?? "clinical",
    location: location ?? seed?.location,
    hours: seed?.hours,
    services: seed?.services ?? [],
  };
}

/* ------------------------------------------------------------------ *
 * Adapter
 * ------------------------------------------------------------------ */

export class FhirHisAdapter implements HisAdapter {
  readonly mode = "fhir" as const;

  async health(): Promise<HisHealth> {
    const startedAt = Date.now();
    try {
      const metadata = await hisRequest<FhirCapabilityStatement>({
        path: "metadata",
        query: { _summary: "true" },
      });

      return {
        mode: "fhir",
        reachable: true,
        latencyMs: Date.now() - startedAt,
        software: [metadata?.software?.name, metadata?.software?.version].filter(Boolean).join(" "),
        fhirVersion: metadata?.fhirVersion,
      };
    } catch (error) {
      return {
        mode: "fhir",
        reachable: false,
        latencyMs: Date.now() - startedAt,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async listDepartments(): Promise<Department[]> {
    const bundle = await hisRequest<
      FhirBundle<{
        resourceType: "HealthcareService";
        id?: string;
        name?: string;
        location?: FhirReference[];
        active?: boolean;
      }>
    >({
      path: "HealthcareService",
      query: { _count: 100, active: "true" },
      // Reference data changes rarely; a short cache spares the HIS.
      revalidateSeconds: 300,
    });

    const services = bundleResources(bundle).filter((service) => service.name);
    if (services.length === 0) return seedDepartments;

    return services.map((service) =>
      mergeWithSeed(service.name!, service.id ?? slugify(service.name!), service.location?.[0]?.display)
    );
  }

  async getDepartment(slug: DepartmentSlug): Promise<Department | null> {
    const all = await this.listDepartments();
    return all.find((dept) => dept.slug === slug) ?? null;
  }

  async listPractitioners(options: { departmentSlug?: DepartmentSlug } = {}): Promise<Practitioner[]> {
    const bundle = await hisRequest<
      FhirBundle<{
        resourceType: "PractitionerRole";
        id?: string;
        active?: boolean;
        practitioner?: FhirReference;
        specialty?: FhirCodeableConcept[];
        code?: FhirCodeableConcept[];
      }>
    >({
      path: "PractitionerRole",
      query: { _count: 200, active: "true", _include: "PractitionerRole:practitioner" },
      revalidateSeconds: 300,
    });

    const roles = bundleResources(bundle);

    const practitioners = roles.map((role) => {
      const specialties = (role.specialty ?? [])
        .map((concept) => conceptText(concept))
        .filter((value): value is string => Boolean(value));

      return {
        id: referenceId(role.practitioner) ?? role.id ?? "unknown",
        name: role.practitioner?.display ?? "Unnamed practitioner",
        title: conceptText(role.code?.[0]),
        departmentSlug: specialties[0] ? slugify(specialties[0]) : undefined,
        specialties,
        active: role.active !== false,
      } satisfies Practitioner;
    });

    if (!options.departmentSlug) return practitioners;
    return practitioners.filter((p) => p.departmentSlug === options.departmentSlug);
  }

  async findPatientByHospitalNo(hospitalNo: string): Promise<Patient | null> {
    const bundle = await hisRequest<
      FhirBundle<{
        resourceType: "Patient";
        id?: string;
        name?: FhirHumanName[];
        birthDate?: string;
        gender?: Patient["gender"];
        telecom?: Array<{ system?: string; value?: string }>;
        identifier?: Array<{ value?: string }>;
      }>
    >({
      path: "Patient",
      // The MRN system URI is hospital-specific; configure it on the facade so
      // this stays a plain identifier search.
      query: { identifier: hospitalNo.trim(), _count: 1 },
    });

    const patient = bundleResources(bundle)[0];
    if (!patient) return null;

    return {
      id: patient.id ?? hospitalNo,
      hospitalNo: patient.identifier?.[0]?.value ?? hospitalNo,
      name: humanName(patient.name),
      dateOfBirth: patient.birthDate,
      gender: patient.gender,
      phone: patient.telecom?.find((t) => t.system === "phone")?.value,
      email: patient.telecom?.find((t) => t.system === "email")?.value,
    };
  }

  async listAppointments(options: { patientId: Id; from?: string; to?: string }): Promise<Appointment[]> {
    const query: Record<string, string | number | undefined> = {
      patient: options.patientId,
      _count: 50,
      _sort: "date",
    };

    // FHIR repeats the `date` parameter for a range; encode both bounds.
    if (options.from) query["date"] = `ge${options.from}`;
    if (options.to) query["date:below"] = `le${options.to}`;

    const bundle = await hisRequest<
      FhirBundle<{
        resourceType: "Appointment";
        id?: string;
        status?: string;
        start?: string;
        end?: string;
        description?: string;
        reasonCode?: FhirCodeableConcept[];
        serviceType?: FhirCodeableConcept[];
        participant?: Array<{ actor?: FhirReference; type?: FhirCodeableConcept[] }>;
      }>
    >({ path: "Appointment", query });

    return bundleResources(bundle).map((appt) => {
      const practitionerParticipant = appt.participant?.find((p) =>
        p.actor?.reference?.startsWith("Practitioner/")
      );
      const locationParticipant = appt.participant?.find((p) =>
        p.actor?.reference?.startsWith("Location/")
      );
      const serviceName = conceptText(appt.serviceType?.[0]);

      return {
        id: appt.id ?? crypto.randomUUID(),
        patientId: options.patientId,
        practitionerId: referenceId(practitionerParticipant?.actor),
        departmentSlug: serviceName ? slugify(serviceName) : undefined,
        status: APPOINTMENT_STATUS[appt.status ?? ""] ?? "requested",
        start: appt.start ?? "",
        end: appt.end,
        reason: appt.description ?? conceptText(appt.reasonCode?.[0]),
        location: locationParticipant?.actor?.display,
      } satisfies Appointment;
    });
  }

  async listLabResults(options: { patientId: Id }): Promise<LabResult[]> {
    const bundle = await hisRequest<
      FhirBundle<
        | {
            resourceType: "DiagnosticReport";
            id?: string;
            status?: string;
            issued?: string;
            effectiveDateTime?: string;
            conclusion?: string;
            code?: FhirCodeableConcept;
            result?: FhirReference[];
          }
        | {
            resourceType: "Observation";
            id?: string;
            code?: FhirCodeableConcept;
            valueQuantity?: { value?: number; unit?: string };
            valueString?: string;
            interpretation?: FhirCodeableConcept[];
            referenceRange?: Array<{ text?: string; low?: { value?: number }; high?: { value?: number } }>;
          }
      >
    >({
      path: "DiagnosticReport",
      query: {
        patient: options.patientId,
        category: "LAB",
        _count: 50,
        _sort: "-issued",
        _include: "DiagnosticReport:result",
      },
    });

    const resources = bundleResources(bundle);
    const observations = new Map(
      resources
        .filter((r): r is Extract<typeof r, { resourceType: "Observation" }> => r.resourceType === "Observation")
        .map((observation) => [observation.id ?? "", observation])
    );

    return resources
      .filter((r): r is Extract<typeof r, { resourceType: "DiagnosticReport" }> => r.resourceType === "DiagnosticReport")
      .map((report) => ({
        id: report.id ?? crypto.randomUUID(),
        patientId: options.patientId,
        name: conceptText(report.code) ?? "Laboratory report",
        status: REPORT_STATUS[report.status ?? ""] ?? "registered",
        issued: report.issued ?? report.effectiveDateTime ?? "",
        conclusion: report.conclusion,
        observations: (report.result ?? [])
          .map((ref) => observations.get(referenceId(ref) ?? ""))
          .filter(Boolean)
          .map((observation) => {
            const range = observation!.referenceRange?.[0];
            const rangeText =
              range?.text ??
              (range?.low?.value !== undefined && range?.high?.value !== undefined
                ? `${range.low.value}–${range.high.value}`
                : undefined);

            return {
              name: conceptText(observation!.code) ?? "Observation",
              value:
                observation!.valueQuantity?.value !== undefined
                  ? String(observation!.valueQuantity.value)
                  : (observation!.valueString ?? "—"),
              unit: observation!.valueQuantity?.unit,
              referenceRange: rangeText,
              abnormal: (observation!.interpretation ?? []).some((concept) =>
                (concept.coding ?? []).some((coding) => coding.code && coding.code !== "N")
              ),
            };
          }),
      })) satisfies LabResult[];
  }

  async listPrescriptions(options: { patientId: Id }): Promise<Prescription[]> {
    const bundle = await hisRequest<
      FhirBundle<{
        resourceType: "MedicationRequest";
        id?: string;
        status?: string;
        authoredOn?: string;
        medicationCodeableConcept?: FhirCodeableConcept;
        medicationReference?: FhirReference;
        requester?: FhirReference;
        dosageInstruction?: Array<{
          text?: string;
          doseAndRate?: Array<{ doseQuantity?: { value?: number; unit?: string } }>;
        }>;
      }>
    >({
      path: "MedicationRequest",
      query: { patient: options.patientId, _count: 50, _sort: "-authoredon" },
    });

    return bundleResources(bundle).map((request) => {
      const dose = request.dosageInstruction?.[0]?.doseAndRate?.[0]?.doseQuantity;

      return {
        id: request.id ?? crypto.randomUUID(),
        patientId: options.patientId,
        medication:
          conceptText(request.medicationCodeableConcept) ??
          request.medicationReference?.display ??
          "Medication",
        dosage: dose?.value !== undefined ? `${dose.value}${dose.unit ? ` ${dose.unit}` : ""}` : undefined,
        instructions: request.dosageInstruction?.[0]?.text,
        status:
          request.status === "active" || request.status === "on-hold" || request.status === "completed"
            ? request.status
            : "stopped",
        authoredOn: request.authoredOn ?? "",
        prescriberId: referenceId(request.requester),
      } satisfies Prescription;
    });
  }
}
