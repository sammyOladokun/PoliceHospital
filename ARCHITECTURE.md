# Architecture — Police Hospital Platform

How this codebase is organised, and how it connects to the hospital's local server.

Read this before adding a feature. The short version: **the browser talks only to
Next.js; Next.js talks to the hospital's HIS through one seam (`getHis()`); the
Postgres database is for platform data, never for clinical records.**

---

## 1. Deployment topology

The hospital's clinical data must not leave the hospital's network. That single
constraint drives the whole design.

```
   Patient / staff browser
            │  HTTPS (443)
            ▼
 ┌───────────────────────────────────┐
 │  Reverse proxy (nginx / IIS)      │   TLS termination, rate limits
 │  on the hospital network          │
 └───────────────┬───────────────────┘
                 │  HTTP (3000), loopback or private VLAN
                 ▼
 ┌───────────────────────────────────┐
 │  Next.js app  (node server.js)    │   ← this repo
 │  • public site + search           │
 │  • patient / staff portal         │
 │  • server-side data access only   │
 └──────┬──────────────────┬─────────┘
        │                  │
        │ Prisma           │ HTTPS, private network only
        ▼                  ▼
 ┌──────────────┐   ┌──────────────────────────────────┐
 │ PostgreSQL   │   │  Hospital HIS — LOCAL SERVER     │
 │ platform DB  │   │                                  │
 │              │   │  FHIR R4 API  ◄── facade ──┐     │
 │ accounts     │   │                            │     │
 │ roles        │   │  Legacy HIS core ──────────┘     │
 │ audit log    │   │  (HL7 v2: ADT, ORM, ORU)         │
 │ appt requests│   │  LIS · RIS/PACS · Pharmacy       │
 └──────────────┘   └──────────────────────────────────┘
```

**The browser never contacts the HIS.** Every read goes through a server
component or route handler. `HIS_BASE_URL` is a private address (e.g.
`https://his.pch.local/fhir`) and is not exposed as a `NEXT_PUBLIC_*` variable.

### Why a FHIR facade

An established hospital already runs an HIS, a LIS, and usually a RIS. Those
systems speak **HL7 v2** internally — `ADT` for admissions/discharges/transfers,
`ORM` for lab orders, `ORU` for results — and that is still the dominant format
for internal hospital messaging today. Replacing them is not on the table.

The facade pattern is the standard answer: leave the legacy system running and
put an API layer in front of it that exposes the same records as FHIR R4
resources, translating on demand. We consume that facade. If the hospital later
buys an HIS with a native FHIR R4 endpoint, the same adapter points at it with no
code change.

Practical targets: keep facade responses under ~2 seconds, and cache reference
data (departments, practitioners) rather than polling the HIS per visitor —
`listDepartments()` already does this via `revalidateSeconds: 300`.

### Deploying to the on-premise server

`next.config.mjs` sets `output: "standalone"`, which emits a self-contained
bundle including only the `node_modules` actually needed at runtime. This matters
because the hospital server generally has no npm registry access.

```bash
npm ci
npm run build
# copy .next/standalone, .next/static, public/, and assets/ to the server
node .next/standalone/server.js       # PORT=3000 by default
```

Run it under a process supervisor (systemd, or `nssm`/Windows Service on a
Windows server) so it restarts after a power event — which, on a hospital
generator, is a matter of when and not if.

---

## 2. Directory layout

```
prisma/
  schema.prisma            Platform DB schema (accounts, roles, audit)

src/
  app/                     Next.js App Router — routing and rendering only
    page.tsx               Public landing page
    search/                Search results (server-rendered, works without JS)
    departments/           Department directory + [slug] detail pages
    login/{patient,staff}/ Auth entry points
    dashboard/{patient,staff}/  Portal shells
    api/
      search/route.ts      Public catalogue search — no patient data
      health/route.ts      Readiness probe incl. HIS reachability

  components/              Presentational + interactive UI
    layout/                SiteHeader, SiteFooter
    search/                HeroSearch (client component)

  lib/                     Everything that is not a route or a component
    config/env.ts          Zod-validated environment. Server-only.
    db/prisma.ts           Prisma singleton
    his/                   ── THE HOSPITAL SERVER SEAM ──
      types.ts             Domain model + HisAdapter interface
      client.ts            HTTP transport: timeouts, retries, error wrapping
      data/departments.ts  Canonical department reference data
      adapters/local.ts    Offline fixtures — no hospital server needed
      adapters/fhir.ts     FHIR R4 → domain model mapping
      index.ts             getHis() — picks the adapter from HIS_MODE
    search/
      catalog.ts           Indexed departments, services, conditions
      engine.ts            Scoring and ranking
      contract.ts          /api/search wire types (client-safe)
```

