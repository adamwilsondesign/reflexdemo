"use client";

import { motion } from "motion/react";
import { useLoop } from "../../_components/useLoop";
import { AutoTabs } from "@/components/ui/AutoTabs";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { AlfredGlyph, Pill, Sparkline, Stage, series, useTypewriter } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <Stage field="pine" image="/figma/n915.png" className="flex h-full w-full items-center justify-center p-4 sm:p-10">
      <div className="w-[420px] max-w-none shrink-0 scale-[0.64] sm:w-full sm:max-w-[440px] sm:shrink sm:scale-100">{children}</div>
    </Stage>
  );
}

function News() {
  return (
    <Frame>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-5">
        <div className="flex items-center justify-between">
          <span className="t-ui text-[10px] text-ink/45">The news · Company catalyst</span>
          <Pill tone="pine">Bullish</Pill>
        </div>
        <p className="mt-3 font-display text-[19px] font-semibold leading-tight text-ink sm:text-[22px]">CoreWeave rolls out Nvidia Vera Rubin with Cognition live</p>
        <p className="mt-2 text-[12.5px] text-ink/60">A chip platform moves from roadmap to customer use. Commercial deployment is underway.</p>
        <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-3 font-mono text-[10px] uppercase tracking-[0.04em]">
          <span className="flex items-center gap-1.5 text-ink/70"><span className="h-1.5 w-1.5 rounded-full bg-pine-500" />Customer deployment</span>
          <span className="text-ink/40">Theme · AI infrastructure</span>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }} className="ui-card mx-3 -mt-1 p-4 sm:mx-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-lake-100 font-display text-[10px] font-semibold text-lake-700">C</span>
            <span className="font-display text-[13px] font-semibold text-ink">CoreWeave</span>
          </span>
          <span className="font-mono text-[10px] uppercase text-ink/40">CRWV · 10D</span>
        </div>
        <div className="mt-2 h-14 text-pine-500">
          <Sparkline points={series(30, 11, 0.55, 1.8)} className="h-full w-full" fill="rgb(62 92 80 / 0.1)" />
        </div>
      </motion.div>
    </Frame>
  );
}

const TAKEAWAYS = ["Customer deployments begin", "Demand signal strengthens", "Commercialization path gets clearer", "Supply chain and manufacturing scale", "Key milestones to watch"];

function Takeaways() {
  const { ref, step: on } = useLoop(TAKEAWAYS.length, 1200, 0);
  return (
    <Frame>
      <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-5">
        <div className="flex items-center justify-between">
          <span className="t-ui text-[10px] text-ink/45">Alfred / Analysis</span>
          <Pill tone="pine">Bullish</Pill>
        </div>
        <p className="mt-3 font-display text-[22px] font-semibold text-ink">5 key takeaways</p>
        <p className="text-[12px] text-ink/50">Signal summary · each tagged to its themes</p>
        <ol className="mt-4 space-y-1">
          {TAKEAWAYS.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
              className={"flex items-center gap-3 rounded-md px-2.5 py-2 transition-colors duration-500 " + (i === on ? "bg-ink/[0.06]" : "")}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-ink/[0.06] font-mono text-[10px] text-ink/55">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[13px] font-medium text-ink">{t}</span>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </Frame>
  );
}

function Connected() {
  const kids = [
    { k: "M", n: "Microsoft Azure", r: "Cloud provider" },
    { k: "N", n: "Nebius", r: "Cloud provider" },
    { k: "A", n: "Applied Digital", r: "Cloud provider" },
  ];
  return (
    <Frame>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-5">
        <span className="t-ui text-[10px] text-ink/45">Ecosystem / Relationship view</span>
        <p className="mt-2 border-b border-ink/8 pb-3 font-display text-[20px] font-semibold text-ink">Connected companies</p>
        <div className="relative mt-5">
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, ease: EASE }} className="mx-auto flex w-[58%] items-center gap-3 rounded-lg border border-ink/10 bg-white px-3 py-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-pine-100 font-display text-[11px] font-semibold text-pine-700">N</span>
            <span>
              <span className="block font-display text-[14px] font-semibold text-ink">NVIDIA</span>
              <span className="block text-[10.5px] text-ink/50">Platform supplier</span>
            </span>
          </motion.div>
          <svg viewBox="0 0 300 70" className="h-[70px] w-full" fill="none" aria-hidden="true" preserveAspectRatio="none">
            {["M150 0 V28", "M150 42 V52 H50 V70", "M150 52 V70", "M150 52 H250 V70"].map((d, i) => (
              <motion.path key={d} d={d} stroke="#5d738c" strokeWidth={1} vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.45 + i * 0.12, duration: 0.6, ease: EASE }} />
            ))}
          </svg>
          <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }} className="absolute left-1/2 top-[64px] -translate-x-1/2 rounded-full border border-lake-300/60 bg-lake-100 px-2.5 py-0.5 font-mono text-[9.5px] uppercase text-lake-700">
            Rubin GPU platform
          </motion.span>
          <div className="grid grid-cols-3 gap-2">
            {kids.map((c, i) => (
              <motion.div key={c.n} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.12, duration: 0.6, ease: EASE }} className="rounded-lg border border-ink/10 bg-white p-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-ink/[0.06] font-display text-[9.5px] font-semibold text-ink/60">{c.k}</span>
                <span className="mt-2 block font-display text-[11.5px] font-semibold leading-tight text-ink">{c.n}</span>
                <span className="block text-[10px] text-ink/50">{c.r}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/40">4 connected entities · ranked by relationship strength</p>
        </div>
      </motion.div>
    </Frame>
  );
}

