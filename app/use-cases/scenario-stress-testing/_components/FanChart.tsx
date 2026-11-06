"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Stage } from "@/components/product/ui";
import { MOTION_EASE, MockPanel, StepDots, useCycle } from "@/components/product/motion";

const W = 400;
const H = 120;
const ORIGIN = 52; // y of the 0% line
const SCALE = 12; // px per %
// illustrative median path (% return) after past episodes
const PATH = [
  { x: 0, v: 0 },
  { x: 0.2, v: -1.1 },
  { x: 0.42, v: -2.1 },
  { x: 0.68, v: -1.4 },
  { x: 1, v: 0.6 },
];
const pts = PATH.map((p) => [p.x * W, ORIGIN - p.v * SCALE] as const);
const D = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `C${(pts[i - 1][0] + p[0]) / 2},${pts[i - 1][1]} ${(pts[i - 1][0] + p[0]) / 2},${p[1]} ${p[0]},${p[1]}`)).join(" ");

/** The three readouts the panel walks through: index into PATH + label. */
const READS = [
  { k: 1, label: "1 month after" },
  { k: 2, label: "3 months after" },
  { k: 4, label: "1 year after" },
];

const fmt = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(1)}%`;

/** Hero: what followed past rate shocks. The line draws once; a marker moves to each horizon and its value is revealed. */
export function FanChart() {
  const [i, ref, setI] = useCycle(READS.length, { ms: 4800 });
  const reduce = useReducedMotion();
  const r = READS[i];
  const [cx, cy] = pts[r.k];

  return (
    <Stage field="mist" className="flex items-center justify-center p-6 sm:p-10">
      <div ref={ref} className="w-full max-w-[400px]">
        <MockPanel height={264}>
          <div className="flex h-full flex-col">
            <p className="text-[13px] text-[#8f8f8f]">Scenario · S&amp;P 1500 · past episodes</p>
            <p className="mt-1 text-[16px] font-semibold leading-6 text-[#0d0d0d]">US 10-year yield up 0.5pp in 3 months</p>
            <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 h-auto w-full overflow-visible" aria-hidden="true">
              <line x1={0} x2={W} y1={ORIGIN} y2={ORIGIN} stroke="rgb(0 0 0 / 0.1)" strokeWidth={1} />
              <motion.path d={D} fill="none" stroke="#0d0d0d" strokeOpacity={0.7} strokeWidth={1.5} initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 0.3, ease: MOTION_EASE }} />
              <motion.line y1={0} y2={H} stroke="rgb(0 0 0 / 0.12)" strokeWidth={1} initial={false} animate={{ x1: cx, x2: cx }} transition={{ duration: 0.8, ease: MOTION_EASE }} />
              <motion.circle r={4} fill="#0d0d0d" initial={false} animate={{ cx, cy }} transition={{ duration: 0.8, ease: MOTION_EASE }} />
            </svg>
            <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={r.label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: MOTION_EASE }} className="text-[13px] text-[#5d5d5d]">
                  Median stock, {r.label}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={r.k} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: MOTION_EASE }} className="text-[18px] font-semibold tabular-nums text-[#0d0d0d]">
                  {fmt(PATH[r.k].v)}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </MockPanel>
        <StepDots count={READS.length} active={i} onDark={false} onSelect={setI} />
      </div>
    </Stage>
  );
}
