import type { ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import brandLogo from "../../../../assets/brand_logo.png";
import {
  SquaresFour,
  CalendarCheck,
  TestTube,
  Pill,
  ChatCircleDots,
  Gear,
  Bell,
  SignOut,
  ArrowRight,
  Clock,
  MapPin,
  UserCircle
} from "@phosphor-icons/react/dist/ssr";

type NavIconType = ComponentType<{ size?: number; weight?: "regular" | "fill"; className?: string }>;

const navItems: { label: string; icon: NavIconType; active?: boolean }[] = [
  { label: "Overview", icon: SquaresFour, active: true },
  { label: "Appointments", icon: CalendarCheck },
  { label: "Test Results", icon: TestTube },
  { label: "Prescriptions", icon: Pill },
  { label: "Messages", icon: ChatCircleDots },
  { label: "Settings", icon: Gear }
];

const stats = [
  { label: "Upcoming Appointments", value: "2", icon: CalendarCheck, tint: "bg-[#0a2a6b]/10 text-[#0a2a6b]" },
  { label: "Pending Results", value: "1", icon: TestTube, tint: "bg-[#f5b301]/15 text-[#b07d00]" },
  { label: "Active Prescriptions", value: "3", icon: Pill, tint: "bg-[#1f8f4e]/12 text-[#157a41]" },
  { label: "Unread Messages", value: "4", icon: ChatCircleDots, tint: "bg-[#0a2a6b]/10 text-[#0a2a6b]" }
];

const quickActions = ["Book appointment", "Message care team", "Request a refill", "View latest results"];

const activity = [
  { title: "Lab result ready — Full Blood Count", time: "Today, 9:24 AM", tone: "text-[#157a41]" },
  { title: "Appointment confirmed with Dr. Adeyemi", time: "Yesterday, 4:10 PM", tone: "text-[#0a2a6b]" },
  { title: "Prescription refilled — Amlodipine 5mg", time: "12 Jul 2026", tone: "text-[#b07d00]" },
  { title: "New message from Pharmacy", time: "10 Jul 2026", tone: "text-[#0a2a6b]" }
];

export default function PatientDashboardPage() {
  return (
    <main className="min-h-screen bg-[#f3f5fb] lg:flex">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-[#071a45] px-4 py-6 text-white lg:flex">
        <Link href="/" className="flex items-center gap-3 px-2">
          <Image src={brandLogo} alt="" className="h-10 w-10 object-contain" />
          <div>
            <p className="font-display text-lg leading-none">Police Hospital</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/50">Patient Portal</p>
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
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Patient</p>
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
              <span className="hidden text-sm font-semibold text-slate-700 sm:block">Victor O.</span>
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
            <h2 className="font-display text-2xl text-[#0a2a6b] sm:text-3xl">Welcome back, Victor 👋</h2>
            <p className="mt-1 text-[13px] text-slate-500 sm:text-sm">{"Here's a quick look at your care today."}</p>
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

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            {/* Next appointment */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a2a6b] to-[#05123a] p-6 text-white shadow-[0_18px_45px_rgba(5,18,58,0.25)] sm:p-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f5b301]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f5b301]">
                Next appointment
              </span>
              <h3 className="font-display mt-4 text-2xl">Dr. Adeyemi — Cardiology</h3>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                <span className="flex items-center gap-2"><CalendarCheck size={17} className="text-[#f5b301]" /> Fri, 18 Jul 2026</span>
                <span className="flex items-center gap-2"><Clock size={17} className="text-[#f5b301]" /> 10:30 AM</span>
                <span className="flex items-center gap-2"><MapPin size={17} className="text-[#f5b301]" /> Consulting Room 3</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-[#f5b301] px-5 py-2.5 text-sm font-semibold text-[#071a45] transition hover:bg-[#ffc21f]">Reschedule</button>
                <button className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">Add to calendar</button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(19,27,34,0.05)]">
              <h3 className="font-display text-xl text-[#0a2a6b]">Quick actions</h3>
              <div className="mt-4 grid gap-2.5">
                {quickActions.map((action) => (
                  <a
                    key={action}
                    href="#"
                    className="group flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#0a2a6b] hover:text-white"
                  >
                    {action}
                    <ArrowRight size={16} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#f5b301]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(19,27,34,0.05)]">
            <h3 className="font-display text-xl text-[#0a2a6b]">Recent activity</h3>
            <ul className="mt-4 divide-y divide-slate-100">
              {activity.map((item) => (
                <li key={item.title} className="flex items-center justify-between gap-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 shrink-0 rounded-full bg-current ${item.tone}`} />
                    <span className="text-sm text-slate-700">{item.title}</span>
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