function Ask() {
  const q = useTypewriter("Are more customers using Rubin through CoreWeave?", { speed: 30, delay: 400 });
  return (
    <Frame>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-5">
        <div className="flex items-center gap-2.5 border-b border-ink/8 pb-3">
          <AlfredGlyph className="h-6 w-6 text-lake-700" />
          <span>
            <span className="block font-display text-[14px] font-semibold text-ink">Alfred</span>
            <span className="block font-mono text-[9.5px] uppercase tracking-[0.05em] text-ink/45">Research assistant · from this Insight</span>
          </span>
        </div>
        <p className="mt-4 font-display text-[22px] font-semibold text-ink">Ask Alfred</p>
        <div className="mt-3 flex min-h-[78px] items-start justify-between gap-3 rounded-lg border border-ink/10 bg-white p-3 text-[13px] text-ink/85">
          <span>{q}<span className="animate-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-lake-700" /></span>
          <span className="mt-auto flex h-6 w-6 shrink-0 items-center justify-center rounded bg-lake-700 text-white">
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 10V2M2.5 5.5L6 2l3.5 3.5" /></svg>
          </span>
        </div>
        <p className="t-ui mt-4 text-[10px] text-ink/40">Suggested follow-ups</p>
        <ul className="mt-2 space-y-1.5 text-[12.5px] text-ink/75">
          {["Compare cloud provider demand for Rubin", "Summarize CoreWeave capacity trends", "Which regions are most exposed?"].map((f, i) => (
            <motion.li key={f} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 + i * 0.12, duration: 0.5, ease: EASE }} className="flex justify-between rounded-md border border-ink/8 bg-white/60 px-3 py-2">
              {f} <span aria-hidden="true">→</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </Frame>
  );
}

export function RippleExample() {
  return (
    <AutoTabs
      interval={7000}
      items={[
        { title: "The news", icon: <PrecisionIcon name="signal" className="h-6 w-6" />, body: "Start with the catalyst, its direction and the theme it moves. Here: CoreWeave puts NVIDIA’s Vera Rubin platform into live customer use.", visual: <News /> },
        { title: "Top 5 takeaways", icon: <PrecisionIcon name="stack" className="h-6 w-6" />, body: "The five points to know about the catalyst, each tagged to its themes, so you can decide in a minute whether it matters.", visual: <Takeaways /> },
        { title: "Connected companies", icon: <PrecisionIcon name="triad" className="h-6 w-6" />, body: "The Knowledge Graph follows the catalyst to connected companies, ranked, from NVIDIA as platform supplier to the cloud providers building on Rubin.", visual: <Connected /> },
        { title: "Ask Alfred", icon: <PrecisionIcon name="star" className="h-6 w-6" />, body: "Open the Insight in Alfred and keep going: check which regions are exposed, compare providers, or test the read against your thesis.", visual: <Ask /> },
      ]}
    />
  );
}
