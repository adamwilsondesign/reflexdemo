"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, CodeBlock, SourceRow } from "@/components/product/ui";

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
                <span className={clsx("t-small mt-1.5 block transition-colors duration-500", on ? "text-paper/72" : "text-paper/45")}>{s.body}</span>
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
  const labels = ["Watchlist", "Alfred", "Source and calculation"];
  return (
    <div className="pui relative self-start" aria-hidden="true">
      <div className="ui-card relative overflow-hidden p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlfredGlyph className="h-4 w-4 text-[#0d0d0d]" />
            <span className="text-[14px] font-semibold text-[#0d0d0d]">{labels[step]}</span>
          </span>
          <span className="text-[12px] text-[#8f8f8f]">Illustrative</span>
        </div>
        <div className="relative mt-3 h-[168px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
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
    <div className="flex h-full flex-col">
      <ul className="divide-y divide-black/10 border-t border-black/10">
        {WATCH.map((w, i) => (
          <motion.li
            key={w.t}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.09, ease: EASE }}
            className="flex items-center gap-3 py-1.5 text-[13px]"
          >
            <span className="w-11 font-medium text-[#0d0d0d]">{w.t}</span>
            <span className="flex-1 truncate text-[#5d5d5d]">{w.n}</span>
          </motion.li>
        ))}
      </ul>
      <span className="mt-auto text-[12px] text-[#8f8f8f]">Your names, or our sample list</span>
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
      <p className="rounded-[10px] bg-[#f9f9f9] px-3 py-2 text-[13px] text-[#0d0d0d]">Which of my names depend most on TSMC capacity?</p>
      <div className="relative mt-2 flex-1">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {nodes.slice(1).map((n, i) => (
            <motion.line
              key={n.l}
              x1={50}
              y1={50}
              x2={n.x}
              y2={n.y}
              stroke="rgb(0 0 0 / 0.2)"
              strokeWidth={1}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            className={clsx(
              "absolute -translate-x-1/2 -translate-y-1/2 bg-white px-1.5 text-[12px]",
              n.main ? "font-semibold text-[#0d0d0d]" : "text-[#5d5d5d]",
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
      <SourceRow n={1} title="Q2 earnings call transcript" meta="Quartr, p.7" />
      <CodeBlock lines={['share = rev["HPC"] / rev.sum()', "exposure = weight(holdings) * share"]} />
    </div>
  );
}
