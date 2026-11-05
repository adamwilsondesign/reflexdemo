"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { MissingData } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const HORIZONS = [
  { k: "1W", m: 0.22 },
  { k: "1M", m: 0.55 },
  { k: "3M", m: 1 },
  { k: "6M", m: 1.25 },
  { k: "1Y", m: 0.9 },
];
const THRESHOLDS = [
  { k: "+0.50pp", episodes: 23, m: 1, positive: 38 },
  { k: "+0.75pp", episodes: 11, m: 1.35, positive: 31 },
];
// illustrative median 3M returns by sector (%)
const SECTORS: [string, number][] = [
  ["Energy", 2.4],
  ["Financials", 1.1],
  ["Health Care", -1.2],
  ["Consumer Discretionary", -3.1],
  ["Information Technology", -3.6],
  ["Utilities", -5.2],
];
const MAX = 8;

const fmt = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(1)}%`;

/** Worked example: the Treasury-yield scenario with its inputs, sample result, and an assumption you can change. */
export function ScenarioResult() {
  const reduce = useReducedMotion();
  const [h, setH] = useState(2);
  const [t, setT] = useState(0);
  const mult = HORIZONS[h].m * THRESHOLDS[t].m;
  const median = -2.1 * mult;
  const s = (v: number) => v * mult;

  return (
    <div className="ui-card pui overflow-hidden">
      <div className="grid lg:grid-cols-[320px_1fr]">
        {/* inputs */}
        <div className="border-b border-black/10 p-4 md:p-6 lg:border-b-0 lg:border-r">
          <p className="text-[14px] font-semibold text-[#0d0d0d]">Inputs</p>
          <dl className="mt-3 divide-y divide-black/10 border-t border-black/10 text-[13px]">
            {[
              ["Trigger", "US 10-year Treasury yield rises by at least the threshold over 3 months"],
              ["Universe", "S&P 1500 constituents"],
              ["History", "50+ years of daily market data"],
              ["Measure", "Median return per stock, one week to one year after each episode"],
            ].map(([k, v]) => (
              <div key={k} className="py-2.5">
                <dt className="text-[12px] text-[#8f8f8f]">{k}</dt>
                <dd className="mt-0.5 leading-snug text-[#0d0d0d]">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 border-t border-black/10 pt-4">
            <p className="text-[12px] text-[#8f8f8f]" id="thr-label">Change an assumption: threshold</p>
            <div role="radiogroup" aria-labelledby="thr-label" className="mt-2 inline-flex rounded-[10px] border border-black/10 p-0.5">
              {THRESHOLDS.map((x, i) => (
                <button
                  key={x.k}
                  role="radio"
                  aria-checked={t === i}
                  onClick={() => setT(i)}
                  className={clsx("rounded-[8px] px-3 py-1.5 text-[13px] tabular-nums transition-colors duration-300", t === i ? "bg-black/[0.05] font-medium text-[#0d0d0d]" : "text-[#5d5d5d] hover:text-[#0d0d0d]")}
                >
                  {x.k}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[12px] text-[#8f8f8f]">Re-runs the same code on the new definition.</p>
          </div>
          <div className="mt-4 border-t border-black/10 pt-4">
            <p className="text-[12px] text-[#8f8f8f]">Key assumptions</p>
            <ul className="mt-1.5 space-y-1.5 text-[13px] leading-snug text-[#5d5d5d]">
              <li>Episodes don’t overlap.</li>
              <li>Price returns, not adjusted for the market.</li>
              <li>Today’s index members, so earlier periods carry survivorship bias.</li>
            </ul>
          </div>
        </div>

        {/* result */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-3 divide-x divide-black/10 border-b border-black/10 pb-4">
            {[
              ["Past episodes", String(THRESHOLDS[t].episodes)],
              [`Median stock, ${HORIZONS[h].k}`, fmt(median)],
              ["Positive at 3M", `${THRESHOLDS[t].positive}%`],
            ].map(([k, v], i) => (
              <div key={k} className={i === 0 ? "pr-3" : "px-3"}>
                <p className="text-[12px] text-[#8f8f8f]">{k}</p>
                <motion.p key={v} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className={clsx("mt-1 tabular-nums text-[#0d0d0d]", i === 1 ? "text-[22px] font-semibold" : "text-[16px] font-medium")}>
                  {v}
                </motion.p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[14px] font-semibold text-[#0d0d0d]">Median return by sector</p>
            <div role="group" aria-label="Horizon" className="inline-flex rounded-[10px] border border-black/10 p-0.5">
              {HORIZONS.map((x, i) => (
                <button
                  key={x.k}
                  aria-pressed={h === i}
                  onClick={() => setH(i)}
                  className={clsx("rounded-[8px] px-2.5 py-1 text-[12px] transition-colors duration-300", h === i ? "bg-black/[0.05] font-medium text-[#0d0d0d]" : "text-[#5d5d5d] hover:text-[#0d0d0d]")}
                >
                  {x.k}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
            {SECTORS.map(([name, v]) => {
              const val = s(v);
              const w = Math.min(Math.abs(val) / MAX, 1) * 50;
              const pos = val >= 0;
              return (
                <li key={name} className="grid grid-cols-[112px_1fr_52px] items-center gap-3 py-2 text-[13px] sm:grid-cols-[180px_1fr_56px]">
                  <span className="truncate text-[#5d5d5d]">{name}</span>
                  <span className="relative h-3">
                    <span className="absolute inset-y-0 left-1/2 w-px bg-black/15" />
                    <motion.span
                      className="absolute inset-y-[4px] bg-[#0d0d0d]/60"
                      initial={false}
                      animate={pos ? { left: "50%", width: `${w}%` } : { left: `${50 - w}%`, width: `${w}%` }}
                      transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
                    />
                  </span>
                  <span className="text-right tabular-nums text-[#0d0d0d]">{fmt(val)}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <MissingData label="Pre-listing history, 212 stocks" reason="Excluded pre-listing" />
            <span className="justify-self-start rounded-[10px] border border-black/10 bg-white px-3 py-1.5 text-[13px] font-medium text-[#0d0d0d]">Re-run on latest data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
