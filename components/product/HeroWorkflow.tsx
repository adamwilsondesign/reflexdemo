"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Cite, MissingData, Pill, PromptCard, Sparkline, StepList, series, AlfredGlyph } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;
const PHASES = ["Ask", "Connect", "Verify", "Monitor"] as const;
const DUR = [3600, 3400, 5200, 4600];
const PROMPT = "Map AAPL’s ecosystem and find the hidden beneficiaries.";

/**
 * Home hero product sequence — one investment workflow, end to end:
 * a question → the Graph traversal → a cited answer with gaps flagged → always-on follow-through.
 */
export function HeroWorkflow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? 2 : 0);
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setTimeout(() => {
      setPhase((p) => {
        const n = (p + 1) % PHASES.length;
        if (n === 0) setCycle((c) => c + 1);
        return n;
      });
    }, DUR[phase]);
    return () => clearTimeout(t);
  }, [phase, inView, reduce]);

  useEffect(() => {
    if (phase !== 1) { setStep(0); return; }
    const iv = setInterval(() => setStep((s) => Math.min(4, s + 1)), 680);
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <div ref={ref} className={clsx("relative", className)}>
      {/* phase tracker */}
      <div className="relative z-10 mb-4 flex items-center gap-1.5 sm:mb-5" aria-hidden="true">
        {PHASES.map((p, i) => (
          <button
            key={p}
            type="button"
            tabIndex={-1}
            onClick={() => setPhase(i)}
            className={clsx("flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] transition-all duration-500", i === phase ? "bg-white text-ink shadow-sm" : "text-white/70 hover:text-white")}
          >
            <span className={clsx("h-1.5 w-1.5 rounded-full transition-colors", i === phase ? "bg-lake-500" : i < phase ? "bg-white/80" : "bg-white/35")} />
            {p}
          </button>
        ))}
      </div>

      <PromptCard prompt={PROMPT} typing={phase === 0} start={inView} key={`p${cycle}`} active={phase === 0} />

      <div className="relative mt-3 min-h-[318px] sm:min-h-[300px]">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div key="ph0" exit={{ opacity: 0 }} className="ui-card p-4 opacity-80 sm:p-5">
              <p className="t-ui text-ink/45">Suggested</p>
              <ul className="mt-3 space-y-2 text-[13px] text-ink/70">
                <li className="flex items-center justify-between rounded-md border border-ink/8 bg-white/60 px-3 py-2">What changed in NFLX management’s tone vs the prior 4 calls? <span className="text-ink/30">→</span></li>
                <li className="flex items-center justify-between rounded-md border border-ink/8 bg-white/60 px-3 py-2">Stress-test my thesis: what breaks it, and what should I watch? <span className="text-ink/30">→</span></li>
              </ul>
            </motion.div>
          )}

          {phase === 1 && (
            <motion.div key="ph1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease: EASE }} className="ui-card p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <p className="t-ui text-ink/50">Working</p>
                <Pill tone="lake">Knowledge Graph</Pill>
              </div>
              <StepList
                className="mt-4"
                active={step}
                steps={["Resolve entity · Apple Inc. (AAPL)", "Traverse suppliers, customers, partners", "Weight 214 relationships by evidence", "Pull LSEG + S&P Global fundamentals", "Run exposure calculation"]}
              />
              <div className="mt-5 grid grid-cols-6 gap-1.5" aria-hidden="true">
                {Array.from({ length: 24 }, (_, i) => (
                  <motion.span key={i} className="h-1.5 rounded-full bg-lake-500" initial={{ opacity: 0.12 }} animate={{ opacity: [0.12, 0.9, 0.3] }} transition={{ duration: 1.2, delay: i * 0.06, repeat: Infinity, repeatDelay: 0.8 }} />
                ))}
              </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div key="ph2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease: EASE }} className="ui-card p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <Pill tone="pine">Analysis complete</Pill>
                <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink/40">8 sources</span>
              </div>
              <p className="mt-3 font-display text-[19px] font-semibold leading-tight text-ink sm:text-[21px]">12 potential beneficiaries</p>
              <p className="mt-1 text-[12.5px] text-ink/60">Ranked by relationship weight and revenue exposure to AAPL.</p>
              <ul className="mt-3 space-y-1.5">
                {[
                  ["TSMC", "Supplier · advanced nodes", 0.92, 1],
                  ["Broadcom", "Supplier · RF & connectivity", 0.74, 2],
                  ["Micron", "Supplier · memory", 0.58, 3],
                ].map(([n, r, w, c], i) => (
                  <motion.li key={n as string} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.15, duration: 0.6, ease: EASE }} className="flex items-center gap-3 rounded-md bg-white/70 px-2.5 py-2">
                    <span className="w-[74px] shrink-0 font-display text-[13px] font-semibold text-ink">{n as string}</span>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink/55">
                      {r as string}
                      <Cite n={c as number} />
                    </span>
                    <span className="h-1 w-16 overflow-hidden rounded-full bg-ink/8">
                      <motion.span className="block h-full rounded-full bg-lake-500" initial={{ width: 0 }} animate={{ width: `${(w as number) * 100}%` }} transition={{ delay: 0.4 + i * 0.15, duration: 1, ease: EASE }} />
                    </span>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-3">
                <MissingData label="Supplier revenue split, 2 names" reason="Not disclosed" />
              </motion.div>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div key="ph3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="ui-card p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lake-500 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-lake-500" />
                    </span>
                    <span className="t-ui text-ink/55">Insight · Company catalyst</span>
                  </span>
                  <span className="font-mono text-[10px] text-ink/40">2m ago</span>
                </div>
                <p className="mt-3 font-display text-[16px] font-semibold leading-snug text-ink">TSMC raises advanced-node capacity guidance</p>
                <p className="mt-1.5 text-[12.5px] text-ink/60">
                  Touches <b className="font-semibold text-ink/80">3 names</b> on your AAPL beneficiaries list. Why you’re seeing this: you follow AAPL and saved this analysis.
                </p>
                <div className="mt-3 h-12 text-lake-500">
                  <Sparkline points={series(40, 11, 0.5, 2)} className="h-full w-full" fill="rgb(93 115 140 / 0.12)" />
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: EASE }} className="ui-card flex items-center gap-3 p-3.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-lake-100"><AlfredGlyph className="h-4 w-4 text-lake-700" /></span>
                <span className="flex-1 text-[12.5px] font-medium text-ink">Ask Alfred: what does this mean for my thesis?</span>
                <span className="rounded-md bg-ink px-2.5 py-1 font-display text-[11.5px] text-paper">Open</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
