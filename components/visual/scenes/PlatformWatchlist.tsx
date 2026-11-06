"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Delta, Glyph, Mono, RX_EASE, Spark, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Platform · Insights — "developments and second-order effects across what you follow".
 * Composition: a watchlist table. Developments land in the rows they touch;
 * the row opens to show why it reached you (the Knowledge Graph link).
 */
const ROWS = [
  { t: "NVDA", n: "NVIDIA", c: "#24324a", m: 0.84, last: "Quiet since open" },
  { t: "VRT", n: "Vertiv", c: "#3e5c50", m: 1.42, last: "Quiet since open" },
  { t: "MU", n: "Micron", c: "#3e5368", m: -0.61, last: "Earnings in 6 days" },
  { t: "ETN", n: "Eaton", c: "#7a6a58", m: 0.37, last: "Quiet since open" },
  { t: "ANET", n: "Arista Networks", c: "#5a6f63", m: 0.22, last: "Quiet since open" },
];
const EVENTS = [
  { row: 1, head: "Gas-turbine order surge strains grid", type: "Market catalyst", m: 3.22, via: ["Data center power", "Vertiv"], why: "Second-order: supplies cooling to the same build-outs" },
  { row: 3, head: "Utility capex plans raised again", type: "Ripple effect", m: 1.76, via: ["Grid equipment", "Eaton"], why: "Second-order: switchgear backlog tied to utility spend" },
];

// per event: 0 land · 1 open · 2 hold ; then out
const D = [1200, 1000, 3200, 1200, 1000, 3200, 700];

export function PlatformWatchlist() {
  const { p, ref, cycle } = useTimeline(D, { still: 2 });
  const k = p >= 3 ? 1 : 0;
  const s = p % 3;
  const ev = EVENTS[k];
  const landed = (i: number) => (p < 6 ? EVENTS.findIndex((e, j) => e.row === i && j <= k) : -1);

  return (
    <div ref={ref}>
      <Canvas w={560} h={400} focusX={0.25}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 6 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          <motion.div className="rx-card rx-card-lift absolute left-[32px] top-[26px] w-[540px] pb-2" initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="flex items-center justify-between px-5 pt-4">
              <span className="flex items-center gap-2"><span className="rx-serif text-[17px]">Watchlist</span><span className="text-[11.5px] text-[var(--rx-3)]">AI infrastructure · 18 names</span></span>
              <span className="mr-6 flex items-center gap-1.5 text-[11px] text-[var(--rx-3)]"><span className="h-1.5 w-1.5 rounded-full bg-[#2f7457]" />Live</span>
            </div>
            <div className="mt-3 grid grid-cols-[180px_1fr_70px] border-b border-[var(--rx-line)] px-5 pb-2 text-[10.5px] font-medium text-[var(--rx-3)]">
              <span>Name</span><span>Latest</span><span className="pr-6 text-right">1D</span>
            </div>
            {ROWS.map((r, i) => {
              const e = landed(i);
              const hit = e >= 0 ? EVENTS[e] : null;
              const focus = i === ev.row && p < 6;
              const opened = focus && s >= 1;
              return (
                <motion.div key={r.t} layout transition={{ layout: { duration: 0.6, ease: RX_EASE } }} className="relative border-b border-[var(--rx-line)] px-5 last:border-b-0">
                  <motion.span className="absolute inset-0" initial={false} animate={{ backgroundColor: focus ? "rgba(244,243,240,1)" : "rgba(244,243,240,0)" }} transition={{ duration: 0.5 }} />
                  {focus && <motion.span className="absolute left-0 top-3 h-6 w-[2px] rounded-r-full bg-[var(--rx-signal)]" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.3 }} />}
                  <div className="relative grid h-[50px] grid-cols-[180px_1fr_70px] items-center">
                    <span className="flex items-center gap-2.5">
                      <Mono t={r.t.slice(0, 2)} tone={r.c} size={24} />
                      <span className="text-[12.5px] font-medium">{r.n}</span>
                    </span>
                    <span className="relative h-5 min-w-0">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={hit ? hit.head : "q"} className={clsx("absolute inset-0 flex items-center gap-2 truncate text-[12px]", hit ? "text-[var(--rx-ink)]" : "text-[var(--rx-3)]")} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.4, ease: RX_EASE }}>
                          {hit ? <><span className="flex shrink-0 items-center gap-1 rounded-[5px] bg-[#e7ecf1] px-1.5 py-px text-[10.5px] font-medium text-[#3e5368]"><Spark size={9} />{hit.type}</span><span className="truncate">{hit.head}</span></> : r.last}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="pr-6 text-right"><Delta v={hit ? hit.m : r.m} /></span>
                  </div>
                  <AnimatePresence initial={false}>
                    {opened && (
                      <motion.div className="relative overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: 58, opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: RX_EASE }}>
                        <div className="ml-[34px] flex items-center gap-1.5 text-[11.5px]">
                          <span className="text-[var(--rx-3)]">Reached you via</span>
                          <span className="flex items-center gap-1 rounded-[6px] border border-[var(--rx-line)] bg-white px-1.5 py-0.5"><Glyph kind="theme" size={9} className="text-[var(--rx-3)]" />{ev.via[0]}</span>
                          <span className="text-[var(--rx-3)]">→</span>
                          <Ticker className="bg-white ring-1 ring-inset ring-[var(--rx-line)]">{r.t}</Ticker>
                        </div>
                        <p className="ml-[34px] mt-1.5 text-[11.5px] text-[var(--rx-2)]">{ev.why}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Canvas>
    </div>
  );
}
