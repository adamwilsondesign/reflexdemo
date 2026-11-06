"use client";

import clsx from "clsx";
import { AlfredGlyph, Cite, useTypewriter } from "./ui";
import { Chain, MockPanel, Row, useCycle } from "./motion";

const PROMPT = "Find the hidden beneficiaries of Apple’s supply chain.";

/**
 * Home hero — one workflow, three calm states in one fixed panel:
 * ask → connect → answer (with a source and a flagged gap).
 */
export function HeroWorkflow({ className }: { className?: string }) {
  const [i, ref, setI] = useCycle(3, { ms: 5200 });
  const typed = useTypewriter(PROMPT, { start: i === 0, speed: 38 });

  return (
    <div ref={ref} className={clsx("mx-auto w-full max-w-[400px]", className)}>
      <MockPanel stateKey={i} height={264}>
        {i === 0 && (
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 text-[14px] font-semibold"><AlfredGlyph className="h-4 w-4" />Alfred</div>
            <p className="mt-4 text-[16px] leading-6 text-[#0d0d0d]">
              {typed}
              {typed.length < PROMPT.length && <span className="animate-blink ml-0.5 inline-block h-4 w-px translate-y-[2px] bg-[#0d0d0d]" />}
            </p>
            <div className="mt-auto flex justify-end">
              <span className="rounded-[10px] border border-black/10 px-3 py-1 text-[13px] font-medium">Ask</span>
            </div>
          </div>
        )}
        {i === 1 && (
          <div className="flex h-full flex-col">
            <p className="text-[13px] text-[#8f8f8f]">Following the Knowledge Graph</p>
            <div className="mt-4"><Chain nodes={["Apple", "TSMC", "Advanced packaging"]} /></div>
          </div>
        )}
        {i === 2 && (
          <div className="flex h-full flex-col">
            <p className="text-[18px] font-semibold leading-6">12 potential beneficiaries</p>
            <div className="mt-3">
              <Row strong label="TSMC" value={<>Supplier<Cite n={1} /></>} />
              <Row strong label="Broadcom" value={<>Supplier<Cite n={2} /></>} />
              <Row strong label="Micron" value={<>Supplier<Cite n={3} /></>} />
            </div>
            <p className="mt-auto text-[12px] text-[#8f8f8f]">Revenue split for 2 names not disclosed. Flagged, not estimated.</p>
          </div>
        )}
      </MockPanel>
    </div>
  );
}
