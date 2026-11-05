"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, Cite } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROVIDERS = ["LSEG", "S&P Global", "Cboe", "Dow Jones", "Nasdaq", "Quartr", "MT Newswires", "Benzinga", "FRED"];

/**
 * Hero visual: licensed sources flow into the platform and come out as attributed citations.
 * One provider is highlighted at a time; paused off-screen, static with reduced motion.
 */
export function SourceMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setOn((x) => (x + 1) % PROVIDERS.length), 1700);
    return () => clearInterval(iv);
  }, [inView, reduce]);

  const rowH = 100 / PROVIDERS.length;

  return (
    <div ref={ref} className="relative grid grid-cols-[minmax(0,0.9fr)_minmax(0,0.5fr)_minmax(0,1.1fr)] items-center gap-0" aria-hidden="true">
      {/* providers */}
      <ul className="flex flex-col gap-1.5">
        {PROVIDERS.map((p, i) => (
          <motion.li
            key={p}
            initial={reduce ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 + i * 0.06, ease: EASE }}
            className={clsx(
              "truncate rounded-md border px-2.5 py-[6px] font-mono text-[10.5px] uppercase tracking-[0.04em] transition-colors duration-500",
              i === on ? "border-white bg-white text-lake-700 shadow-[0_6px_18px_-8px_rgb(0_0_0/0.4)]" : "border-white/25 bg-white/10 text-white/80",
            )}
          >
            {p}
          </motion.li>
        ))}
      </ul>

      {/* connectors */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full self-stretch">
        {PROVIDERS.map((p, i) => {
          const y = rowH * i + rowH / 2;
          return (
            <motion.path
              key={p}
              d={`M0 ${y} C 50 ${y}, 50 50, 100 50`}
              fill="none"
              stroke={i === on ? "#ffffff" : "rgba(255,255,255,0.28)"}
              strokeWidth={i === on ? 1.6 : 1}
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.7 + i * 0.05, ease: EASE }}
              style={{ transition: "stroke 0.5s" }}
            />
          );
        })}
      </svg>

      {/* answer with attribution */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
        className="ui-card p-3.5 sm:p-4"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white ring-1 ring-ink/5">
            <AlfredGlyph className="h-3 w-3 text-lake-700" />
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/50">Answer · cited</span>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-ink/80">
          Figures and claims link back to the licensed source they came from<Cite n={on + 1} />
        </p>
        <div className="mt-3 rounded-md border border-ink/8 bg-white/85 px-2.5 py-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.05em] text-ink/40">Source {on + 1}</p>
          <motion.p key={on} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mt-0.5 truncate font-display text-[12px] font-medium text-ink">
            {PROVIDERS[on]}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
