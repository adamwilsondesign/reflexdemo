"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Pill } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { k: "The source document", body: "The filing, transcript or data feed the figure came from, linked." },
  { k: "The calculation", body: "The code that turned the source data into a figure, ready to re-run." },
  { k: "The claim", body: "The statement in the answer, with its source and calculation still attached." },
];

function DocPanel({ on }: { on: boolean }) {
  const rows: [string, string, string][] = [
    ["Net cash from operations", "—", "—"],
    ["Purchases of property & equipment", "(142.0)", "(210.0)"],
    ["Proceeds from asset sales", "—", "—"],
    ["Acquisitions, net of cash", "—", "—"],
  ];
  return (
    <div className="ui-card h-full p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">Annual filing · Cash-flow statement</span>
        <span className="font-mono text-[9.5px] text-ink/35">p.47</span>
      </div>
      <div className="mt-3 space-y-1.5" aria-hidden="true">
        <div className="h-1.5 w-11/12 rounded bg-ink/8" />
        <div className="h-1.5 w-9/12 rounded bg-ink/8" />
      </div>
      <table className="mt-3 w-full text-[11px]">
        <thead>
          <tr className="font-mono text-[9px] uppercase tracking-[0.05em] text-ink/40">
            <th className="pb-1 text-left font-medium">$B</th>
            <th className="pb-1 text-right font-medium">2023</th>
            <th className="pb-1 text-right font-medium">2024</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const hit = i === 1;
            return (
              <tr key={r[0]} className={clsx("border-t border-ink/6 transition-colors duration-500", hit && on && "bg-lake-100")}>
                <td className={clsx("py-1.5 pr-2", hit ? "font-medium text-ink" : "text-ink/35")}>{r[0]}</td>
                <td className={clsx("py-1.5 text-right font-mono", hit ? "text-ink" : "text-ink/30")}>{r[1]}</td>
                <td className={clsx("py-1.5 text-right font-mono", hit ? "text-ink" : "text-ink/30")}>{r[2]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-3 space-y-1.5" aria-hidden="true">
        <div className="h-1.5 w-10/12 rounded bg-ink/8" />
        <div className="h-1.5 w-7/12 rounded bg-ink/8" />
      </div>
    </div>
  );
}

function CalcPanel({ on, ran }: { on: boolean; ran: boolean }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[14px] bg-[#1b1e23] p-4 font-mono text-[11px] leading-[1.7] text-paper/85 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)] ring-1 ring-white/10">
      <div className="flex items-center justify-between text-[9.5px] uppercase tracking-[0.05em] text-paper/45">
        <span>calc.py</span>
        <span className={clsx("rounded px-1.5 py-0.5 transition-colors duration-500", ran ? "bg-pine-500/30 text-pine-100" : "bg-white/5")}>{ran ? "✓ ran" : "ready"}</span>
      </div>
      <div className="mt-3 flex-1">
        <p><span className="text-lake-300">capex_2023</span> = src[<span className="text-pine-300">&quot;ppe_2023&quot;</span>]  <span className="text-paper/35"># 142.0</span></p>
        <p><span className="text-lake-300">capex_2024</span> = src[<span className="text-pine-300">&quot;ppe_2024&quot;</span>]  <span className="text-paper/35"># 210.0</span></p>
        <p className="mt-1"><span className="text-lake-300">growth</span> = (capex_2024 - capex_2023) / capex_2023</p>
        <motion.p initial={false} animate={{ opacity: ran ? 1 : 0.15 }} transition={{ duration: 0.5 }} className="mt-2 text-pine-300">
          → 0.4789
        </motion.p>
      </div>
      <span className={clsx("mt-3 inline-flex w-fit items-center gap-2 rounded-md border px-2.5 py-1 font-sans text-[11px] transition-colors duration-500", on ? "border-paper/40 text-paper" : "border-white/15 text-paper/55")}>
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M13 8a5 5 0 11-1.5-3.5M13 3v2.5h-2.5" /></svg>
        Re-run
      </span>
    </div>
  );
}

function ClaimPanel({ on }: { on: boolean }) {
  return (
    <div className="ui-card flex h-full flex-col p-4">
      <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">Answer</span>
      <p className="mt-3 font-display text-[15px] font-medium leading-snug text-ink">
        Capex rose <span className={clsx("rounded px-0.5 transition-colors duration-500", on && "bg-lake-100")}>48%</span> year on year, from $142B to $210B.
        <sup className="ml-0.5 inline-flex h-[15px] min-w-[15px] items-center justify-center rounded-[3px] bg-lake-100 px-1 font-mono text-[9.5px] text-lake-700">1</sup>
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        <Pill tone="lake">Source attached</Pill>
        <Pill tone="pine">Calculation attached</Pill>
      </div>
    </div>
  );
}

/** Animated audit trail: document → calculation → claim, with evidence still attached. */
export function SourceToAnswer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0); // 0..5 phases

  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setT((x) => (x + 1) % 6), 1500);
    return () => clearInterval(iv);
  }, [inView, reduce]);

  const step = reduce ? 3 : t < 2 ? 0 : t < 4 ? 1 : 2;
  const all = reduce;

  return (
    <div ref={ref}>
      <div className="relative grid gap-4 md:grid-cols-3 md:gap-0">
        {/* connector track (desktop) */}
        <div className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-[-28px] hidden h-px bg-white/15 md:block" aria-hidden="true">
          <motion.span
            className="absolute top-0 h-px bg-paper"
            initial={false}
            animate={{ width: all ? "100%" : step === 0 ? "0%" : step === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        </div>
        {STEPS.map((s, i) => {
          const active = all || step === i;
          const done = all || step >= i;
          return (
            <div key={s.k} className="relative md:px-3">
              <span
                className={clsx(
                  "absolute left-1/2 top-[-33px] hidden h-[11px] w-[11px] -translate-x-1/2 rounded-full border transition-colors duration-500 md:block",
                  done ? "border-paper bg-paper" : "border-white/30 bg-pine-500",
                )}
                aria-hidden="true"
              />
              <motion.div
                animate={{ y: active ? -4 : 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className={clsx("h-[248px] transition-opacity duration-700", active ? "md:opacity-100" : "md:opacity-60")}
              >
                {i === 0 && <DocPanel on={active} />}
                {i === 1 && <CalcPanel on={active} ran={all || t === 3 || step === 2} />}
                {i === 2 && <ClaimPanel on={active} />}
              </motion.div>
              <div className="mt-5 md:mt-6">
                <p className="t-ui text-paper/50">Step {i + 1}</p>
                <h3 className="t-h3 mt-2">{s.k}</h3>
                <p className="t-body mt-2 text-paper/65">{s.body}</p>
              </div>
              {i < 2 && <div className="mx-auto my-2 h-6 w-px bg-white/20 md:hidden" aria-hidden="true" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
