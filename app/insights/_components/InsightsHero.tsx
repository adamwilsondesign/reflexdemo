"use client";

import { Field } from "@/components/visual/kit";
import { InsightInbox } from "@/components/visual/scenes/InsightInbox";

/** Hero: the Insights feed beside a reading card; the cursor opens one Insight after another. */
export function InsightsHero() {
  return (
    <Field field="lake">
      <InsightInbox />
    </Field>
  );
}
