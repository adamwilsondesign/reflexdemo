"use client";

import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { StateTabs } from "./StateTabs";
import { Pill, Stage } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

function Query({ text = "Apple" }: { text?: string }) {
  return (
    <div className="ui-card flex items-center gap-3 px-4 py-3">
      <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-ink/45" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
      <span className="font-display text-[14px] text-ink">
        How exposed is <span className="rounded bg-lake-100 px-1 font-semibold text-lake-900">{text}</span> to iPhone demand in China?
      </span>
    </div>
  );
}

function fade(reduce: boolean | null, delay = 0) {
  return {
    initial: reduce ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  } as const;
}

function Disambiguate() {
  const reduce = useReducedMotion();
  const cands = [
    { n: "Apple Inc.", t: "AAPL · NASDAQ", s: "Consumer electronics", pick: true },
    { n: "Apple Hospitality REIT", t: "APLE · NYSE", s: "Hotel real estate", pick: false },
  ];
  return (
    <Stage field="mist" className="h-full w-full p-5 sm:p-8">
      <div className="mx-auto flex h-full max-w-[480px] flex-col justify-center gap-3">
        <Query />
        <p className="t-ui mt-2 text-[10px] text-ink/45">Candidates sharing the name</p>
        {cands.map((c, i) => (
          <motion.div
            key={c.n}
            {...fade(reduce, 0.2 + i * 0.15)}
            className={clsx("relative flex items-center gap-3 rounded-[10px] border bg-white px-4 py-3", c.pick ? "border-lake-500" : "border-ink/8")}
          >
            <span className={clsx("flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-display text-[13px] font-semibold", c.pick ? "bg-lake-100 text-lake-700" : "bg-ink/5 text-ink/40")}>{c.n[0]}</span>
            <span className="min-w-0 flex-1">
              <span className={clsx("block font-display text-[13.5px] font-semibold", c.pick ? "text-ink" : "text-ink/45")}>{c.n}</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.04em] text-ink/45">{c.t} · {c.s}</span>
            </span>
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
            >
              {c.pick ? <Pill tone="lake">Resolved</Pill> : <Pill>Excluded</Pill>}
            </motion.span>
            {!c.pick && (
              <motion.span
                aria-hidden="true"
                className="absolute left-4 right-4 top-1/2 h-px origin-left bg-ink/25"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
              />
            )}
          </motion.div>
        ))}
        <motion.p {...fade(reduce, 1.4)} className="rounded-md bg-white/70 px-3 py-2 text-[12px] text-ink/65">
          <span className="font-semibold text-ink">Context used:</span> &ldquo;iPhone&rdquo; is a product of Apple Inc. in the Knowledge Graph.
        </motion.p>
      </div>
    </Stage>
  );
}

function Route() {
  const reduce = useReducedMotion();
  const rows = [
    { d: "Company financials", p: "Fundamentals provider" },
    { d: "Prices & market data", p: "Market data provider" },
    { d: "Earnings call transcripts", p: "Transcript provider" },
    { d: "News & newswires", p: "Newswire provider" },
  ];
  return (
    <Stage field="mist" className="h-full w-full p-5 sm:p-8">
      <div className="mx-auto flex h-full max-w-[480px] flex-col justify-center">
        <div className="ui-card px-4 py-3">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">Resolved entity</span>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-display text-[15px] font-semibold text-ink">Apple Inc.</span>
            <span className="font-mono text-[10px] text-ink/50">AAPL · one ID across providers</span>
          </div>
        </div>
        <div className="relative ml-6 border-l border-lake-300/70 pl-5 pt-3">
          {rows.map((r, i) => (
            <motion.div key={r.d} {...fade(reduce, 0.25 + i * 0.18)} className="relative mb-2 flex items-center justify-between gap-3 rounded-[10px] border border-ink/8 bg-white px-3.5 py-2.5">
              <span className="absolute -left-5 top-1/2 h-px w-5 bg-lake-300/70" aria-hidden="true" />
              <span className="font-display text-[13px] font-medium text-ink">{r.d}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-lake-700">→ {r.p}</span>
            </motion.div>
          ))}
        </div>
        <p className="t-ui mt-2 text-[10px] text-ink/40">Routing simplified for illustration</p>
      </div>
    </Stage>
  );
}

function Reconcile() {
  const reduce = useReducedMotion();
  return (
    <Stage field="mist" className="h-full w-full p-5 sm:p-8">
      <div className="mx-auto flex h-full max-w-[480px] flex-col justify-center gap-3">
        <p className="t-ui text-[10px] text-ink/45">Apple Inc. · 2024 revenue · two readings</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { s: "Source A", v: "$391.0B", p: "Fiscal 2024 · year to Sep 28" },
            { s: "Source B", v: "$395.8B", p: "Calendar 2024 · Jan–Dec" },
          ].map((x, i) => (
            <motion.div key={x.s} {...fade(reduce, 0.15 + i * 0.15)} className="rounded-[10px] border border-ink/8 bg-white p-3.5">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">{x.s}</span>
              <span className="mt-1 block font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">{x.v}</span>
              <span className="block text-[11px] text-ink/55">{x.p}</span>
            </motion.div>
          ))}
        </div>
        <motion.div {...fade(reduce, 0.7)} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.05em] text-[#7a5326]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b88a55]" /> Figures disagree · different period definitions
        </motion.div>
        <motion.div {...fade(reduce, 1.1)} className="ui-card p-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-[13.5px] font-semibold text-ink">Reconciled</span>
            <Pill tone="pine">Both sources kept</Pill>
          </div>
          <p className="mt-2 text-[12.5px] leading-snug text-ink/70">
            Report on Apple&rsquo;s fiscal year as filed. Use the calendarised figure only when comparing with peers on a calendar year, and say which one is shown.
          </p>
        </motion.div>
      </div>
    </Stage>
  );
}

export function EntityResolution() {
  return (
    <StateTabs idPrefix="entity" frameClassName="h-[440px] sm:h-auto sm:aspect-[4/3]"
      interval={7000}
      items={[
        { title: "Which Apple", body: "Apple Inc. and Apple Hospitality REIT share a name, not a business. Context from the question and the Knowledge Graph resolves the company to a single entity.", visual: <Disambiguate /> },
        { title: "Which provider to query", body: "One entity ID maps across providers, so each kind of data comes from the source that holds it, without manual ticker matching.", visual: <Route /> },
        { title: "When sources disagree", body: "Differences in period, currency or definition are surfaced and reconciled with the rule stated, rather than silently averaged away.", visual: <Reconcile /> },
      ]}
    />
  );
}
