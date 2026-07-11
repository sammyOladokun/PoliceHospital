# Police Hospital

This repo is being set up as a secure hospital platform for Police Hospital with separate access for patients and staff.

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

1. Copy `.env.example` to `.env`
2. Start infrastructure:
   ```bash
   docker compose up -d
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Generate Prisma client:
   ```bash
   npm run db:generate
   ```
5. Push schema to database:
   ```bash
   npm run db:push
   ```
6. Start the app:
   ```bash
   npm run dev
   ```

## Suggested next build phase

- Scaffold authentication pages
- Add dashboard shells for patient and staff
- Build role-based route protection
- Add appointment booking and queueing
- Add patient records and staff workflow screens
