"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, CiteChip, Glyph, Icon, RX_EASE, Spark, Ticker, useTimeline } from "@/components/visual/kit";

/**
 * Alfred · On-demand — "Start with a question your desk is already asking."
 * Composition: a plan checklist with status chips. Alfred resolves the entities,
 * gathers evidence, runs the analysis; each step checks off, the plan folds
 * away and a cited result opens in its place.
 */
const PROMPT = "Map AAPL’s full ecosystem (suppliers, customers, competitors, partners) and surface the non-obvious names with hidden exposure.";
const STEPS = [
  { t: "Resolve entities", d: "AAPL · 312 linked companies" },
  { t: "Gather evidence", d: "10-Ks, transcripts, supply data · 41 sources" },
  { t: "Run the analysis", d: "Revenue exposure by relationship" },
  { t: "Draft a cited result", d: "Ranked, with gaps flagged" },
];
const ROWS = [
  { n: "Qorvo", t: "QRVO", rel: "Supplier", v: "46%" },
  { n: "Lumentum", t: "LITE", rel: "Supplier", v: null },
  { n: "Jabil", t: "JBL", rel: "Manufacturer", v: "19%" },
];

// 0 prompt · 1..4 steps running · 5 result · 6 out
const D = [1000, 1300, 1500, 1300, 1100, 4600, 700];

export function PlanRun() {
  const { p, ref, cycle } = useTimeline(D, { still: 5 });
  const done = p >= 5;

  return (
    <div ref={ref}>
      <Canvas w={560} h={480} focusX={0.25}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 6 ? 0 : 1 }} transition={{ duration: 0.6 }}>
          {/* question */}
          <motion.div className="rx-card absolute left-[30px] top-[22px] flex w-[500px] items-start gap-3 px-4 py-3.5" initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: RX_EASE }}>
            <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[var(--rx-well)] text-[9px] font-semibold text-[var(--rx-2)]">AW</span>
            <p className="text-[13px] leading-[20px]">{PROMPT}</p>
          </motion.div>

          {/* plan + result */}
          <motion.div className="rx-card rx-card-lift absolute left-[30px] top-[118px] w-[500px] px-5 pb-5 pt-4" initial={{ opacity: 0, y: 24 }} animate={{ opacity: p >= 1 ? 1 : 0, y: p >= 1 ? 0 : 24 }} transition={{ duration: 0.7, ease: RX_EASE }}>
            <div className="flex h-7 items-center justify-between">
              <span className="flex items-center gap-1.5 text-[12px] font-semibold"><Spark size={12} className="text-[var(--rx-signal)]" />Alfred</span>
              <span className="flex items-center gap-1.5 text-[11.5px] text-[var(--rx-3)]">
                {done ? <><span className="text-[var(--rx-up)]"><Icon name="check" size={12} /></span>4 steps · 3m 12s</> : <>Step {Math.min(Math.max(p, 1), 4)} of 4</>}
                <Icon name="chev" size={11} />
              </span>
            </div>

            <motion.div className="overflow-hidden" initial={false} animate={{ height: done ? 0 : 4 * 48 + 8, opacity: done ? 0 : 1 }} transition={{ duration: 0.7, ease: RX_EASE }}>
              <div className="pt-2">
                {STEPS.map((s, i) => {
                  const st = p > i + 1 ? "done" : p === i + 1 ? "run" : "wait";
                  return (
                    <div key={s.t} className="flex h-[48px] items-center gap-3 border-t border-[var(--rx-line)]">
                      <span className={clsx("grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full text-white transition-colors duration-300", st === "done" ? "bg-[var(--rx-up)]" : st === "run" ? "bg-[#3e5368]" : "bg-[var(--rx-well)]")}>
                        {st === "done" ? <Icon name="check" size={11} /> : st === "run" ? <Spinner /> : <span className="rx-num text-[9.5px] text-[var(--rx-3)]">{i + 1}</span>}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={clsx("block text-[12.5px] font-medium leading-4 transition-colors", st === "wait" ? "text-[var(--rx-3)]" : "")}>{s.t}</span>
                        <span className="block truncate text-[11px] leading-4 text-[var(--rx-3)]">{s.d}</span>
                      </span>
                      <span className={clsx("rounded-[6px] px-2 py-[3px] text-[10.5px] font-medium transition-colors duration-300", st === "done" ? "bg-[rgb(47_116_87/.1)] text-[var(--rx-up)]" : st === "run" ? "bg-[rgb(62_83_104/.1)] text-[#3e5368]" : "bg-[var(--rx-well)] text-[var(--rx-3)]")}>
                        {st === "done" ? "Done" : st === "run" ? "Running" : "Queued"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <AnimatePresence>
              {done && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.45, duration: 0.7, ease: RX_EASE }}>
                  <p className="rx-serif mt-2 text-[19px] leading-[26px]">12 names with exposure to Apple that most screens miss</p>
                  <div className="mt-3">
                    <div className="flex h-7 items-center text-[10.5px] text-[var(--rx-3)]">
                      <span className="flex-1">Company</span><span className="w-[110px]">Relationship</span><span className="w-[92px] text-right">Apple revenue</span>
                    </div>
                    {ROWS.map((r, i) => (
                      <motion.div key={r.t} className="flex h-[40px] items-center border-t border-[var(--rx-line)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}>
                        <span className="flex flex-1 items-center gap-2 text-[12.5px]"><Glyph kind="company" size={9} className="text-[var(--rx-3)]" />{r.n}<Ticker>{r.t}</Ticker></span>
                        <span className="w-[110px] text-[12px] text-[var(--rx-2)]">{r.rel}</span>
                        <span className="flex w-[92px] items-center justify-end">
                          {r.v ? (
                            <span className="rx-num text-[12px]">{r.v}<CiteChip n={i + 1} active={i === 0} /></span>
                          ) : (
                            <span className="rx-hatch rx-num whitespace-nowrap rounded-[5px] px-1.5 py-0.5 text-[10.5px] text-[var(--rx-2)] ring-1 ring-inset ring-[#2f7457]/30">not disclosed</span>
                          )}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </Canvas>
    </div>
  );
}

function Spinner() {
  return (
    <motion.svg viewBox="0 0 12 12" width="11" height="11" animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} aria-hidden="true">
      <circle cx="6" cy="6" r="4.2" fill="none" stroke="currentColor" strokeOpacity=".35" strokeWidth="1.6" />
      <path d="M6 1.8a4.2 4.2 0 0 1 4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </motion.svg>
  );
}
