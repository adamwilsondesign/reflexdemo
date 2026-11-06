"use client";

import { Field } from "@/components/visual/kit";
import { LoopTimeline } from "@/components/visual/scenes/LoopTimeline";

const STEPS = [
  { label: "Monitor", sub: "An Insight flags CoreWeave’s Rubin rollout." },
  { label: "Research", sub: "Alfred pressure-tests the read on NVIDIA." },
  { label: "Test", sub: "Stress the position against a capex slowdown." },
  { label: "Keep watching", sub: "What you researched and tested stays on your watchlist." },
];

/** Research, monitoring and testing feed each other: the steps beside one position's activity timeline, which acts them out. */
export function ConnectedLoop() {
  return (
    <div className="grid-12 items-center gap-y-12">
      <ol className="col-span-12 border-b border-white/15 lg:col-span-5">
        {STEPS.map((s, k) => (
          <li key={s.label} className="flex gap-4 border-t border-white/15 py-4">
            <span className="rx-num mt-1 w-6 shrink-0 text-[13px] text-paper/50">{String(k + 1).padStart(2, "0")}</span>
            <span>
              <span className="t-h3 block">{s.label}</span>
              <span className="t-body mt-1 block text-paper/75">{s.sub}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="col-span-12 w-full lg:col-span-6 lg:col-start-7">
        <Field field="mist">
          <LoopTimeline />
        </Field>
      </div>
    </div>
  );
}
