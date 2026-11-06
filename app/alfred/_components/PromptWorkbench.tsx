"use client";

import { Field } from "@/components/visual/kit";
import { PlanRun } from "@/components/visual/scenes/PlanRun";

const PROMPTS = [
  { task: "Investment research", q: "Map AAPL’s ecosystem and find the hidden beneficiaries." },
  { task: "Earnings analysis", q: "What changed in NFLX management’s tone, and what does it signal?" },
  { task: "Thesis pressure testing", q: "Stress-test my thesis: what breaks it, and what should I watch?" },
] as const;

/**
 * On-demand: sample questions beside one worked example. The graphic acts out the first
 * question: entities resolved, evidence gathered, analysis run, cited result.
 */
export function PromptWorkbench() {
  return (
    <div className="grid-12 items-center gap-y-10">
      <div className="col-span-12 lg:col-span-5">
        <p className="t-ui text-ink/50">Sample questions</p>
        <ul className="mt-4">
          {PROMPTS.map((q) => (
            <li key={q.q} className="border-t border-ink/12 py-6 last:border-b">
              <span className="t-ui block text-ink/55">{q.task}</span>
              <span className="mt-2 block font-display text-[18px] font-medium leading-6 text-ink">{q.q}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12 lg:col-span-6 lg:col-start-7" aria-hidden="true">
        <Field field="lake">
          <PlanRun />
        </Field>
      </div>
    </div>
  );
}
