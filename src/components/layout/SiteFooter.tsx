import Image from "next/image";
import Link from "next/link";
import { ChatCenteredDots, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";

import { phoneLines } from "@/lib/contact";

import brandLogo from "../../../assets/brand_logo.png";

/** Compact footer for interior public pages. */
export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#0a2a6b] py-12 text-white">
      <div className="section-shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image src={brandLogo} alt="" className="h-11 w-11 object-contain" />
              <div>
                <p className="font-display text-xl leading-none">Police Hospital</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.24em] text-white/55">Police College, Ikeja</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Specialist healthcare for police personnel, their families, and the general public.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Access</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li>
                  <Link href="/" className="transition hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/departments" className="transition hover:text-white">
                    Departments
                  </Link>
                </li>
                <li>
                  <Link href="/login/patient" className="transition hover:text-white">
                    Patient portal
                  </Link>
                </li>
                <li>
                  <Link href="/login/staff" className="transition hover:text-white">
                    Staff portal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Contact</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#f5b301]" /> Police College, GRA Ikeja, Lagos
                </li>
                {phoneLines.map((line) => (
                  <li key={line.tel} className="flex items-start gap-2.5">
                    <Phone size={16} className="mt-0.5 shrink-0 text-[#f5b301]" />
                    <a href={`tel:${line.tel}`} className="transition hover:text-white">
                      {line.display}
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-2.5">
                  <ChatCenteredDots size={16} className="mt-0.5 shrink-0 text-[#f5b301]" /> help@policehospital.ng
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-5 text-sm text-white/55">
          © 2026 Police Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
