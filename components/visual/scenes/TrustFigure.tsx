"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, CiteChip, Cursor, Icon, RX_EASE, useTimeline } from "@/components/visual/kit";

/**
 * Alfred · Trust — one figure, inspected three ways.
 * Composition: a figure card with a source table; the cursor inspects one thing
 * and a crisp side card answers it: the source passage (focus 0), the gap Alfred
 * refused to fill (focus 1), or the calculation behind the number (focus 2).
 * Figures from Amazon.com’s Q4 2023 and Q4 2024 earnings releases.
 */
const ROWS = [
  { k: "AWS sales, Q4 2024", v: "$28.8B", c: 1 },
  { k: "AWS sales, Q4 2023", v: "$24.2B", c: 2 },
  { k: "AWS operating income", v: "$10.6B", c: 1 },
  { k: "AI revenue within AWS", v: null, c: 0 },
];

// cursor targets per focus (canvas px)
const TARGET = [
  { x: 137, y: 113 }, // cite chip beside +19%
  { x: 262, y: 304 }, // hatched cell
  { x: 82, y: 100 }, // the +19% figure
];

// 0 card · 1 move · 2 press · 3 hold
const D = [700, 900, 450, 6000];

export function TrustFigure({ focus = 0 }: { focus?: 0 | 1 | 2 }) {
  const { p, ref } = useTimeline(D, { still: 3, loop: false });
  const show = p >= 2;
  const cursor = p === 0 ? { x: 420, y: 430, visible: false } : { ...TARGET[focus], visible: p <= 2 || p === 3 };

  return (
    <div ref={ref}>
      <Canvas w={560} h={440} focusX={0.15}>
        <motion.div className="rx-card rx-card-lift absolute left-[24px] top-[36px] w-[304px] p-5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: RX_EASE }}>
          <p className="h-4 text-[11.5px] text-[var(--rx-3)]">AWS revenue growth · Q4 2024</p>
          <p className="rx-num mt-1.5 flex h-[40px] items-center text-[32px] font-medium tracking-[-0.03em]">
            <span className={clsx("rounded-[6px] px-1 transition-colors duration-500", focus === 2 && show ? "bg-[var(--rx-signal-soft)]" : "")}>+19%</span>
            <span className="-ml-0.5 self-start pt-1"><CiteChip n={1} active={focus === 0 && show} /></span>
          </p>
          <p className="mt-1 text-[12px] text-[var(--rx-2)]">Year over year, segment sales</p>
          <div className="mt-4 border-t border-[var(--rx-line)]">
            {ROWS.map((r, i) => (
              <div key={r.k} className={clsx("relative flex h-[42px] items-center border-b border-[var(--rx-line)] last:border-0", focus === 1 && show && i === 3 && "bg-[var(--rx-well)]")}>
                <span className="flex-1 text-[12.5px] text-[var(--rx-2)]">{r.k}</span>
                {r.v ? (
                  <span className="rx-num text-[12.5px]">{r.v}<CiteChip n={r.c} active={focus === 0 && show && r.c === 1} /></span>
                ) : (
                  <span className="rx-hatch rx-num rounded-[5px] px-2 py-1 text-[10.5px] text-[var(--rx-2)] ring-1 ring-inset ring-[#2f7457]/30">not disclosed</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {show && (
            <motion.div
              className="rx-card absolute left-[312px] top-[150px] z-10 w-[230px] p-4"
              style={{ top: focus === 1 ? 236 : 150 }}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: RX_EASE, delay: 0.15 }}
            >
              {focus === 0 && (
                <>
                  <p className="flex items-center gap-2 text-[11px] text-[var(--rx-3)]"><span className="grid h-6 w-6 place-items-center rounded-[7px] bg-[var(--rx-well)] text-[var(--rx-2)]"><Icon name="doc" size={13} /></span>Source <CiteChip n={1} active /></p>
                  <p className="mt-2.5 text-[12.5px] font-medium leading-[18px]">Amazon.com Q4 2024 earnings release</p>
                  <p className="rx-serif mt-2 border-l-2 border-[var(--rx-line)] pl-2.5 text-[13px] leading-[20px] text-[var(--rx-2)]">
                    “AWS segment sales{" "}
                    <span className="relative text-[var(--rx-ink)]">
                      <motion.span className="absolute -inset-x-0.5 inset-y-0 origin-left rounded-[3px] bg-[var(--rx-signal-soft)]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.8, ease: "linear" }} />
                      <span className="relative">increased 19%</span>
                    </span>{" "}
                    year-over-year to $28.8 billion.”
                  </p>
                  <p className="mt-2.5 text-[11px] text-[var(--rx-3)]">Segment results · Feb 6, 2025</p>
                </>
              )}
              {focus === 1 && (
                <>
                  <p className="flex items-center gap-2 text-[12.5px] font-medium"><Flag />Gap flagged</p>
                  <p className="mt-2 text-[12px] leading-[18px] text-[var(--rx-2)]">Amazon does not report AI revenue inside AWS. Alfred leaves the cell empty instead of estimating it.</p>
                  <div className="mt-3 flex gap-1.5">
                    <span className="rounded-[6px] bg-[var(--rx-well)] px-2 py-1 text-[10.5px] text-[var(--rx-2)]">Not disclosed by issuer</span>
                  </div>
                </>
              )}
              {focus === 2 && (
                <>
                  <p className="flex items-center gap-2 text-[11px] text-[var(--rx-3)]"><span className="grid h-6 w-6 place-items-center rounded-[7px] bg-[var(--rx-well)] text-[var(--rx-2)]"><Icon name="graph" size={13} /></span>Calculation</p>
                  <div className="mt-3 space-y-1.5 text-[11.5px] text-[var(--rx-2)]">
                    <p className="flex justify-between"><span>Q4 2024 sales</span><span className="rx-num text-[var(--rx-ink)]">28.79<CiteChip n={1} /></span></p>
                    <p className="flex justify-between"><span>Q4 2023 sales</span><span className="rx-num text-[var(--rx-ink)]">24.20<CiteChip n={2} /></span></p>
                  </div>
                  <motion.p className="rx-num mt-3 rounded-[8px] bg-[var(--rx-well)] px-2.5 py-2 text-[11.5px]" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
                    28.79 ÷ 24.20 − 1 = <span className="font-medium">0.190</span>
                  </motion.p>
                  <motion.p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[var(--rx-up)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}><Icon name="check" size={12} />Matches the reported 19%</motion.p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <Cursor {...cursor} press={p === 2} />
      </Canvas>
    </div>
  );
}

function Flag() {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-[var(--rx-well)] text-[var(--rx-down)]">
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><path d="M4 14V2.5M4 3h7.5l-1.6 2.6L11.5 8.2H4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}
