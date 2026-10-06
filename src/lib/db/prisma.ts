/**
 * Prisma client singleton.
 *
 * Next.js dev mode reloads modules on every edit; without the global cache each
 * reload opens a new connection pool and exhausts Postgres within minutes.
 *
 * Scope note: this database holds *platform* data — accounts, roles, audit log,
 * portal preferences, appointment requests raised from the portal. The clinical
 * record of truth stays in the hospital's HIS and is read through `getHis()`.
 * Do not mirror diagnoses, results, or prescriptions into these tables.
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
