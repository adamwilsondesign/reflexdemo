"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Delta, Icon, Mono, RX_EASE, Spark, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Portfolio Monitoring — hero, "Stay ahead of what could move your book".
 * Composition: a holdings list with a notification toast landing over its
 * corner. Each toast marks the row it belongs to; the marks accumulate.
 */
const ROWS = [
  { t: "NVDA", n: "NVIDIA", c: "#24324a", m: 1.84, s: 3 },
  { t: "MSFT", n: "Microsoft", c: "#3e5368", m: 0.42, s: 7 },
  { t: "VRT", n: "Vertiv", c: "#3e5c50", m: 3.22, s: 11 },
  { t: "LLY", n: "Eli Lilly", c: "#7a6a58", m: -0.31, s: 5 },
  { t: "NKE", n: "Nike", c: "#5b6068", m: -0.84, s: 13 },
  { t: "CRWV", n: "CoreWeave", c: "#2f4a5e", m: 2.61, s: 17 },
];

const TOASTS = [
  { row: 2, type: "Market catalyst", title: "Gas-turbine orders signal data-center power strain", theme: "Data center power" },
  { row: 4, type: "Earnings recap", title: "Guidance overshadows a mixed Nike quarter", theme: "Consumer discretionary" },
  { row: 5, type: "Company catalyst", title: "CoreWeave begins Vera Rubin deployments", theme: "AI infrastructure" },
];

// per toast: 0 calm · 1 toast lands · 2 row marked · 3 toast leaves
const STEP = [1100, 2600, 2600, 600];
const D = TOASTS.flatMap(() => STEP);

function spark(seed: number) {
  let v = 10;
  const pts: string[] = [];
  for (let i = 0; i < 18; i++) {
    v += Math.sin(seed * 1.7 + i * 0.9) * 2.2 + Math.cos(seed + i * 0.37) * 1.4 + 0.25;
    pts.push(`${(i * 64) / 17},${Math.max(2, Math.min(20, 22 - v)).toFixed(1)}`);
  }
  return pts.join(" ");
}

export function WatchlistToast() {
  const { p, ref, cycle } = useTimeline(D, { still: 2 });
  const k = Math.floor(p / 4);
  const sub = p % 4;
  const toast = TOASTS[k];
  const marked = new Set(TOASTS.filter((_, i) => i < k || (i === k && sub >= 2)).map((x) => x.row));

  return (
    <div ref={ref}>
      <Canvas w={500} h={480}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="rx-card absolute left-[16px] top-[100px] w-[380px] px-5 pb-2 pt-5">
            <p className="text-[11px] font-medium text-[var(--rx-3)]">Watchlist · Mon 07:00</p>
            <p className="rx-serif mt-1 text-[20px] leading-[26px]">Core book</p>
            <div className="mt-3">
              {ROWS.map((r, i) => {
                const on = marked.has(i);
                const live = toast.row === i && sub >= 2;
                return (
                  <div key={r.t} className="relative flex h-[50px] items-center gap-3 border-t border-[var(--rx-line)]">
                    <motion.span className="absolute -left-5 top-3 h-6 w-[2px] rounded-r-full bg-[var(--rx-signal)]" initial={false} animate={{ scaleY: live ? 1 : 0 }} transition={{ duration: 0.35 }} />
                    <Mono t={r.t.slice(0, 2)} tone={r.c} size={26} />
                    <span className="w-[96px] text-[13px] font-medium">{r.n}</span>
                    <Ticker>{r.t}</Ticker>
                    <span className="flex flex-1 justify-center">
                      <svg viewBox="0 0 64 22" width="56" height="20" className="overflow-visible">
                        <polyline points={spark(r.s)} fill="none" stroke={r.m >= 0 ? "#2f7457" : "#a6503a"} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="w-[72px] text-right">
                      <AnimatePresence initial={false} mode="wait">
                        {on ? (
                          <motion.span key="new" className="inline-flex items-center gap-1 rounded-full bg-[#e9eef2] px-2 py-0.5 text-[10.5px] font-medium text-[#3e5368]" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: RX_EASE }}>
                            <Spark size={9} />Insight
                          </motion.span>
                        ) : (
                          <motion.span key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Delta v={r.m} /></motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {(sub === 1 || sub === 2) && (
              <motion.div
                key={k}
                className="rx-card rx-card-lift absolute left-[180px] top-[28px] w-[284px] p-4"
                initial={{ opacity: 0, y: -18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 30, transition: { duration: 0.45, ease: RX_EASE } }}
                transition={{ duration: 0.7, ease: RX_EASE }}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 font-medium text-[#3e5368]">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[#3e5368] text-white"><Icon name="bell" size={11} /></span>
                    {toast.type}
                  </span>
                  <span className="text-[var(--rx-3)]">Just now</span>
                </div>
                <p className="mt-2 text-[14px] font-medium leading-[19px]">{toast.title}</p>
                <div className="mt-2.5 flex items-center gap-2 text-[11px] text-[var(--rx-2)]">
                  <Ticker>{ROWS[toast.row].t}</Ticker>
                  <span className={clsx("rounded-full border border-[var(--rx-line)] px-2 py-px")}>{toast.theme}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Canvas>
    </div>
  );
}
