"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import brandLogo from "../../../../assets/brand_logo.png";
import sideImg from "../../../../assets/building.jpeg";
import {
  Eye,
  EyeSlash,
  Lock,
  EnvelopeSimple,
  ArrowLeft,
  ArrowRight,
  CheckCircle
} from "@phosphor-icons/react/dist/ssr";

const highlights = [
  "View appointments, results & prescriptions",
  "Message your care team securely",
  "NHIA / HMO support in one place"
];

export default function PatientLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f3f5fb] lg:grid lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden lg:block">
        <Image src={sideImg} alt="Police Hospital, Ikeja" fill priority sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2a6b]/95 via-[#071a45]/92 to-[#05123a]/96" />
        <div className="relative flex h-full flex-col justify-between p-10 text-white xl:p-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src={brandLogo} alt="" className="h-12 w-12 object-contain" />
            <div>
              <p className="font-display text-xl leading-none">Police Hospital</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/60">Police College, Ikeja</p>
            </div>
          </Link>

          <div>
            <span className="block h-1 w-12 rounded-full bg-[#f5b301]" />
            <h2 className="font-display mt-5 max-w-md text-4xl leading-tight">
              Your health records, all in one secure place
            </h2>
            <ul className="mt-7 space-y-3 text-sm text-white/80">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle size={20} weight="fill" className="shrink-0 text-[#f5b301]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/45">© 2026 Police Hospital. All rights reserved.</p>
        </div>
      </aside>

      {/* Form panel */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-3 lg:hidden">
            <Image src={brandLogo} alt="" className="h-11 w-11 object-contain" />
            <div>
              <p className="font-display text-lg leading-none text-[#0a2a6b]">Police Hospital</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-slate-400">Police College, Ikeja</p>
            </div>
          </Link>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#f5b301]/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b07d00]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f5b301]" /> Patient Portal
          </span>
          <h1 className="font-display mt-3 text-3xl text-[#0a2a6b] sm:text-4xl">Welcome back</h1>
          <p className="mt-2 text-[13px] leading-6 text-slate-500 sm:text-sm">
            Sign in to access your appointments, results, and prescriptions.
          </p>

          <form className="mt-8 space-y-4" onSubmit={(event) => event.preventDefault()}>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Email or Patient ID</span>
              <div className="mt-2 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[#0a2a6b]/40">
                <EnvelopeSimple size={18} className="shrink-0 text-slate-400" />
                <input
                  type="text"
                  placeholder="you@example.com"
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
                Remember me
              </label>
              <a href="#" className="font-semibold text-[#0a2a6b] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f5b301] px-6 py-3.5 text-sm font-semibold text-[#071a45] shadow-[0_12px_30px_rgba(245,179,1,0.3)] transition hover:-translate-y-0.5 hover:bg-[#ffc21f]"
            >
              Sign in <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-slate-500">
            Are you a staff member?{" "}
            <Link href="/login/staff" className="font-semibold text-[#0a2a6b] hover:underline">
              Staff login
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
    </main>
  );
}
