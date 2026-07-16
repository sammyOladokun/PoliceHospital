import type { ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import brandLogo from "../../../../assets/brand_logo.png";
import {
  SquaresFour,
  UsersThree,
  Stethoscope,
  ClipboardText,
  CalendarBlank,
  ShieldCheck,
  Bell,
  SignOut,
  ArrowRight,
  Clock,
  UserCircle
} from "@phosphor-icons/react/dist/ssr";

type NavIconType = ComponentType<{ size?: number; weight?: "regular" | "fill"; className?: string }>;

const navItems: { label: string; icon: NavIconType; active?: boolean }[] = [
  { label: "Overview", icon: SquaresFour, active: true },
  { label: "Patient Queue", icon: UsersThree },
  { label: "Encounters", icon: Stethoscope },
  { label: "Orders", icon: ClipboardText },
  { label: "Schedule", icon: CalendarBlank },
  { label: "Admin", icon: ShieldCheck }
];

const stats = [
  { label: "Patients in Queue", value: "8", icon: UsersThree, tint: "bg-[#0a2a6b]/10 text-[#0a2a6b]" },
  { label: "Today's Encounters", value: "24", icon: Stethoscope, tint: "bg-[#1f8f4e]/12 text-[#157a41]" },
  { label: "Pending Orders", value: "5", icon: ClipboardText, tint: "bg-[#f5b301]/15 text-[#b07d00]" },
  { label: "Open Tasks", value: "3", icon: ShieldCheck, tint: "bg-[#0a2a6b]/10 text-[#0a2a6b]" }
];

const queue = [
  { name: "Amina Bello", detail: "Cardiology · Follow-up", wait: "5 min", status: "Ready", tone: "bg-[#1f8f4e]/12 text-[#157a41]" },
  { name: "Chidi Okonkwo", detail: "General Medicine · New", wait: "12 min", status: "Waiting", tone: "bg-[#f5b301]/15 text-[#b07d00]" },
  { name: "Grace Eze", detail: "Paediatrics · Review", wait: "18 min", status: "Waiting", tone: "bg-[#f5b301]/15 text-[#b07d00]" },
  { name: "Musa Ibrahim", detail: "Orthopaedics · Triage", wait: "25 min", status: "Triage", tone: "bg-[#0a2a6b]/10 text-[#0a2a6b]" }
];

const schedule = [
  { time: "09:00", item: "Ward round — Medical Ward A" },
  { time: "11:30", item: "Clinic — Outpatient Cardiology" },
  { time: "14:00", item: "MDT meeting — Case reviews" },
  { time: "16:00", item: "Theatre list — Minor procedures" }
];

export default function StaffDashboardPage() {
  return (
    <main className="min-h-screen bg-[#f3f5fb] lg:flex">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-[#071a45] px-4 py-6 text-white lg:flex">
        <Link href="/" className="flex items-center gap-3 px-2">
          <Image src={brandLogo} alt="" className="h-10 w-10 object-contain" />
          <div>
            <p className="font-display text-lg leading-none">Police Hospital</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/50">Staff Portal</p>
          </div>
        </Link>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {navItems.map(({ label, icon: NavIcon, active }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active ? "bg-[#f5b301] text-[#071a45]" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <NavIcon size={20} weight={active ? "fill" : "regular"} className="shrink-0" />
              {label}
            </a>
          ))}
        </nav>

        <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white">
          <SignOut size={20} className="shrink-0" /> Sign out
        </a>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-3.5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <Image src={brandLogo} alt="" className="h-9 w-9 object-contain lg:hidden" />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Staff</p>
              <h1 className="font-display text-lg leading-none text-[#0a2a6b] sm:text-xl">Overview</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200">
              <Bell size={19} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#f5b301] ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 py-1.5 pl-1.5 pr-3">
              <UserCircle size={30} weight="fill" className="text-[#0a2a6b]" />
              <span className="hidden text-sm font-semibold text-slate-700 sm:block">Dr. Okafor</span>
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-5 py-3 lg:hidden">
          {navItems.map(({ label, icon: NavIcon, active }) => (
            <a
              key={label}
              href="#"
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium transition ${
                active ? "bg-[#0a2a6b] text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              <NavIcon size={16} className="shrink-0" />
              {label}
            </a>
          ))}
        </nav>

        {/* Content */}
        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <div>
            <h2 className="font-display text-2xl text-[#0a2a6b] sm:text-3xl">Good morning, Dr. Okafor</h2>
            <p className="mt-1 text-[13px] text-slate-500 sm:text-sm">{"Here's your clinical snapshot for today."}</p>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {stats.map(({ label, value, icon: StatIcon, tint }) => (
              <div key={label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_10px_30px_rgba(19,27,34,0.05)] sm:p-5">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}>
                  <StatIcon size={20} weight="fill" />
                </span>
                <p className="font-display mt-3 text-3xl text-[#0a2a6b]">{value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.1em] text-slate-400 sm:text-xs">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            {/* Patient queue */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(19,27,34,0.05)]">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl text-[#0a2a6b]">Patient queue</h3>
                <a href="#" className="flex items-center gap-1 text-sm font-semibold text-[#0a2a6b] hover:underline">
                  View all <ArrowRight size={15} />
                </a>
              </div>
              <ul className="mt-4 divide-y divide-slate-100">
                {queue.map((patient) => (
                  <li key={patient.name} className="flex items-center justify-between gap-4 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a2a6b]/10 font-display text-sm text-[#0a2a6b]">
                        {patient.name.split(" ").map((part) => part[0]).join("")}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">{patient.name}</p>
                        <p className="truncate text-xs text-slate-400">{patient.detail}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="hidden items-center gap-1 text-xs text-slate-400 sm:flex">
                        <Clock size={14} /> {patient.wait}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${patient.tone}`}>{patient.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Today's schedule */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(19,27,34,0.05)]">
              <h3 className="font-display text-xl text-[#0a2a6b]">{"Today's schedule"}</h3>
              <ul className="mt-4 space-y-3">
                {schedule.map((slot) => (
                  <li key={slot.time} className="flex gap-3">
                    <span className="font-display text-sm font-semibold text-[#b07d00]">{slot.time}</span>
                    <span className="border-l-2 border-slate-100 pl-3 text-sm text-slate-600">{slot.item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#0a2a6b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d3488]"
              >
                Open full schedule <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
