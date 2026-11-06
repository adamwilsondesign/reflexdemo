"use client";

import { AutoTabs } from "@/components/ui/AutoTabs";
import { Cite, CodeBlock, MissingData, SourceRow, Stage } from "@/components/product/ui";
import { MockPanel } from "@/components/product/motion";

/** One figure, inspected one way per tab: its source, a flagged gap, or the calculation. */
function OneFigure({ focus }: { focus: 0 | 1 | 2 }) {
  return (
    <Stage field="mist" className="flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-[380px]">
        <MockPanel height={200}>
          <p className="text-[13px] text-[#8f8f8f]">AWS revenue growth, Q4 2024</p>
          <p className="mt-1 text-[24px] font-semibold leading-8">19%<Cite n={1} /></p>
          <div className="mt-6">
            {focus === 0 && <SourceRow n={1} title="Amazon.com Q4 2024 earnings release" meta="Segment results" />}
            {focus === 1 && <MissingData label="AI revenue within AWS" reason="Not disclosed by issuer" />}
            {focus === 2 && <CodeBlock lines={["28.79 / 24.20 - 1 = 0.190"]} />}
          </div>
        </MockPanel>
      </div>
    </Stage>
  );
}

export function TrustTabs() {
  return (
    <AutoTabs
      onDark
      interval={6000}
      items={[
        { title: "Every figure is cited.", body: "Verify every claim in Alfred’s analysis against the original sources.", visual: <OneFigure focus={0} /> },
        { title: "Flags when data is missing.", body: "Identifies unavailable data. Never fills the gap with guesses.", visual: <OneFigure focus={1} /> },
        { title: "Every claim traces its inputs.", body: "Visually trace a claim through underlying inputs and calculations.", visual: <OneFigure focus={2} /> },
      ]}
    />
  );
}
