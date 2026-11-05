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
    <div ref={ref} className={clsx("pui ui-card relative overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
        <span className="text-[14px] font-semibold">Market developments</span>
        <span className="hidden text-[12px] text-[#8f8f8f] sm:inline">Relevance to your coverage</span>
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
              className="flex items-center gap-3 border-b border-black/10 px-4"
            >
              <span className={clsx("h-1.5 w-1.5 shrink-0 rounded-full", r.hit ? "bg-[#0d0d0d]" : "bg-transparent")} />
              <span className="min-w-0 flex-1">
                <span className={clsx("block truncate text-[13px]", r.hit ? "font-medium text-[#0d0d0d]" : "text-[#8f8f8f]")}>{r.h}</span>
                <span className="block text-[12px] text-[#8f8f8f]">{r.src}</span>
              </span>
              {r.hit ? (
                <span className="shrink-0 text-[12px] font-medium text-[#0d0d0d]">
                  → Insight<span className="hidden font-normal text-[#5d5d5d] sm:inline"> · {r.hit}</span>
                </span>
              ) : (
                <span className="hidden shrink-0 text-[12px] text-[#8f8f8f] sm:inline">Not in coverage</span>
              )}
            </li>
          ))}
        </motion.ul>
      </div>
      <p className="border-t border-black/10 px-4 py-3 text-[12px] text-[#8f8f8f]">Illustrative. Relevance is set by your watchlist, themes and Knowledge Graph links.</p>
    </div>
  );
}
