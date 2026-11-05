"use client";

import { motion } from "motion/react";
import { ScrollStory } from "@/components/product/visuals";
import { CardHeader, Cite, CodeBlock, MissingData, Pill, SourceRow, Sparkline, Stage, series } from "@/components/product/ui";
import { KnowledgeGraph } from "@/components/graphics/KnowledgeGraph";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WorkedExample() {
  return (
    <ScrollStory
      className="mt-10 md:mt-16"
      steps={[
        {
          kicker: "01 · The event",
          title: "A catalyst lands.",
          body: "September U.S. Flash PMI rekindles factory cost pressure. Insights surfaces it the moment it matters to the companies and themes you follow, with the reason it reached you.",
          visual: (
            <Stage field="lake" className="flex h-full w-full items-center justify-center p-6 sm:p-10">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card w-full max-w-[460px] p-5">
                <div className="flex items-center justify-between"><span className="t-ui text-ink/50">Market catalyst · Macro</span><Pill tone="warn">Bearish · Input costs</Pill></div>
                <p className="mt-3 font-display text-[22px] font-semibold leading-tight text-ink">Sept U.S. Flash PMI rekindles factory cost pressure</p>
                <p className="mt-2 text-[12.5px] text-ink/60">Theme · Industrial automation <span className="mx-1 text-ink/30">·</span> Why you’re seeing this: 4 holdings in your book have input-cost exposure.</p>
                <div className="mt-4 h-16 text-[#9a4b3c]"><Sparkline points={series(36, 21, -0.25, 1.8)} className="h-full w-full" fill="rgb(154 75 60 / 0.08)" /></div>
              </motion.div>
            </Stage>
          ),
        },
        {
          kicker: "02 · The ripple",
          title: "The Graph traces where it travels.",
          body: "Relationships are weighted by evidence, so you see which suppliers, customers, and competitors are most exposed: first-order, then second-order.",
          visual: (
            <Stage field="ink" className="h-full w-full">
              <KnowledgeGraph tone="dark" sequence={["AUTO", "PWR", "ETN"]} interval={4200} minor={50} />
            </Stage>
          ),
        },
        {
          kicker: "03 · The question",
          title: "Ask Alfred what it means for you.",
          body: "Open the Insight in Alfred and keep going: compare exposures, check guidance, or pressure-test the read against your own thesis.",
          visual: (
            <Stage field="pine" className="flex h-full w-full items-center justify-center p-6 sm:p-10">
              <div className="ui-card w-full max-w-[460px] p-5">
                <CardHeader trail={["Research", "Industrial automation"]} />
                <div className="mt-4 rounded-lg border border-ink/10 bg-white p-3 text-[13.5px] text-ink/85">Which of my holdings can pass higher input costs through to customers, and which can’t?</div>
                <div className="mt-4 space-y-2 text-[13px] leading-relaxed text-ink/80">
                  <p>Two of four holdings have contracted pricing escalators covering ~70% of revenue<Cite n={1} />. The other two report gross-margin sensitivity of 40–60 bps per 1% input inflation<Cite n={2} />.</p>
                </div>
              </div>
            </Stage>
          ),
        },
        {
          kicker: "04 · The evidence",
          title: "Inspect it before you act on it.",
          body: "Every figure links to its source. The calculation is visible. Where an input is missing, Alfred says so instead of estimating it.",
          visual: (
            <Stage field="mist" className="flex h-full w-full items-center justify-center p-6 sm:p-10">
              <div className="w-full max-w-[460px] space-y-3">
                <SourceRow n={1} title="Q2 2026 10-Q · Pricing and contracts" meta="Filing · p.31 · S&P Global" />
                <SourceRow n={2} title="Q2 2026 earnings call transcript" meta="Transcript · 00:41:12 · Quartr" />
                <CodeBlock lines={[`<span style="color:#8fa3b6">sens</span> = d_gross_margin_bps / d_input_cost_pct`, `<span style="color:#8fa3b6">sens</span> = -52 / 1.0  <span style="color:#7d978c"># bps per 1%</span>`]} />
                <MissingData label="Hedging book, 1 holding" reason="Not disclosed" />
              </div>
            </Stage>
          ),
        },
      ]}
    />
  );
}
