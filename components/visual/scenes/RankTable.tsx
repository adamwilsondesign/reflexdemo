"use client";

import { motion } from "motion/react";
import { Canvas, Delta, Mono, RX_EASE, Spark, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Knowledge Graph — "See who's exposed, ranked".
 * Composition: a wide table card that runs off the right edge of the frame.
 * The catalyst sits on top; the ranking re-sorts itself as the ripple updates.
 */
const ROWS = [
  { t: "SPY", name: "S&P 500 ETF", path: "Broad index exposure to industrial margins", a: 0.18, b: 0.22, c: "#5b6068" },
  { t: "HON", name: "Honeywell", path: "Controls exposure tied to efficiency spend", a: 1.36, b: 1.41, c: "#9a3b30" },
  { t: "ETN", name: "Eaton", path: "Electrical demand tied to project activity", a: 1.76, b: 2.62, c: "#24324a" },
  { t: "ROK", name: "Rockwell Automation", path: "Automation spend as a productivity hedge", a: 1.64, b: 1.58, c: "#a6503a" },
  { t: "EMR", name: "Emerson Electric", path: "Process automation exposed to capex cycles", a: 2.24, b: 2.31, c: "#3e5368" },
];

// 0 rows in · 1 hold · 2 re-rank · 3 hold
const D = [2600, 1800, 3800, 1200];

export function RankTable() {
  const { p, ref, cycle } = useTimeline(D, { still: 2 });
  const live = p >= 2;
  const order = live ? [...ROWS].sort((x, y) => y.b - x.b) : ROWS;

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <motion.div key={cycle} className="rx-card rx-card-lift absolute left-[24px] top-[30px] w-[640px] p-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <span className="flex items-center gap-1 text-[#3e5368]"><Spark size={10} />Market catalyst</span>
            <span className="rounded-[5px] bg-[#f6ecd6] px-1.5 py-px text-[#8a6a1e]">Neutral</span>
            <span className="ml-3 text-[var(--rx-3)]">Industrial automation</span>
            <motion.span className="rx-num ml-2 rounded-[5px] px-1.5 py-px text-[10.5px]" animate={{ backgroundColor: live ? "rgba(233,169,58,.18)" : "rgba(0,0,0,0)", color: live ? "#8a5a12" : "#959aa1" }}>{live ? "Updated 4:00 PM" : "As of 10:30 AM"}</motion.span>
          </div>
          <p className="rx-serif mt-2 text-[19px] leading-[26px]">How the PMI surprise ripples across the network</p>

          <div className="mt-4 grid grid-cols-[34px_200px_1fr_70px] border-b border-[var(--rx-line)] pb-2 text-[10.5px] font-medium text-[var(--rx-3)]">
            <span>Rank</span><span>Asset</span><span>Transmission path</span><span className="pr-6 text-right">1D move</span>
          </div>
          <div>
            {order.map((r, i) => {
              const was = ROWS.indexOf(r);
              const moved = live && was !== i;
              return (
                <motion.div
                  key={r.t}
                  layout
                  transition={{ layout: { duration: 0.9, ease: RX_EASE, delay: 0.3 } }}
                  className="grid h-[54px] grid-cols-[34px_200px_1fr_70px] items-center border-b border-[var(--rx-line)] last:border-b-0"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.span className="rx-num text-[12px]" animate={{ color: moved ? "#c98a1c" : "#959aa1" }} transition={{ delay: 1 }}>{i + 1}</motion.span>
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Mono t={r.t.slice(0, 2)} tone={r.c} size={26} />
                    <span className="min-w-0">
                      <span className="block truncate text-[12.5px] font-medium leading-4">{r.name}</span>
                      <Ticker className="mt-0.5 !h-4 !text-[9.5px]">{r.t}</Ticker>
                    </span>
                  </span>
                  <span className="truncate pr-4 text-[12px] text-[var(--rx-2)]">{r.path}</span>
                  <span className="pr-6 text-right"><Delta v={live ? r.b : r.a} /></span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Canvas>
    </div>
  );
}
