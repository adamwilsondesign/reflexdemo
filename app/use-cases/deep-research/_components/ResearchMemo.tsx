"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { AlfredGlyph, Cite, CodeBlock, MissingData, Pill } from "@/components/product/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

type Kind = "gen" | "calc" | "src";
const KIND: Record<Kind, { label: string; cls: string; desc: string }> = {
  gen: { label: "Generated", cls: "bg-ink/[0.06] text-ink/65", desc: "Alfred’s reasoning and synthesis" },
  calc: { label: "Calculated", cls: "bg-pine-100 text-pine-700", desc: "Run in code; the calculation is shown" },
  src: { label: "Sourced", cls: "bg-lake-100 text-lake-700", desc: "Drawn from a cited document or dataset" },
};

function Tag({ k }: { k: Kind }) {
  return <span className={clsx("mt-[2px] inline-flex h-[18px] shrink-0 items-center rounded px-1.5 font-mono text-[9px] uppercase tracking-[0.05em]", KIND[k].cls)}>{KIND[k].label}</span>;
}

function Line({ k, children }: { k: Kind; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 border-t border-ink/8 py-3 first:border-t-0 first:pt-0">
      <span className="w-[78px] shrink-0"><Tag k={k} /></span>
      <span className="text-[14.5px] leading-relaxed text-ink/85">{children}</span>
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
            `<span style="color:#8fa3b6">implied</span> = sotp(aws_g=0.20, aws_m=0.35, retail_m=0.06)`,
            `<span style="color:#8fa3b6">upside</span>  = implied / price - 1  <span style="color:#7d978c"># 0.14 under your assumptions</span>`,
            `<span style="color:#8fa3b6">base</span>    = sotp(aws_g=0.16, ...) / price - 1  <span style="color:#7d978c"># -0.03 at what’s priced</span>`,
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
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="warn">Thesis weakens</Pill>
          <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">Holds · Weakens · Breaks</span>
        </div>
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
    <div className="overflow-hidden rounded-[18px] border border-ink/10 bg-white shadow-[0_30px_80px_-40px_rgb(23_25_28/0.35)]">
      {/* memo header */}
      <div className="flex flex-col gap-4 border-b border-ink/8 bg-mist-100 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-7">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-ink/6"><AlfredGlyph className="h-[18px] w-[18px] text-lake-700" /></span>
          <span>
            <span className="block font-display text-[15px] font-semibold">Research memo · Amazon (AMZN)</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.05em] text-ink/45">Thesis pressure-test · 14 sources · 3 calculations</span>
          </span>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Provenance legend">
          {(Object.keys(KIND) as Kind[]).map((k) => (
            <li key={k} className="flex items-center gap-2 text-[12px] text-ink/60">
              <Tag k={k} />
              <span className="hidden lg:inline">{KIND[k].desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr]">
        {/* section nav */}
        <div role="tablist" aria-label="Memo sections" aria-orientation="vertical" className="no-scrollbar flex gap-1.5 overflow-x-auto border-b border-ink/8 p-3 lg:block lg:space-y-1 lg:border-b-0 lg:border-r lg:p-4">
          {SECTIONS.map((sec, i) => (
            <button
              key={sec.key}
              role="tab"
              id={`memo-tab-${sec.key}`}
              aria-selected={i === active}
              aria-controls="memo-panel"
              onClick={() => setActive(i)}
              className={clsx(
                "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left font-display text-[13.5px] font-medium transition-colors duration-300 lg:w-full",
                i === active ? "bg-ink text-paper" : "text-ink/60 hover:bg-ink/[0.04] hover:text-ink",
              )}
            >
              <span className={clsx("font-mono text-[10px]", i === active ? "text-paper/50" : "text-ink/35")}>{String(i + 1).padStart(2, "0")}</span>
              <span className="whitespace-nowrap lg:whitespace-normal">{sec.title}</span>
            </button>
          ))}
        </div>

        {/* section content */}
        <div className="flex min-h-[420px] flex-col">
          <div id="memo-panel" role="tabpanel" aria-labelledby={`memo-tab-${s.key}`} className="relative flex-1 p-5 md:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={s.key} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.45, ease: EASE }}>
                <h4 className="t-h3 mb-5">{s.title}</h4>
                {s.body}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid gap-5 border-t border-ink/8 bg-mist-100/60 p-5 md:grid-cols-2 md:p-7">
            <div>
              <p className="t-ui text-[10px] text-ink/45">Sources</p>
              <ol className="mt-2.5 space-y-1.5">
                {SOURCES.map((src, i) => (
                  <li key={src} className="flex items-start gap-2 text-[12px] text-ink/70">
                    <span className="mt-[1px] flex h-4 min-w-4 items-center justify-center rounded bg-lake-100 px-1 font-mono text-[9px] text-lake-700">{i + 1}</span>
                    {src}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="t-ui text-[10px] text-ink/45">Follow up or challenge</p>
              <ul className="mt-2.5 space-y-1.5">
                {["Rerun the valuation at 15% AWS growth", "Show the evidence behind counter-argument 2", "Add the second-order names to my watchlist"].map((f) => (
                  <li key={f} className="flex items-center justify-between gap-3 rounded-md border border-ink/10 bg-white px-3 py-2 text-[12.5px] text-ink/80">
                    {f} <span aria-hidden="true" className="text-ink/40">→</span>
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
