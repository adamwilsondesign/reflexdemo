"use client";

import { AutoTabs } from "@/components/ui/AutoTabs";
import { Field } from "@/components/visual/kit";
import { TrustFigure } from "@/components/visual/scenes/TrustFigure";

/** One figure, inspected one way per tab: its source, a flagged gap, or the calculation. */
function OneFigure({ focus }: { focus: 0 | 1 | 2 }) {
  return (
    <Field field="mist" className="flex h-full w-full items-center">
      <div className="w-full"><TrustFigure focus={focus} /></div>
    </Field>
  );
}

export function TrustTabs() {
  return (
    <AutoTabs
      onDark
      interval={6500}
      items={[
        { title: "Every figure is cited.", body: "Verify every claim in Alfred’s analysis against the original sources.", visual: <OneFigure focus={0} /> },
        { title: "Flags when data is missing.", body: "Identifies unavailable data. Never fills the gap with guesses.", visual: <OneFigure focus={1} /> },
        { title: "Every claim traces its inputs.", body: "Visually trace a claim through underlying inputs and calculations.", visual: <OneFigure focus={2} /> },
      ]}
    />
  );
}
