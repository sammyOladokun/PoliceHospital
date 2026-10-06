"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowSquareOut, CalendarCheck, Phone, X } from "@phosphor-icons/react/dist/ssr";

import { bookingEmbedUrl, bookingProvider, bookingUrl, phoneLines } from "@/lib/contact";

const providerLabel = {
  calendly: "Scheduling by Calendly",
  google: "Scheduling by Google Calendar",
  other: "Online scheduling"
} as const;

/**
 * "Book Now" trigger. Opens a dialog with the hospital's live scheduling page
 * (Calendly or a Google Calendar appointment schedule, see `lib/contact.ts`)
 * so patients pick a real open slot instead of waiting for a callback.
 */
export function BookingButton({
  children,
  className,
  style,
  onOpen
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        style={style}
        aria-haspopup="dialog"
        onClick={() => {
          onOpen?.();
          setOpen(true);
        }}
      >
        {children}
      </button>
      {open ? <BookingDialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}

/**
 * The dialog on its own, for triggers that unmount when clicked (e.g. a button
 * inside a menu that closes) — the caller owns the open state so the dialog
 * outlives its trigger.
 */
export function BookingDialog({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    // Calendly wants the host page's domain; only known in the browser.
    if (bookingUrl) setEmbedSrc(bookingEmbedUrl(bookingUrl, window.location.hostname));

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      previousFocus?.focus?.();
    };
  }, [handleKey]);

  return createPortal(
    <div className="booking-overlay fixed inset-0 z-[1000] flex items-end justify-center bg-[#05123a]/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="booking-panel flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_40px_100px_rgba(5,18,58,0.45)] sm:rounded-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 bg-[#071a45] px-5 py-4 text-white sm:px-7 sm:py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5b301] text-[#071a45]">
              <CalendarCheck size={20} weight="fill" />
            </span>
            <div>
              <h2 id="booking-title" className="font-display text-2xl leading-none">
                Book an appointment
              </h2>
              <p className="mt-1 text-[12px] text-white/60">
                {bookingUrl ? `${providerLabel[bookingProvider(bookingUrl)]} · pick any open slot` : "Speak to our front desk"}
              </p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close booking"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f5b301]"
          >
            <X size={18} />
          </button>
        </div>

        {bookingUrl ? (
          <div className="relative min-h-[520px] flex-1 bg-[#f3f5fb] sm:min-h-[600px]">
            {!loaded ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-slate-500">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#0a2a6b]/20 border-t-[#0a2a6b]" />
                Loading available times…
              </div>
            ) : null}
            {embedSrc ? (
              <iframe
                src={embedSrc}
                title="Appointment booking calendar"
                className="absolute inset-0 h-full w-full border-0"
                onLoad={() => setLoaded(true)}
              />
            ) : null}
          </div>
        ) : (
          <div className="px-5 py-8 sm:px-7">
            <p className="text-sm leading-7 text-slate-600">
              Call either line below and our front desk will book a time that suits you. For emergencies, come
              straight to the Emergency entrance at the Main Block.
            </p>
            <Link
              href="/#consult"
              onClick={onClose}
              className="mt-4 inline-flex text-sm font-semibold text-[#0a2a6b] underline-offset-4 hover:underline"
            >
              Or leave your details and we will call you back →
            </Link>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 px-5 py-3.5 text-[13px] sm:px-7">
          <span className="mr-1 text-slate-500">Prefer to call?</span>
          {phoneLines.map((line) => (
            <a
              key={line.tel}
              href={`tel:${line.tel}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0a2a6b]/10 px-3 py-1.5 font-semibold text-[#0a2a6b] transition hover:bg-[#0a2a6b] hover:text-white"
            >
              <Phone size={14} weight="fill" /> {line.display}
            </a>
          ))}
          {bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-slate-500 transition hover:text-[#0a2a6b]"
            >
              Open in new tab <ArrowSquareOut size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
