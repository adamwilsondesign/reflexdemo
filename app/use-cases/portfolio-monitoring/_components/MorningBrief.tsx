"use client";

import { Stage } from "@/components/product/ui";
import { MockPanel, Row, StepDots, useCycle } from "@/components/product/motion";

const VIEWS = [
  {
    head: "3 developments on your watchlist",
    rows: [
      ["NVIDIA", "Guidance raised"],
      ["Nike", "Earnings recap"],
      ["Vertiv", "Theme catalyst"],
    ],
  },
  {
    head: "Upcoming this week",
    rows: [
      ["NVIDIA", "Q1 call, Wed"],
      ["Microsoft", "Investor day, Thu"],
      ["Eli Lilly", "Trial readout, Fri"],
    ],
  },
] as const;

/** Morning read: the daily brief, two calm states (what changed, what's next). */
export function MorningBrief() {
  const [i, ref, setI] = useCycle(VIEWS.length, { ms: 5200, finalForReduced: 0 });
  const v = VIEWS[i];
  return (
    <Stage field="lake" className="flex items-center justify-center px-6 py-12 sm:px-10 sm:py-16">
      <div ref={ref} className="w-full max-w-[400px]">
        <MockPanel stateKey={i} height={232}>
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-semibold text-[#0d0d0d]">Daily brief</span>
            <span className="text-[#8f8f8f]">Mon 07:00</span>
          </div>
          <p className="mt-4 text-[18px] font-semibold leading-6 text-[#0d0d0d]">{v.head}</p>
          <div className="mt-3">
            {v.rows.map(([n, d]) => (
              <Row key={n} label={n} value={d} strong />
            ))}
          </div>
        </MockPanel>
        <StepDots count={VIEWS.length} active={i} onSelect={setI} />
      </div>
    </Stage>
  );
}
