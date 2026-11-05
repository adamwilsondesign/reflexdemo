"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export const SEE = [
  {
    title: "Your own work",
    body: "We use the portfolio, watchlist or research question you bring, not a set tour.",
  },
  {
    title: "Alfred and the Knowledge Graph",
    body: "Ask Alfred a research question, then see how a coverage list keeps running in the background. Both use the same Graph and the same data.",
  },
  {
    title: "The source and the calculation",
    body: "Open the source on each claim and the code behind each number, so you can check the answer yourself.",
  },
] as const;

/**
 * "What you'll see": the three parts of the walkthrough, paired with a small, calm product preview
 * that steps through them slowly. Pauses off-screen; static under reduced motion.
 */
export function WhatYoullSee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (!inView || reduce || hold) return;
    const iv = setInterval(() => setStep((s) => (s + 1) % SEE.length), 5200);
    return () => clearInterval(iv);
  }, [inView, reduce, hold]);

  return (
    <div ref={ref} className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-6 lg:grid-cols-1 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <ol className="flex flex-col" onMouseLeave={() => setHold(false)}>
        {SEE.map((s, i) => {
          const on = i === step;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setStep(i)}
                onMouseEnter={() => { setStep(i); setHold(true); }}
                onFocus={() => { setStep(i); setHold(true); }}
                onBlur={() => setHold(false)}
                aria-current={on ? "step" : undefined}
                className="group relative w-full border-t border-white/12 py-4 pl-5 text-left"
              >
                <span className="absolute left-0 top-0 h-full w-px bg-white/10" aria-hidden="true">
                  <motion.span
                    className="absolute inset-x-0 top-0 block bg-paper"
                    initial={false}
                    animate={{ height: on ? "100%" : "0%" }}
                    transition={{ duration: on && !reduce && !hold ? 5.2 : 0.4, ease: on && !hold ? "linear" : EASE }}
                  />
                </span>
                <span className={clsx("block font-display text-[16px] font-semibold transition-colors duration-500", on ? "text-paper" : "text-paper/55 group-hover:text-paper/80")}>{s.title}</span>
                <span className={clsx("mt-1.5 block text-[14px] leading-relaxed transition-colors duration-500", on ? "text-paper/72" : "text-paper/45")}>{s.body}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <PreviewCard step={step} />
    </div>
  );
}

const WATCH = [
  { t: "TSM", n: "Taiwan Semiconductor" },
  { t: "ASML", n: "ASML Holding" },
  { t: "NVDA", n: "NVIDIA" },
  { t: "VRT", n: "Vertiv" },
];

function PreviewCard({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const labels = ["Watchlist", "Alfred · Knowledge Graph", "Sources · Calculation"];
  return (
    <div className="relative self-start" aria-hidden="true">
      <div className="ui-card relative overflow-hidden p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white ring-1 ring-ink/5">
              <AlfredGlyph className="h-3.5 w-3.5 text-lake-700" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink/55">{labels[step]}</span>
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/35">Illustrative</span>
        </div>
        <div className="relative mt-3 h-[168px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? undefined : { opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0"
            >
              {step === 0 && <Watchlist />}
              {step === 1 && <MiniGraph />}
              {step === 2 && <SourceCalc />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Watchlist() {
  return (
    <div className="flex h-full flex-col gap-1.5">
      {WATCH.map((w, i) => (
        <motion.div
          key={w.t}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.09, ease: EASE }}
          className="flex items-center gap-2.5 rounded-md border border-ink/8 bg-white/80 px-2.5 py-1.5"
        >
          <span className="w-11 font-mono text-[11px] font-medium text-lake-700">{w.t}</span>
          <span className="flex-1 truncate font-display text-[12px] text-ink/75">{w.n}</span>
          <span className="h-1 w-10 overflow-hidden rounded-full bg-ink/8">
            <motion.span className="block h-full bg-lake-500" initial={{ width: 0 }} animate={{ width: `${40 + ((i * 23) % 50)}%` }} transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: EASE }} />
          </span>
        </motion.div>
      ))}
      <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/40">+ your names, or our sample list</span>
    </div>
  );
}

function MiniGraph() {
  const nodes = [
    { x: 50, y: 50, l: "TSM", main: true },
    { x: 16, y: 22, l: "NVDA" },
    { x: 86, y: 20, l: "AAPL" },
    { x: 14, y: 80, l: "ASML" },
    { x: 84, y: 78, l: "AMD" },
  ];
  return (
    <div className="flex h-full flex-col">
      <p className="rounded-md bg-white/80 px-2.5 py-1.5 font-display text-[12px] font-medium text-ink ring-1 ring-ink/8">Which of my names depend most on TSMC capacity?</p>
      <div className="relative mt-2 flex-1">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {nodes.slice(1).map((n, i) => (
            <motion.line
              key={n.l}
              x1={50}
              y1={50}
              x2={n.x}
              y2={n.y}
              stroke={i % 2 ? "#3e5c50" : "#5d738c"}
              strokeWidth={1.1}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: EASE }}
            />
          ))}
        </svg>
        {nodes.map((n, i) => (
          <motion.span
            key={n.l}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            className={clsx(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium",
              n.main ? "bg-lake-700 text-white" : "border border-ink/10 bg-white text-ink/75",
            )}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {n.l}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function SourceCalc() {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center gap-2.5 rounded-md border border-ink/8 bg-white/85 px-2.5 py-1.5">
        <span className="flex h-4 w-4 items-center justify-center rounded bg-lake-100 font-mono text-[9px] text-lake-700">1</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-[12px] font-medium text-ink">Q2 earnings call transcript</span>
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.04em] text-ink/45">Quartr · p. 7</span>
        </span>
      </div>
      <pre className="flex-1 overflow-hidden rounded-md bg-[#1b1e23] p-2.5 font-mono text-[10.5px] leading-[1.7] text-paper/80">
        {[
          ["rev", " = ", "segment_revenue", "(\"TSM\", fq=-4..0)"],
          ["share", " = ", "rev[\"HPC\"] / rev.sum()", ""],
          ["exposure", " = ", "weight(holdings) * share", ""],
        ].map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.18 }}>
            <span className="text-lake-300">{l[0]}</span>
            {l[1]}
            <span className="text-paper">{l[2]}</span>
            <span className="text-pine-300">{l[3]}</span>
          </motion.div>
        ))}
      </pre>
    </div>
  );
}
