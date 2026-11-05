"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, Pill, Sparkline, series } from "@/components/product/ui";

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
  const [n, setN] = useState(reduce ? 5 : 0);

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
    <div ref={ref} className="grain field-pine relative isolate h-full overflow-hidden rounded-[18px] p-4 sm:p-7">
      <div className="mb-4 flex items-center justify-between text-white/80">
        <span className="t-ui flex items-center gap-2 text-[10.5px]">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" /><span className="relative h-2 w-2 rounded-full bg-white" /></span>
          Monitoring your watchlist · 42 names · 6 themes
        </span>
        <span className="t-ui hidden text-[10.5px] sm:inline">No prompt needed</span>
      </div>

      <div className="relative min-h-[430px]">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="space-y-2.5">
              {["NVDA", "VRT", "ETN", "LLY", "MSFT"].map((t, k) => (
                <motion.div key={t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 0.85 - k * 0.12, x: 0 }} transition={{ delay: k * 0.08, duration: 0.6, ease: EASE }} className="flex items-center justify-between rounded-[10px] border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur">
                  <span className="font-mono text-[12px] tracking-[0.04em]">{t}</span>
                  <span className="h-6 w-24 text-white/60"><Sparkline points={series(24, 3 + k * 5, 0.2, 2)} className="h-full w-full" /></span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-white/55">No change</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {phase === 1 && (
            <motion.div key="alert" initial={{ opacity: 0, y: -30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.8, ease: EASE }} className="ui-card p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-ink/55"><AlfredGlyph className="h-4 w-4 text-pine-500" /> Alert · 07:42 ET</span>
                <Pill tone="pine">Market catalyst</Pill>
              </div>
              <p className="mt-3 font-display text-[22px] font-semibold leading-tight text-ink">AI data center power buildout accelerates</p>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.04em] text-ink/50">Why you’re seeing this: touches VRT, ETN, CEG</p>
              <div className="mt-4 h-14 text-pine-500"><Sparkline points={series(40, 5, 0.6, 2)} className="h-full w-full" fill="rgb(62 92 80 / 0.12)" /></div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div key="insight" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-5">
              <div className="flex items-center justify-between">
                <span className="t-ui text-ink/50">Insight · Top 5 takeaways</span>
                <Pill tone="pine">Bullish</Pill>
              </div>
              <p className="mt-2 font-display text-[17px] font-semibold leading-snug text-ink">AI data center power buildout accelerates</p>
              <ol className="mt-4 space-y-1.5">
                {TAKEAWAYS.map(([t, tag], k) => (
                  <li key={t} className={clsx("flex items-center gap-3 rounded-md px-2.5 py-2 text-[12.5px] transition-all duration-500", k < n ? "bg-ink/[0.04] opacity-100" : "opacity-25")}>
                    <span className="font-mono text-[10.5px] text-ink/40">{k + 1}</span>
                    <span className="min-w-0 flex-1 truncate font-display font-medium text-ink">{t}</span>
                    <span className="hidden shrink-0 rounded-full bg-pine-100 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.04em] text-pine-700 sm:inline">{tag}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div key="ripple" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-5">
              <div className="flex items-center justify-between"><span className="t-ui text-ink/50">Graph ripple effects</span><Pill tone="lake">Ranked</Pill></div>
              <ul className="mt-4 space-y-2">
                {RIPPLE.map(([name, role, hop, w], k) => (
                  <motion.li key={name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + k * 0.1 }} className="flex items-center gap-3 rounded-md bg-ink/[0.035] px-3 py-2.5">
                    <span className="w-[100px] shrink-0 font-display text-[13px] font-semibold text-ink">{name}</span>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink/55">{role}</span>
                    <span className="hidden font-mono text-[10px] uppercase text-ink/40 sm:inline">{hop}</span>
                    <span className="h-1 w-12 overflow-hidden rounded-full bg-ink/8"><motion.span className="block h-full bg-pine-500" initial={{ width: 0 }} animate={{ width: `${w * 100}%` }} transition={{ delay: 0.3 + k * 0.1, duration: 0.9 }} /></span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 rounded-lg border border-ink/10 bg-white p-3 text-[12.5px] text-ink/80">
                <span className="t-ui mb-1 block text-[9.5px] text-ink/40">Follow up in Alfred</span>
                Which of these names is most exposed to US grid interconnect delays?
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {["Watching", "Alert", "Insight", "Ripple"].map((l, k) => (
          <span key={l} className="flex-1">
            <span className={clsx("block h-[2px] rounded-full transition-colors duration-500", k <= phase ? "bg-white" : "bg-white/20")} />
            <span className={clsx("mt-2 block font-mono text-[9.5px] uppercase tracking-[0.06em]", k === phase ? "text-white" : "text-white/45")}>{l}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
