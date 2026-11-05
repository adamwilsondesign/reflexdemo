"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CardHeader, ImpactPathway } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const STAGES = [
  { k: "Question", v: "“Which AI suppliers are most exposed to AWS capex?”" },
  { k: "Entity resolution", v: "AWS → Amazon.com, Inc. · segment" },
  { k: "Knowledge Graph + data", v: "Suppliers, weights, filings, transcripts" },
  { k: "Executable analysis", v: "Ranking computed in code" },
  { k: "Tailored output", v: "Cited answer, gaps flagged" },
];

/** Pipeline: how a question flows through entity resolution, the Graph and data into an output. */
export function ReasoningPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [a, setA] = useState(reduce ? STAGES.length - 1 : 0);
  useEffect(() => {
    if (reduce || !inView) return;
    const t = setTimeout(() => setA((x) => (x + 1) % (STAGES.length + 1)), a === STAGES.length ? 1400 : 1300);
    return () => clearTimeout(t);
  }, [a, inView, reduce]);

  return (
    <div ref={ref} className="pui relative">
      <ol className="relative grid gap-0 md:grid-cols-5 md:gap-4">
        {STAGES.map((s, i) => {
          const on = i <= a && a < STAGES.length;
          const cur = i === a;
          return (
            <li key={s.k} className={clsx("relative border-t py-4 transition-colors duration-500", cur ? "border-white" : on ? "border-white/40" : "border-white/15")}>
              <div className="flex items-center gap-2 text-[13px]">
                <span className="tabular-nums text-white/50">{i + 1}</span>
                <span className={clsx("transition-colors duration-500", cur ? "font-semibold text-white" : "font-medium text-white/75")}>{s.k}</span>
              </div>
              <p className={clsx("mt-1.5 text-[13px] leading-snug transition-colors duration-500", on ? "text-white/80" : "text-white/45")}>{s.v}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Coded rebuild of the Figma "Impact pathways" card (n873/n878). */
export function ImpactCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [k, setK] = useState(0);
  const reduce = useReducedMotion();
  const [seen, setSeen] = useState(false);
  useEffect(() => { if (inView) setSeen(true); }, [inView]);
  useEffect(() => {
    if (!inView || reduce) return;
    const iv = setInterval(() => setK((x) => x + 1), 7000);
    return () => clearInterval(iv);
  }, [inView, reduce]);
  return (
    <div ref={ref} className="pui grain field-lake relative isolate overflow-hidden rounded-[18px] p-4 sm:p-8">
      <div className="ui-card p-4 sm:p-5">
        <CardHeader trail={["Amazon"]} />
        <p className="mt-4 text-[24px] font-semibold leading-tight text-[#0d0d0d]">Impact pathways</p>
        <p className="mt-1 text-[13px] text-[#5d5d5d]">Following demand through the AI supply chain</p>
        {seen || reduce ? <ImpactPathway key={k} className="mt-4 h-[260px] sm:h-[280px]" /> : <div className="mt-4 h-[260px] sm:h-[280px]" />}
      </div>
      <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6, ease: EASE }} className="ui-card mt-3 p-4">
        <p className="text-[13px] text-[#8f8f8f]">Second-order effect</p>
        <p className="mt-1 text-[16px] font-semibold text-[#0d0d0d]">From cloud demand to chip manufacturing</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#5d5d5d]">AWS capacity expansion can increase demand for NVIDIA GPUs, which in turn can raise demand for advanced chips from TSMC.</p>
      </motion.div>
    </div>
  );
}
