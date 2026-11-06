"use client";

import { AutoTabs } from "@/components/ui/AutoTabs";
import { Sparkline, Stage, series } from "@/components/product/ui";
import { Chain, MockPanel, Row } from "@/components/product/motion";

/** One fixed-size panel per state, so the visual never changes size between tabs. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <Stage field="pine" className="flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-[400px]">
        <MockPanel height={256}>{children}</MockPanel>
      </div>
    </Stage>
  );
}

function Headline() {
  return (
    <Frame>
      <div className="flex h-full flex-col">
        <p className="text-[12px] text-[#8f8f8f]">Company catalyst · Bullish</p>
        <p className="mt-1 text-[18px] font-semibold leading-6 text-[#0d0d0d]">CoreWeave rolls out Nvidia Vera Rubin</p>
        <p className="mt-2 text-[13px] text-[#5d5d5d]">Theme: AI infrastructure</p>
        <div className="mt-auto h-16 border-t border-black/10 pt-3">
          <Sparkline points={series(30, 11, 0.55, 1.8)} className="h-full w-full" />
        </div>
      </div>
    </Frame>
  );
}

function Takeaways() {
  return (
    <Frame>
      <p className="text-[14px] font-semibold text-[#0d0d0d]">Top 5 takeaways</p>
      <div className="mt-2">
        <Row label="Customer deployments begin" value="AI infra" />
        <Row label="Demand signal strengthens" value="Cloud" />
        <Row label="Commercial path clearer" value="AI infra" />
        <Row label="Supply chain scales" value="Semis" />
        <Row label="Milestones to watch" value="Cloud" />
      </div>
    </Frame>
  );
}

function Ripple() {
  return (
    <Frame>
      <p className="text-[13px] text-[#8f8f8f]">Through the Reflexivity Graph</p>
      <div className="mt-3">
        <Chain nodes={["CoreWeave", "NVIDIA, platform supplier", "Nebius, cloud provider"]} />
      </div>
    </Frame>
  );
}

function Ask() {
  return (
    <Frame>
      <div className="flex h-full flex-col">
        <p className="text-[13px] text-[#8f8f8f]">Ask Alfred</p>
        <p className="mt-3 rounded-[10px] bg-[#f9f9f9] px-3 py-2 text-[14px] leading-5 text-[#0d0d0d]">Which regions are most exposed to Rubin demand?</p>
        <div className="mt-auto">
          <Row label="Compare cloud providers" value="→" />
          <Row label="Check supplier concentration" value="→" />
        </div>
      </div>
    </Frame>
  );
}

/** Worked example: tab titles and bodies are the Figma copy; each visual is one calm panel. */
export function RippleExample() {
  return (
    <AutoTabs
      interval={7000}
      items={[
        { title: "Headline", body: "Start with the catalyst, its direction and the theme it moves.", visual: <Headline /> },
        { title: "Top 5 takeaways", body: "The five points to know about the catalyst, each tagged to its themes.", visual: <Takeaways /> },
        { title: "Graph ripple effects", body: "Follow the catalyst through the Reflexivity Graph to the connected companies, ranked, with what to watch for each.", visual: <Ripple /> },
        { title: "Ask Alfred", body: "Check which regions are exposed, then ask Alfred follow‑up questions about the cohort.", visual: <Ask /> },
      ]}
    />
  );
}
