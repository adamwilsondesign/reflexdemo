"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { Pill, Sparkline, series } from "@/components/product/ui";
import { CONSTITUENTS, RELATED_THEMES, THEME, type Tier } from "./data";

const EASE = [0.16, 1, 0.3, 1] as const;
const FILTERS: ("All" | Tier)[] = ["All", "Core", "Less obvious", "Risk"];

function tierTone(t: Tier) {
  return t === "Risk" ? "warn" : t === "Core" ? "pine" : "lake";
}

/** Worked example: a theme overview with constituents, exposure strength, and an inspectable rationale. */
export function ConstituentExplorer() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [sel, setSel] = useState("TER");
  const list = useMemo(() => CONSTITUENTS.filter((c) => filter === "All" || c.tier === filter), [filter]);
  const c = CONSTITUENTS.find((x) => x.ticker === sel) ?? CONSTITUENTS[0];

  return (
    <div className="overflow-hidden rounded-[18px] border border-ink/10 bg-white shadow-[0_30px_80px_-40px_rgb(23_25_28/0.35)]">
      {/* theme header (after Figma n918) */}
      <div className="flex flex-col gap-4 border-b border-ink/8 bg-mist-100 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
        <div className="flex items-center gap-3.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white ring-1 ring-ink/6">
            <span className="h-3.5 w-3.5 rounded-full border-[3px] border-lake-700" />
          </span>
          <span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.06em] text-lake-700">Thematic exposure</span>
            <span className="block font-display text-[22px] font-semibold leading-tight md:text-[26px]">{THEME}</span>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="t-ui text-[10px] text-ink/45">Related themes</span>
          {RELATED_THEMES.map((t) => (
            <span key={t.name} className="rounded-full border border-ink/10 bg-white px-2.5 py-1 text-[12px] text-ink/75">
              {t.name} <span className="text-ink/40">· {t.sub}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        {/* constituents */}
        <div className="border-b border-ink/8 p-4 md:p-6 lg:border-b-0 lg:border-r">
          <div role="group" aria-label="Filter constituents" className="no-scrollbar flex gap-1.5 overflow-x-auto">
            {FILTERS.map((f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={clsx("shrink-0 rounded-full border px-3 py-1.5 font-display text-[12.5px] font-medium transition-colors duration-300", filter === f ? "border-ink bg-ink text-paper" : "border-ink/12 text-ink/65 hover:border-ink/30 hover:text-ink")}
              >
                {f === "Risk" ? "Risks" : f}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-x-4 border-b border-ink/10 pb-2 font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45 sm:grid-cols-[1.4fr_1fr_auto]">
            <span>Company</span>
            <span className="hidden sm:block">Exposure strength</span>
            <span>Type</span>
          </div>
          <ul className="min-h-[392px]">
            <AnimatePresence initial={false} mode="popLayout">
              {list.map((k) => {
                const on = k.ticker === sel;
                const risk = k.tier === "Risk";
                return (
                  <motion.li key={k.ticker} layout={!reduce} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
                    <button
                      onClick={() => setSel(k.ticker)}
                      aria-pressed={on}
                      className={clsx(
                        "grid w-full grid-cols-[1fr_auto] items-center gap-x-4 rounded-md border-b border-ink/6 px-2 py-2.5 text-left transition-colors duration-300 sm:grid-cols-[1.4fr_1fr_auto]",
                        on ? "bg-lake-100/60" : "hover:bg-ink/[0.03]",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-display text-[14px] font-semibold text-ink">{k.name}</span>
                        <span className="block truncate text-[11.5px] text-ink/50">{k.role}</span>
                      </span>
                      <span className="hidden items-center gap-2.5 sm:flex">
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/8">
                          <span className={clsx("block h-full", risk ? "bg-[#9a4b3c]" : "bg-pine-500")} style={{ width: `${k.score * 100}%` }} />
                        </span>
                        <span className="w-8 font-mono text-[11px] text-ink/70">{k.score.toFixed(2)}</span>
                      </span>
                      <Pill tone={tierTone(k.tier)} className="justify-self-end">{risk ? "Risk" : k.tier}</Pill>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        {/* rationale */}
        <div className="bg-mist-100/40 p-5 md:p-7" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={c.ticker} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.4, ease: EASE }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="t-ui text-[10px] text-ink/45">Exposure rationale</p>
                  <h4 className="mt-1 font-display text-[22px] font-semibold leading-tight">{c.name}</h4>
                </div>
                <div className="text-right">
                  <p className={clsx("font-display text-[30px] font-semibold leading-none tracking-[-0.02em]", c.tier === "Risk" ? "text-[#9a4b3c]" : "text-ink")}>{c.score.toFixed(2)}</p>
                  <p className="mt-1 font-mono text-[9.5px] uppercase text-ink/45">{c.tier === "Risk" ? "Exposure · risk" : "Exposure strength"}</p>
                </div>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/75">{c.why}</p>

              <p className="t-ui mt-6 text-[10px] text-ink/45">Relationship path</p>
              <ol className="mt-2 flex flex-wrap items-center gap-1.5">
                {c.path.map((p, i) => (
                  <li key={p} className="flex items-center gap-1.5">
                    <span className={clsx("rounded-md px-2 py-1 text-[11.5px]", i === c.path.length - 1 ? "bg-ink text-paper" : i === 0 ? "bg-pine-100 text-pine-700" : "bg-white text-ink/70 ring-1 ring-ink/8")}>{p}</span>
                    {i < c.path.length - 1 && <span aria-hidden="true" className="text-ink/30">→</span>}
                  </li>
                ))}
              </ol>

              <p className="t-ui mt-6 text-[10px] text-ink/45">What the score reflects</p>
              <dl className="mt-2 space-y-1.5">
                {([
                  ["Revenue tied to theme", c.breakdown.revenue],
                  ["Evidence strength", c.breakdown.evidence],
                  ["Recency", c.breakdown.recency],
                ] as [string, number][]).map(([l, v]) => (
                  <div key={l} className="flex items-center gap-3 text-[12px]">
                    <dt className="w-[150px] shrink-0 text-ink/60">{l}</dt>
                    <dd className="h-1 flex-1 overflow-hidden rounded-full bg-ink/8">
                      <motion.span className="block h-full bg-lake-500" initial={reduce ? false : { width: 0 }} animate={{ width: `${v * 100}%` }} transition={{ duration: 0.8, ease: EASE }} />
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="t-ui mt-6 text-[10px] text-ink/45">Evidence</p>
              <ul className="mt-2 space-y-1.5">
                {c.evidence.map((e, i) => (
                  <li key={e.text} className="flex items-start gap-2.5 rounded-lg border border-ink/8 bg-white px-3 py-2">
                    <span className="mt-[2px] flex h-4 min-w-4 items-center justify-center rounded bg-lake-100 px-1 font-mono text-[9px] text-lake-700">{i + 1}</span>
                    <span className="min-w-0">
                      <span className="block text-[12.5px] text-ink/85">{e.text}</span>
                      <span className="block font-mono text-[9.5px] uppercase tracking-[0.04em] text-ink/45">{e.source}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* catalyst that shifts exposure (Figma n918 insight) */}
      <div className="flex flex-col gap-4 border-t border-ink/8 px-5 py-5 md:flex-row md:items-center md:gap-8 md:px-7">
        <div className="flex items-center gap-3">
          <Pill tone="pine">Insight · Energy</Pill>
          <span className="t-ui text-[10px] text-ink/45">Catalyst shifting exposure</span>
        </div>
        <p className="font-display text-[17px] font-semibold leading-snug text-ink md:flex-1">Higher input costs increase automation exposure.</p>
        <div className="h-10 w-full text-pine-500 md:w-[220px]">
          <Sparkline points={series(28, 19, 0.5, 1.2)} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