### The rules that keep this from rotting

1. **`src/app/` holds no business logic.** Pages fetch and render. Logic lives in
   `src/lib/`.
2. **Nothing outside `src/lib/his/` knows what FHIR is.** Adapters translate at
   the boundary; features consume the domain types in `his/types.ts`. When the
   hospital changes vendor, one directory changes.
3. **`lib/config/env.ts` and `lib/db/prisma.ts` are server-only.** Never import
   them from a `"use client"` module — it leaks secrets into the browser bundle.
4. **The platform DB is not a clinical mirror.** Do not copy diagnoses, results,
   or prescriptions into Postgres. Read them from the HIS at request time. A
   stale copy of a lab result is a patient-safety problem, not a cache miss.
5. **Adapters throw, they do not return empty.** `HisUnavailableError` lets the
   UI say "we can't reach the hospital system" instead of "you have no results" —
   two very different messages to show a patient.

---

## 3. What is built today

| Area | State |
|---|---|
| Landing page | Done — hero, facilities, services, FAQ, consultation form |
| **Hero search** | **Functional** — live suggestions, keyboard navigation, results page |
| Department directory | Done — `/departments` and `/departments/[slug]` |
| Search API | Done — `GET /api/search?q=` |
| Health probe | Done — `GET /api/health` reports HIS reachability |
| HIS integration seam | Done — `local` and `fhir` adapters behind `getHis()` |
| Login pages | UI only — no authentication wired |
| Dashboards | UI shells with placeholder data |
| Platform DB schema | Users, profiles, sessions only |

### How search works

Three kinds of entry are indexed (`lib/search/catalog.ts`):

- `department` — a clinic or unit
- `service` — something a department does
- `condition` — **a symptom or diagnosis in the words patients actually use**

That third kind is the point. Someone typing `chest pain`, `BP`, `waist pain`, or
`sugar` does not know our department names. Each condition carries synonyms and
abbreviations and routes to the treating department. Searches that map to
Emergency also raise a 24/7 interrupt banner on the results page instead of just
returning a link.

Ranking (`lib/search/engine.ts`) weights an exact keyword hit above a partial
title hit — so `bp` lands on hypertension rather than on any department whose
name happens to contain those letters. The catalogue is a few hundred short
entries, so matching happens in-process; if it ever grows past a few thousand,
replace `search()` and leave the route and UI untouched.

---

## 4. Build order from here

Each phase is independently shippable. Do not start a later phase to avoid a
harder earlier one — phase 1 in particular gates everything clinical.

**Phase 1 — Identity and audit (blocks everything else)**
- Wire NextAuth credentials + role-based middleware on `/dashboard/*`
- Argon2id password hashing; forced reset on first login
- Session timeout suited to shared clinic workstations (~15 min idle)
- Append-only audit log: who read which patient record, when, from where
- Break-glass emergency access, flagged for review

**Phase 2 — Read-only clinical portal (over the HIS seam)**
- Patient: appointments, lab results, prescriptions, visit history
- Staff: today's clinic list, patient lookup by hospital number
- Every screen must degrade gracefully when `HisUnavailableError` is thrown

**Phase 3 — Appointments**
- Patient-initiated requests land in Postgres as *requests*
- Staff confirm; confirmation writes an `Appointment` to the HIS
- Queue/token display for the waiting area

**Phase 4 — Clinical workflow (staff)**
- Encounters, vitals, clinical notes, order entry
- Lab and radiology order → result round trip
- Pharmacy dispensing against HIS prescriptions

