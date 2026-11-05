"use client";

import clsx from "clsx";
import { Cite } from "@/components/product/ui";
import { useLoop } from "../../_components/useLoop";

const STEPS = [
  {
    time: "07:00",
    label: "Relevant development",
    body: (
      <>
        <p className="text-[12px] text-[#8f8f8f]">Earnings recap · Bearish</p>
        <p className="mt-1 text-[15px] font-semibold leading-snug text-[#0d0d0d]">Guidance overshadowed a mixed Nike quarter</p>
      </>
    ),
  },
  {
    time: "07:02",
    label: "Affected name",
    body: (
      <>
        <p className="text-[12px] text-[#8f8f8f]">On your watchlist · second-order</p>
        <p className="mt-1 text-[15px] font-semibold text-[#0d0d0d]">Feng Tay Enterprises</p>
        <p className="mt-1 text-[13px] text-[#5d5d5d]">Footwear supplier. Nike is a major customer.</p>
      </>
    ),
  },
  {
    time: "07:04",
    label: "Possible implication",
    body: (
      <>
        <p className="text-[13px] leading-relaxed text-[#0d0d0d]">Softer guidance could mean lower order volumes for key suppliers over the next two quarters.</p>
        <p className="mt-2 text-[12px] text-[#8f8f8f]">A read to check, not a conclusion</p>
      </>
    ),
  },
  {
    time: "07:06",
    label: "Follow-up analysis",
    body: (
      <>
        <p className="rounded-[10px] bg-[#f9f9f9] px-3 py-2 text-[13px] text-[#0d0d0d]">How concentrated is Feng Tay’s revenue in Nike?</p>
        <p className="mt-2 text-[12px] text-[#8f8f8f]">From filings<Cite n={1} /> and the latest call<Cite n={2} /></p>
      </>
    ),
  },
];

/** CRO: show a morning workflow (development → affected name → implication → follow-up). */
export function MorningWorkflow() {
  const { ref, step } = useLoop<HTMLOListElement>(STEPS.length + 1, 1800, STEPS.length);
  const lit = Math.min(step, STEPS.length - 1);
  return (
    <ol ref={ref} className="pui grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {STEPS.map((s, i) => (
        <li key={s.label} className="flex flex-col">
          <p className={clsx("text-[13px] transition-colors duration-500", i <= lit ? "text-white" : "text-white/50")}>
            <span className="tabular-nums">{s.time}</span>
            <span className="text-white/40"> · </span>
            {s.label}
          </p>
          <div className="ui-card mt-2.5 flex-1 p-4">
            <div className={clsx("transition-opacity duration-700", i <= lit ? "opacity-100" : "opacity-35")}>{s.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
