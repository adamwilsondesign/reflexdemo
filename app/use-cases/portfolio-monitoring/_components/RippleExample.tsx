"use client";

import { motion } from "motion/react";
import { useLoop } from "../../_components/useLoop";
import { AutoTabs } from "@/components/ui/AutoTabs";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { CardHeader, Sparkline, Stage, TakeawayList, series, useTypewriter } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <Stage field="pine" image="/figma/n915.png" className="flex h-full w-full items-center justify-center p-3 sm:p-10">
      <div className="w-full max-w-[440px]">{children}</div>
    </Stage>
  );
}

function News() {
  return (
    <Frame>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-4 sm:p-5">
        <p className="text-[12px] text-[#8f8f8f]">Company catalyst · Bullish</p>
        <p className="mt-1.5 text-[18px] font-semibold sm:text-[22px] leading-tight text-[#0d0d0d]">CoreWeave rolls out Nvidia Vera Rubin with Cognition live</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[#5d5d5d]">A chip platform moves from roadmap to customer use. Commercial deployment is underway.</p>
        <div className="mt-4 border-t border-black/10 pt-3">
          <div className="flex items-center justify-between text-[12px] text-[#8f8f8f]">
            <span>CoreWeave · 10D</span>
            <span>Theme · AI infrastructure</span>
          </div>
          <div className="mt-2 h-12">
            <Sparkline points={series(30, 11, 0.55, 1.8)} className="h-full w-full" />
          </div>
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
      <motion.div ref={ref} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-4 sm:p-5">
        <p className="text-[12px] text-[#8f8f8f]">Alfred · Analysis</p>
        <p className="mt-1 text-[18px] font-semibold sm:text-[22px] text-[#0d0d0d]">5 key takeaways</p>
        <div className="mt-3 border-t border-black/10">
          <TakeawayList items={TAKEAWAYS} active={on} />
        </div>
      </motion.div>
    </Frame>
  );
}

function Connected() {
  const rows = [
    { n: "NVIDIA", r: "Platform supplier", d: "Direct" },
    { n: "Microsoft Azure", r: "Cloud provider", d: "Via Rubin" },
    { n: "Nebius", r: "Cloud provider", d: "Via Rubin" },
    { n: "Applied Digital", r: "Cloud provider", d: "Via Rubin" },
  ];
  return (
    <Frame>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-4 sm:p-5">
        <p className="text-[12px] text-[#8f8f8f]">Knowledge Graph · ranked by relationship</p>
        <p className="mt-1 text-[18px] font-semibold sm:text-[22px] text-[#0d0d0d]">Connected companies</p>
        <ul className="mt-3 divide-y divide-black/10 border-t border-black/10">
          {rows.map((c, i) => (
            <motion.li key={c.n} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: EASE }} className="flex items-center gap-3 py-2.5 text-[13px]">
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-[#0d0d0d]">{c.n}</span>
                <span className="block text-[12px] text-[#8f8f8f]">{c.r}</span>
              </span>
              <span className={i === 0 ? "font-medium text-[#0d0d0d]" : "text-[#8f8f8f]"}>{c.d}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </Frame>
  );
}

function Ask() {
  const q = useTypewriter("Are more customers using Rubin through CoreWeave?", { speed: 30, delay: 400 });
  return (
    <Frame>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card p-4 sm:p-5">
        <CardHeader trail={["From this insight"]} />
        <div className="mt-3 flex min-h-[72px] items-start justify-between gap-3 rounded-[10px] bg-[#f9f9f9] p-3 text-[14px] text-[#0d0d0d]">
          <span>{q}<span className="animate-blink ml-0.5 inline-block h-[1em] w-px translate-y-[2px] bg-[#0d0d0d]" /></span>
          <span className="mt-auto shrink-0 rounded-[10px] border border-black/10 bg-white px-3 py-1 text-[13px] font-medium">Ask</span>
        </div>
        <ul className="mt-3 divide-y divide-black/10 text-[13px] text-[#5d5d5d]">
          {["Compare cloud provider demand for Rubin", "Which regions are most exposed?"].map((f, i) => (
            <motion.li key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 + i * 0.12, duration: 0.5, ease: EASE }} className="flex justify-between py-2">
              {f} <span aria-hidden="true" className="text-[#8f8f8f]">→</span>
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
