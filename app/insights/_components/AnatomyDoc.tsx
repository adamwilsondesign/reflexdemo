"use client";

import { Field } from "@/components/visual/kit";
import { InsightDoc } from "@/components/visual/scenes/InsightDoc";

const ANATOMY = [
  { title: "Headline", body: "Each Insight opens with the catalyst, its direction and the theme it moves." },
  { title: "Top 5 takeaways", body: "The five points that matter most, each tagged to the themes it affects." },
  { title: "Graph ripple effects", body: "The Knowledge Graph ranks the companies connected to the catalyst by role, event link and what to watch." },
  { title: "Ask Alfred", body: "See which countries and regions are exposed, then ask Alfred follow-up questions about the cohort." },
];

/** The four parts of an Insight beside one document that scrolls through them. */
export function AnatomyDoc() {
  return (
    <div className="grid-12 items-center gap-y-10">
      <ol className="col-span-12 lg:col-span-5">
        {ANATOMY.map((a, i) => (
          <li key={a.title} className="flex gap-5 border-t border-ink/12 py-6 last:border-b">
            <span className="t-ui w-5 shrink-0 pt-1 tabular-nums text-ink/45">{i + 1}</span>
            <span>
              <span className="t-h3 block">{a.title}</span>
              <span className="t-body mt-2 block text-ink/70">{a.body}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="col-span-12 lg:col-span-6 lg:col-start-7" aria-hidden="true">
        <Field field="mist">
          <InsightDoc />
        </Field>
      </div>
    </div>
  );
}
