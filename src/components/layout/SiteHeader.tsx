import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";

import { BookingButton } from "@/components/booking/BookingButton";
import { LoginMenu } from "@/components/layout/LoginMenu";
import { SiteMenuButton } from "@/components/layout/SiteMenuButton";
import { ShuttleMarquee } from "@/components/layout/ShuttleMarquee";
import { SHOW_LOGIN } from "@/lib/features";

import brandLogo from "../../../assets/brand_logo.png";

const navLinks = [
  { label: "Facilities", href: "/#facilities" },
  { label: "Services", href: "/#services" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#consult" },
] as const;

/**
 * Solid header for interior public pages (search, departments).
 *
 * The landing page keeps its own transparent header overlaid on the hero image,
 * so the two are intentionally separate components rather than one component
 * with a `variant` prop.
 */
export function SiteHeader({
  action = "book",
  navFirstLink = "departments",
}: {
  action?: "book" | "menu";
  navFirstLink?: "departments" | "blogs";
}) {
  const firstLink: { label: string; href: Route } = navFirstLink === "blogs"
    ? { label: "Blogs", href: "/#blog" as Route }
    : { label: "Departments", href: "/departments" };
  const pageNavLinks = [firstLink, ...navLinks];

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

        {action === "menu" ? (
          <div className="flex items-center gap-5">
            <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
              {pageNavLinks.map((link) => (
                <Link key={link.label} href={link.href as Route} className="text-sm font-medium text-white/80 transition hover:text-white">
                  {link.label}
                </Link>
              ))}
              {SHOW_LOGIN ? <LoginMenu /> : null}
            </nav>
            <div className="hidden lg:block">
              <BookingButton className="rounded-full bg-[#f5b301] px-5 py-2.5 text-sm font-semibold text-[#071a45] transition hover:bg-[#ffc21f]">
                Book Now
              </BookingButton>
            </div>
            <div className="lg:hidden">
              <SiteMenuButton showLogin={SHOW_LOGIN} firstLink={firstLink} />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-4">
            {SHOW_LOGIN ? <LoginMenu /> : null}
            <BookingButton className="rounded-full bg-[#f5b301] px-4 py-2.5 text-sm font-semibold text-[#071a45] transition hover:bg-[#ffc21f] sm:px-5">
              Book Now
            </BookingButton>
          </div>
        )}
      </div>
      <ShuttleMarquee />
    </header>
  );
}
