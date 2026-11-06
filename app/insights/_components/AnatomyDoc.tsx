"use client";

import { motion, useReducedMotion } from "motion/react";
import { CardHeader, Pill, Stage } from "@/components/product/ui";
import { MOTION_EASE, MockPanel, Row } from "@/components/product/motion";

/** Quarterly bars (illustrative) instead of a line: one clear rising shape. */
const BARS = [32, 38, 44, 52, 63, 78];

function Bars() {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="flex h-[88px] items-end gap-2 border-b border-black/10">
        {BARS.map((h, k) => (
          <motion.span
            key={k}
            className="block flex-1 origin-bottom rounded-t-[4px]"
            style={{ height: `${h + 10}%`, background: k === BARS.length - 1 ? "#0d0d0d" : "rgba(13,13,13,0.18)" }}
            initial={reduce ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.2 + k * 0.08, ease: MOTION_EASE }}
          />
        ))}
      </div>
      <p className="mt-2 text-[12px] text-[#8f8f8f]">Hyperscaler capex, by quarter</p>
    </div>
  );
}

/** One section of an Insight per step, in one fixed-height panel. */
export function AnatomyDoc({ step }: { step: number }) {
  return (
    <Stage field="pine" className="flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-[400px]">
        <MockPanel stateKey={step} height={296}>
          {step === 0 && (
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] text-[#8f8f8f]">Market catalyst</span>
                <Pill>Bullish</Pill>
              </div>
              <p className="mt-2 text-[20px] font-semibold leading-7 text-[#0d0d0d]">AI data center power buildout accelerates</p>
              <div className="mt-auto"><Bars /></div>
            </div>
          )}
          {step === 1 && (
            <>
              <p className="text-[14px] font-semibold">Top 5 takeaways</p>
              <div className="mt-2">
                {["Interconnect queues lengthen", "Grid equipment orders strengthen", "Hyperscaler capex rises", "Cooling supply tightens", "Milestones to watch"].map((t, k) => (
                  <Row key={t} strong={k < 3} label={<><span className="w-4 tabular-nums text-[#8f8f8f]">{k + 1}</span>{t}</>} />
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="flex items-center justify-between text-[14px]">
                <span className="font-semibold">Graph ripple effects</span>
                <span className="text-[12px] text-[#8f8f8f]">Weight</span>
              </div>
              <div className="mt-2">
                <Row strong dot label="Vertiv" value="0.91" />
                <Row strong dot label="Eaton" value="0.82" />
                <Row label="Constellation" value="0.71" />
                <Row label="Quanta Services" value="0.60" />
              </div>
            </>
          )}
          {step === 3 && (
            <div className="flex h-full flex-col">
              <CardHeader title="Ask Alfred" />
              <p className="mt-4 rounded-[10px] bg-[#f9f9f9] px-3 py-3 text-[15px] leading-6 text-[#0d0d0d]">Which of these names is most exposed to grid delays?</p>
              <p className="mt-auto text-[13px] text-[#8f8f8f]">Compare utility capex plans for 2026 →</p>
            </div>
          )}
        </MockPanel>
      </div>
    </Stage>
  );
}
