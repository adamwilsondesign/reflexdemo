"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Counts up to `to` once in view. Renders the final value on the server for no-JS/SEO. */
export function CountUp({ to, prefix = "", suffix = "", decimals = 0, duration = 1.8, className }: { to: number; prefix?: string; suffix?: string; decimals?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const fmt = (v: number) => prefix + v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  const [val, setVal] = useState(fmt(to));
  const started = useRef(false);

  useEffect(() => {
    if (reduce) return;
    if (!started.current) setVal(fmt(0));
    if (!inView || started.current) return;
    started.current = true;
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(fmt(v)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <span ref={ref} className={className}>
      {val}
    </span>
  );
}
