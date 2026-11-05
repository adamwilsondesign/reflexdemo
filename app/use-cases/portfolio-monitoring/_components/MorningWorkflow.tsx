"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import { Cite, Pill } from "@/components/product/ui";
import { useLoop } from "../../_components/useLoop";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    time: "07:00",
    label: "Relevant development",
    body: (
      <>
        <div className="flex items-center justify-between gap-2"><Pill tone="pine">Earnings recap</Pill><span className="font-mono text-[10px] uppercase text-[#9a4b3c]">Bearish</span></div>
        <p className="mt-2.5 font-display text-[15px] font-semibold leading-snug text-ink">Guidance overshadowed a mixed Nike quarter</p>
      </>
    ),
  },
  {
    time: "07:02",
    label: "Affected name",
    body: (
      <>
        <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-ink/45">On your watchlist</p>
        <p className="mt-1.5 font-display text-[15px] font-semibold text-ink">Feng Tay Enterprises</p>
        <p className="mt-1 text-[12px] text-ink/60">Footwear supplier · Nike is a major customer</p>
        <p className="mt-2 inline-flex rounded bg-lake-100 px-2 py-0.5 font-mono text-[9.5px] uppercase text-lake-700">Second-order · via Graph</p>
      </>
    ),
  },
  {
    time: "07:04",
    label: "Possible implication",
    body: (
      <>
        <p className="text-[13px] leading-relaxed text-ink/80">Softer guidance could mean lower order volumes for key suppliers over the next two quarters.</p>
        <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.04em] text-ink/40">A read to check, not a conclusion</p>
      </>
    ),
  },
  {
    time: "07:06",
    label: "Follow-up analysis",
    body: (
      <>
        <p className="rounded-md border border-ink/10 bg-white px-2.5 py-2 text-[12.5px] text-ink/85">How concentrated is Feng Tay’s revenue in Nike, and what did management say about second-half orders?</p>
        <p className="mt-2 text-[12px] text-ink/65">Customer concentration from filings<Cite n={1} />, order commentary from the latest call<Cite n={2} />.</p>
      </>
    ),
  },
];

/** CRO: show a morning workflow (development → affected name → implication → follow-up). */
export function MorningWorkflow() {
  const { ref, step } = useLoop<HTMLOListElement>(STEPS.length + 1, 1800, STEPS.length);
  const lit = Math.min(step, STEPS.length - 1);
  return (
    <ol ref={ref} className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <span aria-hidden="true" className="absolute left-0 right-0 top-[19px] hidden h-px bg-white/15 xl:block" />
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-[19px] hidden h-px bg-paper xl:block"
        animate={{ width: `${(lit / (STEPS.length - 1)) * 100}%` }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      {STEPS.map((s, i) => (
        <li key={s.label} className="relative">
          <div className="flex items-center gap-3">
            <span className={clsx("relative z-10 flex h-[38px] items-center rounded-full border px-3 font-mono text-[11px] transition-colors duration-500", i <= lit ? "border-paper bg-paper text-ink" : "border-white/20 bg-lake-900 text-paper/60")}>{s.time}</span>
            <span className={clsx("t-ui text-[10.5px] transition-colors duration-500 xl:hidden", i <= lit ? "text-paper" : "text-paper/50")}>{s.label}</span>
          </div>
          <p className={clsx("t-ui mt-5 hidden text-[10.5px] transition-colors duration-500 xl:block", i <= lit ? "text-paper" : "text-paper/50")}>{s.label}</p>
          <div className={clsx("ui-card mt-3 p-4 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]", i <= lit ? "opacity-100" : "translate-y-1 opacity-[0.78]")}>{s.body}</div>
        </li>
      ))}
    </ol>
  );
}
