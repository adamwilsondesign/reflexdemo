"use client";

import { motion } from "motion/react";
import { Stage } from "@/components/product/ui";
import { useLoop } from "../../_components/useLoop";

const EASE = [0.16, 1, 0.3, 1] as const;
const W = 400;
const H = 200;
const ORIGIN = 92; // y of 0% line
const TICKS = [
  { x: 0, l: "0" },
  { x: 0.07, l: "1W" },
  { x: 0.2, l: "1M" },
  { x: 0.42, l: "3M" },
  { x: 0.68, l: "6M" },
  { x: 1, l: "1Y" },
];
// illustrative median path (% return) at each tick
const MEDIAN = [0, -0.4, -1.1, -2.1, -1.4, 0.6];
const SCALE = 9; // px per %

const med = TICKS.map((t, i) => [t.x * W, ORIGIN - MEDIAN[i] * SCALE] as const);
const smooth = (pts: readonly (readonly [number, number])[]) =>
  pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `C${(pts[i - 1][0] + p[0]) / 2},${pts[i - 1][1]} ${(pts[i - 1][0] + p[0]) / 2},${p[1]} ${p[0]},${p[1]}`)).join(" ");
const MEDIAN_D = smooth(med);
const band = (k: number) => TICKS.map((t, i) => [t.x * W, ORIGIN - MEDIAN[i] * SCALE - k * Math.sqrt(t.x) * 48] as const);
const UP = band(1);
const DN = band(-1);
const BAND_D = `${smooth(UP)} L${DN[DN.length - 1][0]},${DN[DN.length - 1][1]} ${smooth([...DN].reverse()).replace(/^M/, "L")} Z`;

/** Hero: forward returns after past rate-shock episodes; a cursor reads the median by horizon. */
export function FanChart() {
  const { ref, step, reduce } = useLoop(TICKS.length - 1, 1800, 2);
  const i = step + 1;
  const cx = TICKS[i].x * W;
  return (
    <Stage field="mist" className="p-4 sm:p-7">
      <div ref={ref} className="ui-card mx-auto max-w-[560px] p-4">
        <p className="text-[12px] text-[#8f8f8f]">Scenario · S&amp;P 1500 · 50+ years</p>
        <p className="mt-0.5 text-[15px] font-semibold leading-snug text-[#0d0d0d]">US 10-year yield +0.5pp in three months</p>
        <div className="relative mt-4">
          <svg viewBox={`0 -10 ${W} ${H - 4}`} className="h-auto w-full overflow-visible" aria-hidden="true">
            <line x1={0} x2={W} y1={ORIGIN} y2={ORIGIN} stroke="rgb(0 0 0 / 0.1)" strokeWidth={1} />
            <motion.path d={BAND_D} fill="rgb(0 0 0 / 0.04)" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} />
            <motion.path d={MEDIAN_D} fill="none" stroke="#0d0d0d" strokeOpacity={0.7} strokeWidth={1.5} initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 0.3, ease: EASE }} />
            <motion.line x1={cx} x2={cx} y1={-6} y2={H - 14} stroke="rgb(0 0 0 / 0.15)" strokeWidth={1} animate={{ x1: cx, x2: cx }} transition={{ duration: 0.8, ease: EASE }} />
            <motion.circle r={3.5} fill="#0d0d0d" animate={{ cx, cy: med[i][1] }} transition={{ duration: 0.8, ease: EASE }} />
          </svg>
          <div className="relative mt-1 h-4 text-[12px] text-[#8f8f8f]">
            {TICKS.filter((t) => t.x > 0).map((t) => (
              <span key={t.l} className={t.x === 1 ? "absolute right-0" : "absolute -translate-x-1/2"} style={t.x === 1 ? undefined : { left: `${t.x * 100}%` }}>{t.l}</span>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3">
          <span className="text-[13px] text-[#5d5d5d]">Median stock, {TICKS[i].l} after</span>
          <motion.span key={i} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-[18px] font-semibold tabular-nums text-[#0d0d0d]">
            {MEDIAN[i] > 0 ? "+" : MEDIAN[i] < 0 ? "−" : ""}{Math.abs(MEDIAN[i]).toFixed(1)}%
          </motion.span>
        </div>
      </div>
    </Stage>
  );
}
