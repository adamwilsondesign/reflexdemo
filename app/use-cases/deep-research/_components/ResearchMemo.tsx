"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { CardHeader, Cite, CodeBlock, MissingData, Pill } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

type Kind = "gen" | "calc" | "src";
const KIND: Record<Kind, string> = { gen: "Generated", calc: "Calculated", src: "Sourced" };

function Line({ k, children }: { k: Kind; children: React.ReactNode }) {
  return (
    <li className="flex flex-col gap-1.5 border-t border-black/10 py-3 first:border-t-0 first:pt-0 sm:flex-row sm:gap-3">
      <span className="w-[84px] shrink-0"><Pill>{KIND[k]}</Pill></span>
      <span className="text-[14px] leading-relaxed text-[#0d0d0d]">{children}</span>
    </li>
  );
}

const SECTIONS: { key: string; title: string; body: React.ReactNode }[] = [
  {
    key: "priced",
    title: "What the market is pricing",
    body: (
      <ul>
        <Line k="calc">At the post-selloff price, a reverse DCF implies roughly <b className="font-semibold">16% annual AWS revenue growth</b> over three years. Your thesis needs 20% or more.</Line>
        <Line k="src">Consensus expects AWS growth in the high teens next year<Cite n={1} />, broadly in line with the last two quarters.</Line>
        <Line k="gen">The gap to your view: the market is pricing stabilisation, not re-acceleration. That is where the upside sits, and where the risk sits.</Line>
      </ul>
    ),
  },
  {
    key: "against",
    title: "Three strongest counter-arguments",
    body: (
      <ul>
        <Line k="src"><b className="font-semibold">Capex intensity.</b> Raised capital-expenditure guidance keeps free cash flow compressed even if AWS accelerates<Cite n={2} />.</Line>
        <Line k="src"><b className="font-semibold">Capacity, not demand.</b> Management pointed to power and chip supply as constraints on near-term AWS growth<Cite n={3} />.</Line>
        <Line k="src"><b className="font-semibold">Margins already in estimates.</b> Retail margin expansion is reflected in consensus; further gains lean on advertising growth holding up<Cite n={4} />.</Line>
      </ul>
    ),
  },
  {
    key: "breaks",
    title: "What breaks it",
    body: (
      <ul>
        <Line k="gen"><b className="font-semibold">Next quarterly results:</b> AWS growth at or below consensus with no capacity commentary would undercut re-acceleration.</Line>
        <Line k="gen"><b className="font-semibold">Peer hyperscaler calls, same fortnight:</b> cuts to AI capex plans would signal softer demand across the cohort.</Line>
        <Line k="src"><b className="font-semibold">Retail operating margin</b> falling below the prior-year quarter<Cite n={4} /> would break the second leg of the thesis.</Line>
      </ul>
    ),
  },
  {
    key: "valuation",
    title: "Valuation: what you have to believe",
    body: (
      <div className="space-y-4">
        <ul>
          <Line k="calc">For the stock to work from here: AWS grows ~20% a year for three years, holds operating margin in the mid-30s, and retail margin reaches ~6%.</Line>
        </ul>
        <CodeBlock
          lines={[
            "implied = sotp(aws_g=0.20, aws_m=0.35, retail_m=0.06)",
            "upside  = implied / price - 1  # 0.14 under your assumptions",
            "base    = sotp(aws_g=0.16, ...) / price - 1  # -0.03 at what’s priced",
          ]}
        />
      </div>
    ),
  },
  {
    key: "second",
    title: "Second-order risk",
    body: (
      <div className="space-y-4">
        <ul>
          <Line k="src"><b className="font-semibold">NVIDIA · supplier.</b> GPU allocation and lead-time commentary would show capacity constraints first<Cite n={5} />.</Line>
          <Line k="src"><b className="font-semibold">Microsoft · competitor.</b> Azure growth is the cleanest read-across on AI cloud demand<Cite n={5} />.</Line>
          <Line k="src"><b className="font-semibold">Utilities and power equipment · suppliers.</b> Interconnect delays would cap new data center capacity<Cite n={5} />.</Line>
        </ul>
        <MissingData label="GPU purchase volumes by supplier" reason="Not disclosed by Amazon" />
      </div>
    ),
  },
  {
    key: "verdict",
    title: "Verdict",
    body: (
      <div className="space-y-4">
        <p className="text-[13px] text-[#8f8f8f]">
          Holds · <span className="font-semibold text-[#0d0d0d]">Weakens</span> · Breaks
        </p>
        <ul>
          <Line k="gen">Re-acceleration is plausible but not priced, and the case rests on capacity coming online on time. The retail leg is largely in the numbers already.</Line>
          <Line k="gen">Watch next-quarter AWS growth and capex guidance, then peer capex commentary, before adding.</Line>
        </ul>
      </div>
    ),
  },
];

