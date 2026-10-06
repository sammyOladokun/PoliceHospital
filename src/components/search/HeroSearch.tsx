"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Buildings,
  FirstAid,
  MagnifyingGlass,
  SpinnerGap,
  Stethoscope,
} from "@phosphor-icons/react/dist/ssr";

import type { SearchApiResponse, SearchResultItem } from "@/lib/search/contract";
import { popularSearches } from "@/lib/search/catalog";

const KIND_META = {
  department: { label: "Department", Icon: Buildings },
  service: { label: "Service", Icon: Stethoscope },
  condition: { label: "Condition", Icon: FirstAid },
} as const;

const DEBOUNCE_MS = 180;
const PANEL_GAP = 10;
const MIN_PANEL_HEIGHT = 180;

interface AnchorRect {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
}

export function HeroSearch() {
  const router = useRouter();
  const listboxId = useId();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searched, setSearched] = useState(false);
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const trimmed = query.trim();
  const showPanel = open && (trimmed.length === 0 || trimmed.length >= 2);

  /* ---------------------------------------------------------------- *
   * Panel placement.
   *
   * The panel is portalled to <body> rather than positioned inside the
   * form. Two reasons, both structural rather than cosmetic:
   *
   *   1. GSAP leaves an inline transform on the `.hero-fade` wrappers,
   *      and a transform makes an element its own stacking context. A
   *      z-index inside one wrapper cannot rise above a later sibling
   *      wrapper, so the trust-badge row painted over the dropdown.
   *   2. Both <main> and the hero <section> set `overflow-hidden`,
   *      which would clip a full-height result list.
   *
   * A fixed-position portal sidesteps both. It also matches how the
   * service-tile popover on this page already works.
   * ---------------------------------------------------------------- */
  const measure = useCallback(() => {
    const form = formRef.current;
    if (!form) return;

    const rect = form.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - PANEL_GAP * 2;

    setAnchor({
      top: rect.bottom + PANEL_GAP,
      left: rect.left,
      width: rect.width,
      maxHeight: Math.max(MIN_PANEL_HEIGHT, Math.min(420, spaceBelow)),
    });
  }, []);

  useEffect(() => {
    if (!showPanel) return;

    measure();

    let frame = 0;
    const onViewportChange = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    // `capture: true` so scrolling any ancestor container repositions the panel.
    window.addEventListener("scroll", onViewportChange, { passive: true, capture: true });
    window.addEventListener("resize", onViewportChange, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onViewportChange, { capture: true });
      window.removeEventListener("resize", onViewportChange);
    };
  }, [showPanel, measure]);

  /* ---- fetch suggestions (debounced, cancels in-flight requests) ---- */
  useEffect(() => {
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      setSearched(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&limit=6`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Search failed: ${response.status}`);

        const data = (await response.json()) as SearchApiResponse;
        setResults(data.results ?? []);
        setActiveIndex(-1);
        setSearched(true);
      } catch (error) {
        if ((error as Error)?.name !== "AbortError") {
          setResults([]);
          setSearched(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed]);

  /* ---- close on outside click (the panel now lives outside the form) ---- */
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const insideForm = formRef.current?.contains(target) ?? false;
      const insidePanel = panelRef.current?.contains(target) ?? false;
      if (!insideForm && !insidePanel) setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const goToResults = useCallback(
    (value: string) => {
      const term = value.trim();
      if (!term) {
        inputRef.current?.focus();
        return;
      }
      setOpen(false);
      // The query string is user input, so it cannot be a statically known
      // route literal — the cast is the documented escape hatch for typedRoutes.
      router.push(`/search?q=${encodeURIComponent(term)}` as Route);
    },
    [router]
  );

  const goToResult = useCallback(
    (result: SearchResultItem) => {
      setOpen(false);
      router.push(result.href as Route);
    },
    [router]
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (results.length === 0) return;
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => {
        const next = event.key === "ArrowDown" ? current + 1 : current - 1;
        if (next < 0) return results.length - 1;
        if (next >= results.length) return 0;
        return next;
      });
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const active = activeIndex >= 0 ? results[activeIndex] : undefined;
      if (active) goToResult(active);
      else goToResults(query);
    }
  };

  const panel =
    showPanel && anchor && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={panelRef}
            className="fixed z-[999] overflow-hidden rounded-[20px] bg-white text-left shadow-[0_24px_70px_rgba(5,18,58,0.28)] ring-1 ring-black/[0.06]"
            style={{ top: anchor.top, left: anchor.left, width: anchor.width }}
          >
            {trimmed.length < 2 ? (
              <div className="px-4 py-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Popular searches
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {popularSearches.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setQuery(suggestion);
                        inputRef.current?.focus();
                      }}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-[13px] font-medium text-slate-600 transition hover:bg-[#0a2a6b] hover:text-white"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              <>
                <ul
                  id={listboxId}
                  role="listbox"
                  aria-label="Search suggestions"
                  className="overflow-y-auto overscroll-contain py-1"
                  style={{ maxHeight: anchor.maxHeight }}
                >
                  {results.map((result, index) => {
                    const meta = KIND_META[result.kind];
                    const isActive = index === activeIndex;

                    return (
                      <li key={result.id} id={`${listboxId}-option-${index}`} role="option" aria-selected={isActive}>
                        <button
                          type="button"
                          onPointerEnter={() => setActiveIndex(index)}
                          onClick={() => goToResult(result)}
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition ${
                            isActive ? "bg-[#0a2a6b]/[0.06]" : ""
                          }`}
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0a2a6b]/10 text-[#0a2a6b]">
                            <meta.Icon size={18} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="truncate text-sm font-semibold text-slate-800">{result.title}</span>
                              <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                                {meta.label}
                              </span>
                            </span>
                            <span className="mt-0.5 block truncate text-[12px] text-slate-500">
                              {result.kind === "department" ? result.summary : result.subtitle}
                            </span>
                          </span>
                          <ArrowRight size={15} className="shrink-0 text-slate-300" />
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <button
                  type="button"
                  onClick={() => goToResults(query)}
                  className="flex w-full items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/70 px-4 py-2.5 text-[13px] font-semibold text-[#0a2a6b] transition hover:bg-slate-100"
                >
                  <span className="truncate">See all results for “{trimmed}”</span>
                  <ArrowRight size={15} className="shrink-0" />
                </button>
              </>
            ) : searched && !loading ? (
              <div className="px-4 py-4">
                <p className="text-sm font-semibold text-slate-800">No match for “{trimmed}”</p>
                <p className="mt-1 text-[12px] leading-5 text-slate-500">
                  Try a symptom (“chest pain”), a test (“x-ray”), or a department (“dental”). Our emergency centre is
                  open 24/7.
                </p>
              </div>
            ) : (
              <div className="px-4 py-4 text-[13px] text-slate-400">Searching…</div>
            )}
          </div>,
          document.body
        )
      : null;

  return (
    <div className="w-full max-w-xl">
      <form
        ref={formRef}
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          goToResults(query);
        }}
        className="flex flex-row items-stretch gap-3"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-white/12 px-4 py-3 text-left text-sm shadow-[0_20px_60px_rgba(0,0,0,0.16)] ring-1 ring-white/15 backdrop-blur-sm transition focus-within:bg-white/[0.18] focus-within:ring-2 focus-within:ring-[#f5b301]/60 sm:px-5">
          {loading ? (
            <SpinnerGap size={18} className="shrink-0 animate-spin text-[#f5b301]" />
          ) : (
            <MagnifyingGlass size={18} className="shrink-0 text-white/70" />
          )}
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Search disease, department"
            aria-label="Search departments, services, and conditions"
            role="combobox"
            aria-expanded={showPanel}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
            autoComplete="off"
            className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/60 [&::-webkit-search-cancel-button]:hidden"
          />
        </div>

        <button
          type="submit"
          className="shrink-0 rounded-full bg-[#f5b301] px-5 py-3 text-sm font-semibold text-[#071a45] shadow-[0_20px_60px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-[#ffc21f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6"
        >
          Search
        </button>
      </form>

      {panel}
    </div>
  );
}