**Phase 5 — Revenue and reporting**
- NHIA/HMO verification, authorisation codes, claims
- Billing, receipts, cashier reconciliation
- Management dashboards: throughput, waiting times, department load

**Phase 6 — Extended**
- Telemedicine sessions
- SMS/WhatsApp appointment reminders (Nigerian gateways)
- Offline-tolerant behaviour for power and connectivity interruptions

---

## 5. Compliance and safety

The hospital operates under the **Nigeria Data Protection Act 2023 (NDPA)**,
which classifies health data as **sensitive personal data** and applies to
hospitals, laboratories, pharmacies, HMOs, and EMR/telemedicine providers alike.
The Act obliges health facilities to put controls in place preventing
unauthorised access to patient records, and to protect the storage system holding
them. It also covers manual processing, not only automated — relevant here
because paper records will coexist with this system for some time.

Concretely, this means:

- **Access control by role, enforced server-side.** Never rely on hiding a UI
  element. Phase 1 is not optional.
- **Audit every clinical read, not only writes.** "Who looked at this record" is
  the question that actually gets asked after an incident.
- **Data minimisation at the boundary.** Request only the FHIR fields a screen
  renders. Do not pull whole patient bundles "in case".
- **No patient data in logs, error messages, URLs, or analytics.** URLs end up in
  proxy logs and browser history on shared workstations.
- **No caching of portal responses** — enforced by the `/dashboard/*`
  `Cache-Control: no-store` header in `next.config.mjs`.
- **Encrypted backups of the platform DB, restore-tested.** An untested backup is
  not a backup.
- Retention and consent policies need a decision from hospital management before
  Phase 2 ships; they are policy, not code.

---

## 6. Operating notes

**Check the app can see the hospital server:**

```bash
curl http://localhost:3000/api/health
```

`200` with `"status":"ok"` means healthy. `503` `"degraded"` means the HIS is
unreachable — `checks.his.error` says why. `checks.his.mode` shows whether the
app is on live data (`fhir`) or repo fixtures (`local`); if a production host
ever reports `local`, the environment is misconfigured.

**Known gaps to close before go-live:**

- `HIS_ALLOW_SELF_SIGNED` is parsed but not yet applied to the fetch agent. Node
  needs an explicit `https.Agent` with a pinned CA — prefer installing the
  hospital CA on the host over trusting self-signed certificates.
- The FHIR adapter implements reads only. Writes must follow the hospital's own
  ordering and authorisation rules, so add them one workflow at a time.
- The patient MRN identifier system URI is hospital-specific. Configure it on the
  facade so `findPatientByHospitalNo()` stays a plain identifier search.
- Landing-page section copy in `src/app/page.tsx` still duplicates department
  names alongside `lib/his/data/departments.ts`. Fold the presentational arrays
  into the canonical data (they carry images and icons the domain type does not)
  so there is one source of truth.

---

## 7. References

- [FHIR R4 for healthcare app integration](https://www.ailoitte.com/blog/fhir-r4-health-app-integration/)
- [HL7 and FHIR integration: where healthcare APIs break](https://saigontechnology.com/blog/hl7-fhir-integration/)
- [FHIR facade pattern explained](https://www.nexirait.co.uk/standards/fhir-facade.html)
- [Integrating FHIR into legacy EHR/EMR systems](https://edenlab.io/blog/fhir-for-legacy-ehr-integration)
- [FHIR facade architecture guide](https://nirmitee.io/blog/fhir-facade-complete-architecture-guide-modernizing-legacy-healthcare-systems/)
- [Next.js deployment and self-hosting](https://nextjs.org/docs/app/getting-started/deploying)
- [Next.js `output: standalone`](https://nextjs.org/docs/pages/api-reference/config/next-config-js/output)
- [NDPA 2023: relevant provisions for health care delivery in Nigeria](https://www.mondaq.com/nigeria/data-protection/1434994/nigeria-data-protection-act-2023-relevant-provisions-for-health-care-delivery-in-nigeria)
- [Relevance of the NDPA 2023 to Nigerian healthcare facilities](https://www.mondaq.com/nigeria/data-protection/1514720/the-relevance-of-the-nigeria-data-protection-act-2023-to-healthcare-facilities-in-nigeria)
