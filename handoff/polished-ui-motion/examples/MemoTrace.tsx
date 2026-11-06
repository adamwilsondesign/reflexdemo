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

/** Optional copy variant. Defaults are the approved lab content. */
export type MemoCopy = {
  meta: string;
  title: string;
  lead: React.ReactNode;
  span: string;
  rest: React.ReactNode;
  chips: string[];
  drawer: { title: string; bars: number[]; hi: number[]; marker?: { x: number; label: string }; rows: [string, string][] };
  /** Canvas point the cursor selects on the highlighted span (the menu opens under it). */
  anchor?: { x: number; y: number };
};

const DEFAULT_COPY: MemoCopy = {
  meta: "10,000 paths · 6 sources",
  title: "Downside to an AI infrastructure basket in a 5% correction",
  lead: <>Across ten equal-weighted names, the basket loses 8.9% on average when the S&amp;P 500 falls 5%, with a{" "}</>,
  span: "95% VaR of 14.2%",
  rest: <>NVDA, AMD and VRT drive 61% of the risk.<CiteChip n={2} /> A put spread on a semiconductor ETF offsets most of it at modest cost.<CiteChip n={3} /></>,
  chips: ["Expected loss −8.9%", "95% VaR −14.2%", "Hedge cost 0.6%"],
  drawer: { title: "Simulated basket returns", bars: BINS, hi: [0, 1, 2], marker: { x: 42, label: "VaR 95%" }, rows: [["Paths", "10,000"], ["Shock", "S&P 500 −5%"], ["Betas", "2Y daily"]] },
};

export function MemoTrace({ copy = DEFAULT_COPY }: { copy?: MemoCopy } = {}) {
  const c = copy;
  const n = c.drawer.bars.length;
  const step = 220 / n;
  const a = c.anchor ?? { x: 178, y: 222 };
  const { p, ref, cycle } = useTimeline(D, { still: 5 });
  const cursor =
    p === 0 ? { x: 120, y: 520, visible: false } :
    p === 1 ? { x: a.x, y: a.y, visible: true } :
    p === 2 ? { x: a.x + 2, y: a.y + 2, visible: true } :
    { x: a.x - 28, y: a.y + 50, visible: p < 5 };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <motion.div className="rx-card rx-card-lift absolute left-[28px] top-[30px] w-[400px] p-6" animate={{ x: p === 5 ? -10 : 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 font-semibold"><Spark size={11} className="text-[var(--rx-signal)]" />Research memo</span>
              <span className="text-[var(--rx-3)]">{c.meta}</span>
            </div>
            <p className="rx-serif mt-4 text-[21px] leading-[28px]">{c.title}</p>
            <p className="rx-serif mt-3 text-[14px] leading-[23px] text-[var(--rx-2)]">
              {c.lead}
              <span className="relative whitespace-nowrap text-[var(--rx-ink)]">
                <motion.span className="absolute -inset-x-0.5 inset-y-0 origin-left rounded-[3px] bg-[var(--rx-signal-soft)]" initial={false} animate={{ scaleX: p >= 1 ? 1 : 0 }} transition={{ duration: 1, ease: "linear" }} style={{ boxShadow: "inset 0 -1.5px 0 var(--rx-signal)" }} />
                <span className="relative">{c.span}</span>
              </span>
              .<CiteChip n={1} active={p === 5} />
            </p>
            <p className="rx-serif mt-3 text-[14px] leading-[23px] text-[var(--rx-2)]">{c.rest}</p>
            <div className="mt-4 flex gap-1.5">
              {c.chips.map((t) => <span key={t} className="rx-num rounded-[6px] bg-[var(--rx-well)] px-2 py-1 text-[10.5px] text-[var(--rx-2)]">{t}</span>)}
            </div>

            <AnimatePresence>
              {p >= 2 && p <= 4 && (
                <motion.div style={{ top: a.y, transformOrigin: "30% 0%" }} className="rx-card absolute left-[60px] z-10 w-[188px] p-1.5" initial={{ opacity: 0, y: -4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.3, ease: RX_EASE }}>
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
                <p className="mt-1 text-[14px] font-medium">{c.drawer.title}</p>
                <svg viewBox="0 0 220 96" className="mt-3 h-[96px] w-[220px] overflow-visible">
                  {c.drawer.bars.map((b, i) => (
                    <motion.rect key={i} x={i * step + 1} width={step * 0.8} rx="2" fill={c.drawer.hi.includes(i) ? "#e9a93a" : "#3e5368"} fillOpacity={c.drawer.hi.includes(i) ? 0.9 : 0.35} initial={{ y: 86, height: 0 }} animate={{ y: 86 - b * 2.1, height: b * 2.1 }} transition={{ delay: 0.4 + i * 0.03, duration: 0.6, ease: RX_EASE }} />
                  ))}
                  {c.drawer.marker && (
                    <>
                      <motion.line x1={c.drawer.marker.x} x2={c.drawer.marker.x} y1="0" y2="88" stroke="#c98a1c" strokeWidth="1.2" strokeDasharray="3 3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} />
                      <text x={c.drawer.marker.x + 4} y="9" fontSize="9" fill="#8a5a12" className="rx-num">{c.drawer.marker.label}</text>
                    </>
                  )}
                  <line x1="0" x2="220" y1="88" y2="88" stroke="#17191c" strokeOpacity=".15" />
                </svg>
                <div className="rx-num mt-3 space-y-1 border-t border-[var(--rx-line)] pt-3 text-[10.5px] text-[var(--rx-2)]">
                  {c.drawer.rows.map(([k, v]) => <p key={k} className="flex justify-between"><span>{k}</span><span>{v}</span></p>)}
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
