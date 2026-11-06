"use client";

import clsx from "clsx";
import { Chain, MockPanel, Row, StepDots, useCycle } from "@/components/product/motion";

const STEPS = [
  { label: "Monitor", sub: "An Insight flags CoreWeave’s Rubin rollout." },
  { label: "Research", sub: "Alfred pressure-tests the read on NVIDIA." },
  { label: "Test", sub: "Stress the position against a capex slowdown." },
  { label: "Keep watching", sub: "What you researched and tested stays on your watchlist." },
];

/** Research, monitoring and testing feed each other: a step list beside one panel that shows the current step. */
export function ConnectedLoop() {
  const [i, ref, setI] = useCycle(STEPS.length, { ms: 4800 });
  return (
    <div ref={ref} className="grid-12 items-center gap-y-12">
      <ol className="col-span-12 border-b border-white/15 lg:col-span-5">
        {STEPS.map((s, k) => (
          <li key={s.label} className="flex gap-4 border-t border-white/15 py-4">
            <span className={clsx("mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500", k === i ? "bg-white" : "bg-white/25")} />
            <span className={clsx("transition-opacity duration-500", k === i ? "opacity-100" : "opacity-55")}>
              <span className="t-h3 block">{s.label}</span>
              <span className="t-body mt-1 block text-paper/75">{s.sub}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="col-span-12 mx-auto w-full max-w-[400px] lg:col-span-6 lg:col-start-7">
        <MockPanel stateKey={i} height={232}>
          {i === 0 && (
            <div className="flex h-full flex-col">
              <p className="text-[13px] text-[#8f8f8f]">Insight · company catalyst</p>
              <p className="mt-1 text-[18px] font-semibold leading-6">CoreWeave rolls out Nvidia Vera Rubin</p>
              <div className="mt-auto"><Row label="Reached you because" value="On your watchlist" /></div>
            </div>
          )}
          {i === 1 && (
            <div className="flex h-full flex-col">
              <p className="text-[13px] text-[#8f8f8f]">Alfred · following the Graph</p>
              <div className="mt-4"><Chain nodes={["CoreWeave", "NVIDIA, GPU supplier", "Your position"]} /></div>
            </div>
          )}
          {i === 2 && (
            <div className="flex h-full flex-col">
              <p className="text-[13px] text-[#8f8f8f]">Scenario</p>
              <p className="mt-1 text-[18px] font-semibold leading-6">AI capex slows</p>
              <div className="mt-auto">
                <Row strong label="NVIDIA position" value="Stress tested" />
                <Row label="Calculation" value="Run in code" />
              </div>
            </div>
          )}
          {i === 3 && (
            <div className="flex h-full flex-col">
              <p className="text-[13px] text-[#8f8f8f]">Insights · always on</p>
              <p className="mt-1 text-[18px] font-semibold leading-6">Back on your watchlist</p>
              <div className="mt-auto">
                <Row strong dot label="CoreWeave" />
                <Row strong dot label="NVIDIA" />
                <Row strong dot label="Nebius" />
              </div>
            </div>
          )}
        </MockPanel>
        <StepDots count={STEPS.length} active={i} onSelect={setI} />
      </div>
    </div>
  );
}
