"use client";

import { Stage } from "@/components/product/ui";
import { MockPanel, Row, useCycle } from "@/components/product/motion";

/** One job per state: the workflow name, the output it returns, three rows of it. */
const JOBS: { job: string; title: string; rows: [string, string][] }[] = [
  { job: "Portfolio monitoring", title: "CoreWeave rolls out Nvidia Vera Rubin", rows: [["NVIDIA", "Supplier"], ["Microsoft Azure", "Cloud provider"], ["Nebius", "Cloud provider"]] },
  { job: "Deep research", title: "Amazon thesis: weakens", rows: [["What’s priced in", "16% AWS growth"], ["Counter-argument", "Capex"], ["What breaks it", "Next quarter"]] },
  { job: "Thematic exposure", title: "Industrial automation", rows: [["Rockwell Automation", "Core"], ["Teradyne", "Less obvious"], ["Harmonic Drive", "Less obvious"]] },
  { job: "Scenario & stress testing", title: "10-year yield up 0.5pp", rows: [["Median stock, 1M", "−1.1%"], ["Median stock, 3M", "−2.1%"], ["Median stock, 1Y", "+0.6%"]] },
  { job: "Idea generation", title: "Second-order names worth a look", rows: [["Vertiv", "Power and cooling"], ["Eaton", "Electrical equipment"], ["Micron", "Memory demand"]] },
];

/** Overview hero: one fixed panel, five jobs, one at a time. */
export function JobsHero() {
  const [i, ref, setI] = useCycle(JOBS.length, { ms: 4800 });
  const j = JOBS[i];
  return (
    <Stage field="lake" image="/figma/n915.png" parallax={false} className="flex items-center justify-center px-6 py-12 sm:py-16">
      <div ref={ref} className="w-full max-w-[420px]">
        <MockPanel stateKey={i} height={232}>
          <div className="flex h-full flex-col">
            <p className="text-[13px] text-[#8f8f8f]">{j.job}</p>
            <p className="mt-1 text-[18px] font-semibold leading-6 text-[#0d0d0d]">{j.title}</p>
            <div className="mt-auto">
              {j.rows.map(([l, v]) => <Row key={l} strong label={l} value={v} />)}
            </div>
          </div>
        </MockPanel>
      </div>
    </Stage>
  );
}
