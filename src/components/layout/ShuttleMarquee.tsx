"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Bus, Pause, Phone, Play } from "@phosphor-icons/react/dist/ssr";

import { phoneLines } from "@/lib/contact";

/** Seconds for one full loop of the strip at normal speed. */
const LOOP_SECONDS = 28;

function MarqueeItems() {
  return (
    <>
      <span className="marquee-item">
        <span className="marquee-bus">
          <Bus size={16} weight="fill" />
        </span>
        <strong className="font-semibold text-white">Shuttle buses now available</strong>
      </span>
      <span className="marquee-dot" />
      <span className="marquee-item">Getting to Police Hospital, Ikeja just got easier</span>
      <span className="marquee-dot" />
      {phoneLines.map((line) => (
        <a key={line.tel} href={`tel:${line.tel}`} className="marquee-item marquee-link">
          <Phone size={13} weight="fill" className="text-[#f5b301]" /> {line.display}
        </a>
      ))}
      <span className="marquee-dot" />
      <span className="marquee-item">Call to ask about pickup times</span>
      <span className="marquee-dot" />
    </>
  );
}

/**
 * Announcement strip under the site header.
 *
 * Hovering or focusing eases the scroll to a stop (so the phone links are easy
 * to hit) and leaving eases it back up. The pause button keeps it stopped —
 * moving content needs a user control (WCAG 2.2.2) — and users who prefer
 * reduced motion get it paused from the start.
 */
export function ShuttleMarquee() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);
  // Read by the hover handlers so leaving the strip doesn't undo a manual pause.
  const pausedRef = useRef(false);

  const setPausedBoth = (value: boolean) => {
    pausedRef.current = value;
    setPaused(value);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // The track holds two identical halves; sliding by -50% loops seamlessly.
    const tween = gsap.to(track, { xPercent: -50, duration: LOOP_SECONDS, ease: "none", repeat: -1 });
    tweenRef.current = tween;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tween.timeScale(0);
      pausedRef.current = true;
      setPaused(true);
    }

    return () => {
      tween.kill();
      tweenRef.current = null;
    };
  }, []);

  const easeTo = (timeScale: number) => {
    const tween = tweenRef.current;
    if (!tween) return;
    gsap.to(tween, { timeScale, duration: 0.6, ease: "power2.out", overwrite: true });
  };

  const slow = () => easeTo(0);
  const resume = () => {
    if (!pausedRef.current) easeTo(1);
  };

  return (
    <div className="shuttle-marquee relative border-y border-[#f5b301]/25 bg-[#05123a]/80 text-white backdrop-blur-sm">
      <div className="flex items-stretch">
        <span className="relative z-10 flex shrink-0 items-center gap-2 bg-[#f5b301] px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#071a45] sm:px-4 sm:text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#071a45]/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#071a45]" />
          </span>
          New
        </span>

        <div
          className="marquee-viewport relative min-w-0 flex-1 overflow-hidden"
          onPointerEnter={slow}
          onPointerLeave={resume}
          onFocusCapture={slow}
          onBlurCapture={resume}
        >
          <div ref={trackRef} className="flex w-max items-center py-2 text-[12px] text-white/80 sm:text-[13px]">
            <div className="flex items-center">
              <MarqueeItems />
            </div>
            <div className="flex items-center" aria-hidden inert>
              <MarqueeItems />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const next = !paused;
            setPausedBoth(next);
            easeTo(next ? 0 : 1);
          }}
          aria-label={paused ? "Play announcement" : "Pause announcement"}
          className="relative z-10 flex w-10 shrink-0 items-center justify-center border-l border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#f5b301]"
        >
          {paused ? <Play size={14} weight="fill" /> : <Pause size={14} weight="fill" />}
        </button>
      </div>
    </div>
  );
}
