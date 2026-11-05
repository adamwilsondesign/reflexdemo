"use client";

import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { CardHeader, Cite, Pill, Sparkline, Stage } from "@/components/product/ui";
import { useLoop } from "./useLoop";

const EASE = [0.16, 1, 0.3, 1] as const;

type Job = { key: string; label: string; crumb: string; uses: string };
const JOBS: Job[] = [
  { key: "monitor", label: "Portfolio monitoring", crumb: "Watchlist", uses: "Knowledge Graph · Insights" },
  { key: "research", label: "Deep research", crumb: "Research", uses: "Alfred · Auditable analysis · Knowledge Graph" },
  { key: "theme", label: "Thematic exposure", crumb: "Themes", uses: "Knowledge Graph · Auditable analysis" },
  { key: "scenario", label: "Scenario & stress testing", crumb: "Scenarios", uses: "Alfred · Auditable analysis" },
  { key: "ideas", label: "Idea generation", crumb: "Ideas", uses: "Alfred · Knowledge Graph · Insights" },
];

/** Overview hero: one product panel, five jobs, the same engine underneath. */
export function JobsHero() {
  const { ref, step, reduce } = useLoop(JOBS.length, 3600, 0);
  const job = JOBS[step];
  return (
    <Stage field="lake" className="p-3 sm:p-6 md:p-8" image="/figma/n915.png">
      <div ref={ref} className="ui-card overflow-hidden">
        <div className="border-b border-black/10 px-4 py-3">
          <CardHeader title="Reflexivity" trail={[job.crumb]} />
        </div>

        <div className="grid md:grid-cols-[220px_1fr]">
          {/* job rail */}
          <ul className="no-scrollbar flex gap-1 overflow-x-auto border-b border-black/10 p-2 md:block md:space-y-0.5 md:overflow-visible md:border-b-0 md:border-r" aria-label="Use cases">
            {JOBS.map((j, i) => (
              <li key={j.key} className="shrink-0">
                <span
                  className={clsx(
                    "flex items-center gap-2 whitespace-nowrap rounded-[10px] px-2.5 py-1.5 text-[13px] transition-colors duration-500 md:py-2",
                    i === step ? "bg-black/[0.05] font-medium text-[#0d0d0d]" : "text-[#8f8f8f]",
                  )}
                >
                  {j.label}
                </span>
              </li>
            ))}
          </ul>

          {/* output pane */}
          <div className="relative h-[280px] p-4 sm:h-[300px] sm:p-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={job.key}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: EASE }}
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
        <p className="truncate border-t border-black/10 px-4 py-2.5 text-[12px] text-[#8f8f8f]">
          Same engine: <span className="text-[#5d5d5d]">{job.uses}</span>
        </p>
      </div>
    </Stage>
  );
}

function Row({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }} className="flex items-center justify-between gap-3 py-2 text-[13px]">
      {children}
    </motion.li>
  );
}

function Head({ meta, title, right }: { meta: string; title: string; right?: React.ReactNode }) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] text-[#8f8f8f]">{meta}</span>
        {right}
      </div>
      <p className="mt-1.5 text-[18px] font-semibold leading-snug text-[#0d0d0d]">{title}</p>
    </>
  );
}

function Monitor() {
  return (
    <div className="flex h-full flex-col">
      <Head meta="Company catalyst · 07:02 ET" title="CoreWeave rolls out Nvidia Vera Rubin with Cognition live" />
      <p className="mt-1.5 text-[13px] text-[#5d5d5d]">On your watchlist. Connected names below.</p>
      <ul className="mt-auto divide-y divide-black/10 border-t border-black/10">
        {[["NVIDIA", "Platform supplier"], ["Microsoft Azure", "Cloud provider"], ["Nebius", "Cloud provider"]].map(([n, r], i) => (
          <Row key={n} i={i}>
            <span className="font-medium text-[#0d0d0d]">{n}</span>
            <span className="text-[#8f8f8f]">{r}</span>
          </Row>
        ))}
      </ul>
    </div>
  );
}

function Research() {
  return (
    <div className="flex h-full flex-col">
      <Head meta="Research memo · AMZN" title="Is the post-selloff long still intact?" right={<Pill>Thesis weakens</Pill>} />
      <p className="mt-2 text-[13px] leading-relaxed text-[#5d5d5d]">
        The market prices AWS growth below your view<Cite n={1} />. The strongest counter-argument is capex intensity compressing free cash flow<Cite n={2} />.
      </p>
      <p className="mt-auto border-t border-black/10 pt-2.5 text-[12px] text-[#8f8f8f]">6 sections · 14 sources · 3 calculations</p>
    </div>
  );
}

function Theme() {
  const rows: [string, string, string][] = [
    ["Rockwell Automation", "Core", "0.92"],
    ["Teradyne", "Less obvious", "0.68"],
    ["Harmonic Drive", "Less obvious", "0.61"],
    ["ManpowerGroup", "Risk", "0.44"],
  ];
  return (
    <div className="flex h-full flex-col">
      <Head meta="Theme · exposure strength" title="Industrial Automation" />
      <ul className="mt-auto divide-y divide-black/10 border-t border-black/10">
        {rows.map(([n, tag, s], i) => (
          <Row key={n} i={i}>
            <span className="min-w-0 flex-1 truncate font-medium text-[#0d0d0d]">{n}</span>
            <span className="w-[92px] text-[#8f8f8f]">{tag}</span>
            <span className="w-9 text-right tabular-nums text-[#0d0d0d]">{s}</span>
          </Row>
        ))}
      </ul>
    </div>
  );
}

function Scenario() {
  return (
    <div className="flex h-full flex-col">
      <Head meta="Scenario · S&P 1500 · past episodes" title="US 10-year yield +0.5pp in three months" />
      <div className="mt-auto h-[90px]">
        <Sparkline points={[0, -0.4, -0.8, -1.1, -1.6, -2.1, -1.9, -1.4, -0.6, 0.1, 0.6]} className="h-full w-full" />
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-2.5 text-[13px]">
        <span className="text-[#8f8f8f]">Median stock, 3M after</span>
        <span className="font-semibold tabular-nums text-[#0d0d0d]">−2.1%</span>
      </div>
    </div>
  );
}

function Ideas() {
  const ideas = [
    ["Vertiv", "Power and cooling for GPU deployments"],
    ["Eaton", "Electrical equipment for data center power"],
    ["Micron", "HBM demand read-through from Rubin"],
  ];
  return (
    <div className="flex h-full flex-col">
      <Head meta="From today’s catalysts" title="Second-order names worth a look" />
      <ul className="mt-auto divide-y divide-black/10 border-t border-black/10">
        {ideas.map(([n, why], i) => (
          <Row key={n} i={i}>
            <span className="w-[64px] shrink-0 font-medium text-[#0d0d0d]">{n}</span>
            <span className="min-w-0 flex-1 truncate text-right text-[#8f8f8f]">{why}</span>
          </Row>
        ))}
      </ul>
    </div>
  );
}