const SOURCES = [
  "LSEG · consensus estimates, AWS segment revenue",
  "Amazon Q3 2026 earnings release · capex outlook",
  "Amazon Q3 2026 earnings call transcript · Quartr",
  "Amazon Q3 2026 10-Q · segment operating income",
  "Reflexivity Knowledge Graph · AMZN relationships",
];

/** The Amazon pressure-test as a cited, inspectable memo: sections, provenance tags, sources, a flagged gap. */
export function ResearchMemo() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const s = SECTIONS[active];
  return (
    <div className="ui-card pui overflow-hidden">
      {/* memo header */}
      <div className="border-b border-black/10 px-4 py-3 md:px-5">
        <CardHeader title="Research memo · Amazon (AMZN)" right={<span className="hidden text-[12px] text-[#8f8f8f] sm:inline">14 sources · 3 calculations</span>} />
      </div>

      <div className="grid lg:grid-cols-[260px_1fr]">
        {/* section nav */}
        <div role="tablist" aria-label="Memo sections" aria-orientation="vertical" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-black/10 p-2 lg:block lg:space-y-0.5 lg:border-b-0 lg:border-r lg:p-3">
          {SECTIONS.map((sec, i) => (
            <button
              key={sec.key}
              role="tab"
              id={`memo-tab-${sec.key}`}
              aria-selected={i === active}
              aria-controls="memo-panel"
              onClick={() => setActive(i)}
              className={clsx(
                "flex shrink-0 items-center rounded-[10px] px-2.5 py-2 text-left text-[13px] transition-colors duration-300 lg:w-full",
                i === active ? "bg-black/[0.05] font-medium text-[#0d0d0d]" : "text-[#5d5d5d] hover:bg-black/[0.05]",
              )}
            >
              <span className="whitespace-nowrap lg:whitespace-normal">{sec.title}</span>
            </button>
          ))}
        </div>

        {/* section content */}
        <div className="flex min-h-[420px] flex-col">
          <div id="memo-panel" role="tabpanel" aria-labelledby={`memo-tab-${s.key}`} className="relative flex-1 p-4 md:p-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={s.key} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45, ease: EASE }}>
                <h4 className="mb-4 text-[20px] font-semibold leading-snug text-[#0d0d0d]">{s.title}</h4>
                {s.body}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid gap-5 border-t border-black/10 p-4 md:grid-cols-2 md:p-6">
            <div>
              <p className="text-[12px] text-[#8f8f8f]">Sources</p>
              <ol className="mt-2 space-y-1">
                {SOURCES.map((src, i) => (
                  <li key={src} className="flex items-baseline gap-2 text-[12px] text-[#5d5d5d]">
                    <span className="w-5 shrink-0 text-[#8f8f8f]">[{i + 1}]</span>
                    <span className="min-w-0 truncate">{src}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="text-[12px] text-[#8f8f8f]">Follow up or challenge</p>
              <ul className="mt-2 space-y-1.5">
                {["Rerun the valuation at 15% AWS growth", "Show the evidence behind counter-argument 2"].map((f) => (
                  <li key={f} className="flex items-center justify-between gap-3 rounded-[10px] border border-black/10 bg-white px-3 py-2 text-[13px] text-[#0d0d0d]">
                    {f} <span aria-hidden="true" className="text-[#8f8f8f]">→</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
