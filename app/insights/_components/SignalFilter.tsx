"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";

const ROWS = [
  { h: "Utility files large-load interconnect request", src: "Newswire", hit: "VRT · Data center power" },
  { h: "Regional bank updates deposit guidance", src: "Newswire", hit: null },
  { h: "Court filing ends antibody patent dispute", src: "Company release", hit: "SNY" },
  { h: "Shipping rates ease on Asia–Europe lanes", src: "Market data", hit: null },
  { h: "Footwear peer lowers full-year outlook", src: "Transcript", hit: "NKE · peer read" },
  { h: "Copper inventories fall for third week", src: "Market data", hit: null },
  { h: "Hyperscaler raises capex guidance", src: "Transcript", hit: "Data center power" },
  { h: "Airline reports holiday booking trends", src: "Newswire", hit: null },
  { h: "Recession-probability gauge hits new low", src: "Macro series", hit: "LLY · pattern" },
  { h: "Retailer announces CFO transition", src: "Newswire", hit: null },
];

/** Raw developments stream past a relevance filter; only the ones that touch your coverage become Insights. */
export function SignalFilter({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = useReducedMotion();
  const loop = [...ROWS, ...ROWS];
  const rowH = 58;

  return (
    <div ref={ref} className={clsx("relative overflow-hidden rounded-[18px] border border-white/10 bg-[#1d2a3a]", className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <span className="t-ui text-[10.5px] text-paper/60">Market developments</span>
        <span className="t-ui text-[10.5px] text-paper/60">Relevance to your coverage</span>
      </div>
      <div className="relative h-[380px] overflow-hidden mask-fade-b sm:h-[420px]">
        <motion.ul
          className="absolute inset-x-0 top-0"
          animate={reduce || !inView ? undefined : { y: [0, -rowH * ROWS.length] }}
          transition={{ duration: ROWS.length * 2.6, ease: "linear", repeat: Infinity }}
        >
          {loop.map((r, i) => (
            <li
              key={i}
              aria-hidden={i >= ROWS.length ? true : undefined}
              style={{ height: rowH }}
              className={clsx("flex items-center gap-3 border-b px-5", r.hit ? "border-white/10" : "border-white/[0.05]")}
            >
              <span className={clsx("h-1.5 w-1.5 shrink-0 rounded-full", r.hit ? "bg-pine-300" : "bg-white/20")} />
              <span className="min-w-0 flex-1">
                <span className={clsx("block truncate text-[13px]", r.hit ? "font-medium text-paper" : "text-paper/35")}>{r.h}</span>
                <span className="block font-mono text-[9.5px] uppercase tracking-[0.05em] text-paper/30">{r.src}</span>
              </span>
              {r.hit ? (
                <span className="shrink-0 rounded-full bg-pine-100 px-2.5 py-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.04em] text-pine-700">
                  → Insight · {r.hit}
                </span>
              ) : (
                <span className="hidden shrink-0 font-mono text-[9.5px] uppercase tracking-[0.04em] text-paper/25 sm:inline">Not in coverage</span>
              )}
            </li>
          ))}
        </motion.ul>
      </div>
      <p className="t-ui border-t border-white/10 px-5 py-3 text-[10px] text-paper/40">Illustrative · relevance is set by your watchlist, themes and Knowledge Graph links</p>
    </div>
  );
}
