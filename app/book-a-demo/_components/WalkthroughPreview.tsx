import { Field } from "@/components/visual/kit";
import { WalkthroughInvite } from "@/components/visual/scenes/WalkthroughInvite";

export const SEE = [
  {
    title: "Your own work",
    body: "We use the portfolio, watchlist or research question you bring, not a set tour.",
  },
  {
    title: "Alfred and the Knowledge Graph",
    body: "Ask Alfred a research question, then see how a coverage list keeps running in the background. Both use the same Graph and the same data.",
  },
  {
    title: "The source and the calculation",
    body: "Open the source on each claim and the code behind each number, so you can check the answer yourself.",
  },
] as const;

/**
 * "What you'll see": the three parts of the walkthrough, with a calm invite card underneath
 * whose agenda checks itself off. No controls; paused off-screen; still under reduced motion.
 */
export function WhatYoullSee() {
  return (
    <div className="flex flex-col gap-6">
      <ol className="flex flex-col">
        {SEE.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[28px_1fr] border-t border-white/12 py-4">
            <span className="font-mono text-[12px] leading-[22px] text-paper/45">0{i + 1}</span>
            <span>
              <span className="block font-display text-[16px] font-semibold text-paper">{s.title}</span>
              <span className="t-small mt-1.5 block text-paper/65">{s.body}</span>
            </span>
          </li>
        ))}
      </ol>
      <div aria-hidden="true">
        <Field field="lake" className="!p-3 sm:!p-6">
          <WalkthroughInvite />
        </Field>
      </div>
    </div>
  );
}
