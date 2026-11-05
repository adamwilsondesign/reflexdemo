"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { Arrow } from "@/components/ui/Button";
import { PRESS, formatNewsDate, type Format, type PressItem } from "./data";
import { Wordmark } from "./Wordmark";

const EASE = [0.16, 1, 0.3, 1] as const;
type Filter = "All" | Format;
const FILTERS: Filter[] = ["All", "TV", "Article", "Interview"];
const LABEL: Record<Filter, string> = { All: "All coverage", TV: "TV", Article: "Articles", Interview: "Interviews" };

/** "In the press": format filter + outlet filter, grouped by year. */
export function PressFeed() {
  const reduce = useReducedMotion();
  const [format, setFormat] = useState<Filter>("All");
  const [outlet, setOutlet] = useState<string>("All outlets");
  const outlets = ["All outlets", ...Array.from(new Set(PRESS.map((p) => p.outlet).filter(Boolean) as string[]))];

  const shown = PRESS.filter((p) => (format === "All" || p.format === format) && (outlet === "All outlets" || p.outlet === outlet));
  const years = Array.from(new Set(shown.map((p) => p.year))).sort((a, b) => b - a);
  const count = (f: Filter) => PRESS.filter((p) => (f === "All" || p.format === f) && (outlet === "All outlets" || p.outlet === outlet)).length;

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-ink/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by format" className="no-scrollbar -mx-[var(--gutter)] flex gap-1 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:px-0">
          <LayoutGroup id="press-tabs">
            {FILTERS.map((f) => {
              const on = format === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFormat(f)}
                  className={clsx("relative flex h-10 shrink-0 items-center gap-2 rounded-full px-4 font-display text-[15px] font-medium transition-colors", on ? "text-paper" : "text-ink/65 hover:text-ink")}
                >
                  {on && <motion.span layoutId="press-pill" className="absolute inset-0 rounded-full bg-ink" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} />}
                  <span className="relative">{LABEL[f]}</span>
                  <span className={clsx("relative font-mono text-[11px]", on ? "text-paper/60" : "text-ink/40")}>{count(f)}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>
        <label className="flex items-center gap-3">
          <span className="t-ui text-ink/50">Outlet</span>
          <span className="relative">
            <select
              value={outlet}
              onChange={(e) => setOutlet(e.target.value)}
              className="h-10 appearance-none rounded-full border border-ink/15 bg-white/70 pl-4 pr-10 font-display text-[15px] font-medium text-ink transition-colors hover:border-ink/30 focus:border-ink/40 focus:outline-none"
            >
              {outlets.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <svg viewBox="0 0 12 12" className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M2 4.5l4 4 4-4" />
            </svg>
          </span>
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} items shown
      </p>

      <div className="mt-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {years.map((y) => (
            <motion.section key={y} layout={!reduce} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="grid gap-4 border-b border-ink/10 py-8 last:border-0 lg:grid-cols-12 lg:gap-10" aria-label={`${y} coverage`}>
              <h3 className="font-display text-[28px] font-semibold tracking-[-0.02em] text-ink/40 lg:sticky lg:top-32 lg:col-span-2 lg:self-start">{y}</h3>
              <ul className="lg:col-span-10">
                <AnimatePresence mode="popLayout" initial={false}>
                  {shown
                    .filter((p) => p.year === y)
                    .map((p) => (
                      <motion.li
                        key={p.title}
                        layout={!reduce}
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="border-b border-ink/8 last:border-0"
                      >
                        <PressRow item={p} />
                      </motion.li>
                    ))}
                </AnimatePresence>
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
        {shown.length === 0 && <p className="t-body py-12 text-ink/60">No coverage matches these filters.</p>}
      </div>
    </div>
  );
}

function PressRow({ item }: { item: PressItem }) {
  const inner = (
    <div className="grid gap-3 py-6 sm:grid-cols-[140px_minmax(0,1fr)_auto] sm:items-start sm:gap-8">
      <div className="flex items-center gap-3 sm:block">
        <span className="flex h-8 items-center text-ink">
          <Wordmark outlet={item.outlet} format={item.format} />
        </span>
        <p className={clsx("t-ui text-[10.5px] text-ink/45 sm:mt-2", !item.outlet && "sm:hidden")}>
          {item.outlet ? item.format : ""}
          {item.date && <span className="sm:hidden"> · {formatNewsDate(item.date)}</span>}
        </p>
      </div>
      <div>
        <h4 className={clsx("font-display text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink md:text-[20px]", item.url && "transition-colors group-hover:text-lake-700")}>{item.title}</h4>
        {item.summary && <p className="t-small mt-2 max-w-[720px] text-ink/62">{item.summary}</p>}
      </div>
      <div className="hidden items-center gap-4 sm:flex">
        {item.date && (
          <time dateTime={item.date} className="whitespace-nowrap font-mono text-[12px] text-ink/50">
            {formatNewsDate(item.date)}
          </time>
        )}
        {item.url && (
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/12 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <Arrow />
          </span>
        )}
      </div>
    </div>
  );
  if (!item.url) return inner;
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`${item.title} (${item.outlet ?? item.format}, opens in a new tab)`}>
      {inner}
    </a>
  );
}
