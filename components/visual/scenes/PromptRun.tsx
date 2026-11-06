"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Icon, RX_EASE, Spark, useTimeline, useTyped } from "@/components/visual/kit";

/**
 * Deep Research — hero, "Turn one prompt into a cited research memo".
 * Composition: a composer, then a run checklist with status chips. The prompt
 * is typed and sent; it settles into a compact header while each step of the
 * run checks off and the memo is ready.
 */
const PROMPT =
  "Run a Monte Carlo simulation (10,000 paths) to estimate the downside risk to an equal-weighted AI infrastructure portfolio (NVDA, AVGO, TSM, AMD, MSFT, AMZN, GOOGL, META, VRT, ANET) from a 5% S&P 500 correction. Show expected loss, 95% VaR, the holdings driving the risk, and one idea for hedging it.";

const STEPS = [
  ["Price history", "10 names · 2Y daily"],
  ["Betas to the S&P 500", "Code"],
  ["Simulate 10,000 paths", "Code"],
  ["Risk contributors", "3 holdings"],
  ["Hedge idea", "Options data"],
] as const;

// 0 typing · 1 move · 2 press · 3 settle · 4–8 steps · 9 ready · 10 hold
const D = [4800, 700, 400, 900, 900, 900, 1500, 900, 900, 3600, 600];

export function PromptRun() {
  const { p, ref, cycle } = useTimeline(D, { still: 9 });
  const typed = useTyped(PROMPT, p !== 10, { speed: 9, delay: 300 });
  const sent = p >= 3;
  const done = (i: number) => p >= 5 + i;
  const running = (i: number) => p === 4 + i;
  const ready = p >= 9;

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: p === 10 ? 0 : 1 }} transition={{ duration: 0.5 }}>
          <motion.div className="rx-card absolute left-[36px] top-[28px] w-[488px] overflow-hidden p-4" initial={false} animate={{ height: sent ? 92 : 214 }} transition={{ duration: 0.8, ease: RX_EASE }}>
            <p className="flex items-center justify-between text-[11px] font-medium text-[var(--rx-3)]">
              <span className="flex items-center gap-1.5"><Spark size={10} className="text-[var(--rx-signal)]" />Deep research</span>
              {sent && <span className="font-normal">Sent 09:14</span>}
            </p>
            <p className={clsx("mt-2 text-[13px] leading-[20px]", sent && "line-clamp-2 text-[var(--rx-2)]")}>{typed}</p>
            <AnimatePresence>
              {!sent && (
                <motion.div className="absolute bottom-4 left-4 right-4 flex items-center gap-2" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                  <span className="flex h-8 items-center gap-1.5 rounded-[8px] border border-[var(--rx-line)] px-2.5 text-[12px] text-[var(--rx-2)]"><Icon name="attach" size={13} />Attach</span>
                  <motion.span className="ml-auto grid h-8 w-8 place-items-center rounded-[9px] bg-[var(--rx-ink)] text-white" animate={{ scale: p === 2 ? 0.9 : 1 }}><Icon name="send" size={14} /></motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {sent && (
              <motion.div className="rx-card rx-card-lift absolute left-[36px] top-[136px] w-[488px] p-5" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: RX_EASE }}>
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-semibold">Working on it</p>
                  <span className="rx-num text-[11px] text-[var(--rx-3)]">{Math.min(5, Math.max(0, p - 4))} of 5</span>
                </div>
                <div className="mt-3">
                  {STEPS.map(([s, m], i) => (
                    <div key={s} className="flex h-[40px] items-center gap-3 border-t border-[var(--rx-line)]">
                      <span className={clsx("grid h-[18px] w-[18px] place-items-center rounded-full transition-colors duration-300", done(i) ? "bg-[var(--rx-up)] text-white" : "border-[1.5px] border-[#d6d4cf]")}>
                        {done(i) && <Icon name="check" size={11} />}
                        {running(i) && <motion.span className="h-[18px] w-[18px] rounded-full border-[1.5px] border-[#3e5368] border-t-transparent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />}
                      </span>
                      <span className={clsx("flex-1 text-[13px] transition-colors", done(i) || running(i) ? "text-[var(--rx-ink)]" : "text-[var(--rx-3)]")}>{s}</span>
                      {i === 2 && running(i) && (
                        <span className="h-[4px] w-[80px] overflow-hidden rounded-full bg-[var(--rx-well)]">
                          <motion.span className="block h-full bg-[#3e5368]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.4, ease: "linear" }} />
                        </span>
                      )}
                      <span className={clsx("rounded-full px-2 py-0.5 text-[10.5px] font-medium", done(i) ? "bg-[#e4efe9] text-[var(--rx-up)]" : running(i) ? "bg-[#e9eef2] text-[#3e5368]" : "bg-[var(--rx-well)] text-[var(--rx-3)]")}>
                        {done(i) ? m : running(i) ? "Running" : "Queued"}
                      </span>
                    </div>
                  ))}
                </div>
                <motion.div className="mt-1 flex h-11 items-center gap-3 rounded-[10px] px-3" initial={false} animate={{ backgroundColor: ready ? "#17191c" : "#f4f3f0", color: ready ? "#ffffff" : "#959aa1" }} transition={{ duration: 0.5 }}>
                  <Icon name="doc" size={15} />
                  <span className="flex-1 text-[12.5px] font-medium">{ready ? "Memo ready · 6 sources" : "Memo"}</span>
                  {ready && (
                    <motion.span className="rx-num flex gap-3 text-[11.5px]" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                      <span>E[loss] −8.9%</span><span>VaR −14.2%</span>
                    </motion.span>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <Cursor x={p >= 1 && p <= 2 ? 494 : 560} y={p >= 1 && p <= 2 ? 212 : 500} visible={p === 1 || p === 2} press={p === 2} />
        </motion.div>
      </Canvas>
    </div>
  );
}
