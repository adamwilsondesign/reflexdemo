"use client";

import { Cite, MissingData, Stage } from "@/components/product/ui";
import { MockPanel, Row, useCycle } from "@/components/product/motion";

/** One memo section per state. Each state: a label, one finding, one or two supporting rows. */
const STATES: { label: string; finding: React.ReactNode; rows: React.ReactNode }[] = [
  {
    label: "What the market is pricing",
    finding: <>About 16% a year of AWS growth<Cite n={1} /></>,
    rows: (
      <>
        <Row label="Your thesis needs" value="20% or more" />
        <Row label="Method" value="Reverse DCF, run in code" />
      </>
    ),
  },
  {
    label: "Strongest counter-argument",
    finding: <>Capex keeps free cash flow compressed<Cite n={2} /></>,
    rows: <Row label="Source" value="Q3 earnings release" />,
  },
  {
    label: "What breaks it",
    finding: <>AWS growth below consensus next quarter<Cite n={3} /></>,
    rows: <div className="mt-2"><MissingData label="GPU volumes by supplier" reason="Not disclosed" /></div>,
  },
  {
    label: "Verdict",
    finding: <>The thesis weakens</>,
    rows: <Row label="Watch first" value="AWS growth, capex guidance" />,
  },
];

/** The Amazon pressure-test as four calm states of one memo panel. */
export function ResearchMemo() {
  const [i, ref, setI] = useCycle(STATES.length, { ms: 5200 });
  const s = STATES[i];
  return (
    <Stage field="mist" className="flex items-center justify-center p-6 sm:p-10">
      <div ref={ref} className="w-full max-w-[400px]">
        <MockPanel stateKey={i} height={264}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-semibold text-[#0d0d0d]">Research memo · AMZN</span>
              <span className="text-[#8f8f8f]">{i + 1} of {STATES.length}</span>
            </div>
            <p className="mt-4 text-[13px] text-[#8f8f8f]">{s.label}</p>
            <p className="mt-1 text-[18px] font-semibold leading-6 text-[#0d0d0d]">{s.finding}</p>
            <div className="mt-auto">{s.rows}</div>
          </div>
        </MockPanel>
      </div>
    </Stage>
  );
}
