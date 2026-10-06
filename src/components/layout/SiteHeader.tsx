import Image from "next/image";
import Link from "next/link";

import { BookingButton } from "@/components/booking/BookingButton";
import { LoginMenu } from "@/components/layout/LoginMenu";
import { ShuttleMarquee } from "@/components/layout/ShuttleMarquee";
import { SHOW_LOGIN } from "@/lib/features";

import brandLogo from "../../../assets/brand_logo.png";

/**
 * Solid header for interior public pages (search, departments).
 *
 * The landing page keeps its own transparent header overlaid on the hero image,
 * so the two are intentionally separate components rather than one component
 * with a `variant` prop.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[#071a45]/95 text-white backdrop-blur">
      <div className="section-shell flex items-center justify-between py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src={brandLogo} alt="" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
          <div>
            <p className="font-display text-lg leading-none tracking-tight sm:text-xl">Police Hospital</p>
            <p className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-white/55">Police College, Ikeja</p>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Shown at every width when enabled — the login route must never be phone-only-unreachable. */}
          {SHOW_LOGIN ? <LoginMenu /> : null}
          <BookingButton className="rounded-full bg-[#f5b301] px-4 py-2.5 text-sm font-semibold text-[#071a45] transition hover:bg-[#ffc21f] sm:px-5">
            Book Now
          </BookingButton>
        </div>
      </div>
      <ShuttleMarquee />
    </header>
  );
}
