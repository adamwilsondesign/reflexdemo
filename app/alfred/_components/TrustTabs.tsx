"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import clsx from "clsx";
import { AutoTabs } from "@/components/ui/AutoTabs";
import { PrecisionIcon } from "@/components/ui/PrecisionIcon";
import { CardHeader, Cite, CodeBlock, MissingData, SourceRow } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

/** One answer, three inspection states: the source, where evidence ends, and the calculation. */
function OneAnswer({ focus }: { focus: 0 | 1 | 2 }) {
  const hl = (on: boolean) => clsx("underline decoration-1 underline-offset-[3px] transition-colors duration-500", on ? "font-medium decoration-[#0d0d0d]" : "decoration-transparent");
  return (
    <div className="pui grain field-mist relative isolate flex h-full w-full flex-col overflow-hidden rounded-[18px] p-4 sm:p-7">
      <div className="ui-card p-4">
        <CardHeader trail={["AMZN"]} />
        <p className="mt-3 rounded-[10px] bg-[#f9f9f9] px-3 py-2 text-[13px] text-[#5d5d5d]">Is AWS growth re-accelerating, and how much of it is AI?</p>
        <p className="mt-3 text-[14px] leading-relaxed text-[#0d0d0d]">
          AWS revenue grew <span className={hl(focus === 0 || focus === 2)}>19% year over year in Q4 2024</span>
          <Cite n={1} />, up from 13% a year earlier
          <Cite n={2} />. Management attributes part of the growth to AI workloads, but <span className={hl(focus === 1)}>does not disclose AI revenue separately</span>.
        </p>
      </div>

      <div className="relative mt-3 flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={focus} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="space-y-2">
            {focus === 0 && (
              <>
                <SourceRow n={1} title="Amazon.com Q4 2024 earnings release" meta="Filing, segment results, p.4" />
                <div className="ui-card px-3 py-2.5">
                  <p className="text-[12px] text-[#8f8f8f]">Excerpt</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-[#5d5d5d]">
                    “AWS segment sales increased <span className="font-medium text-[#0d0d0d]">19% year-over-year to $28.8 billion</span>.”
                  </p>
                </div>
              </>
            )}
            {focus === 1 && (
              <>
                <MissingData label="AI revenue within AWS" reason="Not disclosed by issuer" />
                <ul className="ui-card divide-y divide-black/10 px-3">
                  {[["Reports the disclosed segment figure", true], ["Quotes management’s comments, cited", true], ["Does not invent an AI revenue estimate", false]].map(([t, ok]) => (
                    <li key={t as string} className="flex items-center gap-2 py-2 text-[13px] text-[#0d0d0d]">
                      <span className="w-3 text-center text-[#5d5d5d]">{ok ? "✓" : "✕"}</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {focus === 2 && (
              <>
                <CodeBlock
                  lines={[
                    `aws_q4_24 = 28.79  # $bn, source [1]`,
                    `aws_q4_23 = 24.20  # $bn, source [2]`,
                    `yoy = aws_q4_24 / aws_q4_23 - 1`,
                    `# = 0.190 → 19.0%`,
                  ]}
                />
                <div className="flex items-center justify-between rounded-[10px] border border-black/10 bg-white px-3 py-2">
                  <span className="text-[13px] font-medium text-[#0d0d0d]">Inputs, code and output</span>
                  <span className="text-[12px] text-[#8f8f8f]">Re-runnable</span>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function TrustTabs() {
  return (
    <AutoTabs
      interval={6500}
      visualClassName="[&>div]:aspect-[4/5.2] sm:[&>div]:aspect-[4/3.4]"
      items={[
        {
          title: "Open the source.",
          icon: <PrecisionIcon name="eye" className="h-6 w-6" />,
          body: "Follow a citation to read the original claim in context. Figures link to the filing, transcript or dataset they came from.",
          visual: <OneAnswer focus={0} />,
        },
        {
          title: "Know where evidence ends.",
          icon: <PrecisionIcon name="venn" className="h-6 w-6" />,
          body: "See which inputs are missing before relying on the analysis. When a number isn’t disclosed, Alfred marks it NA rather than estimating it.",
          visual: <OneAnswer focus={1} />,
        },
        {
          title: "Inspect the calculation.",
          icon: <PrecisionIcon name="cube" className="h-6 w-6" />,
          body: (
            <>
              Check the inputs and code used to produce a result.
            </>
          ),
          visual: <OneAnswer focus={2} />,
        },
      ]}
    />
  );
}
