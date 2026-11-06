"use client";

import clsx from "clsx";
import { AlfredGlyph, Cite, Stage } from "@/components/product/ui";
import { MockPanel, Row, useCycle } from "@/components/product/motion";

const PROMPTS = [
  {
    task: "Investment research",
    q: "Map AAPL’s ecosystem and find the hidden beneficiaries.",
    ticker: "AAPL",
    result: "12 potential beneficiaries",
    rows: [["Broadcom", "Supplier"], ["TSMC", "Supplier"], ["Cirrus Logic", "Supplier"]],
  },
  {
    task: "Earnings analysis",
    q: "What changed in NFLX management’s tone, and what does it signal?",
    ticker: "NFLX",
    result: "3 shifts in management tone",
    rows: [["Advertising", "Firmer"], ["Content spend", "Unchanged"], ["Margin outlook", "Softer"]],
  },
  {
    task: "Thesis pressure testing",
    q: "Stress-test my thesis: what breaks it, and what should I watch?",
    ticker: "Thesis",
    result: "2 key risks identified",
    rows: [["Valuation already priced in", "Risk"], ["Supplier demand softening", "Risk"], ["Next quarterly results", "Watch"]],
  },
] as const;

/**
 * On-demand: three sample questions beside one fixed panel. The panel shows only the answer
 * to the highlighted question; one motion idea (the answer swaps), ≥5s per state.
 */
export function PromptWorkbench() {
  const [i, ref, setI] = useCycle(PROMPTS.length, { ms: 5600 });
  const p = PROMPTS[i];
  return (
    <div ref={ref} className="grid-12 items-center gap-y-10">
      <div className="col-span-12 lg:col-span-5" role="tablist" aria-label="Sample questions">
        {PROMPTS.map((q, k) => {
          const on = k === i;
          return (
            <button
              key={q.q}
              role="tab"
              aria-selected={on}
              onClick={() => setI(k)}
              className={clsx("block w-full border-t py-6 text-left transition-colors duration-500 last:border-b", on ? "border-ink/40" : "border-ink/12")}
            >
              <span className={clsx("t-ui block transition-colors duration-500", on ? "text-ink/70" : "text-ink/40")}>{q.task}</span>
              <span className={clsx("mt-2 block font-display text-[18px] font-medium leading-6 transition-colors duration-500", on ? "text-ink" : "text-ink/45")}>{q.q}</span>
            </button>
          );
        })}
      </div>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7" role="tabpanel" aria-label={p.q}>
        <Stage field="lake" className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-[400px]">
            <MockPanel stateKey={i} height={248}>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2 text-[14px] font-semibold"><AlfredGlyph className="h-4 w-4" />Alfred</span>
                  <span className="text-[#8f8f8f]">{p.ticker}</span>
                </div>
                <p className="mt-4 text-[18px] font-semibold leading-6">{p.result}</p>
                <div className="mt-3">
                  {p.rows.map(([a, b], k) => (
                    <Row key={a} strong label={a} value={<>{b}<Cite n={k + 1} /></>} />
                  ))}
                </div>
              </div>
            </MockPanel>
          </div>
        </Stage>
      </div>
    </div>
  );
}
