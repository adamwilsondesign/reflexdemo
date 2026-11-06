"use client";

import { AnimatePresence, motion } from "motion/react";
import { CodeBlock, MissingData, SourceRow, Stage } from "@/components/product/ui";
import { MOTION_EASE, MockPanel, StepDots, useCycle } from "@/components/product/motion";

const STEPS = [
  { label: "Defined in plain language", body: <SourceRow n={1} title="US 10-year yield, +0.5pp in 3 months" meta="S&P 1500 · 50+ years" /> },
  { label: "Executed in code", body: <CodeBlock lines={["episodes = find_episodes(\"US10Y\", rise=0.5)", "fwd = forward_returns(sp1500, episodes)"]} /> },
  { label: "Missing input flagged", body: <MissingData label="Pre-listing history, 212 stocks" reason="Excluded" /> },
];

/** One scenario: the question stays put; how it was run is revealed underneath, one step at a time. */
export function SimulationTrace() {
  const [i, ref, setI] = useCycle(STEPS.length, { ms: 4800 });
  return (
    <Stage field="ink" className="flex items-center justify-center p-6 sm:p-10">
      <div ref={ref} className="w-full max-w-[400px]">
        <MockPanel height={232}>
          <div className="flex h-full flex-col">
            <p className="text-[13px] text-[#8f8f8f]">Scenario · rates shock</p>
            <p className="mt-1 text-[18px] font-semibold leading-6 text-[#0d0d0d]">What followed past sharp rises in Treasury yields?</p>
            <div className="mt-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.6, ease: MOTION_EASE }}>
                  <p className="mb-2 text-[12px] text-[#8f8f8f]">{STEPS[i].label}</p>
                  {STEPS[i].body}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </MockPanel>
        <StepDots count={STEPS.length} active={i} onSelect={setI} />
      </div>
    </Stage>
  );
}
