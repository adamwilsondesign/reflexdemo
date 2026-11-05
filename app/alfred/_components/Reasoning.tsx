"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, ImpactPathway } from "@/components/product/ui";

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
    <div ref={ref} className="relative">
      <ol className="relative grid gap-3 md:grid-cols-5 md:gap-0">
        {STAGES.map((s, i) => {
          const on = i <= a && a < STAGES.length;
          const cur = i === a;
          return (
            <li key={s.k} className="relative md:px-2 md:first:pl-0 md:last:pr-0">
              <div className={clsx("relative h-full rounded-[12px] border p-4 transition-[border-color,background-color] duration-500", cur ? "border-paper/50 bg-white/[0.08]" : on ? "border-white/20 bg-white/[0.04]" : "border-white/10 bg-transparent")}>
                <div className="flex items-center gap-2">
                  <span className={clsx("flex h-5 w-5 items-center justify-center rounded-full border font-mono text-[9.5px] transition-colors duration-500", on ? "border-paper bg-paper text-ink" : "border-white/30 text-paper/60")}>{i + 1}</span>
                  <span className="t-ui text-[10.5px] text-paper/80">{s.k}</span>
                </div>
                <p className={clsx("mt-3 text-[13px] leading-snug transition-colors duration-500", on ? "text-paper/85" : "text-paper/45")}>{s.v}</p>
              </div>
              {i < STAGES.length - 1 && (
                <span aria-hidden="true" className="absolute -right-[7px] top-1/2 z-10 hidden h-[2px] w-[14px] -translate-y-1/2 overflow-hidden bg-white/15 md:block">
                  <motion.span className="block h-full bg-paper" initial={false} animate={{ width: i < a && a < STAGES.length ? "100%" : "0%" }} transition={{ duration: 0.5, ease: EASE }} />
                </span>
              )}
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
    <div ref={ref} className="grain field-lake relative isolate overflow-hidden rounded-[18px] p-4 sm:p-8">
      <div className="ui-card p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="flex items-center gap-3">
            <AlfredGlyph className="h-6 w-6 text-lake-700" />
            <span>
              <span className="block font-display text-[15px] font-semibold text-ink">Alfred</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">Knowledge Graph / Amazon</span>
            </span>
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-ink/[0.05] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.04em] text-ink/60"><span className="h-1.5 w-1.5 rounded-full bg-pine-500" />Relationship view</span>
        </div>
        <p className="mt-6 font-display text-[24px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[28px]">Impact pathways</p>
        <p className="mt-1 text-[14px] text-ink/55">Following demand through the AI supply chain</p>
        {seen || reduce ? <ImpactPathway key={k} className="mt-4 h-[260px] sm:h-[280px]" /> : <div className="mt-4 h-[260px] sm:h-[280px]" />}
      </div>
      <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6, ease: EASE }} className="ui-card mt-3 p-5">
        <p className="t-ui text-ink/45">Second-order effect</p>
        <p className="mt-2 font-display text-[17px] font-semibold text-ink">From cloud demand to chip manufacturing</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-ink/65">AWS capacity expansion can increase demand for NVIDIA GPUs, which in turn can raise demand for advanced chips from TSMC.</p>
      </motion.div>
    </div>
  );
}
