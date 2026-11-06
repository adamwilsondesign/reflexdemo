"use client";

import clsx from "clsx";
import { Stage } from "@/components/product/ui";
import { Chain, MockPanel, Row, StepDots, useCycle } from "@/components/product/motion";
import { Illustrative } from "@/components/ui/Illustrative";

const STEPS = ["What happened", "Why it matters", "What else is affected", "The implication"];

const RANKED = [
  ["Rockwell Automation", "0.86"],
  ["Siemens", "0.81"],
  ["Eaton", "0.62"],
  ["Whirlpool", "0.55"],
] as const;

/**
 * Worked example: one macro catalyst traced to its implication.
 * Four states in ONE fixed-height panel, so no step ever changes the size of the graphic.
 */
export function RippleExample() {
  const [step, ref, setStep] = useCycle(STEPS.length, { ms: 5200 });

  return (
    <div ref={ref} className="grid-12 items-center gap-y-10">
      <ol className="col-span-12 lg:col-span-5" aria-label="Worked example steps">
        {STEPS.map((s, k) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => setStep(k)}
              aria-current={k === step ? "step" : undefined}
              className={clsx(
                "flex w-full items-baseline gap-4 border-t py-6 text-left transition-colors duration-500",
                k === step ? "border-white text-paper" : "border-white/15 text-paper/45 hover:text-paper/70",
              )}
            >
              <span className="t-ui w-6 tabular-nums">{String(k + 1).padStart(2, "0")}</span>
              <span className="t-h3">{s}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="col-span-12 lg:col-span-6 lg:col-start-7">
        <Stage field="ink" className="flex h-[440px] w-full flex-col items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-[400px]">
            <MockPanel stateKey={step} height={256}>
              <div className="flex h-full flex-col">
                <p className="text-[13px] text-[#8f8f8f]">{STEPS[step]}</p>
                {step === 0 && (
                  <>
                    <p className="mt-3 text-[20px] font-semibold leading-7 text-[#0d0d0d]">Sept U.S. Flash PMI rekindles factory cost pressure</p>
                    <div className="mt-auto">
                      <Row label="Market catalyst" value="Macro" />
                      <Row label="Theme" value="Input costs" />
                    </div>
                  </>
                )}
                {step === 1 && (
                  <div className="mt-4">
                    <Chain nodes={["US flash PMI", "Higher input costs", "Industrial automation"]} />
                  </div>
                )}
                {step === 2 && (
                  <div className="mt-3">
                    <div className="flex justify-between pb-1 text-[12px] text-[#8f8f8f]"><span>Ranked exposure</span><span>Weight</span></div>
                    {RANKED.map(([n, w], k) => (
                      <Row key={n} strong={k < 2} dot={k < 2} label={n} value={w} />
                    ))}
                  </div>
                )}
                {step === 3 && (
                  <>
                    <p className="mt-3 text-[20px] font-semibold leading-7 text-[#0d0d0d]">Automation suppliers screen as beneficiaries.</p>
                    <p className="mt-3 text-[15px] leading-6 text-[#5d5d5d]">Manufacturers without pricing power carry margin risk.</p>
                  </>
                )}
              </div>
            </MockPanel>
            <StepDots count={STEPS.length} active={step} onSelect={setStep} />
          </div>
        </Stage>
        <Illustrative onDark className="mt-4">Illustrative example. Rankings show relationship exposure, not a forecast or recommendation.</Illustrative>
      </div>
    </div>
  );
}
