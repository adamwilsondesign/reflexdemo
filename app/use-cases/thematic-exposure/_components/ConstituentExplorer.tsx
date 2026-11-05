"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { MetricRow, Sparkline, series } from "@/components/product/ui";
import { CONSTITUENTS, RELATED_THEMES, THEME, type Tier } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;
const FILTERS: ("All" | Tier)[] = ["All", "Core", "Less obvious", "Risk"];

/** Worked example: a theme overview with constituents, exposure strength, and an inspectable rationale. */
export function ConstituentExplorer() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [sel, setSel] = useState("TER");
  const list = useMemo(() => CONSTITUENTS.filter((c) => filter === "All" || c.tier === filter), [filter]);
  const c = CONSTITUENTS.find((x) => x.ticker === sel) ?? CONSTITUENTS[0];

  return (
    <div className="ui-card pui overflow-hidden">
      {/* theme header */}
      <div className="flex flex-col gap-1 border-b border-black/10 px-4 py-4 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <p className="text-[12px] text-[#8f8f8f]">Thematic exposure</p>
          <p className="mt-0.5 text-[22px] font-semibold leading-tight text-[#0d0d0d]">{THEME}</p>
        </div>
        <p className="text-[12px] text-[#8f8f8f]">
          Related: <span className="text-[#5d5d5d]">{RELATED_THEMES.map((t) => t.name).join(" · ")}</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        {/* constituents */}
        <div className="border-b border-black/10 p-4 md:p-6 lg:border-b-0 lg:border-r">
          <div role="group" aria-label="Filter constituents" className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {FILTERS.map((f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "shrink-0 rounded-[10px] border border-black/10 px-3 py-1.5 text-[13px] transition-colors duration-300",
                  filter === f ? "bg-black/[0.05] font-medium text-[#0d0d0d]" : "bg-white text-[#5d5d5d] hover:bg-black/[0.05]",
                )}
              >
                {f === "Risk" ? "Risks" : f}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-[1fr_48px_88px] gap-x-3 border-b border-black/10 px-2 pb-2 text-[12px] text-[#8f8f8f]">
            <span>Company</span>
            <span className="text-right">Score</span>
            <span className="text-right">Type</span>
          </div>
          <ul className="min-h-[392px]">
            <AnimatePresence initial={false} mode="popLayout">
              {list.map((k) => {
                const on = k.ticker === sel;
                return (
                  <motion.li key={k.ticker} layout={!reduce} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
                    <button
                      onClick={() => setSel(k.ticker)}
                      aria-pressed={on}
                      className={clsx(
                        "grid w-full grid-cols-[1fr_48px_88px] items-center gap-x-3 border-b border-black/10 px-2 py-2.5 text-left transition-colors duration-300",
                        on ? "bg-black/[0.05]" : "hover:bg-black/[0.05]",
                      )}
                    >
                      <span className="min-w-0">
                        <span className={clsx("block truncate text-[14px] text-[#0d0d0d]", on ? "font-semibold" : "font-medium")}>{k.name}</span>
                        <span className="block truncate text-[12px] text-[#8f8f8f]">{k.role}</span>
                      </span>
                      <span className="text-right text-[13px] tabular-nums text-[#0d0d0d]">{k.score.toFixed(2)}</span>
                      <span className={clsx("text-right text-[12px]", k.tier === "Risk" ? "font-medium text-[#0d0d0d]" : "text-[#8f8f8f]")}>{k.tier}</span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        {/* rationale */}
        <div className="p-4 md:p-6" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={c.ticker} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.4, ease: EASE }}>
              <p className="text-[12px] text-[#8f8f8f]">Exposure rationale</p>
              <div className="mt-0.5 flex items-baseline justify-between gap-3">
                <h4 className="text-[20px] font-semibold leading-tight text-[#0d0d0d]">{c.name}</h4>
                <span className="text-[16px] font-semibold tabular-nums text-[#0d0d0d]">{c.score.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-[12px] text-[#8f8f8f]">{c.path.join(" → ")}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-[#5d5d5d]">{c.why}</p>

              <p className="mt-5 text-[12px] text-[#8f8f8f]">What the score reflects</p>
              <div className="mt-1">
                <MetricRow label="Revenue tied to theme" value={c.breakdown.revenue.toFixed(2)} />
                <MetricRow label="Evidence strength" value={c.breakdown.evidence.toFixed(2)} />
                <MetricRow label="Recency" value={c.breakdown.recency.toFixed(2)} />
              </div>

              <p className="mt-5 text-[12px] text-[#8f8f8f]">Evidence</p>
              <ol className="mt-1 divide-y divide-black/10 border-t border-black/10">
                {c.evidence.map((e, i) => (
                  <li key={e.text} className="flex items-baseline gap-3 py-2">
                    <span className="w-5 shrink-0 text-[12px] text-[#8f8f8f]">[{i + 1}]</span>
                    <span className="min-w-0">
                      <span className="block text-[13px] text-[#0d0d0d]">{e.text}</span>
                      <span className="block text-[12px] text-[#8f8f8f]">{e.source}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* catalyst that shifts exposure */}
      <div className="flex flex-col gap-3 border-t border-black/10 px-4 py-4 md:flex-row md:items-center md:gap-8 md:px-6">
        <div className="md:flex-1">
          <p className="text-[12px] text-[#8f8f8f]">Insight · Energy · catalyst shifting exposure</p>
          <p className="mt-0.5 text-[15px] font-semibold leading-snug text-[#0d0d0d]">Higher input costs increase automation exposure.</p>
        </div>
        <div className="h-10 w-full md:w-[220px]">
          <Sparkline points={series(28, 19, 0.5, 1.2)} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
