"use client";

import { useState } from "react";
import Link from "next/link";
import { IdentificationCard, UserCircle } from "@phosphor-icons/react/dist/ssr";

import { BookingDialog } from "@/components/booking/BookingButton";
import { bookingPageUrl, bookingUrl } from "@/lib/contact";

const menuLinks = [
  { label: "Search", href: "/search" },
  { label: "Facilities", href: "/#facilities" },
  { label: "Services", href: "/#services" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#consult" },
];

export function SiteMenuButton({
  showLogin,
  firstLink,
}: {
  showLogin: boolean;
  firstLink: { label: string; href: string };
}) {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5b301]"
      >
        <span className="flex h-4 w-6 flex-col justify-between">
          <span className={`h-[2.5px] w-full origin-center rounded-full bg-[#f5b301] transition-all duration-300 ${open ? "translate-y-[6.75px] rotate-45" : ""}`} />
          <span className={`h-[2.5px] w-full rounded-full bg-[#f5b301] transition-all duration-200 ${open ? "scale-x-0 opacity-0" : "opacity-100"}`} />
          <span className={`h-[2.5px] w-full origin-center rounded-full bg-[#f5b301] transition-all duration-300 ${open ? "-translate-y-[6.75px] -rotate-45" : ""}`} />
        </span>
      </button>

      {open ? (
        <div
          id="site-mobile-menu"
          className="absolute right-0 top-full z-50 mt-3 w-[min(280px,88vw)] rounded-[24px] border border-white/15 bg-[#071a45] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
        >
          <div className="flex flex-col gap-2">
            {[firstLink, ...menuLinks].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            {showLogin ? (
              <>
                <div className="my-1 h-px bg-white/10" />
                <Link
                  href="/login/patient"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                >
                  <UserCircle size={20} weight="fill" className="text-[#f5b301]" /> Patient Login
                </Link>
                <Link
                  href="/login/staff"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                >
                  <IdentificationCard size={20} weight="fill" className="text-[#f5b301]" /> Staff Login
                </Link>
              </>
            ) : null}

            <button
              type="button"
              aria-haspopup={bookingUrl ? undefined : "dialog"}
              onClick={() => {
                setOpen(false);
                if (bookingUrl) {
                  window.open(bookingPageUrl(bookingUrl), "_blank", "noopener,noreferrer");
                } else {
                  setBookingOpen(true);
                }
              }}
              className="mt-2 rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-[#071a45] transition hover:bg-[#f5b301]"
            >
              Book Now
            </button>
          </div>
        </div>
      ) : null}
      {bookingOpen ? <BookingDialog onClose={() => setBookingOpen(false)} /> : null}
    </div>
  );
}
