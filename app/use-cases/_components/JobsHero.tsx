"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { AlfredGlyph, Cite, Pill, Stage } from "@/components/product/ui";
import { useLoop } from "./useLoop";

const EASE = [0.16, 1, 0.3, 1] as const;

const ENGINE = ["Knowledge Graph", "Alfred", "Insights", "Auditable analysis"] as const;

type Job = { key: string; label: string; crumb: string; uses: number[] };
const JOBS: Job[] = [
  { key: "monitor", label: "Portfolio Monitoring", crumb: "Watchlist · 07:00 ET", uses: [0, 2] },
  { key: "research", label: "Deep Research", crumb: "Alfred · Research", uses: [1, 3, 0] },
  { key: "theme", label: "Thematic Exposure", crumb: "Theme · Industrial Automation", uses: [0, 3] },
  { key: "scenario", label: "Scenario & Stress Testing", crumb: "Scenario · Rates shock", uses: [1, 3] },
  { key: "ideas", label: "Idea Generation", crumb: "Alfred · Ideas", uses: [1, 0, 2] },
];

/** Overview hero: one product window, five jobs, the same engine lit underneath. */
export function JobsHero() {
  const { ref, step, reduce } = useLoop(JOBS.length, 3600, 0);
  const job = JOBS[step];
  return (
    <Stage field="lake" className="p-3 sm:p-6 md:p-8" image="/figma/n915.png">
      <div ref={ref} className="ui-card overflow-hidden p-0">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-ink/8 px-4 py-3 sm:px-5">
          <span className="flex items-center gap-2.5">
            <AlfredGlyph className="h-4 w-4 text-lake-700" />
            <span className="font-display text-[13px] font-semibold text-ink">Reflexivity</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.05em] text-ink/40 sm:inline">/ {job.crumb}</span>
          </span>
          <span className="flex gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-ink/12" />)}
          </span>
        </div>

        <div className="grid md:grid-cols-[230px_1fr]">
          {/* job rail */}
          <ul className="no-scrollbar flex gap-1.5 overflow-x-auto border-b border-ink/8 p-2.5 md:block md:space-y-1 md:overflow-visible md:border-b-0 md:border-r md:p-3" aria-label="Use cases">
            {JOBS.map((j, i) => (
              <li key={j.key} className="shrink-0">
                <span
                  className={clsx(
                    "relative flex items-center gap-2.5 rounded-lg px-3 py-2 font-display text-[12.5px] font-medium transition-colors duration-500 md:py-2.5 md:text-[13px]",
                    i === step ? "bg-white text-ink shadow-[0_1px_2px_rgb(23_25_28/0.08)] ring-1 ring-ink/6" : "text-ink/45",
                  )}
                >
                  <span className={clsx("h-1.5 w-1.5 rounded-full transition-colors duration-500", i === step ? "bg-lake-700" : "bg-ink/20")} />
                  <span className="whitespace-nowrap">{j.label}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* output pane */}
          <div className="relative h-[300px] p-4 sm:h-[320px] sm:p-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={job.key}
                initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: EASE }}
                className="h-full"
              >
                {job.key === "monitor" && <Monitor />}
                {job.key === "research" && <Research />}
                {job.key === "theme" && <Theme />}
                {job.key === "scenario" && <Scenario />}
                {job.key === "ideas" && <Ideas />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* the same engine underneath */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-ink/8 bg-white/50 px-4 py-3 sm:px-5">
          <span className="t-ui mr-1 text-[10px] text-ink/40">Same engine</span>
          {ENGINE.map((e, i) => {
            const on = job.uses.includes(i);
            return (
              <span
                key={e}
                className={clsx(
                  "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.04em] transition-colors duration-500",
                  on ? "border-lake-500/40 bg-lake-100 text-lake-700" : "border-ink/10 text-ink/40",
                )}
              >
                {e}
              </span>
            );
          })}
        </div>
      </div>
    </Stage>
  );
}

function Row({ children, i, li = false }: { children: React.ReactNode; i: number; li?: boolean }) {
  const M = li ? motion.li : motion.div;
  return (
    <M initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}>
      {children}
    </M>
  );
}

function Monitor() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <Pill tone="lake">Company catalyst</Pill>
        <span className="font-mono text-[10px] text-ink/40">07:02 ET</span>
      </div>
      <p className="mt-3 font-display text-[17px] font-semibold leading-snug text-ink sm:text-[19px]">CoreWeave rolls out Nvidia Vera Rubin with Cognition live</p>
      <p className="mt-2 rounded-md bg-lake-100/60 px-3 py-2 text-[12px] text-lake-900">
        <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-lake-700">Why you’re seeing this · </span>
        CoreWeave is on your watchlist; NVIDIA and Microsoft connect through the Rubin platform.
      </p>
      <div className="mt-auto space-y-1.5">
        {[["NVIDIA", "Platform supplier", "Direct"], ["Microsoft Azure", "Cloud provider", "2nd order"], ["Nebius", "Cloud provider", "2nd order"]].map(([n, r, h], i) => (
          <Row key={n} i={i}>
            <div className="flex items-center justify-between rounded-md border border-ink/8 bg-white/80 px-3 py-1.5 text-[12px]">
              <span className="font-display font-semibold text-ink">{n}</span>
              <span className="text-ink/50">{r}</span>
              <span className="font-mono text-[10px] uppercase text-ink/40">{h}</span>
            </div>
          </Row>
        ))}
      </div>
    </div>
  );
}

