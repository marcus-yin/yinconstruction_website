"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/content/site";

/**
 * Animated count-up number. Respects prefers-reduced-motion (renders the
 * final value immediately). While a stat's value is null, its {{TODO}}
 * token is rendered instead — fill in real numbers in content/site.ts to
 * activate the animation.
 */
export default function StatCounter({ stat }: { stat: Stat }) {
  const { value, token, suffix, label } = stat;
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (value === null || started) return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        setStarted(true);
        if (reduced) {
          setDisplay(value);
          return;
        }
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          setDisplay(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, started]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-3xl font-bold text-white sm:text-4xl">
        {value === null ? (
          <span className="break-words text-base font-semibold text-navy-200 sm:text-lg">
            {token}
          </span>
        ) : (
          <>
            {display.toLocaleString("en-US")}
            {suffix}
          </>
        )}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wider text-navy-200">
        {label}
      </div>
    </div>
  );
}
