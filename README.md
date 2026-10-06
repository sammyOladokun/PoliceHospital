# Police Hospital

This repo is being set up as a secure hospital platform for Police Hospital with separate access for patients and staff.

> **See [ARCHITECTURE.md](ARCHITECTURE.md)** for the directory layout, the seam that connects this app to the
> hospital's local HIS server, the build order, and NDPA compliance notes. Read it before adding a feature.

## Recommended stack

- **Frontend / full-stack app:** Next.js + TypeScript
- **UI:** Tailwind CSS v4
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** NextAuth.js with role-based access control
- **Optional cache / queues:** Redis
- **Deployment:** Docker for local parity, then a cloud host that supports Node.js and managed Postgres

## Why this stack

- Fast to ship a patient/staff portal in one codebase
- Strong TypeScript typing across UI, server, and database
- Easy role-based login flows for patients, nurses, doctors, admins, and support staff
- Good path to scale into appointment booking, records, billing, pharmacy, labs, and reporting

## High-level product flow

1. Public landing page
2. Patient registration and login
3. Staff login with role-based access
4. Patient dashboard for appointments, visits, prescriptions, results, and messages
5. Staff dashboard for queues, notes, vitals, encounters, and administration
6. Admin area for users, roles, departments, audit logs, and system settings

## Initial modules

- Authentication and authorization
- Patient profiles
- Staff profiles
- Appointments and queue management
- Clinical encounters and notes
- Lab and pharmacy workflow
- Notifications and audit trail

## Local setup

The public site, search, and department pages run with **no database and no hospital server**
(`HIS_MODE=local` serves reference data from the repo), so start here:

1. Copy `.env.example` to `.env`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```

Postgres is only needed once you start on authentication and the portal (Phase 1 in
[ARCHITECTURE.md](ARCHITECTURE.md)):

```bash
docker compose up -d     # Postgres + Redis
npm run db:generate      # Prisma client
npm run db:push          # apply schema
```

## Connecting to the hospital's local server

Set these in `.env` and restart. Nothing else changes — every feature reads through the same
`getHis()` seam.

```ini
HIS_MODE="fhir"
HIS_BASE_URL="https://his.pch.local/fhir"   # private network address only
HIS_API_KEY="..."
```

Confirm connectivity with `curl http://localhost:3000/api/health` — it reports whether the app can
see the HIS, and which mode it is running in.

## Build order

See [ARCHITECTURE.md §4](ARCHITECTURE.md#4-build-order-from-here). In short: identity and audit
first (it gates everything clinical), then the read-only clinical portal, then appointments,
clinical workflow, and billing/reporting.
