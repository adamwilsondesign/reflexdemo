"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CardHeader, Pill, StepList, useTypewriter } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROMPTS = [
  {
    task: "Investment research",
    short: "Map AAPL’s ecosystem and find the hidden beneficiaries.",
    full: "Map AAPL’s full ecosystem (suppliers, customers, competitors, partners) and surface the non-obvious names with hidden exposure.",
    trail: ["Ecosystem", "AAPL"],
    steps: ["Resolve AAPL → Apple Inc.", "Pull suppliers, customers and partners from the Graph", "Rank by revenue dependence and evidence", "Draft a cited note"],
    result: "12 potential beneficiaries",
    rows: [
      ["Broadcom", "Wireless and RF components", "Supplier"],
      ["TSMC", "Advanced chip manufacturing", "Supplier"],
      ["Cirrus Logic", "Audio and mixed-signal chips", "Supplier"],
    ],
  },
  {
    task: "Earnings analysis",
    short: "What changed in NFLX management’s tone, and what does it signal?",
    full: "What changed in NFLX management’s tone relative to the prior 4 earnings calls, and what does it signal?",
    trail: ["Earnings", "NFLX"],
    steps: ["Resolve NFLX → Netflix, Inc.", "Collect the last 5 call transcripts", "Compare language on guidance, ads and margins", "Summarise shifts with quoted passages"],
    result: "3 shifts in management tone",
    rows: [
      ["Advertising", "More specific on targets", "Firmer"],
      ["Content spend", "Consistent with prior calls", "Unchanged"],
      ["Margin outlook", "More hedged language", "Softer"],
    ],
  },
  {
    task: "Thesis pressure testing",
    short: "Stress-test my thesis: what breaks it, and what should I watch?",
    full: "Stress-test my thesis: what breaks it, and what should I watch?",
    trail: ["Counter-thesis", "General"],
    steps: ["Restate the thesis and its assumptions", "Find the strongest counter-evidence", "Map what breaks it, and when", "List the signals to watch"],
    result: "2 key risks identified",
    rows: [
      ["Consensus already prices the upside", "Valuation", "Risk"],
      ["Supplier lead indicators softening", "Second-order", "Risk"],
      ["Next quarterly results", "Watch date", "Monitor"],
    ],
  },
];

/** On-demand: pick a real investment question and watch it become a cited workflow. */
export function PromptWorkbench() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const p = PROMPTS[active];
  const typed = useTypewriter(p.full, { start: inView, speed: 16, delay: 200 });
  const typedDone = typed.length >= p.full.length;
  const total = p.steps.length;

  useEffect(() => setStep(reduce ? 99 : 0), [active, reduce]);
  useEffect(() => {
    if (reduce || !inView || !typedDone) return;
    if (step > total) {
      const t = setTimeout(() => setActive((a) => (a + 1) % PROMPTS.length), 4200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 500 : 900);
    return () => clearTimeout(t);
  }, [step, inView, typedDone, reduce, total]);

  const showResult = step > total;

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <p className="t-ui text-ink/50" id="sample-prompts-label">Sample questions</p>
        <div role="tablist" aria-labelledby="sample-prompts-label" className="mt-4 space-y-3">
          {PROMPTS.map((q, k) => {
            const on = k === active;
            return (
              <button
                key={q.short}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(k)}
                className={clsx(
                  "group block w-full rounded-[12px] border p-4 text-left transition-[border-color,background-color,box-shadow] duration-500 md:p-5",
                  on ? "border-ink/20 bg-white shadow-[0_12px_30px_-18px_rgb(23_25_28/0.35)]" : "border-ink/10 bg-transparent hover:border-ink/20 hover:bg-white/50",
                )}
              >
                <span className={clsx("t-ui block", on ? "text-lake-700" : "text-ink/45")}>{q.task}</span>
                <span className={clsx("mt-2 block font-display text-[17px] font-medium leading-snug transition-opacity", on ? "text-ink" : "text-ink/60")}>{q.short}</span>
              </button>
            );
          })}
        </div>
        <p className="t-small mt-6 max-w-[420px] text-ink/60">
          Analyst-grade, in observable terms: each figure carries a citation, gaps are flagged rather than filled, calculations run in code you can open, and related names come from the Knowledge Graph.
        </p>
      </div>

      <div className="lg:col-span-7" role="tabpanel" aria-label={p.short}>
        <div className="grain field-mist relative isolate overflow-hidden rounded-[18px] p-4 sm:p-7">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-chart opacity-60" />
          <div className="ui-card p-4 sm:p-5">
            <CardHeader trail={p.trail} right={<Pill tone="lake">On-demand</Pill>} />
            <p className="mt-4 min-h-[4em] font-display text-[15px] font-medium leading-snug text-ink sm:min-h-[2.8em] sm:text-[16.5px]">
              {typed}
              {!typedDone && <span className="animate-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-lake-700" />}
            </p>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-5">
            <div className="ui-card p-4 sm:col-span-2">
              <p className="t-ui text-ink/45">Workflow</p>
              <StepList className="mt-3" steps={p.steps} active={Math.min(step - 1, total)} />
              <p className="mt-4 border-t border-ink/8 pt-3 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">
                {showResult ? "Ready for your review" : step > 0 ? "Working…" : "Queued"}
              </p>
            </div>
            <div className="relative min-h-[220px] sm:col-span-3">
              <AnimatePresence mode="wait">
                {showResult ? (
                  <motion.div key={"r" + active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.6, ease: EASE }} className="ui-card h-full p-4">
                    <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-lake-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-lake-700" /> Result
                    </p>
                    <p className="mt-2 font-display text-[20px] font-semibold leading-tight text-ink">{p.result}</p>
                    <ul className="mt-3 space-y-1.5">
                      {p.rows.map(([a, b, c], k) => (
                        <motion.li key={a} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + k * 0.1, duration: 0.5 }} className="flex items-center gap-3 rounded-md bg-ink/[0.035] px-2.5 py-2">
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display text-[13px] font-semibold text-ink">{a}<sup className="ml-0.5 font-mono text-[9px] text-lake-700">{k + 1}</sup></span>
                            <span className="block truncate text-[11px] text-ink/55">{b}</span>
                          </span>
                          <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">{c}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div key={"w" + active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col gap-2 rounded-[12px] border border-dashed border-ink/15 p-4">
                    {[0, 1, 2, 3].map((k) => (
                      <span key={k} className="shimmer h-3 rounded-full bg-ink/[0.06]" style={{ width: `${90 - k * 14}%` }} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <p className="t-small mt-3 text-ink/50">Illustrative example. Outputs, names and counts vary with the data available at the time of the run.</p>
      </div>
    </div>
  );
}
