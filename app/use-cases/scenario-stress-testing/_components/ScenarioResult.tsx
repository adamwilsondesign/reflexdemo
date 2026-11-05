"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { MissingData, Pill } from "@/components/product/ui";

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
  ["Industrials", -0.6],
  ["Materials", -0.9],
  ["Health Care", -1.2],
  ["Consumer Staples", -1.9],
  ["Communication Services", -2.4],
  ["Consumer Discretionary", -3.1],
  ["Information Technology", -3.6],
  ["Real Estate", -4.8],
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
  const fin = { lo: -14, q1: -5, med: 1.1, q3: 7, hi: 16 };
  const s = (v: number) => v * mult;

  return (
    <div className="overflow-hidden rounded-[18px] border border-ink/10 bg-white shadow-[0_30px_80px_-40px_rgb(23_25_28/0.35)]">
      <div className="grid lg:grid-cols-[340px_1fr]">
        {/* inputs */}
        <div className="border-b border-ink/8 bg-lake-900 p-6 text-paper lg:border-b-0 md:p-7">
          <p className="t-ui text-[10px] text-paper/55">Inputs</p>
          <dl className="mt-4 space-y-4 text-[13.5px]">
            {[
              ["Trigger", "US 10-year Treasury yield rises by at least the threshold over 3 months (Treasuries sell off)"],
              ["Universe", "S&P 1500 constituents"],
              ["History window", "50+ years of daily market data"],
              ["Measure", "Median return per stock, from one week to one year after each episode"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-paper/45">{k}</dt>
                <dd className="mt-1 leading-snug text-paper/90">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 border-t border-white/12 pt-5">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-paper/45" id="thr-label">Change an assumption · threshold</p>
            <div role="radiogroup" aria-labelledby="thr-label" className="mt-2.5 inline-flex rounded-full bg-white/10 p-1">
              {THRESHOLDS.map((x, i) => (
                <button
                  key={x.k}
                  role="radio"
                  aria-checked={t === i}
                  onClick={() => setT(i)}
                  className={clsx("rounded-full px-3.5 py-1.5 font-mono text-[11.5px] transition-colors duration-300", t === i ? "bg-paper text-ink" : "text-paper/70 hover:text-paper")}
                >
                  {x.k}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[12px] text-paper/50">Re-runs the same code on the new definition.</p>
          </div>
          <div className="mt-6 border-t border-white/12 pt-5">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-paper/45">Key assumptions</p>
            <ul className="mt-2.5 space-y-2 text-[12.5px] leading-snug text-paper/70">
              <li>Episodes don’t overlap; a new episode starts only after the previous window closes.</li>
              <li>Returns are price returns, not adjusted for the market.</li>
              <li>Today’s index members are used, so earlier periods carry survivorship bias.</li>
            </ul>
          </div>
        </div>

        {/* result */}
        <div className="p-5 md:p-8">
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[12px] bg-ink/10">
            {[
              ["Past episodes", String(THRESHOLDS[t].episodes)],
              [`Median stock · ${HORIZONS[h].k}`, fmt(median)],
              ["Stocks positive · 3M", `${THRESHOLDS[t].positive}%`],
            ].map(([k, v]) => (
              <div key={k} className="bg-mist-100 p-3.5 sm:p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.05em] text-ink/45 sm:text-[9.5px]">{k}</p>
                <motion.p key={v} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="mt-1.5 font-display text-[20px] font-semibold leading-none tracking-[-0.02em] sm:text-[28px]">
                  {v}
                </motion.p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-[16px] font-semibold">Median return by sector</p>
            <div role="group" aria-label="Horizon" className="inline-flex rounded-full bg-ink/[0.06] p-1">
              {HORIZONS.map((x, i) => (
                <button
                  key={x.k}
                  aria-pressed={h === i}
                  onClick={() => setH(i)}
                  className={clsx("rounded-full px-3 py-1 font-mono text-[11px] transition-colors duration-300", h === i ? "bg-ink text-paper" : "text-ink/60 hover:text-ink")}
                >
                  {x.k}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-4 space-y-1.5">
            {SECTORS.map(([name, v]) => {
              const val = s(v);
              const w = Math.min(Math.abs(val) / MAX, 1) * 50;
              const pos = val >= 0;
              return (
                <li key={name} className="grid grid-cols-[minmax(0,130px)_1fr_52px] items-center gap-3 text-[12px] sm:grid-cols-[180px_1fr_56px]">
                  <span className="truncate text-ink/70">{name}</span>
                  <span className="relative h-4">
                    <span className="absolute inset-y-0 left-1/2 w-px bg-ink/20" />
                    <motion.span
                      className={clsx("absolute inset-y-[3px] rounded-[2px]", pos ? "bg-pine-500" : "bg-[#9a4b3c]/80")}
                      initial={false}
                      animate={pos ? { left: "50%", width: `${w}%` } : { left: `${50 - w}%`, width: `${w}%` }}
                      transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
                    />
                  </span>
                  <span className={clsx("text-right font-mono text-[11px]", pos ? "text-pine-500" : "text-[#9a4b3c]")}>{fmt(val)}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <div className="rounded-[12px] border border-ink/10 p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">Range of outcomes · Financials · {HORIZONS[h].k}</p>
              </div>
              <div className="relative mt-5 h-8">
                <span className="absolute inset-x-0 top-1/2 h-px bg-ink/15" />
                {(() => {
                  const sc = (v: number) => 50 + (s(v) / 40) * 50;
                  return (
                    <>
                      <motion.span className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-ink/50" animate={{ left: `${sc(fin.lo)}%` }} transition={{ duration: 0.6, ease: EASE }} />
                      <motion.span className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-ink/50" animate={{ left: `${sc(fin.hi)}%` }} transition={{ duration: 0.6, ease: EASE }} />
                      <motion.span className="absolute inset-y-0 rounded-[3px] border border-lake-500 bg-lake-100" animate={{ left: `${sc(fin.q1)}%`, width: `${sc(fin.q3) - sc(fin.q1)}%` }} transition={{ duration: 0.6, ease: EASE }} />
                      <motion.span className="absolute inset-y-0 w-[2px] bg-lake-700" animate={{ left: `${sc(fin.med)}%` }} transition={{ duration: 0.6, ease: EASE }} />
                    </>
                  );
                })()}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[9.5px] text-ink/45">
                <span>Worst {fmt(s(fin.lo))}</span>
                <span>Median {fmt(s(fin.med))}</span>
                <span>Best {fmt(s(fin.hi))}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-3">
              <MissingData label="Pre-listing history, 212 stocks" reason="Excluded pre-listing" />
              <div className="flex items-center justify-between rounded-lg border border-ink/10 px-3 py-2.5">
                <span className="text-[12.5px] text-ink/70">Re-run on the latest data</span>
                <Pill tone="lake">Re-runnable</Pill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
