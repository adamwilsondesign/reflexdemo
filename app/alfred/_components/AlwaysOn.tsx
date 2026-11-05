"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Pill, Sparkline, series } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const TAKEAWAYS = [
  ["Utility interconnect queues lengthen", "Grid"],
  ["Grid equipment orders strengthen", "Industrials"],
  ["Hyperscaler capex guidance rises", "AI infrastructure"],
  ["Cooling and power supply tighten", "Data center power"],
  ["Key milestones to watch", "Calendar"],
];

const RIPPLE = [
  ["Vertiv", "Power and cooling", "Direct", 0.91],
  ["Eaton", "Electrical equipment", "Direct", 0.82],
  ["Constellation", "Generation", "2nd order", 0.71],
] as const;

/**
 * Always-on: nothing is typed. Alfred notices a catalyst touching the watchlist,
 * raises an alert, then opens it into an Insight with five takeaways and ranked ripple effects.
 */
export function AlwaysOnVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? 2 : 0);
  const [n, setN] = useState(reduce ? TAKEAWAYS.length : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const durations = [1800, 2200, 5600, 4200];
    const t = setTimeout(() => setPhase((p) => (p + 1) % 4), durations[phase]);
    return () => clearTimeout(t);
  }, [phase, inView, reduce]);

  useEffect(() => {
    if (reduce) return;
    if (phase !== 2) { setN(0); return; }
    if (n >= TAKEAWAYS.length) return;
    const t = setTimeout(() => setN((k) => k + 1), n === 0 ? 400 : 650);
    return () => clearTimeout(t);
  }, [phase, n, reduce]);

  return (
    <div ref={ref} className="pui grain field-pine relative isolate h-full overflow-hidden rounded-[18px] p-4 sm:p-7">
      <div className="mb-4 flex items-center justify-between text-[13px] text-white/80">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Monitoring 42 names
        </span>
        <span className="hidden sm:inline">No prompt needed</span>
      </div>

      <div className="relative min-h-[360px]">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="ui-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold">Watchlist</span>
                <span className="text-[12px] text-[#8f8f8f]">Quiet</span>
              </div>
              <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
                {["NVDA", "VRT", "ETN", "LLY"].map((t, k) => (
                  <li key={t} className="flex items-center gap-4 py-2.5 text-[13px]">
                    <span className="w-12 font-medium text-[#0d0d0d]">{t}</span>
                    <span className="h-5 flex-1"><Sparkline points={series(24, 3 + k * 5, 0.2, 2)} className="h-full w-full" /></span>
                    <span className="w-20 text-right text-[#8f8f8f]">No change</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {phase === 1 && (
            <motion.div key="alert" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: EASE }} className="ui-card p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[13px] text-[#5d5d5d]"><span className="h-1.5 w-1.5 rounded-full bg-[#0d0d0d]" />Alert, 07:42 ET</span>
                <Pill>Market catalyst</Pill>
              </div>
              <p className="mt-2 text-[22px] font-semibold leading-tight text-[#0d0d0d]">AI data center power buildout accelerates</p>
              <p className="mt-1.5 text-[13px] text-[#5d5d5d]">Touches VRT, ETN, CEG in your watchlist</p>
              <div className="mt-4 h-14"><Sparkline points={series(40, 5, 0.6, 2)} className="h-full w-full" /></div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div key="insight" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-4">
              <p className="text-[13px] text-[#8f8f8f]">Top 5 takeaways</p>
              <p className="mt-1 text-[16px] font-semibold leading-snug text-[#0d0d0d]">AI data center power buildout accelerates</p>
              <ol className="mt-3 divide-y divide-black/10 border-t border-black/10">
                {TAKEAWAYS.map(([t, tag], k) => (
                  <li key={t} className={clsx("flex items-baseline gap-3 py-2 text-[13px] transition-opacity duration-500", k < n ? "opacity-100" : "opacity-25")}>
                    <span className="w-3 tabular-nums text-[#8f8f8f]">{k + 1}</span>
                    <span className="min-w-0 flex-1 truncate text-[#0d0d0d]">{t}</span>
                    <span className="hidden shrink-0 text-[12px] text-[#8f8f8f] sm:inline">{tag}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div key="ripple" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-4">
              <div className="flex items-center justify-between"><span className="text-[14px] font-semibold">Ripple effects</span><span className="text-[12px] text-[#8f8f8f]">Ranked</span></div>
              <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
                {RIPPLE.map(([name, role, hop], k) => (
                  <motion.li key={name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + k * 0.1 }} className="flex items-baseline gap-3 py-2 text-[13px]">
                    <span className="w-[100px] shrink-0 font-medium text-[#0d0d0d]">{name}</span>
                    <span className="min-w-0 flex-1 truncate text-[#5d5d5d]">{role}</span>
                    <span className="shrink-0 text-[12px] text-[#8f8f8f]">{hop}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-3 rounded-[10px] bg-[#f9f9f9] px-3 py-2 text-[13px] text-[#0d0d0d]">Which of these names is most exposed to US grid interconnect delays?</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-2 flex gap-4 text-[13px]" aria-hidden="true">
        {["Watching", "Alert", "Insight", "Ripple"].map((l, k) => (
          <span key={l} className={clsx("transition-colors duration-500", k === phase ? "text-white" : "text-white/50")}>{l}</span>
        ))}
      </p>
    </div>
  );
}
