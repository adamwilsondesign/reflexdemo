"use client";

import { CiteChip, Field } from "@/components/visual/kit";
import { MemoTrace, type MemoCopy } from "@/components/visual/scenes/MemoTrace";

/** Illustrative AWS segment margins (operating income / revenue, last eight quarters). */
const MARGINS = [30.3, 29.6, 37.6, 35.5, 38.1, 36.9, 39.5, 32.9];

const AMAZON: MemoCopy = {
  meta: "Long AMZN · 9 sources",
  title: "Can the Amazon thesis hold up after the selloff?",
  lead: <>AWS growth re-accelerated to 17.5% last quarter, with an{" "}</>,
  span: "operating margin of 32.9%",
  rest: <>Retail margins are widening; ad revenue from Prime Day isn’t disclosed separately.<CiteChip n={2} /> Capex guidance is the main risk.<CiteChip n={3} /></>,
  chips: ["AWS growth +17.5%", "AWS margin 32.9%", "1 gap flagged"],
  anchor: { x: 172, y: 190 },
  drawer: {
    title: "AWS operating margin, last 8 quarters",
    bars: MARGINS.map((m) => (m - 24) * 2.6),
    hi: [MARGINS.length - 1],
    rows: [["Operating income", "$10.2B"], ["Revenue", "$30.9B"], ["Source", "Amazon 10-Q"]],
  },
};

/** Worked example: the memo the Amazon prompt returns; the cursor traces a figure to its calculation. */
export function ResearchMemo() {
  return (
    <Field field="mist">
      <MemoTrace copy={AMAZON} />
    </Field>
  );
}