function Research() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <Pill>Research memo · AMZN</Pill>
        <Pill tone="warn">Thesis weakens</Pill>
      </div>
      <p className="mt-3 font-display text-[16px] font-semibold leading-snug text-ink sm:text-[18px]">Pressure-test: is the post-selloff long still intact?</p>
      <p className="mt-2 text-[12.5px] leading-relaxed text-ink/70">
        The market prices AWS growth below your view<Cite n={1} />; the strongest counter-argument is capex intensity compressing free cash flow<Cite n={2} />.
      </p>
      <ul className="mt-auto grid grid-cols-2 gap-1.5 text-[11.5px]">
        {["What’s priced in", "Counter-arguments", "What breaks it", "Valuation", "Second-order risk", "Verdict"].map((s, i) => (
          <Row key={s} i={i} li>
            <span className="flex items-center gap-2 rounded-md bg-white/80 px-2.5 py-1.5 text-ink/75 ring-1 ring-ink/6">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-pine-500" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5" /></svg>
              {s}
            </span>
          </Row>
        ))}
      </ul>
    </div>
  );
}

function Theme() {
  const rows: [string, string, number, boolean][] = [
    ["Rockwell Automation", "Core", 0.92, false],
    ["Teradyne", "Less obvious", 0.68, false],
    ["Harmonic Drive", "Less obvious", 0.61, false],
    ["ManpowerGroup", "Risk", 0.44, true],
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <Pill tone="pine">Theme</Pill>
        <span className="font-mono text-[10px] uppercase text-ink/40">Exposure strength</span>
      </div>
      <p className="mt-3 font-display text-[18px] font-semibold text-ink sm:text-[20px]">Industrial Automation</p>
      <div className="mt-auto space-y-2">
        {rows.map(([n, tag, w, risk], i) => (
          <Row key={n} i={i}>
            <div className="flex items-center gap-3 text-[12px]">
              <span className="w-[120px] shrink-0 truncate font-display font-semibold text-ink sm:w-[150px]">{n}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/8">
                <motion.span className={clsx("block h-full", risk ? "bg-[#9a4b3c]" : "bg-pine-500")} initial={{ width: 0 }} animate={{ width: `${w * 100}%` }} transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: EASE }} />
              </span>
              <span className={clsx("w-[78px] shrink-0 text-right font-mono text-[9.5px] uppercase", risk ? "text-[#9a4b3c]" : "text-ink/45")}>{tag}</span>
            </div>
          </Row>
        ))}
      </div>
    </div>
  );
}

function Scenario() {
  const bars = [2, 4, 7, 11, 16, 20, 17, 12, 8, 5, 3, 2];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <Pill tone="lake">Scenario</Pill>
        <span className="font-mono text-[10px] uppercase text-ink/40">S&amp;P 1500 · 3M after</span>
      </div>
      <p className="mt-3 font-display text-[16px] font-semibold leading-snug text-ink sm:text-[18px]">US 10-year yield +0.5pp in three months</p>
      <div className="relative mt-auto flex h-[120px] items-end gap-1.5 border-b border-ink/15 pb-px">
        {bars.map((b, i) => (
          <motion.span key={i} className={clsx("flex-1 rounded-t-[3px]", i < 5 ? "bg-[#9a4b3c]/70" : "bg-lake-500/70")} initial={{ height: 0 }} animate={{ height: `${b * 4.5}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.04, ease: EASE }} />
        ))}
        <span className="absolute bottom-0 left-[41%] top-0 border-l border-dashed border-ink/50" />
        <span className="absolute left-[42%] top-0 font-mono text-[9.5px] uppercase text-ink/55">Median</span>
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.04em] text-ink/45">Distribution of stock returns across past episodes</p>
    </div>
  );
}

function Ideas() {
  const ideas = [
    ["Vertiv", "Power & cooling demand from new GPU deployments", "Not on watchlist"],
    ["Eaton", "Electrical equipment tied to data center power", "Not on watchlist"],
    ["Micron", "HBM demand read-through from Rubin ramps", "On watchlist"],
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <Pill tone="pine">Ideas</Pill>
        <span className="font-mono text-[10px] uppercase text-ink/40">From today’s catalysts</span>
      </div>
      <p className="mt-3 font-display text-[16px] font-semibold leading-snug text-ink sm:text-[18px]">Second-order names worth a look</p>
      <ul className="mt-auto space-y-1.5">
        {ideas.map(([n, why, tag], i) => (
          <Row key={n} i={i} li>
            <div className="flex items-center gap-3 rounded-md border border-ink/8 bg-white/80 px-3 py-2">
              <span className="w-[64px] shrink-0 font-display text-[12.5px] font-semibold text-ink">{n}</span>
              <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink/60">{why}</span>
              <span className="hidden shrink-0 font-mono text-[9.5px] uppercase text-ink/40 sm:inline">{tag}</span>
            </div>
          </Row>
        ))}
      </ul>
    </div>
  );
}
