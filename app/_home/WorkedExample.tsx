"use client";

import { motion } from "motion/react";
import { ScrollStory } from "@/components/product/visuals";
import { CardHeader, Cite, CodeBlock, MissingData, SourceRow, Sparkline, Stage, series } from "@/components/product/ui";
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
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="ui-card w-full max-w-[420px] p-4">
                <p className="text-[12px] text-[#8f8f8f]">Market catalyst · Macro</p>
                <p className="mt-1 text-[18px] font-semibold leading-snug text-[#0d0d0d]">Sept U.S. Flash PMI rekindles factory cost pressure</p>
                <p className="mt-2 text-[13px] text-[#5d5d5d]">4 holdings in your book have input-cost exposure.</p>
                <div className="mt-4 h-12"><Sparkline points={series(36, 21, -0.25, 1.8)} className="h-full w-full" /></div>
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
              <div className="ui-card w-full max-w-[420px] p-4">
                <CardHeader trail={["Industrial automation"]} />
                <p className="mt-4 rounded-[10px] bg-[#f9f9f9] px-4 py-2 text-[14px] text-[#0d0d0d]">Which of my holdings can pass higher input costs through to customers?</p>
                <p className="mt-4 text-[13px] leading-relaxed text-[#5d5d5d]">Two of four have contracted pricing escalators covering ~70% of revenue<Cite n={1} />. The other two lose 40–60 bps of gross margin per 1% input inflation<Cite n={2} />.</p>
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
              <div className="ui-card w-full max-w-[420px] p-4">
                <p className="text-[14px] font-semibold text-[#0d0d0d]">Evidence</p>
                <div className="mt-4 space-y-2">
                  <SourceRow n={1} title="Q2 2026 10-Q · Pricing and contracts" meta="Filing, p.31" />
                  <CodeBlock lines={["sens = -52 / 1.0  # bps per 1%"]} />
                  <MissingData label="Hedging book, 1 holding" reason="Not disclosed" />
                </div>
              </div>
            </Stage>
          ),
        },
      ]}
    />
  );
}
