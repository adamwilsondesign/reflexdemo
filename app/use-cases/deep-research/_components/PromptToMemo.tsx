"use client";

import { AlfredGlyph, Cite, Stage, useTypewriter } from "@/components/product/ui";
import { Chain, MockPanel, Row, useCycle } from "@/components/product/motion";

const PROMPT = "I’m long Amazon after the selloff. Pressure-test my thesis.";

/** Hero: ask → work → cited memo. One fixed panel, three calm states. */
export function PromptToMemo() {
  const [i, ref, setI] = useCycle(3, { ms: 5200 });
  const typed = useTypewriter(PROMPT, { start: i === 0, speed: 38 });

  return (
    <Stage field="lake" className="flex items-center justify-center p-6 sm:p-10">
      <div ref={ref} className="w-full max-w-[400px]">
        <MockPanel stateKey={i} height={264}>
          {i === 0 && (
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 text-[14px] font-semibold"><AlfredGlyph className="h-4 w-4" />Deep research</div>
              <p className="mt-4 text-[16px] leading-6 text-[#0d0d0d]">
                {typed}
                {typed.length < PROMPT.length && <span className="animate-blink ml-0.5 inline-block h-4 w-px translate-y-[2px] bg-[#0d0d0d]" />}
              </p>
              <div className="mt-auto flex justify-end">
                <span className="rounded-[10px] border border-black/10 px-3 py-1 text-[13px] font-medium">Run</span>
              </div>
            </div>
          )}
          {i === 1 && (
            <div className="flex h-full flex-col">
              <p className="text-[13px] text-[#8f8f8f]">Working through the evidence</p>
              <div className="mt-4"><Chain nodes={["Filings and transcripts", "Suppliers and competitors", "Valuation, run in code"]} /></div>
            </div>
          )}
          {i === 2 && (
            <div className="flex h-full flex-col">
              <p className="text-[13px] text-[#8f8f8f]">Research memo · AMZN</p>
              <p className="mt-1 text-[18px] font-semibold leading-6">Thesis weakens</p>
              <div className="mt-3">
                <Row strong label="What’s priced in" value={<>16% AWS growth<Cite n={1} /></>} />
                <Row strong label="Counter-argument" value={<>Capex<Cite n={2} /></>} />
                <Row strong label="What breaks it" value={<>Next quarter<Cite n={3} /></>} />
              </div>
              <p className="mt-auto text-[12px] text-[#8f8f8f]">14 sources · 1 gap flagged</p>
            </div>
          )}
        </MockPanel>
      </div>
    </Stage>
  );
}
