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
  return (
    <div className="grain field-mist relative isolate flex h-full w-full flex-col overflow-hidden rounded-[18px] p-4 sm:p-7">
      <div className="ui-card p-4 sm:p-5">
        <CardHeader trail={["Research", "AMZN"]} />
        <div className="mt-3 rounded-lg border border-ink/10 bg-white px-3 py-2 text-[12.5px] text-ink/75">Is AWS growth re-accelerating, and how much of it is AI?</div>
        <p className="mt-3 text-[13px] leading-relaxed text-ink/85 sm:text-[13.5px]">
          AWS revenue grew{" "}
          <span className={clsx("rounded px-0.5 transition-colors duration-500", focus === 0 && "bg-lake-100", focus === 2 && "bg-pine-100")}>19% year over year in Q4 2024</span>
          <Cite n={1} />, up from 13% a year earlier
          <Cite n={2} />. Management attributes part of the growth to AI workloads, but{" "}
          <span className={clsx("rounded px-0.5 transition-colors duration-500", focus === 1 && "bg-[#f3e6d6]")}>does not disclose AI revenue separately</span>.
        </p>
      </div>

      <div className="relative mt-3 flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={focus} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease: EASE }} className="space-y-2.5">
            {focus === 0 && (
              <>
                <SourceRow n={1} title="Amazon.com Q4 2024 earnings release" meta="Filing · segment results · p.4" />
                <div className="ui-card p-3.5">
                  <p className="t-ui text-[9.5px] text-ink/40">Source excerpt · opens in context</p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/75">
                    “AWS segment sales increased <mark className="rounded bg-lake-100 px-0.5 text-ink">19% year-over-year to $28.8 billion</mark>.”
                  </p>
                </div>
                <SourceRow n={2} title="Amazon.com Q4 2023 earnings release" meta="Filing · segment results" />
              </>
            )}
            {focus === 1 && (
              <>
                <MissingData label="AI revenue within AWS" reason="Not disclosed by issuer" />
                <div className="ui-card p-3.5">
                  <p className="t-ui text-[9.5px] text-ink/40">What Alfred does instead</p>
                  <ul className="mt-2 space-y-1.5 text-[12.5px] text-ink/75">
                    <li className="flex gap-2"><span className="text-pine-500">✓</span>Reports the disclosed segment figure</li>
                    <li className="flex gap-2"><span className="text-pine-500">✓</span>Quotes management’s qualitative comments, cited</li>
                    <li className="flex gap-2"><span className="text-[#9a4b3c]">✕</span>Does not invent an AI revenue estimate</li>
                  </ul>
                </div>
              </>
            )}
            {focus === 2 && (
              <>
                <CodeBlock
                  lines={[
                    `<span style="color:#8fa3b6">aws_q4_24</span> = 28.79  <span style="color:#7d978c"># $bn, source [1]</span>`,
                    `<span style="color:#8fa3b6">aws_q4_23</span> = 24.20  <span style="color:#7d978c"># $bn, source [2]</span>`,
                    `<span style="color:#8fa3b6">yoy</span> = aws_q4_24 / aws_q4_23 - 1`,
                    `<span style="color:#7d978c"># = 0.190 → 19.0%</span>`,
                  ]}
                />
                <div className="flex items-center justify-between rounded-lg border border-ink/8 bg-white/80 px-3 py-2">
                  <span className="font-display text-[12.5px] font-medium text-ink">Inputs, code and output</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-pine-500">Re-runnable</span>
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
              Check the inputs and code used to produce a result.{" "}
              <Link href="/auditability-data" className="link-underline font-medium text-ink">How auditability works</Link>
            </>
          ),
          visual: <OneAnswer focus={2} />,
        },
      ]}
    />
  );
}
