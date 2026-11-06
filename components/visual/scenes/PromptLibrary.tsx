"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Canvas, Cursor, Icon, RX_EASE, Spark, useTimeline, useTyped } from "@/components/visual/kit";

/**
 * Scenario & Stress Testing — "Simulations you can check and run again".
 * Composition: a composer with a prompt-library dropdown. The cursor picks a
 * scenario, sends it, and the run comes back as code with a re-run button.
 */
const PROMPTS = [
  { k: "Backtest", t: "Backtest an equal-weight AI basket since 2015" },
  { k: "Stress test", t: "Stress-test my book against a 2022-style rate shock" },
  { k: "Scenario", t: "What if oil rises 20% in a month?" },
  { k: "Scenario", t: "How did homebuilders trade after past mortgage-rate spikes?" },
];
const PICK = 1;
const CODE = [
  ["book", " = load_portfolio(", "\"Core book\"", ")"],
  ["shock", " = replay(", "\"2022-01-03\", \"2022-10-12\"", ")"],
  ["pnl", " = stress(book, shock, method=", "\"beta\"", ")"],
] as const;

// 0 empty · 1 move · 2 open · 3 hover · 4 pick · 5 typed · 6 to send · 7 press · 8 result · 9 hold
const D = [1200, 900, 1000, 900, 400, 1500, 800, 400, 4200, 600];

export function PromptLibrary() {
  const { p, ref, cycle } = useTimeline(D, { still: 8 });
  const open = p >= 2 && p <= 4;
  const filled = p >= 5;
  const typed = useTyped(PROMPTS[PICK].t, filled, { speed: 18, delay: 100 });
  const result = p >= 8;
  const cursor =
    p === 0 ? { x: 560, y: 500, visible: false } :
    p <= 2 ? { x: 104, y: 152 } :
    p <= 4 ? { x: 200, y: 260 } :
    p <= 7 ? { x: 494, y: 152 } :
    { x: 494, y: 152, visible: false };

  return (
    <div ref={ref}>
      <Canvas w={560} h={480}>
        <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="rx-card rx-card-lift absolute left-[36px] top-[40px] w-[488px] p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--rx-3)]"><Spark size={10} />New scenario</p>
            <p className={clsx("mt-2 h-[42px] text-[14px] leading-[21px]", !typed && "text-[var(--rx-3)]")}>{typed || "Describe a scenario in plain language…"}</p>
            <div className="mt-2 flex items-center gap-2">
              <motion.span className="flex h-8 items-center gap-1.5 rounded-[8px] border border-[var(--rx-line)] px-2.5 text-[12px] font-medium" animate={{ backgroundColor: open ? "#f4f3f0" : "#ffffff" }}>
                <Icon name="doc" size={13} />Prompt library<Icon name="chev" size={12} className="text-[var(--rx-3)]" />
              </motion.span>
              <span className="flex h-8 items-center gap-1.5 rounded-[8px] px-2 text-[12px] text-[var(--rx-3)]">S&amp;P 1500 · 50Y data</span>
              <motion.span className="ml-auto grid h-8 w-8 place-items-center rounded-[9px] text-white" animate={{ backgroundColor: filled ? "#17191c" : "#c9c7c2" }}><Icon name="send" size={14} /></motion.span>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div className="rx-card absolute left-[52px] top-[176px] z-20 w-[380px] p-1.5" initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, transition: { duration: 0.2 } }} transition={{ duration: 0.35, ease: RX_EASE }} style={{ transformOrigin: "20% 0%" }}>
                {PROMPTS.map((q, i) => {
                  const on = i === PICK && p >= 3;
                  return (
                    <div key={q.t} className={clsx("flex items-start gap-2.5 rounded-[8px] px-2.5 py-2 transition-colors duration-300", on && "bg-[var(--rx-well)]")}>
                      <span className={clsx("mt-[3px] grid h-[13px] w-[13px] shrink-0 place-items-center rounded-full border-[1.5px] transition-colors", on && p >= 4 ? "border-[var(--rx-ink)]" : "border-[#c9c7c2]")}>
                        {on && p >= 4 && <span className="h-[5px] w-[5px] rounded-full bg-[var(--rx-ink)]" />}
                      </span>
                      <span>
                        <span className="block text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--rx-3)]">{q.k}</span>
                        <span className="block text-[12.5px] leading-[17px]">{q.t}</span>
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.div className="rx-card absolute left-[36px] top-[200px] w-[488px] overflow-hidden" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.8, ease: RX_EASE }}>
                <div className="flex items-center justify-between border-b border-[var(--rx-line)] px-4 py-2.5 text-[11px]">
                  <span className="rx-num font-medium">stress_test.py</span>
                  <span className="flex items-center gap-1 rounded-full bg-[#e4efe9] px-2 py-0.5 font-medium text-[var(--rx-up)]"><Icon name="check" size={11} />Executed in code</span>
                </div>
                <div className="rx-num bg-[#fafaf8] px-4 py-3 text-[11.5px] leading-[20px]">
                  {CODE.map(([v, a, s, b], i) => (
                    <motion.p key={v} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.18, duration: 0.4 }}>
                      <span className="mr-3 inline-block w-3 text-right text-[var(--rx-3)]">{i + 1}</span>
                      <span className="text-[#3e5368]">{v}</span><span className="text-[var(--rx-2)]">{a}</span><span className="text-[#2f7457]">{s}</span><span className="text-[var(--rx-2)]">{b}</span>
                    </motion.p>
                  ))}
                </div>
                <div className="flex items-center gap-5 px-4 py-3">
                  <span><span className="block text-[10.5px] text-[var(--rx-3)]">Drawdown</span><span className="rx-num text-[16px] font-medium">−18.4%</span></span>
                  <span><span className="block text-[10.5px] text-[var(--rx-3)]">Top detractor</span><span className="text-[13px] font-medium leading-[24px]">Software, 41%</span></span>
                  <span className="ml-auto flex h-8 items-center gap-1.5 rounded-[8px] bg-[var(--rx-ink)] px-3 text-[12px] font-medium text-white">
                    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><path d="M13 8a5 5 0 1 1-1.5-3.6M13 2.5v3h-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Re-run
                  </span>
                </div>
                <div className="flex items-center gap-2 border-t border-[var(--rx-line)] px-4 py-2.5 text-[11px] text-[var(--rx-2)]">
                  <span className="h-2 w-2 rounded-[2px] rx-hatch ring-1 ring-[#2f7457]/40" />
                  2 holdings lack 2022 history, excluded and flagged
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Cursor {...cursor} press={p === 2 || p === 4 || p === 7} />
        </motion.div>
      </Canvas>
    </div>
  );
}
