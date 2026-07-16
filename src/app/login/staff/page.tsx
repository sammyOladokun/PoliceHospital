"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import brandLogo from "../../../../assets/brand_logo.png";
import sideImg from "../../../../assets/hero.jpeg";
import {
  Eye,
  EyeSlash,
  Lock,
  IdentificationCard,
  ArrowLeft,
  ArrowRight,
  ShieldCheck
} from "@phosphor-icons/react/dist/ssr";

const highlights = [
  "Manage patient queues & encounters",
  "Place and track clinical orders",
  "Secure, role-based staff access"
];

export default function StaffLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f3f5fb] lg:grid lg:grid-cols-2">
      {/* Form panel (left on desktop for staff) */}
      <section className="order-2 flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:order-1">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-3 lg:hidden">
            <Image src={brandLogo} alt="" className="h-11 w-11 object-contain" />
            <div>
              <p className="font-display text-lg leading-none text-[#0a2a6b]">Police Hospital</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-slate-400">Police College, Ikeja</p>
            </div>
          </Link>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#1f8f4e]/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#157a41]">
            <ShieldCheck size={13} weight="fill" /> Staff Portal
          </span>
          <h1 className="font-display mt-3 text-3xl text-[#0a2a6b] sm:text-4xl">Staff sign in</h1>
          <p className="mt-2 text-[13px] leading-6 text-slate-500 sm:text-sm">
            Access queues, encounters, orders, and administrative tools.
          </p>

          <form className="mt-8 space-y-4" onSubmit={(event) => event.preventDefault()}>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Staff ID or Email</span>
              <div className="mt-2 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[#0a2a6b]/40">
                <IdentificationCard size={18} className="shrink-0 text-slate-400" />
                <input
                  type="text"
                  placeholder="PH-00000 or you@policehospital.ng"
                  autoComplete="username"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Password</span>
              <div className="mt-2 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[#0a2a6b]/40">
                <Lock size={18} className="shrink-0 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-slate-400 transition hover:text-[#0a2a6b]"
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-slate-500">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-[#0a2a6b]" />
                Keep me signed in
              </label>
              <a href="#" className="font-semibold text-[#0a2a6b] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0a2a6b] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(10,42,107,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0d3488]"
            >
              Sign in <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-slate-500">
            Are you a patient?{" "}
            <Link href="/login/patient" className="font-semibold text-[#0a2a6b] hover:underline">
              Patient login
            </Link>
          </p>

          <Link
            href="/"
            className="mt-8 flex items-center justify-center gap-2 text-[13px] font-medium text-slate-400 transition hover:text-[#0a2a6b]"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
        </div>
      </section>

      {/* Brand panel */}
      <aside className="relative order-1 hidden overflow-hidden lg:order-2 lg:block">
        <Image src={sideImg} alt="Police Hospital care team" fill priority sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-bl from-[#0a2a6b]/95 via-[#071a45]/92 to-[#05123a]/96" />
        <div className="relative flex h-full flex-col justify-between p-10 text-white xl:p-12">
          <Link href="/" className="flex items-center gap-3 self-end">
            <div className="text-right">
              <p className="font-display text-xl leading-none">Police Hospital</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/60">Police College, Ikeja</p>
            </div>
            <Image src={brandLogo} alt="" className="h-12 w-12 object-contain" />
          </Link>

          <div className="text-right">
            <span className="ml-auto block h-1 w-12 rounded-full bg-[#f5b301]" />
            <h2 className="font-display mt-5 ml-auto max-w-md text-4xl leading-tight">
              Everything your team needs, in one workspace
            </h2>
            <ul className="mt-7 space-y-3 text-sm text-white/80">
              {highlights.map((item) => (
                <li key={item} className="flex items-center justify-end gap-3">
                  {item}
                  <ShieldCheck size={20} weight="fill" className="shrink-0 text-[#f5b301]" />
                </li>
              ))}
            </ul>
          </div>

          <p className="text-right text-xs text-white/45">© 2026 Police Hospital. All rights reserved.</p>
        </div>
      </aside>
    </main>
  );
}
