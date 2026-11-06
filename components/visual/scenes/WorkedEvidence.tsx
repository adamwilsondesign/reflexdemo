"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";
import { Canvas, Cursor, Icon, RX_EASE, useTimeline } from "@/components/visual/kit";
import { useAnchor } from "@/components/visual/anchor";

/**
 * Home · Worked example 04 — "Inspect it before you act on it".
 * Composition: an evidence panel with tabs and a status pill. The cursor walks
 * Sources → Calculation → Gaps: filings, the code that ran, and the one input
 * Alfred refused to estimate.
 */
const TABS = ["Sources", "Calculation", "Gaps"] as const;
// 0 sources · 1 move · 2 press · 3 calc · 4 move · 5 press · 6 gaps · 7 out
const D = [2600, 800, 350, 3000, 800, 350, 3400, 700];

export function WorkedEvidence() {
  const { p, ref, cycle } = useTimeline(D, { still: 3 });
  const root = useRef<HTMLDivElement>(null);
  const tCalc = useRef<HTMLSpanElement>(null);
  const tGap = useRef<HTMLSpanElement>(null);
  const aCalc = useAnchor(root, tCalc, [cycle], { dx: 4, dy: 3 });
  const aGap = useAnchor(root, tGap, [cycle], { dx: 4, dy: 3 });
  const tab = p >= 6 && p < 7 ? 2 : p >= 3 && p < 7 ? 1 : 0;
  const cursor =
    p === 1 || p === 2 || p === 3 ? { x: aCalc?.x ?? 200, y: aCalc?.y ?? 100, visible: true } :
    p === 4 || p === 5 ? { x: aGap?.x ?? 300, y: aGap?.y ?? 100, visible: true } :
    p === 6 ? { x: (aGap?.x ?? 300) + 36, y: (aGap?.y ?? 100) + 120, visible: true } :
    { x: 470, y: 470, visible: false };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.25}>
        <div ref={root} className="absolute inset-0">
          <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 7 ? 0 : 1 }} transition={{ duration: 0.6 }}>
            <motion.div className="rx-card rx-card-lift absolute left-[36px] top-[78px] h-[324px] w-[488px] overflow-hidden" initial={{ y: 16 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
              <div className="px-6 pt-5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-[var(--rx-3)]">Evidence · Input-cost pass-through</p>
                  <span className="flex items-center gap-1 rounded-full bg-[rgb(47_116_87/.1)] px-2 py-0.5 text-[10.5px] font-medium text-[#2f7457]"><Icon name="check" size={11} />4 of 5 inputs sourced</span>
                </div>
                <p className="rx-serif mt-1.5 text-[19px] leading-[26px]">Margin sensitivity, four holdings</p>
                <div className="relative mt-4 flex gap-5 border-b border-[var(--rx-line)] text-[12.5px]">
                  {TABS.map((t, i) => (
                    <span key={t} ref={i === 1 ? tCalc : i === 2 ? tGap : undefined} className={clsx("relative pb-2.5 transition-colors duration-300", tab === i ? "font-medium text-[var(--rx-ink)]" : "text-[var(--rx-3)]")}>
                      {t}
                      {i === 2 && <span className="rx-num ml-1.5 rounded-[4px] bg-[var(--rx-well)] px-1 text-[10px] text-[var(--rx-2)]">1</span>}
                      {tab === i && <motion.span layoutId={`we-tab-${cycle}`} className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-[var(--rx-ink)]" transition={{ duration: 0.4, ease: RX_EASE }} />}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative px-6 pt-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: RX_EASE }}>
                    {tab === 0 && (
                      <div>
                        {[["10-Q · Pricing and contracts", "Filing · p.31"], ["Q2 earnings call", "Transcript · 14:22"], ["Input prices, flash PMI", "S&P Global · Sept"]].map(([a, b], i) => (
                          <div key={a} className="flex h-[52px] items-center gap-3 border-b border-[var(--rx-line)] last:border-b-0">
                            <span className="rx-num grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[var(--rx-well)] text-[10px] font-medium text-[var(--rx-2)]">{i + 1}</span>
                            <Icon name="doc" size={15} className="text-[var(--rx-3)]" />
                            <span className="flex-1 text-[13px] font-medium">{a}</span>
                            <span className="text-[11.5px] text-[var(--rx-3)]">{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {tab === 1 && (
                      <div>
                        <div className="rx-num rounded-[10px] bg-[#17191c] p-4 text-[12px] leading-[21px] text-white/85">
                          <p><span className="text-[#9fb4c9]">gm_bps</span> = −52 <span className="text-white/45"># per 1% input inflation [1]</span></p>
                          <p><span className="text-[#9fb4c9]">shock</span> = 3.1 <span className="text-white/45"># prices paid, YoY [3]</span></p>
                          <p><span className="text-[#9fb4c9]">impact</span> = gm_bps * shock</p>
                        </div>
                        <motion.div className="mt-3 flex items-center justify-between rounded-[10px] border border-[var(--rx-line)] px-4 py-3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5, ease: RX_EASE }}>
                          <span className="text-[12px] text-[var(--rx-2)]">Gross margin impact</span>
                          <span className="rx-num text-[16px] font-medium text-[#a6503a]">−161 bps</span>
                        </motion.div>
                      </div>
                    )}
                    {tab === 2 && (
                      <div className="flex items-start gap-3 rounded-[10px] p-4 ring-1 ring-inset ring-[#2f7457]/25" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgb(47 116 87 / 0.14) 0 1px, transparent 1px 6px)" }}>
                        <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-[3px] bg-white ring-1 ring-[#2f7457]/40" />
                        <span>
                          <span className="block text-[13px] font-medium">Hedging book · Honeywell</span>
                          <span className="mt-1 block text-[12px] leading-[18px] text-[var(--rx-2)]">Not disclosed. Left out of the calculation, not estimated.</span>
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
            <Cursor {...cursor} press={p === 2 || p === 5} />
          </motion.div>
        </div>
      </Canvas>
    </div>
  );
}
