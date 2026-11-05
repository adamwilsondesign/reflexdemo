"use client";

import { motion } from "motion/react";
import { Pill, Stage } from "@/components/product/ui";
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

function walk(seed: number) {
  let s = seed;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const pts: [number, number][] = [[0, ORIGIN]];
  let v = 0;
  const bias = (r() - 0.55) * 0.5;
  for (let i = 1; i <= 40; i++) {
    v += bias + (r() - 0.5) * 1.6;
    pts.push([(i / 40) * W, ORIGIN - v * SCALE * 0.9]);
  }
  return pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
}
const PATHS = Array.from({ length: 22 }, (_, i) => walk(11 + i * 37));
const med = TICKS.map((t, i) => [t.x * W, ORIGIN - MEDIAN[i] * SCALE] as const);
const smooth = (pts: readonly (readonly [number, number])[]) =>
  pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `C${(pts[i - 1][0] + p[0]) / 2},${pts[i - 1][1]} ${(pts[i - 1][0] + p[0]) / 2},${p[1]} ${p[0]},${p[1]}`)).join(" ");
const MEDIAN_D = smooth(med);
const band = (k: number) => TICKS.map((t, i) => [t.x * W, ORIGIN - MEDIAN[i] * SCALE - k * Math.sqrt(t.x) * 62] as const);
const UP = band(1);
const DN = band(-1);
const BAND_D = `${smooth(UP)} L${DN[DN.length - 1][0]},${DN[DN.length - 1][1]} ${smooth([...DN].reverse()).replace(/^M/, "L")} Z`;

/** Hero: forward returns after past rate-shock episodes, drawn as a fan; a cursor reads the median by horizon. */
export function FanChart() {
  const { ref, step, reduce } = useLoop(TICKS.length - 1, 1800, 2);
  const i = step + 1;
  const cx = TICKS[i].x * W;
  return (
    <Stage field="mist" className="p-4 sm:p-7">
      <div ref={ref} className="mx-auto max-w-[560px] space-y-3">
        <div className="ui-card p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="t-ui text-[10px] text-ink/45">Scenario · inputs</span>
            <Pill tone="lake">Code-backed</Pill>
          </div>
          <dl className="mt-3 grid grid-cols-3 gap-3 text-[12px]">
            {[
              ["Trigger", "US 10Y yield +0.5pp in 3M"],
              ["Universe", "S&P 1500"],
              ["History", "50+ years"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">{k}</dt>
                <dd className="mt-0.5 font-display font-semibold leading-snug text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="ui-card p-4">
          <div className="flex items-center justify-between">
            <span className="t-ui text-[10px] text-ink/45">Forward returns · past episodes</span>
            <span className="flex items-center gap-3 font-mono text-[9.5px] uppercase text-ink/45">
              <span className="flex items-center gap-1.5"><span className="h-[2px] w-3 bg-lake-700" />Median</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-lake-300/50" />25–75th</span>
            </span>
          </div>
          <div className="relative mt-3">
            <svg viewBox={`0 -10 ${W} ${H + 10}`} className="h-auto w-full overflow-visible" aria-hidden="true">
              {TICKS.map((t) => (
                <line key={t.l} x1={t.x * W} x2={t.x * W} y1={-6} y2={H - 14} stroke="rgb(23 25 28 / 0.07)" strokeWidth={1} />
              ))}
              <line x1={0} x2={W} y1={ORIGIN} y2={ORIGIN} stroke="rgb(23 25 28 / 0.25)" strokeWidth={1} strokeDasharray="3 3" />
              {PATHS.map((d, k) => (
                <motion.path key={k} d={d} fill="none" stroke="rgb(62 83 104 / 0.22)" strokeWidth={1} initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.4 + k * 0.04, ease: EASE }} />
              ))}
              <motion.path d={BAND_D} fill="rgb(143 163 182 / 0.35)" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.6 }} />
              <motion.path d={MEDIAN_D} fill="none" stroke="#3e5368" strokeWidth={2.2} initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 1.9, ease: EASE }} />
              <motion.line x1={cx} x2={cx} y1={-6} y2={H - 14} stroke="#17191c" strokeWidth={1} animate={{ x1: cx, x2: cx }} transition={{ duration: 0.8, ease: EASE }} />
              <motion.circle r={4} fill="#17191c" stroke="#f7f6f4" strokeWidth={2} animate={{ cx, cy: med[i][1] }} transition={{ duration: 0.8, ease: EASE }} />
              {TICKS.map((t) => (
                <text key={t.l} x={t.x * W} y={H} textAnchor={t.x === 0 ? "start" : t.x === 1 ? "end" : "middle"} className="fill-ink/45 font-mono text-[10px]">{t.l}</text>
              ))}
            </svg>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-ink/8 pt-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-ink/45">Median stock · {TICKS[i].l} after</span>
            <motion.span key={i} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className={"font-display text-[18px] font-semibold " + (MEDIAN[i] < 0 ? "text-[#9a4b3c]" : "text-pine-500")}>
              {MEDIAN[i] > 0 ? "+" : MEDIAN[i] < 0 ? "−" : ""}{Math.abs(MEDIAN[i]).toFixed(1)}%
            </motion.span>
          </div>
        </div>
      </div>
    </Stage>
  );
}
