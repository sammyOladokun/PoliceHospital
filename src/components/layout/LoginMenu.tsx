"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CaretDown, IdentificationCard, UserCircle } from "@phosphor-icons/react/dist/ssr";

/**
 * Header "Login" menu.
 *
 * Driven by state rather than `:hover` alone. A hover-only menu is unreachable
 * three ways: by keyboard (Tab never opens it), by touch (a tablet at desktop
 * width has no hover), and by screen reader (no expanded state to announce).
 * Hover is kept as an affordance on pointer devices, but click, Enter, Space,
 * and Escape all work too.
 */
export function LoginMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") return;
        clearCloseTimer();
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "touch") return;
        clearCloseTimer();
        closeTimer.current = window.setTimeout(() => setOpen(false), 140);
      }}
      // Keyboard focus anywhere inside keeps the menu open.
      onFocus={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1 rounded-full text-sm font-medium text-white/80 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5b301]"
      >
        Login
        <CaretDown
          size={12}
          weight="bold"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div role="menu" aria-label="Login options" className="absolute right-0 top-full z-30 pt-3">
          <div className="w-52 rounded-2xl bg-white p-2 shadow-[0_20px_50px_rgba(5,18,58,0.22)]">
            <Link
              role="menuitem"
              href="/login/patient"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#0a2a6b] transition hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
            >
              <UserCircle size={20} weight="fill" className="text-[#0a2a6b]" /> Patient Login
            </Link>
            <Link
              role="menuitem"
              href="/login/staff"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#0a2a6b] transition hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
            >
              <IdentificationCard size={20} weight="fill" className="text-[#1f8f4e]" /> Staff Login
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
