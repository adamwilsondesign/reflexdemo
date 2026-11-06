"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, CiteChip, Cursor, Icon, RX_EASE, Spark, useTimeline } from "@/components/visual/kit";

/**
 * Deep Research — "What a research memo looks like".
 * Composition: a memo page, and a calculation drawer that slides in from the
 * right edge of the frame. The cursor selects a figure and asks where it came from.
 */
// 0 memo · 1 select · 2 menu · 3 move · 4 press · 5 drawer
const D = [2400, 1300, 900, 800, 350, 4400];

const BINS = [2, 4, 7, 12, 19, 27, 34, 38, 36, 30, 22, 15, 9, 5, 3, 2];

export function MemoTrace() {
  const { p, ref, cycle } = useTimeline(D, { still: 5 });
  const cursor =
    p === 0 ? { x: 120, y: 520, visible: false } :
    p === 1 ? { x: 178, y: 222, visible: true } :
    p === 2 ? { x: 180, y: 224, visible: true } :
    { x: 150, y: 272, visible: p < 5 };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <motion.div className="rx-card rx-card-lift absolute left-[28px] top-[30px] w-[400px] p-6" animate={{ x: p === 5 ? -10 : 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 font-semibold"><Spark size={11} className="text-[var(--rx-signal)]" />Research memo</span>
              <span className="text-[var(--rx-3)]">10,000 paths · 6 sources</span>
            </div>
            <p className="rx-serif mt-4 text-[21px] leading-[28px]">Downside to an AI infrastructure basket in a 5% correction</p>
            <p className="rx-serif mt-3 text-[14px] leading-[23px] text-[var(--rx-2)]">
              Across ten equal-weighted names, the basket loses 8.9% on average when the S&amp;P 500 falls 5%, with a{" "}
              <span className="relative whitespace-nowrap text-[var(--rx-ink)]">
                <motion.span className="absolute -inset-x-0.5 inset-y-0 origin-left rounded-[3px] bg-[var(--rx-signal-soft)]" initial={false} animate={{ scaleX: p >= 1 ? 1 : 0 }} transition={{ duration: 1, ease: "linear" }} style={{ boxShadow: "inset 0 -1.5px 0 var(--rx-signal)" }} />
                <span className="relative">95% VaR of 14.2%</span>
              </span>
              .<CiteChip n={1} active={p === 5} />
            </p>
            <p className="rx-serif mt-3 text-[14px] leading-[23px] text-[var(--rx-2)]">NVDA, AMD and VRT drive 61% of the risk.<CiteChip n={2} /> A put spread on a semiconductor ETF offsets most of it at modest cost.<CiteChip n={3} /></p>
            <div className="mt-4 flex gap-1.5">
              {["Expected loss −8.9%", "95% VaR −14.2%", "Hedge cost 0.6%"].map((t) => <span key={t} className="rx-num rounded-[6px] bg-[var(--rx-well)] px-2 py-1 text-[10.5px] text-[var(--rx-2)]">{t}</span>)}
            </div>

            <AnimatePresence>
              {p >= 2 && p <= 4 && (
                <motion.div className="rx-card absolute left-[60px] top-[222px] z-10 w-[188px] p-1.5" initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.3, ease: RX_EASE }} style={{ transformOrigin: "30% 0%" }}>
                  {[["Show calculation", "graph"], ["Open source", "doc"], ["Add to brief", "plus"]].map(([l, ic], i) => (
                    <span key={l} className={clsx("flex h-8 items-center gap-2 rounded-[8px] px-2.5 text-[12px] transition-colors", i === 0 && p >= 3 ? "bg-[var(--rx-well)] text-[var(--rx-ink)]" : "text-[var(--rx-2)]")}>
                      <Icon name={ic as "graph"} size={13} />{l}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {p === 5 && (
              <motion.div className="rx-card rx-card-lift absolute left-[330px] top-[84px] w-[300px] p-5" initial={{ x: 120, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 60, opacity: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
                <p className="text-[11px] font-medium text-[var(--rx-3)]">Calculation <CiteChip n={1} active /></p>
                <p className="mt-1 text-[14px] font-medium">Simulated basket returns</p>
                <svg viewBox="0 0 220 96" className="mt-3 h-[96px] w-[220px] overflow-visible">
                  {BINS.map((b, i) => (
                    <motion.rect key={i} x={i * 13.75 + 1} width="11" rx="2" fill={i <= 2 ? "#e9a93a" : "#3e5368"} fillOpacity={i <= 2 ? 0.9 : 0.35} initial={{ y: 86, height: 0 }} animate={{ y: 86 - b * 2.1, height: b * 2.1 }} transition={{ delay: 0.4 + i * 0.03, duration: 0.6, ease: RX_EASE }} />
                  ))}
                  <motion.line x1="42" x2="42" y1="0" y2="88" stroke="#c98a1c" strokeWidth="1.2" strokeDasharray="3 3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} />
                  <text x="46" y="9" fontSize="9" fill="#8a5a12" className="rx-num">VaR 95%</text>
                  <line x1="0" x2="220" y1="88" y2="88" stroke="#17191c" strokeOpacity=".15" />
                </svg>
                <div className="rx-num mt-3 space-y-1 border-t border-[var(--rx-line)] pt-3 text-[10.5px] text-[var(--rx-2)]">
                  <p className="flex justify-between"><span>Paths</span><span>10,000</span></p>
                  <p className="flex justify-between"><span>Shock</span><span>S&amp;P 500 −5%</span></p>
                  <p className="flex justify-between"><span>Betas</span><span>2Y daily</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Cursor {...cursor} press={p === 4} />
        </motion.div>
      </Canvas>
    </div>
  );
}
