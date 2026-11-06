"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Delta, Mono, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Insights · Alerts that signal what matters.
 * Composition: notification toasts stacking over one focal watchlist card.
 * Each toast lands top-right, older ones tuck behind it, and the holding it
 * touches is marked in the list underneath.
 */
const HOLD = [
  { t: "VRT", n: "Vertiv", c: "#3e5368", m: 2.14, s: [8, 9, 8, 10, 11, 10, 12, 14] },
  { t: "ETN", n: "Eaton", c: "#24324a", m: 1.38, s: [10, 10, 11, 10, 11, 12, 12, 13] },
  { t: "CEG", n: "Constellation Energy", c: "#3e5c50", m: 0.92, s: [9, 10, 9, 9, 10, 11, 10, 11] },
  { t: "NVDA", n: "NVIDIA", c: "#17191c", m: -0.61, s: [12, 13, 12, 11, 12, 11, 10, 11] },
  { t: "PWR", n: "Quanta Services", c: "#5a6f63", m: 1.07, s: [9, 9, 10, 11, 10, 11, 12, 12] },
  { t: "ANET", n: "Arista Networks", c: "#7a6a58", m: -0.33, s: [11, 12, 11, 12, 11, 11, 10, 10] },
];
const TOASTS = [
  { h: 0, type: "Market catalyst", title: "Gas-turbine orders signal data center power strain" },
  { h: 1, type: "Market catalyst", title: "Grid equipment lead times stretch into 2028" },
  { h: 2, type: "Company catalyst", title: "Power deals extend to existing nuclear capacity" },
  { h: 3, type: "Earnings preview", title: "Guidance is the swing factor into the print" },
];

const D = Array(TOASTS.length * 2).fill(2900);

export function HoldingsToasts() {
  const { p, ref } = useTimeline(D, { still: 2 });
  const stack = [0, 1, 2].map((k) => p - k).filter((i) => i >= 0);
  const hot = TOASTS[p % TOASTS.length].h;

  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.4}>
        {/* watchlist */}
        <div className="rx-card absolute left-[24px] top-[84px] w-[420px] p-5">
          <p className="text-[11px] text-[var(--rx-3)]">Watchlist</p>
          <p className="rx-serif mt-0.5 text-[17px]">Data center &amp; power</p>
          <div className="mt-3">
            {HOLD.map((r, i) => (
              <div key={r.t} className={clsx("relative -mx-2 flex h-[48px] items-center gap-3 rounded-[8px] px-2 transition-colors duration-500", i === hot ? "bg-[var(--rx-well)]" : "")}>
                {i === hot && <motion.span key={p} className="absolute left-0 top-3 h-6 w-[2px] rounded-full bg-[var(--rx-signal)]" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.5, duration: 0.35 }} />}
                <Mono t={r.t.slice(0, 2)} tone={r.c} size={24} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-medium leading-4">{r.n}</span>
                  <span className="rx-num block text-[10.5px] leading-4 text-[var(--rx-3)]">{r.t}</span>
                </span>
                <Line s={r.s} up={r.m >= 0} />
                <span className="w-[56px] text-right"><Delta v={r.m} /></span>
              </div>
            ))}
          </div>
        </div>

        {/* toast stack */}
        <div className="absolute left-[236px] top-[22px] w-[304px]">
          <AnimatePresence initial={false}>
            {stack.map((i, k) => {
              const a = TOASTS[i % TOASTS.length];
              return (
                <motion.div
                  key={i}
                  className={clsx("rx-card absolute inset-x-0 top-0 flex h-[78px] items-start gap-3 overflow-hidden p-3.5", k === 0 && "rx-card-lift")}
                  style={{ zIndex: 10 - k, transformOrigin: "50% 0%" }}
                  initial={{ opacity: 0, x: 40, y: 0, scale: 1 }}
                  animate={{ opacity: 1, x: 0, y: k * 12, scale: 1 - k * 0.05 }}
                  exit={{ opacity: 0, y: 30, scale: 0.86, transition: { duration: 0.35 } }}
                  transition={{ duration: 0.6, ease: RX_EASE }}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] text-white" style={{ background: HOLD[a.h].c }}><Spark size={13} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between text-[10.5px] text-[var(--rx-3)]">
                      <span>{a.type} · <span className="rx-num">{HOLD[a.h].t}</span></span>
                      <span>{k === 0 ? "now" : `${k * 6}m`}</span>
                    </span>
                    <span className="mt-0.5 block text-[12.5px] font-medium leading-[17px]">{a.title}</span>
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Canvas>
    </div>
  );
}

function Line({ s, up }: { s: number[]; up: boolean }) {
  const min = Math.min(...s), max = Math.max(...s);
  const pts = s.map((v, i) => `${(i / (s.length - 1)) * 64},${18 - ((v - min) / (max - min || 1)) * 16}`).join(" ");
  return (
    <svg viewBox="0 0 64 20" width="64" height="20" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={up ? "#2f7457" : "#a6503a"} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
